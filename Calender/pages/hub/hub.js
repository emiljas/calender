/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>
var HubPage;
(function (HubPage) {
    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    var ui = WinJS.UI;

    function openCalenderClick(mouseEvent) {
        nav.navigate("pages/calender/calender.html");
    }
    HubPage.openCalenderClick = openCalenderClick;

    // Get the groups used by the data-bound sections of the Hub.
    var section3Group = Data.resolveGroupReference("group4");
    var section3Items = Data.getItemsFromGroup(section3Group);

    function processed(element, options) {
        return WinJS.Resources.processAll(element);
    }

    function ready(element, options) {
        var hub = element.querySelector(".hub").winControl;
        hub.onheaderinvoked = function (args) {
            args.detail.section.onheaderinvoked(args);
        };
        hub.onloadingstatechanged = function (args) {
            if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                hub.onloadingstatechanged = null;
            }
        };
        return WinJS.Promise.as(null);
    }

    function unload() {
        // TODO: Respond to navigations away from this page.
    }

    function updateLayout(element) {
        // TODO: Respond to changes in layout.
    }

    ui.Pages.define("/pages/hub/hub.html", {
        processed: processed,
        ready: ready,
        section3DataSource: section3Items.dataSource,
        section3HeaderNavigate: util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/section/section.html", { title: args.detail.section.header, groupKey: section3Group.key });
        }),
        section3ItemNavigate: util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(section3Items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        }),
        unload: unload,
        updateLayout: updateLayout
    });
})(HubPage || (HubPage = {}));
//# sourceMappingURL=hub.js.map
