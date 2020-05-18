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
    
    /*$app->get('/info', function(Request $request, Response $response) {
        //$log = $this->get('cb-log');
        return $response->getBody()->write(phpinfo());
    });*/
    
    $app->group('/users', function(Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
    
    /***********************************
     * The Routes we'll probably need *
     **********************************
        -- based on my analysis of the UX from http://cbconnect.herokuapp.com/apply
        GET https://codebuddies.co/api/apply/looking-for?x=y&w=z
        GET https://codebuddies.co/api/apply/about-user?x=y&w=z
        GET https://codebuddies.co/api/apply/see-matches?x=y&w=z
     */
    
    $app->group('/apply', function(Group $group) {
        
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
        $group->get('/looking-for', ListUsersAction::class);
        
        /*
            -- Query String for "about who the user is" --
            ?name=julius
                &one-line=php%20all%20day
                &strong-skills=php%2Ccomputer%20science%2C%20algorithms%2C%20node.js%2C%20microsoft%20excel
                &weak-skills=combinatorics%2C%20statistics%2C%20binary%20tree%27s%2C%20recursion
        
            -- notes --
            [strong_skills] and [weak_skills] should be an autocomplete for normalized input
        */
        $group->get('/about-user', ViewUserAction::class);
        
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
        $group->get('/see-matches', ViewUserAction::class);
    });
    
};
