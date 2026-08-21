import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

// Single super admin. Set ADMIN_PASSWORD (dan idealnya ADMIN_SECRET) di .env
// sebelum deploy — default di bawah cuma buat development.
const PASSWORD = process.env.ADMIN_PASSWORD ?? "pickmenpack";
const SECRET = process.env.ADMIN_SECRET ?? `${PASSWORD}-dev-secret`;
const COOKIE = "pmp_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

const sign = (value: string) =>
  createHmac("sha256", SECRET).update(value).digest();

const same = (a: Buffer, b: Buffer) =>
  a.length === b.length && timingSafeEqual(a, b);

export async function isLoggedIn() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  return same(Buffer.from(raw, "hex"), sign("super-admin"));
}

/** Dipanggil di layout panel & di setiap server action (action bisa dipanggil langsung via POST). */
export async function requireAdmin() {
  if (!(await isLoggedIn())) redirect("/admin/login");
}

export async function signIn(password: string) {
  if (!same(sign(password), sign(PASSWORD))) return false;
  (await cookies()).set(COOKIE, sign("super-admin").toString("hex"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}
