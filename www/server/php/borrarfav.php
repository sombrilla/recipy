<?php 
header("Access-Control-Allow-Origin: *");

$postdata = json_decode(@file_get_contents("php://input"));

//$archivo = (array)json_decode(@file_get_contents("favoritos.json"));

$data = $postdata;

$data = json_encode($data);

file_put_contents("favoritos.json", $data);

print_r($postdata);

?>