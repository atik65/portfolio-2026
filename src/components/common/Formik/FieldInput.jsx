import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const FieldInput = ({
  name,
  form,
  placeholder,
  label,
  description,
  type = "text",
  disabled = false,
  multiline,
  required = false,
  icon,
  className,
  onChange,
  handleCustomValidation = null,
  renderUIalignToLabel = null,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e, field) => {
    if (onChange && !multiline) {
      onChange(e);
    }

    // If custom validation handler is provided, use it and return early
    // if (handleCustomValidation) {
    //   handleCustomValidation({
    //     e: e,
    //     field: field,
    //     form: form,
    //     name: name,
    //     type: type,
    //   });
    //   return;
    // }

    if (type === "number") {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      field.onChange(Number(numericValue));
    } else {
      field.onChange(e);
    }
  };

  const handleTextareaChange = (e, field) => {
    if (onChange && multiline) {
      onChange(e);
    }
    field.onChange(e);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className={"flex flex-col"}>
          <FormItem>
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
              {multiline ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Gradient glow effect → GREEN */}
                  <div
                    className={cn(
                      "absolute -inset-0.5 bg-[#006A4E]/20 rounded-[10px] blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                      isFocused && "opacity-30",
                    )}
                  />

                  <Textarea
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                      "relative min-h-[120px] p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/80 rounded-[10px] text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-300",
                      "focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/20 focus:shadow-lg",
                      "hover:border-gray-300",
                      disabled && "opacity-50 cursor-not-allowed bg-gray-50",
                      className,
                    )}
                    onChange={(e) => handleTextareaChange(e, field)}
                    {...props}
                  />
                </motion.div>
              ) : (
                <motion.div
                  // initial={{ opacity: 0, y: 10 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Gradient glow effect → GREEN */}
                  <div
                    className={cn(
                      "absolute -inset-0.5 bg-[#006A4E]/20 rounded-[10px] blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                      isFocused && "opacity-30",
                    )}
                  />

                  {/* Icon container */}
                  {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-[#006A4E]">
                        {icon}
                      </div>
                    </div>
                  )}

                  <Input
                    type={
                      type === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : type === "number"
                          ? "text"
                          : type
                    }
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                      "relative h-12 p-4 bg-white/80 backdrop-blur-sm border border-[#D1D5DC] rounded-[10px] text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-300",
                      "focus:border-[#006A4E] focus:ring-0 focus:ring-[#006A4E]/20 focus:shadow-none",
                      "hover:border-gray-300 cursor-text",
                      icon && "pl-10",
                      type === "password" && "pr-14",
                      disabled && "opacity-50 cursor-not-allowed bg-gray-50",
                      className,
                    )}
                    onChange={(e) => handleInputChange(e, field)}
                    {...props}
                  />

                  {/* Password toggle button */}
                  {type === "password" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-1 my-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-600" />
                      ) : (
                        <Eye size={18} className="text-gray-600" />
                      )}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </FormControl>

            {description && (
              <FormDescription className="text-xs font-medium text-gray-500 mt-2">
                {description}
              </FormDescription>
            )}

            <FormMessage className="text-xs font-bold text-rose-500 mt-0" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default FieldInput;
