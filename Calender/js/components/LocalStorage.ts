/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>

class LocalStorage {
    "use strict";

    storage: IOHelper = WinJS.Application.local;

    exists(key: string) {
        return this.storage.exists(key);
    }

    remove(key: string) {
        return this.storage.remove(key);
    }

    retrive(key: string) {
        return this.storage.readText(key);
    }

    store(key: string, text: string) {
        return this.storage.writeText(key, text);
    }
}