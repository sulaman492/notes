import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv()

export const instance=axios.create({
    baseURL:process.env.baseURL
})
