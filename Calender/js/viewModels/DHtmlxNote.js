/// <reference path="../models/note.ts" />
var ViewModels;
(function (ViewModels) {
    "use strict";

    var DHtmlxNote = (function () {
        function DHtmlxNote(model) {
            if (model !== undefined) {
                this.EventID = model.ID;
                this.Text = model.Title;
                this.StartDate = model.StartDate;
                this.EndDate = model.EndDate;
            }
        }
        Object.defineProperty(DHtmlxNote.prototype, "EventID", {
            get: function () {
                return this.event_id;
            },
            set: function (value) {
                this.event_id = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DHtmlxNote.prototype, "Text", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DHtmlxNote.prototype, "StartDate", {
            get: function () {
                return this.stringToDate(this.start_date);
            },
            set: function (value) {
                this.start_date = this.dateToString(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DHtmlxNote.prototype, "EndDate", {
            get: function () {
                return this.stringToDate(this.end_date);
            },
            set: function (value) {
                this.end_date = this.dateToString(value);
            },
            enumerable: true,
            configurable: true
        });


        DHtmlxNote.prototype.stringToDate = function (str) {
            str = str.replace(".", " ").replace(".", " ").replace(":", " ");
            var parts = str.split(" ");
            var month = parseInt(parts[0]) - 1;
            var day = parseInt(parts[1]);
            var year = parseInt(parts[2]);
            var hour = parseInt(parts[3]);
            var minute = parseInt(parts[4]);
            return new Date(year, month, day, hour, minute);
        };

        DHtmlxNote.prototype.dateToString = function (date) {
            var day = this.twoPositions(date.getDate());
            var month = this.twoPositions(date.getMonth() + 1);
            var year = date.getFullYear();
            var hour = this.twoPositions(date.getHours());
            var minute = this.twoPositions(date.getMinutes());
            return month + "." + day + "." + year + " " + hour + ":" + minute;
        };

        DHtmlxNote.prototype.twoPositions = function (num) {
            var str = num.toString();
            if (str.length == 0)
                return "00";
            else if (str.length == 1)
                return "0" + str;
            else
                return str;
        };

        DHtmlxNote.fromModels = function (models) {
            var viewModels = [];
            for (var i = 0; i < models.length; i++) {
                viewModels.push(new DHtmlxNote(models[i]));
            }
            return viewModels;
        };

        DHtmlxNote.prototype.toModel = function () {
            var model = new Models.Note();
            model.ID = this.EventID;
            model.Title = this.Text;
            model.StartDate = this.StartDate;
            model.EndDate = this.EndDate;
            return model;
        };
        return DHtmlxNote;
    })();
    ViewModels.DHtmlxNote = DHtmlxNote;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=DHtmlxNote.js.map
