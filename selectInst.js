const puppeteer = require('puppeteer');


const selectInst = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://e-rozklad.dut.edu.ua/timeTable/group"


    await page.goto(url);
    await page.waitForSelector('.form-inline')
    await page.click('#TimeTableForm_faculty_chosen > a')
    await page.waitForSelector('.chosen-container.chosen-container-single')

    const result = await page.evaluate(() => {

        let data = Array.from(document.querySelectorAll('.chosen-container.chosen-container-single > div > ul > li:not(:first-child)'));
        let parsedData = data.map(value => value.innerText)

        return parsedData
    })

    return console.log(result)
}

console.log(selectInst())


