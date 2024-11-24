import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { runWorkflow } from "@/inngest/functions/run-workflow";
import { runParallelActions } from "@/inngest/functions/run-parallel-actions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [runWorkflow, runParallelActions],
});
