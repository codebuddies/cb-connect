<?php
declare(strict_types=1);
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/18/2020
 * Time: 12:58 PM
 */

namespace CodeBuddies;

use Spatie\Regex\Regex;

class ModelUsers
{
    use CodeBuddiesUtil;
    
    /**
     * The main Code Buddies Connect db, if more db's are needed, they'll have
     * specialized names
     */
    private $db;
    
    /**
     * @var string
     */
    private $tableMockUsers = 'mock_users';
    
    public function __construct($dbCodeBuddiesConnect) {
        $this->db = $dbCodeBuddiesConnect;
    }
    
    /**
     * The primary data I'll be using to implement the match will be against the mock users
     * @return array
     */
    public function getMockUsers(): array {
        try {
            $query = /** @lang */
                "select * from $this->tableMockUsers";
            $statement = $this->db->prepare($query);
            $statement->execute();
            return $statement->fetchAll();
        }
        catch(\Throwable $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            return [
                'x-cb-error-message' => $e->getMessage(),
                'x-cb-info' => "_> CB_CONNECT Error: Query to get mock users table failed ~$ml",
            ];
        }
    }
    
    /**
     * Basically just add random skills to mock users to have data to work with
     * @return array|string[]
     */
    public function addSkillsToMockUsers(): array {
        try {
            // get id's
            $query = /** @lang * */
                "select q_id from $this->tableMockUsers";
            $statement = $this->db->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            
            $queryFormat = /** @lang * */
                "update %s set skills = '%s' where q_id = %d;";
            foreach($result as $i => $q_id) {
                $randomSkills = $this->createRandomSkills(rand(2, 10));
                $randomSkillsImplode = implode(", ", $randomSkills);
                $q_id = (int)$q_id['q_id'];
                $debug = 1;
                $query = sprintf($queryFormat, $this->tableMockUsers, $randomSkillsImplode, $q_id);
                $statement = $this->db->prepare($query);
                $statement->execute();
            }
            
            return ['x-cb-info' => '_> CB_CONNECT: added skills to mock users table'];
        }
        catch(\Throwable $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            return [
                'x-cb-error' => $e->getMessage(),
                'x-cb-info' => "_> CB_CONNECT: Query to add random skills to mock_users failed ~$ml",
            ];
        }
    }
    
