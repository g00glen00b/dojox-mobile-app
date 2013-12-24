define([ "dojo/store/Memory", "dojo/json", "dojo/text!./movies.json" ], function(Memory, JSON, movieData) {
	return new Memory({
		data: JSON.parse(movieData)
	});
});
