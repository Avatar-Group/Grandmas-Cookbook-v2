const { createSlice } = require('@reduxjs/toolkit');
const React = require('react')


const modalSlice = createSlice({
    name: 'modal',

    initialState: {
        urlScrape: {},
        keywordResults: [],
        active: false,
    },

    reducers: {
        setUrlResult: (state, param) => {
            const { payload } = param;
            state.urlScrape = Object.assign(payload, state.urlScrape);
        },
        clearUrlResult: (state) => {
            state.urlScrape = {};
        },
        setKeywordResult: (state, param) => {
            const { payload } = param;
            state.keywordResults = [...state.keywordResults, ...payload]
        },
        clearKeywordResult: (state) => {
            state.keywordResults = [];
        },
        toggleModalOn: (state = initialState) => {
            state.active = true;
        },
        toggleModalOff: (state = initialState) => {
            state.active = false;
        }
    }
})

const { actions, reducer } = modalSlice;

export const { 
    setKeywordResult, 
    setUrlResult, 
    clearKeywordResult, 
    clearUrlResult, 
    toggleModalOn, 
    toggleModalOff 
} = actions;

export default reducer