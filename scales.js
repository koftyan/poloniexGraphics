function draw_cands(err, data) {
	if(err) throw err;
	else {
		function min(a, b){ return a < b ? a : b ; }

		function max(a, b){ return a > b ? a : b; }

		var cands = JSON.parse(data.response);

		var w_scale = d3.scale.linear()
			.domain([
				d3.min(cands, function(d) {
					return d.date;
				}),
				d3.max(cands, function(d) {
					return d.date;
				})
			])
			.range([0 + LPADDING, SVG_WIDTH - RPADDING])
		;

		var h_scale = d3.scale.linear()
			.domain([
				d3.min(cands, function(d) {
					return d.low - 50;
				}),
				d3.max(cands, function(d) {
					return d.high + 150;
				})
			])
			.range([SVG_HEIGHT, 0])
		;

		var price_scale = d3.scale.linear()
			.domain([
				d3.min(cands, function(d) {
					return d.low;
				}),
				d3.max(cands, function(d) {
					return d.high;
				})
			])
			.range([SVG_HEIGHT, 0 + 4])
		;

		stem = svg.selectAll(".stem")
			.data(cands)
			.enter()
			.append("line")
			.attr("class", "stem")
			.attr('x1', function(d) {return w_scale(d.date) + (0.5 * (SVG_WIDTH / cands.length));})
			.attr('x2', function(d) {return w_scale(d.date) + (0.5 * (SVG_WIDTH / cands.length));})
			.attr('y1', function(d) {return h_scale(d.low);})
			.attr('y2', function(d) {return h_scale(d.high);})
			.attr("stroke", function(d){ return d.open > d.close ? "#ff1a1a" : "#1aff1a"; })
			.attr('stroke-width', 0.3 * (SVG_WIDTH / cands.length))
		;

		var candels = svg.selectAll(".cands")
			.data(cands)
			.enter()
			.append("rect")
			.classed("cands", true)
		;

		candels
			.attr("x", function(d) {
				return w_scale(d.date);
			})
			.attr("y", function(d) {
				return h_scale(max(d.close, d.open));
			})
			.attr('height', function(d) {
				return h_scale(min(d.open, d.close))-h_scale(max(d.open, d.close));
			})
			.attr('width', function(d) {
				return SVG_WIDTH / cands.length;
			})
			.attr("fill",function(d) {
				return d.open > d.close ? "#ff1a1a" : "#1aff1a" ;
			})
		;


		var y_axis = d3.svg.axis()
			.scale(h_scale)
			.orient('right')
			.ticks(15)
		;

		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + (SVG_WIDTH - RPADDING + (SVG_WIDTH / cands.length) + 30) + ",0)")
			.call(y_axis);
		;
	}
}