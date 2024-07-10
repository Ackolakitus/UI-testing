import { expect, type Locator, type Page } from '@playwright/test';

export class Main_page{
    readonly page: Page;
    readonly eventsPage: Locator;
    readonly careersPage: Locator;
    readonly contactUs: Locator;


    constructor(page: Page){
        this.page = page;
        this.eventsPage = page.locator('xpath=(//a[@href="/events"])[3]');
        this.careersPage = page.locator('xpath=(//a[@href="/careers"])[1]');
        this.contactUs = page.locator('xpath=(//a[@href="/contact"])[1]');
    }

    async goto(){
        await this.page.goto("");
    }

    async gotoEvents(){
        await this.eventsPage.click();
    }

    async gotoCareers(){
        await this.careersPage.click();
    }

    async gotoContact(){
        await this.contactUs.click();
    }
}