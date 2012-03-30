jQuery(document).ready(function() {

	$(window).endlessScroll({
		insertAfter: '#results',
		bottomPixels: 500,
		fireDelay: 10,
		callback: function(j) {
			console.log('j' + j)
			var last_img = $("#results li:last");
			last_img.after( function() {
				checkCategory();
			});
		}
	});

	// init first
	var i = 1;
	getPost(i, 'popular');

	// click load
	$('.load').click(function() {
		checkCategory();
	});

	$("#category").change( function() {
		$("#counter").html(1);
		$('#results li').remove();
		checkCategory();
	});

	function checkCategory() {
		var i = $("#counter").html();
		var cat = $("#category").val();
		getPost(i, cat);
	}

	function getPost(i, category) {
		$.ajax({
				url: "http://api.dribbble.com/shots/"+category+"/?page="+i+"&per_page=15",
				dataType: 'jsonp',
				success: function( results ) {
					$.each(results.shots , function( i, shots ) {
			    		$('#results').append('<li><a href="'+shots.url+'" title=""><span>'+shots.title+'</span></a><img src="'+ shots.image_url + '" alt="" /></li>' );
			    	});
				}
		});
		// console.log(i);
		// console.log(category);
		i++;
		$("#counter").html(i);
	}

	// add class hover shit
	$('#results li').live('click', function() {		    
	    $(this).addClass('highlight');
		// $('li').not($('li highlight')).addClass('asd');
		$('#results li').not(this).addClass('dim'); 			
	});

	$('#results li').live('mouseout', function() {
		$(this).removeClass('highlight');
		$('#results li').not(this).removeClass('dim');
	});

//end
});