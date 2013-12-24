define([
	"./_ControllerMixin", "../routes/router",
	"dojo/_base/declare", "dojo/dom-construct", "dojo/text!../views/movie.html",
	"dojox/mobile/ToolBarButton", "dojox/mobile/RoundRect", "dojox/mobile/FormLayout", "dojox/mobile/TextBox"
], function(_ControllerMixin, Router, declare, domConstruct, template, ToolBarButton) {
	return declare([_ControllerMixin], {
        innerTemplate: template,
        
        onBeforeTransitionIn: function() {
        	this.inherited(arguments);
            if (this.model !== null) {
                this.titleNode.set("value", this.model.title);
                this.dateNode.set("value", this.model.release_date);
                this.voteNode.set("value", this.model.vote_average);
                this.popularityNode.set("value", this.model.popularity);
            }
        },
        
        postCreate: function() {
        	this.inherited(arguments);
            var controller = this;
            this.headerNode.addChild(new ToolBarButton({
                label: "Back",
                arrow: "left",
                moveTo: "",
                onClick: function(evt) {
                	controller.transitionBack(evt);
                },
                href: "#"
            }, domConstruct.create("li")));
        }
    });
});