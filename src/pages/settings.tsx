import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import ProfileFrom from "@/components/settings/ProfileForm";
import { useEffect } from "react";
import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm";
import PageHeader from "@/components/util/PageHeader";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = "Dashboard | Settings";
  });
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader
        header={t("sidebar.settings")}
      />
      <Card className="p-4">
        <Accordion type="single" collapsible className="w-full px-4">
          <AccordionItem value="profile">
            <AccordionTrigger className="flex-1 text-left">
              <span className="font-medium">{t('fields.updateProfile')}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <ProfileFrom />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="password">
            <AccordionTrigger className="flex-1 text-left">
              <span className="font-medium">{t('fields.updatePassword')}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
                <UpdatePasswordForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}

export default Settings;
