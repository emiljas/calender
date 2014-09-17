var Models;
(function (Models) {
    "use strict";

    var Note = (function () {
        function Note(values) {
            if (values) {
                this.id = values.id;
                this.title = values.title;
                this.startDate = values.startDate;
                this.endDate = values.endDate;
            }
        }
        Object.defineProperty(Note.prototype, "ID", {
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Note.prototype, "Title", {
            get: function () {
                return this.title;
            },
            set: function (value) {
                this.title = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Note.prototype, "StartDate", {
            get: function () {
                return this.startDate;
            },
            set: function (value) {
                this.startDate = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Note.prototype, "EndDate", {
            get: function () {
                return this.endDate;
            },
            set: function (value) {
                this.endDate = value;
            },
            enumerable: true,
            configurable: true
        });

        return Note;
    })();
    Models.Note = Note;
})(Models || (Models = {}));
//# sourceMappingURL=Note.js.map
