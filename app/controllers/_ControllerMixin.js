define([
	"dojox/mobile/View",
	"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
	"dojo/_base/declare", "dojo/text!../views/application.html", "dojo/topic",
	"../routes/router",
	"dojox/mobile/Heading", "dojox/mobile/ScrollableView"
], function(View, _TemplatedMixin, _WidgetsInTemplateMixin, declare, template, topic, Router) {

	return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        innerTemplate: null,
        
        model: null,
        
        transition: function(/** String */ identifier, /** Event */ event, /** Object */ model) {
        	var controller = this;
        	topic.publish(Router.transitionTopic, {
        		model: model,
        		event: event,
        		identifier: identifier,
        		original: controller.id
        	});
        },
        
        transitionBack: function(/** Event */ event, /** Object */ model) {
        	var controller = this;
        	topic.publish(Router.transitionTopic, {
        		model: model,
        		event: event,
        		original: controller.id
        	});
        },
        
        postCreate: function() {
        	this.inherited(arguments);
        	Router.registerRoute(this.id, this.id);
        }
    });
});