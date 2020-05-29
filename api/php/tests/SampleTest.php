<?php
/**
 * Created by PhpStorm.
 * User: julius
 * Date: 2/5/2019
 * Time: 11:45 AM
 */

/*
//-- To invoke a test from the command line:
$ vendor\bin\phpunit --bootstrap .\vendor\autoload.php --verbose tests --colors=always
// OR test a particular file "--verbose tests\SomeClassTest.php" OR "w/ --testdox"
$ vendor\bin\phpunit --bootstrap .\vendor\autoload.php --colors=always --testdox tests
*/

namespace Ninja\Auto;

use Exception;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;
use Slim\Http\Environment;
use Slim\Http\Request;
use Slim\Http\Response;

class CommissionAutoTest extends TestCase
{
    private $dummyData = [['company_name', 'total'], ['Spicers LLC', '3800']];
    private $container;
    
    /**
     * @throws \ReflectionException
     */
    public function testConnectionToCommissionAutomationWorks() {
        //---- Configure & Setup Test ----\\
        $stub = $this->createMock(ContainerInterface::class);
        $mockData = [['company_name', 'total'], ['Spicers LLC', '3800']];
        $mockResponse = json_encode([$mockData[0][0], $mockData[1][0]]);
        $action = new ComAutoAction($stub);
        $environment = Environment::mock(['REQUEST_METHOD' => 'GET', 'REQUEST_URI' => '', 'QUERY_STRING' => 'foo=bar',]);
        $request = Request::createFromEnvironment($environment);
        $response = new Response();
        $response = $action($request, $response, ['action' => 'test-simple']);
        
        
        //---- Begin Testing ----\\
        $this->assertSame(
            $mockResponse, (string)$response->getBody(),
            'mockJsonData should be the same as Commission auto data ~CommissionAutoTest.php line 30 ish'
        );
    }
    
    /**
     * @covers \Ninja\Auto\ComAutoModel::calcAdditionalInsert
     *
     * @throws \ReflectionException
     */
    public function testAdditionalInsertsAreCalculatedCorrectly() {
        //---- Configure & Setup Test ----\\
        $stub = $this->createMock(ContainerInterface::class);
        $action = new ComAutoAction($stub);
        $environment = Environment::mock(['REQUEST_METHOD' => 'GET', 'REQUEST_URI' => '', 'QUERY_STRING' => '',]);
        $request = Request::createFromEnvironment($environment);
        $response = new Response();
        $response = $action($request, $response, ['action' => 'test-additional-insert']);
        $response = trim((string)$response->getBody());
        $response = json_decode($response); // becomes a stdClass
        
        
        //---- Begin Testing ----\\
        $this->assertSame(
            0.07, $response->cpc_mock,
            "The calcAdditionalInsert cpc response should be 0.07"
        );
    
        //TODO: Make more assertions that focus on edge cases
        
    } // END OF: testAdditionalInsertsAreCalculatedCorrectly()
    
