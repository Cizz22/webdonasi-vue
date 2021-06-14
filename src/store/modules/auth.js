import Api from '../../api/api'

const auth = {

    namespaced : true,

        //state
        state: {
         //state untuk "token", pakai localStorage, untuk menyimpan informasi tentang token
             token: localStorage.getItem('token') || '',

        //state "user", pakai localStorage, untuk menyimpan data user yang sedang login
             user: JSON.parse(localStorage.getItem('user')) || {}, 
        },
    
        //mutations
        mutations: {
            AUTH_SUCCESS(state, token, user){
                state.token = token
                state.user = user
            },
            GET_USER(state, user){
                state.user = user
            },
            AUTH_LOGOUT(state){
                state.user = {}
                state.token = ''
            }
        },
    
        //actions
        actions: {
            
           register({commit} , user){
                

            return new Promise((resolve, reject)  => {
                Api.post('/register', {
                        name : user.name,
                        email:user.email,
                        password: user.password,
                        password_confirmation: user.password_confirmation
                    })
                .then((response) => {
                    const {token} = response.data
                    const userData = response.data.user
    
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(userData))

                    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, userData)

                    commit('GET_USER', userData)

                    //resolve ke component dengan hasil response
                    resolve(response)
                })
                .catch((error) => {
                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)
                })

            })

        },

            async getUser({commit}){
                const token = localStorage.getItem('token')

                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                const res = await Api.get('/profile')
                
                commit('GET_USER', res.data.data)
            },

            logout( {commit} ){

                return new Promise((resolve) => {

                    commit('AUTH_LOGOUT')

                    localStorage.removeItem('token')
                    localStorage.removeItem('user')

                    delete Api.defaults.headers.common['Authorization']

                    resolve()
                })
            },

            login( {commit}, user){
                return new Promise((resolve, reject) => {
                    Api.post('/login', {
                        email: user.email,
                        password:user.password
                    })
                    .then((response) => {
                        const {token} = response.data
                        const {data} = response.data

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(data))

                    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    commit('AUTH_SUCCESS', token, data)
                    commit('GET_USER', data)

                    resolve(response)

                    })
                    .catch((error) => {
                        //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)
                    })
                })
            }
        },
    
        //getters
        getters: {
            currentUser(state){
                return state.user
            },

            isLoggedIn(state){
                return state.token
            }
        }
}

export default auth