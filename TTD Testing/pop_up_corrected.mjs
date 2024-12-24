import { Builder, By, Key, until } from 'selenium-webdriver';
document.addEventListener("DOMContentLoaded", function() {
    const pilgrimContainer = document.getElementById("pilgrim-container");
    const addPilgrimButton = document.getElementById("add-pilgrim");
    const bookingForm = document.getElementById("booking-form");
    let pilgrimCount = 0;
  
    // Function to create a form for each pilgrim
    function createPilgrimForm(index) {
      const pilgrimForm = document.createElement("div");
      pilgrimForm.classList.add("pilgrim-form");
      pilgrimForm.innerHTML = `
        <h4>Pilgrim ${index + 1}</h4>
        <label for="name-${index}">Name</label>
        <input type="text" id="name-${index}" name="pilgrims[${index}].name" required>
  
        <label for="age-${index}">Age</label>
        <input type="number" id="age-${index}" name="pilgrims[${index}].age" required>
  
        <label for="gender-${index}">Gender</label>
        <select id="gender-${index}" name="pilgrims[${index}].gender" required>
          <option value="" disabled selected>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
        </select>
  
        <label for="photoId-${index}">Photo ID Proof</label>
        <select id="photoId-${index}" name="pilgrims[${index}].photoIdProof" required>
          <option value="" disabled selected>Select Photo ID Proof</option>
          <option value="Aadhaar Card">Aadhaar Card</option>
          <option value="Passport">Passport</option>
        </select>
        
        <label for="photoIdNumber-${index}">Photo ID Number</label>
        <input type="text" id="photoIdNumber-${index}" name="pilgrims[${index}].photoIdNumber" required>
      `;
      pilgrimContainer.appendChild(pilgrimForm);
    }
  
    // Initially add 1 pilgrim
    createPilgrimForm(pilgrimCount);
  
    // Add a new pilgrim form when the button is clicked
    addPilgrimButton.addEventListener("click", function() {
      if (pilgrimCount < 6) {
        pilgrimCount++;
        createPilgrimForm(pilgrimCount);
      } else {
        alert("You can add a maximum of 6 pilgrims.");
      }
    });
  
    // Form submission logic
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const form = new FormData(event.target);
    let isValid = true;
    form.forEach((value, key) => {
      if (value === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill in all fields.");
      return;
    }

    // If valid, process the data
    const formData = {};
    form.forEach((value, key) => {
      formData[key] = value;
    });

    // Gather additional form data
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const upi = document.getElementById('upi').value;
    const pilgrims = getPilgrimValues();

    // Create a data object
    const completeFormData = {
        phone: phone,
        service: service,
        date: date,
        time: time,
        UPI: upi,
        pilgrims: pilgrims,
    };
    console.log(completeFormData);
    // Send the dat
    automate(completeFormData);
    console.log("Form submitted");
    });
    
});


function getPilgrimValues() {
  const pilgrimForms = document.querySelectorAll('.pilgrim-form'); // Select all pilgrim form divs
  const pilgrims = []; // Initialize an array to hold pilgrim data

  pilgrimForms.forEach(form => {
      const name = form.querySelector('input[name^="pilgrims["][name$=".name"]').value; // Get name
      const age = form.querySelector('input[name^="pilgrims["][name$=".age"]').value; // Get age
      const gender = form.querySelector('select[name^="pilgrims["][name$=".gender"]').value; // Get gender
      const photoIdProof = form.querySelector('select[name^="pilgrims["][name$=".photoIdProof"]').value; // Get photo ID proof
      const photoIdNumber = form.querySelector('input[name^="pilgrims["][name$=".photoIdNumber"]').value; // Get photo ID number

      // Push the collected data into the pilgrims array
      pilgrims.push({
          name: name,
          age: age,
          gender: gender,
          photoIdProof: photoIdProof,
          photoIdNumber: photoIdNumber
      });
  });

  return pilgrims; // Return the array of pilgrim objects
}

