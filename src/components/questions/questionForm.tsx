"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Field from "../util/FormField";
import { questionFormSchema, type QuestionFormValues } from "@/schemas";

interface QuestionsFormProps {
  defaultValues?: QuestionFormValues;
  onSubmit: (values: QuestionFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isUpdate?: boolean;
}

export function QuestionsForm({
  defaultValues,
  onSubmit,
  onCancel,
}: QuestionsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: defaultValues || {
      questionEn: "",
      questionAr: "",
      answerEn: "",
      answerAr: "",
      is_active: true,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (values: QuestionFormValues) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    //if update set get the question data if the props is comming with one language
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <Field<QuestionFormValues>
            control={form.control}
            name="questionEn"
            label="Question (English)"
            placeholder="Enter question in English"
          />
          <Field<QuestionFormValues>
            control={form.control}
            name="answerEn"
            label="Answer (English)"
            placeholder="Enter answer in English"
          />
          <Field<QuestionFormValues>
            control={form.control}
            name="questionAr"
            label="Question (Arabic)"
            dir="rtl"
            placeholder="أدخل السؤال بالعربية"
          />
          <Field<QuestionFormValues>
            control={form.control}
            name="answerAr"
            label="Answer (Arabic)"
            dir="rtl"
            placeholder="أدخل الإجابة بالعربية"
          />
          <Field
            control={form.control}
            name={`is_active`}
            label="Active Status"
            checkbox
          />
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
