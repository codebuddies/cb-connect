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
use Monolog\Logger;

class ModelUsers
{
    use CodeBuddiesUtil;
    
    private $log;
    
    /**
     * The main Code Buddies Connect db, if more db's are needed, they'll have
     * specialized names
     */
    private $db;
    
    /**
     * @var string
     */
    private $tableMockUsers = 'mock_users';
    
    /**
     * @var array
     */
    private $lookForKeys;
    
    private $curUserDbId;
    
    /**
     * The field names from the users' table & the field names
     * that get created during matching
     * @var object
     */
    public $userMatchFields;
    
    public function __construct($dbCodeBuddiesConnect, Logger $log) {
        $this->log = $log;
        $this->db = $dbCodeBuddiesConnect;
        $this->lookForKeys = LookingForStruct::lookingForKeys();
        
        // maybe put this struct in its' own file?
        $this->userMatchFields = new class() {
            public $first = 'first_name';
            public $userType = 'skill_pct_match';
            public $skillPct = 'user_type';
            public $skillMatch = 'skills_matched';
        };
    }
    
    /**
     * The primary data I'll be using to implement the match will be against the mock users
     * @return array
     */
    public function getMockUsers(): array {
        try {
            $query = /** @lang */
                "select id, first_name, skills from $this->tableMockUsers";
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
            //TODO: L200, dry this code
            $query = /** @lang */
                "select q_id from $this->tableMockUsers";
            $statement = $this->db->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            
            $queryFormat = /** @lang */
                "update %s set skills = '%s' where q_id = %d;";
            
            foreach($result as $i => $q_id) {
                $randomSkills = $this->createRandomSkills(rand(2, 10));
                $randomSkillsImplode = implode(", ", $randomSkills);
                $q_id = (int)$q_id['q_id'];
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
     * Match implementation for the "About me" web view, the 2nd web view.
     * Will be it's own request
     *
     * @param array $data
     *
     * @return array|string[]
     */
    public function matchSkills(array $data): array {
        try {
            // create a struct real quick to assist the matching
            // maybe make this a class property
            $ff = new SkillStruct();
            $data = $this->sanitizeData($data);
            
            ['userskills' => $userSkills] = $data;
            // get number of skills user added and LOWERCASE all elems
            $userSkillParsed = array_map(function($e) { return strtolower(trim($e)); }, explode(',', $userSkills));
            asort($userSkillParsed);
            $userSkillsCount = count($userSkillParsed);
            
            //TODO: do NOT get ALL users, write a better query to get users, this will be fine for
            // result sets < 100,000... but will get slow with 100,001 to 1,000,000+ records
            $allMockUsers = $this->getMockUsers();
            
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
            $errArr = [
                'x-cb-error' => $e->getMessage(),
                'x-cb-status' => "_> CB_CONNECT: Query to match user skills failed ~$ml",
            ];
            $errExport = var_export($errArr, true);
            $exitMessage ="Please email ( phpninja@mail.com ) and copy the following error to the email: \n\n <br><br>";
            $exitMessage .= $errExport;
            //TODO: figure out a better way to handle this error!!! >:\
            exit($exitMessage);
        }
    }
    
    /**
     * Add some random "Looking For" answers to the mock users table to have some
     * data to match against
     *
     * @return array
     */
    public function addLookingForToMockUsers(): array {
        try {
            //TODO: L200, dry this code
            $query = /** @lang */
                "select id from $this->tableMockUsers";
            $statement = $this->db->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            
            $query = /** @lang */
                "update $this->tableMockUsers set looking_for = :lookingFor where id = :id";
            foreach($result as $i => $id) {
                $randomLookingFor = $this->createRandomLookingFor(4);
                $randLookingImplode = implode(", ", $randomLookingFor);
                $id = (int)$id['id'];
                $statement = $this->db->prepare($query);
                $statement->bindValue(':lookingFor', $randLookingImplode);
                $statement->bindValue(':id', $id);
                $statement->execute();
            }
            
            return [
                'x-cb-info' => 'successfully added random Looking For to test users',
            ];
        }
        catch(\Throwable $e) {
            $ml = __METHOD__ . ' line: ' . __LINE__;
            $errorMessage = $e->getMessage();
            $debug = 1;
            return [
                'x-cb-error' => $errorMessage,
                'x-cb-info' => "_> CB_CONNECT: Query to add random 'Looking For' to mock_users failed ~$ml",
            ];
        }
    }
    
    /**
     * @param array $data - an as.ar from the POST req
     * @param $qid
     *
     * @return array
     */
    public function insertLookingFor(array $data, $qid): array {
        try {
            $about = $data['working-on'];
            $lookingFor = '';
            foreach($data as $k => $boolVal) {
                if('false' == $boolVal) continue;
                
                if(in_array($k, $this->lookForKeys)) {
                    $lookingFor .= "$k $boolVal, ";
                }
            }
            
            $query = "
                insert into {$this->tableMockUsers} (q_id, user_type, about, looking_for)
                values (:qid, 'real user', :about, :lookingFor);
            ";
            $statement = $this->db->prepare($query);
            $statement->bindValue(':qid', $qid);
            $statement->bindValue(':about', $about);
            $statement->bindValue(':lookingFor', $lookingFor);
            $statement->execute();
            $dbInsertId = $this->db->lastInsertId();
            $this->curUserDbId = $dbInsertId;
            $_SESSION['c_user_id'] = $dbInsertId;
           
            return [
                'x-cb-info' => '_> Successfully inserted "Looking For" data',
            ];
        }
        catch(\Throwable $e) {
            $err = $e->getMessage();
           $ml = __METHOD__ . ' line: ' . __LINE__;
            return [
                'x-cb-error' => "$err ~$ml",
                'x-cb-info' => '_> Unable to insert what the user is looking for into DB',
            ];
        }
    }
    
    /**
     * Insert the data from the web form into sql db
     * ... The function that invokes this function is wrapped in a try/catch.
     *
     * @param array $data
     * @return array
     */
    public function insertSkills(array $data): array {
        try {
            $data = $this->sanitizeData($data);
            // data from web form, future fields: 'wantedskills' => $wantedSkills, 'onelineintro' => $userAbout,
            ['username' => $userName, 'userskills' => $userSkills,] = $data;
            $userType = 'real user';
            $userAbout = 'todo';
            $cUserId = $_SESSION['c_user_id'] ?? null;
    
            $ml = __METHOD__ . ' line: ' . __LINE__;
            if(!is_null($cUserId)) {
                $this->log->info("_> state successfully persisted, db id = $cUserId ~$ml");
        
                $query = "update $this->tableMockUsers set first_name = :userName, user_type = :userType,
                skills = :userSkills, about = :userAbout where id = :id";
        
                $statement = $this->db->prepare($query);
                $statement->bindValue(':userName', $userName);
                $statement->bindValue(':userType', $userType);
                $statement->bindValue(':userSkills', $userSkills);
                $statement->bindValue(':userAbout', $userAbout);
                $statement->bindValue(':id', $cUserId);
                $statement->execute();
                return [
                    'x-cb-info' => '_> Successfully inserted "Skills" data',
                ];
            }
            else {
                $message = "_> DID NOT persist state... Something went wrong!! ~$ml";
                $this->log->error($message);
                Throw new \Exception($message);
            }
        }
        catch (\Throwable $e) {
            $err = $e->getMessage();
            $ml = __METHOD__ . ' line: ' . __LINE__;
            return [
                'x-cb-error' => "$err ~$ml",
                'x-cb-info' => '_> Unable to insert "Skills" into DB',
            ];
        }
        
    }
    
    /**
     * Matching for the "Looking for" web view. Will be its' own request.
     *
     * This data doesn't need to
     *
     * @param array $whatUserIsLookingFor
     *
     * @return array
     */
    public function matchLookingFor(array $whatUserIsLookingFor): array {
        try {
            // functions' fields
            $ff = new class() {
                public $matches = [];
                public $currentUserInfo = [];
                public $idKey = 'current_user_db_id';
                public $lookForKey = 'current_user_look_for_keys';
            };
            // what the Current user is looking for
            $_cLookFor = new LookingForStruct($whatUserIsLookingFor);
            $ff->currentUserInfo[$ff->idKey] = $this->curUserDbId;
            $ff->currentUserInfo[$ff->lookForKey] = $_cLookFor->chosenKeys;
            
            //TODO: this query needs filters and to be improved
            $query = "
                select id, first_name, user_type, looking_for
                from mock_users
            ";
            $statement = $this->db->prepare($query);
            $statement->execute();
            //TODO: use another function instead of fetchAll()
            $result = $statement->fetchAll();
            
            // OUTER_LOOP_1, loop over all the User Records
            foreach($result as $k => $dbUserRec) {
                [$_dbID, $_dbFirstName, $_dbUserType, $_dbLookFor] = $dbUserRec;
                if(is_null($_dbLookFor)) continue;
                
                $lookForExplode = explode(',', $_dbLookFor);
                $_dbLookForMappedKeys = $this->lookForMatchMap($lookForExplode);
                
                $matches = array_intersect($_dbLookForMappedKeys, $_cLookFor->chosenKeys);
                $matchCount = count($matches);
                if($matchCount > 0) {
                    $ff->matches [] = [
                        'matched_user_db_id' => (int)$_dbID,
                        'm_first_name' => $_dbFirstName,
                        'm_user_type' => $_dbUserType,
                        'm_looking_for' => $_dbLookFor,
                        'm_look_for_maps' => $_dbLookForMappedKeys,
                        'what_matched' => $matches,
                    ];
                }
                $debug = 1;
            } // end of: OUTER_LOOP_1
            
            $debug = 1;
            
            return [
                'matches' => $ff->matches,
                'match_count' => count($ff->matches),
                'current_user_info' => $ff->currentUserInfo,
                'x-cb-info' => '_> Matched users who were looking for similar options',
            ];
        }
        catch(\Throwable $e) {
            $err = $e->getMessage();
            $debug = 1;
            return [
                'x-cb-error' => $e,
                'x-cb-info' => '_> CB_ERROR, failed to match what user is "Looking For"',
            ];
        }
        
    }
    
    /**
     * As of 5-26-2020 @12:04pm, this function will match:
     * 1) the "Looking For" selected options (this data will be a comma separated list in the db
     *      or an associative array from the web form)
     * 2) the "Skills" the user typed in
     * ... Also, it is DEPENDING on the "Looking For" selected options to already be in the db
     *      and for "Skills" to be from the web form and for an active session
     *
     * @param array $webFormSkills - The skills the user input from a web form
     * @param bool $lookForIsInDb - Is the looking for data in the db? Or from a web form/some other HTTP req?
     * @param bool $skillsInDb - Is the skills data in the db? Or from a web from/some other HTTP req?
     *
     * @return array
     */
    public function matchAll(array $webFormSkills, bool $lookForIsInDb = true, bool $skillsInDb = false): array {
        if(!$lookForIsInDb) {
            //TODO: implement matching the "Looking For" data from a web form/other HTTP req
            // while concurrently matching "Skills" (either from a web form/other HTTP req OR db)
        }
        if($skillsInDb) {
            //TODO: implement matching the "Skills" data matching from a db while concurrently matching
            // the "Looking For" data (either from a web form/other HTTP req OR db)
        }
        
        /*****************************************************************************
         ** The skills data is from a web form and looking for is an the db already **
         ****************************************************************************/
        $ff = new SkillStruct();
        $data = $this->sanitizeData($webFormSkills);
        
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
        
        
        return $sanitizedData;
    }
    
    private function lookForMatchMap(array $lookFor): array {
        $lookForMap = [];
        
        $check = function($key) use (&$elem) {
            return (stripos($elem, $key) !== false);
        };
        
        $options = $this->setLookingForStandardizedOptions();
        $openSourceQ = $options['openSource'];
        $contribQ = $options['contributors'];
        // elem is the users answer
        foreach($lookFor as $elem) {
            $elem = strtolower(trim($elem));
            if($check(LookingForStruct::$accountKey)) {
                $lookForMap [] = LookingForStruct::$accountKey;
            }
            else if($check(LookingForStruct::$codingKey)) {
                $lookForMap [] = LookingForStruct::$codingKey;
            }
            else if($check(LookingForStruct::$menteeKey)) {
                $lookForMap [] = LookingForStruct::$mentorKey;
            }
            else if($check(LookingForStruct::$mentorKey)) {
                $lookForMap [] = LookingForStruct::$menteeKey;
            }
            else if($check($openSourceQ)) { // FULL question
                $lookForMap [] = LookingForStruct::$contribKey;
            }
            else if($check($contribQ)) { // FULL question
                $lookForMap [] = LookingForStruct::$openSourceKey;
            }
        }
        
        return $lookForMap;
    }
}