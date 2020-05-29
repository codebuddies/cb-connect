<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/24/2020
 * Time: 8:35 PM
 */

namespace CodeBuddies;


class LookingForStruct
{
    /**
     * When the user provides more detail about what they are
     * looking for in a match, such as what they're working on,
     * struggling with, and who they're looking for.
     * ... This is a <textarea/> input field from the web view
     * @var string
     */
    public $workingOn;
    
    /**
     * @var string
     */
    public static $workingOnKey = 'working-on';
    
    /**
     * This is the IP address from the client device to assist
     * with persisting state across multiple requests
     * @var string - of numbers
     */
    public $codeUser;
    
    /**
     * @var string
     */
    public static $codeUserKey = 'code-user';
    
    /**
     * An accountability partner?
     * @var bool
     */
    public $account;
    
    /**
     * @var string
     */
    public static $accountKey = 'account';
    
    /**
     * A coding partner?
     * @var bool
     */
    public $coding;
    
    /**
     * @var string
     */
    public static $codingKey = 'coding';
    
    /**
     * Are you looking for a mentor?
     * @var bool
     */
    public $mentor;
    
    /**
     * @var string
     */
    public static $mentorKey = 'mentor';
    
    /**
     * Are you looking for a mentee?
     * @var bool
     */
    public $mentee;
    
    /**
     * @var string
     */
    public static $menteeKey = 'mentee';
    
    /**
     * Are you looking for an open source project to contribute to?
     * @var bool
     */
    public $openSource;
    
    /**
     * @var string
     */
    public static $openSourceKey = 'openSource';
    
    /**
     * Are you looking for contributors to your open source project?
     * @var bool
     */
    public $contributors;
    
    /**
     * @var string
     */
    public static $contribKey = 'contributors';
    
    /**
     * Something else not mentioned?
     * @var bool
     */
    public $other;
    
    /**
     * @var string
     */
    public static $otherKey = 'other';
    
    /**
     *
     * @var array
     */
    public $chosenKeys;
    
    /**
     * $lookingFor is an array of mostly 'true' or 'false' values that the
     * user selected from the web form when selecting what they were
     * looking for in a match.
     *
     * @param array $lookingFor
     */
    public function __construct(array $lookingFor) {
        $this->chosenKeys = $this->lookFilter($lookingFor);
        
        $this->workingOn = $lookingFor[self::$workingOnKey] ?? null;
        $this->codeUser = $lookingFor[self::$codeUserKey] ?? null;
        // bool values, may not need these
        $this->account = $lookingFor[self::$accountKey] ?? null;
        $this->coding = $lookingFor[self::$codingKey] ?? null;
        $this->mentor = $lookingFor[self::$mentorKey] ?? null;
        $this->mentee = $lookingFor[self::$menteeKey] ?? null;
        $this->openSource = $lookingFor[self::$openSourceKey] ?? null;
        $this->contributors = $lookingFor[self::$contribKey] ?? null;
        $this->other = $lookingFor[self::$otherKey] ?? null;
    }
    
    /**
     * The multi-select options names for input
     * @return array
     */
    public static function lookingForKeys(): array {
        return [
            self::$accountKey, self::$codingKey, self::$menteeKey, self::$mentorKey,
            self::$openSourceKey, self::$contribKey, self::$otherKey
        ];
    }
    
    private function lookFilter(array $sanitize): array {
        $san = [];
        $filtered = [];
        foreach($sanitize as $key => $value) {
            // convert to true or false i.e. bool
            switch($key) {
                case self::$accountKey:
                case self::$codingKey:
                case self::$mentorKey:
                case self::$menteeKey:
                case self::$openSourceKey:
                case self::$contribKey:
                case self::$otherKey:
                    $san[$key] = ($value === 'true');
                    break;
                default:
                    $san[$key] = $value;
            }
            if($san[$key]) {
                $filtered [] = $key;
            }
        }
        return $filtered;
    }
}