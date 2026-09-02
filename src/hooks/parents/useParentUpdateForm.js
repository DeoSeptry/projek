import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParentUpdateSchema } from "../../schemas/parents/parents.schema";
import { useUpdateParentMutation } from "../../services/api/parents.api";
import { getApiErrorMessage } from "../../utils/authError";

export function useParentUpdateForm({ initialValues, userId, options } = {}) {
  const [updateParent, { isLoading }] = useUpdateParentMutation();

  const form = useForm({
    resolver: zodResolver(ParentUpdateSchema),
    defaultValues: {
      nisn: "",
      studentName: "",
      parentName: "",
      username: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!initialValues) return;
    form.reset({
      nisn: initialValues.nisn || "",
      studentName: initialValues.studentName || "",
      parentName: initialValues.parentName || "",
      username: initialValues.username || "",
      phoneNumber: initialValues.phoneNumber || "",
    });
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    try {
      const res = await updateParent({ userId, ...values }).unwrap();
      options?.onSuccess?.(res);
    } catch (err) {
      form.setError("root", { type: "server", message: getApiErrorMessage(err) });
      options?.onError?.(err);
    }
  });

  return {
    ...form,
    onSubmit,
    isLoading,
    rootErrorMessage: form.formState.errors?.root?.message || "",
  };
}
