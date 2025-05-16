import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Field from "../util/FormField";
import { questionFormSchema, type QuestionFormValues } from "@/schemas";
import { useMutate } from "@/hooks/UseMutate";
import { useQueryClient } from "@tanstack/react-query";

interface QuestionsFormProps {
  defaultValues?: QuestionFormValues;
  onCancel?: () => void;
  isUpdate?: boolean;
}

export function QuestionsForm({
  defaultValues,
  onCancel,
  isUpdate,
}: QuestionsFormProps) {
  const queryClient = useQueryClient();
   const onError = (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    }
    const onSuccess = ()=>{
      queryClient.refetchQueries({ queryKey: ['admin/faq'] });
      //toaster
      if(onCancel)onCancel();
    }

  const { isPending: isCreating, mutate: createQuestion } = useMutate({
    endpoint: "admin/faq",
    method: "post",
    mutationKey: ["admin/faq"],
    onError,
    onSuccess
    
  });
  const { isPending: isUpdating, mutate: updateQuestion } = useMutate({
    endpoint: `admin/faq/${defaultValues?.id?.toString()}`,
    method: "post",
    mutationKey: [`admin/faq`],
    onError,
    onSuccess
  });
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
    const question = {
      ar: {
        question: values.questionAr,
        answer: values.answerAr,
      },
      en: {
        question: values.questionEn,
        answer: values.answerEn,
      },
      is_active: values.is_active,
    };
    if (isUpdate) {
      updateQuestion(question);
      return;
    }
    createQuestion(question);
  };
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
              disabled={isCreating || isUpdating}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>
           {form.formState.errors.root && (
          <p className="text-red-500 text-sm mb-4">{form.formState.errors.root.message}</p>
        )}
      </form>
    </Form>
  );
}
