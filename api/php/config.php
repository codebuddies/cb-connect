<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/13/2020
 * Time: 9:57 AM
 */

connect();

/**
 * Connect to the db (for now it'll be MySQL, but MS SQL, PostgresQL, etc. are options to)
 */
function connect () {
    // connection info, 'db.php' is a sibling file in the same folder as index.php
    $tempConnectionInfo = require 'db.php';
    
    // connect struct to use 'object->prop' notation & to uphold the "DRY" principle.
    $c = new class($tempConnectionInfo) {
        public string $localHost;
        public string $localUser;
        public string $localPass;
        public string $localDb;
        public string $proHost;
        public string $proUser;
        public string $proPass;
        public string $proDb;
        
        public function __construct($c) {
            $this->localHost = $c['local']['host'];
            $this->localUser = $c['local']['user'];
            $this->localPass = $c['local']['pass'];
            $this->localDb = $c['local']['db'];
            $this->proHost = $c['production']['host'];
            $this->proUser = $c['production']['user'];
            $this->proPass = $c['production']['pass'];
            $this->proDb = $c['production']['db'];
        }
    };
    
    oopConnect($c);
}

/**
 * opting for OOP connection instead
 * @param object $c - an object from an instance of an anonymous class
 */
function oopConnect(object $c): void {
    // same if-else as proceduralConnect(), perhaps I should get fancy here to keep code dry? 🤔
    if($_SERVER['SERVER_NAME'] == '10.0.0.210') {
        // manually maintain a copy of the remote db AND manually mirror it.
        $host = $c->localHost;
        $user = $c->localUser;
        $pass = $c->localPass;
        $database = $c->localDb;
        
        $db = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
    }
    else {
        $host_name = $c->proHost;
        $user_name = $c->proUser;
        $password = $c->proPass;
        $database = $c->proDb;
        
        $link = mysqli_connect($host_name, $user_name, $password, $database);
    }
}

/**
 * will leave the Procedural connection around just in case
 */
function proceduralConnect() {
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
}











// end of php file