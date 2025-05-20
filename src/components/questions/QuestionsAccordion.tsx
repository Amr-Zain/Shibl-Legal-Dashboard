import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { QuestionsForm } from "./questionForm";
import type { QuestionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { useState } from "react";
import { FormateQuestionForm } from "@/lib/utils";

function QuestionsAccordion({ questions }: { questions: QuestionResponse[] }) {
  const { locale } = useThemeConfig();
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <Card className="p-4">
      <Accordion type="multiple" className="w-full">
        {questions.map((question) => (
          <AccordionItem key={question.id} value={String(question.id)}>
            <div className="flex items-center justify-between">
              <AccordionTrigger className="flex-1 text-left">
                <span className="font-medium">{question[locale].question}</span>
              </AccordionTrigger>

              <UpdateDeleteModals
                endpoint={`admin/faq/${question.id}`}
                mutationKey="faq"
                setUpdateModal={setUpdateModal}
                updateModal={updateModal}
              >
                <QuestionsForm
                  defaultValues={FormateQuestionForm(question)}
                  closeModal={() => setUpdateModal(false)}
                  isUpdate
                />
              </UpdateDeleteModals>
            </div>
            <AccordionContent className="pb-4 pt-2">
              <div className="text-muted-foreground">
                <p>{question[locale].answer}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

export default QuestionsAccordion;
