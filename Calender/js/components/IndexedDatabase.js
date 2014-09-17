﻿/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
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
                    IndexedDatabase.db = e.target.result;
                    e.target.transaction.onerror = indexedDB.onerror;
                    IndexedDatabase.initializeObjectStores();
                };

                request.onsuccess = function (e) {
                    IndexedDatabase.db = e.target.result;
                };
            }
        };

        IndexedDatabase.initializeObjectStores = function () {
            this.deleteObjectStore(DB.ObjectStore.Note);
            this.createObjectStore(DB.ObjectStore.Note);
        };

        IndexedDatabase.deleteObjectStore = function (name) {
            if (IndexedDatabase.db.objectStoreNames.contains(name))
                IndexedDatabase.db.deleteObjectStore(name);
        };

        IndexedDatabase.createObjectStore = function (name) {
            var store = IndexedDatabase.db.createObjectStore(name, {
                keyPath: "ID",
                autoIncrement: true
            });
        };

        IndexedDatabase.prototype.insert = function (item, done) {
            this.waitForDatabase(function () {
                var trans = IndexedDatabase.db.transaction([DB.ObjectStore.Note], "readwrite");
                var store = trans.objectStore(DB.ObjectStore.Note);
                var request = store.put(item);
                trans.oncomplete = done;
            });
        };

        IndexedDatabase.prototype.waitForDatabase = function (after) {
            var _this = this;
            var wait = function () {
                _this.waitForDatabase(after);
            };
            if (IndexedDatabase.db === null)
                setTimeout(wait, 100);
            else
                after();
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
        IndexedDatabase.db = null;
        return IndexedDatabase;
    })();
    Components.IndexedDatabase = IndexedDatabase;

    IndexedDatabase.initalize();
})(Components || (Components = {}));
//# sourceMappingURL=IndexedDatabase.js.map
