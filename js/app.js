// StrideElite 鞋類品牌網站核心邏輯 (App Main Logic)

// --- 全局狀態管理 (Global State) ---
const appState = {
  cart: [],
  theme: 'light', // 'light' | 'dark'
  currentView: 'home',
  currentProductId: null,
  filters: {
    search: '',
    sort: 'default', // 'default' | 'price-asc' | 'price-desc' | 'rating'
  },
  // 鞋類維護指南的當前分頁
  careActiveTab: 'leather' // 'leather' | 'sneaker' | 'waterproof'
};

// --- 初始化應用程式 ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCartFromStorage();
  initRouter();
  initCartSidebar();
  setupGlobalEventListeners();
});

// --- 主題管理 (Theme) ---
function initTheme() {
  const savedTheme = localStorage.getItem('strideelite_theme');
  if (savedTheme) {
    appState.theme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    appState.theme = 'dark';
  }
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', appState.theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');
    if (appState.theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
}

function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('strideelite_theme', appState.theme);
  applyTheme();
  showToast(`已切換為${appState.theme === 'dark' ? '深色' : '淺色'}模式`);
}

// --- 購物車管理 (Cart) ---
function loadCartFromStorage() {
  const savedCart = localStorage.getItem('strideelite_cart');
  if (savedCart) {
    try {
      appState.cart = JSON.parse(savedCart);
    } catch (e) {
      appState.cart = [];
    }
  }
  updateCartBadge();
}

function saveCartToStorage() {
  localStorage.setItem('strideelite_cart', JSON.stringify(appState.cart));
  updateCartBadge();
  renderCartItems();
}

function addToCart(productId, size, color, quantity = 1) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  // 檢查購物車中是否已有相同商品、尺寸和顏色
  const existingItemIndex = appState.cart.findIndex(
    item => item.product.id === productId && item.size === size && item.color === color
  );

  if (existingItemIndex > -1) {
    appState.cart[existingItemIndex].quantity += quantity;
  } else {
    appState.cart.push({
      product,
      size,
      color,
      quantity
    });
  }

  saveCartToStorage();
  showToast(`已將 ${product.name} (尺寸: ${size}) 加入購物車！`);
  openCartSidebar();
}

function removeFromCart(productId, size, color) {
  appState.cart = appState.cart.filter(
    item => !(item.product.id === productId && item.size === size && item.color === color)
  );
  saveCartToStorage();
  showToast("已從購物車移除商品", "success");
}

function updateCartBadge() {
  const totalCount = appState.cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  const cartToggleBtn = document.getElementById('cart-toggle');
  
  if (badge) {
    if (totalCount > 0) {
      badge.textContent = totalCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  } else if (cartToggleBtn && totalCount > 0) {
    // 如果 badge 元素還不存在但需要顯示，重新渲染 Header
    renderHeaderSection();
  }
}

function getCartTotal() {
  return appState.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function renderCartItems() {
  const cartList = document.getElementById('cart-items-list');
  const totalPriceEl = document.getElementById('cart-total-price');
  
  if (!cartList) return;
  
  if (appState.cart.length === 0) {
    cartList.innerHTML = '<div class="empty-cart-text">您的購物車是空的</div>';
    if (totalPriceEl) totalPriceEl.textContent = '0';
    return;
  }

  cartList.innerHTML = appState.cart.map(item => getCartItemHTML(item)).join('');
  if (totalPriceEl) totalPriceEl.textContent = getCartTotal();

  // 綁定購物車內刪除按鈕事件
  cartList.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const size = btn.dataset.size;
      const color = btn.dataset.color;
      removeFromCart(id, size, color);
    });
  });
}

function initCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartToggle = document.getElementById('cart-toggle');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const overlay = document.getElementById('overlay-backdrop');
  const checkoutBtn = document.getElementById('checkout-btn');

  const openCart = () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('show');
    renderCartItems();
  };

  const closeCart = () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
  };

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (appState.cart.length === 0) {
        showToast("購物車內沒有商品", "error");
        return;
      }
      alert(`感謝您的訂購！\n您即將結帳總金額：NT$ ${getCartTotal()}\n本網站為示範網站，尚未提供真實付款服務。`);
      appState.cart = [];
      saveCartToStorage();
      closeCart();
    });
  }
}

function openCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('overlay-backdrop');
  if (cartSidebar && overlay) {
    cartSidebar.classList.add('open');
    overlay.classList.add('show');
    renderCartItems();
  }
}

// --- 路由系統 (Router) ---
function initRouter() {
  const handleRouting = () => {
    const parsed = parsePathname();
    appState.currentView = parsed.page;
    appState.currentProductId = parsed.id;
    
    // 更新導航欄與頁面視圖
    renderHeaderSection();
    renderView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 關閉行動裝置的抽屜式選單
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('open');
  };

  window.addEventListener('load', handleRouting);
}

