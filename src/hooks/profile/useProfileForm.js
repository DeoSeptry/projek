// hooks/profile/useProfileForm.js
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../services/api/profile.api";
import { ProfileUpdateSchema } from "../../schemas/profile/profile.schema";
import { getApiErrorMessage } from "../../utils/authError";


export function useProfileForm() {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving, error: apiError }] =
    useUpdateProfileMutation();

  const form = useForm({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: "",
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, setError, reset, formState } = form;
  const { errors, isDirty, isValid } = formState;

  // Populate form dengan data profile saat pertama load
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        username: profile.username || "",
        phoneNumber: profile.phoneNumber || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile, reset]);

  const submitLogic = useCallback(
    async (values) => {
      if (saving) return;

      try {
        // Filter hanya field yang berubah
        const changedFields = {};
        
        if (values.name?.trim() && values.name !== profile?.name) {
          changedFields.name = values.name.trim();
        }
        
        if (values.username?.trim() && values.username !== profile?.username) {
          changedFields.username = values.username.trim();
        }
        
        if (values.phoneNumber?.trim() && values.phoneNumber !== profile?.phoneNumber) {
          changedFields.phoneNumber = values.phoneNumber.trim();
        }
        
        // Password selalu dikirim jika diisi (tidak perlu compare)
        if (values.password?.trim()) {
          changedFields.password = values.password.trim();
          changedFields.confirmPassword = values.confirmPassword?.trim();
        }

        // Validasi minimal ada 1 field yang berubah
        if (Object.keys(changedFields).length === 0) {
          setError("root", {
            type: "manual",
            message: "Tidak ada perubahan untuk disimpan",
          });
          return;
        }

        const response = await updateProfile(changedFields).unwrap();

        // Reset password fields setelah sukses
        form.setValue("password", "");
        form.setValue("confirmPassword", "");

        // Show success message (optional)
        // You can add toast notification here
        console.log("Profile updated successfully:", response);

        return { success: true, data: response };
      } catch (err) {
        const errorMessage = getApiErrorMessage(err, "Gagal update profil");
        setError("root", {
          type: "manual",
          message: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    },
    [saving, updateProfile, profile, setError, form]
  );

  const onSubmit = handleSubmit(submitLogic);

  const rootErrorMessage = errors?.root?.message || 
    (apiError ? getApiErrorMessage(apiError) : "");

  return {
    profile,
    loadingProfile,
    saving,
    ...form,
    onSubmit,
    rootErrorMessage,
    isDirty, // Untuk check apakah ada perubahan
  };
}