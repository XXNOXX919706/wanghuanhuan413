/**
 * wanghuanhuan0413 - 汽车资讯 Tab 选项卡数据与交互逻辑
 * 功能：可复用的新闻 Tab 切换组件，支持自定义容器、标题、列表与默认索引
 */

// wanghuanhuan0413 五个 tab 对应的新闻数据
var whh_newsData = [
  {
    title: '改变品牌的未来 认识豪华品牌最便宜车型',
    list: [
      { text: '推荐：X1等城市四驱Style+经济省油的SUV', date: '12/19' },
      { text: '全景天窗/保养便利 30万办齐四驱SUV推荐', date: '12/19' },
      { text: '最高暴降20万！奥迪Q5等年底特惠SUV盘点', date: '12/18' },
      { text: '比拼硬实力 8款低配四驱紧凑SUV性能点评', date: '12/16' },
      { text: '花小钱也能养SUV 夏款等入门SUV使用推荐', date: '12/12' },
      { text: '最高优惠4.3万 十款15万SUV年末购买推荐', date: '12/16' }
    ]
  },
  {
    title: '最低仅4.6万元起 超低价SUV购买价值点评',
    list: [
      { text: '全民摇号时代?六款低价占号必备车型推荐', date: '12/18' },
      { text: '凌派/观致3等 2013年全新热门家用车盘点', date: '12/11' },
      { text: '坚持低价高配路线！静态评测华泰路盛E70', date: '12/09' },
      { text: '买车先看销量 10月份销量前十名轿车盘点', date: '11/29' },
      { text: '护底正当 车展后清仓优惠老款车型推荐', date: '11/28' },
      { text: '土豪气质 细数车展那些低价车上的"神器"', date: '11/27' }
    ]
  },
  {
    title: '15万级降价车谁更值 预算/油耗/空间较量',
    list: [
      { text: '爸爸去哪？亲子出游适合车型和注意事项', date: '12/20' },
      { text: '最高暴降20万！奥迪Q5等年底特惠SUV盘点', date: '12/18' },
      { text: '配配气帘得肯定！传祺GA3碰撞试验图解', date: '12/16' },
      { text: '高尔夫1≠两厢版速腾 配置/动力差异解读', date: '12/16' },
      { text: '花小钱也能养SUV 夏款等入门SUV使用推荐', date: '12/12' },
      { text: '最高优惠4.3万 十款15万SUV年末购买推荐', date: '12/16' }
    ]
  },
  {
    title: '改变品牌的未来 认识豪华品牌最便宜车型',
    list: [
      { text: '爸爸去哪？亲子出游适合车型和注意事项', date: '12/20' },
      { text: '推荐：X1等城市四驱Style+经济省油的SUV', date: '12/19' },
      { text: '全景天窗/保养便利 30万办齐四驱SUV推荐', date: '12/19' },
      { text: '最高暴降20万！奥迪Q5等年底特惠SUV盘点', date: '12/18' },
      { text: '比拼硬实力 8款低配四驱紧凑SUV性能点评', date: '12/16' },
      { text: '新蒙迪欧/雅阁等！盘点2013中级车大变脸', date: '12/17' }
    ]
  },
  {
    title: 'B级品质满足A级需求 路盛E70亮点详解析',
    list: [
      { text: '购车必看 凯迪拉克XTS领先型28T深度体验', date: '12/20' },
      { text: '爸爸去哪？亲子出游适合车型和注意事项', date: '12/20' },
      { text: '推荐：X1等城市四驱Style+经济省油的SUV', date: '12/19' },
      { text: '全景天窗/保养便利 30万办齐四驱SUV推荐', date: '12/19' },
      { text: '全民摇号时代?六款低价占号必备车型推荐', date: '12/18' },
      { text: '最高暴降20万！奥迪Q5等年底特惠SUV盘点', date: '12/18' }
    ]
  }
];

/**
 * 功能：初始化新闻 Tab 选项卡
 * @param {string} whh_navSelector   - tab 导航容器选择器
 * @param {string} whh_titleSelector - 新闻标题元素选择器
 * @param {string} whh_listSelector  - 新闻列表容器选择器
 * @param {number} whh_defaultIndex  - 默认选中的 tab 索引
 */
function whh_initNewsTab(whh_navSelector, whh_titleSelector, whh_listSelector, whh_defaultIndex) {
  // wanghuanhuan0413 获取 DOM 元素
  var whh_nav = document.querySelector(whh_navSelector);
  var whh_titleEl = document.querySelector(whh_titleSelector);
  var whh_listEl = document.querySelector(whh_listSelector);
  if (!whh_nav || !whh_titleEl || !whh_listEl) {
    console.warn('whh_initNewsTab: 缺少必要的 DOM 元素');
    return;
  }

  // wanghuanhuan0413 获取所有 tab 按钮
  var whh_tabs = whh_nav.querySelectorAll('.whh_tab-item');

  /**
   * 功能：清除所有 tab 的选中状态
   */
  function whh_clearActive() {
    whh_tabs.forEach(function (whh_tab) {
      whh_tab.classList.remove('whh_active');
    });
  }

  /**
   * 功能：渲染指定索引的新闻标题与列表
   * @param {number} whh_index - 数据索引
   */
  function whh_renderNews(whh_index) {
    var whh_data = whh_newsData[whh_index];
    if (!whh_data) return;

    // wanghuanhuan0413 渲染大标题
    whh_titleEl.textContent = whh_data.title;

    // wanghuanhuan0413 渲染新闻列表
    var whh_html = '';
    whh_data.list.forEach(function (whh_item) {
      whh_html += '<li class="whh_news-item">' +
        '<span class="whh_news-dot"></span>' +
        '<span class="whh_news-text">' + whh_item.text + '</span>' +
        '<span class="whh_news-date">' + whh_item.date + '</span>' +
        '</li>';
    });
    whh_listEl.innerHTML = whh_html;
  }

  /**
   * 功能：激活指定索引的 tab 并渲染对应内容
   * @param {number} whh_index - tab 索引
   */
  function whh_activateTab(whh_index) {
    // wanghuanhuan0413 先清除所有选中状态
    whh_clearActive();
    // wanghuanhuan0413 再设置当前 tab 选中
    if (whh_tabs[whh_index]) {
      whh_tabs[whh_index].classList.add('whh_active');
    }
    // wanghuanhuan0413 渲染对应新闻内容
    whh_renderNews(whh_index);
  }

  /**
   * 功能：处理 tab 点击事件（事件委托）
   * @param {Event} whh_e - 点击事件
   */
  function whh_handleClick(whh_e) {
    var whh_target = whh_e.target.closest('.whh_tab-item');
    if (!whh_target) return;
    var whh_index = parseInt(whh_target.getAttribute('data-index'), 10);
    if (!isNaN(whh_index)) {
      whh_activateTab(whh_index);
    }
  }

  // wanghuanhuan0413 监听导航容器点击（事件委托）
  whh_nav.addEventListener('click', whh_handleClick);

  // wanghuanhuan0413 初始化默认选中与内容渲染
  whh_activateTab(whh_defaultIndex);
}
