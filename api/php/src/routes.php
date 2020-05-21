<?php
declare(strict_types=1);

use Slim\Http\Request;
use Slim\Http\Response;
use CodeBuddies\AppGlobals;
use CodeBuddies\ModelUsers;

if(AppGlobals::inDebugMode()) {
    echo "\n <br> [ CODE BUDDIES CONNECT IN DEBUG MODE ] <br> \n";
    $_SERVER['REQUEST_URI'] = '/test/get-matched';
    $_SERVER['REQUEST_METHOD'] = 'POST';
}

$app->get('/hello/{name}',
    function(Request $request, Response $response, array $args) {
        $zName = $args['name'];
        $response->getBody()->write("Well, Ello There $zName");
        // $this->logger->addInfo("routes.php julius alvarado logged something");
        
        return $response;
    }
);

$app->get('/test1',
    function(Request $request, Response $response) {
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
        $mockUsers = $usersModel->getMockUsers();
        
        // construct a table real quick
        $table = "<table><tr><th>first_name</th><th>last_name</th><th>user_type</th><th>gender</th></tr>";
        foreach($mockUsers as $user) {
            [$first, $last, $userType, $gender] = $user;
            $table .= "<tr><td>f, $first</td><td>l, $last</td><td>u, $userType</td><td>g, $gender</td></tr>";
        }
        $table .= "</table>";
        $debug = 1;
        
        $response->getBody()->write($table);
        return $response;
    }
);


$app->get('/user',
    function(Request $request, Response $response) {
        return $response->getBody()->write("Hello, user!");
    }
);

$app->get('/test/add-skills',
    function(Request $request, Response $response) {
        //TODO: look into maybe creating a singleton for classes that are used often
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
        $result = $usersModel->addSkillsToMockUsers();
        
        return $response->withJson($result);
    }
);

$app->get('/test/get-matched',
    function(Request $request, Response $response, array $args) {
        return $this->renderer->render($response, 'get-matched.phtml', $args);
    }
);

$app->post('/test/get-matched',
    function(Request $request, Response $response) {
        //$getParsedBody = var_export($data, true);
        //file_put_contents('logs/parsed-body.txt', $getParsedBody);
        //-- example parsed body for debugging --
        $mockData = [
            // mock a basic sql injection
            'user-name' => "'SELECT * FROM users_db --",
            // will result to = "SELECTFROMusers_dbjulius" after sanitation
            'user-skills' => 'math, css, javascript, php',
            'user-about' => '',
            'app-name' => 'Code Buddies Connect',
        ];
        
        // The DATA ^_^
        $data = AppGlobals::inDebugMode() ? $mockData : $request->getParsedBody();
        
        //TODO: look into maybe creating a singleton for classes that are used often
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
        $result = $usersModel->matchSkills($data);
        
        return $response->withJson($result);
    }
);


$app->get('/[{name}]',
    function(Request $request, Response $response, array $args) {
        //-- Render index view:
        return $this->renderer->render($response, 'index.phtml', $args);
    }
);


//--------------------------------------------------------------
// These routes have to be last routes for CORS and other stuff
// "this code has to be commented out while debugging"
//---------------------------------------------------------------
$app->options('/{routes:.+}', function($request, $response, $args) {
    return $response;
});

$app->add(function($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        // https://maps.mhetadata.com, http://192.168.7.17, http://localhost:4000
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler;
    return $handler($req, $res);
});







//