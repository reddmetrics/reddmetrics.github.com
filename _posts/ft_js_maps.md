---
layout: post
title: "How To: Add markers to a map using Fusion Tables"
---

{{ page.title }}
================


<p class="meta">10 August, 2011 - Robin Kraft</p>

In developing the mobile app \([described in an earlier blogpost](http://www.reddmetrics.com/2011/07/13/forest-monitoring-app.html)\), I learned a lot about using Javascript and \([Google Fusion Tables](http://www.google.com/fusiontables)\). So in this post, I'm going to show how to use ([jQuery](http://www.jquery.com)\)'s $.get function to query a specific table and add the result to a map, as shown here.

<div id="map_canvas" style="width: 600px; height: 300px;">
    <!-- map loads here... -->
</div>
<script src="http://www.google.com/jsapi?key=ABQIAAAAahcO7noe62FuOIQacCQQ7RTHkUDJMJAZieEeKAqNDtpKxMhoFxQsdtJdv3FJ1dT3WugUNJb7xD-jsQ" type="text/javascript"></script>
<script type="text/javascript">
    google.load("maps", "3", {'other_params':'sensor=true'});
    google.load("jquery", "1.6.1");
</script>
<script type="text/javascript" src="ft_js_maps.js"></script>
<script>demoinit()</script>

Things to keep in mind:
1. I'm new to Javascript and programming for the web, so my understanding of the why and wherefores may not be satisfying to the more seasoned developers among you.
2.  I'll be using this query throughout this post:

{% highlight sql %}
SELECT p201012, lat, lon FROM 1043910 LIMIT 100
{% endhighlight %}
3. For the curious, this retrieves the first hundred records from table 1043910, which contains data on forest clearing activity in Indonesia. <code>p201012</code> refers to the probability (0-100) of clearing as of December 2010 (we're up to June 2011 now, but it's not in the table).

One row returned by that query looks like this (probability, lat, lon):
<code>68,-7.870833,129.6253</code>

###Background on single origin policy and JSONP

For a Javascript newbie like me it was not entirely straightforward why I couldn't just use a standard Fusion Tables URL (\([like this one](http://www.google.com/fusiontables/api/query?sql=SELECT%20p201012,%20lat,%20lon%20FROM%201043910%20LIMIT%20100)\) to get data into a Javascript program. That gives you a comma-separated datafile, which you could easily parse using Javascript. However, for security reasons, a Javascript program can only retrieve documents or scripts - or data, in this case - from the domain it's hosted on. \([Details from Wikipedia here](http://en.wikipedia.org/wiki/Same_origin_policy)\). The key exception to this rule, as described in that article, is that JSONP objects can be retrieved.

No idea what JSONP means? Or why this exception exists? No problem! All you have to know is that there's an \([unofficial and undocumented](https://groups.google.com/forum/#!topic/fusion-tables-users-group/TGDzExKymoI/discussion
)\) Fusion Tables API for getting a JSONP object back from a <code>GET</code> request like the one your browser uses. As far as I can tell, this is the only way to have programmatic access to raw data stored in Fusion Tables via Javascript. But all you have to do is add <code>&jsonCallback=foo</code> to the end of the URL of interest.

###Getting data

Let's assume your data and query are all set. Here's what a query builder function might look like.

{% highlight javascript %}
function getData(table) {
    // Builds a Fusion Tables SQL query and hands the result to alertsHandler()

    var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
    var queryUrlTail = '&jsonCallback=?';

    // I find it easiest to write a "normal" SQL query, then encode it
    var query = "SELECT p201012, lat, lon FROM " + table + " LIMIT 100";
    var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);

    var jqxhr = $.get(queryurl, dataHandler, "jsonp");
}
{% endhighlight %}

The key is the last line. You can't simply use jQuery's <code>$.get</code> function without that last parameter. You'll get a cross-domain error like this:

<code>XMLHttpRequest cannot load [YOUR QUERY URL HERE]. Origin [SOME ORIGIN] is not allowed by Access-Control-Allow-Origin.</code>

So be sure to include <code>"jsonp"</code> as that last parameter. The result will be a JSON object something like the following.

{% highlight javascript %}
jQuery16109070935510098934_1312998050216({"table":{"cols":["p201012","lat","lon"],"rows":[[32,-7.829167,131.2274],[25,-7.854167,131.3026],[29,-7.904167,131.2679]]}}
{% endhighlight %}

You should know that Google \([recently changed](http://groups.google.com/group/fusion-tables-users-group/browse_thread/thread/b909820434b5c191)\) how browsers interpret data from Fusion Tables, so even if it's a JSON object your browser will think it's a CSV file. As of today, you can safely ignore this. But it can be surprising in testing. There's some further discussion \([here](http://code.google.com/p/fusion-tables/issues/detail?id=118#c12)\).

###Creating markers from data

Now that we've got some data, let's add it to a map using this <code>dataHandler</code> function. The only details of note is that for a JSON data object <code>d</code> the rows of data are actually stored in d.table.rows. Loop through that array and create a new marker for each "row". Creating the markers uses the standard Google Maps code you already know.

{% highlight javascript %}
function dataHandler(d) {
    var data = d.table.rows;

    for (var i = 0; i < data.length; i++) {
        var latlog = new google.maps.LatLng(data[i][1], data[i][2]);
        var name = data[i][0];

        var marker = new google.maps.Marker({
            position: latlon,
            title: i + " " + name,
            map: mymap
        });
    }
}
{% endhighlight %}

And with that, we're done!