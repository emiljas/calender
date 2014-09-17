/// <reference path="../../js/viewmodels/dhtmlxnote.ts" />
/// <reference path="../../js/viewmodels/dhtmlxnote.ts" />
/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>
/// <reference path="../../js/viewmodels/dhtmlxnote.ts" />
/// <reference path="../../js/services/notes/noteservice.ts" />

module CalenderPage {
    "use strict";

    declare var scheduler: any;
    var ui = WinJS.UI;
    var noteService = new Services.NotesService();

    function ready(element: HTMLElement, options) {
        initScheduler();
        return WinJS.Promise.as(null);
    }

    function initScheduler() {
        scheduler.init("scheduler_here", new Date(), "week");
        noteService.retriveNotes((notes) => {
            var viewNotes = ViewModels.DHtmlxNote.fromModels(notes);
            scheduler.parse(viewNotes, 'json');
        });
    }

    scheduler.attachEvent("onEventDeleted", function (event_id, event_object) {
        var note = makeModel(event_id, event_object);
        noteService.deleteNote(note);
    });

    scheduler.attachEvent("onEventChanged", function (event_id, event_object) {
        var note = makeModel(event_id, event_object);
        noteService.updateNote(note);
    });

    scheduler.attachEvent("onEventAdded", function (event_id, event_object) {
        var note = makeModel(event_id, event_object);
        noteService.insertNote(note);
    });

    function makeModel(event_id, event_object): Models.Note {
        var viewModel = new ViewModels.DHtmlxNote();
        viewModel.EventID = event_id;
        viewModel.Text = event_object.text;
        viewModel.StartDate = event_object.start_date;
        viewModel.EndDate = event_object.end_date;
        return viewModel.toModel();
    }

    ui.Pages.define("/pages/calender/calender.html", {
        ready: ready
    });
}