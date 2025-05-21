import ContactForm from "@/components/contact/contactForm";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/util/Skeleton";
import useFetch from "@/hooks/UseFetch";
import type { ContactFormValues, ContactKeys } from "@/schemas";

import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const { data, isPending, error, refetch } = useFetch({
    endpoint: "admin/contact-info",
    queryKey: ["contact"],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const contactData = data?.data as {
    id: number;
    key: ContactKeys;
    value: string;
  }[];

  const contactObj = contactData?.reduce((acc, item) => {
    return { ...acc, [item.key]: item.value };
  }, {} as ContactFormValues);
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("sidebar.settings")}</h1>
      </div>
      {error ? (
        <div className="text-red-600">
          {t("error_loading_data")}:{" "}
          <Button variant={"destructive"} onClick={() => refetch()}>
            {t("retry")}
          </Button>
        </div>
      ) : isPending ? (
        <Skeleton count={8} h={12} />
      ) : (
        <ContactForm contactInfo={contactObj} />
      )}
    </div>
  );
}

export default Contact;
