import Field from "../util/FormField";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactFormValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../util/SubmitButton";

function ContactForm({ contactInfo }: { contactInfo?: ContactFormValues }) {
  const { t } = useTranslation();
  const countryCodes = [
    { value: "+966", label: "Saudi Arabia (+966)" },
    { value: "+971", label: "UAE (+971)" },
    { value: "+20", label: "Egypt (+20)" },
  ];
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutate({
    endpoint: "admin/contact-info",
    method: "post",
    mutationKey: ["contact"],
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
    onSuccess: (data: { message?: string }) => {
      const title = data?.message || t("successMessages.contactUpdated");
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["contact"],
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: contactInfo?.email || "",
      address: contactInfo?.address || "",
      appoitnments: contactInfo?.appoitnments || "",
      facebook: contactInfo?.facebook || "",
      x: contactInfo?.x || "",
      instagram: contactInfo?.instagram || "",
      phone_code: contactInfo?.phone_code,
      phone: contactInfo?.phone,
    },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6 px-4 border rounded-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            control={form.control}
            name="email"
            label={t("contact.email")}
            placeholder="contact@example.com"
          />

          <Field
            control={form.control}
            name="address"
            label={t(`contact.address`)}
            placeholder={t("fields.address")}
          />

          <Field
            control={form.control}
            name="appoitnments"
            label={t(`contact.appointments`)}
            placeholder={t("fields.workingHours")}
          />

          <FormField
            control={form.control}
            name="phone_code"
            render={({ field }) => (
              <FormItem className="w-[120px]">
                <FormLabel>{t(`contact.phone_code`)}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
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
            name="phone"
            label={t(`contact.phone`)}
            placeholder="1234567890"
            className="flex-1"
          />

          <Field
            control={form.control}
            name="facebook"
            label={t(`contact.facebook`)}
            placeholder="https://facebook.com/..."
          />

          <Field
            control={form.control}
            name="x"
            label={t("contact.x")}
            placeholder="https://x.com/..."
          />

          <Field
            control={form.control}
            name="instagram"
            label={t(`contact.instagram`)}
            placeholder="https://instagram.com/..."
          />
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm mb-4">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <SubmitButton isPending={isPending} />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
