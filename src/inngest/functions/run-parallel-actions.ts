import { inngest } from "@/inngest/client";
import { ActionParamsType } from "@/sanity/schemaTypes/actions/interfaces";
import { getStepByActionType } from "../utils/getStepByActionType";

export type RunParallelActionsDataType = {
  actions: Array<ActionParamsType>;
} & Record<any, any>;

export type RunParallelActionsEvent = {
  name: "run-parallel-actions";
  data: RunParallelActionsDataType;
};

export const runParallelActions = inngest.createFunction(
  { id: "run-parallel-actions", name: "Run Parallel actions" },
  { event: "run-parallel-actions" },
  async ({ event, step }) => {
    const { actions } = event.data;
    const parallelActions: Array<Promise<unknown>> = [];
    let action;

    while (actions.length > 0) {
      action = actions.shift()!;
      parallelActions.push(getStepByActionType(action, step));
    }
    let error;
    let responses = {};
    if (parallelActions.length > 0) {
      try {
        responses = await Promise.all(parallelActions);
      } catch (err) {
        error = err;
      }
    }
    if (error) {
      return { status: "error", ...responses };
    }
    return { status: "complete", ...responses };
  }
);
