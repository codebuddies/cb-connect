<?php
 /**
 * This front controller is called by the App Engine web server to handle all
 * incoming requests. To change this, you will need to modify the "entrypoint"
 * directive in `app.yaml`.
 * @see https://cloud.google.com/appengine/docs/standard/php/config/appref
 */
require 'vendor/autoload.php';

use Slim\App;

session_start();

//$oneDay = 86400;
$codeUser =  $_SERVER['REMOTE_ADDR'] ?? 'none';

if(!isset($_SESSION['c_user_ip'])) {
    $_SESSION['c_user_id'] = 'none';
    $_SESSION['c_user_ip'] = $codeUser;
}

# [START gae_slim_front_controller]
$settings = require 'settings.php';
$app = new App($settings($codeUser));

// dependencies
require 'src/dependencies.php';

// general routes
require 'src/routes.php';




$app->run();


# [END gae_slim_front_controller]
