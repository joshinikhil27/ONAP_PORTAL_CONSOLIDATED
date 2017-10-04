app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
	    .state('home', {
	        url: '/home',
	        templateUrl: 'resources/pages/home.jsp',
	        data : {pageTitle : 'Home'}
	    })
        .state('dashboard', {
            url: '/Training-VNF',
            templateUrl: 'resources/pages/dashboard.jsp',
            controller : 'dashboardCtrl',
            data : {pageTitle : 'Training VNF Data'}
        })
        .state('persistedData', {
            url: '/ML-Trainer',
            templateUrl: 'resources/pages/data-persist.jsp',
            controller : 'persistCtrl',
            data : {pageTitle : 'ML Trainer'}
        })
        .state('importVNFdata', {
            url: '/Import-VNF-Data',
            templateUrl: 'resources/pages/import-VNF-data.jsp',
            controller : 'importVNFCtrl',
            data : {pageTitle : 'Load VNF Data'}
        })
        .state('aandai', {
            url: '/aandai',
            templateUrl: 'resources/pages/AAI.jsp'
        })
         .state('summary', {
            url: '/Action-Summary',
            templateUrl: 'resources/pages/summary.jsp',
            controller : 'summaryCtrl',
            data : {pageTitle : 'Action Summary'}
        })
        .state('restartinfo', {
            url: '/restartinfo',
            templateUrl: 'resources/pages/restartinfo.jsp',
            controller : 'restartinfoCtrl'
        })
        .state('presistData', {
            url: '/presistData',
            templateUrl: 'resources/pages/presistData.jsp',
            controller : 'presistDataCtrl'
        })
        .state('preTest', {
            url: '/preTest',
            templateUrl: 'resources/pages/preTest.jsp',
            controller : 'preTestCtrl'
        })
        .state('versionHistory', {
            url: '/versionHistory',
            templateUrl: 'resources/pages/versionHistory.jsp',
            controller : 'versionHistoryCtrl'
        })
        .state('versionComp', {
            url: '/versionComp',
            templateUrl: 'resources/pages/versionComp.jsp',
            controller : 'versionCompCtrl'
        })
        .state('versionInfo', {
            url: '/versionInfo',
            templateUrl: 'resources/pages/VersionInfo.jsp',
            controller : 'versionHistoryCtrl'
        })
        .state('versionCompNew', {
            url: '/versionCompNew',
            templateUrl: 'resources/pages/versionCompNew.jsp',
            controller : 'versionHistoryCtrl'
        })
        .state('eventList', {
            url: '/eventList',
            templateUrl: 'resources/pages/eventList.jsp',
            controller : 'eventListCtrl'
        });

});
