define([
	"./_ControllerMixin", "../store/MovieStore", "../components/MovieListItem", "../routes/router",
	"dojo/_base/lang", "dojo/_base/declare", "dojo/text!../views/movies.html", "dojo/dom-construct",
	"dojox/mobile/EdgeToEdgeList"
], function(_ControllerMixin, MovieStore, MovieListItem, Router, lang, declare, template, domConstruct) {

	return declare([_ControllerMixin], {
        innerTemplate: template,
        postCreate: function() {
        	this.inherited(arguments);
            MovieStore.query({}).forEach(lang.hitch(this, function(movie) {
                var controller = this;
                this.listNode.addChild(new MovieListItem({
                    label: movie.title,
                    onClick: function(evt) {
                        controller.transition("movie", evt, movie);
                    },
                    href: "#"
                }, domConstruct.create("li")));
            }));
        }
    });
});