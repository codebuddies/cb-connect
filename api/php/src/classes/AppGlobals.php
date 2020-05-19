<?php

declare(strict_types=1);

/**
 * Created by PhpStorm.
 * User: julius
 * Date: 2/27/2019
 * Time: 4:28 PM
 */

namespace CodeBuddies;


class AppGlobals
{
    //-------------------------------------------------------------
    // TURN DEBUG MODE on OR off, then set the route in routes.php
    public static $NINJA_AUTO_DEBUG = true;
    //-------------------------------------------------------------
    
    //-------------------------------------------------------------
    // TURN TEST MODE on OR off, this is set for unit testing
    public static $NINJA_AUTO_TEST = false;
    //-------------------------------------------------------------
    
    // local path, NOT the production path
    private static $LogFolderPath = 'C:\xampp\htdocs\ninja\app\logs\\';
    public static $accounting_csv = 'accounting-php.csv';
    public static $coordinator_csv = 'coordinator-php.csv';
    
    public static function PathToFolder() {
        return (gethostname() === 'Julius1')
            ? 'C:\xampp\htdocs\ninja\app\commission-csv'
            : 'C:\inetpub\wwwroot\ninja\app\commission-csv';
    }
    
    public static function LogInfo(string $info): void {
        // fopen(), fwrite(), fclose()
        $handle = null;
        $newLines = "\n\r\n\r";
        $info = "The accounting and coordinator data are different sizes ~routes.php line 333 ish";
        $info = substr_replace($info, $newLines, 0, 0);
        $info = substr_replace($info, $newLines, strlen($info), 0);
        
        // append all logs by day to the same file
        $date = getdate();
        $logDay = "COM_AUTO_LOG - $date[month] $date[mday], $date[year]";
        $filePath = self::$LogFolderPath . $logDay . '.txt';
        
        // using file_exists() may be better
        try {
            // file already exists so just append to it.
            $handle = fopen($filePath, 'a') or false;
            fwrite($handle, $info);
        }
        catch(\Exception $e) {
            // create the file then write to it
            $handle = fopen($filePath, 'w') or exit("File at $filePath could not be created ~AppGlobals.php line 36 ish");
            fwrite($handle, $info);
        }
        finally {
            fclose($handle);
        }
        
    } // END OF: LogComAutoInfo()
}