import Api from '../../api/api'

const profile = {
    namespaced: true,

    state:{
        profile: {}
    },
    mutations:{
        SET_PROFILE(state, profile){
            state.profile = profile
        }
    },
    actions:{

       async getProfile( {commit} ){
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            try {
                let res = await Api.get('/profile')
                
                commit('SET_PROFILE', res.data.data)

            } catch (error) {
                console.log(error)
            }

        },

        updateProfile( {commit}, user ){
            return new Promise((resolve,reject) => {
            
                const token = localStorage.getItem('token')

                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.post('/profile', user)
                .then((response) => {
                     commit('SET_PROFILE' , response.data.data)

                     resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
            })
        },

        updatePassword({commit}, user){
           return new Promise((resolve, reject) => {
            const {password, password_confirmation} = user

            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.post('/profile/password', {
                password,
                password_confirmation
            })
            .then((response) => {
                commit('SET_PROFILE', response.data.data)

                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
           })  
        }
    },
    getters:{

    }
}

export default profile