    /**
     * @covers \Ninja\Auto\ComAutoModel::calcPressureSeal
     *
     * @throws \ReflectionException
     */
    public function testPressureSealCostGetsAddedCorrectly() {
        //---- Configure & Setup Test ----\\
        $stub = $this->createMock(ContainerInterface::class);
        $action = new ComAutoAction($stub);
        $environment = Environment::mock(['REQUEST_METHOD' => 'GET', 'REQUEST_URI' => '', 'QUERY_STRING' => '',]);
        $request = Request::createFromEnvironment($environment);
        $response = new Response();
        $response = $action($request, $response, ['action' => 'test-pressure-seal']);
        $response = trim((string)$response->getBody());
        $response = json_decode($response); // make $response a stdClass
        $psWindowResults = $response->ps_window_results;
        $psWindowResultsCount = count($psWindowResults);
        $psNonwindowResults = $response->ps_nonwindow_results;
        $psNonwindowResultsCount = count($psNonwindowResults);
        
        
        //---- Begin Testing ----\\
        $mockBaseCost = 0.05;
        $mockBaseCostUnder20k = 0.06;
        $pressureSealFormCost = 0.01;
        $ps_non_window_cost = 0.06;
        $ps_window_cost = $mockBaseCost;
        $testSummary = "\n -- raw [non windowed = $psWindowResultsCount & windowed = $psWindowResultsCount]\n";
        
        /** 1st Assertions:
         * if mock input is a "windowed pressure seal" cost should be 0.05
         *
         * App Logic:
         * Test fields that contain "window" don't get any cost added:
         *
         * Loop Setup:
         * don't skip header row, header row gets skipped in action class
         */
        for($iw = 0; $iw < $psWindowResultsCount; $iw++) {
            $testResult = (array)$psWindowResults[$iw];
            $this->assertSame(
                $ps_window_cost, $testResult['calc'],
                "\n The action class TTcalcPressureSeal() tests multiple raw inputs (basically a data provider that is read into memory from a csv)" .
                "\n This test was ensuring fields that did not contain 'window' did NOT get 0.02 added to cost" .
                "\n The raw input that field that was tested was < {$testResult['raw_input']} >\n"
            );
            
            $computedWith = "\n $iw - computed {$testResult['calc']} cost for type: ps_window_cost";
            $mockInput = "Raw input = {$testResult['raw_input']} for comAuto->calcPressureSeal()\n\n";
            $testSummary .= ($computedWith . $mockInput . "\n");
        }
        
        /** 2nd Assert:
         * if mock input is a "non-windowed pressure seal" snap pack, cost should be 0.06
         *
         * App Logic:
         * Fields that do NOT contain "window" get cost cost added
         *
         * Loop Setup:
         * don't skip header row, loop over raw fields that are non windowed pressure sealed
         */
        for($in = 0; $in < $psNonwindowResultsCount; $in++) {
            $testResult = (array)$psNonwindowResults[$in];
            $this->assertSame(
                $ps_non_window_cost, $testResult['calc'],
                "\n The action class TTcalcPressureSeal() tests multiple raw inputs (basically a data" .
                "\n provider that is read into memory from a csv) This test was ensuring fields that contained 'window' " .
                "\n got 0.01 added to cost The raw input that field that was tested was < {$testResult['raw_input']} >\n\n"
            );
            
            $computedWith = "\n $in - computed {$testResult['calc']} cost for type: ps_non_window_cost";
            $mockInput = "Raw input = {$testResult['raw_input']} for comAuto->calcPressureSeal()\n\n";
            $testSummary .= ($computedWith . $mockInput. "\n");
        }
    
        //TODO: Make more assertions that purely focus on edge cases
        
        if(AppGlobals::$NINJA_AUTO_DEBUG) echo $testSummary;
        
    } // END OF: testPressureSealCostGetsAddedCorrectly()
    
    /**
     * @covers \Ninja\Auto\ComAutoModel::calcExpenseEnvelope
     *
     * @throws \ReflectionException
     */
    public function testExpensiveEnvelopeCostGetsAddedCorrectly() {
        //---- Configure and Setup Test ----\\
        $mock = $this->createMock(ContainerInterface::class);
        $action = new ComAutoAction($mock);
        $env = Environment::mock(['REQUEST_METHOD' => 'GET', 'REQUEST_URI' => '', 'QUERY_STRING' => '',]);
        $request = Request::createFromEnvironment($env);
        $response = new Response();
        $expensiveEnvelopeResult = $action($request, $response, ['action' => 'test-expensive-envelope']);
        $expensiveEnvelopeResultString = trim((string)$expensiveEnvelopeResult->getBody());
        $expensiveEnvelopeResultClass = json_decode($expensiveEnvelopeResultString);
        $expensiveEnvelopeAr = $expensiveEnvelopeResultClass->expensive_envelope_results;
        $expensiveEnvelopeArCount = count($expensiveEnvelopeAr);
        
        
        //---- Begin Testing ----\\
        $baseCost = 0.06;
        $baseCost_Under20k = 0.065;
        $expensive_envelope = 0.065;
        $nonexpensive_envelope = $baseCost;
        $testSummary = "\n\n -- raw [expensive = $expensiveEnvelopeArCount & nonexpensive = \\n";
        
        /** 1st Assertions:
         * if field does NOT contain "white" it is computed as expensive
         * if field does NOT contain "#10" it is computed as expensive
         * The data provider passed to these assertions are supposed to be expensive envelopes
         *
         * App Logic:
         * At the moment comauto only checks the [envelopepaper] field from the CSV
         *
         * Loop Setup:
         * don't skip header row, loop over raw "expensive envelopes" data set
         */
        for($e = 0; $e < $expensiveEnvelopeArCount; $e++) {
            $testResult = (array)$expensiveEnvelopeAr[$e];
            $calc = $testResult['calc'];
            $rawInput = $testResult['raw_input'];
            $this->assertSame(
                $expensive_envelope, $calc,
                "\nThe action class TTcalcExpenseEnvelope() will invoke calcExpenseEnvelope() and iterate " .
                "over raw job board fields exported from SQL Server. Jobs are considered to be expensive if the " .
                "[envelopepaper] field does not contain 'white' or '#10', raw input = $rawInput\n\n"
            );
            
            $computedWith = "\n $e - computed $calc cost for type: expensive_envelope_cost";
            $mockInput = " | The raw input was with $rawInput \n\n";
            $testSummary .= ($computedWith . $mockInput . "\n");
        }
        
        if(AppGlobals::$NINJA_AUTO_DEBUG) echo $testSummary;
        
    } // END OF: testExpensiveEnvelopeCostGetsAddedCorrectly()
    
