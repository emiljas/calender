/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path="../consts/db.ts" />

module Components {
    "use strict";
    declare var indexedDB;
    declare var IDBKeyRange;

    export class IndexedDatabase {
        static db = null;

        static initalize(): void {
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
        }

        static initializeObjectStores() {
            this.deleteObjectStore(DB.ObjectStore.Note);
            this.createObjectStore(DB.ObjectStore.Note);
        }

        static deleteObjectStore(name: string): void {
            if (IndexedDatabase.db.objectStoreNames.contains(name))
                IndexedDatabase.db.deleteObjectStore(name);
        }

        static createObjectStore(name: string): void {
            var store = IndexedDatabase.db.createObjectStore(name, {
                keyPath: "id",
                autoIncrement: false 
            });
        }

        insert (item, done) {
            this.waitForDatabase(() => {
                var trans = IndexedDatabase.db.transaction([DB.ObjectStore.Note], "readwrite");
                var store = trans.objectStore(DB.ObjectStore.Note);
                var request = store.add(item);
                if(done)
                    trans.oncomplete = done;
            });
        }

        delete(id, done) {
            this.waitForDatabase(() => {
                var db = IndexedDatabase.db;
                var trans = db.transaction([DB.ObjectStore.Note], "readwrite");
                var store = trans.objectStore(DB.ObjectStore.Note);
                var request = store.delete(""+id);

                trans.oncomplete = function () {
                };

                trans.onerror = function () {
                };

                //if(done)
                //    trans.oncomplete = done;
            });
        }

        update(item, done) {
            this.waitForDatabase(() => {
                this.delete(item.id, () => {
                    this.insert(item, done);
                });
            });
        }

        getAll(done) {
            this.waitForDatabase(() => {
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
            });
        }

        private waitForDatabase(after) {
            var wait = () => {
                this.waitForDatabase(after);
            };
            if (IndexedDatabase.db === null)
                setTimeout(wait, 100);
            else
                after();
        }

    }

    IndexedDatabase.initalize();
}