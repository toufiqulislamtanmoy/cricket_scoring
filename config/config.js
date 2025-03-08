import { config } from "dotenv";
config();
const dev = {
    app: {
        port: process.env.PORT || 5000
    },
    db: {
        mongoURI: process.env.MONGO_URI
    }
}

export default dev;