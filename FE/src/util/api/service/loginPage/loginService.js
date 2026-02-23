import api from '../../axiosApi';

export const loginService = {
    login(data) {
        return api.post('/users/auth/login', data);
    }
}