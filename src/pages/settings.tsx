import ContactForm from "@/components/contact/contactForm";
import DataFetcher from "@/components/DataFetcher";
import type { ContactFormValues, ContactKeys } from "@/schemas";

import { useTranslation } from "react-i18next";

interface APIResponse {
  data: {
    id: number;
    key: ContactKeys;
    value: string;
  }[];
}

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("sidebar.settings")}</h1>
      </div>

      <DataFetcher<APIResponse>
        endpoint="admin/contact-info"
        queryKey={["contact"]}
        renderData={(data: APIResponse) => {
          return (
            <ContactForm
              contactInfo={data.data?.reduce((acc, item) => {
                return { ...acc, [item.key]: item.value };
              }, {} as ContactFormValues)}
            />
          );
        }}
      />
    </div>
  );
}

export default Contact;
