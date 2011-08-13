---
layout: post
title: "Build your own map using Fusion Tables and Javascript"
---

{{ page.title }}
================


<p class="meta">10 August, 2011 - Robin Kraft</p>

In developing the mobile app [described in an earlier blogpost](http://www.reddmetrics.com/2011/07/13/forest-monitoring-app.html), I learned a lot about using Javascript and [Google Fusion Tables](http://www.google.com/fusiontables), Google's handy data publishing and visualization tool. So in this post, I'm going to show how to use [jQuery](http://www.jquery.com)'s <code>$.get</code> function to query a specific table and add the result to a map, as shown here.

\[Update: Check out the [comments](#disqus_thread) for an explanation of why you might want to do this.\]

<div id="map_canvas" style="height: 300px;">
    <!-- map loads here... -->
</div>
<script src="http://www.google.com/jsapi?key=ABQIAAAAahcO7noe62FuOIQacCQQ7RTHkUDJMJAZieEeKAqNDtpKxMhoFxQsdtJdv3FJ1dT3WugUNJb7xD-jsQ" type="text/javascript"></script>
<script type="text/javascript">
    google.load("maps", "3", {'other_params':'sensor=true'});
    google.load("jquery", "1.6.1");
</script>
<script type="text/javascript" src="../../../../js/ft_js_maps.js"></script>
<script>demoinit()</script>

Things to keep in mind:
<ol>
<li>I'll be using this query throughout this post:
{% highlight sql %}
SELECT p201012, lat, lon FROM 1043910 LIMIT 100
{% endhighlight %}</li>
<li>For the curious, this query retrieves the first hundred records from table 1043910, which contains data on forest clearing activity in Indonesia generated using satellite data and the <a href="http://www.cgdev.org/forma">FORMA</a> algorithm. <code>p201012</code> refers to the probability (0-100) of clearing as of December 2010 (we're up to June 2011 now, but it's not in the table).</li>
<li>One row returned by that query looks like this (probability, lat, lon):
<code>68,-7.870833,129.6253</code></li>
<li>The Javascript code driving the map is available in <a href="../../../../js/ft_js_maps.js">ft_js_maps.js</a></li>
</ol>
<br />
###Background on single origin policy and JSONP

For a Javascript newbie like me it was not entirely straightforward why I couldn't just use a standard Fusion Tables URL [like this one](http://www.google.com/fusiontables/api/query?sql=SELECT%20p201012,%20lat,%20lon%20FROM%201043910%20LIMIT%20100) to get data into a Javascript program. That query returns a comma-separated datafile, which you could easily parse using Javascript. However, [for security reasons](http://en.wikipedia.org/wiki/Same_origin_policy), a Javascript program can only retrieve documents or scripts - or data, in this case - stored on the same domain. The key exception to this rule is the mighty [JSONP](http://en.wikipedia.org/wiki/JSONP) object.

No idea what JSONP means, or why this exception exists? No problem! All you have to know is that Fusion Tables provides an [undocumented](https://groups.google.com/forum/#!topic/fusion-tables-users-group/TGDzExKymoI/discussion
) JSON API for getting a JSONP object back from a <code>GET</code> request. As far as I can tell, this is the only way to use Javascript to retrieve and manipulate raw data stored in Fusion Tables. But this means it's actually easy to query a table with Javascript - you just need to add <code>&jsonCallback=?</code> to the end of the URL used with the jQuery <code>$.get</code> function (see <code>queryUrlTail</code> below).

###Getting data

Let's assume your data and query are all set, and you're ready to retrieve some data. Here's what your query function might look like:

{% highlight javascript %}
function getData(table) {
    // Builds a Fusion Tables SQL query and hands the result to dataHandler()

    var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
    var queryUrlTail = '&jsonCallback=?'; // ? could be a function name
    
    // write your SQL as normal, then encode it
    var query = "SELECT p201012, lat, lon FROM " + table + " LIMIT 100";
    var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);

    var jqxhr = $.get(queryurl, dataHandler, "jsonp");
}
{% endhighlight %}

That last line is key. Without the third parameter, jQuery's <code>$.get</code> function will throw a cross-domain error:

{% highlight javascript %}
XMLHttpRequest cannot load [YOUR QUERY URL HERE]. Origin [SOME ORIGIN] is not
allowed by Access-Control-Allow-Origin.
{% endhighlight %}

So be sure to include <code>jsonp</code> as that third parameter. If all goes well, you'll get something like this:

{% highlight javascript %}
jQuery16109070935510098934_1312998050216({"table":{"cols":["p201012","lat","lon"],
"rows":[[32,-7.829167,131.2274],[25,-7.854167,131.3026],[29,-7.904167,131.2679]]}})
{% endhighlight %}

It may be helpful to know that Google [recently changed](http://groups.google.com/group/fusion-tables-users-group/browse_thread/thread/b909820434b5c191) how browsers interpret data from Fusion Tables. So although the returned data is actually JSON, your browser will think it's a CSV file. At the time of writing, [you could still safely ignore this](http://code.google.com/p/fusion-tables/issues/detail?id=118#c12) and assume you're getting JSON back from Fusion Tables.

###Creating markers from data

Now that we've got some data, let's add it to a map using the <code>dataHandler</code> function below. The only detail I want to point out is that for a JSON data object <code>d</code> the rows of data are actually stored in <code>d.table.rows</code>, as you might expect given the structure of the JSON object above. You then loop through the <code>rows</code> array and create a new marker for each "row", using the standard Google Maps code you already know.

{% highlight javascript %}
function dataHandler(d) {
    var data = d.table.rows;
    infoWindow = new google.maps.InfoWindow();
    
    for (var i = 0; i < data.length; i++) {
        var latlon = new google.maps.LatLng(data[i][1], data[i][2]);
        var probability = data[i][0];

        var marker = new google.maps.Marker({
            position: latlon,
            rowid: i,
            prob: probability,
            map: mymap
        });
        var fn = markerClickFunction(mymap, marker, infoWindow);
        google.maps.event.addListener(marker, 'click', fn);
    }
}
{% endhighlight %}

Note that I'm storing bits of data from the query inside the marker instance. Yes, you can add arbitrary attributes to Javascript objects! Am I the only one who didn't know that? Anyway, these custom attributes will be accessible to the infoWindow object activated by the listener. This comes in handy if you need to build an infoWindow from scratch using data from your query:

{% highlight javascript %}
function markerClick(map, m, ifw) {
    return function() {
        // In case there's already an infoWindow open
        ifw.close(map)
        
        // Build html content, using data stored in the marker instance
        var infoHtml = '<strong>rowid: '+ m.rowid + ' prob: ' + m.prob
        infoHtml += '</strong><br />' + m.position.toString() + "</p>";

        // Standard infoWindow initialization steps
        infoWindow.setContent(infoHtml);
        infoWindow.setPosition(m.position);
        infoWindow.open(map);
    };
}
{% endhighlight %}

And with that, we're done!