import Api from '../../api/api'

const categoryHome = {
    namespaced:true,

    state:{
        categories : [],
        category:{},
        campaignCategory: []
    },

    mutations:{
        SET_CATEGORY(state, data){
            state.categories = data
        },
        DETAIL_CATEGORY(state, data){
            state.category = data
        },
        SET_CAMPAIGNCATEGORY(state, data){
            state.campaignCategory = data
        }
    },

    actions:{
        
        getCategoryHome({commit}){
            
                Api.get('/categoryHome')
                .then((res) => {
                    commit('SET_CATEGORY', res.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
             
        },
        async getCategory({commit}){
            try {
            let res = await Api.get('/category')
            commit('SET_CATEGORY', res.data.data.data)
            } catch (error) {
            console.log(error)
            }
        },

        async showCategory({commit}, slug){
            try {
                let res = await Api.get(`/category/${slug}`)

                commit('DETAIL_CATEGORY', res.data.data)

                commit('SET_CAMPAIGNCATEGORY', res.data.data.campaigns)
            } catch (error) {
                console.log(error)
            }
        },
    }
}

export default categoryHome