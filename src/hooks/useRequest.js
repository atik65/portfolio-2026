import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => {
      const response = await axiosInstance(variables);
      // For blob responses, return the full response with headers
      if (variables.responseType === "blob") {
        return response;
      }
      return response.data;
    },

    onError: async (err, variables) => {
      const toastVariant = variables?.toastVariant ?? "error";
      if (err?.response?.data?.code === 422) {
        const errors = err.response?.data?.errors;
        errors.forEach(async (error) => {
          await variables?.form?.setError(
            error.field,
            { message: error.message },
            { shouldFocus: true }
          );
        });
      } else {
        toast.error(
          err?.response?.data?.errors?.common?.msg ||
            err?.response?.data?.message ||
            err?.message
        );
      }

      variables.handleError && (await variables.handleError(err?.response));
    },
    onSuccess: async (data, variables) => {
      const isToast = variables.isToast ?? true;
      try {
        variables?.addEditCacheKey &&
          queryClient.setQueryData([variables?.addEditCacheKey], (oldData) => {
            if (!oldData) return;
            return { data: { ...oldData?.data?.data, ...data?.data } };
          });

        if (variables.cacheKey) {
          queryClient.setQueriesData(
            {
              queryKey: [variables.cacheKey],
            },
            (oldData) => {
              if (!oldData) return oldData;
              if (oldData.pages) {
                return infiniteCrud(oldData, data, variables);
              } else {
                return paginationCrud(oldData, data, variables);
              }
            }
          );
        }

        isToast && data?.message && toast.success(data?.message);

        variables.handleDone && (await variables.handleDone(data, variables));
      } catch (error) {
        console.error(error);
      }
    },
  });
}

// useRequest calling demo

// const { mutateAsync } = useRequest();
// const payload = {
//   email: data.email,
// };

// try {
//   await mutateAsync({
//     data: payload,
//     api: {
//       endpoint: "/api/auth",
//       path: "/forgot-password",
//       method: "POST",
//     },
//     handleDone: async (res) => {},
//     handleError: async (errorResponse) => {},
//   });
// } catch (error) {}

const paginationCrud = (oldData, data, variables) => {
  // create
  if (!variables?.id) {
    return {
      ...oldData,
      data: {
        ...oldData?.data,
        data:
          variables?.sort === "asc"
            ? [...oldData?.data?.data, data?.data]
            : [data?.data, ...oldData?.data?.data],
      },
    };
  }
  // update
  else if (variables?.id && variables.api.method.toLowerCase() !== "delete") {
    const updatedData = oldData?.data?.data.map((curr) => {
      if (curr?.id === variables.id) {
        return { ...curr, ...data?.data };
      }
      return curr;
    });
    return {
      // update item
      ...oldData,
      data: {
        ...oldData?.data,
        data: updatedData,
      },
    };
  }
  // delete
  else if (variables?.id && variables.api.method.toLowerCase() === "delete") {
    return {
      ...oldData,
      data: {
        ...oldData?.data,
        data: oldData?.data?.data.filter((curr) => curr?.id !== variables.id),
      },
    };
  }
};

// oldData is previous data and data is new data
const infiniteCrud = (oldData, data, variables) => {
  // create
  if (!variables?.id) {
    return {
      ...oldData,
      pages: oldData.pages.map((page, index) => {
        if (index === 0) {
          return {
            ...page,
            data: {
              ...page.data,
              data:
                variables?.sort === "asc"
                  ? [...page.data.data, data.data]
                  : [data.data, ...page.data.data],
              total: page.data.total + 1,
            },
          };
        }
        return page;
      }),
    };
  }
  // update
  else if (variables?.id && variables.api.method.toLowerCase() !== "delete") {
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          data: page.data.data.map((curr) =>
            curr.id === variables.id ? { ...curr, ...data.data } : curr
          ),
        },
      })),
    };
  }
  // delete
  else if (variables?.id && variables.api.method.toLowerCase() === "delete") {
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          data: page.data.data.filter((curr) => curr.id !== variables.id),
          total: page.data.total - 1,
        },
      })),
    };
  }
};
