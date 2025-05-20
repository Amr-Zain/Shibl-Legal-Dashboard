import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Field from "../util/FormField";
import { TitleFeatureFormSchema, type TitleFeatureFormValues } from "@/schemas";
import ImageInput from "../util/ImageInput";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { fromateFeature } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../util/SubmitButton";
import { useLocation } from "react-router";
import PageHeader from "../util/PageHeader";

export function TitleFeatureForm({ isUpdate }: { isUpdate?: boolean }) {
  const queryClient = useQueryClient();
  const defaultValues = useLocation().state as TitleFeatureFormValues;
  const form = useForm<TitleFeatureFormValues>({
    resolver: zodResolver(TitleFeatureFormSchema),
    defaultValues: defaultValues || {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      path: "",
      is_active: true,
    },
    mode: "onBlur",
  });

  const { isPending, mutate } = useMutate({
    endpoint: `admin/our-features${
      isUpdate ? "/" + defaultValues?.id?.toString() : ""
    }`,
    method: "post",
    mutationKey: ["our-features"],
    onSuccess: (data: { message?: string }) => {
      const title =
        data?.message ||
        t(
          isUpdate
            ? "successMessages.SectionUpdated"
            : "successMessages.SectionCreated"
        );
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["our-features"] });
    },
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
  });
  const { t } = useTranslation();
  const handleSubmit = async (values: TitleFeatureFormValues) => {
    mutate(fromateFeature(values));
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <PageHeader header={t("sidebar.whyUs")} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 py-6 px-4 border rounded-md bg-white">
          <div className="grid gap-4">
            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<TitleFeatureFormValues>
                name="titleAr"
                control={form.control}
                placeholder={t("fields.ar.title")}
                label={t("fields.ar.title")}
              />
              <Field<TitleFeatureFormValues>
                name="titleEn"
                control={form.control}
                placeholder={t("fields.en.title")}
                label={t("fields.en.title")}
              />
            </div>
            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<TitleFeatureFormValues>
                name="descriptionAr"
                control={form.control}
                placeholder={t("fields.ar.description")}
                label={t("fields.ar.description")}
              />
              <Field<TitleFeatureFormValues>
                name="descriptionEn"
                control={form.control}
                label={t("fields.en.description")}
                placeholder={t("fields.en.description")}
              />
            </div>
            <ImageInput
              label={t("fields.sectionIcon")}
              path={form.watch("path")}
              image={defaultValues?.icon}
              error={form.formState.errors?.path?.message}
              onChange={(path) => form.setValue("path", path as string)}
            />
            <Field
              control={form.control}
              name={`is_active`}
              label={t("fields.active")}
              checkbox
            />
          </div>
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm mb-4">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="flex justify-end gap-4">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </Form>
    </div>
  );
}