function parsePathname() {
  const path = window.location.pathname;
  let pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  // 映射實體 HTML 檔名到對應的視圖
  const pageMap = {
    'index.html': 'home',
    'about.html': 'about',
    'mens.html': 'mens',
    'womens.html': 'womens',
    'kids.html': 'kids',
    'care.html': 'care',
    'accessories.html': 'accessories',
    'contact.html': 'contact',
    'product.html': 'product'
  };
  
  let page = pageMap[pageName.toLowerCase()] || 'home';
  
  // 如果是 product.html，我們從 URL search 參數獲取 id
  let id = null;
  if (page === 'product') {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');
  }
  
  return { page, id };
}

function renderHeaderSection() {
  const header = document.getElementById('app-header');
  if (header) {
    const totalCount = appState.cart.reduce((total, item) => total + item.quantity, 0);
    header.innerHTML = getHeaderHTML(appState.currentView, totalCount);
    
    // 重新綁定 Header 中的事件
    applyTheme(); // 保證按鈕圖標正確
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('cart-toggle').addEventListener('click', () => {
      openCartSidebar();
    });
    
    // 行動端選單切換
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  }
}

// --- 視圖控制與渲染 (Views) ---
function renderView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  // 重置過濾器狀態（如果切換走商品頁面）
  if (!['mens', 'womens', 'kids', 'accessories'].includes(appState.currentView)) {
    appState.filters.search = '';
    appState.filters.sort = 'default';
  }

  switch (appState.currentView) {
    case 'home':
      container.innerHTML = getHomeViewHTML();
      setupHomeEvents();
      break;
    case 'about':
      container.innerHTML = getAboutViewHTML();
      break;
    case 'mens':
    case 'womens':
    case 'kids':
    case 'accessories':
      // 檢查是否已有靜態的商品列表容器（使用者在 HTML 內寫死以方便修改的情況）
      const staticGrid = container.querySelector('#category-products-grid');
      if (staticGrid && staticGrid.children.length > 0 && !container.querySelector('.fa-spinner')) {
        // 如果已經有靜態 HTML 卡片，則只進行事件綁定，不覆寫 HTML
        setupCategoryEvents(true);
      } else {
        // 否則，進行完整的動態 HTML 渲染
        container.innerHTML = getCategoryViewHTML(appState.currentView);
        setupCategoryEvents(false);
      }
      break;
    case 'care':
      container.innerHTML = getCareViewHTML();
      setupCareEvents();
      break;
    case 'contact':
      container.innerHTML = getContactViewHTML();
      setupContactEvents();
      break;
    case 'product':
      if (appState.currentProductId) {
        container.innerHTML = getProductDetailViewHTML(appState.currentProductId);
        setupProductDetailEvents();
      } else {
        window.location.href = 'index.html';
      }
      break;
    default:
      container.innerHTML = `<div style="padding: 100px; text-align: center;"><h2>頁面未找到</h2><a href="#home" class="btn btn-primary">返回首頁</a></div>`;
  }
}

// --- 頁面模板與事件 ---

