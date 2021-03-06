'use strict';

angular.module('woobeeApp')
  .controller('userHeaderCtrl', function ($scope, Auth, $state, $modal, $cookieStore, $rootScope, $location) {
		
		// change class of body after login
		$scope.$watch(function() { 
		  return $cookieStore.get('loginStatus');
		},
		function(path) {
			$scope.loginBtn = path;
		});

		$scope.userLogin = function(currentState) {
			
			$scope.animationsEnabled = true;
			var modalInstance = $modal.open({
				templateUrl: 'app/frontend/home/loginpopup.html',
				controller: 'LoginpopupCtrl',
				resolve: {
					currentState: function() {
						return currentState;
					}
				}
			});
			modalInstance.result.then(
				function (res) {
					$cookieStore.put('loginStatus', true);
					res.status == "success" ? $scope.loginBtn = true : $scope.loginBtn = false;
				}, function (err) {
					console.log(err);
				}
			);
		};
		
	    $scope.logout = function() {
		  Auth.logout();
		  $scope.loginBtn = false;
		};
		
		// carousil js
		$scope.myInterval = 4000;
		$scope.noWrapSlides = false;
		
		var slides = $scope.slides = [];
		
		var array = ['a','b','c'];
		
		$scope.addSlide = function(i) {
			slides.push({
			  image: '/assets/images/'+ array[i] +'.png',
			  text: ['More','Extra','Lots of'][slides.length % 3] + ' ' +
				['Cats', 'Kittys', 'Felines'][slides.length % 3]
			});
		  };
		  
		  for (var i=0; i<3; i++) {
			$scope.addSlide(i);
		  }
		  
		// change class of body after login
		$scope.$watch(function() { 
		  return $location.path(); 
		},
		function(path) {
			$scope.userHome = path == '/' ? true : false;
		});
		
		$scope.searchMaidHome = function(data){
			$state.go("maids_front",{loc_name:data});
		}
  });
