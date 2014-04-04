html =" ";
$(document).ready(function() {
	
$.getJSON('http://api.yelp.com/business_review_search?term=&location=EC3m3bd&ywsid=Cs40U808hHCR8WfUA_lhFw&category=bars&callback=?', {}, function(json, textStatus) {
   console.log(json);
   $.each(json.businesses, function(index, value) {
   	// console.log(value.reviews[0].text_excerpt);
   	console.log(value.name);
   	 	html += " "+
   	 	'<div class="row">'+
			'<div id="listing-1" class="col-sm-2"><h1 class="listing">C</h1></div>'+
			'<div class="col-sm-8">'+
				'<h3 class="name text-left">'+String(value.name)+'</h3>'+
				'<p class="description text-left">'+value.reviews[0].text_excerpt+
				'<span class="distance">'+value.distance.toFixed(2)+'m</span></p>'+
			'</div>'+
		'</div>';
   }); 

$('#listings').html(html);

});

$(document).on("click",".listing", function(event) {
	// $(this).addClass('craved');
	console.log(this);

	$(this).toggleClass('craved');
});

});


