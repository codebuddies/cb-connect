<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 */

/************************************************************************
 ************************ Configuration & Set up ************************
 ************************************************************************/
// to keep it simple, manually include files
include 'config.php';


/*******************************************************************
 ************************ Application Start ************************
 *******************************************************************/
// get query string
$action = $_GET['action'] ?? null;

if(is_null($action)) {
    echo "<code style='background-color: #1b1e21; color: whitesmoke; padding: 2px'>[ connected to db: 'cb_connect' ]</code>";
    echo "<h2 style='font-family: sans-serif'>Hello World ^_^/</h2>";
    echo "<p style='font-family: sans-serif'>This is the Code Buddies Connect API super powered by ";
    echo "<a href='https://www.php.net/manual/en/tutorial.php'  style='font-family: sans-serif'>PHP 7.4</a></p>";
}
else {
    echo "action = $action... It's Go Time >:)";
}











// end of php file