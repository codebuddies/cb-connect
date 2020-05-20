<?php
/**
 * Created by PhpStorm.
 * User: Mike
 * Date: 7/27/2018
 * Time: 4:32 PM
 */

namespace CodeBuddies;

interface ISuppressionList
{
    /**
     * This function will make use 'array_filter()' as the primary
     * means for the "Suppression List Algorithm
     *
     * @return mixed
     */
    public function FilterSuppress();
    
    /**
     * This function will try to make use of 'generators' as the primary
     * means for the "Suppression List Algorithm"
     *
     * @return mixed
     */
    public function GeneratorSuppress();
    
    /**
     * This function will try to make use of 'intersect, union, difference'
     * as the primary means for the "Suppression List Algorithm
     *
     * @return mixed
     */
    public function SetOperatorSuppress();
}