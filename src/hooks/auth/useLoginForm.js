import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "../../schemas"; // dari schemas/index.js
import { getApiErrorMessage } from "../../utils/authError";
import { getHomePathByRole } from "../../routes/rolePaths"; // punyamu
import { useLoginMutation } from "../../services/api/auth.api";

export function useLoginForm(options) {
  const navigate = useNavigate();
  const [login, { isLoading, error: apiError }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors, isValid } = formState;

  const clearRootError = React.useCallback(() => {
    clearErrors("root");
  }, [clearErrors]);

  const submitLogic = React.useCallback(
    async (values) => {
      if (isLoading) return;
      clearRootError();

      try {
        const res = await login(values).unwrap();

        if (options?.onSuccess) {
          options.onSuccess(res);
          return;
        }

        const role = res?.data?.role ?? null;
        navigate(getHomePathByRole(role), { replace: true });
      } catch (err) {
        setError("root", { type: "server", message: getApiErrorMessage(err) });
      }
    },
    [isLoading, clearRootError, login, navigate, options, setError]
  );

  const onSubmit = handleSubmit(submitLogic);

  const rootErrorMessage =
    errors?.root?.message || (apiError ? getApiErrorMessage(apiError) : "");

  const disableSubmit = !isValid || isLoading;

  return {
    ...form,
    onSubmit,
    isLoading,
    disableSubmit,
    rootErrorMessage,
    clearRootError,
  };
}
