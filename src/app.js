(function () {

    "use strict";

    angular
        .module("od.widget.wichtige-dokumente", ["widgetbuilder"])
        .config(StateMashine)
        .run(runBlock);

    StateMashine.$inject = ["$stateProvider", "$urlRouterProvider"];
    function StateMashine($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("index", {
                url: "/",
                template: "<index-page></index-page>",
                data: {
                    cssClassNames: "index"
                }
            })
            .state("detail", {
                url: "/document/:id",
                template: "<detail-page></detail-page>",
                data: {
                    cssClassNames: "detail"
                }
            });

        $urlRouterProvider.otherwise("/");
    }

    runBlock.$inject = ["$rootScope", "widgetState"];
    function runBlock($rootScope, widgetState) {
        $rootScope.$on("$stateChangeStart", onStateChangeStart);

        function onStateChangeStart() {
            widgetState.setConfigValue("icon", "");
        }
    }
})();
