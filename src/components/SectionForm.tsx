import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { sections } from "@/util/data";
import { useEffect } from "react";

const featureSchema = z.object({
  id: z.number().optional(),
  key: z.string().nullable().optional(),
  valueAr: z.string().min(1, "Arabic value is required"),
  valueEn: z.string().min(1, "English value is required"),
  icon: z.instanceof(File, { message: "Icon is required" }),
});

const sectionSchema = z.object({
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
  image: z.instanceof(File, { message: "Main image is required" }),
  icon: z.instanceof(File).optional(),
  features: z.array(featureSchema),
  is_active: z.boolean().default(true).optional(),
});

type Section = z.infer<typeof sectionSchema>;

const SectionForm = ({ section, submit, isUpdate }: { section?: Section, submit:(data:Section)=>Promise<void>, isUpdate?: boolean }) => {
  const form = useForm<Section>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      ...section,//this is not contain the ar and eg
      features: section?.features ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = (data: Section) => {
    console.log(data);
    submit(data);
  };
  useEffect(()=>{
    //fetch the section ar and eg for initial input data
  },[])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-8 p-4 ${isUpdate&&'h-[80vh] overflow-y-scroll'}`}>
        {/* Type Select */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isUpdate}>
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
          <FormField
            control={form.control}
            name="titleAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arabic Title</FormLabel>
                <FormControl>
                  <Input placeholder="العنوان بالعربية" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title in English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arabic Description</FormLabel>
                <FormControl>
                  <Input placeholder="الوصف بالعربية" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description in English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Optional Icon */}
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 border p-4 rounded">
              <FormField
                control={form.control}
                name={`features.${index}.key`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`features.${index}.valueAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arabic Value</FormLabel>
                      <FormControl>
                        <Input placeholder="الوصف بالعربية " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`features.${index}.valueEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Value</FormLabel>
                      <FormControl>
                        <Input placeholder="text in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`features.${index}.icon`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
        <FormField
          control={form.control}
          name={`is_active`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Active Status</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SectionForm;
