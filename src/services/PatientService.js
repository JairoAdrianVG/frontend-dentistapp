import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/patient"

class PatientService {

    getPatients(){
        return axios.get(API_BASE_URL);
    }
}

export default new PatientService();