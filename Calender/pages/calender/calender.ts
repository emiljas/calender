/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>
/// <reference path="../../js/viewmodels/dhtmlxnote.ts" />

module CalenderPage {
    "use strict";

    var ui = WinJS.UI;
    declare var scheduler: any;

    function ready(element: HTMLElement, options) {
        WinJS.Utilities.ready(initScheduler)
        return WinJS.Promise.as(null);
    }

    function initScheduler() {
        scheduler.init("scheduler_here", new Date(), "week");
        var conferences = [];
        conferences.push({
            text: "aaa aa a aa",
            start_date: "16-09-2014 17:00",
            end_date: "16-09-2014 19:00" 
        });
        scheduler.parse(conferences, 'json');
    }

    scheduler.attachEvent("onEventDeleted", function (event_id, event_object) {
    });

    scheduler.attachEvent("onEventChanged", function (event_id, event_object) {
    });

    scheduler.attachEvent("onEventAdded", function (event_id, event_object) {
    });    

    ui.Pages.define("/pages/calender/calender.html", {
        ready: ready
    });
}