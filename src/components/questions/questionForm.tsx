import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Field from "../util/FormField";
import { questionFormSchema, type QuestionFormValues } from "@/schemas";
import { useMutate } from "@/hooks/UseMutate";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { formateQuestion } from "@/lib/utils";
import SubmitButton from "../util/SubmitButton";
import { useLocation, useNavigate } from "react-router";
import PageHeader from "../util/PageHeader";

interface QuestionsFormProps {
  defaultValues?: QuestionFormValues;
  isUpdate?: boolean;
}

export function QuestionsForm({ isUpdate }: QuestionsFormProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const defaultValues = useLocation().state as QuestionFormValues;
  const navigate = useNavigate()
  const { isPending, mutate } = useMutate({
    endpoint: `admin/faq${isUpdate ? "/" + defaultValues?.id?.toString() : ""}`,
    method: "post",
    mutationKey: [`faq`],
    onError: (error: unknown) => {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : t("error"),
      });
    },
    onSuccess: (data: { message?: string }) => {
      const title =
        data?.message ||
        t(
          isUpdate
            ? "successMessages.questionCreated"
            : "successMessages.questionUpdated"
        );
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
      queryClient.refetchQueries({ queryKey: ["faq"] });
      navigate('/faq')
    },
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
    mutate(formateQuestion(values));
  };
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t(`formTitles.${isUpdate?'updateQuestion':'createQuestion'}`)} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 py-6 px-4 border rounded-md bg-white">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<QuestionFormValues>
                control={form.control}
                name="questionEn"
                label={t("fields.en.question")}
                placeholder={t("fields.en.question")}
              />
              <Field<QuestionFormValues>
                control={form.control}
                name="answerEn"
                label={t("fields.en.answer")}
                placeholder={t("fields.en.answer")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field<QuestionFormValues>
                control={form.control}
                name="questionAr"
                dir="rtl"
                label={t("fields.ar.question")}
                placeholder={t("fields.ar.question")}
              />
              <Field<QuestionFormValues>
                control={form.control}
                name="answerAr"
                dir="rtl"
                label={t("fields.ar.answer")}
                placeholder={t("fields.ar.answer")}
              />
            </div>
            <Field
              control={form.control}
              name={`is_active`}
              label={t("fields.active")}
              checkbox
            />
          </div>
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm mb-4">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex justify-end gap-4">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </Form>
    </div>
  );
}
