import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParentCreateSchema } from "../../schemas/parents/parents.schema";
import { useCreateParentMutation } from "../../services/api/parents.api";
import { getApiErrorMessage } from "../../utils/authError"; // pakai punyamu

const normalizePhoneNumber = (value) => {
  if (typeof value !== "string") return value;
  const compact = value.trim().replace(/\s|-/g, "");
  if (compact.startsWith("+62")) return compact;
  if (compact.startsWith("62")) return `+${compact}`;
  if (compact.startsWith("0")) return `+62${compact.slice(1)}`;
  return compact;
};

export function useParentCreateForm(options) {
  const [createParent, { isLoading }] = useCreateParentMutation();

  const form = useForm({
    resolver: zodResolver(ParentCreateSchema),
    defaultValues: {
      nisn: "",
      studentName: "",
      parentName: "",
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    try {
      const payload = {
        ...values,
        phoneNumber: normalizePhoneNumber(values.phoneNumber),
      };
      const res = await createParent(payload).unwrap();
      options?.onSuccess?.(res);
      form.reset();
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
