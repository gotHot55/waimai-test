import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqLogout,
  reqshops,
  reqUserInfo,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
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
  },
  //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code===0){
      const userInfo=result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  //异步重置用户信息
  async logout({commit}){
    const result=await reqLogout()
    if (result.code===0){
      commit(RESET_USER_INFO)
    }
  },

  //异步获取商家商品列表
  async getShopGoods({commit},callback){
    const result=await reqShopGoods()
    if (result.code===0){
      const goods=result.data
      commit(RECEIVE_GOODS,{goods})
      //加载完毕
      callback && callback()
    }
  },
  //异步获取商家评价列表
  async getShopRatings({commit}){
    const result=await reqShopRatings()
    if (result.code===0){
      const ratings=result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  //异步获取商家信息列表
  async getShopInfo({commit}){
    const result=await reqShopInfo()
    if (result.code===0){
      const info=result.data
      commit(RECEIVE_INFO,{info})
    }
  },
}
