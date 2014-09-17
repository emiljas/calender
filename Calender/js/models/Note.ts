module Models {
    "use strict";

    export class Note {
        private id: number;
        private title: string;
        private startDate: Date;
        private endDate: Date;

        constructor(values?) {
            if (values) {
                this.id = values.id;
                this.title = values.title;
                this.startDate = values.startDate;
                this.endDate = values.endDate;
            }
        }

        public get ID(): number {
            return this.id;
        }

        public set ID(value: number) {
            this.id = value;
        }

        public get Title(): string {
            return this.title;
        }

        public set Title(value: string) {
            this.title = value;
        }

        public get StartDate(): Date {
            return this.startDate;
        }

        public set StartDate(value: Date) {
            this.startDate = value;
        }

        public get EndDate(): Date {
            return this.endDate;
        }

        public set EndDate(value: Date) {
            this.endDate = value;
        }
    }
}