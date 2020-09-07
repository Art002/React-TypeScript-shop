import axios from 'axios';

export const fetchClothing = () => {
    return axios.get('https://clothing-shop-f1230.firebaseio.com/-MFr-Ws9CLguaHrCGq_s.json')   
}

export const fetchCategories = () => {
    return axios.get('https://clothing-shop-f1230.firebaseio.com/-MG-8vjrYU1n6WEjH3MD.json')
}