// 1. 首頁 (Home)
function getHomeViewHTML() {
  // 挑選 4 個精選商品顯示在首頁
  const featuredIds = ['men-runner', 'women-heels', 'kids-runner', 'care-waterproof'];
  const featuredProducts = productsData.filter(p => featuredIds.includes(p.id));
  const featuredHTML = featuredProducts.map(p => getProductCardHTML(p)).join('');

  return `
    <div class="page-view">
      <!-- 英雄海報 Banner -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="hero-subtitle">StrideElite 精英首選</p>
          <h2 class="hero-title">邁步出眾，舒適相伴每一英里</h2>
          <p class="hero-description">融合現代美學設計與極致舒適的機能工藝，StrideElite 為追求極致品味的您打造每一雙無可挑剔的完美鞋履。</p>
          <div class="hero-buttons">
            <a href="mens.html" class="btn btn-primary">選購男鞋</a>
            <a href="womens.html" class="btn btn-primary">選購女鞋</a>
            <a href="about.html" class="btn btn-secondary">品牌故事</a>
          </div>
        </div>
      </section>

      <!-- 分類精選快捷卡片 -->
      <section class="category-showcase">
        <div class="section-header">
          <h2 class="section-title">探索精選類別</h2>
          <p class="section-subtitle">為您的日常生活、工作及戶外運動，尋找最合適的專屬配置</p>
        </div>
        <div class="grid-categories">
          <div class="category-card" onclick="window.location.href = 'mens.html'">
            <div class="category-img-wrapper">
              <img src="assets/images/men_oxford.png" alt="紳士男鞋系列" title="紳士男鞋系列">
            </div>
            <div class="category-info">
              <h3>紳士男鞋系列</h3>
              <p>商務皮鞋、越野登山、高能跑鞋</p>
            </div>
          </div>
          <div class="category-card" onclick="window.location.href = 'womens.html'">
            <div class="category-img-wrapper">
              <img src="assets/images/women_heels.png" alt="女鞋系列">
            </div>
            <div class="category-info">
              <h3>優雅女鞋系列</h3>
              <p>氣質高跟、休閒樂福、飛織跑鞋</p>
            </div>
          </div>
          <div class="category-card" onclick="window.location.href = 'kids.html'">
            <div class="category-img-wrapper">
              <img src="assets/images/kids_runner.png" alt="童鞋系列">
            </div>
            <div class="category-info">
              <h3>繽紛童鞋系列</h3>
              <p>輕量跑鞋、雨天防水、學院防滑</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 明星熱銷單品 -->
      <section class="featured-products">
        <div class="section-header">
          <h2 class="section-title">熱門推薦單品</h2>
          <p class="section-subtitle">精選品牌最受歡迎與好評的指標性商品</p>
        </div>
        <div class="products-grid">
          ${featuredHTML}
        </div>
      </section>

      <!-- 品牌核心價值與特色 -->
      <section class="brand-benefits">
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-shipping-fast"></i></div>
          <div class="benefit-text">
            <h4>免運費服務</h4>
            <p>全館消費滿 NT$ 1,500 即享黑貓免運配送</p>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-undo"></i></div>
          <div class="benefit-text">
            <h4>7天無憂退換貨</h4>
            <p>提供安心試穿尺寸不合免費更換</p>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="benefit-text">
            <h4>100% 正品保障</h4>
            <p>原廠直營品質把關，附尊榮包裝</p>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-hand-holding-heart"></i></div>
          <div class="benefit-text">
            <h4>專業鞋類維修</h4>
            <p>購買即可享受原廠專業諮詢與保養</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function setupHomeEvents() {
  const container = document.getElementById('main-content');
  if (!container) return;
  
  // 綁定首頁商品卡片的「快速加入購物車」按鈕
  container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.dataset.id;
      const product = productsData.find(p => p.id === id);
      if (product) {
        // 快速加入時，默認選擇第一個尺寸和顏色
        const size = product.sizes[0];
        const color = product.colors[0];
        addToCart(id, size, color, 1);
      }
    });
  });
}

// 2. 公司簡介 (About)
function getAboutViewHTML() {
  return `
    <div class="page-view">
      <section class="about-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h2 class="hero-title">陳如雪的鞋子專賣店</h2>
          <p class="hero-description">尋找一雙【好穿的鞋子】嗎？我們身為在地口碑頂尖的【品牌】，致力於為大家研發最舒適的步伐。</p>
        </div>
      </section>

      <section class="about-content">
        <div class="about-grid">
          <div class="about-text">
            <h3>工藝傳承，追求極致</h3>
            <p>StrideElite 創立於 2018 年，總部位於台北。創辦人陳如雪深感市場上多數鞋款在「時尚美學」與「舒適機能」之間難以兩全。為了打破這個僵局，她結合了一群在鞋業耕耘數十年的手工鞋大師與現代人體工學材料學家，共同締造了 StrideElite 這個致力於打造【好穿的鞋子】的頂尖【品牌】。</p>
            <p>在運動領域，StrideElite 導入最新氮氣防震技術，專為慢跑小白設計的【新手慢跑鞋】能帶來完美避震，極具【推薦】價值；而進階【慢跑鞋】更獲跑友神級【推薦】。奔馳球場的健兒也能在此找到高 CP 值的【平價】裝備，這款抗扭【籃球鞋】備受教練肯定的抓地力，讓這款【籃球鞋】被高度【推薦】。此外，不論是經典百搭的【黑色】科技【運動鞋】，還是講求極速穿脫的【無鞋帶】包覆【運動鞋】，均能滿足多元訓練。我們更打造專屬【健身訓練鞋】，給予【女】性最穩固的支撐力，而機能【運動鞋】也是我們極力【推薦】給所有熱愛運動【女】性的不二之選。</p>
          </div>
          <div class="about-image">
            <img src="assets/images/men_oxford.png" alt="手工製鞋工藝">
          </div>
        </div>

        <div class="about-grid" style="direction: rtl;">
          <div class="about-text" style="direction: ltr;">
            <h3>綠色永續，步履不停</h3>
            <p>StrideElite 將環境責任融入職人防護，開啟綠色製鞋全新篇章。身為全台備受各大企業信賴的【安全鞋】永續【品牌】，我們的高防護規格深受各界【推薦】，歡迎親臨我們的【安全鞋】旗艦【專賣店】選購。店內主打通過嚴格檢驗的【鋼頭安全鞋】，結合獨家研發的再生防滑大底，這款高規格【防滑】設計的綠色【工作鞋】能全方位守護勞工安全，同時也是公認最【適合久站的鞋子】。因應極端氣候，我們採用可回收塑料研發出強效【防水】科技的【防滑鞋】，無懼暴雨；而兼具減碳概念與都會美學的環保【防水鞋】，在重視永續的年輕族群中大受好評與【推薦】。</p>
            <p>在步履不停的路上，我們悉心守護全家人的足部健康，更愛護這片土地。針對喜愛探險的朋友，我們以環境友善材質打造機能【水陸兩用鞋】，在戶外圈極受【推薦】。為了解決通勤族的疲勞，環保減壓的【久站鞋】深受上班族【推薦】，是各行各業的必備好物；若您的腳步深受足疾困擾，專為【足底筋膜炎】打造的舒壓【專用鞋款】則能重塑舒適步伐。針對下一代，我們成立了【兒童】永續運動專區，是家長採購【足球鞋】首選的【專賣店】；週末出遊則有全回收料件的【兒童】【洞洞鞋】相伴。面對最讓人頭痛的【白鞋變黃】問題，我們建議在全新【鞋子】落地前，噴上對自然無害的【防水】防污【噴霧】，這招深受鞋友【推薦】，更是延長鞋履壽命、實踐永續生活的不二法門。</p>
          </div>
          <div class="about-image">
            <img src="assets/images/logo.png" alt="綠色環保材料">
          </div>
        </div>

        <div class="values-row">
          <div class="value-card glass-panel">
            <i class="fas fa-gem"></i>
            <h4>非凡品質 —— 締造【好穿的鞋子】頂尖【品牌】</h4>
            <p>傳承數十年手工大師的極致苛求，StrideElite 致力於研發出真正【好穿的鞋子】指標【品牌】。我們嚴選進口頂級小牛皮，以一針一線的匠心工藝，雕琢出如藝術品般的非凡鞋履，完美體現創辦人陳如雪對都會美學與品質的極致追求。</p>
          </div>
          <div class="value-card glass-panel">
            <i class="fas fa-heartbeat"></i>
            <h4>健康機能 —— 舒緩足部壓力的【久站鞋】強力【推薦】</h4>
            <p>結合人體工學與材料學，這款專為職人減壓打造的【久站鞋】，在舒適度與機能性上獲得各界高度【推薦】。我們精密研發抗菌防臭鞋墊，並導入氮氣中底防震技術，全面承載身體重量、吸收雙腳衝擊，為您的每一步帶來無與倫比的健康機能體驗。</p>
          </div>
          <div class="value-card glass-panel">
            <i class="fas fa-seedling"></i>
            <h4>環境友善 —— 搭配【鞋子】【防水】【噴霧】的環保【推薦】</h4>
            <p>守護地球，步履不停。我們選用低碳製程，更建議在全新【鞋子】落地前，搭配對自然無害的護鞋【防水】防污【噴霧】，這項永續保養對策深受專業達人【推薦】。讓我們減少碳足跡，邁出的每一步都成為對大自然最溫柔的環境友善承諾。</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

// 3. 商品列表頁面 (Categories: Men's, Women's, Kids', Accessories)
function getCategoryViewHTML(category) {
  const categoryTitles = {
    mens: '男鞋系列 (Men\'s Collection)',
    womens: '女鞋系列 (Women\'s Collection)',
    kids: '童鞋系列 (Kids\' Collection)',
    accessories: '專屬配件 (Accessories)'
  };
  
  const title = categoryTitles[category] || '所有商品';

  return `
    <div class="page-view" style="max-width: 1400px; margin: 40px auto; padding: 0 30px;">
      <div class="section-header" style="text-align: left; margin-bottom: 30px;">
        <h2 class="section-title" style="display: block; margin-bottom: 10px;">${title}</h2>
        <p class="section-subtitle" id="product-count-subtitle">正在加載商品...</p>
      </div>

      <!-- 商品過濾與搜索欄 -->
      <section class="filter-bar glass-panel">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" id="product-search-input" placeholder="搜尋商品名稱或特點..." value="${appState.filters.search}">
        </div>
        <div class="filter-options">
          <label for="sort-select" style="font-weight: 600; font-size: 0.9rem;">排序：</label>
          <select id="sort-select" class="filter-select">
            <option value="default" ${appState.filters.sort === 'default' ? 'selected' : ''}>預設推薦</option>
            <option value="price-asc" ${appState.filters.sort === 'price-asc' ? 'selected' : ''}>價格：由低到高</option>
            <option value="price-desc" ${appState.filters.sort === 'price-desc' ? 'selected' : ''}>價格：由高到低</option>
            <option value="rating" ${appState.filters.sort === 'rating' ? 'selected' : ''}>顧客評價最高</option>
          </select>
        </div>
      </section>

      <!-- 商品渲染列表 -->
      <div class="products-grid" id="category-products-grid">
        <!-- JS 動態插入 -->
      </div>
    </div>
  `;
}

function setupCategoryEvents(isStatic = false) {
  const searchInput = document.getElementById('product-search-input');
  const sortSelect = document.getElementById('sort-select');

  const updateList = () => {
    if (searchInput) appState.filters.search = searchInput.value.trim();
    if (sortSelect) appState.filters.sort = sortSelect.value;
    renderFilteredProducts();
  };

  if (searchInput) searchInput.addEventListener('input', updateList);
  if (sortSelect) sortSelect.addEventListener('change', updateList);

  if (isStatic) {
    // 靜態 HTML 時，初始載入不重新渲染商品，以保留使用者在 HTML 內自訂的 src, alt, title 屬性
    const grid = document.getElementById('category-products-grid');
    if (grid) {
      grid.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          const id = btn.dataset.id;
          const product = productsData.find(p => p.id === id);
          if (product) {
            const size = product.sizes[0];
            const color = product.colors[0];
            addToCart(id, size, color, 1);
          }
        });
      });
    }
  } else {
    // 動態渲染
    renderFilteredProducts();
  }
}

