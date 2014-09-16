module Models {
    "use strict";

    export class Note {
        private title: string;
        private startDate: string;
        private endDate: string;

        public get Title(): string {
            return this.title;
        }

        public set Title(value: string) {
            this.title = value;
        }

        public get StartDate(): string {
            return this.startDate;
        }

        public set StartDate(value: string) {
            this.startDate = value;
        }

        public get EndDate(): string {
            return this.endDate;
        }

        public set EndDate(value: string) {
            this.endDate = value;
        }
    }
}