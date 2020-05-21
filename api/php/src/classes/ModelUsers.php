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
            
            return ['x-cb-status' => '_> CB_CONNECT: added skills to mock users table'];
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
     * The most important and difficult to implement match
     *
     * @param array $data
     *
     * @return array|string[]
     */
    public function matchSkills(array $data): array {
        $data = $this->sanitizeData($data);
        return ['x-cb-status' => '_> it worked ^_^'];
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
        
        // utility sanitize lambda
        $sanLambda = function($i): string {
            return Regex::replace('/[^\w,]/', '', $i)->result();
        };
        
        foreach($data as $k => $datum) {
            $sanitizedData[$sanLambda($k)] = $sanLambda($datum);
        }
        
        $debug = 1;
        return $sanitizedData;
    }
}