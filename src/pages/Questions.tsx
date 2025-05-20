import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QuestionsList from "@/components/questions/QuestionsAccordion";
import { QuestionsForm } from "@/components/questions/questionForm";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import type { QuestionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";

export default function QuestionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, isPending } = useFetch<{ data: QuestionResponse[] }>({
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
      <PageHeader
        header={t("sidebar.faqs")}
        onClick={() => setIsCreateModalOpen(true)}
      />
      {isPending ? (
        <div className="container mx-auto p-6">
          <Skeleton count={5} h={12} />
        </div>
      ) : (
        <QuestionsList questions={questions} />
      )}
      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("formsTitle.questionCreateTitle")}</DialogTitle>
            <DialogDescription>
              {t("formsTitle.questionCreateTitleDes")}
            </DialogDescription>
          </DialogHeader>
          <QuestionsForm closeModal={() => setIsCreateModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
