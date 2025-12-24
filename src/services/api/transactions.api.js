import { baseApi } from "../baseApi";
import { ENDPOINTS } from "../endpoints";
import { qs } from "../qs";

import {
  TransactionsListResponseSchema,
  TransactionDetailResponseSchema,
  TransactionTotalAmountsResponseSchema,
  TransactionsChartResponseSchema,
  TransactionUpdateAmountSchema,
  TransactionDepositSchema,
  TransactionWithdrawSchema,
} from "../../schemas/transactions/transactions.schema";

function chartTagId(params) {
  // biar cache chart beda per kombinasi params
  const { type, groupBy, startDate, endDate } = params || {};
  return `CHART:${type || "all"}:${groupBy || "all"}:${startDate || "all"}:${endDate || "all"}`;
}

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /transactions
     * params optional: { page, limit, sort, order, grade, type, status, ... }
     */
    getTransactions: builder.query({
      query: (params = {}) => ({
        url: `${ENDPOINTS.TRANSACTIONS.LIST}${qs(params)}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = TransactionsListResponseSchema.safeParse(res);
        if (!parsed.success) {
  console.error("Schema validation failed:", parsed.error.issues);
  
  // Return raw data tanpa reject
  return { 
    items: Array.isArray(res?.data) ? res.data : [], 
    meta: res?.meta || null, 
    raw: res 
  };
}
        return { items: parsed.data.data, meta: parsed.data.meta ?? null, raw: parsed.data };
      },
      providesTags: (result) => {
        const items = result?.items ?? [];
        return [
          { type: "Transactions", id: "LIST" },
          ...items.map((t) => ({ type: "Transactions", id: t.id })),
        ];
      },
    }),

    /**
     * GET /transactions/total-amounts
     */
    getTransactionTotalAmounts: builder.query({
      query: () => ({ url: ENDPOINTS.TRANSACTIONS.TOTAL_AMOUNTS, method: "GET" }),
      transformResponse: (res) => {
        const parsed = TransactionTotalAmountsResponseSchema.safeParse(res);
        if (!parsed.success) return null;

        const d = parsed.data.data;
        return {
          totalDeposits: Number(d.totalDeposits ?? 0),
          totalWithdrawals: Number(d.totalWithdrawals ?? 0),
          totalBalances: Number(d.totalBalances ?? 0),
        };
      },
      providesTags: [{ type: "Transactions", id: "TOTAL_AMOUNTS" }],
    }),

    /**
     * GET /transactions/:id
     */
    getTransactionById: builder.query({
      query: (transactionId) => ({
        url: ENDPOINTS.TRANSACTIONS.DETAIL(transactionId),
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = TransactionDetailResponseSchema.safeParse(res);
        return parsed.success ? parsed.data.data : null;
      },
      providesTags: (r, e, id) => [{ type: "Transactions", id }],
    }),

    /**
     * GET /transactions/chart?type=deposit&groupBy=day&startDate=...&endDate=...
     * params wajib: { type, groupBy, startDate, endDate }
     */
    getTransactionsChart: builder.query({
      query: (params) => ({
        url: `${ENDPOINTS.TRANSACTIONS.CHART}${qs(params)}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = TransactionsChartResponseSchema.safeParse(res);
        return parsed.success ? parsed.data.data : [];
      },
      providesTags: (r, e, arg) => [
        { type: "Transactions", id: chartTagId(arg) },
      ],
    }),

    /**
     * PATCH /transactions/:id  (body: { amount })
     */
    updateTransactionAmount: builder.mutation({
      query: ({ transactionId, amount }) => {
        const parsed = TransactionUpdateAmountSchema.safeParse({ amount });
        if (!parsed.success) throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");

        return {
          url: ENDPOINTS.TRANSACTIONS.UPDATE(transactionId),
          method: "PATCH",
          body: parsed.data,
        };
      },
      invalidatesTags: (r, e, arg) => [
        { type: "Transactions", id: "LIST" },
        { type: "Transactions", id: "TOTAL_AMOUNTS" },
        { type: "Transactions", id: arg.transactionId },
        // chart params tidak diketahui, jadi invalidate semua chart cache yang penting:
        { type: "Transactions", id: "CHART:deposit:day:all:all" }, // optional placeholder
      ],
    }),

    /**
     * DELETE /transactions/:id
     */
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: ENDPOINTS.TRANSACTIONS.DELETE(transactionId),
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => [
        { type: "Transactions", id: "LIST" },
        { type: "Transactions", id: "TOTAL_AMOUNTS" },
        { type: "Transactions", id },
      ],
    }),

    /**
     * POST /transactions/deposit (body: { studentId, amount })
     */
    depositTransaction: builder.mutation({
      query: (body) => {
        const parsed = TransactionDepositSchema.safeParse(body);
        if (!parsed.success) throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");

        return {
          url: ENDPOINTS.TRANSACTIONS.DEPOSIT,
          method: "POST",
          body: parsed.data,
        };
      },
      invalidatesTags: [
        { type: "Transactions", id: "LIST" },
        { type: "Transactions", id: "TOTAL_AMOUNTS" },
        // chart juga berubah
      ],
    }),

    /**
     * POST /transactions/withdraw (body: { studentId, amount, reason })
     */
    withdrawTransaction: builder.mutation({
      query: (body) => {
        const parsed = TransactionWithdrawSchema.safeParse(body);
        if (!parsed.success) throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");

        return {
          url: ENDPOINTS.TRANSACTIONS.WITHDRAW,
          method: "POST",
          body: parsed.data,
        };
      },
      invalidatesTags: [
        { type: "Transactions", id: "LIST" },
        { type: "Transactions", id: "TOTAL_AMOUNTS" },
      ],
    }),

    /**
     * PATCH /transactions/withdraw/:transactionId  (approve)
     */
    approveWithdraw: builder.mutation({
      query: (transactionId) => ({
        url: ENDPOINTS.TRANSACTIONS.APPROVE_WITHDRAW(transactionId),
        method: "PATCH",
      }),
      invalidatesTags: (r, e, id) => [
        { type: "Transactions", id: "LIST" },
        { type: "Transactions", id: "TOTAL_AMOUNTS" },
        { type: "Transactions", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionTotalAmountsQuery,
  useGetTransactionByIdQuery,
  useGetTransactionsChartQuery,
  useLazyGetTransactionsQuery,

  useUpdateTransactionAmountMutation,
  useDeleteTransactionMutation,
  useDepositTransactionMutation,
  useWithdrawTransactionMutation,
  useApproveWithdrawMutation,
} = transactionsApi;
