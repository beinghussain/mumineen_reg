<?php

require_once("config.php");

$username = $_POST['username'];
$exists = $db->where("username", $username)->getOne("sellers");

if($exists == false) {
	echo JSON_FAILED;
} else {
	echo JSON_SUCCESS;
}