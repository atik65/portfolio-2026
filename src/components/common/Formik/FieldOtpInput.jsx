import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import formOpt from "@/lib/formOpt";

const FieldOtpInput = ({
  name,
  form,
  label,
  description,
  disabled,
  required = false,
  className,
  onChange = () => {},
  maxLength = 6,
  pattern = "digits", // "digits" | "alphanumeric" | custom regex
  separator = false, // true for default separator, or array of indices e.g. [2] for separator after 3rd slot
  slotClassName,
  groupClassName,
  ...props
}) => {
  // Determine the pattern based on the prop
  const getPattern = () => {
    if (pattern === "digits") return REGEXP_ONLY_DIGITS;
    if (pattern === "alphanumeric") return REGEXP_ONLY_DIGITS_AND_CHARS;
    return pattern; // Custom regex
  };

  // Generate slots based on maxLength and separator config
  const renderSlots = () => {
    const slots = [];
    const separatorIndices = Array.isArray(separator)
      ? separator
      : separator === true
        ? [Math.floor(maxLength / 2) - 1] // Default: separator in the middle
        : [];

    let currentGroup = [];

    for (let i = 0; i < maxLength; i++) {
      currentGroup.push(
        <InputOTPSlot
          key={i}
          index={i}
          className={cn(
            "h-11.25 w-11.25 text-base border-[#E5E7EB] ",
            slotClassName,
          )}
        />,
      );

      // Check if we need a separator after this index
      if (separatorIndices.includes(i) && i < maxLength - 1) {
        slots.push(
          <InputOTPGroup key={`group-${i}`} className={groupClassName}>
            {currentGroup}
          </InputOTPGroup>,
        );
        slots.push(<InputOTPSeparator key={`sep-${i}`} />);
        currentGroup = [];
      }
    }

    // Add remaining slots if any
    if (currentGroup.length > 0) {
      slots.push(
        <InputOTPGroup key="group-last" className={groupClassName}>
          {currentGroup}
        </InputOTPGroup>,
      );
    }

    return slots;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel className="flex items-center gap-1">
              {label}
              <span
                className={`font-bold text-base text-destructive ${required ? "visible" : "invisible"}`}
              >
                *
              </span>
            </FormLabel>
          )}
          <FormControl>
            <InputOTP
              maxLength={maxLength}
              pattern={getPattern()}
              disabled={disabled}
              value={field.value || ""}
              onChange={(value) => {
                field.onChange(value);

                onChange(value);
              }}
              className={cn(className, "border-red-400 border")}
              {...props}
            >
              {renderSlots()}
            </InputOTP>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldOtpInput;

// Usage Examples:

// // Basic 6-digit OTP
// <FieldOtpInput name="otp" form={form} label="Verification Code" required />

// // 4-digit PIN
// <FieldOtpInput name="pin" form={form} label="PIN" maxLength={4} required />

// // With separator in middle (3-3)
// <FieldOtpInput name="otp" form={form} label="OTP" separator required />

// // Custom separator positions
// <FieldOtpInput name="code" form={form} label="Code" separator={[1, 3]} maxLength={6} />

// // Alphanumeric input
// <FieldOtpInput name="code" form={form} label="Code" pattern="alphanumeric" />

// // With description
// <FieldOtpInput
//   name="otp"
//   form={form}
//   label="Verification Code"
//   description="Enter the 6-digit code sent to your email"
//   required
// />
