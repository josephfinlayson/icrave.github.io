html = " ";
replace = []
loop_stop = false;

yelp_cats = ["bars", "restaurants", "coffee"]
html_bits = {}
var lat, long
    $(document).ready(function() {
        $('#content').css("min-height", $(window).height() )
        
        
        navigator.geolocation.getCurrentPosition(
            function(loc) {
                lat = loc.coords.latitude
                long = loc.coords.longitude
                yelp_cats.forEach(function(value) {
                    $.getJSON('http://api.yelp.com/business_review_search?term=&lat=' + lat + '&long=' + long + '&radius=1' +
                        '&ywsid=Cs40U808hHCR8WfUA_lhFw&category=' + value +
                        '&callback=?', {},
                        function(json, textStatus) {
                            html_bits[value] = json;
                            $('#' + value).removeClass('disabled')
                        });

                });
            }
        );

        bind_clicks = function() {
            $('.category').each(function(index, val) {
                $(val).click(function(event) {
                    console.log(event);
                    event.preventDefault();
                    show_cat($(this).attr('id'));
                });
            });

            $('#navbar').click(function(event) {
                event.preventDefault();
                show_home()
            });

        }
        bind_clicks();

        show_cat = function(cat) {

            $('#navbar').show();
            $('#category').html(cat); //sets the span 
            $('#homepage').hide(); // hide homepage

            var html_string = render_html(cat, 10)
            $('#homepage').after(html_string);
        
        }

        show_home = function() {
            $('#homepage').show(); // show
            $('#navbar').hide();
            $('.row').remove();
        }
        //returns html_string of X amount of items
        render_html = function(cat, items) {
            var html_string = "";
            var html_array = create_html(html_bits[cat]);
            for (var i = html_array.length - 10; i >= 0; i--) {
                html_string += html_array.pop();
            };
            return html_string;
        }
    });

create_html = function(json) {
    var html_array = [];
    var number = 0;
    $.each(json.businesses, function(index, value) {
        number++
        html_array.push('<div class="row" id="row' + number + '">' +
            '<div id="listing-' + number + '" class="col-sm-2"><h1 data-num="' + number + '" class="listing center-block">-</h1></div>' +
            '<div class="col-sm-8">' +
            '<h3 class="name text-left">' + value.name + '</h3>' +
            '<p class="description text-left">' + value.reviews[0].text_excerpt +
            '<a href="' + generate_maps_url(value) + '"' +
            '<span class="distance">' + value.distance.toFixed(2) + 'miles away</span></p>' +
            '</a>' +
            '</div>' +
            '</div>');
    });
    return html_array;
}

generate_maps_url = function(value) {
    var root = "http://maps.google.co.uk/maps?"
    var start = "saddr=" + lat + ',' + long + '&'
    var end = "daddr=" + value.address1 + '+' + value.address2 + '+' + value.zip + '&'
    var transport_method = "dirflg=w"
    return root + start + end + transport_method;
}

$(window).bind('popstate', function(event) {
    event.preventDefault()
    show_home();
});

$(document).on("touchend click", ".listing", function(event) {
    $(this).toggleClass('craved');
    var num = $(this).data('num');
    var a = $('#row' + num);
    a.fadeOut(400, function() {
        b = replace.pop();
        a.after($(b).fadeIn('fast'));
        a.remove();
    });
});
