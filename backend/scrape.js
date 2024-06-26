const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.scrape = (word) => {
    return axios.get(`https://www.amazon.com/s?k=${word}&ref=nb_sb_noss`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0' }
    }).then((response) => {
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on("error", () => {
            // No-op to skip console errors.
        });
        const dom = new JSDOM(response.data, { virtualConsole });

        const items = [];

        // const products = dom.window.document.querySelectorAll('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20'); //Better code, but just work for amazon brazil
        const products = dom.window.document.querySelectorAll('div.s-result-item');

        products.forEach((product) => {
            // const title = product.querySelector('span.a-size-base-plus.a-color-base.a-text-normal').textContent;                             //Better code, but just work for amazon brazil
            // const image = product.querySelector('img.s-image').getAttribute('src');                                                          //Better code, but just work for amazon brazil
            // const link = product.querySelector('a.a-link-normal.a-text-normal').getAttribute('href');                                        //Better code, but just work for amazon brazil
            // const reviewsElement = product.querySelector('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small');       //Better code, but just work for amazon brazil
            // const reviews = reviewsElement ? reviewsElement.lastChild.getAttribute('aria-label') : null;                                     //Better code, but just work for amazon brazil
            // const stars = product.querySelector('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').getAttribute('aria-label'); //Better code, but just work for amazon brazil
            // const price = product.querySelector('span.a-price > span.a-offscreen').textContent;                                              //Better code, but just work for amazon brazil

            const titleElement = product.querySelector('.a-size-medium.a-color-base.a-text-normal');

            let title = titleElement ? titleElement.textContent : '';

            if (!title) {
                const titleElement = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal');
                title = titleElement ? titleElement.textContent : '';
            }


            const imageElement = product.querySelector('img.s-image');
            const image = imageElement ? imageElement.getAttribute('src') : '';


            const linkElement = product.querySelector('a.a-link-normal.a-text-normal');
            const link = linkElement ? linkElement.getAttribute('href') : '';


            const reviewsElement = product.querySelector('.a-size-base.s-underline-text');
            const reviews = reviewsElement ? reviewsElement.textContent.trim() : null;

            const starsElement = product.querySelector('div.a-section.a-spacing-none.a-spacing-top-micro > div > span');
            const stars = starsElement ? starsElement.getAttribute('aria-label') : null;


            let priceElement = product.querySelector('span.a-price > span.a-offscreen');
            let price = priceElement ? priceElement.textContent : '';

            if (!price) {
                priceElement = product.querySelector('.a-row.a-size-base.a-color-secondary > span.a-color-base');
                price = priceElement ? priceElement.textContent : '';
            }
            if (!price) {
                price = 'No price info';
            }

            let element = {
                title,
                image,
                link: `https://amazon.com${link}`,
                price,
            }

            if (reviews) {
                element.reviews = reviews
            } else {
                element.reviews = 'No reviews info'
            }

            if (stars) {
                element.stars = stars
            } else {
                element.stars = 'No stars info'
            }

            if (title || image || link) {
                items.push(element);
            }
        });

        // console.log(items)

        return items
    }).catch((error) => {
        console.error('Error:', error);
        throw error; // rethrowing error to be handled by caller
    });
};
