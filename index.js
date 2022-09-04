const puppeteer = require('puppeteer');


const getSchedule = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://e-rozklad.dut.edu.ua/timeTable/group?TimeTableForm%5Bfaculty%5D=3&TimeTableForm%5Bcourse%5D=4&TimeTableForm%5Bgroup%5D=1547&TimeTableForm%5Bdate1%5D=12.09.2022&TimeTableForm%5Bdate2%5D=18.09.2022&TimeTableForm%5Br11%5D=5&timeTable=0"


    await page.goto(url);
    await page.waitForSelector('.timeTable')


    const result = await page.evaluate(() => {
        let dateOfParas = (number) => {
            let date = Array.from(document.querySelectorAll(`#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(1)`));
            let paras = Array.from(document.querySelectorAll(`.timeTable > tbody > tr:nth-child(${number}) > td:nth-child(2) > .cell.mh-50`));
            let time = Array.from(document.querySelectorAll(`.timeTable > tbody > tr:nth-child(${number}) > td:first-child > div:not(:first-child)> .start`));

            let parsedParas = paras.map(e => e.dataset.content)
            let parsedDate = date.map(e => e.innerText)
            let parsedTime = time.map(e => e.innerText)

            let day = {
                date: parsedDate[0],
                info: []
            }

            for(let i = 0; i !== parsedParas.length; i++ ) {
                debugger
                let info = {
                        subject: parsedParas[i],
                        time: parsedTime[i]
                    }
                day.info = [...day.info, info]
            }

            return day
        }

        let weekSchedule = []
        for(let i = 1; i !== 8; i++) {
            weekSchedule.push(dateOfParas(i))
        }
        return weekSchedule
    })

    return console.log(result)
}

console.log(getSchedule())

