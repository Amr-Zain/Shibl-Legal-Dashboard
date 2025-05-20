import { useForm } from "react-hook-form";

import { passwordFormSchema, type UpdatePasswordType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../util/FormField";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Form } from "../ui/form";
import SubmitButton from "../util/SubmitButton";

function UpdatePasswordForm() {
  const { t } = useTranslation();
  const { isPending, mutate } = useMutate({
    endpoint: `admin/profile`,
    method: "post",
    mutationKey: ["profile"],
    onSuccess: (data: { message?: string }) => {
      const title = data?.message || t("successMessages.SectionCreated");
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
    },
    onError: (error: unknown) => {
      passwordForm.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
  });
  const passwordForm = useForm<UpdatePasswordType>({
    resolver: zodResolver(passwordFormSchema),
  });
  const handlePasswordSubmit = async (values: UpdatePasswordType) => {
    mutate(values);
  };

  return (
    <Form {...passwordForm}>
      <form
        onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<UpdatePasswordType>
            control={passwordForm.control}
            name="current_password"
            label="Current Password"
            type="password"
            placeholder="email"
          />
          <Field<UpdatePasswordType>
            control={passwordForm.control}
            name="new_password"
            label="New Password"
            type="New Password"
            placeholder="New Password"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<UpdatePasswordType>
            control={passwordForm.control}
            name="new_password_confirmation"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
          />
        </div>
        {passwordForm.formState.errors.root && (
          <p className="text-red-500 text-sm mb-4">
            {passwordForm.formState.errors.root.message}
          </p>
        )}
        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  );
}

export default UpdatePasswordForm;
