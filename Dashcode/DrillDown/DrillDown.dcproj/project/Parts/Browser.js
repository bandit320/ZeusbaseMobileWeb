/* 
 This file was generated by Dashcode and is covered by the 
 license.txt included in the project.  You may edit this file, 
 however it is recommended to first turn off the Dashcode 
 code generator otherwise the changes will be lost.
 */

// Note: Properties and methods beginning with underbar ("_") are considered private and subject to change in future Dashcode releases.

function CreateBrowser(elementOrID, spec) 
{
    var browserElement = elementOrID;
    if (elementOrID.nodeType != Node.ELEMENT_NODE) {
        browserElement = document.getElementById(elementOrID);
    }
    
	if (browserElement && !browserElement.loaded) {
		browserElement.loaded = true;
		browserElement.object = new Browser(browserElement, spec);
		return browserElement.object;
	}
}

function Browser(element, spec)
{
    this.element = element;
}

Browser.prototype.finishLoading = function()
{
    // Find the header and content elements.
    for (var child = this.element.lastChild; child != null; child = child.previousSibling) {
        if (child.nodeType != Node.ELEMENT_NODE) {
            continue;
        }
        if (!this._contentElement) {
            if (child.object instanceof StackLayout) {
                this._contentElement = child;
                this._contentElement.object._setRestrictToBrowserTransition(true);
            }
        } else if (!this._headerElement) {
             if (child.object instanceof Header) {
                this._headerElement = child;
            }
        }
    }
}

Browser.prototype.getCurrentView = function()
{
    return this._contentElement.object.getCurrentView();
}

Browser.prototype.getCurrentTitle = function()
{
    return this._headerElement.object._getCurrentTitle();
}

Browser.prototype.goForward = function(toView, title)
{
    var self = this;
    var prevView = this._contentElement.object.getCurrentView();
    var callback = function() {
        // Set timing and duration of header to match back transition
        var transition = self._contentElement.object.getTransitionForView(toView);
        if (transition) {
            var duration = (transition.type != Transition.NONE_TYPE) ? parseFloat(transition.getDuration()) : 0;
            self._headerElement.object._setAnimationDuration(duration);
            self._headerElement.object._setAnimationTiming(transition.timing);        
        }
        self._backButtonClicked(prevView);
    }
    
    // Set timing and duration of header to match forward transition
    var transition = this._contentElement.object.getTransitionForView(toView);
    if (transition) {
        var duration = (transition.type != Transition.NONE_TYPE) ? parseFloat(transition.getDuration()) : 0;
        this._headerElement.object._setAnimationDuration(duration);
        this._headerElement.object._setAnimationTiming(transition.timing);        
    }
    
    this._contentElement.object._maskContainerElement = this.element;
    // Let's do contentElement first since it is usually heavier
	this._contentElement.object.setCurrentView(toView);
    
    this._headerElement.object._goForward(title, callback);
}

Browser.prototype.goBack = function()
{
    return this._headerElement.object._goBack();
}

Browser.prototype._backButtonClicked = function(toView)
{
    this._contentElement.object._maskContainerElement = this.element;
	this._contentElement.object.setCurrentView(toView, true);
}