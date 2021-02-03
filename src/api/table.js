import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue/user/list',
    method: 'get',
    params
  })
}
