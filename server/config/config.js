
const config = {
    port : process.env.PORT || 4000,
    jwtSecret : process.env.JWT_SECRET || 'Devel0pment',
    mongoURI : process.env.MONGODB_URI || 'mongodb://localhost:27017/streemie',
    coinDecimal : 4
};

module.exports = config;