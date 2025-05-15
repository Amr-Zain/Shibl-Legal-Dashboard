import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { QuestionsForm } from "./questionForm";
import type { QuestionFormValues } from "@/schemas";
import type { QuestionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";

function QuestionsAccordion({ questions }: { questions: QuestionResponse[] }) {
  const { locale } = useThemeConfig();
  const handleUpdateQuestion = async (data: QuestionFormValues) => {
    console.log(data);
  };
  const handleDeleteQuestion = (id: number) => async () => {
    console.log(id);
  };
  const FormateQuestion = (question: QuestionResponse) => ({
    questionEn: question.en.question,
    questionAr: question.ar.question,
    answerAr: question.en.answer,
    answerEn: question.ar.answer,
    is_active: question.is_active
  });
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="w-full">
        {questions.map((question) => (
          <AccordionItem key={question.id} value={String(question.id)}>
            <div className="flex items-center justify-between">
              <AccordionTrigger className="flex-1 text-left">
                <span className="font-medium">{question[locale].question}</span>
              </AccordionTrigger>

              <UpdateDeleteModals onDelete={handleDeleteQuestion(question.id)}>
                <QuestionsForm
                  defaultValues={FormateQuestion(question)}
                  onSubmit={handleUpdateQuestion}
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
