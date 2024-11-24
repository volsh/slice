type SendEmailProps = { to: string; template: string };
export async function sendEmail({ to, template }: SendEmailProps) {
  console.log(`📧 Sending email to ${to} with template ${template}`);
  return { status: "success", to, template };
}
