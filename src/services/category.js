import util from '@/services/util'

const category = {
  get: async (limit = 10) => {
    return await util.api({url: 'categories', data: {limit: limit}})
  }
}
export default category
