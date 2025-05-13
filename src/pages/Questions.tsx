import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type QuestionFormValues } from "@/schemas";
import QuestionsList from "@/components/questions/QuestionsAccordion";
import { questionsData } from "@/util/data";
import { QuestionsForm } from "@/components/questions/questionForm";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(questionsData);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateQuestion = (newQuestion: QuestionFormValues) => {
    const question: Question = {
      question: newQuestion.questionEn,
      answer: newQuestion.answerEn,
      is_active: newQuestion.is_active!,
      id: Math.ceil(Math.random() * 20), //refetch
    };
    setQuestions([...questions, question]);

    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Questions Management</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Add New Question
        </Button>
      </div>
      <QuestionsList questions={questions} />
      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Fill in the details for the new question in both English and
              Arabic.
            </DialogDescription>
          </DialogHeader>
          <QuestionsForm
            onSubmit={handleCreateQuestion}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
