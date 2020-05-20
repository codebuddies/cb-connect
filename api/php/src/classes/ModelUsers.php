<?php
declare(strict_types=1);
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/18/2020
 * Time: 12:58 PM
 */

namespace CodeBuddies;

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
    
    public function addSkillsToMockUsers(): array {
        try {
            // get id's
            $query = /** @lang **/
                "select q_id from $this->tableMockUsers";
            $statement = $this->db->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
    
            $queryFormat = /** @lang **/
                "update %s set skills = '%s' where q_id = %d;";
            foreach($result as $i => $q_id) {
                $randomSkills = $this->createRandomSkills(rand(2, 10));
                $randomSkillsImplode = implode(", ", $randomSkills);
                $q_id = (int)$q_id['q_id'];
                $debug = 1;
                $query = sprintf($queryFormat,  $this->tableMockUsers, $randomSkillsImplode, $q_id);
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
}