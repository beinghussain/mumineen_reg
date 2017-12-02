import $ from "jquery";

export function post(url, data, cb) {
  $.ajax({
    type: "POST",
    url: "https://mumineenshop.com/api/" + url + ".php",
    data: data,
    success: res => {
      cb(JSON.parse(res));
    }
  });
}

export function get(url, cb) {
  $.ajax({
    type: "GET",
    url: "https://mumineenshop.com/api/" + url + ".php",
    success: res => {
      cb(JSON.parse(res));
    }
  });
}

export default { post, get };
