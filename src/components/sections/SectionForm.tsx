import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { sections } from "@/util/data";
import { useEffect } from "react";
import Field from "../util/FormField";
import { sectionSchema, type FormSection } from "@/schemas";

const SectionForm = ({
  section,
  submit,
  isUpdate,
}: {
  section?: FormSection;
  submit: (data: FormSection) => Promise<void>;
  isUpdate?: boolean;
}) => {
  const form = useForm<FormSection>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      ...section, //this is not contain the ar and eg
      features: section?.features ?? [],
    },
    mode: "onBlur",
  });
  console.log(section)
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = (data: FormSection) => {
    console.log(data);
    submit(data);
  };
  useEffect(() => {
    //fetch the section ar and eg for default input data for update
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 p-4 h-[80vh] overflow-y-scroll`}
      >
        {/* Type Select */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Section</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isUpdate}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select banner or section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections.map((item) => (
                    <SelectItem value={item.type}>{item.text}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<FormSection>
            name="titleAr"
            control={form.control}
            placeholder="العنوان بالعربية"
            label="Arabic Title"
          />
          <Field<FormSection>
            name="titleEn"
            control={form.control}
            placeholder="English Title "
            label="Title in English"
          />
        </div>
        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field<FormSection>
            name="descriptionAr"
            control={form.control}
            placeholder="الوصف بالعربية"
            label="Arabic Description"
          />
          <Field<FormSection>
            name="descriptionEn"
            control={form.control}
            placeholder="Description in English"
            label="Description in English"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field control={form.control} image name="image" label="Main Image" />
          <Field
            control={form.control}
            image
            name="icon"
            label="Icon (optional)"
          />
        </div>
        {/* Features Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 border p-4 rounded">
              <Field
                control={form.control}
                name={`features.${index}.key`}
                label="key (optional)"
                placeholder="title"
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  control={form.control}
                  name={`features.${index}.valueAr`}
                  label="Arabic Value"
                  placeholder="الوصف بالعربية "
                />
                <Field
                  control={form.control}
                  name={`features.${index}.valueEn`}
                  label="English Value"
                  placeholder="text in English"
                />
              </div>
              <Field
                control={form.control}
                name={`features.${index}.icon`}
                image
                label="Icon"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove Feature
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                id: 0,
                key: null,
                valueAr: "",
                valueEn: "",
                icon: new File([], "placeholder"),
              })
            }
          >
            Add Feature
          </Button>
        </div>
        <Field
          control={form.control}
          name={`is_active`}
          label="Active Status"
          checkbox
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SectionForm;
