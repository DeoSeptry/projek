// hooks/profile/useAvatarForm.js
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAvatarMutation } from "../../services/api/profile.api";
import { ProfileAvatarUploadSchema } from "../../schemas/profile/profile.schema";
import { getApiErrorMessage } from "../../utils/authError";


export function useAvatarForm() {
  const [updateAvatar, { isLoading, error: apiError }] =
    useUpdateAvatarMutation();

  const form = useForm({
    resolver: zodResolver(ProfileAvatarUploadSchema),
    defaultValues: {
      avatar: null,
    },
    mode: "onChange",
  });

  const { handleSubmit, setError, reset, formState } = form;
  const { errors } = formState;

  const submitLogic = useCallback(
    async (values) => {
      if (isLoading) return;

      try {
        if (!values.avatar) {
          setError("avatar", {
            type: "manual",
            message: "Pilih file gambar terlebih dahulu",
          });
          return { success: false, error: "No file selected" };
        }

        const response = await updateAvatar({ avatar: values.avatar }).unwrap();

        // Reset form setelah sukses
        reset();

        console.log("Avatar updated successfully:", response);

        return { success: true, data: response };
      } catch (err) {
        const errorMessage = getApiErrorMessage(err, "Gagal upload avatar");
        setError("root", {
          type: "manual",
          message: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    },
    [isLoading, updateAvatar, setError, reset]
  );

  const onSubmit = handleSubmit(submitLogic);

  const rootErrorMessage = errors?.root?.message || 
    (apiError ? getApiErrorMessage(apiError) : "");

  return {
    ...form,
    onSubmit,
    isLoading,
    rootErrorMessage,
  };
}