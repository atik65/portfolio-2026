const endpoint = "/api/admin/document-category";

const documentCategoryApi = {
  cacheKey: "documentCategories",
  list: {
    endpoint,
    path: "/list",
    method: "get",
  },
  create: {
    endpoint,
    path: "/create",
    method: "post",
  },
  update: (id) => ({
    endpoint,
    path: `/update/${id}`,
    method: "put",
  }),
  delete: (id) => ({
    endpoint,
    path: `/delete/${id}`,
    method: "delete",
  }),
  show: (id) => ({
    endpoint,
    path: `/show/${id}`,
    method: "get",
  }),
};

export default documentCategoryApi;
