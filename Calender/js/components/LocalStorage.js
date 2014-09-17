/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
var Components;
(function (Components) {
    "use strict";

    var LocalStorage = (function () {
        function LocalStorage() {
            this.storage = Windows.Storage.ApplicationData.current.localSettings.values;
        }
        LocalStorage.prototype.exists = function (key) {
            return this.storage.hasKey(key);
        };

        LocalStorage.prototype.remove = function (key) {
            this.storage.remove(key);
        };

        LocalStorage.prototype.retrive = function (key) {
            return this.storage.lookup(key);
        };

        LocalStorage.prototype.store = function (key, value) {
            this.storage.insert(key, value);
        };
        return LocalStorage;
    })();
    Components.LocalStorage = LocalStorage;
})(Components || (Components = {}));
//# sourceMappingURL=LocalStorage.js.map
