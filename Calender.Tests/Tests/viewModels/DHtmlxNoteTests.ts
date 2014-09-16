/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../calender/js/viewmodels/dhtmlxnote.ts" />

describe("DHtmlxNote", () => {
    var text: string = "TEXT";
    var start_date: string = "06.01.2013 14:00";
    var end_date: string = "07.01.2013 18:00";

    it("serialize and deserialize", () => {
        var note = makeNote();
        var json = makeJson();
        expect(JSON.stringify(note)).toBe(json);
    });

    function makeNote() {
        var note = new ViewModels.DHtmlxNote();
        note.text = text;
        note.start_date = start_date;
        note.end_date = end_date;
        return note;
    };

    function makeJson() {
        var json =
        "{" +
          "\"text\":\"" + text + "\"," +
          "\"start_date\":\"" + start_date + "\"," +
          "\"end_date\":\"" + end_date + "\"" +
        "}";
        return json;
    }
});