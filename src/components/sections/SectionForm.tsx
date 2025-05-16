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
import { Loader2 } from "lucide-react";

const SectionForm = ({
  section,
  isUpdate,
}: {
  section?: SectionResponse;
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
      image: section?.image?.path,
      icon: section?.icon?.path,
    },
    mode: "onBlur",
  });
  const { isPending: isCreating, mutate: createSection } = useMutate({
    endpoint: "/admin/sections",
    method: "post",
    mutationKey: ["sections"],
  });
  const { isPending: isUpdating, mutate: updateSection } = useMutate({
    endpoint: `/admin/sections/${section?.id.toString()}`,
    method: "post",
    mutationKey: ["sections"],
  });
  const onSubmit = (data: FormSection) => {
    console.log(data);
    if (isUpdate && section?.id) {
      updateSection({ ...data, id: section.id });
    } else {
      createSection(data);
    }
  };

  useEffect(() => {}, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            label={t("fields.sectionImage")}
            path={form.watch('image')}
            image={section?.image?.url}
            onChange={(path) => {console.log(path);form.setValue("image", path)}}
          />
          <ImageInput
            label={t("fields.sectionIcon")}
            path={form.watch('icon')}
            image={section?.icon?.url}
            onChange={(path) => form.setValue("icon", path)}
          />
        </div>

        <Field
          control={form.control}
          name={`is_active`}
          label="Active Status"
          checkbox
        />
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? (
            <>
              {
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("buttons.saving")}
                </div>
              }
            </>
          ) : (
            t("buttons.save")
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SectionForm;
