import { createStore } from 'vuex'

import auth from './modules/auth'
import donation from './modules/donation'
import profile from './modules/profile'

const store = createStore({
    modules:{
        auth,
        donation,
        profile,
    }
})

export default store