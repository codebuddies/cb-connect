<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/13/2020
 * Time: 9:57 AM
 */

// connection info
$c = require 'db.php';

if($_SERVER['SERVER_NAME'] == '10.0.0.210') {
    // manually maintain a copy of the remote db AND manually mirror it.
    $host_name = $c['local']['host'];
    $user_name = $c['local']['user'];
    $password = $c['local']['pass'];
    $database = $c['local']['db'];
    $link = mysqli_connect($host_name, $user_name, $password, $database);
}
else {
    $host_name = $c['production']['host'];
    $user_name = $c['production']['user'];
    $password = $c['production']['pass'];
    $database = $c['production']['db'];
    $link = mysqli_connect($host_name, $user_name, $password, $database);
}

if(!$link) {
    //TODO: log these error, don't use the output buffer...
    echo "Error: Unable to connect to MySQL. <br>"; //PHP_EOL
    echo "Debugging errno: " . mysqli_connect_errno() . " <br>";
    echo "Debugging error: " . mysqli_connect_error() . " <br>";
    $serverInfo = print_r($_SERVER, true);
    echo $serverInfo . "<br>";
    exit("<p>Exiting Program, Failed to connect to the db.</p>");
}










// end of php file