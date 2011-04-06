---
layout: post
title: Malaysian Forest Clearing
---

{{ page.title }}
================


<p class="meta">04 April, 2011 - Dan Hammer</p>

The New York Times recently reported on the rapid rate of peatland forest clearing in Northern Borneo. The [Green Blog](http://goo.gl/kq286) featured the incredible work of researchers at [SarVision](http://www.sarvision.nl/), who found that 33 percent of coastal peatland forest in the Malaysian state of Sarawak had been cleared since 2005.  Their map of clearing activity is displayed below in Google Earth; their raw data can be found [here](http://goo.gl/yQfQQ).  The green area is forest in 2005; yellow, orange, and red areas indicate deforestation, 2005-2010.   This high spatial resolution data (approx. 50m resolution) is indispensable for the assessment of conservation efforts.
</br>

We built FORMA to complement this work with monthly updates at lower spatial resolution.  Currently, the FORMA system is operational at 1km resolution, with planned improvements to 250m resolution.  We are now able to aim the FORMA system at the Sarawak region, animating the monthly spread of clearing activity.  An animation of forest clearing from December 2005 through December 2010 is embedded below; you can also download the slides ([PDF.zip](http://dl.dropbox.com/u/5365589/sarawak.pdf.zip), 6.8MB). 

<font color="#606060" size="1">You can view a static image of the Sarawak data [<font color="0000FF">here</font>](http://dl.dropbox.com/u/5365589/sarawak-sarvision.png), if you do not wish to download the Google Earth Plug-In.</font>
<script src="http://www.gmodules.com/ig/ifr?url=http://code.google.com/apis/kml/embed/embedkmlgadget.xml&amp;up_kml_url=http%3A%2F%2Fdl.dropbox.com%2Fu%2F5365589%2Fkml%2Ftmp.kml&amp;up_view_mode=earth&amp;up_earth_2d_fallback=0&amp;up_earth_fly_from_space=1&amp;up_earth_show_nav_controls=1&amp;up_earth_show_buildings=0&amp;up_earth_show_terrain=1&amp;up_earth_show_roads=1&amp;up_earth_show_borders=1&amp;up_earth_sphere=earth&amp;up_maps_zoom_out=0&amp;up_maps_default_type=satellite&amp;synd=open&amp;w=579&amp;h=400&amp;title=&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js"></script>

The FORMA data are released as probabilities.  Each pixel is assigned a probability of clearing activity between January 2000 and the given month.  In the animation, red pixels (1km grid cells) indicate high probabilities of clearing activity, while yellow pixels indicate lower probabilities.  Only those pixels with a probability above a certain confidence threshold are displayed.  It looks like the spread of an infectious disease.  Or the blob.

We can use these data to examine the short-term spatial dynamics of forest clearing activity.  That is, we can begin to examine the economic drivers of deforestation, such as the price of oil palm or national interest rates.  This research will undoubtedly help to specify more effective conservation policy.  More on this research soon.

<object width="589" height="480" id="player"><param name="movie" value="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3" /><param name="allowfullscreen" value="true" /><param name="allowScriptAccess" value="always"/><embed src="http://www.authorstream.com/player.swf?p=939674_634376370339997500&pt=3" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="589" height="480"></embed></object>

<!-- <div><h3 style="padding: 0px; margin: 3px;"><a href="http://www.authorstream.com/Presentation/danhammer-939646-forma-sarawak/" target="_blank" style="font:normal 18px,arial;"></a></h3><object width="589" height="480" id="player"><param name="movie" value="http://www.authorstream.com/player.swf?p=939646_634376350539997500&pt=3" /><param name="allowfullscreen" value="true" /><param name="allowScriptAccess" value="always"/><embed src="http://www.authorstream.com/player.swf?p=939646_634376350539997500&pt=3" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="589" height="480"></embed></object><div  style="font-family: arial; font-style: normal; font-variant: normal; font-weight: normal;font-size: 11px; line-height: normal; font-size-adjust: none; font-stretch: normal;"> <a href="http://www.authorstream.com/" target="_blank"></a>  <a href="http://www.authorstream.com/User-Presentations/danhammer/" target="_blank"></a></div></div> -->

<!-- <object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/bXQMrbiP-3M?hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/bXQMrbiP-3M?hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="586" height="400"></embed></object> -->
