import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const Config = {
    test_mode: false,
    database: {
      host: process.env.HOST || "",
      port: process.env.PORT || "",
      user: process.env.USER || "",
      password: process.env.PASS || "",
      name: process.env.NAME || "",
    },
  };
  
  export default Config;