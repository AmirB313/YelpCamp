const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: `61d0f588c807686ed0bd7cee`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, modi illum corrupti temporibus iusto velit sequi dolor itaque perspiciatis, tenetur porro voluptate omnis ad quibusdam, eaque pariatur autem dolore voluptatum.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcsj78o41/image/upload/v1641240056/YelpCamp/kefcifrmikpjrvnoklbx.jpg',
                    filename: 'YelpCamp/kefcifrmikpjrvnoklbx'
                },
                {
                    url: 'https://res.cloudinary.com/dcsj78o41/image/upload/v1641240057/YelpCamp/udlbknu2icrttsehjkdw.jpg',
                    filename: 'YelpCamp/udlbknu2icrttsehjkdw'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})