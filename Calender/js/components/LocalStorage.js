/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
var LocalStorage = (function () {
    function LocalStorage() {
        this.storage = WinJS.Application.local;
    }
    LocalStorage.prototype.exists = function (key) {
        return this.storage.exists(key);
    };

    LocalStorage.prototype.remove = function (key) {
        return this.storage.remove(key);
    };

    LocalStorage.prototype.retrive = function (key) {
        return this.storage.readText(key);
    };

    LocalStorage.prototype.store = function (key, text) {
        return this.storage.writeText(key, text);
    };
    return LocalStorage;
})();
//# sourceMappingURL=LocalStorage.js.map
