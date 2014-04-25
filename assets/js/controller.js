var app = angular.module('nomaspoderalpoderAPP', ['ui.bootstrap','localytics.directives','ngSanitize']);

app.controller('HomeCtrl', function ($scope,$sce) {

	$scope.entidades = entidades;
	$scope.representantes = representantes;
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	
	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	$scope.socialLink = function(rep,network){
		var response = rep[network] ? rep[network] : false;
		if(response && network == 'twitter'){
			response = 'https://twitter.com/intent/tweet?screen_name='+rep[network];
		}
        return response;
	}
	

	$scope.entidadFilter = function () {
		return function(rep){
			return !$scope.selectedEntidad || $scope.selectedEntidad.id == rep.entidad.id;
		};
	}

	socket.get('/twitter/tweets',function(tweets){
		for(var i=0;i<tweets.length;i++){
			tweets[i].timeString = moment(tweets[i].time).lang('es').fromNow();
		}
		$scope.tweets = tweets;
		$scope.$apply();
		socket.on('newTweet',function(tweet){
			tweet.timeString = moment(tweet.time).lang('es').fromNow();
			tweets.unshift(tweet)
			tweets.pop();
			$scope.$apply();
		});
	});

});

angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function($scope, $timeout, $transition, $q) {
}]).directive('carousel', [function() {
    return {

    }
}]);
