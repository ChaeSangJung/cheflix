// action type
const SUCCESS = "search/SUCCESS";
const LOADING = "serach/LOADING";
const ERROR = "serach/ERROR";

// 액션 함수 선언
export const searchSeuccess = (data, keyword, totalPages) => ({
    type: SUCCESS,
    data,
    keyword,
    totalPages
});

export const searchLoading = (loading) => ({
    type: LOADING,
    loading
});

export const searchError = (error) => ({
    type: ERROR,
    error
});

// 초기상태 선언
const initialState = {
    loading: true,
    data: [],
    error: "",
    keyword: "",
    totalPages: 0
}

// reducer
const searchReducer = (state = initialState, action) => {
    switch (action.type){
        case LOADING:
            return {
                ...state,
                loading: true,
                data: [],
                error: "",
                keyword: "",
                totalPages: 0                
            }
        case SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                error: "",
                keyword: action.keyword,
                totalPages: action.totalPages
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.error,
                keyword: "",
                totalPages: 0                
            }
        default:
            return state;
    }
}

export default searchReducer;