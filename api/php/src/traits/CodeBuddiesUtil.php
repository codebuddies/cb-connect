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
    /**
     * All the skills I could think of. This list will certainly grow.
     * This is for view2 of http://cbconnect.herokuapp.com/apply
     *
     * @return array|string[]
     */
    public function setSkills(): array {
        //TODO: get a list of all the popular frameworks from each language
        
        // do a 'contains' type search e.g. if someone types 'web development' it should match 'web dev'
        return [
            'php', 'javascript', 'node', 'sql', 'java', 'c#', 'ruby', 'web development', 'mysql',
            '.net', 'computer science', 'algorithms', 'go', 'python', 'r', 'data', 'math', 'statistics',
            'git', 'css', 'html', 'aws', 'interview practice', 'math', 'js', 'iphone development', 'postresql',
            'android development', 'mobile development', 'game development', 'mobile and web app development', 'elixir', 'rust', 'testing', 'ai', 'machine learning',
            'artificial intelligence', 'angular', 'react', 'testing', 'hack', 'security', 'c++',
            'c', 'big data', 'statistics', 'swift', 'visual basic', 'excel', 'apache', 'cloud', 'data science',
            'data analysis', 'web apps', 'calculus', 'linear algebra', 'amazon web services', 'microsoft azure',
            'backend', 'frontend', 'google cloud', 'javascript', 'probability', 'data science',
            'full stack development', 'linux', 'windows', 'mac',
        ];
    }
    
    /**
     * The current view1 options from http://cbconnect.herokuapp.com/apply
     * I think it it critical for a "multi select" to be used. Something like:
     * https://material.angularjs.org/latest/demo/checkbox
     *
     * @return array
     */
    public function setLookingForStandardizedOptions(): array {
        return [
            // 1
            'account' => 'Accountability partner',
            // 2
            'coding' => 'Coding partner',
            // 3
            'mentor' => 'Mentor (I am looking for a mentor)',
            // 4
            'mentee' => 'Mentee (I would like to mentor or teach)',
            // 5
            'openSource' => 'An Open Source Project to contribute to',
            // 6
            'contributors' => 'Contributors for Open Source Project',
            // 7
            'other' => 'Other (not mentioned above)',
        ];
    }
    
    /**
     * Send an array containing 1 to $max random skills, primarily for giving the
     * mock_users table some data to match against
     *
     * @param int $max
     *
     * @return array
     */
    public function createRandomSkills(int $max): array {
        return $this->randomItemsFromSet($max, $this->setSkills(), []);
    }
    
    /**
     * Send an array containing 1 to $max random skill,primarily for giving the
     * mock_users table some data to match against
     *
     * @param int $max
     *
     * @return array
     */
    public function createRandomLookingFor(int $max): array {
        return $this->randomItemsFromSet($max, $this->setLookingForStandardizedOptions(), []);
    }
    
    /**
     * Helper recursive function to get random items from a set
     *
     * @param int $max
     * @param array $initSet - the initialization set
     * @param array $set - random items get put in this set, should be an empty set
     *
     * @return array - returns $set
     */
    private function randomItemsFromSet(int $max, array $initSet, array $set): array {
        if($max === 0) return array_unique($set);
        
        $set [] = $initSet[rand(0, count($initSet) - 1)];
        
        return $this->randomItemsFromSet(--$max, $initSet, $set);
    }
}