import request from '@/utils/request'

export function getImages(data) {
  return request({
    url: '/vue/docker/images',
    method: 'get',
    data
  })
}

export function getContainers(token) {
  return request({
    url: '/vue/docker/containers',
    method: 'get',
    params: { token }
  })
}

