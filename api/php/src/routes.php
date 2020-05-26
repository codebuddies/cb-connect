<?php
declare(strict_types=1);

use Slim\Http\Request;
use Slim\Http\Response;
use CodeBuddies\AppGlobals;
use CodeBuddies\ModelUsers;

if(AppGlobals::inDebugMode()) {
    echo "\n <br> [ CODE BUDDIES CONNECT IN DEBUG MODE ] <br> \n";
    // ?add-random-looking-for=true
    $_SERVER['REQUEST_URI'] = '/test/get-matched/show-matches';
    $_SERVER['REQUEST_METHOD'] = 'POST';
}

$app->get('/hello/{name}', function(Request $request, Response $response, array $args) {
    $zName = $args['name'];
    $response->getBody()->write("Well, Ello There $zName");
    // $this->logger->addInfo("routes.php julius alvarado logged something");
    
    return $response;
});

$app->get('/test1', function(Request $request, Response $response) {
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
});

$app->get('/user', function(Request $request, Response $response) {
    return $response->getBody()->write("Hello, user!");
});

/**
 * Add random skills to the mock_users table
 */
$app->get('/test/add-random/skills', function(Request $request, Response $response) {
    //TODO: look into maybe creating a singleton for classes that are used often
    $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
    $usersModel = new ModelUsers($dbCodeBuddiesConnect);
    $result = $usersModel->addSkillsToMockUsers();
    
    return $response->withJson($result);
});

/**
 * Add random "Looking For" options to the mock_users table
 */
$app->get('/test/add-random/looking-for', function(Request $request, Response $response) {
    //TODO: look into maybe creating a singleton for classes that are used often
    $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
    $usersModel = new ModelUsers($dbCodeBuddiesConnect);
    
    $result = $usersModel->addLookingForToMockUsers();
    $hadError = $result['x-cb-error'] ?? null;
    if(!is_null($hadError)) {
        $this->logger->error($result['x-cb-error']);
    }
    
    return $response->withJson($result);
});

//TODO: make /test/get-matched routes a group

/**
 * _1st View State.
 * It will ask the user what they're looking for e.g. "I am looking for:" ... then the options
 */
$app->get('/test/get-matched', function(Request $request, Response $response, array $args) {
    $data = ['codeUser' => $this->codeUser, 'args' => $args,];
    return $this->view->render($response, 'get-matched.phtml', $data);
});

/**
 * _2nd View State.
 * After the user answers what they are looking for, this view is rendered.
 * It'll ask "What skills can you help with?" and "What skills do you need help with?"
 */
$app->post('/test/get-matched/about-user', function(Request $request, Response $response, array $args) {
    /**
     * I'm calling this these closures "ops" , to better move "ops" around to different routes
     * -- REMEMBER: Update the "return" statement when moving ops around. --
     * @return array
     */
    $matchedLookForData = function() use ($request, $response): array {
        //TODO: look into maybe creating a singleton for classes that are used often
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
    
        $parsedBody = $request->getParsedBody();
        $debugData = AppGlobals::debugMatchLookingFor()['data'];
        $data = AppGlobals::inDebugMode() ? $debugData : $parsedBody;
        if(false) AppGlobals::createFileOfData($parsedBody); // true to print
        
        // persist state
        $cUser = $_SESSION['codeUser'] ?? 'debug_mode';
        
        // insert data into sql db
        $usersModel->insertLookingFor($data, $cUser);
    
        
    
        $result = $usersModel->matchLookingFor($data); // only variation so far
        $result['codeUser'] = $this->codeUser;
        
        //
        return $result;
    };
    
    //return $response->withJson($result); // return json for future API
    return $this->view->render($response, 'about-user.phtml', $matchedLookForData());
});

/**
 * _3rd View State.
 * After user submits "About User" info, they enter their email and availability
 * - At the moment, it'll do the "Match Skills" op, then render the "contact-info" view.
 */
$app->post('/test/get-matched/contact-info', function(Request $request, Response $response, array $args) {
    /**
     * I'm calling this these closures "ops" , to better move "ops" around to different routes
     * -- REMEMBER: Update the "return" statement when moving ops around. --
     * @return array
     */
    $matchedSkillData = function() use ($request, $response): array {
        // mock data for debugging
        $debugData = AppGlobals::debugMatchSkills()['data'];
        $parsedBody = $request->getParsedbody();
        $data = AppGlobals::inDebugMode() ? $debugData : $parsedBody;
        if(false) AppGlobals::createFileOfData($parsedBody); // true to print
        
        //TODO: look into maybe creating a singleton for classes that are used often
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
        $result = $usersModel->matchSkills($data);
        
        // just get the needed fields
        $matchedUsers = [];
        foreach($result as $i => $matchedUser) {
            $matchedUsers[$i]['first_name'] = $matchedUser['first_name'];
            $matchedUsers[$i]['skill_pct_match'] = $matchedUser['skill_pct_match'];
            $matchedUsers[$i]['user_type'] = $matchedUser['user_type'];
            
            $skillsMatched = $matchedUser['skills_matched'] ?? null;
            $matchedUsers[$i]['skills_matched'] = implode(", ", $skillsMatched);
        }
        unset($result); // free mem from buffer
        return $matchedUsers;
    };
    
    return $this->view->render($response, 'contact-info.phtml', $matchedSkillData());
});

