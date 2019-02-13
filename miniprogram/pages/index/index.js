//index.js
//const app = getApp()
const newsCategory = [
  { id: 'gn', name: '国内' },
  { id: 'gj', name: '国际' },
  { id: 'cj', name: '财经' },
  { id: 'yl', name: '娱乐' },
  { id: 'js', name: '纪实' },
  { id: 'ty', name: '体育' },
  { id: 'other', name: '综合' }
]

const currCate = [
  { ind: 0, id: 'gn'},
  { ind: 1, id: 'gj' },
  { ind: 2, id: 'cj' },
  { ind: 3, id: 'yl' },
  { ind: 4, id: 'js' },
  { ind: 5, id: 'ty' },
  { ind: 6, id: 'other' },
]

Page({
  data: {
    newsCategory,  //新闻分类
    current: 0,   //当前分类
  },
  onPullDownRefresh(){
    this.getNews(()=>{
      wx.stopPullDownRefresh()
    })
    console.log("stopPulldown")
  },
  onLoad(){
    this.getNews(0)
  },
  getNews(callback, index){
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
        this.setData({
          news: news
        })
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  handleCateChange: function(e){
    let index = e.currentTarget.dataset.index;
    console.log(currCate[index].id)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: currCate[index].id
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        let title = result[0].title
        let date = result[0].date
        let firstImage = result[0].firstImage
        //console.log(title, date)
        let news = []
        for (let i = 0; i < result.length; i++) {
          news.push({
            title: result[i].title,
            date: result[i].date.substring(0, 10),
            firstImage: result[i].firstImage,
            // iconPath: '/images/code-db-inc-dec.png'  
            //result[i].firstImage
          })
        }
        this.setData({
          news: news
        })
      }
    })
    },
  onTapDetail(){
    wx.showToast()
  }
})