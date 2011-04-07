---
layout: post
title: Malaysian Forest Clearing
---

{{ page.title }}
================

<p class="meta">06 April, 2011 - Dan Hammer</p>

The New York Times recently reported on the rapid rate of peatland forest clearing in Northern Borneo. The [Green Blog](http://goo.gl/kq286) featured the incredible work of researchers at [SarVision](http://www.sarvision.nl/), who have released high-resolution maps of deforestation in two-year increments.  The forest change detection system that we are refining, called [FORMA](http://www.cgdev.org/forest), has been designed to complement this sort of data with more frequent updates at lower spatial resolution.  We have embedded both the SarVision data and a selection of the FORMA data below, hoping to illustrate the comprehensive assessment of forest conversion that is now available for the Sarawak peatlands.
</br>

The raw SarVision data is available [here](http://goo.gl/yQfQQ) at 50m spatial resolution.  We have displayed the data in a Google Earth gadget below.  Green area indicates forest as of 2005; yellow, orange, and red areas indicate deforestation, 2005-2010.  Roughly 33 percent of coastal peatland forest in the Malaysian state of Sarawak has been cleared since 2005.
</br> 

<font color="#606060" size="1">You can view a static image of the Sarawak data [<font color="0000FF">here</font>](http://dl.dropbox.com/u/5365589/sarawak-sarvision.png), if you do not wish to download the Google Earth Plug-In.</font>
<script src="http://www.gmodules.com/ig/ifr?url=http://code.google.com/apis/kml/embed/embedkmlgadget.xml&amp;up_kml_url=http%3A%2F%2Fdl.dropbox.com%2Fu%2F5365589%2Fkml%2Ftmp.kml&amp;up_view_mode=earth&amp;up_earth_2d_fallback=0&amp;up_earth_fly_from_space=1&amp;up_earth_show_nav_controls=1&amp;up_earth_show_buildings=0&amp;up_earth_show_terrain=1&amp;up_earth_show_roads=1&amp;up_earth_show_borders=1&amp;up_earth_sphere=earth&amp;up_maps_zoom_out=0&amp;up_maps_default_type=satellite&amp;synd=open&amp;w=579&amp;h=400&amp;title=&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js"></script>

FORMA is now operational for the full tropics at 1km resolution, with planned improvements to 250m resolution.  We can therefore aim FORMA at Sarawak and animate the spread of clearing activity by month.  The video embedded below animates forest clearing from December 2005 through December 2010.  You can also download the slides ([PDF.zip](http://dl.dropbox.com/u/5365589/sarawak.pdf.zip), 6.8MB).

The FORMA data are released as probabilities.  Each pixel is assigned a probability of clearing activity between January 2000 and the given month.  In the animation, red pixels (1km grid cells) indicate areas with a high probability of clearing activity, while yellow pixels indicate areas with lower probabilities.  Only those pixels with a probability above a certain confidence threshold are displayed.  It looks like the spread of an infectious disease.  Or the blob.  Most forest clearing activity in this area expanded on plots that had been previously cleared; deforestation in this area is clustered, mostly likely for oil palm development.

<object width="589" height="480" id="player"><param name="movie" value="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3" /><param name="allowfullscreen" value="true" /><param name="allowScriptAccess" value="always"/><embed src="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="589" height="480"></embed></object>

We can use these data to examine the short-term spatial dynamics of forest clearing activity.  That is, we can begin to examine the economic drivers of deforestation, such as the price of oil palm or national interest rates.  This research will undoubtedly help to specify more effective conservation policy.  More on this research soon.
