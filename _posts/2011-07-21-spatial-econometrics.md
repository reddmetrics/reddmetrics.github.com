---
layout: post
title: "economic determinants of forest clearing activity"
---

{{ page.title }}
================


<p class="meta">21 July, 2011 - Dan Hammer</p>

The Meridian Institute recently prepared a [report](http://dl.dropbox.com/u/5365589/modalities.pdf) for the Government of Norway on REDD+ reference levels.  The primary authors are heavy hitters in the forest policy community, including Dan Zarin, Sandra Brown, and Arild Angelsen.  They suggest that reference levels should be calibrated to reflect economic conditions -- that a simple, multi-year average rate is not sufficient for establishing a business-as-usual scenario.  They do not specify, however, what those economic cofactors are, and how they affect forest clearing rates.  

FORMA can help, here.  FORMA was designed to support research into the economic drivers of deforestation.  The detection system's monthly turnaround, coupled with the ability to aggregate from pixel-level without bias, allows for the creation of a pretty rich panel data set.  A couple of cool new papers will be published soon, hopefully, which link forest clearing rates in Indonesia with lagged interest rates and the price of palm oil.  Until then, I thought I'd write a post on the estimation of spatial panels.  It turns out to be reasonably simple -- something that can be detailed in a blog post -- but it certainly didn't seem simple at the outset.

Suppose you have an application that can be described by the following generic system, a spatial error model with a spatial lag:

_y_ = &lambda;**W**_y_ + **X**_&beta;_ + _u_ </br>
_u_ = _&rho;_**W**_u_ + _&eta;_</br>

where _y_ is represents a vector organized by panel group and date; **X** is a matrix of cofactors, also organized as a panel dataset; and **W** is a spatial weights matrix, which identifies panel units that are _near_ each other.  For administrative units, _neighbors_ may be defined by whether the units have a common border.  This generic system is described in Anselin (1988) via Millo and Piras (2009), wherein the model is subject to spatial dependence in both the error term _u_ and the dependent variable _y_.  A maximum likelihood estimator is described in a few, recent publications -- and implemented in <font face="courier, bookman">R</font> through the <font face="courier, bookman">splm</font> package.  The code posted below reads in a standard dataset, admin_data.csv, alongside a shapefile of its administrative borders, admin\_borders.csv, and then estimates a spatial panel.  The spatial weights matrix is defined so that a non-zero entry in **W**<sub>*ij*</sub> indicates that unit *i* shares a border with unit *j*.  And in our case, each row of **W** sums to one; the weights matrix is row-standardized, and not a binary contiguity matrix.  The relevant code is below.  

This worked well for our application.  We have found some convincing evidence that forest clearing rates do in fact respond to short-term economic variables, such as real interest rates, commodity prices, and even cell phone coverage.  A cool, compact result is that the &lambda; coefficient is very significant, and big -- somewhere in the 0.4-0.6 range.  This implies (to an extent) that forest clearing will be clustered.  This is apparent from just looking at the maps.  Check out the map below, which highlights subprovinces with particularly high forest clearing rates in Southeast Asia between 2000 and 2005.  [Yellow to red indicates more intense clearing rates within the subset of subprovinces with high clearing rates.]  There is definitely some spatial inertia associated with deforestation.  Clusters of deforestation tend to bloom like an infectious disease; and these clusters, in turn, tend to be clustered.

<img src="/images/clustered2.png" width="580" align="left">

We have shock-tested the model, trying to test the robustness of these results.  For this, Amazon.com's cloud computation platform has come in handy -- and I'll post some relevant code in a subsequent post.  Using Amazon's platform, we can try hundreds, thousands, hundreds of thousands of specifications of the model, trying different temporal and spatial lag structures.  We can, in effect, approach some model specification -- and some summary of results -- non-parametrically, given the raw power now available to independent researchers.  

{% highlight r %}
## Basic R script to estimate a spatial panel model
## Install packages, if necessary
install.packages(c("maptools", "splm", "spdep"))

## Load packages
library(maptools)
library(splm)
library(spdep)

## Read in shapefile and CSV data. admin_borders is a shapefile.
## Note that readShapePoly() requires the spatial file name without
## an extension. admin_borders.shp should be stored at the same
## directory level as admin_borders.dbf and .prj.  Note, also,
## that the leftmost variables of admin_data.csv should be panel
## group ID and then date, if you choose not to use a panel data
## frame (look up pdata.frame).
data <- data.frame(read.csv("admin_data.csv"))
xx <- readShapePoly("admin_borders")

## Create spatial weights matrix.  The snap parameter for polygons
## will identify a neighboring unit, even if the borders are not 
## adjacent, but within 0.1 spatial units (arcdegrees in this case.).
## The style "W" will row-standardize the weighting matrix so that
## each row sums to 1.  zero.policy will allow for areal units with
## no links.  fm is the model that you want to estimate.
W <- nb2listw(poly2nb(xx, snap=.1), style = "W", zero.policy=TRUE)
fm <- y ~ X

## Spatial error model with spatial lag, based on Kapoor, et al. (2007)
spml.res <- spml(fm, data=data, listw=W, 
                     model="random", lag=TRUE, spatial.error="kkp")
(summary(spml.res))
{% endhighlight %}
