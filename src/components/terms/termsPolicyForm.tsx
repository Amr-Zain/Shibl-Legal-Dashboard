import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "@/components/util/Editor";
import Field from "@/components/util/FormField";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "@/components/util/ImageInput";
import Swal from "sweetalert2";
import { useEffect } from "react";
import type { SectionResponse } from "@/util/responsesTypes";
import SubmitButton from "../util/SubmitButton";
import { sectionSchema, type FormSection } from "@/schemas";

function TermsPolicyForm({
  type,
  data,
}: {
  type: "terms" | "privacy_policy";
  data: SectionResponse;
}) {
  const { t } = useTranslation();

  const { isPending, mutate } = useMutate({
    endpoint: `admin/sections${data ? "/" + data.id : ""}`,
    mutationKey: [type],
    onError: (error) => {
      Swal.fire({
        title: t("error"),
        text: error instanceof Error ? error.message : t("error"),
        icon: "error",
        confirmButtonText: t("buttons.ok"),
      });
    },
    onSuccess: (data: { message?: string }) => {
      Swal.fire({
        title: t("success"),
        text:
          data?.message ||
          t(`${type === "terms" ? "terms" : "policy"}.updateSuccess`),
        icon: "success",
        confirmButtonText: t("buttons.ok"),
      });
    },
  });

  const form = useForm<FormSection>({
    resolver: zodResolver(sectionSchema),
  });
  const onSubmit = async (values: FormSection) => {
    mutate({
      ar: {
        title: values?.titleAr,
        description: values.descriptionAr,
      },
      en: {
        title: values?.titleEn,
        description: values.descriptionEn,
      },
      image: values.image,
      type,
    });
  };
  useEffect(() => {
    if (data) {
      form.reset({
        titleAr: data?.ar?.title || "",
        titleEn: data?.en?.title || "",
        descriptionAr: data?.ar?.description || "",
        descriptionEn: data?.en?.description || "",
        image: data?.image?.path || "",
      });
    }
  }, [data, form, type]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-6 px-4 border rounded-md bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field<FormSection>
            name="titleAr"
            control={form.control}
            placeholder={t("fields.ar.title")}
            label={t("fields.ar.title")}
          />
          <Field<FormSection>
            name="titleEn"
            control={form.control}
            placeholder={t("fields.en.title")}
            label={t("fields.en.title")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.ar.description")}</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    error={form.formState.errors.descriptionAr?.message}
                    placeholder={t("fields.ar.description")}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.en.description")}</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    error={form.formState.errors.descriptionEn?.message}
                    placeholder={t("fields.en.description")}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ImageInput
          label={t("fields.sectionIcon")}
          path={form.watch("image")}
          image={data?.image?.url}
          error={form.formState.errors?.image?.message}
          onChange={(path) => form.setValue("image", path || "")}
        />

        <div className="flex justify-end">
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}

export default TermsPolicyForm;
