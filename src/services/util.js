import wepy from 'wepy'

const host = 'http://szy.zhangfengmen.cn/api'
const util = {
  // 异步请求
  api: async (options) => {
    // 参考手册地址:https://developers.weixin.qq.com/miniprogram/dev/api/wx.showLoading.html
    wepy.showLoading({title: '请求中..'})
    options.url = host + '/' + options.url
    let response = await wepy.request(options) // 上⾯面的 await 请求成功后才会执⾏行行⻚页⾯面的代码
    // 隐藏加载层
    wepy.hideLoading()
    // 返回数据
    return response
  },
  login: async (options) => {
    // 定义请求方式为 post,因为后台定义 login 接口需要以post 方式请求
    // 请求方式参考:https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html
    options.method = 'POST'
    // 定义请求接口地址
    options.url = 'login'
    let response = await util.api(options)
    console.log(response)
    if (response.statusCode === 200) {
      // new Date().getTime() js获取当前时间戳,单位毫秒
      // response.data.expirse_in php 返回的 token 有效期单位秒
      response.data.expires_in = new Date().getTime() + response.data.expires_in * 1000
      wepy.setStorageSync('token', response)
    }
  },
  // 获取存储的 token 数据
  getToken: () => {
    // 获取登录存储的 token
    let token = wepy.getStorageSync('token')
    if (token) {
      return token.data.expires_in > new Date().getTime() ? token.data.access_token : null
    }
  },
  // 需要验证 token 的接口请求
  authApi: async (options) => {
    options.url = host + '/' + options.url
    options.header = options.header ? options.header : {}
    options.header.Authorization = 'Bearer ' + util.getToken()
    let response = await wepy.request(options)
    // 返回数据
    return response
  },
  // 退出登录
  logout: async () => {
    let response = await util.authApi({url: 'logout'})

    if (response.statusCode === 200) {
      wepy.removeStorageSync('token')
    }
  }
}
export default util
