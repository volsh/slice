import { inngest } from "@/inngest/client";
import { WorkflowForSelect } from "./interfaces/workflows";
import { sanityClient } from "@/server/sanity.client";

export default async function Home() {
  async function triggerWorkflowEvent(formData: FormData) {
    "use server";
    await inngest.send({
      name: "run-workflow",
      data: {
        workflowId: formData.get("workflowId") as string,
      },
    });
  }
  const workflows: Array<WorkflowForSelect> = await sanityClient.fetch(
    `*[_type == "workflow"]{title, workflowId}`
  );

  return (
    <main className="p-6">
      <h1 className="mb-3 text-3xl font-bold">User-Defined Workflows</h1>
      <div>
        <form action={triggerWorkflowEvent}>
          {workflows.length > 0 && (
            <select
              name="workflowId"
              defaultValue={workflows[0].workflowId}
              className="mr-5"
            >
              {workflows.map((workflow) => (
                <option key={workflow.workflowId} value={workflow.workflowId}>
                  {workflow.title}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Trigger Your Workflow!
          </button>
        </form>
      </div>
    </main>
  );
}
