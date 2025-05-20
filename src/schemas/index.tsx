import { z } from "zod";

export const featureSchema = z.object({
  id: z.number().optional(),
  key: z.string().nullable().optional(),
  valueAr: z.string().min(1, "Arabic value is required"),
  valueEn: z.string().min(1, "English value is required"),
  path: z.string().min(1,"Icon is required" ),
  is_active: z.boolean().default(true).optional(),
});

export const sectionSchema = z.object({
  type: z.string(),
  titleAr: z
    .string()
    .min(10, "Arabic title is required, min width 10 charcter"),
  titleEn: z
    .string()
    .min(10, "English title is required, min width 10 charcter "),
  descriptionAr: z
    .string()
    .min(30, "Arabic description is required, min width 10 charcter "),
  descriptionEn: z
    .string()
    .min(30, "English description is required, min width 10 charcter "),
  image: z.string().optional(),
  icon: z.string().optional(),
  features: z.array(featureSchema).optional(),
  is_active: z.boolean().default(true).optional(),
});
export type FormSection = z.infer<typeof sectionSchema>;

export const questionFormSchema = z.object({
  id: z.number().optional(),
  questionEn: z.string().min(8, {
    message: "English question must be at least 8 characters.",
  }),
  questionAr: z.string().min(8, {
    message: "Arabic question must be at least 8 characters.",
  }),
  answerEn: z.string().min(8, {
    message: "English answer must be at least 8 characters.",
  }),
  answerAr: z.string().min(8, {
    message: "Arabic answer must be at least 8 characters.",
  }),
  is_active: z.boolean().optional(),
});
export type QuestionFormValues = z.infer<typeof questionFormSchema>;

export const contactFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  appoitnments: z.string().min(5, "Appointments info required"),
  facebook: z.string().url("Invalid URL").or(z.literal("")).optional(),
  x: z.string().url("Invalid URL").or(z.literal("")).optional(),
  instagram: z.string().url("Invalid URL").or(z.literal("")).optional(),
  phone_code: z.string().min(1, "Required").optional(),
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits")
    .regex(/^\d+$/, "Phone must contain only numbers")
    .optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactKeys =
  | "phone"
  | "facebook"
  | "x"
  | "instagram"
  | "address"
  | "email"
  | "appoitnments";

export const whyUsFeatureFormSchema = z.object({
  id: z.number().optional(),
  keyEn: z.string().min(1, { message: "English Key is required." }),
  keyAr: z.string().min(1, { message: "Arabic Key is required." }),
  value: z.coerce
    .number({
      required_error: "Value is required.",
      invalid_type_error: "Value must be a number.",
    })
    .min(0, { message: "Value cannot be negative." })
    .refine((val) => !isNaN(val), { message: "Value must be a valid number." }),
  icon: z.string(),
  is_active: z.boolean().optional(),
  url: z.string().optional(),
});

export type WhyUsFormValues = z.infer<typeof whyUsFeatureFormSchema>;

export const TitleFeatureFormSchema = z.object({
  id: z.number().optional(),
  titleEn: z.string().min(8, {
    message: "English Title must be at least 8 characters.",
  }),
  titleAr: z.string().min(8, {
    message: "Arabic Title must be at least 8 characters.",
  }),
  descriptionEn: z.string().min(8, {
    message: "English description must be at least 8 characters.",
  }),
  descriptionAr: z.string().min(8, {
    message: "Arabic description must be at least 8 characters.",
  }),
  path: z.string().min(15,'icon is required'),
  icon: z.string().optional(),//url
  is_active: z.boolean().optional(),
});
export type TitleFeatureFormValues = z.infer<typeof TitleFeatureFormSchema>;

export const adminFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().min(1, "image is required"),
});
export type AdminFrom = z.infer<typeof adminFormSchema>;

export const passwordFormSchema = z
.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(6, "Password must be at least 6 characters"),
  new_password_confirmation: z.string(),
})
.refine((data) => data.new_password === data.new_password_confirmation, {
  message: "Passwords do not match",
  path: ["new_password_confirmation"],
});
export type UpdatePasswordType = z.infer<typeof passwordFormSchema>;