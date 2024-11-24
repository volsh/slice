import { ActionParamsType } from "@/sanity/schemaTypes/actions/interfaces";
import { createStepTools } from "inngest/components/InngestStepTools";
import { getStepByActionType } from "./getStepByActionType";

export async function runParallelActions(
    actions: Array<ActionParamsType>,
    step: ReturnType<typeof createStepTools>
  ) {
    const parallelActions: Array<Promise<unknown>> = [];
    let action;
  
    while (actions.length > 0) {
      action = actions.shift()!;
      parallelActions.push(getStepByActionType(action, step));
    }
    if (parallelActions.length > 0) {
      try {
        await Promise.all(parallelActions);
      } catch (err) {
        throw err;
      }
    }
  }