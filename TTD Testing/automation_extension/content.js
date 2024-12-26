async function fillPilgrims(data) {

    const mainContainer = document.querySelector('[class*="PilgrimDetails_customerDetailsContainer"]');
    const gridsContainer = document.querySelector('[class*="pilgrimDetails_grid-container"]');

    let grids;
    if (mainContainer) {
        grids = mainContainer.querySelectorAll('div[style*="grid-template-columns: 3fr 1fr 1.5fr 2fr 2fr"]');
    } else if (gridsContainer) {
        grids = gridsContainer.querySelectorAll('[class*="pilDetails_mainContainer"]');
    } else {
        console.error("Main container not found");
        return;
    }

    // Additional fields initialization here
    const emailDiv = document.querySelector('input[label*="Email"]')?.closest('div');
    const countryDiv = document.querySelector('input[label*="Country"]')?.closest('div');
    const stateDiv = document.querySelector('input[label*="State"]')?.closest('div');
    const cityDiv = document.querySelector('input[label*="City"]')?.closest('div');
    const pincodeDiv = document.querySelector('input[label*="Pincode"]')?.closest('div');
    const gothramDiv = document.querySelector('input[label*="Gothram"]')?.closest('div');

    // Filling in initial fields
    await fillInputField(gothramDiv, "pilgrimGothram", "Gothrem","araku");
    await fillInputField(emailDiv, "pilgrimEmail", "Email",data.Email || '');
    await fillDropdownField(countryDiv, "pilgrimCountry", "Country","India");
    await fillDropdownField(stateDiv, "pilgrimState", "State",data.State);
    await fillInputField(cityDiv, "pilgrimCity", "City",data.City || '');
    await fillInputField(pincodeDiv, "pilgrimPincode","Pincode", data.Pincode || '');

    // Handling multiple pilgrims
    for (let index = 0; index < data.pilgrims.length; index++) {
        const pilgrim = data.pilgrims[index];
        const grid = grids[index];

        if (!grid) {
            continue;
        }

        await fillPilgrimDetails(grid, pilgrim);
    }
}

// Function to fill input fields
async function fillInputField(div, name, label,value) {
    if (div) {
        const input = div.querySelector(`input[name="${name}"]`) || div.querySelector(`input[label*="${label}"]`);
        if (input) {
            input.value = value;
            input.autocomplete = "true";
            input.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`${name} input not found`);
        }
    }
}

// Function to handle dropdown fields
async function fillDropdownField(div, name, label,value) {
    if (div) {
        const input = div.querySelector(`input[name="${name}"]`) || div.querySelector(`input[label*="${label}"]`);
        if (input) {
            input.click(); // Open the dropdown
            const options = await waitForOptions();
            const selectedOption = Array.from(options).find(option => option.innerText === value);
            if (selectedOption) {
                selectedOption.click(); // Select the desired option
            } else {
                console.warn(`${name} option not found`);
            }
        } else {
            console.warn(`${name} input not found`);
        }
    }
}

// Function to wait for options in dropdown
function waitForOptions() {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            const options = document.querySelectorAll('[class*="floatingDropdown_listItem"]');
            if (options.length) {
                clearInterval(interval);
                resolve(options);
            }
        }, 100);
    });
}

// Function to fill individual pilgrim details
async function fillPilgrimDetails(grid, pilgrim) {
    await fillInputField(grid, "fname", "Name",pilgrim.Name);
    await fillInputField(grid, "age", "Age",pilgrim.Age);
    await fillDropdownField(grid, "gender", "Gender",pilgrim.Gender);
    await fillDropdownField(grid, "photoIdType", "Photo ID Proof",pilgrim["Photo ID Proof"]);
    await fillInputField(grid, "idProofNumber", "Photo ID Number",pilgrim["Photo Id Number"]);
}

