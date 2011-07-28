---
layout: post
title: "Forest monitoring - there's an app for that (coming soon)"
---

{{ page.title }}
================


<p class="meta">13 July, 2011 - Robin Kraft</p>

The team behind [FORMA](http://www.cgdev.org/forma) (some members of which also founded REDD Metrics) has been working hard to generate and share rapidly updated data on forest clearing for dozens of countries in the humid tropics. We've tried graphs, cool animated Powerpoint presentations \([example](http://www.reddmetrics.com/2011/04/06/malaysian-forest-clearing.html)\), and the like, but as any data junkie knows, raw datasets usually do not provide immediately actionable information. So as we prepare a major update to the FORMA data, instead of just dumping geotiffs on a server, emailing our friends a huge time series dataset, or setting up a fancy GIS server, we're going mobile!

That is, thanks to support from the World Bank's Innovation Fund we're readying a simple mobile app to allow technical and non-technical users alike to query and visualize the latest FORMA data (Android/iPhone/desktop), and collect field data in response (Android 2.3+ only). We'll of course provide raw data for our data junkie brothers and sisters, but for this post let's stick to screenshots and smartphones. We'll put up a link to the app itself once the data are ready later this summer.

###Background

For background, FORMA (Forest Monitoring for Action) is designed to quickly detect recent forest clearing events across the humid tropics, throwing up a virtual red flag in a given pixel each month when something is amiss. More specifically, FORMA algorithms analyze 1km resolution [MODIS satellite imagery](https://lpdaac.usgs.gov/lpdaac/products/modis_overview) and generate a map each month of recent clearing activity, based on anomalous patterns of fires and changes in vegetation cover. But enough of that - we're here to talk about apps!

###Data display

The data display component is actually a mobile-optimized web page (hat tip to Google Fusion Tables and jQuery Mobile). After choosing a country and period of interest between January 2006 through the last month or two, you'll see clusters of forest clearing alerts for that period displayed in Google Maps (image on the left). Keep zooming in or clicking on clusters to see clusters break into smaller ones and resolve to individual alerts you can click on. Click on an alert to find out more about that location (middle image), including protected status, ecosystem type, and NDVI and fires data going back to 2000. You can also turn on or off background datasets (IUCN protected areas and historical clearing data from FORMA or South Dakota State), or only see alerts that fall inside IUCN protected areas (image on the right).

<center><img src="/images/app/indonesia_small.png" height="288"> <img src="/images/app/alert_small.png" height="288"> <img src="/images/app/layers_small.png" height="288"></center>

It's pretty basic functionality, but it allows you to explore the data with nothing more than a modern web browser (smartphone or desktop) and an internet connection. So far we've tested this with the latest versions of Chrome, Safari and the iPhone/Android browsers. There's a lot more we'd like to do with the data exploration side of things, but we want to keep things simple for the time being and not tax your smartphones too much.

###Data collection

Using Open Data Kit (ODK), we've set up an online repository for field data collected on the ground using Android phones and the ODK Collect app. This works offline, so there's no need to have a 3G connection in the jungle! Using a simple survey (see below), we hope to work with local partners to collect data on what is actually happening on the ground in forests across the tropics, instead of just publishing alerts that represent whatever we can discern from space. This repository will be open to anyone who wants to use the field data, which will hopefully help limit redundant data collection. After all, we're not the only ones who want to collect and use ground-verified data!

<center>
<img src="/images/app/collect.png" height="320"> <img src="/images/app/pic.png" height="320">
</center>
###Final thoughts - transparency and environmental outcomes

Ultimately, while we hope that "citizen scientists" will help us improve our algorithms through this data feedback loop, the broader goal is to improve the outcomes of environmental policies by ensuring that data on the state of the world's forests aren't stuck in reports or databases that most people won't see or use. National governments, businesses and NGOs may have great data on what is happening on the ground, but if it's not easy to use or share it's not having the full impact it could have.

We ourselves have benefitted enormously from billions of dollars of investments in satellite and information systems, and millions of hours devoted to developing open source software. So it's easy to justify releasing data for free in whatever formats will see the most use. More important though is the potential for a richer information ecosystem to help local people react to local environmental degradation, without requiring them to learn GIS just to get started.

We'd love to hear your thoughts about how best to release data or improve data display and collection, so feel free to leave a comment. If you could check your phone for the latest info on forest clearing in your area, what would you do with it? What would you want to know? We're still finalizing data and features, so there's time to make changes before we start handing out links to the maps and data repositories.

####p.s.
We know that smartphones are expensive, but they're often cheaper than GPS devices. The cheapest Android phone we [found](http://www.pcworld.idg.com.au/review/mobile_phones/huawei/ideos_u8150/363402) is $150, and while performance isn't great we can expect prices to drop and performance to improve over the next year or two. So yes, this isn't exactly accessible to everyone who might want this kind of information, but it's not that far off. And using a simple smartphone app is cheaper and arguably more convenient than setting up an entire workstation with GIS software.
