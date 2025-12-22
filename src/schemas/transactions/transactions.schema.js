import { z } from "zod";

export const TransactionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.coerce.number(),
  amount: z.string(),           // dari backend string "10000"
  balance: z.coerce.number(),   // backend number
  date: z.string(),             // ISO string
  status: z.string(),           // "SUCCESS"
  type: z.string(),             // "DEPOSIT"
});

export const TransactionsMetaSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  totalPages: z.coerce.number(),
  totalResults: z.coerce.number(),
  sort: z.string().optional(),
  order: z.string().optional(),
});

export const TransactionsListResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(TransactionItemSchema),
  meta: TransactionsMetaSchema.optional(),
});
