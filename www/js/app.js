var app = angular.module('recipy', ['ngRoute', 'mobile-angular-ui', 'ngInput', 'xeditable']);

app.config(function($routeProvider) {
	$routeProvider.when('/',  
		{templateUrl: 'views/guardados.html', reloadOnSearch: false});
	$routeProvider.when('/ingresar',   
		{templateUrl: 'views/ingresar.html', reloadOnSearch: false, controller 	: 'main'});
	$routeProvider.when('/favs',  
		{templateUrl: 'views/favs.html', reloadOnSearch: false});
	$routeProvider.when('/login',  
		{templateUrl: 'views/login.html', reloadOnSearch: false});
	$routeProvider.otherwise({
			redirectTo: '/'	});
});

app.run(function(editableOptions, editableThemes) {
  editableOptions.theme = 'default';
  editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-success" ><span class="fa fa-check"></span></button>';
  editableThemes['default'].cancelTpl= '<button type="button" class="btn btn-primary" ng-click="$form.$cancel()"><span class="fa fa-times"></span></button>';
});

app.controller("main", function ($scope, $rootScope, $location) {
	$rootScope.salir = function () {
	    navigator.notification.confirm("Está seguro que desea salir?", onConfirm, "", "Si,No");
	
		function onConfirm(button) {
			if(button==2){
				return;
			}else{
				navigator.app.exitApp();
			}
		}
    }
});
app.controller("guardar", function($scope, $http, $location, $rootScope){
	
	$scope.guardar = function(dato){
		$scope.comida = {
			nombre : dato.nombre,
			instrucciones : $scope.ins,
			ingredientes : $scope.ing
		}
		
		if (!localStorage.comidas){
			$scope.array_pendientes=[];
		}else{
			$scope.array_pendientes = JSON.parse(localStorage.comidas)
		}
			
		$scope.array_pendientes.push($scope.comida)

		if(localStorage.comidas){
			$scope.dameLocal= JSON.parse(localStorage.getItem("comidas")).concat($scope.comida)
		}else{
			$scope.dameLocal= $scope.array_pendientes;
		}
		
			
		$http({
			method: 'POST',
			url: "http://schedular.atwebpages.com/php/guardar.php",
			//url: "server/php/guardar.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.dameLocal 
				}).then(
					function successCallback(response) {
						localStorage.removeItem("comidas");
							$location.path("/guardados");
						
					}, function errorCallback(response) {
						$scope.problema="No se pudo enviar..."
						
						localStorage.setItem("comidas", JSON.stringify($scope.array_pendientes)) 
							$scope.comidas = JSON.parse(localStorage.comidas)
							$location.path("/guardados");
						console.log("error");
					});	
	}
	$http.get("http://schedular.atwebpages.com/php/cargar.php")
	//$http.get("server/php/info.php") 
		.then(function exito(respuesta) {
			$scope.mostrar = respuesta.data;
			$scope.exito = "Recetas";
			localStorage.setItem("server", JSON.stringify($scope.mostrar))
			$scope.dame = JSON.parse(localStorage.getItem("server"))
			$scope.dato = $scope.dame;
			if(localStorage.comidas){
				$scope.dame = $scope.dame.concat(JSON.parse(localStorage.comidas));
				$scope.dato = $scope.dame;
			}
		},function error(respuesta) {
			if(!localStorage.comidas){
				$scope.comidas = JSON.parse(localStorage.getItem("server"));
				$scope.dato = $scope.comidas;
			}else{
				$scope.comidas = JSON.parse(localStorage.server).concat(JSON.parse(localStorage.comidas));
				$scope.dato = $scope.comidas;
			}
				$scope.sinconexion = "Datos Locales(sin conexion)";
			}
		);
	$scope.ing = [{ingrediente:''}];
	$scope.addIng = function(){
		$scope.ing.push({ingrediente:''});
	}
	$scope.delIng = function(i){
		$scope.ing.splice(i,1);
	}
	$scope.ins = [{instruccion:''}];
	$scope.addIns = function(){
		$scope.ins.push({instruccion:''});
	}
	$scope.delIns = function(i){
		$scope.ins.splice(i,1);
	}
	
	$scope.guardarFav = function(x){
		$scope.elegidos = x;

		if (!localStorage.favoritos){
			$scope.array_favoritos=[];
		}else{
			$scope.array_favoritos = JSON.parse(localStorage.favoritos)
		}
			
		$scope.array_favoritos.push($scope.elegidos)

		if(localStorage.favoritos){
			$scope.dameLocalFav= JSON.parse(localStorage.getItem("favoritos")).concat($scope.elegidos)
		}else{
			$scope.dameLocalFav= $scope.array_favoritos;
		}
		
		$http({
			method: 'POST',
			url: "http://schedular.atwebpages.com/php/guardarfav.php",
			//url: "server/php/guardar.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.dameLocalFav 
				}).then(
					function successCallback(response) {
						localStorage.removeItem("favoritos");
						$location.path("/favs");
						
					}, function errorCallback(response) {
						$scope.problema="No se pudo enviar..."
						
						localStorage.setItem("favoritos", JSON.stringify($scope.array_favoritos)) 
						$scope.elegidos = JSON.parse(localStorage.favoritos)
						$location.path("/favs");
						console.log("error");
					});
	}
	
	$scope.borrar=function(pos){
		$scope.dato.splice(pos, 1)
		$http({
			method: 'POST',
			url: "http://schedular.atwebpages.com/php/borrar.php",
			//url: "server/php/guardar.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.dato 
				}).then(
					function successCallback(response) {
						localStorage.removeItem("comidas");
						$location.path("/guardados");
						
					}, function errorCallback(response) {
						$scope.problema="No se pudo enviar..."
						
						localStorage.setItem("comidas", JSON.stringify($scope.dato)) 
						$location.path("/guardados");
						console.log("error");
					});
	}
	
	$scope.Update=function(x, pos, propiedad){
		$scope.dato[pos][propiedad] = x;

		$http({
			method: 'POST',
			url: "http://schedular.atwebpages.com/php/editar.php",
			//url: "server/php/guardar.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.dato 
				});
	}
});

