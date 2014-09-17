/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>
/// <reference path="../../js/viewmodels/dhtmlxnote.ts" />
/// <reference path="../../js/services/notes/noteservice.ts" />

module CalenderPage {
    "use strict";

    declare var scheduler: any;
    var ui = WinJS.UI;

    function ready(element: HTMLElement, options) {
        initScheduler();
        return WinJS.Promise.as(null);
    }

    function initScheduler() {
        scheduler.init("scheduler_here", new Date(), "week");
        var conferences = [{
            text: "aaa aa a aa",
            start_date: "09.16.2014 17:00",
            end_date: "09.16.2014 19:00"
        }];
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