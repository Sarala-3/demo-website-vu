console.log('script.js loaded.');

const csvFile = 'data/csvData.json';


// Return a random color

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Convert jSON to usable structure for ChartJS

function convertJSONtoChartJS(jsonData) {
    const chartData = {
    labels: Object.keys(jsonData[0]).slice(1), // Extract month names as labels excluding the "Month" key
    datasets: []                               //Empty array
    };

    jsonData.forEach(obj => {

    const dataset = {
        label: obj["Month"],
        data: Object.values(obj).slice(1), // Extract data values excluding the "Month" key
        backgroundColor: getRandomColor(), // Generate random background color for each dataset
        borderColor: getRandomColor(), // Generate random border color for each dataset
        borderWidth: 1 // Optional: Customize the border width for each dataset
    };
    chartData.datasets.push(dataset);
    });

    return chartData;
}

// Fetch CSV JSON Data File

fetch(csvFile)
    .then(response => response.json())
    .then(data => {
        // Process the loaded JSON data
        console.log(`[${csvFile}] Data Loaded =>`, data);

        // 1. Convert JSON Data to chartData
        let chartData = convertJSONtoChartJS(data);

        console.log('Converted chartData', chartData);

        // 2. Create a chart using the chartData

        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: chartData, 
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });


    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });