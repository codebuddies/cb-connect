<?php
/**
 * Created by PhpStorm.
 * User: julius
 * Date: 11/1/2018
 * Time: 7:29 PM
 */

namespace Ninja\Auto\Interfaces;

interface ICsvParseModel
{
    /**
     * "This is an EXACT copy of csv2array(), but I'm keeping it just
     * in case older scripts are referencing it"
     *
     * Get the CSV file, transform it to an array, then return it.
     * should be a full path e.g. "C:\foo\bar\file.csv"
     * this would be used if there was a local array
     *
     * @param string $path
     *
     * @return array
     */
    public static function getCsvArray(string $path): array;
    
    /**
     * Get the CSV file, transform it to an array, then return it.
     *
     * 1 - Should be a full path to a folder e.g. "C:\foo\bar\csv_folder"
     *      NOT a full path to a file
     *
     * @param string $path - path to a folder NOT a file
     *
     * @return array
     */
    public static function csv2array(string $path): array;
    
    /**
     * Convert an array to CSV, put it in some location
     *
     * 1 - $exportPath must be path to a folder, not a file.
     *
     * @param array $dataSet        - the array to convert to CSV
     * @param string $exportPath    - where to place the CSV file, do NOT include a directory
     *                                separator e.g. '\' or '/'  at the end of path
     * @param string $name2giveFile - just an informative description to add to the CSV file name
     *
     * @return string               - the name of the file
     */
    public static function export2csv(array $dataSet, string $exportPath, string $name2giveFile): string;
    
    /**
     * The prior export2csv assumed 1 csv file would exist in the folder
     * this function does not, which is why $csvName must be given
     *
     * @param string $path      -
     * @param string $csvName
     *
     * @return array
     */
    public static function specificCsv2array(string $path, string $csvName): array;
    
    /**
     * Basically this function won't prepend "rs_" it will literally just export
     * the array to "some/folder/path/NAME.csv", so the name will at the end of
     * path becomes name of file, .csv must also be included
     *
     * @param string $path
     * @param array $arr2export
     *
     * @return string
     */
    public static function export2csvNoRename(string $path, array $arr2export): string;
}