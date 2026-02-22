export const cmnUtil = {
    /** 
     * @name isEmpty
     * @param {any} value
     * @returns {boolean}
     * @description 파라미터의 값이 비어있으면 true, 값이 있으면 false를 반환한다.
     * @author Rhinod
     */
    isEmpty(value) {
        // 1. null이나 undefined인 경우
        if (value === null || value === undefined) return true;

        // 2. 문자열일 경우 (공백만 있는 경우 포함)
        if (typeof value === 'string' && value.trim() === '') return true;

        // 3. 배열일 경우 (길이가 0인지 확인)
        if (Array.isArray(value) && value.length === 0) return true;

        // 4. 객체일 경우 (키가 하나도 없는지 확인)
        if (typeof value === 'object' && Object.keys(value).length === 0) return true;

        return false;
    }
}