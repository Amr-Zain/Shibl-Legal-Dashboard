import type { FormSection, QuestionFormValues, TitleFeatureFormValues, WhyUsFormValues } from "@/schemas";
import type { QuestionResponse, SectionResponse } from "@/util/responsesTypes";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formateSection = (data: FormSection)=>{
   const section = {
      type: data.type,
      image: data.image,
      icon: data.icon,
      en: {
        title: data.titleEn,
        description: data.descriptionEn,
      },
      ar: {
        title: data.titleAr,
        description: data.descriptionAr,
      },
      features: data?.features?.map(
        ({ valueAr, valueEn, path, is_active, key, id }) => ({
          ar: {
            value: valueAr,
          },
          en: {
            value: valueEn,
          },
          icon: path,
          key,
          is_active: is_active,
          id,
        })
      ),
    };
    return section
}
export const formateQuestion =(values: QuestionFormValues)=>{
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
    return question
}

export const fromateFeature = (values: TitleFeatureFormValues)=>{
   const feature = {
      ar: {
        title: values.titleAr,
        description: values.descriptionAr,
      },
      en: {
        title: values.titleEn,
        description: values.descriptionEn,
      },
      icon: values.path,
      background: values.path,
    };
    return feature;
}
export const fromateKeyFeature = (values: WhyUsFormValues)=>{
   const feature = {
      ar: {
        key: values.keyAr,
      },
      en: {
        key: values.keyEn,
      },
      id: values?.id,
      icon: values.icon,
      value: values.value,
      is_active: values.is_active,
    };
    return feature;
}

export const FormateQuestionForm = (question: QuestionResponse) => ({
    id: question.id,
    questionEn: question.en.question,
    questionAr: question.ar.question,
    answerAr: question.en.answer,
    answerEn: question.ar.answer,
    is_active: question.is_active,
  });
export const formateSectionForm = (section: SectionResponse)=>{
  return{
      type: section?.type,
      titleAr: section?.ar.title,
      titleEn: section?.en.title,
      descriptionAr: section?.ar.description,
      descriptionEn: section?.en.title,
      image: section?.image?.path,
      icon: section?.icon?.path,
      features: section?.features?.map((feature) => ({
        valueAr: feature.ar.value,
        valueEn: feature.en.value,
        id: feature.id,
        key: feature.key,
        is_active: feature.is_active ?? true,
      })),
    }
}