function renderFilteredProducts() {
  const grid = document.getElementById('category-products-grid');
  const subtitle = document.getElementById('product-count-subtitle');
  if (!grid) return;

  const category = appState.currentView;
  
  // 1. 過濾類別
  let filtered = productsData.filter(p => p.category === category);

  // 2. 搜尋關鍵字
  if (appState.filters.search) {
    const q = appState.filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  // 3. 排序
  if (appState.filters.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (appState.filters.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (appState.filters.sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // 更新顯示字樣
  if (subtitle) {
    subtitle.textContent = `為您找到 ${filtered.length} 項精選商品`;
  }

  // 渲染
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;" class="glass-panel">
        <i class="fas fa-box-open" style="font-size: 3rem; color: var(--primary-gold); margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 10px;">找不到符合的商品</h3>
        <p style="color: var(--text-secondary);">請嘗試更換搜尋關鍵字或清除篩選條件</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => getProductCardHTML(p)).join('');

  // 綁定快速加入購物車按鈕
  grid.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.dataset.id;
      const product = productsData.find(p => p.id === id);
      if (product) {
        const size = product.sizes[0];
        const color = product.colors[0];
        addToCart(id, size, color, 1);
      }
    });
  });
}

// 4. 鞋類維護與保養頁面 (Shoe Care)
function getCareViewHTML() {
  // 過濾獲取所有保養用品
  const careProducts = productsData.filter(p => p.category === 'care');
  const careProductsHTML = careProducts.map(p => getProductCardHTML(p)).join('');

  return `
    <div class="page-view">
      <section class="about-hero" style="height: 300px; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('assets/images/care_waterproof.png'); background-color: #1a1a17;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h2 class="hero-title">鞋類維修與保養指南</h2>
          <p class="hero-description">讓愛鞋延展壽命，維持歷久彌新的極致光彩</p>
        </div>
      </section>

      <!-- 專業保養商品 -->
      <section class="featured-products" style="margin-top: 60px;">
        <div class="section-header">
          <h2 class="section-title">專業護理系列</h2>
          <p class="section-subtitle">StrideElite 官方推薦的高效能保養清潔精品</p>
        </div>
        <div class="products-grid">
          ${careProductsHTML}
        </div>
      </section>

      <!-- 互動式保養技巧教學 -->
      <section class="care-section">
        <div class="section-header">
          <h2 class="section-title">大師級護理步驟</h2>
          <p class="section-subtitle">根據鞋子不同材質，學習最科學的護理手法</p>
        </div>

        <div class="care-tabs">
          <button class="tab-btn ${appState.careActiveTab === 'leather' ? 'active' : ''}" data-tab="leather">真皮與牛皮類保養</button>
          <button class="tab-btn ${appState.careActiveTab === 'sneaker' ? 'active' : ''}" data-tab="sneaker">網眼與針織跑鞋清潔</button>
          <button class="tab-btn ${appState.careActiveTab === 'waterproof' ? 'active' : ''}" data-tab="waterproof">防水噴霧防污使用</button>
        </div>

        <div class="care-guide-container glass-panel" id="care-guide-panel">
          <!-- JS 動態渲染分頁指南 -->
        </div>
      </section>
    </div>
  `;
}

