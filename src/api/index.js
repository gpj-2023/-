 import instance from '../utils/request'
 export const getData=function (){
  return instance.get('/home/getData')
 }
 export const getUserList=function (params){
  // console.log(params)
  return instance.get('/user/getUserList',params)
 }
 export const createUser=function (data){
  return instance.post('/user/createUser',data)
 }
 export const deleteUser=function (data){
  return instance.post('/user/deleteUser',data)
 }
 export const batchremove=function (data){
  return instance.post('/user/batchremove',data)
 }
 export const updateUser=function (data){
  return instance.post('/user/updateUser',data)
 }
 export const getMenu=function (data){
  return instance.post('/login/getMenu',data)
 }