import Dotenv from 'dotenv'
import 'module-alias/register';
import api from './src/index'
Dotenv.config();
new api().start()
