import { useForm } from "react-hook-form";

import { passwordFormSchema, type UpdatePasswordType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../util/FormField";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Form } from "../ui/form";
import SubmitButton from "../util/SubmitButton";
import PageHeader from "../util/PageHeader";

function UpdatePasswordForm() {
  const { t } = useTranslation();
  const { isPending, mutate } = useMutate({
    endpoint: `admin/profile/update-password`,
    method: "post",
    mutationKey: ["update-password"],
    onSuccess: (data: { message?: string }) => {
      const title = data?.message || t("successMessages.updatePassword");
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
    <div className="space-y-8 p-6 mt-6">
      <PageHeader header={t("fields.updatePassword")} />
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
           className="space-y-8 py-6 px-4 border rounded-md bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field<UpdatePasswordType>
              control={passwordForm.control}
              name="current_password"
              label={t("fields.currentPassword")}
              type="password"
              placeholder={t("fields.currentPassword")}
            />
            <Field<UpdatePasswordType>
              control={passwordForm.control}
              name="new_password"
              label={t("fields.newPassword")}
              type="Password"
              placeholder={t("fields.newPassword")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field<UpdatePasswordType>
              control={passwordForm.control}
              name="new_password_confirmation"
              label={t("fields.confirmNewPassword")}
              type="password"
              placeholder={t("fields.confirmNewPassword")}
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
    </div>
  );
}

export default UpdatePasswordForm;
