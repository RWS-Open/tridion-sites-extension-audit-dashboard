import axios from "axios";
import { Buffer } from 'buffer';
class MetricsAPI {
    async fetchData<T>(url: string, username: string, pwd: string): Promise<T> {
        try{
            const response = await axios.get(url, {
                headers:{
                    "Authorization": `Basic ${Buffer.from(username + ':' + pwd).toString('base64')}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        }catch(error){
            throw new Error("Failed to fetch the data"+ error)
        }

    }
    async getData<T>(url: string, username: string, pwd: string): Promise<T> { 
        return await this.fetchData<T>(url, username, pwd);
    }
}

export const metrics = new MetricsAPI()