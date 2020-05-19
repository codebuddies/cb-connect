<?php
/**
 * Created by PhpStorm.
 * User: julius
 * Date: 2/4/2019
 * Time: 12:20 PM
 */

namespace Ninja\Auto\Interfaces;

interface ICommissionAutoModel
{
    /**
     * This function will group fields by company, use the company name
     * as the hash, then sort the hash by alphabetical order. This function
     * also uses our initial equations for calculations.
     *
     * @return array
     */
    public function reconstructAndCompute(): array;
    
    /**
     * This is the "int main()" function
     * Create the array that will get exported to CSV and do the commissions
     * calculations with in this array
     *
     * @param array $tempAssoc - a temporary associative array
     *
     * @return array
     */
    public function computeCommissions(): array;
}