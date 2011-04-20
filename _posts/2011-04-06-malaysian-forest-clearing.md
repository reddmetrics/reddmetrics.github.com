---
layout: post
title: malaysian forest clearing
---

{{ page.title }}
================

<p class="meta">06 April, 2011 - Dan Hammer</p>

We are currently working to refine a forest monitoring tool originally
developed at the Center for Global Development.  The tool, called
FORMA, filters streaming satellite imagery toward a tractable estimate
of forest clearing activity in the humid tropics at 1km spatial
resolution.  The intent of the system is to facilitate conservation
payment schemes by releasing public and timely alerts on forest
disturbance.  

The FORMA alerts will be posted each month, and are meant to
complement high resolution estimates of deforestation, which are
updated less frequently.  [The New York Times](http://goo.gl/kq286),
for example, recently featured the awesome work of researchers at
[SarVision](http://www.sarvision.nl/), who have released detailed
[maps](http://goo.gl/yQfQQ) (approx. 50m resolution) of deforestation
in the Malaysian state of Sarawak in two-year increments.  SarVision
researchers found that roughly 33 percent of coastal peatland forests
in this area have been cut down since 2005 -- mostly to clear way for
palm oil plantations.  The SarVision maps are displayed below in a
Google Earth gadget.
 
<font color="#606060" size="1">You can view a static image of the
Sarawak data [<font
color="0000FF">here</font>](http://dl.dropbox.com/u/5365589/sarawak-sarvision.png),
if you do not wish to download the Google Earth Plug-In.</font>
<script
src="http://www.gmodules.com/ig/ifr?url=http://code.google.com/apis/kml/embed/embedkmlgadget.xml&amp;up_kml_url=http%3A%2F%2Fdl.dropbox.com%2Fu%2F5365589%2Fkml%2Ftmp.kml&amp;up_view_mode=earth&amp;up_earth_2d_fallback=0&amp;up_earth_fly_from_space=1&amp;up_earth_show_nav_controls=1&amp;up_earth_show_buildings=0&amp;up_earth_show_terrain=1&amp;up_earth_show_roads=1&amp;up_earth_show_borders=1&amp;up_earth_sphere=earth&amp;up_maps_zoom_out=0&amp;up_maps_default_type=satellite&amp;synd=open&amp;w=579&amp;h=400&amp;title=&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js"></script>

FORMA is now operational for the full tropics at 1km resolution, with
planned improvements to 250m resolution.  We aimed the FORMA system at
Sarawak in order to animate the monthly spread of clearing activity
from December 2005 through December 2010.  The video is embedded
below; the slides are available for download
[here](http://dl.dropbox.com/u/5365589/sarawak.pdf.zip) (pdf.zip,
6.8MB).  

The brown pixels indicate areas that had been cleared between 2000 and
2005.  This data set ([Hansen, et al.](http://goo.gl/HqvCW)) serves as
our training data -- the measure of clearing activity that we use to
calibrate our detection algorithms.  The yellow-to-red pixels that
light up after Dec 2005 are FORMA estimates of clearing
activity.  Any pixel that lights up represents an area that had been
subject to forest clearing activity between Dec 2005 and the specified
month.  Yellow pixels indicate areas with low signals of clearing
activity -- but still sufficiently high to exceed our confidence
threshold.  Red pixels represent areas with strong signals.  

<object width="589" height="480" id="player"><param name="movie"
value="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3"
/><param name="allowfullscreen" value="true" /><param
name="allowScriptAccess" value="always"/><embed
src="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3"
type="application/x-shockwave-flash" allowscriptaccess="always"
allowfullscreen="true" width="589" height="480"></embed></object>

We can now use these data to examine the short-term spatial dynamics
of deforestation.  For example, most of the clearing activity in this
area took place on the periphery of previously cleared plots.  We are
currently working to better understand the economic drivers of
deforestation through research on the formation of new clusters of
deforestation.  And we are relying on FORMA to flag the formation of
clusters at high temporal resolution.  More to come -- and soon!
