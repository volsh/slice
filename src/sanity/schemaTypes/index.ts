import delay from "./actions/delay";
import sendEmail from "./actions/send-email";
import updateOptionsStatus from "./actions/update-options-status";
import workflow from "./documents/workflow";

export const schemaTypes = [workflow, delay, sendEmail, updateOptionsStatus];
