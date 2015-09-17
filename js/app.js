"use strict";

var App = angular.module("personList", ["LocalStorageModule"]);

App.directive('ngReallyClick', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				var message = attrs.ngReallyMessage;
				if (message && confirm(message)) {
					scope.$apply(attrs.ngReallyClick);
				}
			});
		}
	}
}]);

App.controller("PersonCtrl", function ($scope, localStorageService) {


	$scope.init = function () {

		if (!localStorageService.get("personList")) {
			$scope.model = [
				{
					name: "Persons", list: []
				}
			];
		} else {
			$scope.model = localStorageService.get("personList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};


	$scope.addPerson = function () {
		$scope.model[$scope.currentShow].list.splice(0, 0, {
			personName: $scope.newPerson,
			isPower: $scope.newPower,
			isRich: $scope.newRich,
			isGenius: $scope.newGenius
		});
		$scope.newPerson = "";
		$scope.newPower = "";
		$scope.newRich = "";
		$scope.newGenius = "";
	};


	$scope.deletePerson = function (item) {
		var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};


	$scope.filterPerson = function (person) {
		if ($scope.show === "All") {
			return true;
		} else if (person.isPower && $scope.show === "Power"){
			return true;
		} else if (person.isRich && $scope.show === "Rich"){
			return true;
		} else if (person.isGenius && $scope.show === "Genius"){
			return true;
		} else {
			return false;
		}
	};


	$scope.powerCounter = function() {
		var count = 0;
		angular.forEach($scope.model[$scope.currentShow].list, function(person) {
			count += person.isPower ? 1 : 0;
		});
		return count;
	};
	$scope.richCounter = function() {
		var count = 0;
		angular.forEach($scope.model[$scope.currentShow].list, function(person) {
			count += person.isRich ? 1 : 0;
		});
		return count;
	};
	$scope.geniusCounter = function() {
		var count = 0;
		angular.forEach($scope.model[$scope.currentShow].list, function(person) {
			count += person.isGenius ? 1 : 0;
		});
		return count;
	};


	$scope.isPower = function() {
		for(var i in $scope.model[$scope.currentShow].list) {
			var person = $scope.model[$scope.currentShow].list[i];
			if(person.isPower) {
				return false;
			}
		}
		return true;
	};
	$scope.isRich = function() {
		for(var i in $scope.model[$scope.currentShow].list) {
			var person = $scope.model[$scope.currentShow].list[i];
			if(person.isRich) {
				return false;
			}
		}
		return true;
	};
	$scope.isGenius = function() {
		for(var i in $scope.model[$scope.currentShow].list) {
			var person = $scope.model[$scope.currentShow].list[i];
			if(person.isGenius) {
				return false;
			}
		}
		return true;
	};


	$scope.isDayEmpty = function(){
		var person = $scope.model[$scope.currentShow].list;
		if (person.length > 0) {
			return false;
		} else {
			return true;
		}
	};


	$scope.sort = {
		active: '',
		descending: undefined
	};

	$scope.changeSorting = function(column) {

		var sort = $scope.sort;

		if (sort.active == column) {
			sort.descending = !sort.descending;
		} else {
			sort.active = column;
			sort.descending = false;
		}
	};

	$scope.getIcon = function(column) {

		var sort = $scope.sort;

		if (sort.active == column) {
			return sort.descending
				? 'glyphicon-chevron-up'
				: 'glyphicon-chevron-down';
		}
		return 'glyphicon-chevron-up';
	};


	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("personList", angular.toJson(newVal));
		}
	},true);

});