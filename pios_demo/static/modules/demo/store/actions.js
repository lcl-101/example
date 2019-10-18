import Axios from 'axios';
import Jsonp from '../../../common/utils/jsonp'




//Axios.defaults.withCredentials = true;
const actions = {
    /*获取商品列表*/
    getData({ commit, state}, payload) {
        Axios.get('/api/demand/list', {
            params: payload
        }).then(function (res) {
            console.log(res)
            commit('setPageData',{
                isSuccess: true,
                data:res.data
            });
        }).catch(function (error) {
            console.log(error)
            commit('setPageData',{
                isSuccess: false,
                error:error
            });
        });
    }
}


export default actions;