console.log("Content script running on the specified page.");
// Function to automate the booking process
async function automate(data) {
    // Automation logic should be implemented here using standard web APIs
    // For example, using document.querySelector and other DOM manipulation methods
    const driver = new Builder().forBrowser('chrome').build();
    // let data = {
    //     phone: "9347752311",
    //     service: "Special Entry Darshan (Ammavari Temple)",
    //     date: "25 December 2024",
    //     time: "10:00 am",
    //     pilgrims: [
    //         {
    //             Name: "John Doe",
    //             Age: "30",
    //             Gender: "Male",
    //             "Photo ID Proof": "Aadhaar Card",
    //             "Photo Id Number": "423334550172"
    //         },
    //         {
    //             Name: "John Doe",
    //             Age: "30",
    //             Gender: "Male",
    //             "Photo ID Proof": "Aadhaar Card",
    //             "Photo Id Number": "973670104761"
    //         }
    //     ],
    //     UPI: "9347752311@ybl"
    // };

    try {
        await driver.get("https://ttdevasthanams.ap.gov.in/home/dashboard");

        console.log(await driver.getTitle());
        let wait = new Promise(resolve => setTimeout(resolve, 30000));
        
        let loginSpan = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[2]/div/div/span")), 30000);
        if (await loginSpan.getText() === "Log In") {
            await loginSpan.click();
            
            let inputField = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[2]/div/div/div/form/div[1]/div[1]/div[2]/div[1]/input")), 30000);
            await inputField.sendKeys(data.phone);
            
            let submitBtn = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[2]/div/div/div/form/div[2]/button")), 30000);
            await submitBtn.click();
        }

        let logoutCheck = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/div[2]/div/div/span")), 30000);
        while (await logoutCheck.getText() !== 'Log Out') {
            await driver.sleep(1000);
        }

        let moreServices = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[2]")), 1000);
        await moreServices.click();

        let serviceItems = await driver.wait(until.elementsLocated(By.xpath("//div[@class='moreservices_iconList__9bc3P']")),1000);
        for (let item of serviceItems) {
            let label = await item.findElement(By.xpath(".//div[@class='moreservices_label___aRdv']"));
            if (await label.getText() === data.service) {
                await label.click();
                break;
            }
        }

        if ((await driver.getCurrentUrl()).toLowerCase().includes("timer")) {
            await waitForUrlChange(driver);
        }
        await driver.wait(until.urlContains("slot"), 10000);
        console.log((await driver.getCurrentUrl()).toLowerCase())
        if ((await driver.getCurrentUrl()).toLowerCase().includes("slot")) {
            let slidingContainer = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]')),2000);
            let months = await slidingContainer.findElements(By.xpath('./div/div[1]/div'));
            let [dayMonth, year] = data.date.split(' ', 2);
            let decemberContainer = null;
            console.log(year)
            console.log(dayMonth)
            for (let month of months) {
                let monthText = await month.getText()
                if (monthText.includes(year)) {
                    decemberContainer = month;
                    break;
                }
            }

            if (decemberContainer) {
                let tableBody = await decemberContainer.findElement(By.xpath('./div[2]/table/tbody'));
                let dates = await tableBody.findElements(By.xpath('.//td'));

                for (let date of dates) {
                    if (await date.getText() === dayMonth) {
                        await driver.executeScript("arguments[0].click();", date);
                        break;
                    }
                }
            }

            let dropdown = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[3]/div/div[1]/div[3]/div/input'));
            await driver.wait(until.elementIsVisible(dropdown), 1000);
            await driver.executeScript("arguments[0].click();", dropdown);

            let options = await driver.wait(until.elementsLocated(By.xpath('//li[contains(@class, "floatingDropdown_listItem__tU_5x")]')), 2000);
            for (let option of options) {
                if (await option.getText() === String(data.pilgrims.length)) {
                    await driver.executeScript("arguments[0].click();", option);
                    break;
                }
            }
            

            let gridContainer = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[2]/main/div/div[3]/div/div[2]/div")), 10000);
            let gridItems = await gridContainer.findElements(By.xpath("/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div"));

            for (let i = 0; i < gridItems.length; i++) {
                try {
                    let slotDiv = await driver.findElement(By.xpath(`/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div[${i + 1}]/div[2]/div/div[1]`));
                    let slotTime = (await slotDiv.getText()).trim();

                    if (slotTime.includes("7:00 am")) {
                        let button = await driver.findElement(By.xpath(`/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div[${i + 1}]/div[2]/button`));
                        await driver.executeScript("arguments[0].scrollIntoView();", button);
                        await driver.sleep(500);
                        await driver.executeScript("arguments[0].click();", button);

                        let continueButton = await driver.findElement(By.css("#__next > div.layoutPage > main > div > div.SlotBooking_greyButtonContainer__zbNgT > button.SlotBooking_darkpurpleDesktopButton__ja4Nq"));
                        await driver.executeScript("arguments[0].scrollIntoView();", continueButton);
                        await driver.sleep(500);
                        await driver.executeScript("arguments[0].click();", continueButton);
                        break;
                    }
                } catch (error) {
                    console.error(`Error while processing item ${i + 1}: ${error}`);
                }
            }

            if (data.pilgrims.length === 1) {
                let details = data.pilgrims[0];

                let nameInput = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/input'));
                await nameInput.sendKeys(details.Name);

                let ageInput = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/input'));
                await ageInput.sendKeys(details.Age);

                let genderDropdown = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[3]'));
                await driver.executeScript("arguments[0].click();", genderDropdown);

                let genderOptions = await driver.wait(until.elementsLocated(By.xpath('//li[contains(@class, "floatingDropdown_listItem__tU_5x")]')), 10000);
                for (let option of genderOptions) {
                    if (await option.getText() === details.Gender) {
                        await option.click();
                        break;
                    }
                }

                let idDropdown = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[4]'));
                await driver.executeScript("arguments[0].click();", idDropdown);

                let idOptions = await driver.wait(until.elementsLocated(By.xpath('//li[contains(@class, "floatingDropdown_listItem__tU_5x")]')), 10000);
                for (let option of idOptions) {
                    if (await option.getText() === details["Photo ID Proof"]) {
                        await option.click();
                        break;
                    }
                }

                let photoIdNumberInput = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[5]/div/div/input'));
                await photoIdNumberInput.sendKeys(details["Photo Id Number"]);

                let submitButton = await driver.findElement(By.xpath('/html/body/div/div[2]/main/div/div[3]/div/button[2]'));
                await submitButton.click();
            }
            else{
                for (let i = 0; i < data.pilgrims.length; i++) {
                    let details = data.pilgrims[i];
                
                    // Fill the Name input
                    let nameInput = await driver.findElement(By.xpath(`/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[${i + 1}]/div[1]/div/div/input`));
                    await nameInput.sendKeys(details.Name);
                
                    // Fill the Age input
                    let ageInput = await driver.findElement(By.xpath(`/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[${i + 1}]/div[2]/div/div/input`));
                    await ageInput.sendKeys(details.Age);
                
                    // Fill the Gender dropdown
                    let dropdownXPath = `/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[${i + 1}]/div[3]`;
                    let dropdown = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(dropdownXPath))), 10000);
                    await dropdown.click();
                
                    // Wait for the options to be visible
                    let optionsXPath = '//li[contains(@class, "floatingDropdown_listItem__tU_5x")]';
                    let options = await driver.wait(until.elementsLocated(By.xpath(optionsXPath)), 10000);
                
                    // Select the Gender option
                    for (let option of options) {
                        if ((await option.getText()) === details.Gender) {  // Select the correct gender
                            await option.click();
                            break;
                        }
                    }
                
                    // Fill the Photo ID Proof dropdown
                    dropdownXPath = `/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[${i + 1}]/div[4]`;
                    dropdown = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(dropdownXPath))), 10000);
                    await dropdown.click();
                
                    // Wait for the options to be visible
                    options = await driver.wait(until.elementsLocated(By.xpath(optionsXPath)), 10000);
                
                    // Select the Photo ID Proof option
                    for (let option of options) {
                        if ((await option.getText()) === details["Photo ID Proof"]) {  // Select the correct ID proof
                            await option.click();
                            break;
                        }
                    }
                
                    // Fill the Photo ID Number input
                    let photoIdNumberInput = await driver.findElement(By.xpath(`/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[${i + 1}]/div[5]/div/div/input`));
                    await photoIdNumberInput.sendKeys(details["Photo Id Number"]);
                }
            }

            let continueButton = await driver.findElement(By.css('#__next > div.layoutPage > main > div > div.PilgrimDetails_customerDetailsContainer__CQvI0 > div:nth-child(4) > button.primary-btn'));
