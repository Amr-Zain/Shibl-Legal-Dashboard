import { useState } from "react";
import { Button } from "@/components/ui/button";

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
import { Plus } from "lucide-react";
import useFetch from "@/hooks/UseFetch";
import type { QuestionResponse } from "@/util/responsesTypes";

export default function QuestionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, isPending } = useFetch<{data:QuestionResponse[]}>({
    endpoint: "admin/faq",
    queryKey: ["admin/faq"],
  });
  


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const questions = data?.data as QuestionResponse[];

  const { t } = useTranslation();
  console.log(isPending)

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">{t("sidebar.faqs")}</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus />
          {t("buttons.add")}
        </Button>
      </div>
      {isPending ? (
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg p-4"></div>
            ))}
          </div>
        </div>
      ) : (
        <QuestionsList questions={questions} />
      )}
      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('formsTitle.questionCreateTitle')}</DialogTitle>
            <DialogDescription>{t('formsTitle.questionCreateTitleDes')}</DialogDescription>
          </DialogHeader>
          <QuestionsForm
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
