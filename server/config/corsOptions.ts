const allowedOrigins = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost:3001',
    'http://102.22.141.170'
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('origin', origin)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true,
}

export default corsOptions;