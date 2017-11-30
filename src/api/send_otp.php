<?php

require_once("config.php");

$data = $_POST;
$phone = $data['phone'];
$mobile = str_replace("+", "", $phone);
$mobile = str_replace(" ", "", $phone);

$curl = curl_init();
$otp = rand(1000,9999);

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://control.msg91.com/api/sendotp.php?message=Your verification code for Mumineen Shop is $otp.&otp_length=4&authkey=184210A3eC6d2WcJB95a0edde4&&sender=MMSHOP&mobile=$mobile&otp=$otp",
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