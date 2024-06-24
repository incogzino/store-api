import mongoose from "mongoose";
import app from "./app";

const port = 8080

//Paypal client ID and secret key
const CLIENT_ID='AZt5pj370p-fEcyglM46wp05CC95q6-lE9WdSS5ozpfA7KDZEcuBJn077Y_HerekOS8x70qnc_pofpZA';
const CLIENT_SECRET='EFUYjgvR2xmHmZBjUW7ON-OzHzEDQzEZQ37Vl8Rd9NWeSSni2o189F2soTCkzp6GccoI04554B2jdccy';

//Paypal API endpoint for sandbox
const PAYPAL_API ='https://api-m.sandbox.paypal.com'

//MongoDB URL 
const DB_URI = "mongodb+srv://mongo_db_service_user:D2OG2mRC445X7pfd@outoforder.p4idpea.mongodb.net/OutOfOrder?retryWrites=true&w=majority&appName=OutOfOrder"

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
app.post('/create-payment', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'GB',
                        value: '100.00'
                    }
                }],
                application_context: {
                    return_url: 'http://localhost:3000/success',
                    cancel_url: 'http://localhost:3000/cancel'
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Error creating payment: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Data not found'});
    }
});

// Capture payment
app.post('/capture-payment', async (req, res) => {
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





async function main() {
    await mongoose.connect(DB_URI)

    app.listen(port, () => {
        console.log('Server started! ')
    })
}

main()
    .catch(e => console.error(e))
    