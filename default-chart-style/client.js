(function () {

    var draw = function () {


        var mode = 'lines'
        var type = 'scatter'
        var size = [5, 5, 5, 5];
        var rawData = 'a;b;c\n1;2;3\n2;3;4\n3;4;5'
        var title = new Date().toISOString()
        var delimiter = ';'

        if (window.chartioSettings) {
        	if (chartioSettings.viewport.height){
        		document.getElementById('chart').style.height= chartioSettings.viewport.height + 'px';
        	}

            rawData = chartioSettings.rawData
            title = chartioSettings.title || title
            delimiter = chartioSettings.delimiter || delimiter
        }
        var rows = (rawData).replace(/\r/g, '').split('\n')
        var parsedData = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.split(delimiter)
            parsedData.push(cells)
        }

        // inititalize trace data storage
        var traces = []
        for (var x = 0; x < parsedData[0].length; x++) {
            var trace = {
                x: [],
                y: [],
                mode: mode,
                type: type,
                opacity: 1,
                marker: {
                    // color: 'black',
                    size: size
                }
            };

            trace.name = parsedData[0][x]
            //      trace.marker.color = getRandomRolor()
            traces.push(trace)
        }


        for (var r = 1; r < parsedData.length; r++) {
            var c = parsedData[r];
            for (var d = 0; d < c.length; d++) {
                var element = parseFloat(c[d])
                traces[d].x.push(r)
                traces[d].y.push(element)
            }
        }

        var layout = {
            title: title
        };

        Plotly.newPlot('chart', traces, layout);
        document.body.classList.add('done');
    }
    window.drawChartTraces = draw
    // draw()
})()