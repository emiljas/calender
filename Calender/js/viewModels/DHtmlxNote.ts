/// <reference path="../models/note.ts" />

module ViewModels {
    "use strict";

    export class DHtmlxNote {
        event_id: number;
        text: string;
        start_date: string;
        end_date: string;

        constructor(model?: Models.Note) {
            if (model !== undefined) {
                this.EventID = model.ID;
                this.Text = model.Title;
                this.StartDate = model.StartDate;
                this.EndDate = model.EndDate;
            }
        }

        get EventID(): number {
            return this.event_id;
        }

        set EventID(value: number) {
            this.event_id = value;
        }

        get Text(): string {
            return this.text;
        }

        set Text(value: string) {
            this.text = value;
        }

        get StartDate(): Date {
            return this.stringToDate(this.start_date);
        }

        set StartDate(value: Date) {
            this.start_date = this.dateToString(value);
        }

        get EndDate(): Date {
            return this.stringToDate(this.end_date);
        }

        set EndDate(value: Date) {
            this.end_date = this.dateToString(value);
        }

        stringToDate(str: string): Date {
            str = str.replace(".", " ").replace(".", " ").replace(":", " ");
            var parts = str.split(" ");
            var month: number = parseInt(parts[0]) - 1;
            var day: number = parseInt(parts[1]);
            var year: number = parseInt(parts[2]);
            var hour: number = parseInt(parts[3]);
            var minute: number = parseInt(parts[4]);
            return new Date(year, month, day, hour, minute);
        }

        dateToString(date: Date): string {
            var day = this.twoPositions(date.getDate());
            var month = this.twoPositions(date.getMonth() + 1);
            var year = date.getFullYear();
            var hour = this.twoPositions(date.getHours());
            var minute = this.twoPositions(date.getMinutes());
            return month + "." + day + "." + year + " " + hour + ":" + minute;
        }

        twoPositions(num: number): string {
            var str = num.toString();
            if (str.length == 0)
                return "00";
            else if (str.length == 1)
                return "0" + str;
            else return str;
        }

        static fromModels(models: Array<Models.Note>): Array<DHtmlxNote> {
            var viewModels = [];
            for (var i = 0; i < models.length; i++) {
                viewModels.push(new DHtmlxNote(models[i]));
            }
            return viewModels;
        }

        toModel(): Models.Note {
            var model = new Models.Note();
            model.ID = this.EventID;
            model.Title = this.Text;
            model.StartDate = this.StartDate;
            model.EndDate = this.EndDate;
            return model;
        }
    }
}