import { useEffect } from "react";

import QuestionsList from "@/components/questions/QuestionsTable";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import type { QuestionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import { Button } from "@/components/ui/button";

export default function QuestionsPage() {
  const { data, isPending, error, refetch } = useFetch<{ data: QuestionResponse[] }>({
    endpoint: "admin/faq",
    queryKey: ["faq"],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const questions = data?.data as QuestionResponse[];

  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Dashboard | FAQs";
  }, []);
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.faqs")} url="/faq/create" />
      {error ?(
        <div className="text-red-600">
          {t("error_loading_data")}: <Button
            variant={"destructive"}
            onClick={() => refetch()}
          >
            {t('retry')}
          </Button>
        </div>
      )  : (
        <QuestionsList questions={questions} isPending={isPending} />
      )}
    </div>
  );
}
