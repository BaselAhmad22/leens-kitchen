import { cookies } from "next/headers";

const COOKIE = "leens_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "leenadmin";
}

export async function isAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  return token === sessionToken();
}

export function sessionToken() {
  return Buffer.from(`ok:${getAdminPassword()}`).toString("base64url");
}

export { COOKIE };
