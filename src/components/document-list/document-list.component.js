(function () {

    "use strict";

    angular
        .module("od.widget.wichtige-dokumente")
        .component("documentList", {
            templateUrl: "src/components/document-list/document-list.component.html",
            controller: DocumentListController,
            controllerAs: "DocumentListController",
            bindings: {
                caption: "@",
                documents: "<",
                searchTerm: "<",
                onClickOnDocument: "&"
            }
        });
    
    function DocumentListController() {
        var $ctrl = this;
        
        $ctrl.onDownloadClick = function (event) {
            event.preventDefault();
            window.location.href = event.currentTarget.href;
        }
    }

})();