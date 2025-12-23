import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionWithdrawSchema } from "../../schemas/transactions/transactions.schema";
import { useWithdrawTransactionMutation } from "../../services/api/transactions.api";
import { getApiErrorMessage } from "../../utils/authError"; // sesuaikan

export function useWithdrawForm(options) {
  const [withdraw, { isLoading }] = useWithdrawTransactionMutation();

  const form = useForm({
    resolver: zodResolver(TransactionWithdrawSchema),
    defaultValues: { studentId: "", amount: "", reason: "" },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    try {
      const res = await withdraw(values).unwrap();
      options?.onSuccess?.(res);
      form.reset({ studentId: "", amount: "", reason: "" });
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
