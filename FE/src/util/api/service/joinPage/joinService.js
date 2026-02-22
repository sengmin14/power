import api from '../../axiosApi';

export const joinService = {
    
    /** 회원가입 */
    join: (joinData) => {
        return api.post('/users/auth/signup', joinData);
    },

    /** 필드 중복확인 */
    checkField(paramMap) {

        const endPoint = {
            "loginId" : "/users/checkLoginId",
            "nickname" : "/users/checkNickname"
        }
        return api.get(endPoint[paramMap.name], {params : paramMap.data});
    }
}