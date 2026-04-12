import useApi from "@/hooks/useApi";
import { useMemo } from "react";
import SelectList from "./SelectList";

const Select = ({
  form,
  title,
  placeholder,
  name,
  api = null,
  manualOption = [],
  filter = null,
  loading = false,
  cacheKey,
  params = null,
  multiSelect = false,
  value,
  setValue,
  showMax = 2,
  required = false,
  optionSchema = {
    id: "id",
    label: "name",
    img: "image",
  },
  inputClassName,
  commandClassName,
  onAddNew = null,
}) => {
  const { data, isLoading: loadingApi } = useApi({
    trigger: !!api,
    api,
    filter,
    params,
    cacheKey,
  });
  const options = useMemo(() => {
    const modifiedList =
      [...manualOption, ...(data?.data || [])].map((item) => ({
        id: item?.[optionSchema?.id],
        label: item?.[optionSchema?.label],
        img: item?.[optionSchema?.img],
      })) || [];
    return modifiedList;
  }, [data?.data, manualOption, optionSchema]);
  const isLoading = loading || loadingApi;
  return (
    <SelectList
      {...{
        showMax,
        form,
        title,
        placeholder,
        name,
        options,
        isLoading,
        multiSelect,
        value,
        setValue,
        inputClassName,
        commandClassName,
        required,
        onAddNew,
      }}
    />
  );
};
export default Select;

// useage example for api call

// <Select
//   api={{
//     endpoint: "/api/admin/role",
//      path: "/list",
//     method: "get",
//   }}
//   cacheKey="roles"
//   optionSchema={{
//     id: "id",
//     label: "name",
//   }}
//   placeholder="Select Role"
//   name="role_id"
//   value={value}
//   setValue={setValue}
//   form={form}
// />

// useage example for manual option
// <Select
//   manualOption={[
//     { id: "pending", label: "Pending" },
//     { id: "approved", label: "Approved" },
//     { id: "rejected", label: "Rejected" },
//   ]}
//   placeholder="Select Status"
//   name="status"
//   value={value}
//   setValue={setValue}
//   form={form}
// />