app.controller("cargarFavs", function ($scope, $http, $location){
	$http.get("http://schedular.atwebpages.com/php/cargarfav.php")
	//$http.get("server/php/info.php") 
		.then(function exito(respuesta) {
			$scope.mostrar = respuesta.data;
			$scope.exito = "Favoritos";
			localStorage.setItem("server", JSON.stringify($scope.mostrar));
			$scope.dame = JSON.parse(localStorage.getItem("server"));
			$scope.dato = JSON.parse(localStorage.getItem("server"));
			if(localStorage.favoritos){
				$scope.dame = $scope.dame.concat(JSON.parse(localStorage.favoritos));
				$scope.dato = JSON.parse(localStorage.favoritos);
				
			}
		},function error(respuesta) {
			if(!localStorage.favoritos){
				$scope.favoritos = JSON.parse(localStorage.getItem("server"));
				$scope.dato = JSON.parse(localStorage.getItem("server"));
			}else{
				$scope.favoritos = JSON.parse(localStorage.server).concat(JSON.parse(localStorage.favoritos));
				$scope.dato = JSON.parse(localStorage.favoritos);
			}
				$scope.sinconexion = "Datos Locales (sin conexion)";
			}
		);
		
	$scope.borrar=function(pos){
		$scope.dato.splice(pos, 1)
		$http({
			method: 'POST',
			url: "http://schedular.atwebpages.com/php/borrarfav.php",
			//url: "server/php/guardar.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.dato 
				}).then(
					function successCallback(response) {
						localStorage.removeItem("favoritos");
						$location.path("/favs");
						
					}, function errorCallback(response) {
						$scope.problema="No se pudo enviar..."
						
						localStorage.setItem("favoritos", JSON.stringify($scope.dato)) 
						$location.path("/favs");
						console.log("error");
					});
	}
		

	
});



