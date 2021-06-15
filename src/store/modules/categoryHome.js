import Api from '../../api/api'

const categoryHome = {
    namespaced:true,

    state:{
        categories : [],
    },

    mutations:{
        SET_CATEGORY(state, data){
            state.categories = data
        }
    },

    actions:{
        
        getCategory({commit}){
            
                Api.get('/categoryHome')
                .then((res) => {
                    commit('SET_CATEGORY', res.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
             
        }
    }
}

export default categoryHome