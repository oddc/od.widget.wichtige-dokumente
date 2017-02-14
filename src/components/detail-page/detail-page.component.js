(function () {

    "use strict";

    angular
        .module("od.widget.wichtige-dokumente")
        .component("detailPage", {
            templateUrl: "src/components/detail-page/detail-page.component.html",
            controller: DetailPageController,
            controllerAs: "DetailPageController"
        });

    DetailPageController.$inject = ["$log", "DocumentService", "$state", "$stateParams", "widgetState"];
    function DetailPageController($log, DocumentService, $state, $stateParams, widgetState) {
        var $ctrl = this;
        $ctrl.service = DocumentService;
        $ctrl.$onInit = $onInit;

        function $onInit() {
            widgetState.setBackButtonState("index");

            if ($ctrl.service.getSelectedDocument() === null) {
                if (!$stateParams.id) {
                    $state.go("index");
                } else {
                    $ctrl.service.loadDocument($stateParams.id)
                        .catch(function (error) {
                            $log.error(error);
                            $state.go("index");
                        });
                }
            }
        }
    }

})();