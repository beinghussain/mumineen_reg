import $ from "jquery";
import { api_url } from "../constants";
export default (url, data, cb) =>
  $.ajax({
    url: api_url + url + ".php",
    type: "POST",
    //dataType: "jsonp",
    data,
    success: response => {
      cb(JSON.parse(response));
    }
  });
