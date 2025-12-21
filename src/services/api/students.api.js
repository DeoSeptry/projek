import { baseApi } from "../baseApi";
import { qs } from "../qs";
import { ENDPOINTS } from "../endpoints"; // kalau kamu punya endpoints.js
import {
  StudentsListResponseSchema,
  StudentsTotalResponseSchema,
  StudentsBulkActionSchema,
} from "../../schemas/students/students.schema";

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /students
     */
    getStudents: builder.query({
      query: (params = {}) => ({
        url: `${ENDPOINTS.STUDENT.LIST}${qs(params)}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        const parsed = StudentsListResponseSchema.safeParse(res);
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
          { type: "Students", id: "LIST" },
          { type: "Students", id: "TOTAL" }, // opsional: biar list query juga bisa "terkait"
          ...items.map((s) => ({ type: "Students", id: s.id })),
        ];
      },
    }),

    /**
     * GET /students/total
     */
    getStudentsTotal: builder.query({
      query: () => ({ url: ENDPOINTS.STUDENT.TOTAL, method: "GET" }),
      transformResponse: (res) => {
        const parsed = StudentsTotalResponseSchema.safeParse(res);
        if (!parsed.success) return null;
        return parsed.data.data;
      },
      providesTags: [{ type: "Students", id: "TOTAL" }],
    }),

    /**
     * PATCH /students/promote-to-next-grade
     * body: { studentIds: string[] }
     */
    promoteStudentsToNextGrade: builder.mutation({
      query: (body) => {
        // optional validate payload (biar aman)
        const parsed = StudentsBulkActionSchema.safeParse(body);
        if (!parsed.success) {
          // lempar error yang bisa ditangkap UI
          throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");
        }

        return {
          url: ENDPOINTS.STUDENT.PROMOTE,
          method: "PATCH",
          body: parsed.data,
        };
      },
      // ✅ setelah promote, list & total harus refresh
      invalidatesTags: (result, error, arg) => [
        { type: "Students", id: "LIST" },
        { type: "Students", id: "TOTAL" },
        // opsional: invalidate tiap id yang dipromote
        ...(arg?.studentIds || []).map((id) => ({ type: "Students", id })),
      ],
    }),

    /**
     * PATCH /students/graduate
     * body: { studentIds: string[] }
     */
    graduateStudents: builder.mutation({
      query: (body) => {
        const parsed = StudentsBulkActionSchema.safeParse(body);
        if (!parsed.success) {
          throw new Error(parsed.error.issues?.[0]?.message || "Payload tidak valid");
        }

        return {
          url: ENDPOINTS.STUDENT.GRADUATE,
          method: "PATCH",
          body: parsed.data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Students", id: "LIST" },
        { type: "Students", id: "TOTAL" },
        ...(arg?.studentIds || []).map((id) => ({ type: "Students", id })),
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentsQuery,
  useGetStudentsTotalQuery,
  usePromoteStudentsToNextGradeMutation,
  useGraduateStudentsMutation,
} = studentsApi;
