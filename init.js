var SVG_WIDTH = document.documentElement.clientWidth - 20,
	SVG_HEIGHT = document.documentElement.clientHeight - 20;

var LPADDING = 60;
var RPADDING = 70;

// var SVG_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
// 	SVG_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var svg = d3.select("body").append('svg')
	.attr("width", SVG_WIDTH)
	.attr("height", SVG_HEIGHT)
;