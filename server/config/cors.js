let whiteList = ["http://localhost:3000"];
let corsOptions = {
    origin : (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

module.exports = corsOptions;