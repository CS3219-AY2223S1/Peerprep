const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";

export const URL_USER_SIGNUP_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/signup`;

export const URL_USER_LOGIN_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/login`;

export const URL_USER_DELETE_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/delete`;

export const URL_USER_CHANGE_PW_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/change_password`;