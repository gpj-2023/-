import Mock from 'mockjs'
import home from '../getServeData/home'
import user from '../getServeData/user'
import permission from '../getServeData/permission'
Mock.mock('/api/home/getData',home.getStatisticalData)
Mock.mock(/api\/user\/getUserList/,user.getUserList)
Mock.mock(/api\/login\/getMenu/,permission.getMenu)
Mock.mock('/api/user/createUser',user.createUser)
Mock.mock('/api/user/deleteUser',user.deleteUser)
Mock.mock('/api/user/batchremove',user.batchremove)
Mock.mock('/api/user/updateUser',user.updateUser)