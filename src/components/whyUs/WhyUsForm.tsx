import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Field from "../util/FormField";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "../util/ImageInput";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { fromateKeyFeature } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../util/SubmitButton";
import { useLocation, useNavigate } from "react-router";
import PageHeader from "../util/PageHeader";
import { createWhyUsFeatureFormSchema, type WhyUsFormValues } from "@/schemas";

export function WhyUsForm({ isUpdate }: { isUpdate?: boolean }) {
  const queryClient = useQueryClient();
  const defaultValues = useLocation().state as WhyUsFormValues;
  const navigate = useNavigate();

  const { isPending, mutate } = useMutate({
    endpoint: `admin/why-us${isUpdate ? "/" + defaultValues?.id : ""}`,
    method: "post",
    mutationKey: ["why-us"],
    onSuccess: (data: { message?: string }) => {
      const title =
        data?.message ||
        t(
          isUpdate
            ? "successMessages.WayUsUpdated"
            : "successMessages.WayUsCreated"
        );
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["why-us"],
      });
      navigate("/why-us");
    },
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
  });
  const { t } = useTranslation();
  const form = useForm<WhyUsFormValues>({
    resolver: zodResolver(createWhyUsFeatureFormSchema(t)),
    defaultValues: defaultValues || {
      is_active: true,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (values: WhyUsFormValues) => {
    mutate(fromateKeyFeature(values));
  };

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.whyUs")} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 py-6 px-4 border rounded-md bg-white"
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<WhyUsFormValues>
                control={form.control}
                name="keyEn"
                label={t("fields.en.key")}
                placeholder={t("fields.en.key")}
              />
              <Field<WhyUsFormValues>
                control={form.control}
                name="keyAr"
                label={t("fields.ar.key")}
                placeholder={t("fields.ar.key")}
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<WhyUsFormValues>
                control={form.control}
                name="value"
                label={t("fields.value")}
                placeholder={t("fields.value")}
              />

              <ImageInput
                label={t("fields.sectionIcon")}
                path={form.watch("icon")}
                image={defaultValues?.url as string}
                error={form.formState.errors?.icon?.message}
                onChange={(path) => form.setValue("icon", path as string)}
              />
            </div>
            <Field<WhyUsFormValues>
              control={form.control}
              name="is_active"
              label={t("fields.active")}
              checkbox
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-red-500 text-sm mb-4">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="flex gap-2 justify-end">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </Form>
    </div>
  );
}
