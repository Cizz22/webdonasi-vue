import Api from '../../api/api'

const campaign = {
    namespaced: true,

    state:{
        campaigns: [],
        nextExist: false,
        nextPage:0,
        campaign:{},
        donations:[],
        sumDonation:[],
        user:{}
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
        },
        DETAIL_CAMPAIGN(state, data){
            state.campaign = data
        },
        DETAIL_CAMPAIGN_DONATION(state, data){
            state.donations = data
        },
        DETAIL_CAMPAIGN_USER(state, data){
            state.user = data
        },
        DETAIL_CAMPAIGN_SUMDONATION(state, data){
            state.sumDonation = data
        },
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
        },

        async showCampaign({commit}, slug){
            try {
                let res = await Api.get(`campaign/${slug}`)
                commit('DETAIL_CAMPAIGN', res.data.data.campaign)
                commit('DETAIL_CAMPAIGN_DONATION', res.data.data.donations)
                commit('DETAIL_CAMPAIGN_USER', res.data.data.campaign.user)
                commit('DETAIL_CAMPAIGN_SUMDONATION', res.data.data.campaign.sum_donation)
            } catch (error) {
                console.log(error)
            }
        }

        
    }
}

export default campaign 