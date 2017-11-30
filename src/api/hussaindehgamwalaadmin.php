<?php

require_once("config.php");

$count = $db->getValue("sellers", "count(*)");
echo $count;