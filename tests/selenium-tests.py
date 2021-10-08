from selenium import webdriver
import time

driver = webdriver.Firefox(executable_path="geckodriver.exe")

def login_test(username, password):
    driver.get("http://localhost:8082/")
    username_field = driver.find_element_by_name("username")
    password_field = driver.find_element_by_name("password")
    login_btn = driver.find_element_by_name("login")

    username_field.send_keys(username)
    password_field.send_keys(password)
    login_btn.click()

def create_workshop_test():
    #login
    driver.get("http://localhost:8082/")
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


#login_test("lukasnowy", "1234")

create_workshop_test()