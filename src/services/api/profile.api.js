// services/api/profile.api.js
import { baseApi } from "../baseApi";
import { ENDPOINTS } from "../endpoints";
import { ProfileGetResponseSchema } from "../../schemas/profile/profile.schema";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /profile
     */
    getProfile: builder.query({
      query: () => ({ url: ENDPOINTS.PROFILE.GET, method: "GET" }),
      transformResponse: (res) => {
        const parsed = ProfileGetResponseSchema.safeParse(res);
        return parsed.success ? parsed.data.data : null;
      },
      providesTags: [{ type: "Profile", id: "ME" }],
    }),

    /**
     * PATCH /profile
     * body: name?, username?, phoneNumber?, password?, confirmPassword?
     * Hanya kirim field yang berubah
     */
    updateProfile: builder.mutation({
      query: (body) => {
        // Filter out empty strings dan undefined
        const cleanBody = Object.entries(body).reduce((acc, [key, value]) => {
          const trimmedValue = typeof value === "string" ? value.trim() : value;
          if (trimmedValue !== "" && trimmedValue !== undefined) {
            acc[key] = trimmedValue;
          }
          return acc;
        }, {});

        return {
          url: ENDPOINTS.PROFILE.UPDATE,
          method: "PATCH",
          body: cleanBody,
        };
      },
      invalidatesTags: [{ type: "Profile", id: "ME" }],
    }),

    /**
     * POST /profile/avatar
     * body: avatar (File) -> multipart/form-data
     */
    updateAvatar: builder.mutation({
      query: ({ avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        return {
          url: ENDPOINTS.PROFILE.UPDATE_AVATAR,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Profile", id: "ME" }],
    }),

    /**
     * DELETE /profile/avatar
     */
    deleteAvatar: builder.mutation({
      query: () => ({
        url: ENDPOINTS.PROFILE.DELETE_AVATAR,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Profile", id: "ME" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi;