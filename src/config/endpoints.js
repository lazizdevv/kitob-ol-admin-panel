export const languagesEndPoints = {
  get: "/languages/get",
  create: "/languages/create",
  delete: "/languages/delete",
  update: "/languages/update",
  list: "/languages/list",
};

export const authorsEndPoints = {
  get: "/authors/get",
  create: "/authors/create",
  delete: "/authors/delete",
  update: "/authors/update",
  list: "/authors/list",
};

export const booksEndPoints = {
  get: "/books/get",
  delete: "/auth/admin/book/delete",
  list: "/books/list",
};

export const categoriesEndPoints = {
  get: "/categories/get",
  create: "/categories/create",
  delete: "/categories/delete",
  update: "/categories/update",
  list: "/categories/list",
};

export const citiesEndPoints = {
  get: "/cities/get",
  create: "/cities/create",
  delete: "/cities/delete",
  update: "/cities/update",
  list: "/cities/list",
};

export const districtsEndPoints = {
  get: "/districts/get",
  create: "/districts/create",
  delete: "/districts/delete",
  update: "/districts/update",
  list: "/districts/list",
};

export const publishersEndPoints = {
  get: "/publishers/get",
  delete: "/auth/admin/publisher/delete",
  list: "/publishers/list",
  status: "/auth/admin/publisher/status/change",
};

export const tarnslatorsEndPoints = {
  get: "/translators/get",
  create: "/translators/create",
  delete: "/translators/delete",
  update: "/translators/update",
  list: "/translators/list",
};

export const vacanciesEndPoints = {
  get: "/vacancies/get",
  list: "/vacancies/list",
};

export const usersEndPoints = {
  get: "/auth/admin/user/get",
  create: "/auth/admin/add/admin",
  delete: "/auth/admin/delete",
  list: "/auth/admin/user/get/all",
};

export const adminEndPoints = {
  profile: "/auth/profile",

  login: {
    email: "/auth/admin/login/email",
    phone: "/auth/admin/login/phone",
  },

  reset: {
    email: "/auth/admin/password/reset/email",
    phone: "/auth/admin/password/reset/phone",
  },

  sms: {
    email: "/auth/sms/password/forgot/email",
    phone: "/auth/sms/password/forgot/phone",
  },
};

export const bannersEndPoints = {
  get: "/banners/get",
  create: "/banners/create",
  delete: "/banners/delete",
  update: "/banners/update",
  list: "/banners/list",
};
