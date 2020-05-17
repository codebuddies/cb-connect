<?php
declare(strict_types=1);
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/13/2020
 * Time: 9:57 AM
 */

namespace CodeBuddies;

use PDO;

/**
 * Class Connect connects to the db
 * @package CodeBuddies
 */
class Connect
{
    /**
     * connection info, 'db.php' is a sibling file in the same folder as index.php
     */
    private array $connectInfo;
    
    public function __construct(array $connectInfo) {
        $this->connectInfo = $connectInfo;
    }
    
    /**
     * Connect to the db (for now it'll be MySQL, but MS SQL, PostgresQL, etc. are options to)
     */
    public function connect (): PDO {
        // a struct enables 'object->prop' notation & the ability to uphold the "DRY" principle.
        $c = new ConnectStruct($this->connectInfo);
        
        return $this->oopConnect($c);
    }
    
    /**
     * opting for OOP connection instead
     *
     * @param ConnectStruct $c - a struct to hold connection info
     *
     * @return PDO
     */
    private function oopConnect(ConnectStruct $c): PDO {
        if(in_array(CB_DEBUG_MODE, [null, 'true']) || $_SERVER['SERVER_NAME'] == '10.0.0.210') {
            // manually maintain a copy of the remote db AND manually mirror it.
            $host = $c->localHost;
            $user = $c->localUser;
            $pass = $c->localPass;
            $database = $c->localDb;
            
            $db = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
        }
        else {
            $host = $c->proHost;
            $user = $c->proUser;
            $pass = $c->proPass;
            $database = $c->proDb;
    
            $db = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
        }
        
        return $db;
    }
    
    /**
     * will leave the Procedural connection around just in case
     */
    private function proceduralConnect(): void {
        $c = $this->connectInfo;
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
}













// end of php file