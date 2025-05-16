import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Field from "../util/FormField";
import { whyUsFeatureFormSchema, type WhyUsFormValues } from "@/schemas";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "../util/ImageInput";
import { useTranslation } from "react-i18next";

interface WhyUsFormProps {
  defaultValues?: WhyUsFormValues;
  onCancel?: () => void;
  isUpdate?: boolean;
}

export function WhyUsForm({
  defaultValues,
  onCancel,
  isUpdate,

}: WhyUsFormProps) {
  const { isPending: isCreating, mutate: createMutation } = useMutate({
    endpoint: `admin/why-us`,
    method: "post",
    mutationKey: ["admin/contact"],
  });
  const { isPending: isUpdating, mutate: updateMutation } = useMutate({
    endpoint: `admin/why-us/${defaultValues?.id}`,
    method: "post",
    mutationKey: ["admin/contact"],
  });
  const form = useForm<WhyUsFormValues>({
    resolver: zodResolver(whyUsFeatureFormSchema),
    defaultValues: defaultValues || {
      keyEn: "",
      keyAr: "",
      value: 0,
      is_active: true,
    },
    mode: "onBlur",
  });
  const { t } = useTranslation();

  const handleSubmit = async (values: WhyUsFormValues) => {
    const feature = {
      ar: {
        key: values.keyAr,
      },
      en: {
        key: values.keyEn,
      },
      id: values?.id,
      icon: values.icon,
      value: values.value,
      is_active: values.is_active,
    };
    if (isUpdate) {
      updateMutation(feature);
      return;
    }
    createMutation(feature);
  };

  useEffect(() => {}, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <Field<WhyUsFormValues>
            control={form.control}
            name="keyEn"
            label="Key (English)"
            placeholder="Enter key in English"
          />
          <Field<WhyUsFormValues>
            control={form.control}
            name="keyAr"
            label="Key (Arabic)"
            placeholder="أدخل الكلمة بالعربية"
            dir="rtl"
          />

          <Field<WhyUsFormValues>
            control={form.control}
            name="value"
            label="Value"
            placeholder="Enter number value"
            type="number"
          />

          <Field<WhyUsFormValues>
            control={form.control}
            name="is_active"
            label="Active Status"
            checkbox
          />
          <ImageInput
            label={t("fields.sectionIcon")}
            path={form.watch("icon")}
            image={defaultValues?.url as string}
            onChange={(path) => form.setValue("icon", path as string)}
          />
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isUpdating || isCreating}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isUpdating || isCreating}>
            {isUpdating || isCreating ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
