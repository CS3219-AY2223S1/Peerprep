const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";
const URI_SOCKET_SVC = process.env.URI_SOCKET_SVC || "http://localhost:8001";
const URI_QUESTION_SVC =
  process.env.URI_QUESTION_SVC || "http://localhost:8003";

const PREFIX_USER_SVC = "/api/user";

const PREFIX_QUESTION_SVC = "/questions/test";

export const URL_USER_SIGNUP_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/signup`;

export const URL_USER_LOGIN_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/login`;

export const URL_USER_DELETE_SVC = `${URI_USER_SVC + PREFIX_USER_SVC}/delete`;

export const URL_USER_CHANGE_PW_SVC = `${
  URI_USER_SVC + PREFIX_USER_SVC
}/change_password`;

export const URL_QUESTION_GET_RANDOM = `${
  URI_QUESTION_SVC + PREFIX_QUESTION_SVC
}/getOne`;

export const URL_GET_ROOM_UUID = `${URI_SOCKET_SVC}/room/roomUuid`;
