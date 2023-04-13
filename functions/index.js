const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe  = require("stripe")("sk_test_51MsAFrSDCIUjxFy9PdI7p5mBE93J8YZJksNjusifeo8BougJRaBvtGKZMG5pffaYTQtntN5SBJcMjBefGBJ9sUei00aEo2HnCa");

const app = express();

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send('hels'));
app.get("/ty", (req, res) => res.status(200).send('tahil'));
app.post("/payments/create",async (req,res) =>{
    const total = req.query.total;
    console.log("BOOM!!!", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})



const PORT = 5000;
// app.listen(PORT, () => {
//     console.log("server running");
// })

exports.api = functions.https.onRequest(app);