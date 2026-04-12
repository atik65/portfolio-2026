"use client";

import { cn } from "@/lib/utils";
import FilePreview from "./gallery/FilePreview";
import GalleryDialog from "./gallery/GalleryDialog";
import { FormDescription, FormLabel } from "../ui/form";
import { useWatch } from "react-hook-form";
// import { FormDescription, FormLabel } from "./ui/form";

const FileUploaderInGallery = ({
  form,
  name,
  className,
  rootContainerClass,
  containerClass,
  label,
  description,
  multiple = false,
  placeholder,
  btnClassName,
}) => {
  // Watch field value to ensure component re-renders on changes
  const fieldValue = useWatch({ control: form?.control, name });

  const getFieldError = (fieldName) => {
    if (!fieldName) return null;
    const parts = fieldName.split(/[\[\]\.]+/).filter(Boolean);
    let current = form?.formState?.errors;
    for (const part of parts) {
      if (!current) return null;
      current = current[part];
    }
    return current;
  };

  const fieldError = getFieldError(name);

  return (
    <div className={cn("space-y-2 flex flex-col min-w-52", className)}>
      {label && (
        <FormLabel
          className={cn("py-1.25", fieldError?.message && "text-destructive")}
        >
          {label}
        </FormLabel>
      )}
      {description && <FormDescription>{description}</FormDescription>}

      <GalleryDialog
        placeholder={placeholder}
        btnClassName={btnClassName}
        name={name}
        multiple={multiple}
        form={form}
      />

      {/* <p>{name}</p>

      <pre>{JSON.stringify(form?.getValues(name), null, 2)}</pre> */}

      <FilePreview
        form={form}
        name={name}
        multiple={multiple}
        containerClass={containerClass}
        rootContainerClass={rootContainerClass}
      />

      {fieldError?.message && (
        <span className="text-[12.5px] font-medium text-destructive">
          {fieldError.message}
        </span>
      )}
    </div>
  );
};

export default FileUploaderInGallery;
