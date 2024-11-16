<?php
// Set the necessary CORS headers to allow access from any origin
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// URL of the external API
$apiUrl = 'http://marcconrad.com/uob/banana/api.php?out=json';

// Use file_get_contents to fetch data from the external API
$response = file_get_contents($apiUrl);

// Return the response to the front-end
echo $response;
?>
