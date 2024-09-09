
let mode_style;
let line_style;
let tickformat;


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get the select element by its ID
    var selectElement = document.getElementById('plot-select')
    // Add an event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Access the selected value
        mode_style = this.value;
        // Log the selected value to the console (or use it as needed)
        console.log(mode_style);
    });

    // Get the select element by its ID
    var selectElement = document.getElementById('linestyle-select');
    // Add an event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Access the selected value
        line_style = this.value;
        // Log the selected value to the console (or use it as needed)
        console.log(line_style);
    });
    // Get the select element by its ID
    var selectElement = document.getElementById('tickformat-select');

    // Add an event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Access the selected value
        tickformat = this.value;
        // Log the selected value to the console (or use it as needed)
        console.log(tickformat);
    });
});


function plotData() {
    if (mode_style !== 'bar') {
        console.log(mode_style)

        const dataString = document.getElementById('data_input').value.toString();
        const errorString = document.getElementById('error_input').value.toString(); // Standardabweichungsdaten
        console.log(dataString)
        console.log(errorString)
        // Step 2: Split the data string into rows
        const rowsData = dataString.trim().split('\n');
        const rowsError = errorString.trim().split('\n');

        console.log(rowsData)
        console.log(rowsError)

        // Step 3: Determine the number of columns by splitting the first row
        const numColumnsData = rowsData[0].split('\t').length;
        console.log(numColumnsData)
        const numColumnsError = rowsError[0] ? rowsError[0].split('\t').length : 0;
        console.log(numColumnsError)

        // Step 4: Initialize arrays for each column dynamically
        let columnsData = [];
        let columnsError = [];

        for (let i = 0; i < numColumnsData; i++) {
            columnsData.push([]);
            if (numColumnsError > 0) {
                columnsError.push([]);
            }
        }
        console.log(columnsData)
        console.log(columnsError)

        // Step 5: Loop through the rows and split each row into values
        for (let i = 1; i < rowsData.length; i++) {
            const valuesData = rowsData[i].split('\t');
            const valuesError = rowsError[i] ? rowsError[i].split('\t') : [];

            for (let j = 0; j < numColumnsData; j++) {
                columnsData[j].push(parseFloat(valuesData[j]));
                if (numColumnsError > 0) {
                    columnsError[j].push(parseFloat(valuesError[j]));
                }           
            }
        }
        // Create an array to hold the data
        var data = [];
        // Create array for names and modes to iterate over
        const column_names = rowsData[0].split('\t');
        const line_styles = ['', 'solid', 'dash', 'dot', 'longdash', 'dashdot', 'longdashdot', 'shortdash', 'shortdot', 'shortdashdot', 'shortdashdotdot'];
        const marker_styles = ['', 'circle', 'square', 'diamond', 'cross', 'x', 'triangle-up', 'triangle-down', 'triangle-left', 'triangle-right', 'pentagon', 'hexagon', 'hexagon2', 'octagon', 'star', 'hexagram', 'star-triangle-up', 'star-triangle-down'];
        const color_palette = ['', '#06d7fc', '#f51889', '#fbd604', '#19e7ca', '#1e122a', '#0522a4', '#ff5733', '#33ff57', '#ff33a8', '#33a8ff', '#a833ff', '#ff8333', '#33ff83', '#ff3380', '#3380ff', '#80ff33', '#8033ff', '#ff8033', '#33ff80', '#ff3380', '#3380ff', '#80ff33', '#8033ff'];

        // Create a trace for each y-column
        for (let i = 1; i < numColumnsData; i++) {
            const xValues = columnsData[0].map((header, index) => isNaN(header) ? index + 1 : parseFloat(header));
            var trace = {
                x: xValues,
                y: columnsData[i],
                mode: mode_style,
                type: 'scatter',
                name: column_names[i],
                marker: {
                    symbol: marker_styles[i] // Use one of the marker styles from the array
                },
                line: {
                    shape: line_style,
                    color: color_palette[i], // Change the color of the line
                    width: 3, // Change the width of the line
                    dash: line_styles[i] // Change the shape of the line
                }
            };

            // Add error bars if error data is provided
            if (numColumnsError > 0) {
                trace.error_y = {
                    type: 'data',
                    array: columnsError[i], // Füge die Standardabweichungen als Error Bars hinzu
                    visible: true,
                    color: '#000000',
                };
            }
            data.push(trace);
        }

        // Create the layout object
        var layout = {
            title: {
                text: "plotTitle",
                font: {
                    family: 'Tilda',
                    size: 24,
                    color: '#000000'
                }
            },
            xaxis: {
                title: {
                    text: "xAxisLabel",
                    font: {
                        family: 'Tilda',
                        size: 18,
                        color: '#000000'
                    }
                },
                tickvals: columnsData[0].map((index) => index),
                ticktext: columnsData[0],
                showgrid: false,
                zeroline: true, // Show the x-axis zero line
                color: '#000000' // Change the color of the x-axis
            },
            yaxis: {
                type: mode_style,
                title: {
                    text: "yAxisLabel",
                    font: {
                        family: 'Tilda',
                        size: 18,
                        color: '#000000'
                    }
                },
                tickformat: tickformat,
                showgrid: false,
                zeroline: true, // Show the x-axis zero line
                color: '#000000' // Change the color of the y-axis
            }
        };

        // Plot the data
        Plotly.newPlot(plot_div, data, layout, {editable: true, toImageButtonOptions: {format: 'png', scale: 4}});
    } 


//------------------------------------ bar plot --------------------------------------------
    else {
        const dataString = document.getElementById('data_input').value.toString();
        const errorString = document.getElementById('error_input').value.toString(); // Standardabweichungsdaten
    
        // get array with the single rows as one element
        const lines = dataString.trimEnd().split('\n');
        const errorLines = errorString.trimEnd().split('\n');
    
        // removes whitespaces in front and end and splits by either , or \t
        const headers = lines[0].trim().split(/[,\t]+/);
        const errorHeaders = errorLines[0] ? errorLines[0].trim().split(/[,\t]+/) : [];
    
        // creates a an array from all lines except the first one (-> assumed to be headers) 
        const values = [];
        const errorValues = [];
        for (let i = 1; i < lines.length; i++) {
            values.push(lines[i].trim().split(/[,\t]+/));
            if (errorLines[i]) {
                errorValues.push(errorLines[i].trim().split(/[,\t]+/));
            }
        }
    
        // creates dict out of values where first entry becomes key and the rest an array with the following values
        const values_dict = {};
        const error_dict = {};
        for (let i = 0; i < values.length; i++) {
            values_dict[values[i][0]] = values[i].slice(1);
            if (errorValues[i]) {
                error_dict[errorValues[i][0]] = errorValues[i].slice(1);
            }
        }
    
        // makes an array out of all key variables
        const strains = [];
        for (let i = 0; i < values.length; i++) {
            strains.push(values[i][0]);
        }
    
        const color_palette = ['#06d7fc', '#f51889', '#fbd604', '#1e122a', '#0522a4', '#19e7ca'];
        const data = [];
        for (let i = 0; i < strains.length; i++) {
            const strain = strains[i];
            const xValues = headers; // No extra condition
            const trace = {
                x: xValues,
                y: values_dict[strain],
                name: `${strain}`,
                type: 'bar',
                marker: {
                    color: color_palette[i] // Cycle through colors
                }
            };
    
            // Add error bars if error data is provided
            if (errorHeaders.length > 0 && error_dict[strain]) {
                trace.error_y = {
                    type: 'data',
                    array: error_dict[strain], // Add the standard deviations as error bars
                    visible: true,
                    color: '#000000',
                };
            }
    
            data.push(trace);
        }
    
        // Layout configuration
        const layout = {
            barmode: 'group',
            title: {
                text: 'CFU Counts Over Time',
                font: {
                    family: 'Tilda',
                    size: 24,
                    color: '#000000'
                }
            },
            xaxis: {
                title: {
                    text: 'Time [h]',
                    font: {
                        family: 'Tilda',
                        size: 18,
                        color: '#000000'
                    }
                },
                tickmode: 'array',
                showgrid: false,
                showline: true, // Show the x-axis line
                zeroline: true, // Show the x-axis zero line
                color: '#000000'
            },
            yaxis: {
                title: {
                    text: 'CFU',
                    font: {
                        family: 'Tilda',
                        size: 18,
                        color: '#000000'
                    }
                },
                tickformat: tickformat,
                showgrid: false,
                zeroline: true, // Show the x-axis zero line
                color: '#000000'
            },
            legend: {
                title: 'Strain and Condition'
            }
        };
    
        // Plotting the graph
        Plotly.newPlot(plot_div, data, layout, {editable: true, toImageButtonOptions: {format: 'png', scale: 4}});
    }
}

