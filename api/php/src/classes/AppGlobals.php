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
    /**
     * Determine if app is in local or remote environment
     * @return bool
     */
    public static function isLocal(): bool {
        $serverName = $_SERVER['SERVER_NAME'] ?? null;
        // if app is not in CLI mode or server name is both not null and equal to local ip
        return (PHP_SAPI == 'cli' || (!is_null($serverName) && $serverName == '10.0.0.210'));
    }
    
    /**
     * @return bool
     */
    public static function inDebugMode(): bool {
        $getDebug = $_GET['debug'] ?? null;
        if(PHP_SAPI == 'cli' || (!is_null($getDebug) && $getDebug == 'true')) {
            return true;
        }
        
        return false;
    }
}