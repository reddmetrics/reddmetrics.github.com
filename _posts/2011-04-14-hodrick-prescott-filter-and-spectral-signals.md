---
layout: post
title: "spectral signals and the hodrick-prescott filter"
---

{{ page.title }}
================

<p class="meta">14 April, 2011 - Dan Hammer</p>

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

The graph below displays the NDVI time-series (in blue) for a 1km x
1km tract of forested land in Indonesia between January 2000 and
September 2010.  The red line tracks the filtered time-series, with a
&#0955; parameter (temporal smoothing parameter) of 3.15.  This
parameter determines the sensitivity to short-term variation in the
original time-series.  As &#0955; increases, the filtered time-series
approaches the ordinary least squares regression line (not at all
sensitive to short term variation).  A &#0955; value of 0 will yield
the original time-series (absolutely sensitive to short-term
variation).

<img src="http://dl.dropbox.com/u/5365589/ndvi-filt.png" height="380"
width="589">

There is no standard value for the smoothing parameter, &#0955;.  For
quarterly economic data, Hodrick and Prescott suggest a &#0955; value
of 1600.  It is likely that the appropriate &#0955; value for this
application is much smaller, and probably less than one.  But we don't
have to choose <i>a priori</i>.  We are able to implement our
[Clojure](http://clojure.org/) code (posted below) on a cloud
computation platform.  Leveraging the full utility of mutable data
structures, we can launch hundreds of virtual machines to apply
hundreds of &#0955; values to billions (literally) of pixels at very
low cost (in terms of both time and money).  We can then test to see
which value is best suited to identifying forest clearing activity.
All in all, this smacks of non-parametrics.

The value of the H-P filter may not be readily apparent.  There is a
lot of noise in the time-series graph; the actual signal is almost
indistinguishable.  Still, the pattern observed from mid-2008 onward
is indicative of clearing activity.  Without the veritable battery of
smoothing and quality control algorithms that we apply to precondition
the time-series, our subsequent change detection algorithms would have
missed the slow-ish decline in vegetation.

I am relatively new to Clojure.  I wasn't able to find an
implementation of the H-P filter in Clojure, and so I wrote and posted
the following code -- with very helpful suggestions from the other
members of the team.  Hopefully, this will save some people time; and
any suggestions or comments would be greatly appreciated.

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
        coeff-matrix (mult lambda (hp-mat T))
        trend-cond (solve (plus coeff-matrix (identity-matrix T)))]
    (mmult trend-cond ts)))

{% endhighlight %}
