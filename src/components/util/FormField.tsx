import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

function Field<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  image,
  checkbox,
  ...rest
}: {
  control: Control<TFieldValues>; // Use the generic Control type
  label: string;
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  image?: boolean;
  checkbox?: boolean;
  [key: string]: unknown;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
      <FormItem className={checkbox?"!flex !gap-2":''}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {image ? (
              <Input
                placeholder={placeholder}
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                {...rest}
              />
            ) : checkbox ? (
              <Checkbox
              className="-order-1"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            ) : (
              <Input placeholder={placeholder} {...field} {...rest} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Field;
