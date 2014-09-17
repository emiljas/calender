/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path="../consts/db.ts" />
var Components;
(function (Components) {
    "use strict";

    var IndexedDatabase = (function () {
        function IndexedDatabase() {
        }
        IndexedDatabase.initalize = function () {
            if (indexedDB) {
                var request = indexedDB.open(DB.Name, DB.Version);

                request.onupgradeneeded = function (e) {
                    var _this = this;
                    var db = e.target.result;
                    e.target.transaction.onerror = indexedDB.onerror;
                    (function () {
                        _this.initializeObjectStores();
                    })();
                };

                request.onsuccess = function (e) {
                    this.db = e.target.result;
                };
            }
        };

        IndexedDatabase.initializeObjectStores = function () {
            this.deleteObjectStore(DB.ObjectStore.Note);
            this.createObjectStore(DB.ObjectStore.Note);
        };

        IndexedDatabase.deleteObjectStore = function (name) {
            if (this.db.objectStoreNames.contains(name))
                this.db.deleteObjectStore(name);
        };

        IndexedDatabase.createObjectStore = function (name) {
            var store = this.db.createObjectStore(name, {
                keyPath: "ID",
                autoIncrement: true
            });
        };

        IndexedDatabase.prototype.insert = function (item, done) {
            var trans = IndexedDatabase.db.transaction([DB.ObjectStore.Note], "readwrite");
            var store = trans.objectStore(DB.ObjectStore.Note);
            var request = store.put(item);
            trans.oncomplete = done;
        };

        IndexedDatabase.prototype.getAll = function (done) {
            var items = [];
            var db = IndexedDatabase.db;
            var trans = db.transaction([DB.ObjectStore.Note], "readwrite");
            var store = trans.objectStore(DB.ObjectStore.Note);

            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function (e) {
                var result = e.target.result;
                if (!!result == false) {
                    done(items);
                    return;
                }

                items.push(result.value);
                result.continue();
            };

            cursorRequest.onerror = indexedDB.onerror;
        };
        return IndexedDatabase;
    })();
    Components.IndexedDatabase = IndexedDatabase;

    IndexedDatabase.initalize();
})(Components || (Components = {}));
//# sourceMappingURL=IndexedDatabase.js.map
