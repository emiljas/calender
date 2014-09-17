/// <reference path="../../consts/storagekeys.ts" />
/// <reference path="../../models/note.ts" />
/// <reference path="../../components/indexeddatabase.ts" />

module Services {
    "use strict";

    export class NotesService {
        private db: Components.IndexedDatabase = new Components.IndexedDatabase();

        public retriveNotes(done): void {
            this.db.getAll(function (items) {
                var notes = [];
                for (var i = 0; i < items.length; i++)
                    notes.push(new Models.Note(items[i]));
                done(notes);
            });
        }

        public insertNote(note, done?): void {
            this.db.insert(note, done);
        }

        public updateNote(note, done?) {
            this.db.update(note, done);
        }

        public deleteNote(note, done?) {
            this.db.delete(note.id, done);
        }
    }
}