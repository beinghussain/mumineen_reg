import ajax from "../libs/ajax.js";

export function authUser(response, cb) {
  ajax("auth_user", {}, res => {
    cb(res);
  });
}

export function authAdmin(response, cb) {
  ajax("auth_admin", {}, res => {
    cb(res);
  });
}

export default { authUser, authAdmin };
