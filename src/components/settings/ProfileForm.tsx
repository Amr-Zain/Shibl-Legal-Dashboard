import { AuthContext } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../util/FormField";
import ImageInput from "../util/ImageInput";
import { adminFormSchema, type AdminFrom } from "@/schemas";
import { Form } from "../ui/form";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import SubmitButton from "../util/SubmitButton";

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
    resolver: zodResolver(adminFormSchema),
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
    <Form {...adminForm}>
      <form
        onSubmit={adminForm.handleSubmit(handleAdminSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<AdminFrom>
            control={adminForm.control}
            name="full_name"
            label="Full Name"
            placeholder="Full Name..."
          />
          <Field<AdminFrom>
            control={adminForm.control}
            name="email"
            label="email"
            placeholder="email"
          />
        </div>
        <ImageInput
          label={"Profile Image"}
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
  );
}

export default ProfileFrom;
