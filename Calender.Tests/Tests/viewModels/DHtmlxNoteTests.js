/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../calender/js/viewmodels/dhtmlxnote.ts" />
describe("DHtmlxNote", function () {
    var date = new Date(2013, 2, 12, 21, 5);
    var str = "03.12.2013 21:05";

    it("date to string", function () {
        var note = new ViewModels.DHtmlxNote();
        note.StartDate = date;
        expect(note.start_date).toBe(str);
    });

    it("string to date", function () {
        var note = new ViewModels.DHtmlxNote();
        note.StartDate = date;
        var result = note.StartDate;
        expect(result.getDate()).toBe(date.getDate());
        expect(result.getMonth()).toBe(date.getMonth());
        expect(result.getFullYear()).toBe(date.getFullYear());
        expect(result.getHours()).toBe(date.getHours());
        expect(result.getMinutes()).toBe(date.getMinutes());
    });
});
//# sourceMappingURL=DHtmlxNoteTests.js.map
