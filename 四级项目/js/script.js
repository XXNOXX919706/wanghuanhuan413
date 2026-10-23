// 姓名：王 学号：XXX
document.addEventListener('click', function(event){
    const image = event.target.closest('img');
    if(image){
        event.stopPropagation();
        location.href = './5.%20read.html';
    }
}, true);

window.onload = function(){
    // ========= 1、首页轮播图【效果1】 =========
    const bannerList = document.querySelector('.wang_banner_list');
    const dots = document.querySelectorAll('.wang_dot');
    let bannerIndex = 0;
    const totalBanner = 3;
    let bannerTimer;

    function setBanner(idx){
        bannerIndex = idx;
        bannerList.style.transform = `translateX(-${bannerIndex * 100}%)`;
        dots.forEach(d=>d.classList.remove('active'));
        if(dots[bannerIndex]) dots[bannerIndex].classList.add('active');
    }
    function autoBanner(){
        bannerTimer = setInterval(()=>{
            bannerIndex = (bannerIndex + 1) % totalBanner;
            setBanner(bannerIndex);
        },3000);
    }
    if(bannerList){
        autoBanner();
        bannerList.addEventListener('touchstart',()=>clearInterval(bannerTimer));
        bannerList.addEventListener('touchend',()=>autoBanner());
    }

    // ========= 2、fetch加载首页推荐漫画 comic.json【接口1】 =========
    const comicWrap = document.getElementById('wang_recommend_list');
    if(comicWrap){
        fetch('./data/comic.json')
        .then(res=>res.json())
        .then(data=>{
            let htmlStr = '';
            data.forEach(item=>{
                htmlStr += `
                    <div class="wang_comic_card" onclick="location.href='comic_detail.html'">
                        <div class="wang_comic_card_img">
                            <img src="./images/${item.img}" alt="${item.title}">
                        </div>
                        <div class="wang_comic_card_name">${item.title}</div>
                        <div class="wang_comic_card_tag">${item.tag}</div>
                    </div>
                `;
            })
            comicWrap.innerHTML = htmlStr;
        })
    }

    // ========= 3、返回顶部【效果2】 =========
    const backTopBtn = document.getElementById('wang_backtop');
    if(backTopBtn){
        window.addEventListener('scroll',function(){
            if(window.scrollY>200){
                backTopBtn.style.display = 'block';
            }else{
                backTopBtn.style.display = 'none';
            }
        })
        backTopBtn.onclick = function(){
            window.scrollTo({top:0,behavior:'smooth'});
        }
    }

    // ========= 4、搜索按钮跳转 =========
const searchBtn = document.getElementById('wang_search_btn');
const searchBtn2 = document.getElementById('wang_search_btn2');
if(searchBtn){
    searchBtn.style.cursor = "pointer";
    searchBtn.onclick = ()=>location.href='./6.%20search.html';
}
if(searchBtn2){
    searchBtn2.style.cursor = "pointer";
    searchBtn2.onclick = ()=>location.href='./6.%20search.html';
}
    // ========= 分类页面 fetch category.json【接口2】 =========
    const categoryList = document.getElementById('wang_category_list');
    if(categoryList){
        fetch('./data/category.json')
        .then(res=>res.json())
        .then(data=>{
            let html='';
            data.forEach(item=>{
                html += `<div class="wang_category_item">${item.name}</div>`
            })
            categoryList.innerHTML = html;
        })
    }

    // ========= 排行榜 fetch rank.json【接口3】 =========
    const rankList = document.getElementById('wang_rank_list');
    if(rankList){
        fetch('./data/rank.json')
        .then(res=>res.json())
        .then(data=>{
            let html='';
            data.forEach((item,i)=>{
                html += `
                <div class="wang_rank_item">
                    <div class="wang_rank_num">${i+1}</div>
                    <div>
                        <div>${item.title}</div>
                        <div style="font-size:12px;color:#777">${item.hot}人气</div>
                    </div>
                </div>`
            })
            rankList.innerHTML = html;
        })
    }

    // ========= 个人页面 fetch user.json【接口4】 =========
    const userBox = document.getElementById('wang_user_info');
    if(userBox){
        fetch('./data/user.json')
        .then(res=>res.json())
        .then(data=>{
            userBox.innerHTML = `
                <h3>${data.username}</h3>
                <p>ID：${data.uid}</p>
                <p>已收藏：${data.collectNum}本漫画</p>
            `
        })
    }

    // ========= 收藏按钮切换状态【效果3】 =========
    const collectBtn = document.getElementById('wang_collect_btn');
    if(collectBtn){
        collectBtn.onclick = function(){
            this.classList.toggle('active');
            if(this.classList.contains('active')) this.innerText = "已收藏";
            else this.innerText = "收藏";
        }
    }

    // ========= 返回上一页按钮 =========
    const backPrev = document.getElementById('wang_back_prev');
    const backRead = document.getElementById('wang_back_read');
    const backSearch = document.getElementById('wang_back_search');
    const backAdmin = document.getElementById('wang_back_admin');
    if(backPrev) backPrev.onclick = ()=>history.back();
    if(backRead) backRead.onclick = ()=>history.back();
    if(backSearch) backSearch.onclick = ()=>location.href="./1.index.html";
    if(backAdmin) backAdmin.onclick = ()=>history.back();

    // ========= 搜索联想提示【效果4】 =========
    const searchInput = document.getElementById('wang_search_input');
    const searchTip = document.getElementById('wang_search_tip');
    const searchSubmit = document.getElementById('wang_search_submit');
    if(searchInput){
        const tipData = ["一人之下","狐妖小红娘","斗罗大陆","镇魂街"];
        searchInput.oninput = function(){
            let val = this.value.trim();
            let html = '';
            if(val){
                tipData.forEach(item=>{
                    if(item.includes(val)) html += `<div class="wang_tip_item">${item}</div>`
                })
            }
            searchTip.innerHTML = html;
        }
    }

    // ========= 阅读页上下章【效果5】 =========
    const prevPage = document.getElementById('wang_prev_page');
    const nextPage = document.getElementById('wang_next_page');
    if(nextPage){
        nextPage.onclick = function(){
            alert("切换至下一话");
        }
    }
    if(prevPage){
        prevPage.onclick = function(){
            alert("切换至上一话");
        }
    }

    // ========= 后台管理 添加删除漫画【效果6】 =========
    const addBtn = document.getElementById('wang_add_btn');
    const adminList = document.getElementById('wang_admin_comic_list');
    const addTitle = document.getElementById('wang_add_title');
    const addTag = document.getElementById('wang_add_tag');
    let adminData = [];
    function renderAdmin(){
        let html = '';
        adminData.forEach((item,i)=>{
            html += `
                <div class="wang_admin_item">
                    <div>${item.title} ${item.tag}</div>
                    <span class="wang_admin_del" onclick="delItem(${i})">删除</span>
                </div>
            `
        })
        adminList.innerHTML = html;
    }
    window.delItem = function(i){
        adminData.splice(i,1);
        renderAdmin();
    }
    if(addBtn){
        addBtn.onclick = function(){
            let t = addTitle.value.trim();
            let tag = addTag.value.trim();
            if(t){
                adminData.push({title:t,tag:tag});
                renderAdmin();
                addTitle.value='';
                addTag.value='';
            }
        }
    }
    // ========= 榜单卡片：收藏、喜欢按钮 =========
    const collectBtns = document.querySelectorAll('.wang_card_collect');
    const likeBtns = document.querySelectorAll('.wang_card_like');
    collectBtns.forEach(btn=>{
        btn.onclick = function(){
            this.classList.toggle('active');
            if(this.classList.contains('active')){
                this.innerText = "已收藏";
            }else{
                this.innerText = "添加收藏";
            }
        }
    })
    likeBtns.forEach(btn=>{
        btn.onclick = function(){
            this.classList.toggle('active');
            if(this.classList.contains('active')){
                this.innerText = "❤️已喜欢";
            }else{
                this.innerText = "❤️喜欢";
            }
        }
    })
}
// 分类页面渲染题材
if(document.getElementById("wang_category_list")){
    const categoryData = [
        {name:"玄幻",icon:"⚔️"},
        {name:"恋爱",icon:"💖"},
        {name:"热血",icon:"🔥"},
        {name:"都市",icon:"🏙️"},
        {name:"奇幻",icon:"✨"},
        {name:"悬疑",icon:"🔮"},
        {name:"校园",icon:"🎒"},
        {name:"古风",icon:"🎋"},
    ];
    let categoryHtml = "";
    categoryData.forEach(item=>{
        categoryHtml += `
            <div class="wang_category_item">
                <div>${item.icon}</div>
                <div>${item.name}</div>
            </div>
        `
    })
    document.getElementById("wang_category_list").innerHTML = categoryHtml;
}
// 排行榜页面加载数据
if(document.getElementById("wang_rank_list")){
    fetch("./data/rank.json")
    .then(res=>res.json())
    .then(data=>{
        let html = "";
        data.forEach((item,index)=>{
            html += `
                <div class="wang_rank_item">
                    <div class="wang_rank_num">${index+1}</div>
                    <img src="${item.img}" class="wang_rank_item_img" alt="${item.title}">
                    <div class="wang_rank_info">
                        <div class="wang_rank_title">${item.title}</div>
                        <div class="wang_rank_tag">${item.type}</div>
                        <div class="wang_rank_view">阅读：${item.views}</div>
                    </div>
                </div>
            `
        })
        document.getElementById("wang_rank_list").innerHTML = html;
    })
}
// 实时人气排行榜：颁奖台金银铜牌
if (document.getElementById("wang_rank_list")) {
    fetch("./data/rank.json")
        .then(res => res.json())
        .then(data => {
            // 根据热度降序排序
            data.sort((a, b) => b.hot - a.hot);

            // 冠军 第1名
            if (data[0]) {
                document.getElementById("podium_img_1").src = data[0].img;
                document.getElementById("podium_img_1").alt = data[0].title;
                document.getElementById("podium_name_1").innerText = data[0].title;
                document.getElementById("podium_tag_1").innerText = data[0].tag;
            }
            // 亚军 第2名
            if (data[1]) {
                document.getElementById("podium_img_2").src = data[1].img;
                document.getElementById("podium_img_2").alt = data[1].title;
                document.getElementById("podium_name_2").innerText = data[1].title;
                document.getElementById("podium_tag_2").innerText = data[1].tag;
            }
            // 季军 第3名
            if (data[2]) {
                document.getElementById("podium_img_3").src = data[2].img;
                document.getElementById("podium_img_3").alt = data[2].title;
                document.getElementById("podium_name_3").innerText = data[2].title;
                document.getElementById("podium_tag_3").innerText = data[2].tag;
            }

            // 渲染4~10名
            let listHtml = "";
            data.slice(3, 10).forEach((item, index) => {
                const realRank = index + 4;
                listHtml += `
                    <div class="wang_rank_item">
                        <div class="wang_rank_num">${realRank}</div>
                        <img src="${item.img}" class="wang_rank_item_img" alt="${item.title}">
                        <div class="wang_rank_info">
                            <div class="wang_rank_title">${item.title}</div>
                            <div class="wang_rank_tag">${item.tag}</div>
                            <div class="wang_rank_view">实时热度：${item.hot}</div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("wang_rank_list").innerHTML = listHtml;
        });
}
