import api from '../../axiosApi';

export const mainService = {
    logout() {
        return api.post('/users/auth/logout');
    }
}