/**
 * _4th UI state. After the user answers what they are looking for, this view is rendered.
 * It'll ask "What skills can you help with?" and "What skills do you need help with?"
 */
$app->post("/test/get-matched/show-matches", function(Request $request, Response $response, array $args) {
    /**
     * I'm calling this these closures "ops" , to better move "ops" around to different routes
     * -- REMEMBER: Update the "return" statement when moving ops around. --
     * @return array
     */
    $matchedSkillData = function() use ($request, $response): array {
        // mock data for debugging
        $debugData = AppGlobals::debugMatchSkills()['data'];
        $parsedBody = $request->getParsedbody();
        $data = AppGlobals::inDebugMode() ? $debugData : $parsedBody;
        
        // set to true to print data
        if(false) AppGlobals::createFileOfData($parsedBody);
        
        //TODO: look into maybe creating a singleton for classes that are used often
        $dbCodeBuddiesConnect = AppGlobals::isLocal() ? $this->dbLocal : $this->dbProduction;
        $usersModel = new ModelUsers($dbCodeBuddiesConnect);
        $result = $usersModel->matchSkills($data);
        
        // just get the needed fields
        $matchedUsers = [];
        foreach($result as $i => $matchedUser) {
            $matchedUsers[$i]['first_name'] = $matchedUser['first_name'];
            $matchedUsers[$i]['skill_pct_match'] = $matchedUser['skill_pct_match'];
            $matchedUsers[$i]['user_type'] = $matchedUser['user_type'];
            
            $skillsMatched = $matchedUser['skills_matched'] ?? null;
            $matchedUsers[$i]['skills_matched'] = implode(", ", $skillsMatched);
        }
        unset($result); // free mem from buffer
        return $matchedUsers;
    };
    
    // render a table rather than a bunch of json
    return $this->view->render($response, 'user-matches.phtml', $matchedSkillData());
});


/***********************************
 * The Routes we'll probably need *
 **********************************
 * -- based on my analysis of the UX from http://cbconnect.herokuapp.com/apply --
 * GET https://codebuddies.co/api/get-matched/looking-for?x=y&w=z
 * GET https://codebuddies.co/api/get-matched/about-user?x=y&w=z
 * GET https://codebuddies.co/api/get-matched/see-matches?x=y&w=z
 */
$app->group('/get-matched', function(\Slim\App $app) {
    
    // we can read and write data using GET & POST verbs, but initially it'll be easier to just use GET
    
    /*
        -- Query String for "what the user is looking for" --
        ?code-acc-partner=false
            &mentor=true
            &mentee=false
            &open-source-proj=true
            &more-details=was%20hoping%20for%20people%20using%20laravel%20or%20phalconphp
    
        -- notes --
        Should use multi-select, not a radio buttons
    */
    $app->get('/looking-for', \CodeBuddies\ActionMatchLookingFor::class);
    
    /*
        -- Query String for "about who the user is" --
        ?name=julius
            &one-line=php%20all%20day
            &strong-skills=php%2Ccomputer%20science%2C%20algorithms%2C%20node.js%2C%20microsoft%20excel
            &weak-skills=combinatorics%2C%20statistics%2C%20binary%20tree%27s%2C%20recursion
    
        -- notes --
        [strong_skills] and [weak_skills] should be an autocomplete for normalized input
    */
    $app->get('/about-user', \CodeBuddies\ActionMatchAboutUser::class);
    
    /*
        -- Query String for "seeing who the user matched with" --
        ?email=phpninja@mail.com
            &time-zone=Pacific_standard
            &days-avail=mon%2C%20thur%2C%20fri
            &time-avail=7pm-8pm
    
        -- notes --
        1. [days_avail] and [time_avail] should initially just be drop down options, a more sophisticated UI may be
        difficult to implement
        2. By this point, we have made 2 requests to the PHP 7.4 API so we can have a little widget in the corner
            showing how many matches they have to entice them click the "See Matches" button ^_^
    */
    $app->get('/see-matches', \CodeBuddies\ActionMatchSeeMatches::class);
});


$app->get('/[{name}]', function(Request $request, Response $response, array $args) {
    //-- Render index view:
    return $this->view->render($response, 'index.phtml', $args);
});


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