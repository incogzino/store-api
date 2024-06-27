import Product from "../models/productsModel";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'

const paymentsRouter = express.Router()

//Paypal client ID and secret key
const CLIENT_ID='AZt5pj370p-fEcyglM46wp05CC95q6-lE9WdSS5ozpfA7KDZEcuBJn077Y_HerekOS8x70qnc_pofpZA';
const CLIENT_SECRET='EFUYjgvR2xmHmZBjUW7ON-OzHzEDQzEZQ37Vl8Rd9NWeSSni2o189F2soTCkzp6GccoI04554B2jdccy';

//Paypal API endpoint for sandbox
const PAYPAL_API ='https://api-m.sandbox.paypal.com'

//Gets the access token from PayPal
const getAccessToken = async () => {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`,
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Error getting access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
};
// Create a payment
paymentsRouter.post('/create-payment', async (req, res) => {
    try {
        //Get productId to grab the price of the item
        const {productId} = req.body;
        
        // Grabs the productId from the mongoose product model
        const product = await Product.findOne({productId:productId});
        if (!product) {
            throw new Error('Product Id not found'); 
        }
        // Price of the product 
        const productPrice = product.price

        const accessToken = await getAccessToken();
        const guid = uuidv4()
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'PayPal-Request-Id': guid
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'GBP',
                        value: productPrice
                    }
                }],
                application_context: {
                    return_url: 'http://localhost:3000/success',
                    cancel_url: 'http://localhost:3000/cancel'
                }
            })
        });

        if (!response.ok) {
            console.log(response)
            console.log(response.json)
            console.log(response.text)
            throw new Error(`Error creating payment: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Data not found'});
    }
});

// Capture payment
paymentsRouter.post('/capture-payment', async (req, res) => {
    const { orderId } = req.body;
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error capturing payment: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Data not found' });
    }
});

export default paymentsRouter;
