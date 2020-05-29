<?php

use CodeBuddies\AppGlobals;

$container = $app->getContainer();

// view renderer
$container['view'] = function($c) {
    return new \Slim\Views\PhpRenderer('templates/');
};

// monolog
$container['logger'] = function($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path']));
    return $logger;
};

// code buddies user
$container['codeUser'] = function($c) {
    return $c['settings']['codeUser'];
};

if(!AppGlobals::isLocal()) {
    // The CloudSQL Code Buddies Connect db
    $container['dbProduction'] = function($c) {
        $dbSettings = $c['settings']['dbProduction'];
        $dbName = $dbSettings['db'];
        $host = $dbSettings['host'];
        $user = $dbSettings['user'];
        $pass = $dbSettings['pass'];
        
        $dsn = sprintf('mysql:dbname=%s;unix_socket=/cloudsql/%s', $dbName, $host);
        $dsnHost = sprintf('mysql:dbname=%s;host=%s', $dbName, $host);
        
        return new PDO($dsn, $user, $pass, [
            //PDO::ATTR_TIMEOUT => 5,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    };
}
else {
    // local db
    $container['dbLocal'] = function($c) {
        $dbSettings = $c['settings']['dbLocal'];
        $dbName = $dbSettings['db'];
        $host = $dbSettings['host'];
        $user = $dbSettings['user'];
        $pass = $dbSettings['pass'];
        
        $dsnUnixSocket = sprintf('mysql:dbname=%s;unix_socket=/cloudsql/%s', $dbName, $host);
        $dsn = sprintf('mysql:dbname=%s;host=%s', $dbName, $host);
        
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    };
}



