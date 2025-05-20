import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TermsPolicyForm from "@/components/terms/termsPolicyForm";
import PageHeader from "@/components/util/PageHeader";

function Policy() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Dashboard | Privacy-Policy";
  }, []);

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader  header={t("policy.title")} />
      <TermsPolicyForm type="privacy_policy" />
    </div>
  );
}

export default Policy;
