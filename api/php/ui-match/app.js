/**
 * Created by Julius Alvarado on 5/23/2020.
 */

"use strict";

// , 'material.svgAssetsCache'
angular.module('cbConnectApp', ['ngMaterial', 'ngMessages', 'ngMdIcons']);

angular.module('cbConnectApp').controller('MatchCtrl', ['$scope', MatchClass]);

function MatchClass($scope) {
    $scope.status = 'Wired up to AngularJS 1.6';
    $scope.data = {};

    // looking for view
    $scope.data.account = true;
    $scope.data.coding = false;
    $scope.data.mentor = false;
    $scope.data.mentee = false;
    $scope.data.openSource = false;
    $scope.data.contributors = false;
    $scope.other = false;

    // contact info view
    $scope.showHints = true;
}