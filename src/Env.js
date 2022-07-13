import axios from 'axios';
const fetchApi= async (city)=>{
    const url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b35281c356be2b5409713f36793a875b`;
    let response= await axios.get(url)
    //console.log(response)
    return response.data
}

export default fetchApi;