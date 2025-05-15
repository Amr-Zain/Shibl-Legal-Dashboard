import ContactForm from "@/components/contact/contactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFetch from "@/hooks/UseFetch";
import type { ContactFormValues, ContactKeys } from "@/schemas";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { data, isPending } = useFetch({
    endpoint: "admin/contact-info",
    queryKey: ["admin/contact-info"],
  });
  
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const contactData = data?.data as  {
    id: number;
    key: ContactKeys;
    value: string;
  }[] ;
  
  const contactObj = contactData?.reduce((acc, item ) => {
    return { ...acc, [item.key]: item.value };
  }, {} as ContactFormValues);
  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("sidebar.contact")}</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger>
            <Button size="sm">
              <PencilIcon className="mr-2 h-4 w-4" />
              {t("buttons.edit")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80vh]">
            <DialogHeader>
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>
            <ContactForm
              contactInfo={contactObj}
              setIsModalOpen={setIsModalOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
      {isPending ? (
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg p-4"></div>
            ))}
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {contactData?.map(({ id, key, value }) => {
            return (
              <Card key={id} className="hover:shadow-sm !gap-3">
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-medium">
                    {t(`contact.${key}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-sm text-muted-foreground">
                    <p>{value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Contact;
