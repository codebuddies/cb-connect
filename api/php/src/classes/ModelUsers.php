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
    /**
     * The main Code Buddies Connect db, if more db's are needed, they'll have
     * specialized names
     */
    private $db;
    
    public function __construct($dbCodeBuddiesConnect) {
        $this->db = $dbCodeBuddiesConnect;
    }
    
    public function getMockUsers(): array {
        $tableName = 'mock_users';
        try {
            $query = /** @lang */ "
                select * from $tableName
            ";
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
}