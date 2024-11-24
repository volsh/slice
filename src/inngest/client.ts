import { EventSchemas, Inngest } from "inngest";
import { RunWorkflowEvent } from "@/inngest/functions/run-workflow";
import { RunParallelActionsEvent } from "./functions/run-parallel-actions";

// Create a client to send and receive events
type Events = {
  "run-workflow": RunWorkflowEvent;
  "run-parallel-actions": RunParallelActionsEvent;
};
export const inngest = new Inngest({
  id: "user-defined-workflows",
  schemas: new EventSchemas().fromRecord<Events>(),
});
