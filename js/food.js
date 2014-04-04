html = " ";
replace = []
number = 0
loop_stop = false;
$(document).ready(function() {
	
$.getJSON('http://api.yelp.com/business_review_search?term=&location=EC3m3bd&ywsid=Cs40U808hHCR8WfUA_lhFw&category=restaurants&callback=?', {}, function(json, textStatus) {
   console.log(json);
   $.each(json.businesses, function(index, value) {
   	number++;
   	// console.log(value.reviews[0].text_excerpt);
   	if (loop_stop !== true) {
   	 	html += " "+
   	 	'<div class="row" id="row'+number+'">'+
			'<div id="listing-'+number+'" class="col-xs-2"><h1 data-num="'+number+'" class="listing center-block">C</h1></div>'+
			'<div class="col-xs-10">'+
				'<h3 class="name text-left">'+String(value.name)+'</h3>'+
				'<p class="description text-left">'+value.reviews[0].text_excerpt+
				'<span class="distance">'+value.distance.toFixed(2)+'miles away</span></p>'+
			'</div>'+
		'</div>';
	}
		if (number > 10) {
			loop_stop = true;
			replace.push(" "+
	   	 	'<div class="row" id="row'+number+'">'+
				'<div id="listing-'+number+'" class="col-xs-2"><h1 data-num="'+number+'" class="listing center-block">C</h1></div>'+
				'<div class="col-xs-10">'+
					'<h3 class="name text-left">'+String(value.name)+'</h3>'+
					'<p class="description text-left">'+value.reviews[0].text_excerpt+
					'<span class="distance">'+value.distance.toFixed(2)+'m</span></p>'+
				'</div>'+
			'</div>');
		}
   }); 

$('#listings').html(html);

});

$(document).on("click",".listing", function(event) {
	$(this).toggleClass('craved');
	Math.floor(Math.random() * 10)
	var num = $(this).data('num');
	num = num +1
	var a = $('#row'+num);
	a.after(replace.pop());
	a.remove();
	console.log(a);

});

$(document).on("touchend",".listing", function(event) {
	$(this).toggleClass('craved');
	Math.floor(Math.random() * 10)
	var num = $(this).data('num');
	num = num +1
	var a = $('#row'+num);
	a.after(replace.pop());
	a.remove();
	console.log(a);

});


});


