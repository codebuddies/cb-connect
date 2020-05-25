<?php
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/24/2020
 * Time: 6:21 PM
 */
$appName = 'Code Buddies Connect';
?>

<!-- Footer -->
<footer layout="row" layout-padding layout-margin layout-align="center start">
    <div flex="25">
        <p>Get matched with a mentor, mentee, collaborator, or pair programming partner.</p>
    </div>
    <div flex="50">
        <h1 class="cb-text-center cb-mtop-0"> <?= $appName ?></h1>
        <h2 class="cb-text-center"> &copy; 2020</h2>
    </div>
    <div flex="25">
        <a href="https://codebuddies.org/">
            <md-button class="cb-btn">Codebuddies.org</md-button>
        </a>
        <a href="mailto:j.alvarado@engineer.com">
            <md-button class="cb-btn">j.alvarado@engineer.com</md-button>
        </a>
        <a href="https://github.com/ideaguy3d/cb-connect">
            <md-button class="cb-btn">GitHub repo</md-button>
        </a>
    </div>
</footer>
