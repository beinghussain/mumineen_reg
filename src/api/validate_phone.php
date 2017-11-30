<?php

require_once("config.php");

$phone = $_POST['phone'];
$phone = str_replace(" ", "", $phone);
$exists = $db->where("phone", $phone)->getOne("sellers");

if($exists == false) {
	echo JSON_FAILED;
} else {
	echo JSON_SUCCESS;
}