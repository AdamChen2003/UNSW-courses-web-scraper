import puppeteer from "puppeteer";
import {compile} from "html-to-text"

const getSummary = async (course_code, year) => {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()
    await page.goto("https://www.handbook.unsw.edu.au/undergraduate/courses/" + year + "/" + course_code, {
        waitUntil: "domcontentloaded",
    })
    const content = await page.content()
    await browser.close();
    
    const exp_title = /<title>Handbook.+<\/title>/g
    const title_match = content.match(exp_title)
    let title = title_match ? title_match[0] : null
    
    const exp_description = /<\/div><div aria-hidden="true"><p>.+<div class="css-ehhfa4-Box-Flex-ToggleContainer e1tb03p80">/g
    const description_match = content.match(exp_description)
    let description = description_match ? description_match[0] : null
    
    const compiled_convert = compile()
    title = compiled_convert(title).trim().replace('Handbook - ', course_code + ': ')
    description = compiled_convert(description).trim()

    console.log()
    console.log(title)
    console.log(description)
    console.log()
};

getSummary('MATH3411', '2023');