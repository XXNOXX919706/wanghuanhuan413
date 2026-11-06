/**
 * 功能：可复用的 Tab 选项卡初始化函数
 * @param {string} whh_containerSelector - tab 容器的 CSS 选择器
 * @param {Object} whh_options - 配置选项（可选）
 *   - tabItemClass: tab 按钮的选择器，默认 '.whh_tab-item'
 *   - tabPanelClass: 内容面板的选择器，默认 '.whh_tab-panel'
 *   - activeClass: 选中状态的类名，默认 'whh_active'
 *   - defaultIndex: 默认选中的索引，默认 0
 */
function whh_initTab(whh_containerSelector, whh_options) {
  // 获取 tab 容器元素
  var whh_container = document.querySelector(whh_containerSelector);
  if (!whh_container) {
    console.warn('whh_initTab: 未找到容器 ->', whh_containerSelector);
    return;
  }

  // 合并默认配置与用户配置
  var whh_config = Object.assign({
    tabItemClass: '.whh_tab-item',
    tabPanelClass: '.whh_tab-panel',
    activeClass: 'whh_active',
    defaultIndex: 0
  }, whh_options);

  // 获取所有 tab 按钮和内容面板
  var whh_tabs = whh_container.querySelectorAll(whh_config.tabItemClass);
  var whh_panels = whh_container.querySelectorAll(whh_config.tabPanelClass);

  /**
   * 功能：清除所有 tab 按钮和面板的选中状态
   */
  function whh_clearActive() {
    // 移除所有 tab 按钮的选中类
    whh_tabs.forEach(function (whh_tab) {
      whh_tab.classList.remove(whh_config.activeClass);
    });
    // 移除所有面板的选中类
    whh_panels.forEach(function (whh_panel) {
      whh_panel.classList.remove(whh_config.activeClass);
    });
  }

  /**
   * 功能：激活指定索引的 tab 按钮及其对应面板
   * @param {number} whh_index - 要激活的 tab 索引
   */
  function whh_activateTab(whh_index) {
    // 先清除所有选中状态
    whh_clearActive();
    // 再设置当前 tab 按钮为选中
    if (whh_tabs[whh_index]) {
      whh_tabs[whh_index].classList.add(whh_config.activeClass);
    }
    // 设置对应面板为选中（显示）
    if (whh_panels[whh_index]) {
      whh_panels[whh_index].classList.add(whh_config.activeClass);
    }
  }

  /**
   * 功能：处理 tab 点击事件（事件委托）
   * @param {Event} whh_e - 点击事件对象
   */
  function whh_handleTabClick(whh_e) {
    // 通过 closest 找到点击的 tab 按钮（支持子元素点击）
    var whh_target = whh_e.target.closest(whh_config.tabItemClass);
    if (!whh_target) return;

    // 计算当前 tab 的索引
    var whh_index = Array.from(whh_tabs).indexOf(whh_target);
    if (whh_index !== -1) {
      whh_activateTab(whh_index);
    }
  }

  // 监听容器上的点击事件（事件委托，可复用且性能好）
  whh_container.addEventListener('click', whh_handleTabClick);

  // 初始化：默认激活指定索引的 tab（国内新闻为 0）
  whh_activateTab(whh_config.defaultIndex);
}
