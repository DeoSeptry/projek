// Cek cepat: skema detail cocok dengan response asli GET /transactions/:id
// Jalankan: node src/schemas/transactions/transactions.schema.check.mjs
import assert from "node:assert/strict";
import { TransactionDetailResponseSchema } from "./transactions.schema.js";

const withdrawal = {
  status: true,
  code: 200,
  message: "OK",
  data: {
    id: "bb51af11-9446-4d13-ab30-f4587ada01df",
    name: "Sato",
    amount: "12000",
    type: "WITHDRAWAL",
    date: "2026-09-17T16:01:21.267Z",
    status: "PENDING",
    withdrawalReason: "pengen makan",
    approvedBy: null,
    approvedAt: null,
    updatedAt: null,
  },
};

const parsed = TransactionDetailResponseSchema.safeParse(withdrawal);
assert.ok(parsed.success, `withdrawal gagal parse: ${parsed.error}`);
assert.equal(parsed.data.data.withdrawalReason, "pengen makan");
assert.equal(parsed.data.data.name, "Sato");

// Deposit tidak punya withdrawalReason -> tetap harus lolos
const deposit = {
  ...withdrawal,
  data: { ...withdrawal.data, type: "DEPOSIT", withdrawalReason: null },
};
delete deposit.data.withdrawalReason;
assert.ok(
  TransactionDetailResponseSchema.safeParse(deposit).success,
  "deposit tanpa withdrawalReason harus lolos"
);

console.log("OK: skema detail transaksi cocok dengan response API.");
