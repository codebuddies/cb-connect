<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/26/2020
 * Time: 12:34 PM
 */

namespace CodeBuddies;


class SkillStruct
{
    public $matches = [];
    public $pctMatchThreshold = 0.5;
    public $keyMatchPct = 'skill_pct_match';
    public $keyMatchedSkill = 'skills_matched';
}