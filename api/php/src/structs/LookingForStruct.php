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
     * This is the IP address from the client device to assist
     * with persisting state across multiple requests
     * @var string - of numbers
     */
    public $codeUser;
    
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
     * $lookingFor is an array of mostly 'true' or 'false' values that the
     * user selected from the web form when selecting what they were
     * looking for in a match.
     *
     * @param array $lookingFor
     */
    public function __construct(array $lookingFor) {
        $lookingFor = $this->sanitize($lookingFor);
        
        $this->workingOn = $lookingFor['working-on'];
        $this->codeUser = $lookingFor['code-user'];
        // bool values
        $this->account = $lookingFor['account'];
        $this->coding = $lookingFor['coding'];
        $this->mentor = $lookingFor['mentor'];
        $this->mentee = $lookingFor['mentee'];
        $this->openSource = $lookingFor['openSource'];
        $this->contributors = $lookingFor['contributors'];
        $this->other = $lookingFor['other'];
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
    
    private function sanitize(array $sanitize): array {
        $san = [];
        foreach($sanitize as $key => $value) {
            // convert to true or false i.e. bool
            switch($key) {
                case 'account':
                case 'coding':
                case 'mentor':
                case 'mentee':
                case 'openSource':
                case 'contributors':
                case 'other':
                    $san[$key] = ($value === 'true');
                    break;
            }
        }
        return array_filter($san);
    }
}