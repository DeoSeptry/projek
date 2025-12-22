export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
  },

   TRANSACTIONS: {
    LIST: "/transactions",
    TOTAL_AMOUNTS: "/transactions/total-amounts",
    DETAIL: (transactionId) => `/transactions/${transactionId}`,
    CHART: "/transactions/chart",
    UPDATE: (transactionId) => `/transactions/${transactionId}`,
    DELETE: (transactionId) => `/transactions/${transactionId}`,
    DEPOSIT: "/transactions/deposit",
    WITHDRAW: "/transactions/withdraw",
    APPROVE_WITHDRAW: (transactionId) => `/transactions/withdraw/${transactionId}`,
  },

  STUDENT: {
    TOTAL: "/students/total",
    LIST: "/students",
    PROMOTE: "/students/promote-to-next-grade",
    GRADUATE: "/students/graduate",
  },

  TEACHER: {
    LIST: "/users/teachers",
    DETAIL: (userId) => `/users/teachers/${userId}`,
    CREATE: "/users/teachers",
  },

  PROFILE: {
    GET: "/profile",
    UPDATE: "/profile",
    UPDATE_AVATAR: "/profile/avatar",
    DELETE_AVATAR: "/profile/avatar",
  }
};
