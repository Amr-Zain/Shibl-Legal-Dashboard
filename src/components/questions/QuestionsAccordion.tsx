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

function QuestionsAccordion({ questions }: { questions: Question[] }) {
  const handleUpdateQuestion = async (data: QuestionFormValues) => {
    console.log(data);
  };
  const handleDeleteQuestion = (id: number) => async () => {
    console.log(id);
  };
  const FormateQuestion = (question: Question) => ({
    questionEn: question.question,
    questionAr: question.question,
    answerAr: question.answer,
    answerEn: question.answer,
  });
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="w-full">
        {questions.map((question) => (
          <AccordionItem key={question.id} value={String(question.id)}>
            <div className="flex items-center justify-between">
              <AccordionTrigger className="flex-1 text-left">
                <span className="font-medium">{question.question}</span>
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
                <p className="font-semibold text-sm mb-1">Answer:</p>
                <p>{question.answer}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

export default QuestionsAccordion;