function setupCareEvents() {
  const container = document.getElementById('main-content');
  if (!container) return;

  // 綁定快速加入購物車
  container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.dataset.id;
      const product = productsData.find(p => p.id === id);
      if (product) {
        const size = product.sizes[0];
        const color = product.colors[0];
        addToCart(id, size, color, 1);
      }
    });
  });

  // 綁定 Tab 分頁按鈕
  const tabs = container.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appState.careActiveTab = tab.dataset.tab;
      renderCareGuideContent();
    });
  });

  // 初始渲染分頁內容
  renderCareGuideContent();
}

function renderCareGuideContent() {
  const panel = document.getElementById('care-guide-panel');
  if (!panel) return;

  const guides = {
    leather: {
      title: "紳士真皮皮鞋保養黃金法則",
      desc: "真皮皮革富含天然纖維與油脂，隨著穿著時間會逐漸流失。定期滋養能使皮質維持水潤彈性，避免乾裂失去光澤。",
      img: "assets/images/care_cream.png",
      steps: [
        { num: "1", title: "乾刷除塵", desc: "使用馬毛刷大面積刷拭，將皮鞋縫隙及浮塵清除乾淨。" },
        { num: "2", title: "深層滋養", desc: "用棉布沾取少量煥彩蜂蠟滋養霜，均勻以畫圓方式揉入皮革。" },
        { num: "3", title: "靜置吸收", desc: "將皮鞋置於通風陰涼處靜置 15 分鐘，讓滋養成分徹底吸收。" },
        { num: "4", title: "拋光打亮", desc: "再次用馬毛刷快速往復刷拭，使皮革展現出絲綢般的精緻油亮光澤。" }
      ]
    },
    sneaker: {
      title: "針織與編織網眼運動鞋清潔妙招",
      desc: "運動跑鞋與針織鞋面容易吸附泥沙與汗液，不建議整雙丟洗衣機，否則容易造成溢膠或變形。請採用半乾式手工精細清潔法。",
      img: "assets/images/care_brush.png",
      steps: [
        { num: "1", title: "取出鞋墊", desc: "把鞋帶與鞋墊拆下，將它們單獨浸泡在溫和中性肥皂水中清洗。" },
        { num: "2", title: "毛刷打濕", desc: "取清潔刷沾水，甩掉多餘水分，滴上專用球鞋清潔液。" },
        { num: "3", title: "輕揉刷洗", desc: "對針織鞋面以畫圈方式溫柔刷洗，揉起泡沫，並迅速用超細纖維毛巾擦乾浮沫。" },
        { num: "4", title: "陰乾防暴曬", desc: "放入紙團支撐鞋型，置於陰涼通風處陰乾，切忌烈日曝曬與高溫吹乾。" }
      ]
    },
    waterproof: {
      title: "御盾防水噴霧正確噴灑指南",
      desc: "防水防污噴霧是在鞋面最外層附著一層撥水分子粒子，為發揮最大效用，鞋子表面的潔淨度與噴灑距離是成敗的關鍵。",
      img: "assets/images/care_waterproof.png",
      steps: [
        { num: "1", title: "確保乾燥", desc: "務必在鞋子完全乾淨且乾燥的狀態下使用，灰塵會降低撥水因子附著力。" },
        { num: "2", title: "搖勻噴霧", desc: "使用前上下搖晃防水噴霧罐身，使其內部奈米粒子混合均勻。" },
        { num: "3", title: "保持距離", desc: "距離鞋面約 20 公分，均勻噴灑至鞋面呈現微濕潤的飽和狀態。" },
        { num: "4", title: "風乾加固", desc: "於陰涼處風乾 15 分鐘。如遇多雨季節，可重複噴灑第二層，防禦效果加倍。" }
      ]
    }
  };

  const guide = guides[appState.careActiveTab];
  if (!guide) return;

  const stepsHTML = guide.steps.map(s => `
    <div class="step-item">
      <div class="step-num">${s.num}</div>
      <div class="step-text">
        <h5>${s.title}</h5>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');

  panel.innerHTML = `
    <div class="care-guide-content">
      <h3>${guide.title}</h3>
      <p>${guide.desc}</p>
      <div class="step-list">
        ${stepsHTML}
      </div>
    </div>
    <div class="care-guide-img">
      <img src="${guide.img}" alt="${guide.title}">
    </div>
  `;
}

// 5. 聯絡我們 (Contact Us)
function getContactViewHTML() {
  return `
    <div class="page-view">
      <section class="about-hero" style="height: 250px; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('assets/images/men_hiking.png'); background-position: center bottom;" alt="聯絡我們" title="聯絡我們">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h2 class="hero-title">聯絡我們 (Contact Us)</h2>
          <p class="hero-description">如有任何商品問題或售後保養諮詢，我們非常榮幸為您服務</p>
        </div>
      </section>

      <section class="contact-container">
        <!-- 聯絡資訊 -->
        <div class="contact-info-panel glass-panel">
          <h3>StrideElite 台北旗艦店</h3>
          <p>期待您的蒞臨，體驗尊榮的手工試穿與保養服務。</p>
          
          <div class="contact-details">
            <div class="contact-detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="contact-detail-text">
                <h5>門市地址</h5>
                <p>106 台北市大安區忠孝東路四段 888 號</p>
              </div>
            </div>
            <div class="contact-detail-item">
              <i class="fas fa-phone"></i>
              <div class="contact-detail-text">
                <h5>客服電話</h5>
                <p>+886-2-2777-9999 (客服時段 10:00 - 19:00)</p>
              </div>
            </div>
            <div class="contact-detail-item">
              <i class="fas fa-envelope"></i>
              <div class="contact-detail-text">
                <h5>電子郵件信箱</h5>
                <p>service@strideelite.com</p>
              </div>
            </div>
            <div class="contact-detail-item">
              <i class="fas fa-clock"></i>
              <div class="contact-detail-text">
                <h5>門市營業時間</h5>
                <p>週一至週日 11:00 - 22:00 (例假日照常營業)</p>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px;">
            <h5>關注我們</h5>
            <div class="social-links">
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

        <!-- 線上聯絡表單 -->
        <div class="contact-form-panel glass-panel">
          <h3>在線留言信箱</h3>
          <div class="form-feedback" id="form-feedback">
            您的留言已成功送出！我們將於 24 小時內與您聯絡。
          </div>
          <form id="contact-form">
            <div class="form-group">
              <label for="contact-name">顧客姓名 <span style="color: red;">*</span></label>
              <input type="text" id="contact-name" required placeholder="例如：林先生 / 小姐">
            </div>
            <div class="form-group">
              <label for="contact-email">聯絡信箱 <span style="color: red;">*</span></label>
              <input type="email" id="contact-email" required placeholder="yourname@example.com">
            </div>
            <div class="form-group">
              <label for="contact-phone">聯絡電話</label>
              <input type="tel" id="contact-phone" placeholder="0912-345678">
            </div>
            <div class="form-group">
              <label for="contact-subject">諮詢主旨 <span style="color: red;">*</span></label>
              <select id="contact-subject" class="filter-select" style="width: 100%; border-radius: var(--border-radius-sm);" required>
                <option value="">請選擇諮詢主旨...</option>
                <option value="product">商品尺寸與庫存諮詢</option>
                <option value="care">鞋子保養與清潔服務</option>
                <option value="order">訂單與退換貨事宜</option>
                <option value="cooperation">商務合作洽談</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contact-message">留言內容 <span style="color: red;">*</span></label>
              <textarea id="contact-message" required placeholder="請詳細描述您的問題，我們將竭誠為您解答..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
              提交留言 <i class="fas fa-paper-plane" style="margin-left: 5px;"></i>
            </button>
          </form>
        </div>
      </section>
      
      <!-- 門市地理位置地圖 (Mock Map) -->
      <section style="max-width: 1200px; margin: 40px auto 80px; padding: 0 30px;">
        <div class="glass-panel" style="padding: 10px; border-radius: var(--border-radius-lg);">
          <div style="width: 100%; height: 350px; background-color: var(--footer-bg); border-radius: var(--border-radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #ffffff; gap: 15px; position: relative; overflow: hidden;">
            <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('assets/images/logo.png') no-repeat center center; background-size: contain; filter: blur(3px); opacity: 0.15;"></div>
            <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary-gold); z-index: 1;"></i>
            <h4 style="z-index: 1; font-weight: 700;">StrideElite 台北旗艦店 GPS 實時定位</h4>
            <p style="z-index: 1; color: var(--accent-gold); font-size: 0.9rem;">(捷運忠孝敦化站 3 號出口，步行約 3 分鐘)</p>
            <div style="z-index: 1; width: 12px; height: 12px; border-radius: 50%; background-color: var(--success); display: inline-block; position: relative;">
              <span style="position: absolute; top: -4px; left: -4px; width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--success); animation: pulse 2s infinite; opacity: 0.7;"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// 註冊 CSS 特效 keyframes 於 JS 中 (防震)
if (!document.getElementById('map-pulse-style')) {
  const style = document.createElement('style');
  style.id = 'map-pulse-style';
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(0.9); opacity: 0.8; }
      50% { transform: scale(1.6); opacity: 0.2; }
      100% { transform: scale(0.9); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
}

function setupContactEvents() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 獲取表單數據模擬提交
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      
      // 顯示表單反饋
      if (feedback) {
        feedback.classList.add('success');
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      showToast(`收到 ${name} 的留言！我們會回覆至 ${email}`, "success");
      form.reset();
      
      // 5秒後自動隱藏成功反饋
      setTimeout(() => {
        if (feedback) feedback.classList.remove('success');
      }, 5000);
    });
  }
}

