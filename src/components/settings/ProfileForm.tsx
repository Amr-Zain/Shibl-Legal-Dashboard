import { AuthContext } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../util/FormField";
import ImageInput from "../util/ImageInput";
import { createAdminFormSchema, type AdminFrom } from "@/schemas";
import { Form } from "../ui/form";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import SubmitButton from "../util/SubmitButton";
import PageHeader from "../util/PageHeader";

function ProfileFrom() {
  const { currentUser } = useContext(AuthContext)!;
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
      adminForm.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
  });
  const adminForm = useForm<AdminFrom>({
    resolver: zodResolver(createAdminFormSchema(t)),
    defaultValues: {
      full_name: currentUser?.full_name || "",
      email: currentUser?.email || "",
      image: currentUser?.image.path,
    },
  });
  const handleAdminSubmit = (values: AdminFrom) => {
    mutate(values);
  };
  useEffect(() => {});
  return (
    <div className="space-y-8 p-6 mt-6">
      <PageHeader header={t('fields.updateProfile')} />
      <Form {...adminForm}>
        <form
          onSubmit={adminForm.handleSubmit(handleAdminSubmit)}
           className="space-y-8 py-6 px-4 border rounded-md bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field<AdminFrom>
              control={adminForm.control}
              name="full_name"
              label={t("fields.fullName")}
              placeholder={t("fields.fullName")}
            />
            <Field<AdminFrom>
              control={adminForm.control}
              name="email"
              label={t("fields.email")}
              placeholder={t("fields.email")}
            />
          </div>
          <ImageInput
            label={t("fields.profileImage")}
            path={adminForm.watch("image")}
            image={currentUser?.image?.url}
            error={adminForm.formState.errors?.image?.message}
            onChange={(path) => {
              adminForm.setValue("image", path as string);
            }}
          />
          {adminForm.formState.errors.root && (
            <p className="text-red-500 text-sm mb-4">
              {adminForm.formState.errors.root.message}
            </p>
          )}
          <SubmitButton isPending={isPending} />
        </form>
      </Form>
    </div>
  );
}

export default ProfileFrom;
