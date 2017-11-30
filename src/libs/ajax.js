import $ from "jquery";
export default (url, data, cb) =>
  $.ajax({
    url: "https://mumineenshop.com/api/" + url + ".php",
    type: "POST",
    //dataType: "jsonp",
    data,
    success: response => {
      cb(JSON.parse(response));
    }
  });