    /**
     * @covers \Ninja\Auto\ComAutoModel::calcDigitalColor
     */
    public function testDigitalColorIsBeingCalculatedCorrectly() {
        //---- Configure & Setup Test ----\\
        $stub = $this->createMock(ContainerInterface::class);
        $action = new ComAutoAction($stub);
        $environment = Environment::mock(['REQUEST_METHOD' => 'GET', 'REQUEST_URI' => '', 'QUERY_STRING' => '',]);
        $request = Request::createFromEnvironment($environment);
        $response = new Response();
        $mockRes = $action($request, $response, ['action' => 'test-digital-color']);
        $mockRes = trim((string)$mockRes->getBody());
        $mockRes = json_decode($mockRes);
        
        
        //---- Begin Testing ----\\
        $baseCost = 0.06; //
        $baseCostLess20k = 0.065;
        $c4over4 = $baseCost + 0.06;
        $c1over1 = $baseCost + 0.01;
        // Mirroring ComAutoAction.php mi = mock input, c = cost
        $c = 'color';
        $bw = 'black-white';
        $testSet = [
            // 1st edge case 1/1 = spaces, chars
            '1stEdgeCase_1over1' => [
                'miColor' => '1/1', 'cost' => $c1over1, 'baseCost' => $baseCost,
                'colorAndSides' => ['front_color' => $bw, 'back_color' => $bw],
            ],
            // basic 1/1 input
            'basic_1over1' => [
                'miColor' => '1over1', 'cost' => $c1over1, 'baseCost' => $baseCost,
                'colorAndSides' => ['front_color' => $bw, 'back_color' => $bw],
            ],
            // 1st edge case 4/4 = spaces, chars
            '1stEdgeCase_4over4' => [
                'miColor' => '4over4', 'cost' => $c4over4, 'baseCost' => $baseCost,
                'colorAndSides' => ['front_color' => $c, 'back_color' => $c],
            ],
            // basic 4/4 input
            'basic_4over4' => [
                'miColor' => '4/4', 'cost' => $c4over4, 'baseCost' => $baseCost,
                'colorAndSides' => ['front_color' => $c, 'back_color' => $c],
            ],
        ];
        
        //TODO: try to loop over the test set
        $this->assertSame(
            $testSet['basic_4over4']['cost'], round($mockRes->basic_4over4, 2),
            "given input: {$testSet['basic_4over4']['miColor']}, 4/4 color cost + {$baseCost} should result in a cost of = $c4over4"
        );
        
        $this->assertSame(
            $testSet['basic_1over1']['cost'], round($mockRes->basic_1over1, 2),
            "given input: {$testSet['basic_1over1']['miColor']}, 1/1 color cost + {$baseCost} should result in a cost of = $c1over1"
        );
        
    } // END OF: testDigitalColorIsBeingCalculatedCorrectly()
    
} // END OF: class CommissionAutoTest {}