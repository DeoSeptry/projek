// Self-check aturan nominal minimal. Jalankan: node src/schemas/transactions/transactions.schema.check.mjs
import assert from "node:assert/strict";
import {
  MIN_AMOUNT,
  TransactionUpdateAmountSchema,
  TransactionDepositSchema,
  TransactionWithdrawSchema,
} from "./transactions.schema.js";

const msg = (schema, amount, extra) =>
  schema.safeParse({ amount, ...extra }).error?.issues[0].message;

// Tolak di bawah minimum, baik angka maupun string (input form selalu string).
for (const bad of [0, 1, 999, "999", -5000, "", null, undefined, "abc"]) {
  assert(msg(TransactionUpdateAmountSchema, bad), `harus ditolak: ${bad}`);
}

// Pesan pakai bahasa Indonesia, bukan default zod bahasa Inggris.
for (const bad of [999, "", "abc", undefined]) {
  assert.match(msg(TransactionUpdateAmountSchema, bad), /Nominal/);
}
assert.equal(msg(TransactionUpdateAmountSchema, 999), "Nominal minimal Rp 1.000");

// Tepat di batas dan di atasnya diterima, string dikonversi ke number.
assert.equal(TransactionUpdateAmountSchema.parse({ amount: MIN_AMOUNT }).amount, 1000);
assert.equal(TransactionUpdateAmountSchema.parse({ amount: "1500" }).amount, 1500);

// Aturan yang sama berlaku untuk deposit dan withdraw.
assert(msg(TransactionDepositSchema, 999, { studentId: "s1" }));
assert(msg(TransactionWithdrawSchema, 999, { reason: "beli buku" }));
assert.equal(
  TransactionDepositSchema.parse({ studentId: "s1", amount: "1000" }).amount,
  1000
);

console.log("OK: aturan nominal minimal Rp 1.000 terpenuhi");
