import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Field from "../util/FormField";
import { TitleFeatureFormSchema, type TitleFeatureFormValues } from "@/schemas";
import ImageInput from "../util/ImageInput";
import { useTranslation } from "react-i18next";

interface Props {
  defaultValues?: TitleFeatureFormValues;
  onCancel?: () => void;
  isUpdate?: boolean;
}

export function TitleFeatureForm({
  defaultValues,
  onCancel,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TitleFeatureFormValues>({
    resolver: zodResolver(TitleFeatureFormSchema),
    defaultValues: defaultValues || {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      path: '',
      is_active: true,
    },
    mode: "onBlur",
  });
  const { t }  = useTranslation();
  const handleSubmit = async (values: TitleFeatureFormValues) => {
    setIsLoading(true);
  
  };
  useEffect(() => {
    //if update set get the question data if the props is comming with one language
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <Field<TitleFeatureFormValues>
            control={form.control}
            name="titleEn"
            label="title (English)"
            placeholder="Enter title in English"
          />
          <Field<TitleFeatureFormValues>
            control={form.control}
            name="descriptionEn"
            label="description (English)"
            placeholder="Enter description in English"
          />
          <Field<TitleFeatureFormValues>
            control={form.control}
            name="titleAr"
            label="title (Arabic)"
            dir="rtl"
            placeholder="أدخل العنوان بالعربية"
          />
          <Field<TitleFeatureFormValues>
            control={form.control}
            name="descriptionAr"
            label="description (Arabic)"
            dir="rtl"
            placeholder="أدخل الوصف بالعربية"
          />
          <Field
            control={form.control}
            name={`is_active`}
            label="Active Status"
            checkbox
          />
           <ImageInput
            label={t("fields.sectionIcon")}
            path={form.watch("path")}
            image={defaultValues?.icon }
            error={form.formState.errors?.path?.message}
            onChange={(path) => form.setValue("path", path as string)}
          />
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
