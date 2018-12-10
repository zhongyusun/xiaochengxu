import util from '@/services/util'

const flash = {
  get: async (limit = 3) => {
    let response = await util.api({url: 'flashs', data: {limit: limit}})
    if (response.statusCode === 200) {
      return response
    }
  }
}

export default flash
