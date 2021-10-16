require('dotenv').config()
const express = require('express');
const cors = require("cors");
const router = require("./routes");
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const app = express();

const limiter = rateLimit({
	windowMs: 5000,
	max: 1,
	keyGenerator: (req) => {
		return req.headers['x-forwarded-for'] || req.ip;
	},
	message: 'Too many requests, please try again later.'
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(router);
app.use(errors());



const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Express listening on port ${port}`));