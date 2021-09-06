import Api from '../../api/api'

const donation = {
    
    //set namespace true
    namespaced: true,

    //state
    state: {
        donations:[],
        nextPage:0,
        nextExist:false
    },

    //mutations
    mutations: {
        SET_DONATION(state, donations){
            state.donations = donations
        },
        SET_NEXTEXIST(state, data){
            state.nextExist = data
        },
        SET_NEXTPAGE(state, nextPage){
            state.nextPage = nextPage
        }
    },

    //actions
    actions: {

       async getDonation({commit}){
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            try {
            const response = await Api.get('/donation')
        
            commit('SET_DONATION', response.data.data.data)
                
                if(response.data.data.current_page < response.data.data.last_page){

                    commit('SET_NEXTEXIST', true)

                    commit('SET_NEXTPAGE', response.data.data.current_page + 1)
                }
                else{
                    commit('SET_NEXTEXIST', false)
                }
            } catch (error) {
                console.log(error)
            }
        },

        async storeDonation({commit}, donation){
            
            return new Promise((resolve,reject) => {
                const token = localStorage.getItem('token')
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.post('/donation', donation)
                .then((res) => {
                    commit('')
                    console.log(res)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
           


        }

        

    },

    //getters
    getters: {

    }
}


export default donation