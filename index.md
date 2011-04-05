---
layout: default
title: REDD Metrics
---

<div id="home">
	
	<div>
	Founded in early 2011, REDD Metrics, LLC, is a group that applies innovations in large-scale spatial data processing to questions in environmental and resource economics.  This site is very new, and will be further developed in the coming months.  In the meantime, please feel free to find out a little more about us and our projects - and please subscribe to our blog, which will track our work in  economics and large-scale spatial processing.  Sign up <a href="http://goo.gl/nrNs1">here</a> to for our intermittent e-mails.  
	</div>
	</br>

	<h1>Projects</h1>
	<ul class="projects">
		<li>Large-scale implementation of change detection algorithms </br>
			<div> Employing the full power of cloud computation to detect changes in phenomena detected from satellite imagery.
			</div>
		</li> 
		</br>
		
		<li>Economic analysis of natural resource management </br> 
			<div> Econometric analysis to assess the economic determinants of resource consumption. An archetypal question is, "How do interest rates, set today, affect the rate of forest clearing activity in 8 months?"
			</div>
		</li> 
		</br>
		
		<li>Predictive modeling of spatial processes </br>
			<div> Econometric analysis to assess the economic determinants of resource consumption. An archetypal question is, "How do interest rates, set today, affect the rate of forest clearing activity in 8 months?"
			</div>
		</li> 
		</br>
		
		<li>Mobile app development to disseminate real-time environmental information </br>
			<div> Building an app on the Android platform that will alert users to monthly forest clearing activity in the humid tropics.  The app will be synched with the <a href="http://opendatakit.org/">Open Data Kit</a> project to allow for data collection.
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