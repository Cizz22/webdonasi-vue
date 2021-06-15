import Api from '../../api/api'

const slider = {
    namespaced:true,
    state:{
        sliders:[]
    },
    mutations:{
        SET_SLIDER(state, sliders){
            state.sliders = sliders
        }
    },
    actions:{

    async getSlider({commit}){
        try {
            const res = await Api.get('/slider')
            commit('SET_SLIDER', res.data.data)
        } catch (error) {
            console.log(error)
        }
            
        }
    }
}

export default slider