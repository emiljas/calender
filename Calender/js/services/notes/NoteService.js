/// <reference path="../../consts/storagekeys.ts" />
/// <reference path="../../models/note.ts" />
/// <reference path="../../components/indexeddatabase.ts" />
var Services;
(function (Services) {
    "use strict";

    var NotesService = (function () {
        function NotesService() {
            this.db = new Components.IndexedDatabase();
        }
        NotesService.prototype.retriveNotes = function (done) {
            this.db.getAll(function (items) {
                var notes = [];
                for (var i = 0; i < items.length; i++)
                    notes.push(new Models.Note(items[i]));
                done(notes);
            });
        };

        NotesService.prototype.insertNote = function (note, done) {
            this.db.insert(note, done);
        };

        NotesService.prototype.updateNote = function (note, done) {
            this.db.update(note, done);
        };

        NotesService.prototype.deleteNote = function (note, done) {
            this.db.delete(note.id, done);
        };
        return NotesService;
    })();
    Services.NotesService = NotesService;
})(Services || (Services = {}));
//# sourceMappingURL=NoteService.js.map
