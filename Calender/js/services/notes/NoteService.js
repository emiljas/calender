/// <reference path="../../consts/storagekeys.ts" />
/// <reference path="../../models/note.ts" />
var Services;
(function (Services) {
    "use strict";

    var NotesService = (function () {
        function NotesService() {
        }
        NotesService.prototype.retriveNotes = function () {
            //var exists: boolean = this.localStorage.exists(StorageKeys.Notes);
            //if (exists)
            //    return this.localStorage.retrive(StorageKeys.Notes);
            //else
            return [];
        };
        return NotesService;
    })();
    Services.NotesService = NotesService;
})(Services || (Services = {}));
//# sourceMappingURL=NoteService.js.map
