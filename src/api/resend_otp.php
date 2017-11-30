<?php

require_once("config.php");

$phone = $_POST['phone'];
$mobile = str_replace("+", "", $phone);
$mobile = str_replace(" ", "", $phone);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://control.msg91.com/api/retryotp.php?authkey=184210A3eC6d2WcJB95a0edde4&mobile=$mobile",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_HTTPHEADER => array(
    "content-type: application/x-www-form-urlencoded"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}