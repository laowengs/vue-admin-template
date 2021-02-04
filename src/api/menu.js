import request from '@/utils/request'

export function getMenuInfo(data) {
  return request({
    url: '/vue/menu/getMenuInfo',
    method: 'get',
    data
  })
}
export function getAllMenuInfo(data) {
  return request({
    url: '/vue/menu/getAllMenuInfo',
    method: 'get',
    data
  })
}