// 6. 商品詳情頁面 (Product Detail)
function getProductDetailViewHTML(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) {
    return `<div style="padding: 100px; text-align: center;"><h2>找不到該商品</h2><a href="#home" class="btn btn-primary">返回首頁</a></div>`;
  }

  // 映射英文類別名稱為中文
  const categoryNames = {
    mens: '男鞋系列',
    womens: '女鞋系列',
    kids: '童鞋系列',
    care: '鞋類維護',
    accessories: '專屬配件'
  };
  const categoryLinkHash = {
    mens: 'mens.html',
    womens: 'womens.html',
    kids: 'kids.html',
    care: 'care.html',
    accessories: 'accessories.html'
  };
  
  const categoryChinese = categoryNames[product.category] || '精選商品';
  const categoryHash = categoryLinkHash[product.category] || 'index.html';

  const hasOriginalPrice = product.originalPrice && product.originalPrice > product.price;
  const originalPriceHTML = hasOriginalPrice ? `<span class="detail-price-orig">原價 NT$ ${product.originalPrice}</span>` : '';
  const discountBadgeHTML = hasOriginalPrice ? `<span class="badge-tag" style="position:static; margin-left: 10px;">優惠特價</span>` : '';

  // 尺寸選擇器 HTML
  // 注意：護理液和部分配件沒有鞋子尺寸
  const sizeOptionHTML = product.sizes && product.sizes.length > 0 ? `
    <div class="option-group">
      <h4>選取規格/尺寸:</h4>
      <div class="size-selector" id="detail-size-selector">
        ${product.sizes.map((size, index) => `
          <button class="size-btn ${index === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
        `).join('')}
      </div>
    </div>
  ` : '';

  // 顏色選擇器 HTML
  const colorOptionHTML = product.colors && product.colors.length > 0 ? `
    <div class="option-group">
      <h4>選取顏色:</h4>
      <div class="color-selector" id="detail-color-selector">
        ${product.colors.map((color, index) => `
          <button class="color-pill ${index === 0 ? 'active' : ''}" data-color="${color}">${color}</button>
        `).join('')}
      </div>
    </div>
  ` : '';

  // 產品特點 HTML
  const featuresHTML = product.features && product.features.length > 0 ? `
    <div class="detail-features glass-panel">
      <h4>精雕細琢之特點:</h4>
      <ul>
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  // 評論列表 HTML
  const ratingStarsHTML = Array.from({ length: 5 }, (_, i) => 
    `<i class="${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star"></i>`
  ).join('');
  const reviewsHTML = product.reviews.map(r => getReviewHTML(r)).join('');

  return `
    <div class="page-view detail-container">
      <a href="${categoryHash}" class="detail-back-link">
        <i class="fas fa-arrow-left"></i> 返回 ${categoryChinese} 列表
      </a>

      <div class="detail-grid">
        <!-- 產品大圖展示 -->
        <div class="detail-gallery glass-panel">
          <img src="${product.image}" alt="${product.name}" class="detail-main-img" id="detail-main-img">
        </div>

        <!-- 產品詳細訊息 -->
        <div class="detail-info">
          <div class="detail-cat-row">
            <span class="product-cat">${categoryChinese}</span>
            <span class="product-rating">
              <i class="fas fa-star"></i> ${product.rating.toFixed(1)} (${product.reviews.length} 條評論)
            </span>
          </div>
          
          <h2 class="detail-title">${product.name}</h2>
          
          <div class="detail-price-row">
            <span class="detail-price-curr">${product.price}</span>
            ${originalPriceHTML}
            ${discountBadgeHTML}
          </div>

          <p class="detail-description">${product.description}</p>

          <div class="detail-options">
            ${sizeOptionHTML}
            ${colorOptionHTML}

            <!-- 數量選擇器 -->
            <div class="option-group">
              <h4>選取購買數量:</h4>
              <div class="qty-selector">
                <button class="qty-btn" id="qty-minus-btn"><i class="fas fa-minus"></i></button>
                <input type="text" class="qty-input" id="qty-input" value="1">
                <button class="qty-btn" id="qty-plus-btn"><i class="fas fa-plus"></i></button>
              </div>
            </div>
          </div>

          <div class="detail-actions">
            <button class="btn btn-primary btn-add-to-cart" id="btn-add-to-cart" data-id="${product.id}">
              加入購物車 <i class="fas fa-shopping-bag" style="margin-left: 10px;"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 產品特點及客戶評論區 -->
      <div style="margin-top: 50px;">
        ${featuresHTML}

        <section class="reviews-section" id="reviews-section">
          <div class="reviews-header">
            <h4>客戶體驗評論</h4>
            <div class="reviews-summary">
              <div class="rating-huge">${product.rating.toFixed(1)}</div>
              <div>
                <div class="rating-stars">${ratingStarsHTML}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">基於 ${product.reviews.length} 位真實用戶的反饋</div>
              </div>
            </div>
          </div>

          <!-- 評論列表 -->
          <div class="reviews-list">
            ${reviewsHTML}
          </div>
        </section>
      </div>
    </div>
  `;
}

function setupProductDetailEvents() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const sizeButtons = container.querySelectorAll('#detail-size-selector .size-btn');
  const colorButtons = container.querySelectorAll('#detail-color-selector .color-pill');
  
  let selectedSize = sizeButtons.length > 0 ? sizeButtons[0].dataset.size : '通用';
  let selectedColor = colorButtons.length > 0 ? colorButtons[0].dataset.color : '通用';

  // 尺寸選擇點擊
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  // 顏色選擇點擊
  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      colorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = btn.dataset.color;
    });
  });

  // 數量加減
  const qtyInput = container.querySelector('#qty-input');
  const qtyMinus = container.querySelector('#qty-minus-btn');
  const qtyPlus = container.querySelector('#qty-plus-btn');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      if (val < 10) {
        qtyInput.value = val + 1;
      }
    });
  }

  // 加入購物車按鈕
  const addToCartBtn = container.querySelector('#btn-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const id = addToCartBtn.dataset.id;
      const qty = qtyInput ? parseInt(qtyInput.value) : 1;
      addToCart(id, selectedSize, selectedColor, qty);
    });
  }
}

// --- 全局輔助事件綁定 ---
function setupGlobalEventListeners() {
  // 當前僅用於監聽全局未捕獲的快速加入（例如透過其他組件）
  // 由於本架構中，所有渲染皆會重新綁定按鈕事件，故只需在頁面重新渲染後註冊事件即可
}
