from selenium import webdriver
import time

driver = webdriver.Firefox(executable_path="geckodriver.exe")

def login_test(username, password):
    driver.get("http://localhost:8081/")
    username_field = driver.find_element_by_name("username")
    password_field = driver.find_element_by_name("password")
    login_btn = driver.find_element_by_name("login")

    username_field.send_keys(username)
    password_field.send_keys(password)
    login_btn.click()

def create_workshop_test():
    #login
    driver.get("http://localhost:8081/")
    username_field = driver.find_element_by_name("username")
    password_field = driver.find_element_by_name("password")
    login_btn = driver.find_element_by_name("login")

    username_field.send_keys("t1")
    password_field.send_keys("1234")
    login_btn.click()
    
    #navigate to create workshop page
    newworkshop_btn = driver.find_element_by_name("newworkshop")
    newworkshop_btn.click()

    #enter values

    title_field = driver.find_element_by_name("title")
    desc_field = driver.find_element_by_name("description")

    title_field.send_keys("Testworkshop")
    desc_field.send_keys("Description of Testworkshop")

    #add students
    addpers_btn = driver.find_element_by_name("addpers")
    addpers_btn.click()

    fn_searchfield = driver.find_element_by_name("fn_search")
    ln_searchfield = driver.find_element_by_name("ln_search")
    perssearchbtn = driver.find_element_by_name("perssearchbtn")

    fn_searchfield.send_keys("Lukas")
    ln_searchfield.send_keys("Beck")
    
    #perssearchbtn.click()

    addstudentbtn = driver.find_element_by_name("addstudentbtn")
    addstudentbtn.click()

    okbtn = driver.find_element_by_name("okbtn")
    okbtn.click()

    #add criteria

    time.sleep(3)
    addcriteriabtn = driver.find_element_by_name("addcriteriabtn")
    addcriteriabtn.click()

    criteria_title = driver.find_element_by_name("criteria_title")
    criteria_title.send_keys("Criteria 1 Test")

    expand_btn = driver.find_element_by_name("expand_btn")
    expand_btn.click()

    criteria_desc = driver.find_element_by_name("criteria_desc")
    criteria_desc.send_keys("Criteria 1 Description Test")

    #set deadline

    deadline_field = driver.find_elements_by_class_name("md-input")[3]
    deadline_field.send_keys("2021-10-12")

    #submit

    driver.find_element_by_tag_name("body").click()
    time.sleep(2)
    submit_btn = driver.find_element_by_name("submitbtn")
    submit_btn.click()


    time.sleep(5)

def delete_test():

    driver = webdriver.Firefox(executable_path="geckodriver.exe")

    driver.get("http://localhost:8081/")

    username_field = driver.find_element_by_name("username")
    password_field = driver.find_element_by_name("password")
    login_btn = driver.find_element_by_name("login")

    username_field.send_keys("t1")
    password_field.send_keys("1234")
    login_btn.click()

    time.sleep(5)

    rows = driver.find_elements_by_tag_name("tr")

    print(len(rows))

    for item in rows:
        if "Testworkshop" in item.get_attribute('innerHTML'):
            item.find_elements_by_tag_name("button")[0].click()
            driver.find_element_by_class_name("md-dialog").find_elements_by_tag_name("button")[1].click()
            print("HERE")
        
    time.sleep(5)

def test_edit_workshop():
    driver.get("http://localhost:8081/")
    login_test("t1", "1234")
    time.sleep(5)

    rows = driver.find_elements_by_tag_name("tr")

    print(len(rows))

    for item in rows:
        if "test" in item.get_attribute('innerHTML'):
            item.find_elements_by_tag_name("a")[1].click()
        
    time.sleep(5)
    driver.find_element_by_name("title").send_keys("EDIT")
    driver.find_element_by_name("description").send_keys("EDIT")

    #add students
    addpers_btn = driver.find_element_by_name("addpers")
    addpers_btn.click()

    addstudentbtn = driver.find_elements_by_name("addstudentbtn")[2]
    addstudentbtn.click()

    okbtn = driver.find_element_by_name("okbtn")
    okbtn.click()

    #edit criteria


    driver.find_element_by_name("criteria_name").send_keys("EDIT")

    time.sleep(2)
    expand_btn = driver.find_element_by_name("expand_btn")
    expand_btn.click()

    driver.find_element_by_name("criteria_content").send_keys("EDIT")

    #set anonymous

    driver.find_element_by_class_name("md-switch-container").click()

    #submit

    driver.find_element_by_name("submit_btn").click()

    time.sleep(2)

    rows = driver.find_elements_by_tag_name("tr")

    for item in rows:
        if "testEDIT" in item.get_attribute('innerHTML'):
            item.find_elements_by_tag_name("a")[1].click()

    time.sleep(10)



                
        


#login_test("lukasnowy", "1234")

test_edit_workshop()