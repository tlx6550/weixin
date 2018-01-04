'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },

  loadMore: function loadMore() {
    var _this = this;

    if (!this.data.hasMore) return;

    this.setData({ subtitle: '加载中...', loading: true });
      /**
       * this.data.page++ 先使用1，然后加一
       */
    return app.douban.find('search', this.data.page++, this.data.size, this.data.search).then(function (d) {
      if (d.subjects.length) {
        _this.setData({ subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false });
      } else {
        _this.setData({ hasMore: false, loading: false });
      }
    }).catch(function (e) {
      _this.setData({ subtitle: '获取数据异常', loading: false });
      console.error(e);
    });
  },
  handleSearch: function handleSearch(e) {
    if (!e.detail.value) return;
    this.setData({ movies: [], page: 1 });
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });

    this.loadMore();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({ movies: [], page: 1 });
    this.loadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    });
  },
  onReachBottom: function onReachBottom() {
    this.loadMore();
  }
});
//# sourceMappingURL=search.js.map
