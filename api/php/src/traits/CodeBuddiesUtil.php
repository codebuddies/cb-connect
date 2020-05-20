<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/20/2020
 * Time: 1:01 AM
 */

namespace CodeBuddies;

trait CodeBuddiesUtil
{
    public function Skills(): array {
        //TODO: get a list of all the popular frameworks from each language
        
        // do a 'contains' type search e.g. if someone types 'web development' it should match 'web dev'
        return [
            'php', 'javascript', 'node', 'sql', 'java', 'c#', 'ruby', 'web dev',
            '.net', 'computer science', 'algorithms', 'go', 'python', 'r', 'data', 'math',
            'git', 'css', 'html', 'aws', 'interview practice', 'math', 'js', 'iphone',
            'android', 'mobile', 'game', 'app', 'elixir', 'rust', 'testing', 'ai', 'machine learning',
            'artificial intelligence', 'angular', 'react', 'testing', 'hack', 'security', 'c++',
            'c', 'big data', 'statistics', 'swift', 'visual basic', 'excel', 'apache', 'cloud',
        ];
    }
    
    /**
     * Send an array containing 1 to max random skills
     *
     * @param int $max
     *
     * @return array
     */
    public function createRandomSkills(int $max): array {
        return $this->randomSkills($max, []);
    }
    
    /**
     * Helper recursive function to create random skills
     *
     * @param int $max
     * @param array $skills
     *
     * @return array
     */
    private function randomSkills(int $max, array $skills): array {
        if($max === 0) return array_unique($skills);
        
        $skillSet = $this->Skills();
        $skills [] = $skillSet[rand(0, count($skillSet) - 1)];
        
        return $this->randomSkills(--$max, $skills);
    }
}