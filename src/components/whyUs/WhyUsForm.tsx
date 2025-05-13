import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Field from "../util/FormField";
import { whyUsFeatureFormSchema, type WhyUsFormValues } from "@/schemas";

interface WhyUsFormProps {
    defaultValues?: Partial<WhyUsFormValues>;
    onSubmit: (values: WhyUsFormValues) => Promise<void>;
    onCancel?: () => void;
}


export function WhyUsForm({
  defaultValues,
  onSubmit,
  onCancel,
}: WhyUsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (values: WhyUsFormValues) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  }, [defaultValues]);

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