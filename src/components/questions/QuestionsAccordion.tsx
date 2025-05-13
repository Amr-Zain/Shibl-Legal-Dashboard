"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";

function QuestionsAccordion({
  questions,
  openDeleteModal,
  openEditModal,
}: {
  questions: Question[];
  openDeleteModal: (question: Question) => void;
  openEditModal: (question: Question) => void;
}) {
  return (
    <Card className="p-4">
      <Accordion type="multiple" className="w-full">
        {questions.map((question) => (
          <AccordionItem key={question.id} value={String(question.id)}>
            <div className="flex items-center justify-between">
              <AccordionTrigger className="flex-1 text-left">
                <span className="font-medium">{question.question}</span>
              </AccordionTrigger>
              <div className="ml-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(question);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(question);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
