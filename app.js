var app = angular.module('app', ['ui.router', 'perfect_scrollbar']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'main': {templateUrl: '/home/home.html', controller: 'HomeCtrl'},
            }
        })
        .state('episodes', {
            url: '/episodes',
            views: {
                'main': {templateUrl: '/episodes/episodes.html', controller: 'EpisodesCtrl'},
            }
        });

});


app.run(function ($rootScope, FIREBASE_URL, Toast) {
    // Register the callback to be fired every time auth state changes
    //var ref = new Firebase(FIREBASE_URL);

    $rootScope.$on('$stateChangeSuccess', function () {
        $(".main-view, #scroller").animate({scrollTop: 0}, 100);
    });
});

app.constant('FIREBASE_URL', 'https://amber-fire-2213.firebaseIO.com/');


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                if(!scope.$$phase) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                }
                event.preventDefault();
            }
        });
    };
});
