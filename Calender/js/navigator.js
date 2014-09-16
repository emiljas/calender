/// <reference path="../Scripts/typings/winrt/winrt.d.ts"/>
/// <reference path="../Scripts/typings/winjs/winjs.d.ts"/>
var Application;
(function (Application) {
    var nav = WinJS.Navigation;

    Application.navigator = null;

    var PageControlNavigator = (function () {
        function PageControlNavigator(element, options) {
            this.element = null;
            this.home = "";
            this._lastNavigationPromise = WinJS.Promise.as(null);
            this._lastViewstate = 0;
            this._disposed = false;
            this._eventHandlerRemover = [];
            this.element = (element || document.createElement("div"));
            this.element.appendChild(this.createPageElement());

            this.home = options.home;

            var that = this;

            function addRemovableEventListener(e, eventName, handler, capture) {
                e.addEventListener(eventName, handler, capture);
                that._eventHandlerRemover.push(function () {
                    e.removeEventListener(eventName, handler);
                });
            }
            ;

            addRemovableEventListener(nav, 'navigating', this.navigating.bind(this), false);
            addRemovableEventListener(nav, 'navigated', this.navigated.bind(this), false);

            window.onresize = this.resized.bind(this);
            Application.navigator = this;
        }
        Object.defineProperty(PageControlNavigator.prototype, "pageControl", {
            get: function () {
                return this.pageElement && this.pageElement.winControl;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PageControlNavigator.prototype, "pageElement", {
            get: function () {
                return (this.element.firstElementChild);
            },
            enumerable: true,
            configurable: true
        });

        // This function disposes the page navigator and its contents.
        PageControlNavigator.prototype.dispose = function () {
            if (this._disposed) {
                return;
            }

            this._disposed = true;
            WinJS.Utilities.disposeSubTree(this.element);
            for (var i = 0; i < this._eventHandlerRemover.length; i++) {
                this._eventHandlerRemover[i]();
            }
            this._eventHandlerRemover = null;
        };

        // Creates a container for a new page to be loaded into.
        PageControlNavigator.prototype.createPageElement = function () {
            var element = document.createElement("div");
            element.setAttribute("dir", window.getComputedStyle(this.element, null).direction);
            element.style.position = "absolute";
            element.style.visibility = "hidden";
            element.style.width = "100%";
            element.style.height = "100%";
            return element;
        };

        // Retrieves a list of animation elements for the current page.
        // If the page does not define a list, animate the entire page.
        PageControlNavigator.prototype.getAnimationElements = function () {
            if (this.pageControl && this.pageControl.getAnimationElements) {
                return this.pageControl.getAnimationElements();
            }
            return this.pageElement;
        };

        PageControlNavigator.prototype.navigated = function () {
            this.pageElement.style.visibility = "";
            WinJS.UI.Animation.enterPage(this.getAnimationElements(), null).done();
        };

        // Responds to navigation by adding new pages to the DOM.
        PageControlNavigator.prototype.navigating = function (args) {
            var newElement = this.createPageElement();
            this.element.appendChild(newElement);

            this._lastNavigationPromise.cancel();

            var that = this;

            function cleanup() {
                if (that.element.childElementCount > 1) {
                    var oldElement = that.element.firstElementChild;

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
        };

        // Responds to resize events and call the updateLayout function
        // on the currently loaded page.
        PageControlNavigator.prototype.resized = function (args) {
            if (this.pageControl && this.pageControl.updateLayout) {
                this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
            }
        };
        return PageControlNavigator;
    })();
    Application.PageControlNavigator = PageControlNavigator;

    WinJS.Utilities.markSupportedForProcessing(PageControlNavigator);
})(Application || (Application = {}));
//# sourceMappingURL=navigator.js.map
