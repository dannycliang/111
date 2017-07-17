const color = d3.scale.category20c()
var dat = [ { label: '1 seed', b: 1.64 },
            { label: '2 seed', b: 0.85 },
            { label: '3 seed', b: 0.45 },
            { label: '4 seed', b: 0.39 },
            { label: '5 seed', b: 0.18 },
            { label: '6 seed', b: 0.09 },
            { label: '7 seed', b: 0.09 },
            { label: '8 seed', b: 0.15 },
            { label: '9 seed', b: 0.03 },
            { label: '10 seed', b: 0.03 },
            { label: '11 seed', b: 0.09 },
            { label: '12 seed', b: 0 },
            { label: '13 seed', b: 0 },
            { label: '14 seed', b: 0 },
            { label: '15 seed', b: 0 },
            { label: '16 seed', b: 0 },
            ];

var svg = d3.select('.Results')
              .append('svg')
              .attr('width', 300)
              .attr('height', 300)
              .append('g')
              .attr('transform', 'translate(' + (150) + ',' + (150) + ')');

            var arc = d3.svg.arc()
              .innerRadius(0)
              .outerRadius(150);

            var pie = d3.layout.pie()
              .value(function(d) { return d.b; })


            var path = svg.selectAll('path')
              .data(pie(dat))
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function(d) {
                return color(d.data.label);
              });
