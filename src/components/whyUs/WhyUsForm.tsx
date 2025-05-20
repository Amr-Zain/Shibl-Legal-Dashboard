import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Field from "../util/FormField";
import { whyUsFeatureFormSchema, type WhyUsFormValues } from "@/schemas";
import { useMutate } from "@/hooks/UseMutate";
import ImageInput from "../util/ImageInput";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { fromateKeyFeature } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../util/SubmitButton";

interface WhyUsFormProps {
  defaultValues?: WhyUsFormValues;
  onCancel: () => void;
  isUpdate?: boolean;
}

export function WhyUsForm({
  defaultValues,
  onCancel,
  isUpdate,
}: WhyUsFormProps) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutate({
    endpoint: `admin/why-us${isUpdate ? "/" + defaultValues?.id : ""}`,
    method: "post",
    mutationKey: ["why-us"],
    onSuccess: (data: { message?: string }) => {
      onCancel();
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
    },
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
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
    mutate(fromateKeyFeature(values));
  };

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
            error={form.formState.errors?.icon?.message}
            onChange={(path) => form.setValue("icon", path as string)}
          />
        </div>
        {form.formState.errors.root && (
          <p className="text-red-500 text-sm mb-4">
            {form.formState.errors.root.message}
          </p>
        )}
        <div className="flex gap-2 justify-end">
          <Button variant={"outline"} onClick={onCancel} disabled={isPending}>
            {t("buttons.cancel")}
          </Button>
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
