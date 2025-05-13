"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { type QuestionFormValues } from "@/schemas";
import QuestionsList from "@/components/questions/QuestionsAccordion";
import { questionsData } from "@/util/data";
import { QuestionsForm } from "@/components/questions/questionForm";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(questionsData);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const openDeleteModal = (question: Question) => {
    setCurrentQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (question: Question) => {
    setCurrentQuestion({ ...question });
    setIsEditModalOpen(true);
  };
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

  const handleUpdateQuestion = (updatedQuestion: QuestionFormValues) => {
    if (!currentQuestion) return;
    const question: Question = {
      is_active: updatedQuestion.is_active!,
      question: updatedQuestion.questionEn,
      answer: updatedQuestion.answerEn,
      id: updatedQuestion.id!, //refetch
    };
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? question : q))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteQuestion = () => {
    if (!currentQuestion) return;
    setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Questions Management</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Add New Question
        </Button>
      </div>
      <QuestionsList
        questions={questions}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
      />
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

      {/* Edit Question Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              Update the question details in both English and Arabic.
            </DialogDescription>
          </DialogHeader>
          <QuestionsForm
            onSubmit={handleUpdateQuestion}
            onCancel={() => setIsCreateModalOpen(false)}
            isUpdate
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              question.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              You're about to delete the question:{" "}
              <span className="font-medium">{currentQuestion?.question}</span>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteQuestion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
