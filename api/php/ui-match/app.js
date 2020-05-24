/**
 * Created by Julius Alvarado on 5/23/2020.
 */

"use strict";

// , 'material.svgAssetsCache'
angular.module('cbConnectApp', ['ngMaterial', 'ngMessages', 'ngMdIcons']);

angular.module('cbConnectApp').controller('MatchCtrl', ['$scope', MatchClass]);

function MatchClass($scope) {
    $scope.status = 'Wired up.';
    $scope.data = {};

    $scope.data.account = true;
    $scope.data.coding = false;
    $scope.data.mentor = false;
    $scope.data.mentee = false;
    $scope.data.openSource = false;
    $scope.data.contributors = false;
    $scope.data.hackTeamToJoin = false;
    $scope.data.joinMyHackTeam = false;
    $scope.other = false;
}