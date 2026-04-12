"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

const FieldPhoneInput = ({
  form,
  label,
  name,
  placeholder,
  className,
  defaultCountry,
  required = false,
  renderUIalignToLabel = null,
  disabled = false,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* {label && <FormLabel>{label}</FormLabel>} */}
          <div className="">
            {label && (
              <FormLabel className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {label}

                  <span
                    className={`font-bold text-base text-destructive ${required ? "visible" : "invisible"}`}
                  >
                    *
                  </span>
                </div>

                {renderUIalignToLabel && (
                  <div className="float-right">{renderUIalignToLabel()}</div>
                )}
              </FormLabel>
            )}
          </div>
          <FormControl>
            <PhoneInput
              disabled={disabled}
              international
              defaultCountry={defaultCountry}
              placeholder={placeholder}
              className={cn(
                "relative h-12 bg-white/80  ] rounded-[10px] text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-300",
                "focus:border-[#006A4E] focus:ring-0 focus:ring-[#006A4E]/20 focus:shadow-none",

                disabled && " cursor-not-allowed bg-gray-50",
                className,
              )}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs font-bold text-rose-500 mt-0" />
        </FormItem>
      )}
    />
  );
};

export default FieldPhoneInput;

// usage example
// <FieldPhoneInput
//   required
//   form={form}
//   name="phone"
//   label="Phone Number"
//   placeholder="Enter your phone number"
//   defaultCountry="US"
//  renderUIalignToLabel={() => (
//     <button
//       type="button"
//       onClick={() => setFieldWith("id")}
//       className="text-sm text-[#006A4E]  hover:underline cursor-pointer"
//     >
//       Use Application ID instead
//     </button>
//   )}
// />
