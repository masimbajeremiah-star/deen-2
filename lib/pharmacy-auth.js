import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";

export function hashPassword(password) {
  if (typeof password !== "string" || password.length < 12) throw new Error("Password must be at least 12 characters.");
  const salt = randomBytes(16);
  return salt.toString("hex") + ":" + scryptSync(password, salt, 64).toString("hex");
}
export function verifyPassword(password, stored) {
  try {
    if (typeof password !== "string" || typeof stored !== "string") return false;
    const [saltHex, hashHex, extra] = stored.split(":");
    if (extra !== undefined || !/^[a-f0-9]{32}$/i.test(saltHex) || !/^[a-f0-9]{128}$/i.test(hashHex)) return false;
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, Buffer.from(saltHex, "hex"), 64);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch { return false; }
}
export function issuePharmacyToken(user, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof secret !== "string" || secret.length < 32) throw new Error("A strong token secret is required.");
  const payload = Buffer.from(JSON.stringify({ sub: user.id, pharmacyId: user.pharmacy_id, role: user.role, exp: nowSeconds + 43200 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return payload + "." + sig;
}
export function readPharmacyToken(token, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof secret !== "string" || secret.length < 32 || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payload, sig] = parts;
    const expected = createHmac("sha256", secret).update(payload).digest();
    const actual = Buffer.from(sig, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.sub || !data.pharmacyId || !data.exp || data.exp <= nowSeconds) return null;
    return data;
  } catch { return null; }
}
