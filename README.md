# FixedBar
---
A plugin of a bar which is fixed at top.

## How to use ?
	<script type="text/javascript" src="pathTo/FixedBar.min.js"></script> // Linking into html with tag 'script'
	
then add few scripts , for example :

	var fixedBarObject = new FixedBox(document.getElementById('fixedBar')); 
	AddEvent( window, 'scroll', function () {
	    fixedBarObject.setCss('originClass', 'changeClass');
	});
