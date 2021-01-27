const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
	default: '',
};

const imageSchema = mongoose.Schema(
	{
		imageUrl: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const collectionSchema = new mongoose.Schema({
	user: reqString,

	images: [imageSchema],
});

module.exports = mongoose.model('collection', collectionSchema);
module.exports = mongoose.model('images', imageSchema);
