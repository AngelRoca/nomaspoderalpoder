var app = angular.module('nomaspoderalpoderAPP', ['ui.bootstrap','localytics.directives']);

app.controller('HomeCtrl', function ($scope,$sce) {

	$scope.entidades = [];
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	socket.get('/entidad/',{sort:'nombre'},function (entidades){
		$scope.entidades = entidades;
		$scope.$apply();
	});	
	
	$scope.representantes = [];
	socket.get('/representante/',{sort:'nombre',limit:1000},function (representantes){
		$scope.representantes = representantes;
		$scope.$apply();
	});	
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
	//Seleciona DF
	$scope.selectedEntidades = {'Distrito Federal':true};

	$scope.filterReps = function () {
		return function (rep){
			if($scope.repTextFilter){
				var index = rep.nombre.toLowerCase().indexOf($scope.repTextFilter.toLowerCase());
				return index != -1;
			}else{;
				if(rep.entidad){
					return $scope.selectedEntidades[rep.entidad.nombre] === true;
				}else return false;
			}	
			//return true;
		}
	}

	$(document).on('click','.entidades label',function(e){
		$(this).children().prop('checked',true);
		$scope.$apply();
	});
	/*socket.on('mia', function (msg){
		$scope.mia = msg.data ;
		$scope.$apply();
	});*/
});

angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function($scope, $timeout, $transition, $q) {
}]).directive('carousel', [function() {
    return {

    }
}]);