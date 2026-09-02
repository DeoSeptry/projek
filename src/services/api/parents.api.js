import { baseApi } from "../baseApi";
import { qs } from "../qs";
import { ENDPOINTS } from "../endpoints";

import {
  ParentsListResponseSchema,
  ParentDetailResponseSchema,
  ParentCreateSchema,
  ParentUpdateSchema,
} from "../../schemas/parents/parents.schema";

export const parentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /users/parents
     * params: page, limit, search, sort, order
     */
    getParents: builder.query({
      query: (params = {}) => ({
        url: `${ENDPOINTS.PARENTS.LIST}${qs(params)}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = ParentsListResponseSchema.safeParse(res);
        if (!parsed.success) return { items: [], meta: null, raw: res };
        return {
          items: parsed.data.data,
          meta: parsed.data.meta ?? null,
          raw: parsed.data,
        };
      },
      providesTags: (result) => {
        const items = result?.items ?? [];
        return [
          { type: "Parents", id: "LIST" },
          ...items.map((p) => ({ type: "Parents", id: p.id })),
        ];
      },
    }),

    /**
     * GET /users/parents/:id
     */
    getParentById: builder.query({
      query: (userId) => ({
        url: ENDPOINTS.PARENTS.DETAIL(userId),
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = ParentDetailResponseSchema.safeParse(res);
        return parsed.success ? parsed.data.data : null;
      },
      providesTags: (r, e, id) => [{ type: "Parents", id }],
    }),

    /**
     * POST /users/parents
     */
    createParent: builder.mutation({
      query: (body) => {
        const parsed = ParentCreateSchema.safeParse(body);
        if (!parsed.success) {
          throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");
        }
        return {
          url: ENDPOINTS.PARENTS.CREATE,
          method: "POST",
          body: parsed.data,
        };
      },
      invalidatesTags: [{ type: "Parents", id: "LIST" }],
    }),

    /**
     * PATCH /users/parents/:id
     */
updateParent: builder.mutation({
  query: ({ userId, ...body }) => {
    const parsed = ParentUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");
    }

    return {
      url: ENDPOINTS.PARENTS.UPDATE(userId),
      method: "PATCH",
      body: parsed.data, // ✅ hanya 5 field
    };
  },
  invalidatesTags: (r, e, arg) => [
    { type: "Parents", id: "LIST" },
    { type: "Parents", id: arg.userId },
  ],
}),


    /**
     * DELETE /users/parents/:id
     */
    deleteParent: builder.mutation({
      query: (userId) => ({
        url: ENDPOINTS.PARENTS.DELETE(userId),
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => [
        { type: "Parents", id: "LIST" },
        { type: "Parents", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetParentsQuery,
  useGetParentByIdQuery,
  useCreateParentMutation,
  useUpdateParentMutation,
  useDeleteParentMutation,
} = parentsApi;
