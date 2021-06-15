import Api from '../../api/api'

const category = {
    namespace:true,

    state:{
        categories : [],
    },

    mutations:{
        SET_CATEGORY(state, data){
            state.categories = data
        }
    },

    actions:{
        
        async getCategory({commit}){
            try {
                let res = await Api.get('/category')

                commit('SET_CATEGORY', res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default category