import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const CheckBoxField = ({
  name,
  form,
  description,
  label,
  className,
  checkboxClassName,
  disabled,
  onChange,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn("flex items-center gap-2 w-full", className)}>
            <FormControl>
              <Checkbox
                ref={field.ref}
                checked={field.value}
                onCheckedChange={onChange ? onChange : field.onChange}
                disabled={disabled}
                className={cn(
                  "relative z-10 data-[state=checked]:bg-[#006A4E] data-[state=checked]:border-[#006A4E]",
                  "hover:border-[#006A4E] transition-all duration-300",
                  "focus-visible:ring-2 focus-visible:ring-[#006A4E]/30 focus-visible:ring-offset-0",
                  disabled &&
                    "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300",
                  checkboxClassName,
                )}
              />
            </FormControl>
            {label && (
              <FormLabel className={"leading-5 cursor-pointer"}>
                {label}
              </FormLabel>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckBoxField;
