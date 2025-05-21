import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import type { QuestionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { FormateQuestionForm } from "@/lib/utils";
import UpdateDeleteModals from "../util/UpdateDeleteModals";

function QuestionsTable({ questions }: { questions: QuestionResponse[] }) {
  const { locale } = useThemeConfig();

  return (
    <Card className="p-4">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">{locale === "en" ? "Question" : "السؤال"}</TableHead>
              <TableHead className="min-w-[300px]">{locale === "en" ? "Answer" : "الإجابة"}</TableHead>
              <TableHead className="text-right">{locale === "en" ? "Actions" : "الإجراءات"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {question[locale].question}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="max-w-2xl line-clamp-2">
                    {question[locale].answer}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <UpdateDeleteModals
                    endpoint={`admin/faq/${question.id}`}
                    mutationKey="faq"
                    updatUrl={"/faq/edit/" + question.id}
                    state={FormateQuestionForm(question)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Card>
  );
}

export default QuestionsTable;