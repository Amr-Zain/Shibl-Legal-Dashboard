import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import type { QuestionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { FormateQuestionForm } from "@/lib/utils";
import UpdateDeleteModals from "../util/NewUpade";

function QuestionsAccordion({ questions }: { questions: QuestionResponse[] }) {
  const { locale } = useThemeConfig();

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
                updatUrl={"/faq/edit/"+question.id}
                state={FormateQuestionForm(question)}
             />
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
