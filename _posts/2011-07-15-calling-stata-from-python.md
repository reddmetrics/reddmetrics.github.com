---
layout: post
title: "Calling stata from python"
---

{{ page.title }}
================


<p class="meta">15 July, 2011 - Dan Hammer</p>

I think this may be useful to some poor souls in graduate school.  It has certainly been useful for me; and I am a poor soul in graduate school.  Suppose you want to scrape a website for data, prep it in Python, and then send it to Stata.  This standalone function will launch a do-file and pass parameters to the Stata process from within a Python script.

{% highlight python %}
## Python function to launch a do-file 
def dostata(dofile, *params):
    ## Launch a do-file, given the fullpath to the do-file
    ## and a list of parameters.
    import subprocess
    cmd = ["stata", "do", dofile]
    for param in params:
        cmd.append(param)
    return subprocess.call(cmd) 

{% endhighlight %}

Then, within the do-file, you can grab the parameters by setting locals or globals, as shown below.  Be sure to clear and exit Stata at the end of the script (and leave an extra line -- hit enter a couple of times at the end of the do-file) so that you can free up the subprocess and return to Python.

{% highlight clojure %}

## Stata do file, launched by the preceding Python function

clear all
set mem 100m
set more off

local param1 `1'
global param2 `2'

di "first parameter: `param1'"
di "second parameter: $param2"

exit, STATA clear

## Leave an extra line here, since the last line of the do-file
## will not get sent to the process.

{% endhighlight %}

Oh, and if one of the parameters is a list that you want to iterate through, you'll need to prep the Python list with this function before passing it to `dostata()`:

{% highlight python %}

def ls2stata(pylist):
    ## Convert a Python list into an object that can be read as
    ## a list in Stata from the commandline.
    statalist = '"' + " ".join(pylist) + '"'
    return statalist 

{% endhighlight %}
