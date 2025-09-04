/* import axios from 'axios';
import { Buffer } from 'buffer';
import { config } from './config-sample';

const user = '';
const password = '';
const basicAuth = `Basic ${Buffer.from(user + ':' + password).toString('base64')}`;

export const openSearchClient = axios.create({
    baseURL:config.OPENSEARCH_BASE_URL,
    headers:{
        Authorization:basicAuth,
        "Content-Type":"application/json"
    }
}) */