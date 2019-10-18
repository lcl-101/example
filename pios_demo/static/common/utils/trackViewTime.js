import trackLog from './track'

let _params = {
    pos_type: '',
    pos_value: '',
    model_id: '',
    model_name: 'timer',
    model_index: 1,
    visit_type: 'page_out'
}

const getTime = function(){
    return new Date().getTime()
}

let _s_time = getTime()

const init = (params) => {
    if (typeof params == "object") {
        for (var k in params) {
            _params[k] = params[k];
        }
    }
}

const end = () => {
    let timer = (getTime() - _s_time)/1000
    _params.model_id = timer
    trackLog.sendNative(_params)
}

export default {
    init,
    end
}