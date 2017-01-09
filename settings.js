function draw_vol(err, data) {
	if(err) throw err;
	else {
		var cands = JSON.parse(data.response);
		var volume = [];
		var date = [];

		for(var t = 0; t < cands.length - 1; t++) {
			volume.push(cands[t].volume);
		}

		for(var r = 0; r < cands.length - 1; r++) {
			date.push(cands[r].date);
		}

		// console.log(d3.max(date, function(d) {return d;}));
		// console.log(d3.max(volume, function(d) {return d;}));
		// // console.log(volume);

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
					return d.volume;
				}),
				d3.max(cands, function(d) {
					return d.volume;
				})
			])
			.range([SVG_HEIGHT, 0 + 4])
		;

		var color_scale = d3.scale.linear()
			.domain([
				d3.min(cands, function(d) {
					return d.volume;
				}),
				d3.max(cands, function(d) {
					return d.volume;
				})
			])
			.range([60, 20])
		;

		var time_scale = d3.time.scale.utc()
			.domain([
				d3.min(cands, function(d) {
					return new Date(d.date * 1000);
				}),
				d3.max(cands, function(d) {
					return new Date(d.date * 1000);
				})
			])
			.range([0 + LPADDING, SVG_WIDTH - RPADDING])
		;

		//console.log(w_scale(cands));
		var rects = svg.selectAll("rect")
			.data(cands)
			.enter()
			.append("rect")
		;

		rects.attr('x', function(d,i) {
			return w_scale(d.date);
		})
			// .attr('y', function(d) {return SVG_HEIGHT - d.volume; })
			.attr('y', function(d) {return h_scale(d.volume);})
			.attr('width', function(d) {
				return SVG_WIDTH / cands.length;
			})
			.attr("height", function(d) {
				return SVG_HEIGHT - h_scale(d.volume);
			})
			// .attr("padding", 1)

			.attr('fill', function(d, i) { return 'hsl(' + 200 + ','+ 40 +'%,'+ color_scale(d.volume) +'%)'; })
		;

		var x_axis = d3.svg.axis();
		x_axis.scale(time_scale)
			.orient("bottom")
			.ticks(15)
		;

		svg.append("g")
			.attr("class", "axis")
			.call(x_axis)
		;

		var y_axis = d3.svg.axis()
			.scale(h_scale)
			.orient('left')
			.ticks(15)
		;

		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + LPADDING + ",0)")
			.call(y_axis);
		;
	}
}