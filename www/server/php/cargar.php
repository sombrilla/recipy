<?php 
	header("Access-Control-Allow-Origin: *");
	$file = @file_get_contents("comidas.json");
	echo($file);
?>