import FieldInput from "@/components/common/Formik/FieldInput";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import SwitchField from "@/components/common/Formik/SwitchField";
import Select from "@/components/common/select/Select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useFormik from "@/hooks/useFormik";
import useRequest from "@/hooks/useRequest";
import baseApis from "@/lib/baseApis";
import { Loader2, Plus, X } from "lucide-react";
import documentCategoryApi from "../api";
import documentCategorySchema from "../utils/schema";
import { revalidateCache } from "@/lib/queryInstance";
import { openModal } from "@/lib/easyModal";
import { FormLabel } from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { formatTimeTo12Hour } from "@/lib/timeFormat";
import formOptions from "@/lib/formOptions";

const DURATION_OPTIONS = [
  { id: "10", label: "10 min" },
  { id: "20", label: "20 min" },
  { id: "30", label: "30 min" },
  { id: "60", label: "1 hr" },
  { id: "120", label: "2 hr" },
];

const AddEdit = ({ open, onClose, editData = null }) => {
  const { mutateAsync, isPending } = useRequest();
  const isEditMode = !!editData;

  const form = useFormik({
    schema: documentCategorySchema.validation,
    defaultValues: documentCategorySchema.values(editData),
    onSubmit,
    mode: "onChange",
  });

  const {
    fields: serviceTimeFields,
    append: appendServiceTime,
    remove: removeServiceTime,
  } = useFieldArray({
    control: form.control,
    name: "service_time",
  });

  async function onSubmit(data) {
    // convert each start_time and end_time to 12 hour format
    for (let i = 0; i < data.service_time.length; i++) {
      const item = data.service_time[i];
      item.start_time = formatTimeTo12Hour(item.start_time);
      item.end_time = formatTimeTo12Hour(item.end_time);
    }

    // convert appointment_duration to number
    data.appointment_duration = Number(data.appointment_duration);
    console.log("Submitted data:", data);

    try {
      await mutateAsync({
        id: editData?.id,
        data,
        api: isEditMode
          ? documentCategoryApi.update(editData.id)
          : documentCategoryApi.create,
        form,
        cacheKey: documentCategoryApi.cacheKey,
        handleDone: async () => {
          revalidateCache(baseApis.document_types.cacheKey);
          onClose();
          form.reset();
        },
      });
    } catch (error) {
      console.error("Document category save error:", error);
    }
  }

  const handleClose = () => {
    if (!isPending) {
      form.reset();
      onClose();
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent className="sm:max-w-135 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditMode ? "Edit Document Category" : "Add Document Category"}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? "Update the document category information below."
                : "Fill in the information to create a new document category."}
            </SheetDescription>
          </SheetHeader>

          <div className="mb-6 px-5">
            <FormikWrapper form={form}>
              <div className="space-y-5">
                <FieldInput
                  form={form}
                  name="name"
                  label="Category Name"
                  placeholder="e.g., Visa Application, Birth Certificate"
                  required
                />

                <Select
                  multiSelect
                  required
                  title="Select Document Type"
                  name="document_type_ids"
                  placeholder="Select Document Types"
                  api={baseApis.document_types}
                  cacheKey={baseApis.document_types.cacheKey}
                  form={form}
                  onAddNew={() => openModal("documentType")}
                />

                {/* appointment_duration*/}
                <Select
                  form={form}
                  name="appointment_duration"
                  title="Appointment Duration"
                  placeholder="Select duration"
                  manualOption={DURATION_OPTIONS}
                  required
                  optionSchema={{ id: "id", label: "label" }}
                />

                {/* service start and end time */}
                {/* <div className="space-y-3 ">
                  <FormLabel>Service time</FormLabel>

                  <div className="flex  w-full   items-center gap-4 ">
                    <FieldInput
                      type="time"
                      // {...form.register("service_start_time")}
                      form={form}
                      name="service_start_time"
                      // label="Start Time"
                      required
                      className="  rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                    />
                    <span className="text-slate-400">-</span>
                    <FieldInput
                      form={form}
                      name="service_end_time"
                      // label="End Time"
                      required
                      type="time"
                      // {...form.register("service_end_time")}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div> */}

                {/* <div className="space-y-3 ">
                  <FormLabel>Service time</FormLabel>

                  {serviceTimeFields.map((field, index) => (
                    <div className="flex  w-full  gap-4 " key={field.id}>
                      <FieldInput
                        type="time"
                        form={form}
                        name={`service_time.${index}.start_time`}
                        required
                        className="  rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                       
                      />
                      <span className="text-slate-400 h-10 items-center flex">
                        -
                      </span>
                      <FieldInput
                        form={form}
                        name={`service_time.${index}.end_time`}
                        required
                        type="time"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                       
                      />

                      {serviceTimeFields.length > 1 && (
                        <button
                          type="button"
                          size={"sm"}
                          variant="outline"
                          className="h-10"
                          onClick={() => removeServiceTime(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end">

                    {serviceTimeFields.length < 10 && (
                      <Button
                        type="button"
                        size={"sm"}
                        variant="outline"
                        className={
                          "gap-0 rounded-sm  bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white"
                        }
                        onClick={() =>
                          appendServiceTime({ start_time: "", end_time: "" })
                        }
                      >
                        <span>
                          <Plus className="mr-2 h-4 w-4" />
                        </span>

                        <span>Add</span>
                      </Button>
                    )}

                    {serviceTimeFields.length >= 10 && (
                      <p className="text-sm bg-emerald-50 text-emerald-800 px-3 py-2 rounded-md w-full text-center border border-emerald-200">
                        Maximum of {serviceTimeFields.length} service times
                        allowed.
                      </p>
                    )}
                  </div>
                </div> */}

                <FieldInput
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="Brief description of the category"
                  type="textarea"
                  multiline
                  rows={4}
                />

                <SwitchField
                  form={form}
                  name="is_active"
                  label="Active Category"
                  description="Mark if this category is active for the service"
                />

                <SwitchField
                  form={form}
                  name="is_for_instant"
                  label="Instant Category"
                  description="Mark if this category is available for instant Appointment"
                />

                <SwitchField
                  form={form}
                  name="is_delivery_required"
                  label="Deliverable"
                  description="Indicate if documents under this category require delivery"
                />

                {form.watch("is_delivery_required") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {" "}
                    <FieldInput
                      form={form}
                      name="normal_price"
                      label="Normal Price"
                      placeholder="Enter the normal price"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue("normal_price", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    />
                    <FieldInput
                      form={form}
                      name="urgent_price"
                      label="Urgent Price"
                      placeholder="Enter the urgent price"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue("urgent_price", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isPending || !form.formState.isDirty}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{isEditMode ? "Update" : "Create"}</>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isPending}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </FormikWrapper>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddEdit;
