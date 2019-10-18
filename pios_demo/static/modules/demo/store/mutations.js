const mutations = {
    setPageData(state,payload)  {
        let {isSuccess,data ,error} = payload;
        if(isSuccess){
            state.pagData = data;
            state.isSuccess = isSuccess;
        }else{
            state.isSuccess = isSuccess;
            state.error = error
        }
	},
    setItemNum(state,payload){
        state.tabs[0].num = payload.sale;
        state.tabs[1].num = payload.haltsale;
        state.tabs[2].num = payload.uncertify;
    }
}

export default mutations;