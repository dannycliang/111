(function() {
  var dat = [ { label: '<14', b: 5 },
            { label: "15-19", b: 320 },
            { label: "20-29", b: 676 },
            { label: "30-39", b: 138 },
            { label: "40-49", b: 14 },
            { label: "50-59", b: 4 },
            { label: "60-69", b: 1 }
            ];

var svg = d3.select('.Results42')
              .append('svg')
              .attr('width', 1100)
              .attr('height', 300)
              .append('g')
              .attr('transform', 'translate(' + (150) + ',' + (150) + ')');

            var arc = d3.arc()
              .innerRadius(0)
              .outerRadius(80);

              var tip = d3.tip()
                          .attr('class', 'd3-tip')
                          .offset([-50, 200])
                          .style('font-family', 'Hind')
                          .html(function(d) {
                              return "<span>" + d.data.label + " " +  Math.round(d.data.b * 100 / 1158, 4) + "%" + "</span>";
                          })


                          svg.call(tip);

              var expandedArc = d3.arc()
                .innerRadius(function(d) { return 10; })
                .outerRadius(function(d) { return 80; });

        // 4) Specify the proportion of the "pie" each slice should take, based off user functions.
            var pie = d3.pie()
                .startAngle(1.1*Math.PI)
                .endAngle(3.1*Math.PI)
                .value(function(d) { return d.b; });


        // 5) Add the previous elements to the graph, and add user-specified color.
            var color = d3.scaleOrdinal(d3.schemeCategory20b);
            var path = svg.selectAll('path');
                    path
                    .data(pie(dat))
                    .enter()
                    .append('path')
                    // Add tooltips and color change on hover over slices
                    .on('mouseover', function(d) {
                        tip.show(d);
                        d3.select(this).style("fill", "#a8c1dd");
                    })
                    .on('mouseout', function(d) {
                        tip.hide(d);
                        d3.select(this).style("fill", function(d) { return color(d.data.b); })
                    })
                    // Separate slice slightly if it is clicked
                    .on('click', function(d) {
                        d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("d", expandedArc);
                    })
                    // Animation on load
                    .transition().delay(function(d,i) { return i * 1000; }).duration(1000)
                    .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d)
                        }
                    })
                    .attr('fill', function(d) { return color(d.data.b); });



            // 6) Add a legend, if requested
                var legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        var height = 18;
                        var offset =  height * color.domain().length / 2;
                        var horizontal = -45;
                        var vertical = i * height - offset;
                        return 'translate(' + 125 + ',' + vertical + ')';
                    });

                    legend.append('rect')
                    	.attr('width', 20)
                    	.attr('height', 20)
                    	.style('fill', color)
                    	.style('stroke', color);

                   legend.data(dat).append('text')
                   	.attr('x', 24)
                   	.attr('y', 16)
                   	.text(function(d) { return d.label; })
                        .style('font-family', 'Hind')

}) ();
