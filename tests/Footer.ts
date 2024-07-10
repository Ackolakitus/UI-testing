import { expect, type Locator, type Page } from '@playwright/test';

export class Footer{
    readonly page: Page;
    readonly footerCountry: Locator;
    readonly privacyPolicy: Locator;

    constructor(page: Page){
        this.page = page;
        this.footerCountry = page.locator('(//div[@class="footer-info-country"])[2]');
        this.privacyPolicy = page.locator('//a[@href="/privacy" and @class="footer-link"]');
    }

    async getCountry(): Promise<string>{
        return await this.footerCountry.innerText();
    }

    async goToPrivacyPolicy(){
        await this.privacyPolicy.click();
    }
}