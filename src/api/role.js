import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue/role',
    method: 'get',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/vue/role',
    method: 'put',
    data: data
  })
}
