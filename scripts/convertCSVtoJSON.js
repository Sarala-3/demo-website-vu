const fs = require('fs');

// Path to the input CSV file
const inputFile = './input/data.csv';

// Path to the output JSON file
const outputFile = './public/data/csvData.json';

let ignoreColumnHeaderRow = true;

const toJSON = csv => {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',');
    
    if (ignoreColumnHeaderRow) {
        // Remove the first element from the lines array
        lines.shift();
    }

    lines.map(l => {
        const obj = {}
        const line = l.split(',')

        headers.map((h, i) => {
            let header = h.replace(/[\r\n]/g, '');
            const value = line[i].replace(/[\r\n]/g, '');
            // Make into a number variable type
            obj[header] = !isNaN(value) ? parseFloat(value) : value;  
            
        })

        result.push(obj)
    })

    return JSON.stringify(result, null, 2);
};



// Read the CSV file
fs.readFile(inputFile, 'utf8', (error, data) => {
    if (error) {
        console.error('An error occurred while reading the file:', error.message);
        return;
    }

    // Convert CSV to JSON
    const jsonData = toJSON(data);


    // Write the JSON to a file
    fs.writeFile(outputFile, jsonData, (error) => {
        if (error) {
            console.error('An error occurred while writing the file:', error.message);
            return;
        }
        console.log('Conversion completed successfully!');
    });
});
