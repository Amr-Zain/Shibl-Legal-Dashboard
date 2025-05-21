import { useEffect } from "react";

import QuestionsList from "@/components/questions/QuestionsTable";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/util/PageHeader";

export default function QuestionsPage() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Dashboard | FAQs";
  }, []);
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.faqs")} url="/faq/create" />
      <QuestionsList />
    </div>
  );
}
