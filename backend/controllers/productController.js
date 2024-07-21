const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/Product');

const fetchPrice = async (productUrl, category) => {
    try {
        const { data } = await axios.get(productUrl);
        const $ = cheerio.load(data);

        const title = $('#productTitle').text().trim(); //extract product title from amazon website
        const priceTexts = $('.a-price-whole').map((index, item) => $(item).text().trim()).get(); //extract price and return firstprice amount
        const imageUrl = $('#imgTagWrapperId img').attr('src');  //extract image from the website

        if (priceTexts.length > 0) {
            const firstPriceText = priceTexts[0]; //Gets the first price found
            const cleanedPriceText = firstPriceText.replace(/[^0-9]/g, ''); //Removes non-numeric characters from the price
            const originalPrice = Number(cleanedPriceText);

            let discountedPrice = '';
            if (!isNaN(originalPrice)) {
                const discount = 0.10; 
                discountedPrice = (originalPrice * (1 - discount)).toFixed(2);
            }

            // Check if the product already exists by using url
            const existingProduct = await Product.findOne({ productLink: productUrl });

            if (existingProduct) {
                // Update the existing product's price details
                existingProduct.productPrice = cleanedPriceText;
                existingProduct.productDiscountPrice = discountedPrice;
                existingProduct.productImage = imageUrl;
                await existingProduct.save();

                return existingProduct;
            } else {
                // Create new product if it doesn't exist
                const productData = { 
                    productName: title, 
                    productPrice: cleanedPriceText, 
                    productDiscountPrice: discountedPrice,
                    productImage: imageUrl,
                    productLink: productUrl,
                    category
                };

                const newProduct = new Product(productData);
                await newProduct.save();

                return productData;
            }
        } else {
            return { productName: title, productPrice: 'Price not found', productImage: imageUrl };
        }
    } catch (error) {
        throw new Error('Failed to fetch product data');
    }
};

const fetchProduct = async (req, res) => {
    const { productLink, category } = req.body;
    try {
        const data = await fetchPrice(productLink, category);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { fetchProduct };
