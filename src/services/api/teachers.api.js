import { TeacherDetailResponseSchema, TeacherListResponseSchema } from "../../schemas/teacher/teachers.schema";
import { baseApi } from "../baseApi";
import { ENDPOINTS } from "../endpoints";
import { qs } from "../qs";



export const teachersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /users/teachers
     * params optional: { page, limit, sort, order, search, grade }
     * (kalau backend belum support params, tetap aman)
     */
    getTeachers: builder.query({
      query: (params = {}) => ({
        url: `${ENDPOINTS.TEACHER.LIST}${qs(params)}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = TeacherListResponseSchema.safeParse(res);
        if (!parsed.success) {
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
          { type: "Teachers", id: "LIST" },
          ...items.map((t) => ({ type: "Teachers", id: t.id })),
        ];
      },
    }),

    /**
     * GET /users/teachers/:id
     */
    getTeacherById: builder.query({
      query: (userId) => ({
        url: ENDPOINTS.TEACHER.DETAIL(userId),
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = TeacherDetailResponseSchema.safeParse(res);
        return parsed.success ? parsed.data.data : null;
      },
      providesTags: (result, err, userId) => [{ type: "Teachers", id: userId }],
    }),

    /**
     * POST /users/teachers
     * body: name, username, password, confirmPassword, grade
     */
    createTeacher: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.TEACHER.CREATE,
        method: "POST",
        body,
      }),
      // ✅ setelah create sukses: list auto refetch
      invalidatesTags: [{ type: "Teachers", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
} = teachersApi;
