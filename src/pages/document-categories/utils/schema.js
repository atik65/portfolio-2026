import { formatTimeTo24Hour } from "@/lib/timeFormat";
import * as yup from "yup";

// Helper function to convert time string to minutes for comparison
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to check if two time ranges overlap
const timeSlotsOverlap = (slot1, slot2) => {
  const start1 = timeToMinutes(slot1.start_time);
  const end1 = timeToMinutes(slot1.end_time);
  const start2 = timeToMinutes(slot2.start_time);
  const end2 = timeToMinutes(slot2.end_time);

  return start1 < end2 && start2 < end1;
};

const documentCategorySchema = {
  validation: yup.object({
    name: yup.string().trim().required("Category name is required"),
    description: yup.string().notRequired(),
    document_type_ids: yup
      .array()
      .of(yup.string())
      .min(1, "At least one document type must be selected"),

    appointment_duration: yup
      .string()
      .required("Appointment duration is required"),

    // service_time: yup
    //   .array()
    //   .of(
    //     yup.object({
    //       start_time: yup.string().required("Start time is required"),
    //       end_time: yup
    //         .string()
    //         .required("End time is required")
    //         .test(
    //           "min-duration",
    //           "End time must be at least 1 hour after start time",
    //           function (value) {
    //             const { start_time } = this.parent;
    //             if (!start_time || !value) return true;

    //             const startMinutes = timeToMinutes(start_time);
    //             const endMinutes = timeToMinutes(value);
    //             const diffMinutes = endMinutes - startMinutes;

    //             // Check if end time is at least 60 minutes (1 hour) after start time
    //             return diffMinutes >= 60;
    //           },
    //         ),
    //     }),
    //   )
    //   .min(1, "At least one service time is required")
    //   .test(
    //     "no-overlap",
    //     "Service time slots must not overlap",
    //     function (value) {
    //       if (!value || value.length <= 1) return true;

    //       // Check each pair of slots for overlap
    //       for (let i = 0; i < value.length; i++) {
    //         for (let j = i + 1; j < value.length; j++) {
    //           const slot1 = value[i];
    //           const slot2 = value[j];

    //           // Skip if either slot is incomplete
    //           if (
    //             !slot1.start_time ||
    //             !slot1.end_time ||
    //             !slot2.start_time ||
    //             !slot2.end_time
    //           ) {
    //             continue;
    //           }

    //           if (timeSlotsOverlap(slot1, slot2)) {
    //             return this.createError({
    //               path: `service_time[${j}].start_time`,
    //               message: `Time slot ${j + 1} overlaps with slot ${i + 1}`,
    //             });
    //           }
    //         }
    //       }

    //       return true;
    //     },
    //   ),
    is_active: yup.boolean().required("Active field must be specified"),
    is_for_instant: yup
      .boolean()
      .required("Is for instant field must be specified"),
    is_delivery_required: yup
      .boolean()
      .required("Delivery required field must be specified"),
    normal_price: yup
      .number()
      .typeError("Normal price must be a number")
      .when("is_delivery_required", {
        is: true,
        then: (schema) =>
          schema
            .required("Normal price is required when delivery is enabled")
            .min(0.01, "Normal price must be greater than 0"),
        otherwise: (schema) => schema.notRequired(),
      }),
    urgent_price: yup
      .number()
      .typeError("Urgent price must be a number")
      .when("is_delivery_required", {
        is: true,
        then: (schema) =>
          schema
            .required("Urgent price is required when delivery is enabled")
            .min(0.01, "Urgent price must be greater than 0"),
        otherwise: (schema) => schema.notRequired(),
      }),
  }),
  values: (data) => {
    // Extract document type IDs from the document_types array if editing
    const documentTypeIds = data?.document_types
      ? data.document_types.map((doc) => doc.id)
      : data?.document_type_ids || [];

    return {
      name: data?.name || "",
      description: data?.description || "",
      document_type_ids: documentTypeIds,
      appointment_duration: String(data?.appointment_duration || ""),
      service_time: [],
      is_active: data?.is_active ?? true,
      is_for_instant: data?.is_for_instant ?? true,
      is_delivery_required: data?.is_delivery_required ?? false,
      normal_price: data?.normal_price ?? "",
      urgent_price: data?.urgent_price ?? "",
    };
  },
};

export default documentCategorySchema;

const convertServiceTimesTo24Hour = (serviceTimes) => {
  return serviceTimes.map((timeSlot) => ({
    start_time: formatTimeTo24Hour(timeSlot.start_time),
    end_time: formatTimeTo24Hour(timeSlot.end_time),
  }));
};
