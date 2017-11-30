import ajax from "../libs/ajax.js";

export function authUser(response, cb) {
  ajax("auth_user", {}, res => {
    cb(res);
  });
}

export default { authUser };
