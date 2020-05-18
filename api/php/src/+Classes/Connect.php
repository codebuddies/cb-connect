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
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

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
    
    /**
     * @var Logger
     */
    private Logger $log;
    
    /**
     * Connect constructor.
     */
    private string $pathToLog = 'logs/test.log';
    
    /**
     * knowing if the app is is debug mode helps with knowing what to log, echo,
     * or with breakpoints to set
     */
    private bool $debugMode;
    
    public function __construct(array $connectInfo, $debugMode) {
        $this->debugMode = $debugMode;
        $this->connectInfo = $connectInfo;
        
        // set up logger
        $this->log = new Logger('cb-connect');
        $this->log->pushHandler(new StreamHandler($this->pathToLog));
        
        $ml = __METHOD__ . ' line: ' . __LINE__;
        // log some info
        $this->log->info('_> method line = ' . $ml);
        
        $connectInfoArr = var_export($this->connectInfo, true);
        
        $ml = __METHOD__ . ' line: ' . __LINE__;
        
        // log some info
        $this->log->info('_> connect info = ' . $connectInfoArr);
        $this->log->info('_> method line = ' . $ml);
    }
    
    /**
     * Connect to the db (for now it'll be MySQL, but MS SQL, PostgresQL, etc. are options to)
     */
    public function connect(): PDO {
        // log some info
        $ml = __METHOD__ . ' line: ' . __LINE__;
        $this->log->info('_> method line = ' . $ml);
        
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
    private function oopConnect(ConnectStruct $c): ?PDO {
        // log some info
        $ml = __METHOD__ . ' line: ' . __LINE__;
        $this->log->info('_> method line = ' . $ml);
        
        $serverName = $_SERVER['SERVER_NAME'] ?? null;
        
        try {
            if($this->debugMode || (!is_null($serverName) && $serverName == '10.0.0.210')) {
                // manually maintain a copy of the remote db AND manually mirror it.
                $host = $c->localHost;
                $user = $c->localUser;
                $pass = $c->localPass;
                $database = $c->localDb;
                $dsn = "mysql:host=$host;dbname=$database";
                
                $db = new PDO($dsn, $user, $pass);
            }
            else {
                $host = $c->proHost;
                $user = $c->proUser;
                $pass = $c->proPass;
                $database = $c->proDb;
                $dsn = "mysql:host=$host;dbname=$database";
                
                $db = new PDO($dsn, $user, $pass);
            }
            
            $dbClass = get_class($db);
            
            if($dbClass != 'PDO') {
                $this->log->info("_> ERROR, pdo connection not made");
            }
            // log some info
            $ml = __METHOD__ . ' line: ' . __LINE__;
            $this->log->info('_> method line = ' . $ml);
            
            return $db;
        }
        catch(\PDOException $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            $errMes = '_> PDO Exception: ' . $e->getMessage() . " ~$ml";
            $this->log->error($errMes);
            echo $errMes;
        }
        catch(\Throwable $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            $errMes = '_> Throwable: ' . $e->getMessage() . " ~$ml";
            $this->log->error($errMes);
            echo $e->getMessage();
        }
        
        return null;
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