const puppeteer = require('puppeteer');


const selectCourse = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://e-rozklad.dut.edu.ua/timeTable/group?TimeTableForm%5Bfaculty%5D=7&TimeTableForm%5Bcourse%5D=&TimeTableForm%5Bgroup%5D=&TimeTableForm%5Bdate1%5D=04.09.2022&TimeTableForm%5Bdate2%5D=22.01.2023&TimeTableForm%5Br11%5D=5&timeTable=0"

    await page.goto(url);
    await page.waitForSelector('.form-inline')
    await page.click('#TimeTableForm_course_chosen > a')
    await page.waitForSelector('.chosen-container.chosen-container-single')

    const result = await page.evaluate(() => {

        let course = Array.from(document.querySelectorAll('#TimeTableForm_course_chosen > div > ul > .active-result:not(:first-child)'));
        let parsedCourse = course.map(value => value.innerText)

        return parsedCourse
    })

    return console.log(result)
}

console.log(selectCourse())
