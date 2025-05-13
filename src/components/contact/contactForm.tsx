import { Button } from "@/components/ui/button";
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

function ContactForm({
  setIsModalOpen,
  contactInfo,
}: {
  setIsModalOpen: (show: boolean) => void;
  contactInfo?: ContactFormValues;
}) {
  const countryCodes = [
    { value: "+966", label: "Saudi Arabia (+966)" },
    { value: "+971", label: "UAE (+971)" },
    { value: "+20", label: "Egypt (+20)" },
  ];

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    const formattedPhone = `${data.phone_code} ${data.phone}`;
    console.log("Formatted phone:", formattedPhone);
    setIsModalOpen(false);
  };

  const phoneMatch = contactInfo?.phone?.match(/^(\+\d+)\s(.+)$/);
  const defaultPhoneCode = phoneMatch ? phoneMatch[1] : "+966";
  const defaultPhoneNumber = phoneMatch ? phoneMatch[2] : "";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: contactInfo?.email || "",
      address: contactInfo?.address || "",
      appointments: contactInfo?.appointments || "",
      facebook: contactInfo?.facebook || "",
      x: contactInfo?.x || "",
      instagram: contactInfo?.instagram || "",
      phone_code: defaultPhoneCode,
      phone: defaultPhoneNumber,
    },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-scroll">
          <Field
            control={form.control}
            name="email"
            label="Email"
            placeholder="contact@example.com"
          />

          <Field
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter address"
          />

          <Field
            control={form.control}
            name="appointments"
            label="Appointments"
            placeholder="Working hours"
          />

          <FormField
            control={form.control}
            name="phone_code"
            render={({ field }) => (
              <FormItem className="w-[120px]">
                <FormLabel>Phone Code</FormLabel>
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
            label="Phone"
            placeholder="1234567890"
            className="flex-1"
          />

          <Field
            control={form.control}
            name="facebook"
            label="Facebook"
            placeholder="https://facebook.com/..."
            type="url"
          />

          <Field
            control={form.control}
            name="x"
            label="Twitter (X)"
            placeholder="https://x.com/..."
            type="url"
          />

          <Field
            control={form.control}
            name="instagram"
            label="Instagram"
            placeholder="https://instagram.com/..."
            type="url"
          />
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
        </div>

      </form>
    </Form>
  );
}

export default ContactForm;
