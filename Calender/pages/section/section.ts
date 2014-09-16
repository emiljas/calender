/// <reference path="../../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../../Scripts/typings/winjs/winjs.d.ts"/>
/// <reference path='../../js/data.ts'/>

module SectionPage 
{
    var ui = WinJS.UI;
    var items;

    function init (element : HTMLElement, options) {
        var group = Data.resolveGroupReference(options.groupKey);
        items = Data.getItemsFromGroup(group);
        var pageList = items.createGrouped(
            function groupKeySelector(item) { return group.key; },
            function groupDataSelector(item) { return group; }
        );
        this.groupDataSource = pageList.groups.dataSource;
        this.itemDataSource = pageList.dataSource;
        this.itemInvoked = ui.eventHandler(itemInvoked.bind(this));
            
        return WinJS.Promise.as(null);
    }

    function itemInvoked (args) {
        var item = items.getAt(args.detail.itemIndex);
        WinJS.Navigation.navigate("/pages/item/item.html", { item: Data.getItemReference(item) });
    }

    function processed (element: HTMLElement, options) {
        return <any>WinJS.Resources.processAll(element);
    }

    function ready(element : HTMLElement, options) {
        element.querySelector("header[role=banner] .pagetitle").textContent = options.title;

        var listView = element.querySelector(".itemslist").winControl;
        listView.element.focus();

        return WinJS.Promise.as(null);
    }

    function unload() {
        items.dispose();
    }

    function updateLayout(element : HTMLElement) {
        // TODO: Respond to changes in layout.
    }

    ui.Pages.define("/pages/section/section.html", {
        processed: processed,
        init: init,
        ready: ready,
        unload: unload,
        updateLayout: updateLayout,
    });
}