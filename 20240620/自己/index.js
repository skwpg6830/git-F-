import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import User from './user.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

// 連線到資料庫
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.log('資料庫連線失敗')
    console.error(error)
  })

// 建立網頁伺服器
const app = express()

// 將傳入的 body 解析為 json
app.use(express.json())
// 處理 express.json 的錯誤
// 處理 middleware 的錯誤一定要有四個參數 error, req, res, next
// error = 錯誤訊息
// next = 繼續下一步處理
// _ 忽略參數不用
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  })
})

// app.請求方式(路徑, 處理function)
// req = 進來的
// res = 出去的
app.post('/', async (req, res) => {
  try {
    console.log(req.body)
    // const user = new User({
    //   account: req.body.account,
    //   email: req.body.email
    // })
    // await user.save()

    // const user = await User.create({
    //   account: req.body.account,
    //   email: req.body.email
    // })

    const user = await User.create(req.body)

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.error(error)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // 資料重複 unique 錯誤
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號或信箱重複'
      })
    } else if (error.name === 'ValidationError') {
      // 驗證錯誤
      // 第一個驗證失敗的欄位名稱
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.get('/', async (req, res) => {
  try {
    const result = await User.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
})

app.get('/:id', async (req, res) => {
  console.log('id', req.params.id)
  console.log('query', req.query)

  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    // const user = await User.find({ _id: req.params.id })
    // const user = await User.findOne({ _id: req.params.id })
    const user = await User.findById(req.params.id)

    if (!user) throw new Error('NOT FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.delete('/:id', async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) throw new Error('NOT FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.patch('/:id', async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    // new: true 設定回傳更新後的資料
    // runValidators: true 執行 schema 定義的驗證
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) throw new Error('NOT FOUND')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: user
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 資料重複 unique 錯誤
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號或信箱重複'
      })
    } else if (error.name === 'ValidationError') {
      // 驗證錯誤
      // 第一個驗證失敗的欄位名稱
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無資料'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
