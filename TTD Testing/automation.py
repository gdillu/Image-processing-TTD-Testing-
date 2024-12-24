from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
def wait_for_url_change(driver, max_wait_time=3600, polling_interval=2):
        start_time = time.time()
        initial_url = driver.current_url
        while True:
            current_url = driver.current_url
            print(f"Current URL: {current_url}")

            # Check if the URL contains a timer (e.g., if the URL contains 'timer')
            

                # Wait for the polling interval
            time.sleep(polling_interval)

            # Check if the URL has changed
            new_url = driver.current_url
            if new_url != initial_url:
                print("URL has changed to:", new_url)
                break

            # Check if the maximum wait time has been exceeded
            if time.time() - start_time > max_wait_time:
                raise Exception("URL did not change within the maximum wait time")
class url_changes:
    def __init__(self, current_url):
        self.current_url = current_url

    def __call__(self, driver):
        return driver.current_url != self.current_url
def perform_login(data,driver,wait):
    login_span = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/div[2]/div/div/span")))
    if login_span.text == "Log In":
        login_span.click()
        driver.implicitly_wait(30)
        input_field = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/div[2]/div/div/div/form/div[1]/div[1]/div[2]/div[1]/input")))
        input_field.send_keys(data['phone'])
        submitBtn = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/div[2]/div/div/div/form/div[2]/button")))
        submitBtn.click()

def select_service(data,driver,wait):
    logout_check = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/div[2]/div/div/span")))
    while logout_check.text != 'Log Out':
        time.sleep(1)  # Adding sleep to avoid rapid checking
    more_services = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[2]")))
    more_services.click()
    service_items = driver.find_elements(By.XPATH, "//div[@class='moreservices_iconList__9bc3P']")
    select_service = 'Angapradakshinam'
    for item in service_items:
        label = item.find_element(By.XPATH, ".//div[@class='moreservices_label___aRdv']")
        if label.text == data['service']:
            label.click()
            break
            
