


function enableAutocompleteForFloatingInputs() {
    const inputs = document.querySelectorAll('input.floating-input');
    inputs.forEach(input => {
        input.setAttribute('autocomplete', 'true'); // Ensure autocomplete is enabled
    });
}

enableAutocompleteForFloatingInputs();
function fillPilgrims(data) {
    const mainContainer = document.querySelector('.PilgrimDetails_customerDetailsContainer__CQvI0');

    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    const grids = mainContainer.querySelectorAll('div[style*="grid-template-columns: 3fr 1fr 1.5fr 2fr 2fr"]');

    if (grids.length < data.pilgrims.length) {
        console.warn("Not enough grids to fill all pilgrim details");
    }

    data.pilgrims.forEach((pilgrim, index) => {
        if (index >= grids.length) {
            console.warn(`No grid available for pilgrim ${index + 1}`);
            return;
        }

        const grid = grids[index];

        // Fill Name input
        const nameInput = grid.querySelector(`input[name="fname"]`);
        if (nameInput) {
            nameInput.value = pilgrim.Name || '';
            nameInput.autocomplete = "true";
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
            
        } else {
            console.warn(`Name input not found for pilgrim ${index + 1}`);
        }

        // Fill Age input
        const ageInput = grid.querySelector(`input[name="age"]`);
        if (ageInput) {
            ageInput.value = pilgrim.Age || '';
            ageInput.autocomplete = "true";
            ageInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`Age input not found for pilgrim ${index + 1}`);
        }

        // Fill Gender dropdown
        const genderInput = grid.querySelector(`input[name="gender"]`);
        if (genderInput) {
            genderInput.click(); // Click to open the dropdown
            

            // Wait for the dropdown options to appear and then select the appropriate one
            setTimeout(() => {
                const options = document.querySelectorAll('.floatingDropdown_listItem__tU_5x');
                let selectedOption = null;

                options.forEach(option => {
                    if (option.innerText === pilgrim.Gender) {
                        selectedOption = option;
                    }
                });

                if (selectedOption) {
                    selectedOption.click(); // Click the desired option
                    
                } else {
                    console.warn(`Gender option not found for pilgrim ${index + 1}`);
                }
            }, 500); // Adjust timeout as necessary for the dropdown to appear
        } else {
            console.warn(`Gender input not found for pilgrim ${index + 1}`);
        }

        // Fill Photo ID Proof dropdown
        const idInput = grid.querySelector(`input[name="photoIdType"]`);
        if (idInput) {
            idInput.click(); // Click to open the dropdown

            // Wait for the dropdown options to appear and then select the appropriate one
            setTimeout(() => {
                const options = document.querySelectorAll('.floatingDropdown_listItem__tU_5x');
                let selectedOption = null;

                options.forEach(option => {
                    if (option.innerText === pilgrim["Photo ID Proof"]) {
                        selectedOption = option;
                    }
                });

                if (selectedOption) {
                    selectedOption.click(); // Click the desired option
                    
                } else {
                    console.warn(`Photo ID Proof option not found for pilgrim ${index + 1}`);
                }
            }, 500); // Adjust timeout as necessary for the dropdown to appear
        } else {
            console.warn(`Photo ID Proof input not found for pilgrim ${index + 1}`);
        }

        // Fill Photo ID Number input
        const idProofNumberInput = grid.querySelector(`input[name="idProofNumber"]`);
        if (idProofNumberInput) {
            idProofNumberInput.value = '';
            idProofNumberInput
            idProofNumberInput.value = pilgrim["Photo Id Number"] + '0' || '';
            if(idProofNumberInput.value .length > 12){
                idProofNumberInput.value = idProofNumberInput.value.slice(0, 13);
            }
            idProofNumberInput.autocomplete = "true";
            idProofNumberInput.dispatchEvent(new Event('input', { bubbles: true }));
            idProofNumberInput.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            console.warn(`Photo ID Number input not found or is disabled for pilgrim ${index + 1}`);
        }
    });
}

