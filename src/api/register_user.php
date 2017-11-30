<?php

require_once("config.php");
require_once("send_welcome_email.php");

$name = $_POST['fullname'];
$username = $_POST['username'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$mobile = str_replace("+", "", $phone);
$mobile = str_replace(" ", "", $phone);
$pincode = $_POST['pincode'];
$desc = $_POST['desc'];
$payments = json_encode($_POST['payments']);
$sellTo = $_POST['sellTo'];
$businessName = $_POST['businessName'];
$password = $_POST['password'];
$passwordHash = md5($password);
$hash = md5( rand(0,1000) );


$data = array("name"=>$name,"username"=>$username,"address1"=>$address1,"address2"=>$address2,"city"=>$city,"email"=>$email,"phone"=>$mobile,"pincode"=>$pincode,"desc"=>$desc,"payments"=>$payments,"sellTo"=>$sellTo,"pass"=>$passwordHash, "businessName"=>$businessName);


$userid = $db->insert("sellers",$data);

if($userid != false) {
	$verificationLink = "https://mumineenshop.com/email/verify.php?c=$hash&user=$userid";
    $mail = sendMail($email, $name, $verificationLink);
    $db->where("username",$username)->update("sellers",array("verificationHash"=>$hash));
	echo json_encode($userid);
	sendAdminMail($name, $username);
} else {
	echo json_encode("error : ". $db->getLastError()); 
}