    /**
     * The most important and difficult to implement match
     *
     * @param array $data
     *
     * @return array|string[]
     */
    public function matchSkills(array $data): array {
        try {
            // create a struct real quick to assist the matching
            // maybe make this a class property
            $ff = new class() {
                public $matches = [];
                public $pctMatchThreshold = 0.0;
                public $keyMatchPct = 'skill_pct_match';
                public $keyMatchedSkill = 'skills_matched';
            };
            $data = $this->sanitizeData($data);
            ['username' => $userName, 'userskills' => $userSkills, 'userabout' => $userAbout] = $data;
            $userType = 'real user';
            
            if(!AppGlobals::inDebugMode()) {
                //-- 1st insert new user data into db:
                $query = /** @lang SQL * */
                    "insert into $this->tableMockUsers (first_name, user_type, skills, about)
                values (:userName, :userType, :userSkills, :userAbout)";
                $statement = $this->db->prepare($query);
                $statement->bindValue(':userName', $userName);
                $statement->bindValue(':userType', $userType);
                $statement->bindValue(':userSkills', $userSkills);
                $statement->bindValue(':userAbout', $userAbout);
                $statement->execute();
            }
            
            // get number of skills user added and LOWERCASE all elems
            $userSkillParsed = array_map(function($e) { return strtolower(trim($e)); }, explode(',', $userSkills));
            asort($userSkillParsed);
            $userSkillsCount = count($userSkillParsed);
            
            //TODO: do NOT get all users, write a better query to get users
            // for now just get all of the mock users... for now
            $allMockUsers = $this->getMockUsers();
            /*
            -- example user --
            array (
                  'first_name' => 'Aaron',
                  0 => 'Aaron',
                  'last_name' => 'CHASE',
                  1 => 'CHASE',
                  'user_type' => 'mock user',
                  2 => 'mock user',
                  'gender' => 'male',
                  3 => 'male',
                  'skills' => 'angular, html, javascript, php, interview practice, c#, c, web dev',
                  4 => 'angular, html, javascript, php, interview practice, c#, c, web dev',
                  'q_id' => '10000340',
                  5 => '10000340',
                  'id' => '1',
                  6 => '1',
                  'about' => NULL,
                  7 => NULL,
                  'time_added' => '2020-05-21 09:33:42',
                  8 => '2020-05-21 09:33:42',
                )
            */
            
            // OUTER_LOOP_1 - O(n),  get user skills, sort, and kind of "split"
            // initial match attempt is in PHP, but SQL would be preferable eventually
            foreach($allMockUsers as $k => $dbUser) {
                $dbUserSkills = $dbUser['skills'];
                if(is_null($dbUserSkills)) continue;
                // get rid of trailing and leading spaces
                $dbUserSkillsParsed = array_map(function($e) { return trim($e); }, explode(',', $dbUserSkills));
                arsort($dbUserSkillsParsed);
                $dbUserSkillsCount = count($dbUserSkillsParsed);
                
                // get first N skills, N is same length as $userSkillsCount... perhaps this decreases time complexity
                $dbUserSkillsSlice1 = array_slice($dbUserSkillsParsed, $userSkillsCount);
                
                // 100% match \^_^/
                if($userSkillParsed == $dbUserSkillsSlice1) {
                    //TODO: dry this code :\
                    // add the skills that were matched
                    $dbUser[$ff->keyMatchedSkill] = $dbUserSkillsSlice1;
                    $dbUser[$ff->keyMatchPct] = 100.0;
                    $ff->matches [] = $dbUser;
                    $debug = 1;
                }
                // not a 100% match, that's okay
                else {
                    // SUPER IMPORTANT, let's find a match
                    $matchedSkills = array_intersect($userSkillParsed, $dbUserSkillsParsed);
                    $matchedSkillsCount = count($matchedSkills);
                    $pctMatch = round($matchedSkillsCount / $dbUserSkillsCount, 2);
                    
                    // hmmm? What % should be considered a match? 🤔 actually, if there is ANY match...
                    if($pctMatch > $ff->pctMatchThreshold) {
                        //TODO: dry this code :\
                        // add the skills that were matched
                        $dbUser[$ff->keyMatchedSkill] = $matchedSkills;
                        $dbUser[$ff->keyMatchPct] = $pctMatch;
                        $ff->matches [] = $dbUser;
                        $debug = 1;
                    }
                }
            } // end of OUTER_LOOP_1
            
            // stop before return to the ctrl
            $debug = 1;
            
            // messy solution, will clean up later. Now return the matches
            return $ff->matches;//'x-cb-info' => '_> CB_CONNECT: Successfully matched skills.',
        }
        catch(\Throwable $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            return [
                'x-cb-error' => $e->getMessage(),
                'x-cb-status' => "_> CB_CONNECT: Query to match user skills failed ~$ml",
            ];
        }
    }
    
    /**
     * Only accept comma's and alphanumeric chars. For security.
     *
     * @param array $data
     *
     * @return array
     */
    private function sanitizeData(array $data): array {
        $sanitizedData = [];
        
        //TODO: use filter functions and more sophisticated sanitization because
        // this will make "c#" become "c" 🤦‍♂️
        
        // utility sanitize lambda
        $sanLambda = function($i): string {
            return Regex::replace('/[^\w,\s]/', '', $i)->result();
        };
        
        foreach($data as $k => $datum) {
            $sanitizedData[$sanLambda($k)] = $sanLambda($datum);
        }
        
        $debug = 1;
        return $sanitizedData;
    }
}