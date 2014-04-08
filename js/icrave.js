html = " ";
replace = []
loop_stop = false;

yelp_cats = ["bars", "restaurants", "coffee"]
html_bits = {}
$(document).ready(function() {
    var lat, long
    navigator.geolocation.getCurrentPosition(
        function(loc){
            lat = loc.coords.latitude
            long = loc.coords.longitude
            yelp_cats.forEach(function(value) {
                $.getJSON('http://api.yelp.com/business_review_search?term=&lat='+lat+'&long='+long+'&radius=1'+
                    '&ywsid=Cs40U808hHCR8WfUA_lhFw&category=' + value +
                    '&callback=?', {},
                    function(json, textStatus) {
                        html_bits[value] = json;
                        $('#'+value).removeClass('disabled')
                    });

            });
        }
    );


bind_clicks = function() {
    $('.category').each(function(index, val) {
        $(val).click(function(event) {
            render_page(this);
        });
    });
}
bind_clicks();

    render_page = function(object) {
        var cat = $(object).attr('id');
        var html = render_html(html_bits[cat]);
        $('#navbar').show();
        $('#category').html(cat);
        var old_content = $('#content').html();
        $('#navbar').click(function(event) {
            event.preventDefault()
            $('#navbar').hide();
            $('#content').html(old_content);
            bind_clicks();
        });
        $('#content').html(html);

    }
});

render_html = function(json){
    var number = 0;
   $.each(json.businesses, function(index, value) {
   	number++;
   	// console.log(value.reviews[0].text_excerpt);
   	if (loop_stop !== true) {
   	 	html += '<div class="row" id="row'+number+'">'+
			'<div id="listing-'+number+'" class="col-sm-2"><h1 data-num="'+number+'" class="listing center-block">-</h1></div>'+
			'<div class="col-sm-8">'+
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
				'<div id="listing-'+number+'" class="col-sm-2"><h1 data-num="'+number+'" class="listing center-block">-</h1></div>'+
				'<div class="col-sm-8">'+
					'<h3 class="name text-left">'+String(value.name)+'</h3>'+
					'<p class="description text-left">'+value.reviews[0].text_excerpt+
					'<span class="distance">'+value.distance.toFixed(2)+'m</span></p>'+
				'</div>'+
			'</div>');
		}
   }); 
    return html;

}


// $(document).on("click",".listing", function(event) {
// 	$(this).toggleClass('craved');
// 	Math.floor(Math.random() * 10)
// 	var num = $(this).data('num');
// 	var a = $('#row'+num);
// });

$(document).on("touchend click",".listing", function(event) {
	$(this).toggleClass('craved');
	Math.floor(Math.random() * 10)
	var num = $(this).data('num');
	num
	var a = $('#row'+num);
	a.fadeOut(400, function(){
		b=replace.pop();
		a.after( $(b).fadeIn('fast') );
		a.remove();
	});
});
