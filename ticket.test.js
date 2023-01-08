const {
    clickElement,
    clickSeat,
    spotTheDay,
    spotTheTime,
    getText,
} = require('./lib/commands.js');
let page;
const btnBook = 'body > main > section > button';
const btnGetTheCode = '.acceptin-button';

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://qamid.tmweb.ru/client/index.php');
});

afterEach(() => {
    page.close();
});

describe('Movie tickets tests', () => {
    test('First test - positive', async () => {
        const day = await spotTheDay(4);
        const time = await spotTheTime(2, 2);

        await clickElement(page, day);
        await clickElement(page, time);
        await clickSeat(page, 7, 5);
        await clickElement(page, btnBook);

        const actual = await getText(page, btnGetTheCode);
        await expect(actual).toContain('Получить код бронирования');

        // await page.waitForSelector(btnGetTheCode, {
        //     visible: true,
        // });
        // const actual = await page.$eval(
        //     btnGetTheCode,
        //     link => link.textContent,
        // );
        // expect(actual).toContain('Получить код бронирования');
    });

    test('Second test - positive', async () => {
        const day = await spotTheDay(7);
        const time = await spotTheTime(2, 2);

        await clickElement(page, day);
        await clickElement(page, time);
        await clickSeat(page, 8, 5);
        await clickElement(page, btnBook);

        const actual = await getText(page, btnGetTheCode);
        await expect(actual).toContain('Получить код бронирования');

        // await page.waitForSelector(btnGetTheCode, {
        //     visible: true,
        // });
        // const actual = await page.$eval(
        //     btnGetTheCode,
        //     link => link.textContent,
        // );
        // expect(actual).toContain('Получить код бронирования');
    });

    test('Third text - negative', async () => {
        const time = await spotTheTime(2, 3);

        await page.waitForSelector(time, {
            visible: true,
        });
        const actual = await page.$eval(time, link => link.className);
        expect(actual).toContain(
            'movie-seances__time acceptin-button-disabled',
        );
    });
});
