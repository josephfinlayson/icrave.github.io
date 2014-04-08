html = " ";
replace = []
loop_stop = false;

yelp_cats = ["bars", "restaurants", "coffee"]
html_bits = {}
$(document).ready(function() {
    var lat, long
        navigator.geolocation.getCurrentPosition(
            function(loc) {
                lat = loc.coords.latitude
                long = loc.coords.longitude
                yelp_cats.forEach(function(value) {
                    $.getJSON('http://api.yelp.com/business_review_search?term=&lat=' + lat + '&long=' + long + '&radius=1' +
                        '&ywsid=Cs40U808hHCR8WfUA_lhFw&category=' + value +
                        '&callback=?', {},
                        function(json, textStatus) {
                            console.log(json);
                            html_bits[value] = json;
                            $('#' + value).removeClass('disabled')
                        });

                });
            }
        );

    bind_clicks = function() {
        $('.category').each(function(index, val) {
            $(val).click(function(event) {
                console.log(val);
                render_page(this);
            });
        });
    }
    bind_clicks();

    show_cat = function(object){

    }

    show_home = function(){
        $('#homepage').show(); // show
        $('#navbar').hide();        
    }

    render_page = function(object) {
        
        console.log(html);
        $('#navbar').show();
        $('#category').html(cat); //sets the span

        $('#homepage').hide(); // hide homepage

        $('#navbar').click(function(event) {
            event.preventDefault()
            show_home();
            $('#navbar').hide();
            $('#content').html(old_content);
            jQuery(document).ready(function($) {
                console.log("biding")
                bind_clicks();
            });
        });
        $('#content').html(html);
    }
});

create_html = function(json) {
    var html_array = [];
    $.each(json.businesses, function(index, value) {
        // console.log(value.reviews[0].text_excerpt);
        html_array.push('<div class="row" id="row' + number + '">' +
            '<div id="listing-' + number + '" class="col-sm-2"><h1 data-num="' + number + '" class="listing center-block">-</h1></div>' +
            '<div class="col-sm-8">' +
            '<h3 class="name text-left">' + value.name + '</h3>' +
            '<p class="description text-left">' + value.reviews[0].text_excerpt +
            '<span class="distance">' + value.distance.toFixed(2) + 'miles away</span></p>' +
            '</div>' +
            '</div>');
    });
    return html_array;
}
// $(document).on("click",".listing", function(event) {
//  $(this).toggleClass('craved');
//  Math.floor(Math.random() * 10)
//  var num = $(this).data('num');
//  var a = $('#row'+num);
// });

$(document).on("touchend click", ".listing", function(event) {
    $(this).toggleClass('craved');
    Math.floor(Math.random() * 10)
    var num = $(this).data('num');
    num
    var a = $('#row' + num);
    a.fadeOut(400, function() {
        b = replace.pop();
        a.after($(b).fadeIn('fast'));
        a.remove();
    });
});
