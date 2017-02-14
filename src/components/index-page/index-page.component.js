(function () {

    "use strict";

    angular
        .module("od.widget.wichtige-dokumente")
        .component("indexPage", {
            templateUrl: "src/components/index-page/index-page.component.html",
            controller: IndexPageController,
            controllerAs: "IndexPageController"
        });

    IndexPageController.$inject = ["$log", "DocumentService", "$state"];
    function IndexPageController($log, DocumentService, $state) {
        var $ctrl = this;
        $ctrl.service = DocumentService;
        $ctrl.$onInit = $onInit;
        $ctrl.onClickOnDocument = onClickOnDocument;
        $ctrl.searchTerm = "";

        function $onInit() {
            $ctrl.service.loadDocuments()
                .catch(function (error) {
                    $log.error(error);
                });
        }

        function onClickOnDocument(document) {
            $ctrl.service.setSelectedDocument(document);
            $state.go("detail", { id: document.id });
        }
    }

})();