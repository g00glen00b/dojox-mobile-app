define([
	"dojo/_base/lang", "dojo/_base/array", "dojo/topic", "dojox/mobile/TransitionEvent", "dijit/registry"
], function(lang, arrUtils, topic, TransitionEvent, registry) {
	
	var router = {
		transitionStack: new Array(),
		
		transitionTopic: "app/transition",
		
		routes: new Array(),
		
		contains: function(/** String */ identifier) {
			return arrUtils.indexOf(this.transitionStack, identifier) >= 0;
		},
		
		registerRoute: function(/** String */ identifier, /** String */ controllerId) {
			this.routes.push({
				identifier: identifier,
				controller: controllerId
			});
		},
		
		getRouteController: function(/** String */ identifier) {
			var routes = arrUtils.filter(this.routes, function(route) {
				return route.identifier === identifier;
			});
			return routes.length === 0 ? null : routes[0].controller;
		},
		
		executeTransitionCallback: function(/** Object */ data) {
			if (data !== null && data.event !== undefined && data.event !== null && data.original !== undefined &&
				data.original !== null) {
				var isForward = !this.contains(data.identifier);
				var identifier = null;
				if (data.identifier !== undefined && data.identifier !== null) {
					identifier = data.identifier;
				} else {
					identifier = this.transitionStack.pop();
					isForward = false;
				}
				if (data.model !== undefined && data.model !== null) {			
					registry.byId(this.getRouteController(identifier)).set("model", data.model);
				}
				new TransitionEvent(data.event.srcElement, {
                	moveTo: this.getRouteController(identifier),
                	transitionDir: isForward ? 1 : -1,
                	transition: 'slide'
            	}, data.event).dispatch();
            	
            	if (this.contains(data.original)) {
            		this.transitionStack.splice(arrUtils.indexOf(this.transitionStack, data.original), 1);
            	} else if (isForward) {
            		this.transitionStack.push(data.original);
            	}
			}
		}
	};
	
	topic.subscribe(router.transitionTopic, lang.hitch(router, "executeTransitionCallback"));
	return router;
});
