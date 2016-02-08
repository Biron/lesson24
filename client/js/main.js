$(window).load(function() {

	var holder = $(".films-holder");
	var loader = $(".loader");

	$(".films-form").on("submit", function(e) {
		debugger;
		e.preventDefault();
		var filmName = $(this).children("input[type=text]").val();

		holder.empty();		
		loader.show();

		$.ajax({
			url: "http://www.omdbapi.com/?s=" + filmName + "&type=series"
		}).done(initialDOMBuild);
	});

	function initialDOMBuild(data) {
		var row;

		loader.hide();

	    data["Search"].forEach(function(item, i) {
	    	if(i % 2 == 0) {
	    		row = $("<div class='row'></div>");
	    		holder.append(row);
	    	}

	    	var column = $("<div class='column large-6'></div>")
	    	column.append("<img src='"+item['Poster']+"' />");
	    	column.append("<h3>"+item["Title"]+"</h3>")
	    	row.append(column);
	    });

	}

});