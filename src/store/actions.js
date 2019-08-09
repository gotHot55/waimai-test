import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqshops
} from '../api'
export default {
  //异步获取地址
  async getAddress({commit,state}){
    //发送异步ajax请求
    const geohash=state.latitude+','+state.longitude
    const result=await reqAddress(geohash)
    //提交一个mutation
    if (result.code===0){
      /*const address=result.data
      commit(RECEIVE_ADDRESS,{address})*/
      commit(RECEIVE_ADDRESS,{address:result.data})
    }
  },
  //异步获取分类列表
  async getCategroys({commit}){
    const result=await reqFoodCategorys();
    if (result.code===0){
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    const {longitude,latitude}=state
    const result=await reqshops(latitude,longitude)
    if (result.code===0){
      const shops=result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}
