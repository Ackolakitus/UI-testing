import { expect, type Locator, type Page } from '@playwright/test';

export class Events_page{
    readonly page: Page;
    readonly pastEventsTab: Locator;
    readonly nextButton: Locator;
    readonly numberOfPages: number;
    readonly pastEventsDiv: Locator;

    constructor(page: Page){
        this.page = page;
        this.pastEventsTab = page.locator('#w-tabs-0-data-w-tab-1');
        this.nextButton = page.locator('//a[@id="next-page-btn-past"]');
        this.numberOfPages =   parseInt((page.locator("#w-node-bbbe14ae-8188-6c68-27c7-9ccc17dc4726-eac0478a").innerText()).toString().split(" / ")[1]);
        this.pastEventsDiv = page.locator("//div[@data-w-tab='PAST EVENTS']");
    }

    async printEvents() {
        let currentPage = 1;
        while (currentPage <= this.numberOfPages) {
            const baseElement = this.pastEventsDiv;
    
            const startDates = await baseElement.locator(".events-card-start-date").all();
            const endDates = await baseElement.locator(".events-card-end-date").all();
            const locations = await baseElement.locator(".events-card-location").all();
            const titles = await baseElement.locator("h2.events-card-title").all();
            const descriptions = await baseElement.locator(".events-card-description-past").all();
    
            console.log(`====================== ${currentPage} ============================`);
    
            for (let i = 0; i < startDates.length; i++) {
                console.log(
                    `Date: ${await startDates[i].innerText()} ${await endDates[i].innerText()}\n` +
                    `Location: ${await locations[i].innerText()}\n` +
                    `Name: ${await titles[i].innerText()}\n` +
                    `Description: ${await descriptions[i].innerText()}\n`
                );
            }
    
            if (currentPage != this.numberOfPages) {
                try {
                    await this.nextButton.click();
                } catch (error) {
                    console.error(`Error clicking next button: ${error}`);
                    break;
                }
            }
            currentPage++;
        }
    }
}