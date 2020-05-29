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
     * @var bool
     */
    public static $logFromRoutePhp = false;
    
    /**
     * @var bool
     */
    public static $logFromModelUsersPhp = false;
    
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
    
    /**
     * To clean up route code and help with debugging
     * @return array
     */
    public static function debugMatchSkills(): array {
        $mock = [
            // mock a basic sql injection while debugging
            'user-name' => "'SELECT * FROM users_db --",
            'user-skills' => 'c#, visual basic, html, php',
            'user-about' => ', SELECT user_pass, user_email FROM users_db',
            'app-name' => 'Code Buddies Connect',
        ];
        
        return [
            'data' => [
                // mock a basic sql injection while debugging
                'user-name' => "hii there !! World.",
                'user-skills' => 'c, php',
                'user-about' => 'php programmer',
                'app-name' => 'Code Buddies Connect',
            ],
        ];
    }
    
    /**
     * Clean up route and help w/debugging
     *
     * @param bool $dbLookingFor
     *
     * @return mixed
     */
    public static function debugMatchLookingFor($dbLookingFor = false) {
        return !$dbLookingFor ? [
            // exactly what data looks like after slim3's getParsedBody()
            // when submitted from a web form
            'data' => [
                'working-on' => '',
                'code-user' => 'debugger',
                'account' => 'true',
                'coding' => 'true',
                'mentor' => 'false',
                'mentee' => 'true',
                'openSource' => 'true',
                'contributors' => 'false',
                'other' => 'true',
            ],
            // how data looks from the sql db
        ] : 'account true, mentee true, openSource true, other , ';
    }
    
    /**
     * Create a file with the data to see its' structure. This was primarily needed
     * for POST requests from clients to see how to traverse the data properly.
     * e.g. A user submits a form to a POST/GET route, I don't know how to do this in
     * debug mode so I have to manually type in a form then click submit. When I click
     * submit this function will create a file with the export data
     *
     * @param $data - could be anything, just log it
     * @param null $id - so logs don't override each other
     */
    public static function createFileOfData($data, $id = null) {
        if(is_null($id)) $id = rand(1, 1000000);
        $data = var_export($data, true);
        file_put_contents("logs/parsed-body-$id.txt", $data);
    }
    
}