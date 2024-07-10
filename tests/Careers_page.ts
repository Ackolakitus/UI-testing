import { expect, type Locator, type Page } from '@playwright/test';
export class Careers_page{
    readonly page: Page;
    readonly jobsButton: Locator;
    readonly jobsDiv: Locator;

    constructor(page: Page){
        this.page = page;
        this.jobsButton = page.locator("//a[@href='#jobs']");
        this.jobsDiv = page.locator('//div[@id="jobs"]//div[@role="list"]');
    }

    async applyForJob(job: string){
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.jobsDiv.locator('//div[@role="listitem" and .//h4[text()="' + job + '"]]//div[@class="ops-apply-now-text"]').click()
        ]);
        return newPage;
    }
    // DevOps Engineer (Azure)

    //div[@role="listitem" and .//h4[text()=" DevOps Engineer (Azure)"]]
}