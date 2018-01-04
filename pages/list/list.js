'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  loadMore: function loadMore() {
    var _this = this;

    if (!this.data.hasMore) return;

    this.setData({ subtitle: '加载中...', loading: true });

    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(function (d) {
      if (d.subjects.length) {
        _this.setData({ subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false });
      } else {
        _this.setData({ subtitle: d.title, hasMore: false, loading: false });
      }
    }).catch(function (e) {
      _this.setData({ subtitle: '获取数据异常', loading: false });
      console.error(e);
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
      /**
       * 此params是board的navigator组件url参数传递过来的
       * {type: "in_theaters", title: "正在上映的电影-广州"}
       */
    this.data.title = params.title || this.data.title;

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type;

    this.loadMore();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {

    this.setData({ movies: [], page: 1, hasMore: true });
    this.loadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    });
  },
    /**
     * 滚动到底部的事件
     */
  onReachBottom: function onReachBottom() {
    this.loadMore();
  }
});
//# sourceMappingURL=list.js.map
