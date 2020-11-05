import axios from 'axios'

state = {
    user:null,
    success: false
}
getters = {
    user: state => state.user
}
actions = {
    async sendUser({commit},payload){
        console.log(payload)
        await axios({
            method: 'POST',
            url:'/test',
            data:{
                ...payload
            }
        }).then( res=>{
            commit('SUCCESS')
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },
    
}
mutations = {
    SUCCESS:(state)=> state.success = true
}

export default {
    state,
    getters,
    actions,
    mutations
}