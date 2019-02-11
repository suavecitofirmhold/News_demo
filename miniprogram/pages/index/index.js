//index.js
//const app = getApp()

Page({
  data: {
    allkinds: ["国内","国际","财经","娱乐","军事","体育","其他"]
  },
  onPullDownRefresh(){
    this.getNews(()=>{
      wx.stopPullDownRefresh()
    })
  },
  onLoad(){
    this.getNews()
  },
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: {
        type: 'gn'
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        let title = result[0].title
        let date = result[0].date
        let firstImage = result[0].firstImage
        //console.log(title, date)
        let news = []
        for(let i = 0;i < 9; i++){
          news.push({
            title: result[i].title,
            date: result[i].date.substring(0,10),
            firstImage: result[i].firstImage,
           // iconPath: '/images/code-db-inc-dec.png'  
            //result[i].firstImage
          })
        }
        console.log(firstImage)

        this.setData({
          news: news
        })
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  onTapList(){
    wx.showToast()
  },
  onTapDetail(){
    wx.showToast()
  }
})