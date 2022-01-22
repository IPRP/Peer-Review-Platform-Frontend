import unittest
from selenium import webdriver
import time

class PeerReviewTest(unittest.TestCase):

    BASEURL = "https://iprp.dergeorg.at"

    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="geckodriver.exe")
    
    def test_login_teacher(self):
        self.driver.get(self.BASEURL)
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("t1")
        password_field.send_keys("1234")
        login_btn.click()

        time.sleep(2)

        assert "/teacherdashboard" in self.driver.current_url

    def test_login_student(self):
        self.driver.get(self.BASEURL)
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("s3")
        password_field.send_keys("1234")
        login_btn.click()

        time.sleep(1)

        assert "/studentdashboard" in self.driver.current_url

    def test_create_workshop(self):

        self.driver.get(self.BASEURL)


        self.test_login_teacher()
    
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
        deadline_field.send_keys("2021-12-12")

        #submit

        self.driver.find_element_by_tag_name("body").click()
        time.sleep(2)
        submit_btn = self.driver.find_element_by_name("submitbtn")
        submit_btn.click()

        time.sleep(2)

        assert "Testworkshop" in self.driver.page_source

    def test_delete_workshop(self):
        self.driver.get(self.BASEURL)

        self.test_login_teacher()

        rows = self.driver.find_elements_by_tag_name("tr")

        for item in rows:
            if "Testworkshop" in item.get_attribute('innerHTML'):
                item.find_elements_by_tag_name("button")[0].click()
                self.driver.find_element_by_class_name("md-dialog").find_elements_by_tag_name("button")[1].click()

        assert "Testworkshop" not in self.driver.page_source
        

    def test_edit_workshop(self):
        self.test_login_teacher()
        time.sleep(5)

        rows = self.driver.find_elements_by_tag_name("tr")

        for item in rows:
            if "Testworkshop" in item.get_attribute('innerHTML'):
                item.find_elements_by_tag_name("a")[1].click()
        
        time.sleep(5)
        self.driver.find_element_by_name("title").send_keys("EDIT")
        self.driver.find_element_by_name("description").send_keys("EDIT")

        #add students
        addpers_btn = self.driver.find_element_by_name("addpers")
        addpers_btn.click()

        addstudentbtn = self.driver.find_elements_by_name("addstudentbtn")[2]
        addstudentbtn.click()

        okbtn = self.driver.find_element_by_name("okbtn")
        okbtn.click()

        #edit criteria


        self.driver.find_element_by_name("criteria_name").send_keys("EDIT")

        time.sleep(2)
        expand_btn = self.driver.find_element_by_name("expand_btn")
        expand_btn.click()

        self.driver.find_element_by_name("criteria_content").send_keys("EDIT")

        #set anonymous

        self.driver.find_element_by_class_name("md-switch-container").click()

        #submit

        self.driver.find_element_by_name("submit_btn").click()

        time.sleep(2)

        rows = self.driver.find_elements_by_tag_name("tr")

        for item in rows:
            if "TestworkshopEDIT" in item.get_attribute('innerHTML'):
                item.find_elements_by_tag_name("a")[1].click()
        
        time.sleep(2)
        title = self.driver.find_element_by_name("title").get_attribute('value')
        description = self.driver.find_element_by_name("description").get_attribute('value')
        members = self.driver.find_elements_by_tag_name("tbody")[0].get_attribute('innerHTML')
        criteria = self.driver.find_element_by_name("criteria_name").get_attribute('value')
        anonymous = self.driver.find_element_by_name("sw_an").get_attribute('value')


        self.assertEqual(title, "TestworkshopEDIT")
        self.assertEqual(description, "Description of TestworkshopEDIT")
        self.assertIn("Max Mustermann", members)
        self.assertIn("Gordon Freeman", members)
        self.assertEqual("KriteriumCriteria 1 TestEDIT", criteria)
        self.assertEqual(anonymous, "false")
    
    def test_submission(self):
        self.test_login_student()
        
        self.driver.find_element_by_class_name("submission_btn").click()
        
        self.driver.find_element_by_name("title").send_keys("Meine Submission")
        self.driver.find_element_by_name("comment").send_keys("Mein Comment")
        
        self.driver.find_element_by_class_name("btn_save").click()
        
        assert "/studentdashboard" in self.driver.current_url
        
        time.sleep(5)
        
    def test_write_review(self):
        
        self.driver.get(self.BASEURL)
        username_field = self.driver.find_element_by_name("username")
        password_field = self.driver.find_element_by_name("password")
        login_btn = self.driver.find_element_by_name("login")

        username_field.send_keys("s3")
        password_field.send_keys("1234")
        login_btn.click()

        time.sleep(1)
        
        self.driver.find_element_by_class_name("btn_review").click()
        
        self.driver.find_element_by_name("points_inp").send_keys("5")
        
        self.driver.find_element_by_name("gesamtfeedback").send_keys("Sehr gut gemacht!")
        
        self.driver.find_element_by_class_name("btn_save").click()

        assert "/studentdashboard" in self.driver.current_url

        


    def suite(self):
        suite = unittest.TestSuite()
        suite.addTest(PeerReviewTest("test_login_teacher"))
        suite.addTest(PeerReviewTest("test_login_student"))
        suite.addTest(PeerReviewTest("test_create_workshop"))
        suite.addTest(PeerReviewTest("test_edit_workshop"))
        suite.addTest(PeerReviewTest("test_submission"))
        suite.addTest(PeerReviewTest("test_write_review"))
        suite.addTest(PeerReviewTest("test_delete_workshop"))

        return suite

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    runner = unittest.TextTestRunner(failfast=True)
    runner.run(PeerReviewTest.suite(PeerReviewTest))
    #unittest.main()
