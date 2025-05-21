import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import useFetch from "@/hooks/UseFetch";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { SectionResponse } from "@/util/responsesTypes";
import SubmitButton from "../util/SubmitButton";
import { Button } from "../ui/button";

const formSchema = z.object({
  titleAr: z.string().min(10, "Arabic title must be at least 10 characters"),
  titleEn: z.string().min(10, "English title must be at least 10 characters"),
  descAr: z
    .string()
    .min(20, "Arabic description must be at least 20 characters"),
  descEn: z
    .string()
    .min(20, "English description must be at least 20 characters"),
  image: z.string().min(10, "image is required"),
});

function TermsPolicyForm({ type }: { type: "terms" | "privacy_policy" }) {
  const { t } = useTranslation();
  type TermsType = z.infer<typeof formSchema>;
  const {
    isPending: getPending,
    data: response,
    error,
    refetch
  } = useFetch({
    endpoint: `admin/sections?type=${type}`,
    queryKey: [type],
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const data = (response?.data[0] as SectionResponse) || null;
  const { isPending, mutate } = useMutate({
    endpoint: `admin/sections${data ? "/" + data.id : ""}`,
    mutationKey: ["terms"],
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

  const form = useForm<TermsType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: TermsType) => {
    mutate({
      ar: {
        title: values?.titleAr,
        description: values.descAr,
      },
      en: {
        title: values?.titleEn,
        description: values.descEn,
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
        descAr: data?.ar?.description || "",
        descEn: data?.en?.description || "",
        image: data?.image?.path || "",
      });
    }
  }, [data, form, type]);

  if (getPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      (
        <div className="text-red-600">
          {t("error_loading_data")}: <Button
            variant={"destructive"}
            onClick={() => refetch()}
          >
            {t('retry')}
          </Button>
        </div>
      ) 
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-6 px-4 border rounded-md bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field<TermsType>
            name="titleAr"
            control={form.control}
            placeholder={t("fields.ar.title")}
            label={t("fields.ar.title")}
          />
          <Field<TermsType>
            name="titleEn"
            control={form.control}
            placeholder={t("fields.en.title")}
            label={t("fields.en.title")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="descAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.ar.description")}</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    error={form.formState.errors.descAr?.message}
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
            name="descEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.en.description")}</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    error={form.formState.errors.descEn?.message}
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
