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
import { useTranslation } from "react-i18next";
import DataFetcher from "../DataFetcher";

function QuestionsTable() {
  const { locale } = useThemeConfig();
  const { t } = useTranslation();

  return (
    <Card className="p-4">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">
              {locale === "en" ? "Question" : "السؤال"}
            </TableHead>

            <TableHead className="min-w-[300px]">
              {locale === "en" ? "Answer" : "الإجابة"}
            </TableHead>

            <TableHead className="text-end">
              {locale === "en" ? "Actions" : "الإجراءات"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <DataFetcher<QuestionResponse[]>
            endpoint="admin/faq"
            queryKey={["faq"]}
            isTable
            renderData={(questions: QuestionResponse[]) => {
              if (questions.length === 0) {
                return (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      {t("noDataFound")}
                    </TableCell>
                  </TableRow>
                );
              }
              return questions.map((question) => (
                <TableRow key={question.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {question[locale].question}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="max-w-2xl line-clamp-2">
                      {question[locale].answer}
                    </div>
                  </TableCell>
                  <TableCell className="text-end">
                    <UpdateDeleteModals
                      endpoint={`admin/faq/${question.id}`}
                      mutationKey="faq"
                      updatUrl={"/faq/edit/" + question.id}
                      state={FormateQuestionForm(question)}
                    />
                  </TableCell>
                </TableRow>
              ));
            }}
          />
        </TableBody>
      </Table>
    </Card>
  );
}

export default QuestionsTable;
