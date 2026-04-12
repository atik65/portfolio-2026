import { useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormLabel } from "../ui/form";

export default function DateRangePicker({
  value,
  onChange,
  form,
  name,
  type = "range",
  className,
  label,
  required = false,
  placeholder = "Select date range",
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Get current date range from form or props
  const getCurrentDateRange = () => {
    if (form && name) {
      if (type === "range" && Array.isArray(name)) {
        // Handle array format: ["from", "to"]
        const fromValue = form.watch(name[0]);
        const toValue = form.watch(name[1]);
        return fromValue || toValue
          ? { from: fromValue, to: toValue }
          : undefined;
      } else if (typeof name === "string") {
        // Handle single field format: "created_at"
        const fieldValue = form.watch(name);
        return fieldValue;
      }
    }
    return value;
  };

  const currentDateRange = getCurrentDateRange();

  const formatDateRange = () => {
    if (!currentDateRange?.from) return placeholder;

    const fromDate = format(currentDateRange.from, "MMM d, yyyy");

    if (!currentDateRange.to) return fromDate;

    const toDate = format(currentDateRange.to, "MMM d, yyyy");

    return `${fromDate} - ${toDate}`;
  };

  const handleDateChange = (range) => {
    if (form && name) {
      if (type === "range" && Array.isArray(name)) {
        // Set both from and to fields
        form.setValue(name[0], range?.from);
        form.setValue(name[1], range?.to);
      } else if (typeof name === "string") {
        // Set single field with the range object
        form.setValue(name, range);
      }
    } else if (onChange) {
      // Fallback to controlled props
      onChange(range);
    }

    // Only close when both dates are selected and they are different
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      setIsOpen(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();

    if (form && name) {
      if (type === "range" && Array.isArray(name)) {
        form.setValue(name[0], undefined);
        form.setValue(name[1], undefined);
      } else if (typeof name === "string") {
        form.setValue(name, undefined);
      }
    } else if (onChange) {
      onChange(undefined);
    }

    setIsOpen(false);
  };

  console.log("error = ", form?.formState?.errors[name]);

  const error = form?.formState?.errors[name];

  return (
    <div className="relative">
      {label && (
        <FormLabel className={"mb-2"}>
          {label}
          {required && (
            <span className="font-bold text-base text-destructive">*</span>
          )}
        </FormLabel>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal min-w-65 relative",
              !currentDateRange?.from && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
            {currentDateRange?.from && (
              <button
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                title="Clear date range"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={currentDateRange?.from}
            selected={currentDateRange}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="rounded-lg"
          />
        </PopoverContent>
      </Popover>

      {/* {
    "from": {
        "message": "Start date is required",
        "type": "optionality"
    },
    "to": {
        "message": "End date is required",
        "type": "optionality"
    }
} */}
    </div>
  );
}
