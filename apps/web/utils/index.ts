import { randomBytes } from "crypto";

function generateSecureUniqueChar(length: number = 6): string {
  return randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "") // Remove non-alphanumeric characters
    .substring(0, length);
}

// Usage
const secureUniqueChar = generateSecureUniqueChar();
console.log(secureUniqueChar); // Example output: "A1b2C3"
