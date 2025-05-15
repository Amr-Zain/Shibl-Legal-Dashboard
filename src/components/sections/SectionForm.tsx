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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { sections } from "@/util/data";
import { useEffect } from "react";
import Field from "../util/FormField";
import { sectionSchema, type FormSection } from "@/schemas";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "../util/ImageInput";
import type { SectionResponse } from "@/util/responsesTypes";

const SectionForm = ({
  section,
  submit,
  isUpdate,
}: {
  section?: SectionResponse;
  submit: (data: FormSection) => Promise<void>;
  isUpdate?: boolean;
}) => {
  const { t } = useTranslation();
  const form = useForm<FormSection>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      type: section?.type,
      titleAr: section?.ar.title,
      titleEn: section?.en.title,
      descriptionAr: section?.ar.description,
      descriptionEn: section?.en.title,
      image: section?.image?.url,
      icon: section?.icon?.url,
    },
    mode: "onBlur",
  });
  const { isPending, mutate: formMutate } = useMutate({
    endpoint: "/admin/sections",
    method: "post",
    mutationKey: ["sections"],
  });
  useEffect(() => {
    //fetch the section ar and eg for default input data for update
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => formMutate(data))}
        className={`space-y-8 p-4 h-[80vh] overflow-y-scroll`}
      >
        {/* Type Select */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.selectSection")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isUpdate}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("fields.selectSection")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections.map((item) => (
                    <SelectItem key={item.type} value={item.type}>
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<FormSection>
            name="descriptionAr"
            control={form.control}
            placeholder={t("fields.ar.description")}
            label={t("fields.ar.description")}
          />
          <Field<FormSection>
            name="descriptionEn"
            control={form.control}
            label={t("fields.en.description")}
            placeholder={t("fields.en.description")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageInput
            name="image"
            label={t("fields.sectionImage")}
            path={section?.image?.path}
            image={section?.image?.url}
            onChange={(path) => form.setValue('image', path)}
            />
          <ImageInput
            name="icon"
            label={t("fields.sectionIcon")}
            path={section?.icon?.path}
            image={section?.icon?.url}
            onChange={(path) => form.setValue('icon', path)}
          />
        </div>

        <Field
          control={form.control}
          name={`is_active`}
          label="Active Status"
          checkbox
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? t("buttons.saving") : t("buttons.save")}
        </Button>
      </form>
    </Form>
  );
};

export default SectionForm;
