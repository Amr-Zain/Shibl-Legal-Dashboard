import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TermsPolicyForm from "@/components/terms/termsPolicyForm";
import PageHeader from "@/components/util/PageHeader";

function Terms() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Dashboard | Terms";
  }, []);

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("terms.title")} />
      <TermsPolicyForm type="terms" />
    </div>
  );
}

export default Terms;
