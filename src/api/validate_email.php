<?php

require_once("config.php");

$email = $_POST['email'];
$exists = $db->where("email", $email)->getOne("sellers");

if($exists == false) {
	echo JSON_FAILED;
} else {
	echo JSON_SUCCESS;
}