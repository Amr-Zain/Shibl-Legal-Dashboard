import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import PageHeader from "@/components/util/PageHeader";
import { FormateQuestionForm } from "@/lib/utils";
import UpdateDeleteModals from "@/components/util/UpdateDeleteModals";
import Table from "@/components/util/Table";
import DataFetcher from "@/components/DataFetcher";
import type { Links, Meta, QuestionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { useUrlParams } from "@/hooks/useUrlParams";

type SectionsApiResponse = {
  data: QuestionResponse[];
  links: Links;
  meta: Meta;
};
export default function QuestionsPage() {
  const { t } = useTranslation();
  const { locale } = useThemeConfig();
  const { getParam } = useUrlParams();
  const page = Number(getParam("page")) || 1;
  
   const buildparams = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    return `?${params.toString()}`;
  };
  useEffect(() => {
    document.title = "Dashboard | FAQs";
  }, []);
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.faqs")} url="/faq/create" />
      <DataFetcher<SectionsApiResponse>
        endpoint={"admin/faq"+buildparams()}
        queryKey={["faq"+buildparams()]}
        isTable
        renderData={(response: SectionsApiResponse) => {
          return (
            <Table
              labels={["Question", "Answer", "Actions"]}
              rows={response.data.map((que) =>
                formateQuestionTable(que, locale)
              )}
              meta={response.meta}
            />
          );
        }}
      />
    </div>
  );
}

const formateQuestionTable = (
  question: QuestionResponse,
  locale: "ar" | "en"
) => {
  return {
    id: question.id,
    data: [
      question[locale].question,
      question[locale].answer,
      <UpdateDeleteModals
        endpoint={`admin/faq/${question.id}`}
        mutationKey="faq"
        updatUrl={"/faq/edit/" + question.id}
        state={FormateQuestionForm(question)}
        is_active={question.is_active}
      />,
    ],
  };
};
