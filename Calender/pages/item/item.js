/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>
var ItemPage;
(function (ItemPage) {
    var ui = WinJS.UI;

    function ready(element, options) {
        var item = Data.resolveItemReference(options.item);
        element.querySelector(".titlearea .pagetitle").textContent = item.title;

        return WinJS.Promise.as(null);
    }

    ui.Pages.define("/pages/item/item.html", {
        ready: ready
    });
})(ItemPage || (ItemPage = {}));
//# sourceMappingURL=item.js.map
