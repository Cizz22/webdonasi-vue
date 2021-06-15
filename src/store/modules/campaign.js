import Api from '../../api/api'

const campaign = {
    namespaced: true,

    state:{
        campaigns: [],
        nextExist: false,
        nextPage:0
    },
    mutations:{
        SET_CAMPAIGN(state, data){
            state.campaigns = data
        },
        SET_NEXTEXIST(state, data){
            state.nextExist = data
        },
        SET_NEXTPAGE(state,data){
            state.nextPage = data
        },
        SET_LOADMORE(state, data){
            data.forEach(row => {
                state.campaigns.push(row)
            });
        }
    },
    actions:{

        async getCampaign({commit}){
            try {
                let res = await Api.get('/campaign')
    
                commit('SET_CAMPAIGN', res.data.data.data)


                if(res.data.data.current_page < res.data.data.last_page){
                    commit('SET_NEXTEXIST', true)

                    commit('SET_NEXTPAGE', res.data.data.current_page+1 )
                }
                else commit('SET_NEXTEXIST', false)
            } catch (error) {
                console.log(error)
            }
        },

        async loadMore({commit}, nextPage ){
            try {
                let res =  await Api.get(`/campaign?page=${nextPage}`)

                commit('SET_LOADMORE', res.data.data.data)

                if(res.data.data.current_page < res.data.data.last_page){
                    commit('SET_NEXTEXIST', true)

                    commit('SET_NEXTPAGE', res.data.data.current_page+1 )
                }
                else commit('SET_NEXTEXIST', false)
            } catch (error) {
                console.log(error)
            }
        }

        
    }
}

export default campaign