await driver.executeScript("arguments[0].scrollIntoView();", continueButton);
await driver.sleep(500); // Sleep for 0.5 seconds
await driver.executeScript("arguments[0].click();", continueButton);

// Locate and click the Payment button
let pmtcButton = await driver.wait(until.elementLocated(By.css('#__next > div.layoutPage > main > div > div > div > div.ReviewDetails_desktopButtonContainer__qT_iJ > div:nth-child(2) > button.ReviewDetails_desktopPaynowButton__Qp_eG')),2000);
await driver.executeScript("arguments[0].scrollIntoView();", pmtcButton);
await driver.sleep(500); // Sleep for 0.5 seconds
await driver.executeScript("arguments[0].click();", pmtcButton);

// Fill in the UPI input field
let nameInput = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[1]/div[3]/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input')),20000);
await nameInput.sendKeys(data.UPI);

// Locate and click the final Continue button
continueButton = await driver.findElement(By.css('#__next > div:nth-child(1) > div.css-bwc6c > div > div > div > div > div.css-b4sczx > div.css-1dm09jw > div.css-p0q30u > div.css-k01sfk > button'));
await driver.executeScript("arguments[0].scrollIntoView();", continueButton);
await driver.sleep(500); // Sleep for 0.5 seconds
await driver.executeScript("arguments[0].click();", continueButton);

// Optionally close the browser after completing the actions
await driver.quit();
        }
    } catch (error) {
        console.error(error);
    }
};



