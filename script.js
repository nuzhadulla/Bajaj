document.getElementById('jsonForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const input = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const optionsContainer = document.getElementById('optionsContainer');
    const responseContainer = document.getElementById('filteredResponse');

    // Clear previous error and response
    errorElement.textContent = '';
    responseContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    let jsonData;

    try {
        jsonData = JSON.parse(input);
    } catch (err) {
        errorElement.textContent = 'Invalid JSON input';
        return;
    }

    // Send JSON to the backend
    const response = await fetch('http://localhost:8080/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    const result = await response.json();

    // Create options for filtering
    const options = ['Numbers', 'Alphabets', 'Highest lowercase alphabet'];
    options.forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option;
        checkbox.id = option;
        checkbox.addEventListener('change', () => displayFilteredResult(result, optionsContainer));
        optionsContainer.appendChild(checkbox);
        optionsContainer.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(document.createElement('br'));
    });
});

function displayFilteredResult(result, optionsContainer) {
    const selectedOptions = Array.from(optionsContainer.querySelectorAll('input:checked')).map(input => input.value);
    const filteredData = {};

    if (selectedOptions.includes('Numbers')) {
        filteredData['Numbers'] = result.data.filter(item => !isNaN(item)).join(', ');
    }
    // Add more filtering logic for Alphabets and Highest lowercase alphabet

    const responseContainer = document.getElementById('filteredResponse');
    responseContainer.innerHTML = JSON.stringify(filteredData, null, 2);
}
