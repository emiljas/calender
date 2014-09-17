/// <reference path="../../consts/storagekeys.ts" />
/// <reference path="../../models/note.ts" />

module Services {
    "use strict";

    export class NotesService {
        public retriveNotes(): Array<Models.Note> {
            //var exists: boolean = this.localStorage.exists(StorageKeys.Notes);
            //if (exists)
            //    return this.localStorage.retrive(StorageKeys.Notes);
            //else
                return [];
        }
    }
}