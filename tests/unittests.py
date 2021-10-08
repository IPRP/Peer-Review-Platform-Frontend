import unittest
from selenium import webdriver
import time

class PeerReviewTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="geckodriver.exe")
    
    def test_login_teacher(self):
        self.driver.get("http://localhost:8081/")
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("t1")
        password_field.send_keys("1234")
        login_btn.click()

        assert "Neuer Workshop" in self.driver.page_source

    def test_login_student(self):
        self.driver.get("http://localhost:8081/")
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("s1")
        password_field.send_keys("1234")
        login_btn.click()

        assert "Laufende Reviews" in self.driver.page_source

    def test_create_workshop(self):
            #login
        self.driver.get("http://localhost:8081/")
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("t1")
        password_field.send_keys("1234")
        login_btn.click()
    
        #navigate to create workshop page
        newworkshop_btn = self.driver.find_element_by_name("newworkshop")
        newworkshop_btn.click()

        #enter values

        title_field = self.driver.find_element_by_name("title")
        desc_field = self.driver.find_element_by_name("description")

        title_field.send_keys("Testworkshop")
        desc_field.send_keys("Description of Testworkshop")

        #add students
        addpers_btn = self.driver.find_element_by_name("addpers")
        addpers_btn.click()
        
        fn_searchfield = self.driver.find_element_by_name("fn_search")
        ln_searchfield = self.driver.find_element_by_name("ln_search")
        perssearchbtn = self.driver.find_element_by_name("perssearchbtn")

        #fn_searchfield.send_keys("Lukas")
        #ln_searchfield.send_keys("Beck")
        
        #perssearchbtn.click()

        addstudentbtn = self.driver.find_element_by_name("addstudentbtn")
        addstudentbtn.click()

        okbtn = self.driver.find_element_by_name("okbtn")
        okbtn.click()

        #add criteria

        time.sleep(3)
        addcriteriabtn = self.driver.find_element_by_name("addcriteriabtn")
        addcriteriabtn.click()

        criteria_title = self.driver.find_element_by_name("criteria_title")
        criteria_title.send_keys("Criteria 1 Test")

        expand_btn = self.driver.find_element_by_name("expand_btn")
        expand_btn.click()

        criteria_desc = self.driver.find_element_by_name("criteria_desc")
        criteria_desc.send_keys("Criteria 1 Description Test")

        #set deadline

        deadline_field = self.driver.find_elements_by_class_name("md-input")[3]
        deadline_field.send_keys("2021-10-12")

        #submit

        self.driver.find_element_by_tag_name("body").click()
        time.sleep(2)
        submit_btn = self.driver.find_element_by_name("submitbtn")
        submit_btn.click()

        time.sleep(2)

        assert "Testworkshop" in self.driver.page_source

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
