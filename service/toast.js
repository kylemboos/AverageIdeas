angular.module('app').service('Toast', function($rootScope){



	return {
		create: function(message, actionText, action, p1, p2){
            if (actionText == ""){
                setTimeout(function(){
                    $rootScope.toast = null;
                    $rootScope.$apply();
                }, 2000);
            }

			if(actionText == 'close'){
				$rootScope.toast = {
	        message:message,
	        action: function(){
	        	$rootScope.toast = null;
	        },
	        actionText:actionText
	      };
			}else{

				$rootScope.toast = {
	        message:message,
	        action: function(){
	        	if($rootScope.toast.p1 == null)
	        		action();
	        	else
	        		action($rootScope.toast.p1, $rootScope.toast.p2);
	        	$rootScope.toast = null;
	        },
	        p1: p1,
	        p2: p2,
	        actionText:actionText
	      };
	    }
            
	    $rootScope.toast.close = function(){
	    	$rootScope.toast = null;
	    };

	    if(!$rootScope.$$phase)
		  	$rootScope.$apply();
		}
	};

});