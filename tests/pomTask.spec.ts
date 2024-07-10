import { test, expect, type Page} from '@playwright/test';
import { Main_page } from './Main_page';
import { Careers_page } from './Careers_page';
import { Contact_page } from './Contact_page';
import { Events_page } from './Events_page';
import { Footer } from './Footer';
import { PrivacyPolicy_page } from './PrivacyPolicy_page';

[
  {
    name: 'Aleksandar',
    surname: 'Ristovski',
    email: 'aleksandar.ristovski@metergram.com',
    companyName: 'Metergram',
    phoneNumber: '072-259/829',
    message: 'Hello Metergram team!'
  },
  {
    name: 'Oliver',
    surname: 'Pinev',
    email: 'oliver.pinev@metergram.com',
    companyName: 'Metergram',
    phoneNumber: '123-456/789',
    message: 'Hello Metergram team!'
  },
  {
    name: 'Nikola',
    surname: 'Nikolikj',
    email: 'nikola.nikolikj@metergram.com',
    companyName: 'Metergram',
    phoneNumber: '987-654/321',
    message: 'Hello Metergram team!'
  }].forEach(element => {
    test(`Test case 1 for ${element.name} ${element.surname}`, async ({ page }) => {
      const mainPage = new Main_page(page);
      await mainPage.goto();
      await mainPage.gotoContact();
      await expect(await mainPage.page).toHaveURL('/contact');

      const contactPage = new Contact_page(mainPage.page);
    //   await contactPage.fillName(element.name, element.surname);
    //   await contactPage.fillEmail(element.email);
    //   await contactPage.fillCompany(element.companyName);
    //   await contactPage.fillMessage(element.message);
      await contactPage.fillForm(element.name, element.surname, element.email, element.companyName, element.message);
      await contactPage.confirmAlertRobot();

      const footer = new Footer(page);
      expect(await footer.getCountry()).toBe("United States");
    });
  });

test('Test case 2', async ({ page }) => {
    const mainPage = new Main_page(page);
    await mainPage.goto();
    await mainPage.gotoEvents();
    await expect(await mainPage.page).toHaveURL('/events');
    const eventsPage = new Events_page(mainPage.page);

    await eventsPage.pastEventsTab.click();
    
    await eventsPage.printEvents();
  
    const footer = new Footer(eventsPage.page);
    expect(await footer.getCountry()).toBe("United States");
});

test('Test case 3', async ({ page })=>{
    const mainPage = new Main_page(page);
    await mainPage.goto();
    await mainPage.gotoCareers();
    await expect(await mainPage.page).toHaveURL('/careers');

    const careersPage = new Careers_page(mainPage.page);
    await careersPage.jobsButton.click();
    
    const newPage = await careersPage.applyForJob(" DevOps Engineer (Azure)");

    await expect(newPage).toHaveURL(/https:\/\/.*linkedin\.com\/jobs/);
    const textH1 = await newPage.locator('//h1[contains(@class, "core-section-container__main-title")]').innerText();
    expect(textH1).toEqual("We couldn’t find a match for Metergram jobs in North Macedonia");

    const footer = new Footer(careersPage.page);
    expect(await footer.getCountry()).toBe("United States");
});

test('Test case 4', async ({ page })=>{
    const mainPage = new Main_page(page);
    await mainPage.goto();

    const footer = new Footer(mainPage.page);
    await footer.goToPrivacyPolicy();
    await expect(await mainPage.page).toHaveURL('/privacy');

    const policy_page = new PrivacyPolicy_page(mainPage.page);
    
    await policy_page.printCookies();
    expect(await footer.getCountry()).toBe("United States");
})