<?php

header("Access-Control-Allow-Origin: *");

require_once('MysqliDb.php');
require_once('db.php');

define("SUCCESS", "success");
define("FAILED", "failed");

define("JSON_FAILED", json_encode("failed"));
define("JSON_SUCCESS", json_encode("success"));

function get_extension($file) {
  $ex = explode(".", $file);
  $extension = end($ex);
  return $extension ? $extension : false;
}

$date = new DateTime();
$created = $date->format("Y-m-d H:i:s");
