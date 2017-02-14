(function () {

    "use strict";

    angular
        .module("od.widget.wichtige-dokumente")
        .factory("DocumentService", DocumentFactory);

    DocumentFactory.$inject = ["widgetServices", "$q", "$timeout"];
    function DocumentFactory(widgetServices, $q, $timeout) {
        /**
         * @type {boolean}
         * @private
         */
        var _loadingDocuments = true;

        /**
         * @type {boolean}
         * @private
         */
        var _loadingDocument = true;

        /**
         * @type {Object}
         * @private
         */
        var _selectedDocument = null;

        /**
         * @type {Array.<Object>}
         * @private
         */
        var _documents = [];

        /**
         * @type {Array.<Object>}
         * @private
         */
        var _importantDocuments = [];

        /**
         * @const {Object}
         */
        var EDITOR_OPTIONS = Object.freeze({
            height: '170px'
        });

        /**
         * @type {Object}
         * @public
         */
        var service = {
            loadDocuments: loadDocuments,
            loadDocument: loadDocument,
            getDocuments: getDocuments,
            getImportantDocuments: getImportantDocuments,
            isLoadingDocuments: isLoadingDocuments,
            setSelectedDocument: setSelectedDocument,
            getSelectedDocument: getSelectedDocument,
            getEditorOptions: getEditorOptions
        };

        return service;

        function loadDocuments() {
            return widgetServices.callService("getDocuments")
                .then(function (documents) {
                    if (documents.length) {
                        _documents = documents;

                        _importantDocuments = _documents.filter(function (document) {
                            return document.isImportant;
                        });
                    }
                })
                .catch(function (error) {
                    return $q.reject(error);
                })
                .finally(function () {
                    $timeout(function () {
                        _loadingDocuments = false;
                    }, 1000);
                });
        }

        function loadDocument(documentId) {
            return widgetServices.callService("getDocument", {id: documentId})
                .then(function (document) {
                    _selectedDocument = document;
                })
                .catch(function (error) {
                    return $q.reject(error);
                })
                .finally(function () {
                    $timeout(function () {
                        _loadingDocument = false;
                    }, 1000);
                });
        }

        function getDocuments() {
            return _documents;
        }

        function getImportantDocuments() {
            return _importantDocuments;
        }

        function isLoadingDocuments() {
            return _loadingDocuments;
        }

        function getSelectedDocument() {
            return _selectedDocument;
        }

        function setSelectedDocument(document) {
            _selectedDocument = document;
        }

        function getEditorOptions() {
            return EDITOR_OPTIONS;
        }
    }

})();