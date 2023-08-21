const bodyParser = require('body-parser');
const conn = require('../config/db')
const stripe = require('stripe')('');

const app = require("express").Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to create a card token
app.post('/stripePayment', async (req, res) => {
    let customerId = ''

    // genrate card token
    try {
        const token = await stripe.tokens.create({
            card: {
                name: req.body.nameOnCard,
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
        });

        //genrate customer id
        const email = req.body.email;

        // check user by mail id 
        const customers = await stripe.customers.list({
            email: email,
            limit: 1,
        });
        // if user already exists then it retrive userid
        if (customers.data.length > 0) {
            customerId = customers.data[0].id
        }
        // else it genrate new user and get user id
        else {
            const newCustomer = await stripe.customers.create({
                name: req.body.name,
                email: email,
                address: {
                    line1: req.body.line1,
                    line2: req.body.line2,
                    city: req.body.city,
                    postal_code: req.body.postal_code,
                    country: req.body.country
                }
            });
            customerId = newCustomer.id;

        }
        // payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: req.body.currency,
            customer: customerId,
            payment_method_types: ['card'],
            description: 'nice'
        });

        // payment method
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: token.id
            },
        });
        const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
            payment_method: paymentMethod.id,
            return_url: `https://infinitytuts.com?pacId=${req.body.pacId}&userId=${req.body.userId}`,
        });
        if (confirmedIntent.status === 'requires_action') {
            const authenticationUrl = confirmedIntent.next_action.redirect_to_url.url;
            return res.send(`'${authenticationUrl}'`);
        }

        return res.send('Payment successful!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/stripeAfterPayment', async (req, res) => {
    let paymentIntentId = req.body.paymentIntentId
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    let paymentId = paymentIntent.id
    let paymentStatus = paymentIntent.status
    let paymentAmount = paymentIntent.amount
    let paymentMethod = paymentIntent.payment_method
    let userId = req.body.userId
    let pacId = req.body.pacId;

    const sucess = {
        paymentId: paymentId,
        paymentStatus: paymentStatus,
        paymentAmount: paymentAmount / 100,
        paymentMethod: paymentMethod,
        userId: userId,
        pacId: pacId
    }

    if (paymentStatus == 'requires_payment_method') {
        const requires_payment_method = {
            paymentId: paymentId,
            paymentStatus: paymentStatus,
            paymentAmount: paymentAmount / 100,
            paymentMethod: '',
            userId: userId,
            pacId: pacId,
            message:paymentIntent.last_payment_error.code
        }

        let query = ` INSERT INTO transaction SET ?`
        conn.query(query, requires_payment_method, (err, result) => {
            if (err) {
                res.send('Error inserting data into the database:', err);
            } else {
                console.log('Data inserted into the database:', result);
                res.send({
                    sucess: false,
                    message: 'Please provide payment method',
                    error: paymentIntent.last_payment_error.code,
                    issue: paymentIntent.last_payment_error.message
                });
            }
        })

    }
    else{
    let query = ` INSERT INTO transaction SET ?`
    conn.query(query, sucess, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data into the database:', err);
        } else {
            res.status(200).send({
                sucess: true,
                message: 'Data inserted into the database',
                data: sucess
            });
        }
    })
}
})

module.exports = app