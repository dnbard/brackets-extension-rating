var graphData = [];

for(var i = 0; i < window.data.length; i ++){
    graphData.push({
        x: window.data[i].timestamp,
        y: window.data[i].count
    });
}

var columnChart = d4.charts.column();
d3.select('#graph').datum(graphData).call(columnChart);
