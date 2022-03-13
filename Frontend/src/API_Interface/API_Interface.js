import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
   // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `localhost:3306/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    //http://blue.cs.sonoma.edu replaced localhost for personal use when I start the api server on blue.


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }


    async allTrivias() {
        return axiosAgent.get(`trivia/all-trivias`);
    }
    async triviasWithID(QuestionID) {
        return axiosAgent.get(`trivia/${QuestionID}`);
    }

    async allHighScore(){
        return axiosAgent.get(`high_score/allHighScores`)
    }
    async HighScoreAdder(username,Class,Score,Time){
        return axiosAgent.get(`high_score/${[username,Class,Score,Time]}`);
    }
}
