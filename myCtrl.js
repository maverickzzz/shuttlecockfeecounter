app.controller("myCtrl", function($scope) {
	$scope.shuttlecockPriceEach = 12000;

    $scope.players = [];
    $scope.totalfee = 0;
    // $scope.players = [{id: 0, name: "asdf", shuttlecock: "0", fee: "0"}];
    $scope.hideAlert = true;
    if (typeof(Storage) == "undefined") {
		$scope.hideAlert = false;
	}	

    $scope.addPlayer = function() {
    	if ($scope.name) {
	    	$scope.players.push({
	    		id: $scope.players.length,
	    		name: $scope.name,
	    		shuttlecock: "0",
	    		fee: 0
	    	});
	    	$scope.name = "";
	    	$scope.updateLocalStorage();
	    }
    };

    $scope.reset = function() {
        $scope.name = "";

        for (i = 0; i < $scope.players.length; i++) {
            $scope.players[i].shuttlecock = 0;
            $scope.players[i].fee = 0;
        }

        $scope.totalfee = 0;
        $scope.updateLocalStorage();
        $scope.hideReset = false;
    }

    $scope.resetAll = function() {
    	$scope.players = [];
    	$scope.name = "";
    	$scope.shuttlecockPriceEach = 12000;
    	$scope.totalfee = 0;
    	$scope.updateLocalStorage();
    	$scope.hideReset = false;
    }

    $scope.addShuttlecock = function(id) {
    	$scope.players[id].shuttlecock = parseInt($scope.players[id].shuttlecock) + 1;
    	$scope.players[id].fee = parseInt($scope.players[id].shuttlecock) * $scope.shuttlecockPriceEach / 4;
    	$scope.calculateTotal();
    	$scope.updateLocalStorage();
    }

    $scope.minusShuttlecock = function(id) {
    	if (parseInt($scope.players[id].shuttlecock) > 0) {
    		$scope.players[id].shuttlecock = parseInt($scope.players[id].shuttlecock) - 1;
    		$scope.players[id].fee = parseInt($scope.players[id].shuttlecock) * $scope.shuttlecockPriceEach / 4;
    		$scope.calculateTotal();
    		$scope.updateLocalStorage();
    	}
    }

    $scope.calculateTotal = function() {
    	$total = 0;
    	for (i = 0; i < $scope.players.length; i++) {
    		$total += parseInt($scope.players[i].fee);
    	}
    	console.log($total);
    	$scope.totalfee = $total;
    }

    $scope.updateLocalStorage = function() {
    	if (typeof(Storage) !== "undefined") {
    		localStorage.data = angular.toJson($scope.players);
    		console.log(localStorage.data);
		} else {
			$scope.hideAlert = false;
		}
    }

    $scope.loadLocalStorage = function() {
    	if (typeof(Storage) !== "undefined") {
    		if (localStorage.data) {
    			$scope.players = angular.fromJson(localStorage.data);
    			$scope.calculateTotal();
    			console.log($scope.players);	
    		} else {
    			$scope.players = [];
    		}
		} else {
			$scope.hideAlert = false;
		}    	
    }

    $scope.loadLocalStorage();
});
