import {get, post, remove} from "request";

// getList
export const getList = data => get('/static/assets/data.json',data);

// getData
export const getData = data => post('/mobile/list/getList',data);


// getData
export const deleteData = data => remove('/static/assets/data.json',data);