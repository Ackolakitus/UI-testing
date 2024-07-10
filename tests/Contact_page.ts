import { expect, type Locator, type Page } from '@playwright/test';

export class Contact_page{
    readonly page: Page;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly companyField: Locator;
    readonly messageField: Locator;
    readonly phoneNumberField: Locator;
    readonly submitButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameField = page.locator('#Your-name');
        this.emailField = page.locator('#Email');
        this.companyField = page.locator('#Company-Name');
        this.messageField = page.locator('#message');
        this.submitButton = page.locator('#get-in-touch-contact');
        this.phoneNumberField = page.locator('#Phone-number');
    }

    async fillName(name: string, surname: string){
        await this.nameField.fill(name+" "+surname);
    }

    async fillEmail(email: string){
        await this.emailField.fill(email);
    }

    async fillCompany(companyName: string){
        await this.companyField.fill(companyName);
    }

    async fillNumber(phoneNumber: string){
        await this.phoneNumberField.fill(phoneNumber);
    }

    async fillMessage(message: string){
        await this.messageField.fill(message);
    }

    async fillForm(name: string, 
        surname: string, email: string, 
        companyName: string, message: string, phoneNumber?: string){
            await this.fillName(name, surname);
            await this.fillEmail(email);
            await this.fillCompany(companyName);
            await this.fillMessage(message);
            if(phoneNumber)
                await this.fillNumber(phoneNumber);
        }

    async submit(){
        await this.submitButton.click();
    }

    async confirmAlertRobot(){
      this.page.once('dialog', async dialog => {
        expect(dialog.message()).toBe("Please confirm you’re not a robot.");
        dialog.accept().catch(() => {});
      });

      await this.submit();
    }


}
