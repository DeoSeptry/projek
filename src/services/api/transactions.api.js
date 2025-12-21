import { baseApi } from "../baseApi";
import { ENDPOINTS } from "../endpoints";
import { qs } from "../qs";
import { TransactionsListResponseSchema } from "../../schemas/transactions/transactions.schema";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params = {}) => ({
        url: `${ENDPOINTS.TRANSACTIONS.LIST}${qs(params)}`,
        method: "GET",
      }),

      transformResponse: (res) => {
        // optional: validasi response pakai Zod (aman + debug enak)
        const parsed = TransactionsListResponseSchema.safeParse(res);
        if (!parsed.success) {
          // fallback aman (jangan crash)
          return { items: [], meta: null, raw: res };
        }

        return {
          items: parsed.data.data,
          meta: parsed.data.meta ?? null,
          raw: parsed.data,
        };
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
     * GET /transactions/:transactionId
     * NOTE: response detail kamu belum dikirim, jadi ini dibuat fleksibel.
     */
    getTransactionById: builder.query({
      query: (transactionId) => ({
        url: ENDPOINTS.TRANSACTIONS.DETAIL(transactionId),
        method: "GET",
      }),
      transformResponse: (res) => res?.data ?? null,
      providesTags: (result, err, id) => [{ type: "Transactions", id }],
    }),


    getTransactionTotalAmounts: builder.query({
      query: () => ({ url: "/transactions/total-amounts", method: "GET" }),

      transformResponse: (res) => {
        const d = res?.data || {};
        return {
          totalDeposits: Number(d.totalDeposits || 0),
          totalWithdrawals: Number(d.totalWithdrawals || 0),
          totalBalances: Number(d.totalBalances || 0),
          raw: res,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetTransactionTotalAmountsQuery,
} = transactionsApi;
