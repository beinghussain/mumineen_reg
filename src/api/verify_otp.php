<?php

require_once("config.php");

$data = $_POST;
$phone = $data['phone'];
$otp = $data['otp'];
$mobile = str_replace("+", "", $phone);
$mobile = str_replace(" ", "", $phone);



$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://control.msg91.com/api/verifyRequestOTP.php?authkey=184210A3eC6d2WcJB95a0edde4&mobile=$mobile&otp=$otp",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo json_encode("cURL Error #:" . $err);
} else {
  echo json_encode($response);
}

