import { createStore } from 'vuex'

import auth from './modules/auth'
import donation from './modules/donation'
import profile from './modules/profile'
import slider from './modules/slider'
import category from './modules/category'

const store = createStore({
    modules:{
        auth,
        donation,
        profile,
        slider,
        category
    }
})

export default store