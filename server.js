const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const Joi = require('Joi');

const app = express();
const port = process.env.PORT || 8000;
const connection_url =
	'mongodb+srv://system:admin@cluster0.dkawi.mongodb.net/phototerracedb?retryWrites=true&w=majority';

app.use(express.json());
app.use(Cors());

const Collection = require('./models/collectiondB');
const Images = require('./models/collectiondB');

mongoose.connect(
	connection_url,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	},
	console.log('Connected to db')
);

// validation for user
const userValidSchema = Joi.object({
	user: Joi.string().required().email(),
});

app.get('/', (req, res) => {
	res.status(200).send('You visited the photo gallery app');
});

app.get('/upload-images', (req, res) => {
	const dbColl = req.body;

	Collection.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/upload-images', (req, res, next) => {
	const dbColl = req.body;

	Collection.create(dbColl, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

//app.post('/upload-images/{:id}/images/');

app.delete('/upload-images/:aid/images/:id', (req, res, next) => {
	const aid = req.params.id;
	const id = req.params.images.id;
	Collection.findOne(async (err, aid) => {
		if (err) {
			console.log(err.message);
		} else {
			Images.findById(async err => {
				if (err) {
					console.log(err.message);
				} else {
					const result = await Images.findByIdAndDelete(id);
					res.send(result);
					next();
				}
			});
			next();
		}
	});
});

app.listen(port, () => console.log(`Listening to requests on ${port}`));
