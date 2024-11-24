type UpdateOptionsStatusProps = { to: string; status: string };
export async function updateOptionsStatus({
  to,
  status,
}: UpdateOptionsStatusProps) {
  console.log(`📧 Updated options status for ${to} to status ${status}`);
  return { status: "success", to, optionsStatus: status };
}
