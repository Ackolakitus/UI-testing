import { expect, type Locator, type Page } from '@playwright/test';

export class PrivacyPolicy_page{
    readonly page: Page;
    readonly cookiesTitle: Promise<string>;
    readonly cookiesText: Promise<string>;
    readonly cookiesItems: Promise<string>;
    
    constructor(page: Page){
    this.page = page;
    this.cookiesTitle = page.locator('//h2[text()="How do we use cookies?"]').innerText();
    this.cookiesText = page.locator('//h2[text()="How do we use cookies?"]/following-sibling::div[1]').innerText();
    this.cookiesItems = page.locator('//h2[text()="How do we use cookies?"]/following-sibling::ul[1]').innerText();
    }

    async getCookiesTitle(){
        return await this.cookiesTitle;
    }

    async getCookiesText(){
        return await this.cookiesText;
    }

    async getCookiesItems(){
        return (await this.cookiesItems).split("\n");
    }

    async printCookies(){
        console.log(`${await this.cookiesTitle}\n${await this.cookiesText}`);
        (await this.getCookiesItems()).forEach(item => {console.log(`• ${item}`);});
    }
}