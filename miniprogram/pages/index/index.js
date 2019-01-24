//index.js
//const app = getApp()

Page({
  data: {
    fTitle: "aaa",
    fDate: 2018
  },
  onLoad(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', // 仅为示例，并非真实的接口地址
      data: {
        type: 'gn'
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        let title = result[0].title
        let date = result[0].date
        //console.log(title, date)
        this.setData({
          fTitle: title,
          fDate: date
        })
      }
    })
  }
})