import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);
const requiredTrimmed = (msg) => z.preprocess(trim, z.string().min(1, msg));

/** Item transaksi (sesuaikan jika ada field lain) */
export const TransactionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.coerce.number(),
  amount: z.union([z.string(), z.number()]),
  balance: z.coerce.number(),
  date: z.string(),
  status: z.string(),
  type: z.string(),
});

export const TransactionsListResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(TransactionItemSchema),
  meta: z
    .object({
      page: z.coerce.number(),
      limit: z.coerce.number(),
      totalPages: z.coerce.number(),
      totalResults: z.coerce.number(),
      sort: z.string().optional(),
      order: z.string().optional(),
    })
    .optional(),
});

export const TransactionDetailResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: TransactionItemSchema,
});

export const TransactionTotalAmountsResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.object({
    totalDeposits: z.union([z.string(), z.number()]),
    totalWithdrawals: z.union([z.string(), z.number()]),
    totalBalances: z.union([z.string(), z.number()]),
  }),
});

/** Chart */
export const TransactionsChartPointSchema = z.object({
  period: z.string(), // "2025-12-21"
  value: z.coerce.number(),
});

export const TransactionsChartResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(TransactionsChartPointSchema),
});

/** Payloads */
export const TransactionUpdateAmountSchema = z.object({
  amount: z.coerce.number().positive("Amount harus > 0"),
});

export const TransactionDepositSchema = z.object({
  studentId: requiredTrimmed("studentId wajib diisi."),
  amount: z.coerce.number().positive("Amount harus > 0"),
});

export const TransactionWithdrawSchema = z.object({
  studentId: requiredTrimmed("studentId wajib diisi."),
  amount: z.coerce.number().positive("Amount harus > 0"),
  reason: requiredTrimmed("Alasan wajib diisi."),
});
