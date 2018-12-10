import util from '@/services/util'

const article = {
  /**
   * 获取所有文章数据
   * @param page  分页页码
   * @param limit 每页显示数据条数
   * @param params
   * @returns {Promise<*>}
   */
  get: async (params = {}, page = 1, limit = 10) => {
    // 向params中添加数据
    params.page = page
    params.include = 'category,user'
    params.limit = limit
    return await util.api({url: 'articles', data: params})
  },
  // 单个文章
  show: async (id) => {
    let response = await util.api({url: 'show/' + id})
    return response
  }
}
export default article
