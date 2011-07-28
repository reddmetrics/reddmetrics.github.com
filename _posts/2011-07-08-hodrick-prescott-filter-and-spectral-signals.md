---
layout: post
title: "Spectral signals and the hodrick-prescott filter"
---

{{ page.title }}
================

<p class="meta">08 July, 2011 - Dan Hammer</p>

The [Hodrick-Prescott filter](http://goo.gl/ljyWA) is commonly used to
parse cyclical behavior from an economic time-series.  Instead, we
applied the H-P filter to smooth time-series data from the Moderate
Resolution Imaging Spectroradiometer
([MODIS](http://modis.gsfc.nasa.gov/)) sensor aboard NASA's Terra and
Aqua satellites.  The MODIS sensors observe the earth's surface every
1 to 2 days, collecting data that can be used for earth systems
modeling.  We use the MODIS data to estimate forest clearing activity
in the tropics.  The H-P filter was originally built for business
cycles; but we applied it to natural cycles.

The [FORMA](http://www.cgdev.org/forest) project is a [Center for
Global Development](http://www.cgdev.org) initiative to provide
information on deforestation each month.  We -- the FORMA development
team -- are interested in the detection of steep, extra-seasonal drops
in the "greenness" of vegetation.  We use these abrupt changes to help
identify where and when forest clearing activity is occurring.  The
Normalized Difference Vegetation Index
([NDVI](http://www.glcf.umd.edu/data/ndvi/)) is closely correlated
with the health and density of terrestrial vegetation.  The NDVI data
stream, however, is subject to all sorts of problems, including
idiosyncratic error due to (among other things) persistent cloud
cover.  We are experimenting with different methods to smooth the
time-series over anomalous observations, but we've found that the H-P
filter works pretty well.

The graph below displays the a pre-conditioned NDVI time-series for a
1km x 1km tract of forested land in Indonesia between February 2000
and December 2010 [in blue].  We have already removed and interpolated
"unreliable" values, as indicated by an associated MODIS measurement
of the error from cloud cover (among other things). The H-P filter for
this NDVI time-series is also plotted [in red], with a smoothing parameter
&#0955; = 50.  The &#0955; parameter reflects the filter's sensitivity
to short-term variation in the NDVI.  As &#0955; increases, the
filtered curve approaches the OLS regression line -- which is not at
all sensitive to short-term fluctuations in the time-series.  As
&#0955; decreases, the filter approaches the original time-series; it
is absolutely sensitive to short-term variation.

<img src="http://dl.dropbox.com/u/5365589/hp-ndvi8.png" height="380"
width="591">

There is no standard value for the smoothing parameter.  For
quarterly economic data, Hodrick and Prescott suggest a &#0955; value
of 1600.  We apply our change detection algorithms to the filtered
NDVI series associated with many values of &#0955; in order to
identify the point at which there is a persistent and significant
decline in the vegetation index.  For this particular pixel, displayed
above, this point is around mid-2008.  

We are currently porting the entire FORMA system to
[Clojure](http://clojure.org/), a very elegant Lisp that allows us to
efficiently implement our algorithms on a cloud computation platform.
We therefore don't have to choose a &#0955; value <i>a priori</i> but
instead apply thousands of smoothing parameters to the data,
incorporating only the derived information that best represents the
signals from forest clearing activity.

I wasn't able to find a pre-written H-P filter in Clojure, so I wrote
my own.  I am relatively new to Clojure; and so,  please feel free
to tear this code apart.  

{% highlight clojure %}
;; Hodrick-Prescott filter

(use '(incanter core charts))

(defn insert-at
  "insert list [b] into list [a] at index [idx]."
  [idx a b]
  (let [opened (split-at idx a)]
    (concat (first opened) b (second opened))))

(defn insert-into-zeros
  "insert vector [v] into a vector of zeros of total length [len]
  at index [idx]."
  [idx len v]
  (insert-at idx (repeat (- len (count v)) 0) v))

(defn hp-mat
  "create the matrix of coefficients from the minimization problem
  required to parse the trend component from a time-series of le-
  gth [T], which has to be greater than or equal to 9 periods."
  [T]
  {:pre [(>= T 9)]
   :post [(= [T T] (dim %))]}
  (let [first-row  (insert-into-zeros 0 T [1 -2 1])
        second-row (insert-into-zeros 0 T [-2 5 -4 1])
        inner (for [x (range (inc (- T 5)))]
                   (insert-into-zeros x T [1 -4 6 -4 1]))]
    (matrix
      (concat [first-row]
             [second-row]
             inner
             [(reverse second-row)]
             [(reverse first-row)]))))

(defn hp-filter
  "return a smoothed time-series, given the HP filter parameter."
  [ts lambda]
  (let [T (count ts)
        trend-cond (solve 
                     (plus 
                       (mult lambda (hp-mat T))
                       (identity-matrix T)))]
    (mmult trend-cond ts)))

{% endhighlight %}
