/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 16:55:52
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()

import userInfo from '../public/server/permission'
import * as user from '../public/server/user'

userRouter.get('/user/info', (request, response) => {
  response.send({
    code: '000000',
    data: {
      userInfo: userInfo
    },
    message: '获取用户信息成功!'
  })
})

userRouter.post('/login', async(request, response) => {
  const { username, password } = request.body
  // 是否存在该用户
  const data = await user.findUser({ username })
  console.log(data)
  if (data.length) {
    const res = data.find(item => item.password === password)
    if (res) {
      response.status(200).send({
        code: '000000',
        data: {
          token: 123456
        },
        msg: '登陆成功!'
      })
    } else {
      response.status(200).send({
        code: '100000',
        data: {},
        msg: '用户名或密码错误!'
      })
    }
  } else {
    response.status(200).send({
      code: '000000',
      data: {
        token: 123456
      },
      msg: '用户不存在!'
    })
  }
})

userRouter.post('/register', async(request, response) => {
  const { username, password } = request.body
  // 是否存在该用户
  const data = await user.findUser({ username })
  console.log(data[0]['_id'])
  if (!data.length) {
    // 用户不存在 进行注册
    const { _id } = await user.createUser({ username, password })
    if (_id) {
      response.send({
        code: '000000',
        data: {
          token: 12345
        },
        msg: '注册成功!'
      })
    } else {
      response.send({
        code: '100000',
        data: {},
        msg: '注册失败!'
      })
    }
  } else {
    response.send({
      code: '100000',
      data: {},
      msg: '用户已存在!'
    })
  }
})

export default userRouter
