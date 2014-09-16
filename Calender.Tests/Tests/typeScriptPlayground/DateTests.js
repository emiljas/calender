/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />
describe("Date", function () {
    it("can be stringify and parse properly", function () {
        var date = new Date(2014, 9, 16);
        expect(date.getUTCDay()).toBe(16);
    });
});
//# sourceMappingURL=DateTests.js.map
