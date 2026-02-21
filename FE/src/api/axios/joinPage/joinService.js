import api from '../axiosApi';

export const joinService = {
    join: (joinData) => {
        return api.post('/users/auth/signup', joinData);
    }
}