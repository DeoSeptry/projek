import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherCreateSchema } from "../../schemas/teacher/teachers.schema";
import { useCreateTeacherMutation } from "../../services/api/teachers.api";
import { getApiErrorMessage } from "../../utils/authError";


export function useCreateTeacherForm(options) {
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();

  const form = useForm({
    resolver: zodResolver(TeacherCreateSchema),
    defaultValues: {
      name: "",
      username: "",
      grade: 1,
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, setError, clearErrors, formState } = form;

  const clearRootError = React.useCallback(() => {
    clearErrors("root");
  }, [clearErrors]);

  const onSubmit = handleSubmit(async (values) => {
    clearRootError();

    try {
      const res = await createTeacher(values).unwrap();
      options?.onSuccess?.(res);

      // reset form jika mau
      if (options?.resetOnSuccess) form.reset();
    } catch (err) {
      setError("root", { type: "server", message: getApiErrorMessage(err) });
      options?.onError?.(err);
    }
  });

  return {
    ...form,
    onSubmit,
    isLoading,
    rootErrorMessage: formState.errors?.root?.message || "",
  };
}