# Path to your ChromeDriver executable
def automation():
    service = Service(executable_path='chromedriver.exe')
    # Start Chrome browser
    driver = webdriver.Chrome(service=service)

    data = {
        'execute at':"20/12/2024 12:30pm",
        'phone':"9347752311",
        'service':"Arjitha Sevas",
        # 'service':"Special Entry Darshan (Ammavari Temple)",
        'date':"27 December 2024",
        'time':"7:00",
        'piligrims' : [{
            "Name": "John Doe",
            "Age": "30",
            "Gender": "Male",  # Dropdown
            "Photo ID Proof": "Aadhaar Card",  # Dropdown
            "Photo Id Number": "423334550172"
        },{
            "Name": "John Doe",
            "Age": "30",
            "Gender": "Male",  # Dropdown
            "Photo ID Proof": "Aadhaar Card",  # Dropdown
            "Photo Id Number": "973670104761"
        }],
        'UPI' : "9347752311@ybl"

    }
    # Open a website (replace with the URL of your web app)
    driver.get("https://ttdevasthanams.ap.gov.in/home/dashboard")

    # Print the title of the page to confirm it's working
    wait = WebDriverWait(driver, 10)
    perform_login(data,driver,wait)
    select_service(data,driver,wait)
    while True:
        print(driver.title)  # Print the title of the page to confirm it's working
        perform_login(data)
        select_service(data)

        # Wait for the URL to contain "curtain"
        try:
            wait.until(EC.url_contains("curtain"))
        except Exception as e:
            print("URL did not change to include 'curtain' within the wait time.")
        
        # Check if the new URL contains "curtain"
        if "curtain" in driver.current_url.lower():
            print("Found 'curtain' in the URL. Going back to the dashboard.")
            driver.get("https://ttdevasthanams.ap.gov.in/home/dashboard")
            # Optionally, wait for the URL to no longer contain "curtain"
            try:
                wait.until_not(EC.url_contains("curtain"))
            except Exception as e:
                print("URL did not change to exclude 'curtain' within the wait time.")
        else:
            break
        

    try:
        while "placed" in WebDriverWait(driver, 1000).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div/div[2]/main/div/div[2]/div[1]/div[2]"))
    ).text:
            pass
    except Exception as e:
        pass
    slot_url = wait.until(EC.url_contains("slot"))
    print(slot_url)
    if "slot" in driver.current_url.lower():
        sliding_container = driver.find_element(By.XPATH, '/html/body/div/div[2]/main/div/div[2]/div[2]')
        months = sliding_container.find_elements(By.XPATH, './div/div[1]/div')
        day_month, year = data['date'].split(' ', 1)
        december_container = None
        for month in months:
            if year in month.text:
                december_container = month
                break
        if december_container:
            # Locate the table body within the December container
            table_body = december_container.find_element(By.XPATH, './div[2]/table/tbody')

            # Find all date elements within the table body
            dates = table_body.find_elements(By.XPATH, './/td')

            # Iterate through dates to find the 27th
            for date in dates:
                if date.text == day_month:
                    driver.execute_script("arguments[0].click();", date)  # Click on the date 27
                    break

        dropdown_xpath = '/html/body/div/div[2]/main/div/div[3]/div/div[1]/div[3]/div/input'
        dropdown = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, dropdown_xpath))
        )
        driver.execute_script("arguments[0].click();", dropdown)
        options_xpath = '//li[contains(@class, "floatingDropdown_listItem__tU_5x")]'
        options = WebDriverWait(driver, 10).until(
            EC.visibility_of_all_elements_located((By.XPATH, options_xpath))
        )

        # Select an option (e.g., "Female")
        for option in options:
            if option.text == str(len(data['piligrims'])):  # Change this value as needed
                driver.execute_script("arguments[0].click();", option)
                break

        grid_container = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/main/div/div[3]/div/div[2]/div")))

        # Find all div elements in the grid container
        grid_items = driver.find_elements(By.XPATH, "/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div")

        # Iterate through each grid item and check for the slot timing text
        for i, grid_item in enumerate(grid_items, start=1):
            try:
                # Get the slot timing from the specified XPath
                slot_div = driver.find_element(By.XPATH, f"/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div[{i}]/div[2]/div/div[1]")
                slot_time = slot_div.text.strip()
                print(slot_time)
                # If the slot time matches "7:00 am", click the corresponding div
                if data['time'] in slot_time:
                    button = driver.find_element(By.XPATH, f"/html/body/div/div[2]/main/div/div[3]/div/div[2]/div/div[{i}]/div[2]/button")
                    
                    # Wait a bit for the element to be fully in view
                    time.sleep(0.5)
                    
                    # Use JavaScript to click the button (if regular click fails)
                    driver.execute_script("arguments[0].click();", button)

                    continue_button = driver.find_element(By.CSS_SELECTOR, "#__next > div.layoutPage > main > div > div.SlotBooking_greyButtonContainer__zbNgT > button.SlotBooking_darkpurpleDesktopButton__ja4Nq")
                    driver.execute_script("arguments[0].scrollIntoView();", continue_button)
                    
                    # Wait a bit for the element to be fully in view
                    time.sleep(0.5)
                    
                    # Use JavaScript to click the button (if regular click fails)
                    driver.execute_script("arguments[0].click();", continue_button)
                    
                    break  # Exit the loop after selecting the slot
            except Exception as e:
                print(f"Error while processing item {i}: {e}")
        if(len(data['piligrims']))==1:
            name_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div/input')
            name_input.send_keys(data["Name"])

            # Fill the Age input
            age_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/input')
            age_input.send_keys(data["Age"])

            # Fill the Gender dropdown
            dropdown_xpath = '/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[3]'
            dropdown = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, dropdown_xpath))
            )
            dropdown.click()

            # Wait for the options to be visible
            options_xpath = '//li[contains(@class, "floatingDropdown_listItem__tU_5x")]'
            options = WebDriverWait(driver, 10).until(
                EC.visibility_of_all_elements_located((By.XPATH, options_xpath))
            )

            # Select an option (e.g., "Female")
            for option in options:
                if option.text == "Female":  # Change this value as needed
                    option.click()
                    break

            dropdown_xpath = '/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[4]'
            dropdown = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, dropdown_xpath))
            )
            dropdown.click()

            # Wait for the options to be visible
            options_xpath = '//li[contains(@class, "floatingDropdown_listItem__tU_5x")]'
            options = WebDriverWait(driver, 10).until(
                EC.visibility_of_all_elements_located((By.XPATH, options_xpath))
            )

            # Select an option (e.g., "Female")
            for option in options:
                if option.text == "Aadhaar Card":  # Change this value as needed
                    option.click()
                    break

            # Fill the Photo Id Number input
            photo_id_number_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div/div[5]/div/div/input')
            photo_id_number_input.send_keys(data["Photo Id Number"])
        else:
            for i in range(len(data['piligrims'])):
                details = data['piligrims'][i]
                # Fill the form based on labels
                name_input = driver.find_element(By.XPATH, f'/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[{i+1}]/div[1]/div/div/input')
                name_input.send_keys(details["Name"])

                # Fill the Age input
                age_input = driver.find_element(By.XPATH, f'/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[{i+1}]/div[2]/div/div/input')
                age_input.send_keys(details["Age"])

                # Fill the Gender dropdown
                dropdown_xpath = f'/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[{i+1}]/div[3]'
                dropdown = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, dropdown_xpath))
                )
                dropdown.click()

                # Wait for the options to be visible
                options_xpath = '//li[contains(@class, "floatingDropdown_listItem__tU_5x")]'
                options = WebDriverWait(driver, 10).until(
                    EC.visibility_of_all_elements_located((By.XPATH, options_xpath))
                )

                # Select the Gender option
                for option in options:
                    if option.text == details["Gender"]:  # Select the correct gender
                        option.click()
                        break

                # Fill the Photo ID Proof dropdown
                dropdown_xpath = f'/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[{i+1}]/div[4]'
                dropdown = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, dropdown_xpath))
                )
                dropdown.click()

                # Wait for the options to be visible
                options = WebDriverWait(driver, 10).until(
                    EC.visibility_of_all_elements_located((By.XPATH, options_xpath))
                )

                # Select the Photo ID Proof option
                for option in options:
                    if option.text == details["Photo ID Proof"]:  # Select the correct ID proof
                        option.click()
                        break

                # Fill the Photo ID Number input
                photo_id_number_input = driver.find_element(By.XPATH, f'/html/body/div/div[2]/main/div/div[2]/div[2]/div[2]/div/div/div[{i+1}]/div[5]/div/div/input')
                photo_id_number_input.send_keys(details["Photo Id Number"])       # Scroll the button into view
        # driver.execute_script("arguments[0].scrollIntoView();", cnt_button)

        # # Wait a bit for the element to be fully in view
        # time.sleep(0.5)
        continue_button = driver.find_element(By.CSS_SELECTOR, "#__next > div.layoutPage > main > div > div.PilgrimDetails_customerDetailsContainer__CQvI0 > div:nth-child(4) > button.primary-btn")
        driver.execute_script("arguments[0].scrollIntoView();", continue_button)
        time.sleep(0.5)
        driver.execute_script("arguments[0].click();", continue_button)
        #__next > div.layoutPage > main > div > div > div > div.ReviewDetails_desktopButtonContainer__qT_iJ > div:nth-child(2) > button.ReviewDetails_desktopPaynowButton__Qp_eG

        pmtc_button = driver.find_element(By.CSS_SELECTOR, "#__next > div.layoutPage > main > div > div > div > div.ReviewDetails_desktopButtonContainer__qT_iJ > div:nth-child(2) > button.ReviewDetails_desktopPaynowButton__Qp_eG")
        driver.execute_script("arguments[0].scrollIntoView();", pmtc_button)
        time.sleep(0.5)
        driver.execute_script("arguments[0].click();", pmtc_button)
        name_input = driver.find_element(By.XPATH, '/html/body/div/div[1]/div[3]/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input')
        name_input.send_keys(data["UPI"])
        # Close the browser
        #driver.quit()
        continue_button = driver.find_element(By.CSS_SELECTOR, "#__next > div:nth-child(1) > div.css-bwc6c > div > div > div > div > div.css-b4sczx > div.css-1dm09jw > div.css-p0q30u > div.css-k01sfk > button")
        driver.execute_script("arguments[0].scrollIntoView();", continue_button)
        time.sleep(0.5)
        driver.execute_script("arguments[0].click();", continue_button)
automation()