import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue/user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue/user/logout',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/vue/user',
    method: 'get',
    params
  })
}

export function addUser(data) {
  return request({
    url: '/vue/user',
    method: 'put',
    data: data
  })
}
