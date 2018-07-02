<?php 
	header("Access-Control-Allow-Origin: *");
	$file = @file_get_contents("favoritos.json");
	echo($file);
?>