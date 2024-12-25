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
    const generalsContainer = document.querySelector('[class*="pilgrimDetails_flex-container"]');

    let grids;
    let generalContainer;
    if (mainContainer) {
        grids = mainContainer.querySelectorAll('div[style*="grid-template-columns: 3fr 1fr 1.5fr 2fr 2fr"]');
    } else if (gridsContainer) {
        grids = gridsContainer.querySelectorAll('[class*="pilDetails_mainContainer"]');
        generalContainer = generalsContainer.querySelectorAll('[class*="pilgrimDetails_inner-div"]');
    } else {
        console.error("Main container not found");
        return;
    }
        if(generalContainer){
        const generalContainerdiv = document.querySelector('[class*="pilgrimDetails_flex-container"]');
        if (generalContainerdiv) {
            const emailDiv = generalContainerdiv.querySelector('input[name="pilgrimEmail"]')?.closest('div') || generalContainerdiv.querySelector('input[label="Email Address"]')?.closest('div');
            const countryDiv = generalContainerdiv.querySelector('input[name="pilgrimCountry"]')?.closest('div') || generalContainerdiv.querySelector('input[label="Country"]')?.closest('div');
            const stateDiv = generalContainerdiv.querySelector('input[name="pilgrimState"]')?.closest('div') || generalContainerdiv.querySelector('input[label="State"]')?.closest('div');
            const cityDiv = generalContainerdiv.querySelector('input[name="pilgrimCity"]')?.closest('div') || generalContainerdiv.querySelector('input[label="City"]')?.closest('div');
            const pincodeDiv = generalContainerdiv.querySelector('input[name="pilgrimPincode"]')?.closest('div') || generalContainerdiv.querySelector('input[label="Pincode"]')?.closest('div');
            const gothramDiv = generalContainerdiv.querySelector('input[name="pilgrimGothram"]')?.closest('div') || generalContainerdiv.querySelector('input[label="Gothram"]')?.closest('div');

            if (gothramDiv) {
                const gothramInput = gothramDiv.querySelector('input[name="pilgrimGothram"]') || gothramDiv.querySelector('input[label="Gothram"]');
                if (gothramInput) {
                    gothramInput.value = "araku";
                    gothramInput.autocomplete = "true";
                    gothramInput.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    console.warn(`Gothram input not found for pilgrim`);
                }
            }
    
            if (emailDiv) {
                const mailInput = emailDiv.querySelector('input[name="pilgrimEmail"]') || emailDiv.querySelector('input[label="Email Address"]');
                if (mailInput) {
                    mailInput.value = data.Email || '';
                    mailInput.autocomplete = "true";
                    mailInput.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    console.warn(`Mail input not found for pilgrim`);
                }
            }
    
            if (countryDiv) {
                const pilgrimCountry = countryDiv.querySelector('input[name="pilgrimCountry"]') || countryDiv.querySelector('input[label="Country"]');
                if (pilgrimCountry) {
                    pilgrimCountry.click(); // Click to open the dropdown
    
                    // Wait for the dropdown options to appear and then select the appropriate one
                    setTimeout(() => {
                        const options = document.querySelectorAll('[class*="floatingDropdown_listItem"]');
                        let selectedOption = null;
    
                        options.forEach(option => {
                            if (option.innerText === "India") {
                                selectedOption = option;
                            }
                        });
    
                        if (selectedOption) {
                            selectedOption.click(); // Click the desired option
                        } else {
                            console.warn(`Country option not found for pilgrim`);
                        }
                    }, 500); // Adjust timeout as necessary for the dropdown to appear
                } else {
                    console.warn(`Country input not found for pilgrim`);
                }
            }
    
            setTimeout(() => {
                if (stateDiv) {
                    const pilgrimState = stateDiv.querySelector('input[name="pilgrimState"]') || stateDiv.querySelector('input[label="State"]');
                    if (pilgrimState) {
                        pilgrimState.click(); // Click to open the dropdown
                        // Wait for the dropdown options to appear and then select the appropriate one
                        setTimeout(() => {
                            const options = document.querySelectorAll('[class*="floatingDropdown_listItem"]');
                            let selectedOption = null;
                            options.forEach(option => {
                                if (option.innerText === data.State) {
                                    selectedOption = option;
                                }
                            });
                            if (selectedOption) {
                                selectedOption.click(); // Click the desired option
                            } else {
                                console.warn(`State option not found for pilgrim`);
                            }
                        }, 500); // Adjust timeout as necessary for the dropdown to appear
                    } else {
                        console.warn(`State input not found for pilgrim`);
                    }
                }
            }, 1000);
            
                
    
            if (cityDiv) {
                const cityInput = cityDiv.querySelector('input[name="pilgrimCity"]') || cityDiv.querySelector('input[label="City"]');
                if (cityInput) {
                    cityInput.value = data.City || '';
                    cityInput.autocomplete = "true";
                    cityInput.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    console.warn(`City input not found for pilgrim`);
                }
            }
    
            if (pincodeDiv) {
                const pinInput = pincodeDiv.querySelector('input[name="pilgrimPincode"]') || pincodeDiv.querySelector('input[label="Pincode"]');
                if (pinInput) {
                    pinInput.value = data.Pincode || '';
                    pinInput.autocomplete = "true";
                    pinInput.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    console.warn(`Pincode input not found for pilgrim`);
                }
            }
        } else {
            console.warn('General container not found');
        }
    
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
        const nameInput = grid.querySelector('input[name="fname"]') || grid.querySelector('input[name="name"]') || grid.querySelector('input[label="Name"]');
        if (nameInput) {
            nameInput.value = pilgrim.Name || '';
            nameInput.autocomplete = "true";
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`Name input not found for pilgrim ${index + 1}`);
        }

        // Fill Age input
        const ageInput = grid.querySelector('input[name="age"]') || grid.querySelector('input[label="Age]');
        if (ageInput) {
            ageInput.value = pilgrim.Age || '';
            ageInput.autocomplete = "true";
            ageInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.warn(`Age input not found for pilgrim ${index + 1}`);
        }

        // Fill Gender dropdown
        const genderInput = grid.querySelector('input[name="gender"]') || grid.querySelector('input[label="Gender"]');
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
        const idInput = grid.querySelector('input[name="photoIdType"]') || grid.querySelector('input[name="idType"]') || grid.querySelector('input[label="Photo ID Proof"]');
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
        const idProofNumberInput = grid.querySelector('input[name="idProofNumber"]') || grid.querySelector('input[name="idNumber"]') || grid.querySelector('input[label="Photo ID Number"]');
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
