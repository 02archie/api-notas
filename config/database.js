const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose
        .connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Database ONLINE'))
        .catch(err => console.log('Connection failed', err));
}

module.exports = {
    dbConnection
}