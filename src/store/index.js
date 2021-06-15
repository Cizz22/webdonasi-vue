import { createStore } from 'vuex'

import auth from './modules/auth'
import donation from './modules/donation'
import profile from './modules/profile'
import slider from './modules/slider'


const store = createStore({
    modules:{
        auth,
        donation,
        profile,
        slider
    }
})

export default store