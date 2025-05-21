import { useFieldArray, useForm } from "react-hook-form";
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
import { bannsers, sections } from "@/util/data";
import Field from "../util/FormField";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "../util/ImageInput";
import Swal from "sweetalert2";
import { createSectionSchema, type FormSection } from "@/schemas";
import { formateSection, formateSectionForm } from "@/lib/utils";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../util/SubmitButton";
import { useLocation, useNavigate } from "react-router";
import type { SectionResponse } from "@/util/responsesTypes";
import PageHeader from "../util/PageHeader";

const SectionForm = ({
  isUpdate,
  isBanner,
}: {
  isUpdate?: boolean;
  closeModel?: () => void;
  isBanner?: boolean;
}) => {
  const { t } = useTranslation();
  const { locale } = useThemeConfig();
  const queryClient = useQueryClient();
  const section = useLocation().state as SectionResponse;
  const navigate = useNavigate();
  
  const form = useForm<FormSection>({
    resolver: zodResolver(createSectionSchema(t)),
    defaultValues:formateSectionForm(section),
    mode: "onBlur",
  });

  const { isPending, mutate } = useMutate({
    endpoint: `admin/sections${isUpdate ? "/" + section?.id.toString() : ""}`,
    method: "post",
    mutationKey: [isBanner ? "banners" : "sections"],
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
      queryClient.invalidateQueries({
        queryKey: [isBanner ? "banners" : "sections"],
      });
      navigate('/'+isBanner ? "banners" : "sections")
    },
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
  });
  const onSubmit = (data: FormSection) => {
    mutate(formateSection(data));
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const typeList = isBanner ? bannsers : sections;
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader
        header={t(
          `formTitles.${
            !isUpdate && !isBanner
              ? "createSection"
              : !isUpdate
              ? "createBanner"
              : !isBanner
              ? "updateSection"
              : "updateBanner"
          }`
        )}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-8 py-6 px-4 border rounded-md bg-white`}
        >
          {/* Type Select */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>{t("fields.selectSection")}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    /*  refetch(); */
                  }}
                  defaultValue={field.value}
                  disabled={isUpdate}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("fields.selectSection")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {typeList.map((item) => (
                      <SelectItem key={item.type} value={item.type}>
                        {item.text[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Field
            control={form.control}
            name={`is_active`}
            label={t("fields.active")}
            checkbox
          />
          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
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
              path={form.watch("image")}
              image={section?.image?.url}
              error={form.formState.errors?.image?.message}
              onChange={(path) => {
                console.log(path);
                form.setValue("image", path);
              }}
            />
            <ImageInput
              label={t("fields.sectionIcon")}
              path={form.watch("icon")}
              image={section?.icon?.url}
              error={form.formState.errors?.icon?.message}
              onChange={(path) => form.setValue("icon", path)}
            />
          </div>

          {/* Features Section */}
          {!isBanner && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {t("sections.features")}
              </h3>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 border p-4 rounded">
                  <Field
                    control={form.control}
                    name={`features.${index}.key`}
                    label="key (optional)"
                    placeholder="title"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      control={form.control}
                      name={`features.${index}.valueAr`}
                      placeholder={t("fields.ar.description")}
                      label={t("fields.ar.description")}
                    />
                    <Field
                      control={form.control}
                      name={`features.${index}.valueEn`}
                      placeholder={t("fields.en.description")}
                      label={t("fields.en.description")}
                    />
                  </div>
                  <ImageInput
                    label={t("fields.sectionIcon")}
                    path={form.watch(`features.${index}.path`)}
                    image={section?.features?.[index]?.icon?.url}
                    error={
                      form.formState.errors.features?.[index]?.path?.message
                    }
                    onChange={(path) =>
                      form.setValue(`features.${index}.path`, path as string)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    {t("fields.removeFeature")}
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    id: 0,
                    key: null,
                    valueAr: "",
                    valueEn: "",
                    path: "",
                  })
                }
              >
                {t("fields.addFeature")}
              </Button>
            </div>
          )}

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
};

export default SectionForm;
