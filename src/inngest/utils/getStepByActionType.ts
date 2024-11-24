import { ActionParamsType } from "@/sanity/schemaTypes/actions/interfaces";
import { sendEmail } from "@/server/send-email";
import { updateOptionsStatus } from "@/server/update-options-status";
import { createStepTools } from "inngest/components/InngestStepTools";

export function getStepByActionType(
  action: ActionParamsType,
  step: ReturnType<typeof createStepTools>
): Promise<unknown> {
  switch (action._type) {
    case "delay":
      return step.sleep("wait-a-moment", `${action.duration}${action.unit}`);
    case "sendEmail":
      return step.run("send email", async () => {
        return sendEmail({
          to: action.to,
          template: action.template,
        });
      });
    case "updateOptionsStatus":
      return step.run("update options grant status", async () => {
        return updateOptionsStatus({
          to: action.to,
          status: action.status,
        });
      });
    default:
      return Promise.reject("Unknown action type");
  }
}
