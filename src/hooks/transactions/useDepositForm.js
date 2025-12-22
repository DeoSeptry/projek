// src/hooks/useDepositForm.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDepositTransactionMutation } from "../../services/api/transactions.api";
import { TransactionDepositSchema } from "../../schemas/transactions/transactions.schema";
import { getApiErrorMessage } from "../../utils/authError";

export function useDepositForm(options) {
  const [deposit, { isLoading }] = useDepositTransactionMutation();

  const form = useForm({
    resolver: zodResolver(TransactionDepositSchema),
    defaultValues: { 
      studentId: "", 
      amount: "" 
    },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    try {
      const res = await deposit(values).unwrap();
      options?.onSuccess?.(res);
      form.reset({ studentId: "", amount: "" });
    } catch (err) {
      const errorMessage = getApiErrorMessage(err);
      form.setError("root", { 
        type: "server", 
        message: errorMessage 
      });
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