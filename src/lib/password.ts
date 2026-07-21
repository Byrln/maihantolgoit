import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const PASSWORD_KEY_LENGTH = 64;

export function generatePassword() {
  return randomBytes(6).toString("base64url");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string | null | undefined) {
  if (!storedHash) {
    return false;
  }

  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, PASSWORD_KEY_LENGTH);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
