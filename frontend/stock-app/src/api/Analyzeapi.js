import axios from "axios";


const BaseUrl = "http://localhost:8000"

export const analyzeStock = async (data) => {
    try{
        const res = await axios.post(`${BaseUrl}/analyze`,data)
        return res.data
    }catch(error){
        throw error;
    }
}