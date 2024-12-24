document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-automation').addEventListener('click', () => {
        const pilgrims = [];
        const pilgrimElements = document.querySelectorAll('#pilgrims .pilgrim');
        pilgrimElements.forEach(element => {
            const name = element.querySelector('.name').value;
            const age = element.querySelector('.age').value;
            const gender = element.querySelector('.gender').value;
            const idProof = element.querySelector('.id-proof').value;
            const idNumber = element.querySelector('.id-number').value;

            pilgrims.push({
                Name: name,
                Age: age,
                Gender: gender,
                "Photo ID Proof": idProof,
                "Photo Id Number": idNumber
            });
        });

        const data = {
            pilgrims,
            // Example UPI, can be made dynamic
        };

        // Save data to localStorage
        localStorage.setItem('automationData', JSON.stringify(data));

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: startAutomation,
                args: [data]
            });
        });
    });

    document.getElementById('add-pilgrim').addEventListener('click', () => {
        const pilgrimsDiv = document.getElementById('pilgrims');
        const pilgrimDiv = document.createElement('div');
        pilgrimDiv.classList.add('pilgrim');
        pilgrimDiv.innerHTML = `
            <input type="text" class="name" placeholder="Name">
            <input type="text" class="age" placeholder="Age">
            <select class="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select class="id-proof">
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="Passport">Passport</option>
                <!-- Add more ID proofs as needed -->
            </select>
            <input type="text" class="id-number" placeholder="Photo ID Number">
        `;
        pilgrimsDiv.appendChild(pilgrimDiv);
    });

    // Load data from localStorage
    const savedData = JSON.parse(localStorage.getItem('automationData'));
    if (savedData) {

        savedData.pilgrims.forEach(pilgrim => {
            const pilgrimsDiv = document.getElementById('pilgrims');
            const pilgrimDiv = document.createElement('div');
            pilgrimDiv.classList.add('pilgrim');
            pilgrimDiv.innerHTML = `
                <input type="text" class="name" value="${pilgrim.Name}" placeholder="Name">
                <input type="text" class="age" value="${pilgrim.Age}" placeholder="Age">
                <select class="gender">
                    <option value="Male" ${pilgrim.Gender === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Female" ${pilgrim.Gender === 'Female' ? 'selected' : ''}>Female</option>
                </select>
                <select class="id-proof">
                    <option value="Aadhaar Card" ${pilgrim["Photo ID Proof"] === 'Aadhaar Card' ? 'selected' : ''}>Aadhaar Card</option>
                    <option value="Passport" ${pilgrim["Photo ID Proof"] === 'Passport' ? 'selected' : ''}>Passport</option>
                </select>
                <input type="text" class="id-number" value="${pilgrim["Photo Id Number"]}" placeholder="Photo ID Number">
            `;
            pilgrimsDiv.appendChild(pilgrimDiv);
        });
    }

    // Save button functionality
    document.getElementById('save').addEventListener('click', () => {
        const data = {
            pilgrims: Array.from(document.querySelectorAll('#pilgrims .pilgrim')).map(element => ({
                Name: element.querySelector('.name').value,
                Age: element.querySelector('.age').value,
                Gender: element.querySelector('.gender').value,
                "Photo ID Proof": element.querySelector('.id-proof').value,
                "Photo Id Number": element.querySelector('.id-number').value
            }))
        };
        localStorage.setItem('automationData', JSON.stringify(data));
        alert('Data saved successfully!');
    });

    // Load button functionality
    document.getElementById('load').addEventListener('click', () => {
        const savedData = JSON.parse(localStorage.getItem('automationData'));
        if (savedData) {

            const pilgrimsDiv = document.getElementById('pilgrims');
            pilgrimsDiv.innerHTML = ''; // Clear existing pilgrims
            savedData.pilgrims.forEach(pilgrim => {
                const pilgrimDiv = document.createElement('div');
                pilgrimDiv.classList.add('pilgrim');
                pilgrimDiv.innerHTML = `
                    <input type="text" class="name" value="${pilgrim.Name}" placeholder="Name">
                    <input type="text" class="age" value="${pilgrim.Age}" placeholder="Age">
                    <select class="gender">
                        <option value="Male" ${pilgrim.Gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${pilgrim.Gender === 'Female' ? 'selected' : ''}>Female</option>
                    </select>
                    <select class="id-proof">
                        <option value="Aadhaar Card" ${pilgrim["Photo ID Proof"] === 'Aadhaar Card' ? 'selected' : ''}>Aadhaar Card</option>
                        <option value="Passport" ${pilgrim["Photo ID Proof"] === 'Passport' ? 'selected' : ''}>Passport</option>
                    </select>
                    <input type="text" class="id-number" value="${pilgrim["Photo Id Number"]}" placeholder="Photo ID Number">
                `;
                pilgrimsDiv.appendChild(pilgrimDiv);
            });
            alert('Data loaded successfully!');
        } else {
            alert('No saved data found.');
        }
    });

    // Reset button functionality
    document.getElementById('reset').addEventListener('click', () => {
        localStorage.removeItem('automationData');
        document.getElementById('pilgrims').innerHTML = ''; // Clear pilgrims
        alert('Data reset successfully!');
    });

    async function startAutomation(data) {
        // This function will be executed in the context of the web page
        // Call the performLogin, selectService, selectDate, and fillPilgrims functions here
        window.fillPilgrims(data)
    }
});
