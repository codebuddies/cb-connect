/**
 * Created by Julius Alvarado on 5/23/2020.
 */
"use strict";

angular.module('cbConnectApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('MatchCtrl', ['$scope', MatchClass]);

function MatchClass($scope) {
    $scope.status = 'Wired up >:)';
    $scope.data = {};
    $scope.data.cb1 = true;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;
}