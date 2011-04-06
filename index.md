---
layout: default
title: REDD Metrics
---

<div id="home">
	
	<div>
	Founded in early 2011, REDD Metrics, LLC, applies innovations in large-scale spatial data processing to questions in environmental and resource economics.  This site is very new, and will be further developed in the coming months as our projects progress.  In the meantime, please feel free to find out a little more about us and our work - and please subscribe to our <a href="blog.html">blog</a>, which will track our research in economics and large-scale spatial computing.  Sign up <a href="http://goo.gl/nrNs1">here</a> for our intermittent e-mails.
	</div>
	</br>

	<h1>Projects</h1>
	<ul class="projects">
		<li>Large-scale implementation of change detection algorithms </br>
			<div> Employing the power of cloud computing to detect changes in earth systems using satellite imagery over wide geographic areas.
			</div>
		</li> 
		</br>
		
		<li>Economic analysis of natural resource use and management</br> 
			<div> Identifying economic determinants of resource consumption. For example, how do interest rates or agricultural prices affect the rate of forest clearing in Indonesia?
			</div>
		</li> 
		</br>
		
		<li>Predictive modeling of spatial processes </br>
			<div>Using massive spatial datasets and cutting-edge spatial modeling techniques to predict the flow of environmental phenomena over space and time.
			</div>
		</li> 
		</br>
		
		<li>Development of mobile apps to disseminate and collect environmental data </br>
			<div>Enhancing on-the-ground natural resource management by syncing local field data with indicators from large-scale spatial datasets.
			</div>
		</li> 
		</br>
	</ul>
	
	<h1>Recent Posts</h1>
	<ul class="posts">
	    {% for post in site.posts %}
	      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
	    {% endfor %}
	</ul>
</div>
