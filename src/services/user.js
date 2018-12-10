import util from '@/services/util'

const user = {
  async getUserInfo() {
    return await util.authApi({url: 'me'})
  }
}

export default user
