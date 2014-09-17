/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path="../consts/db.ts" />

module Components {
    "use strict";
    declare var indexedDB;
    declare var IDBKeyRange;

    export class IndexedDatabase {
        static db;

        static initalize(): void {
            if (indexedDB) {
                var request = indexedDB.open(DB.Name, DB.Version);

                request.onupgradeneeded = function (e) {
                    var db = e.target.result;
                    e.target.transaction.onerror = indexedDB.onerror;
                    (() => {
                        this.initializeObjectStores();
                    })();
                };

                request.onsuccess = function (e) {
                    this.db = e.target.result;
                };
            }
        }

        static initializeObjectStores() {
            this.deleteObjectStore(DB.ObjectStore.Note);
            this.createObjectStore(DB.ObjectStore.Note);
        }

        static deleteObjectStore(name: string): void {
            if (this.db.objectStoreNames.contains(name))
                this.db.deleteObjectStore(name);
        }

        static createObjectStore(name: string): void {
            var store = this.db.createObjectStore(name, {
                keyPath: "ID",
                autoIncrement: true
            });
        }

        insert (item, done) {
            var trans = IndexedDatabase.db.transaction([DB.ObjectStore.Note], "readwrite");
            var store = trans.objectStore(DB.ObjectStore.Note);
            var request = store.put(item);
            trans.oncomplete = done;
        }

        getAll(done) {
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
        }
    }

    IndexedDatabase.initalize();
}