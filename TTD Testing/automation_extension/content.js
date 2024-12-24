function enableAutocompleteForFloatingInputs() {
    const inputs = document.querySelectorAll('input.floating-input');
    inputs.forEach(input => {
        input.setAttribute('autocomplete', 'true'); // Ensure autocomplete is enabled
    });
}

function fillPilgrims(data) {
    enableAutocompleteForFloatingInputs();

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
        const nameInput = grid.querySelector('input[name="fname"]') || grid.querySelector('input[name="name"]');
        if (nameInput) {
            nameInput.value = pilgrim.Name || '';
            nameInput.autocomplete = "true";
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`Name input not found for pilgrim ${index + 1}`);
        }

        // Fill Age input
        const ageInput = grid.querySelector('input[name="age"]');
        if (ageInput) {
            ageInput.value = pilgrim.Age || '';
            ageInput.autocomplete = "true";
            ageInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`Age input not found for pilgrim ${index + 1}`);
        }

        // Fill Gender dropdown
        const genderInput = grid.querySelector('input[name="gender"]');
        if (genderInput) {
            genderInput.click(); // Click to open the dropdown

            // Wait for the dropdown options to appear and then select the appropriate one
            setTimeout(() => {
                const options = document.querySelectorAll('[class*="floatingDropdown_listItem"]');
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
        const idInput = grid.querySelector('input[name="photoIdType"]') || grid.querySelector('input[name="idType"]');
        if (idInput) {
            idInput.click(); // Click to open the dropdown

            // Wait for the dropdown options to appear and then select the appropriate one
            setTimeout(() => {
                const options = document.querySelectorAll('[class*="floatingDropdown_listItem"]');
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
        const idProofNumberInput = grid.querySelector('input[name="idProofNumber"]') || grid.querySelector('input[name="idNumber"]');
        if (idProofNumberInput) {
            const setIdProofNumber = () => {
                idProofNumberInput.value = pilgrim["Photo Id Number"] + '0' || '';
                if (idProofNumberInput.value.length > 12) {
                    idProofNumberInput.value = idProofNumberInput.value.slice(0, 12);
                }
                idProofNumberInput.autocomplete = "true";
                idProofNumberInput.dispatchEvent(new Event('input', { bubbles: true }));
                idProofNumberInput.dispatchEvent(new Event('change', { bubbles: true }));

                // Verify the value is set after a short delay
                setTimeout(() => {
                    if (idProofNumberInput.value !== pilgrim["Photo Id Number"] + '0') {
                        setIdProofNumber();
                    }
                }, 500); // Adjust the delay as necessary
            };

            setIdProofNumber();
        }
         else {
            console.warn(`Photo ID Number input not found or is disabled for pilgrim ${index + 1}`);
        }
    });
}
