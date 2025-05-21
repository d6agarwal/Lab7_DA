describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => prodItems.length);
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    // Start as true, if any don't have data, swap to false
    const allItemsPopulated = await page.$$eval('product-item', (prodItems) => {
      return prodItems.every(item => {
        // Grab all of the json data stored inside
        const data = item.data;
        // Make sure the title, price, and image are populated in the JSON
        return data.title && data.price && data.image;
      });
    });
    // Expect allArePopulated to still be true
    expect(allItemsPopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const buttonText = await (await button.getProperty('innerText')).jsonValue();
    expect(buttonText).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    await page.reload();
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text === 'Add to Cart') {
        await button.click();
        console.log(`Clicked "Add to Cart" for item ${i + 1}`);
        await new Promise(res => setTimeout(res, 50));
      }
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 20000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload();
    const prodItems = await page.$$('product-item');
    let allInCart = true;
    for (let item of prodItems) {
      const shadow = await item.getProperty('shadowRoot');
      const button = await shadow.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text !== 'Remove from Cart') allInCart = false;
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(allInCart).toBe(true);
    expect(cartCount).toBe('20');
  }, 15000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text === 'Remove from Cart') {
        await button.click();
        console.log(`Clicked "Remove from Cart" for item ${i + 1}`);
        await new Promise(res => setTimeout(res, 50));
      }
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 20000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload();
    const prodItems = await page.$$('product-item');
    let allRemoved = true;
    for (let item of prodItems) {
      const shadow = await item.getProperty('shadowRoot');
      const button = await shadow.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text !== 'Add to Cart') allRemoved = false;
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(allRemoved).toBe(true);
    expect(cartCount).toBe('0');
  }, 15000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});
