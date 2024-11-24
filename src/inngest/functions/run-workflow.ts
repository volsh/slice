import { inngest } from "@/inngest/client";
import { WorkflowType } from "@/sanity/schemaTypes/documents/workflow";
import { sanityClient } from "@/server/sanity.client";
import { getStepByActionType } from "../utils/getStepByActionType";
import { ActionParamsType } from "@/sanity/schemaTypes/actions/interfaces";
import { runParallelActions } from "../utils/runParallelActions";

export type RunWorkflowEventDataType = {
  workflowId: string | number;
} & Record<any, any>;

export type RunWorkflowEvent = {
  name: "run-workflow";
  data: RunWorkflowEventDataType;
};

export const runWorkflow = inngest.createFunction(
  { id: "run-workflow", name: "Run Workflow" },
  { event: "run-workflow" },
  async ({ event, step }) => {
    const { workflowId = "default" } = event.data;
    let error;

    const workflow: WorkflowType = await step.run(
      "load workflow from sanity",
      async () => {
        return sanityClient.fetch(
          `*[_type == "workflow" && workflowId == "${workflowId}"][0]{title, _id, _type, workflowId, "actions": actions[]}`
        );
      }
    );
    if (!Boolean(workflow)) {
      error = `No workflow found for account ${workflowId}`;
    }

    while (!error && workflow.actions.length > 0) {
      const { actions } = workflow;

      let action = actions.shift()!;

      const parallelActions: Array<ActionParamsType> = [];

      while (action?.parallel) {
        parallelActions.push(action);
        action = actions.shift()!;
      }
      try {
        await runParallelActions(parallelActions, step);
      } catch (err) {
        error = err;
      }
      if (!error && action) {
        // handle next unparallel action
        try {
          await getStepByActionType(action, step);
        } catch (err) {
          error = err;
        }
      }
    }
    if (error) {
      return { status: "error", error, workflow: workflow?.title, workflowId };
    }
    return { status: "complete", workflow: workflow.title, workflowId };
  }
);
