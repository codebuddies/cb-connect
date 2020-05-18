<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function(App $app) {
    $app->options('/{routes:.*}', function(Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });
    
    // _DEBUGGING 🐛🔬🐜🤨
    if(false) {
        echo "_> DEBUG MODE ON";
        // we are in debug mode
        $_SERVER['REQUEST_URI'] = 'api/info';
        $_SERVER['REQUEST_METHOD'] = 'GET';
    }
    
    $app->get('/', function(Request $request, Response $response) {
        $response->getBody()->write('Hello world! ^_^/');
        return $response;
    });
    
    $app->get('/j-test1',
        function(Request $request, Response $response) {
            $dbCodeBuddiesConnect = $this->get('cb_connect_db');
            $debug = 1;
        }
    );
    
    $app->get('/info', function(Request $request, Response $response) {
        //$log = $this->get('cb-log');
        
        return $response->getBody()->write(phpinfo());
    });
    
    $app->group('/users', function(Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};
