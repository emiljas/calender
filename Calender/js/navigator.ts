/// <reference path="../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../Scripts/typings/winjs/winjs.d.ts"/>

module Application {

    var nav = WinJS.Navigation;

    export var navigator: PageControlNavigator = null;

    export class PageControlNavigator {

        public element = <HTMLElement>null;
        public home = "";
        _lastNavigationPromise = WinJS.Promise.as(null);
        _lastViewstate = 0;
        _disposed = false;
        _eventHandlerRemover = [];

        constructor(element: Element, options: { home: string } ) {
            this.element = <HTMLElement>(element || document.createElement("div"));
            this.element.appendChild(this.createPageElement());

            this.home = options.home;

            var that = this;

            function addRemovableEventListener(e, eventName, handler, capture) {
                e.addEventListener(eventName, handler, capture);
                that._eventHandlerRemover.push(function () {
                    e.removeEventListener(eventName, handler);
                });
            };

            addRemovableEventListener(nav, 'navigating', this.navigating.bind(this), false);
            addRemovableEventListener(nav, 'navigated', this.navigated.bind(this), false);

            window.onresize = this.resized.bind(this);
            Application.navigator = this;
        }

        private get pageControl() {
            return this.pageElement && this.pageElement.winControl;
        }

        private get pageElement() {
            return <HTMLElement>(this.element.firstElementChild);
        }

        // This function disposes the page navigator and its contents.
        dispose() {
            if (this._disposed) {
                return;
            }


            this._disposed = true;
            WinJS.Utilities.disposeSubTree(this.element);
            for (var i = 0; i < this._eventHandlerRemover.length; i++) {
                this._eventHandlerRemover[i]();
            }
            this._eventHandlerRemover = null;
        }

        // Creates a container for a new page to be loaded into.
        createPageElement() {
            var element = document.createElement("div");
            element.setAttribute("dir", window.getComputedStyle(this.element, null).direction);
            element.style.position = "absolute";
            element.style.visibility = "hidden";
            element.style.width = "100%";
            element.style.height = "100%";
            return element;
        }

        // Retrieves a list of animation elements for the current page.
        // If the page does not define a list, animate the entire page.
        getAnimationElements() {
            if (this.pageControl && this.pageControl.getAnimationElements) {
                return this.pageControl.getAnimationElements();
            }
            return this.pageElement;
        }

        navigated() {
            this.pageElement.style.visibility = "";
            WinJS.UI.Animation.enterPage(this.getAnimationElements(), null).done();
        }

        // Responds to navigation by adding new pages to the DOM. 
        navigating(args) {
            var newElement = this.createPageElement();
            this.element.appendChild(newElement);

            this._lastNavigationPromise.cancel();

            var that = this;

            function cleanup() {
                if (that.element.childElementCount > 1) {
                    var oldElement = <HTMLElement>that.element.firstElementChild;
                    // Cleanup and remove previous element 
                    if (oldElement.winControl) {
                        if (oldElement.winControl.unload) {
                            oldElement.winControl.unload();
                        }
                        oldElement.winControl.dispose();
                    }
                    oldElement.parentNode.removeChild(oldElement);
                    oldElement.innerText = "";
                }
            }

            this._lastNavigationPromise = WinJS.Promise.as(null).then(function () {
                return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state);
            }).then(cleanup, cleanup);

            args.detail.setPromise(this._lastNavigationPromise);
        }

        // Responds to resize events and call the updateLayout function
        // on the currently loaded page.
        resized(args) {  
            if (this.pageControl && this.pageControl.updateLayout) {
                this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
            }
        }

    }

    WinJS.Utilities.markSupportedForProcessing(PageControlNavigator);
}
