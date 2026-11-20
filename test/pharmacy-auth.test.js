import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, issuePharmacyToken, readPharmacyToken } from "../lib/pharmacy-auth.js";

const secret = "unit-test-secret-that-is-long-enough-for-hmac-signing";
const user = { id: "user-1", pharmacy_id: "pharmacy-a", role: "PHARMACIST" };

test("password hashes are salted and verify only the correct password", () => {
  const a = hashPassword("correct-horse-battery");
  const b = hashPassword("correct-horse-battery");
  assert.notEqual(a, b);
  assert.equal(verifyPassword("correct-horse-battery", a), true);
  assert.equal(verifyPassword("wrong-password", a), false);
  assert.equal(verifyPassword("correct-horse-battery", "broken"), false);
});

test("pharmacy tokens verify, expire and reject tampering", () => {
  const now = 1_800_000_000;
  const token = issuePharmacyToken(user, secret, now);
  assert.deepEqual(readPharmacyToken(token, secret, now + 1), { sub: "user-1", pharmacyId: "pharmacy-a", role: "PHARMACIST", exp: now + 43200 });
  assert.equal(readPharmacyToken(token, secret, now + 43201), null);
  assert.equal(readPharmacyToken(token + "x", secret, now + 1), null);
  assert.equal(readPharmacyToken(token, "a-different-secret-that-is-long-enough", now + 1), null);
});

test("tokens carry pharmacy identity for route-level isolation", () => {
  const token = issuePharmacyToken(user, secret);
  const claims = readPharmacyToken(token, secret);
  assert.equal(claims.pharmacyId, "pharmacy-a");
  assert.notEqual(claims.pharmacyId, "pharmacy-b");
});

test("weak passwords and weak token secrets are rejected", () => {
  assert.throws(() => hashPassword("short"));
  assert.throws(() => issuePharmacyToken(user, "weak"));
  assert.equal(readPharmacyToken("bad", "weak"), null);
});
