// schemas.ts (or wherever your Zod schemas are defined)
import { z } from "zod";
import type { TFunction } from "i18next"; // Import TFunction type for better type safety

// Export a function that takes 't' as an argument
export const createFeatureSchema = (t: TFunction) => z.object({
  id: z.number().optional(),
  key: z.string().nullable().optional(),
  valueAr: z.string().min(1, t("featureSchema.valueAr")),
  valueEn: z.string().min(1, t("featureSchema.valueEn")),
  path: z.string().min(1, t("featureSchema.path")),
  is_active: z.boolean().default(true).optional(),
});

export const createSectionSchema = (t: TFunction) => z.object({
  type: z.string(),
  titleAr: z
    .string()
    .min(10, t("sectionSchema.titleAr")),
  titleEn: z
    .string()
    .min(10, t("sectionSchema.titleEn")),
  descriptionAr: z
    .string()
    .min(30, t("sectionSchema.descriptionAr")),
  descriptionEn: z
    .string()
    .min(30, t("sectionSchema.descriptionEn")),
  image: z.string().optional(),
  icon: z.string().optional(),
  features: z.array(createFeatureSchema(t)).optional(), // Pass t to nested schemas
  is_active: z.boolean().default(true).optional(),
});

// Continue this pattern for all your schemas
export const createQuestionFormSchema = (t: TFunction) => z.object({
  id: z.number().optional(),
  questionEn: z.string().min(8, {
    message: t("questionFormSchema.questionEn"),
  }),
  questionAr: z.string().min(8, {
    message: t("questionFormSchema.questionAr"),
  }),
  answerEn: z.string().min(8, {
    message: t("questionFormSchema.answerEn"),
  }),
  answerAr: z.string().min(8, {
    message: t("questionFormSchema.answerAr"),
  }),
  is_active: z.boolean().optional(),
});

export const createContactFormSchema = (t: TFunction) => z.object({
  email: z.string().email(t("contactFormSchema.email")),
  address: z.string().min(5, t("contactFormSchema.address")),
  appoitnments: z.string().min(5, t("contactFormSchema.appoitnments")),
  facebook: z.string().url(t("contactFormSchema.facebook")).or(z.literal("")).optional(),
  x: z.string().url(t("contactFormSchema.x")).or(z.literal("")).optional(),
  instagram: z.string().url(t("contactFormSchema.instagram")).or(z.literal("")).optional(),
  phone_code: z.string().min(1, t("contactFormSchema.phone_code")).optional(),
  phone: z
    .string()
    .min(10, t("contactFormSchema.phone.min"))
    .max(10, t("contactFormSchema.phone.max"))
    .regex(/^\d+$/, t("contactFormSchema.phone.regex"))
    .optional(),
});

export const createWhyUsFeatureFormSchema = (t: TFunction) => z.object({
  id: z.number().optional(),
  keyEn: z.string().min(1, { message: t("whyUsFeatureFormSchema.keyEn") }),
  keyAr: z.string().min(1, { message: t("whyUsFeatureFormSchema.keyAr") }),
  value: z.coerce
    .number({
      required_error: t("whyUsFeatureFormSchema.value.required_error"),
      invalid_type_error: t("whyUsFeatureFormSchema.value.invalid_type_error"),
    })
    .min(0, { message: t("whyUsFeatureFormSchema.value.min") })
    .refine((val) => !isNaN(val), { message: t("whyUsFeatureFormSchema.value.refine") }),
  icon: z.string(),
  is_active: z.boolean().optional(),
  url: z.string().optional(),
});

export const createTitleFeatureFormSchema = (t: TFunction) => z.object({
  id: z.number().optional(),
  titleEn: z.string().min(8, {
    message: t("TitleFeatureFormSchema.titleEn"),
  }),
  titleAr: z.string().min(8, {
    message: t("TitleFeatureFormSchema.titleAr"),
  }),
  descriptionEn: z.string().min(8, {
    message: t("TitleFeatureFormSchema.descriptionEn"),
  }),
  descriptionAr: z.string().min(8, {
    message: t("TitleFeatureFormSchema.descriptionAr"),
  }),
  path: z.string().min(15, t('TitleFeatureFormSchema.path')),
  icon: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const createAdminFormSchema = (t: TFunction) => z.object({
  full_name: z.string().min(1, t("adminFormSchema.full_name")),
  email: z.string().email(t("adminFormSchema.email")),
  image: z.string().min(1, t("adminFormSchema.image")),
});

export const createPasswordFormSchema = (t: TFunction) => z
  .object({
    current_password: z.string().min(1, t("passwordFormSchema.current_password")),
    new_password: z.string().min(6, t("passwordFormSchema.new_password")),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: t("passwordFormSchema.new_password_confirmation"),
    path: ["new_password_confirmation"],
  });


// Define types from the created schemas
export type FormSection = z.infer<ReturnType<typeof createSectionSchema>>;
export type QuestionFormValues = z.infer<ReturnType<typeof createQuestionFormSchema>>;
export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
export type WhyUsFormValues = z.infer<ReturnType<typeof createWhyUsFeatureFormSchema>>;
export type TitleFeatureFormValues = z.infer<ReturnType<typeof createTitleFeatureFormSchema>>;
export type AdminFrom = z.infer<ReturnType<typeof createAdminFormSchema>>;
export type UpdatePasswordType = z.infer<ReturnType<typeof createPasswordFormSchema>>;

export type ContactKeys =
  | "phone"
  | "facebook"
  | "x"
  | "instagram"
  | "address"
  | "email"
  | "appoitnments";