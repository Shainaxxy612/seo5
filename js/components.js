// StrideElite 鞋類品牌網站 UI 組件庫

// 渲染頂部導航欄
function getHeaderHTML(activePage, cartItemCount = 0) {
  const pages = [
    { id: 'home', name: '首頁' },
    { id: 'about', name: '公司簡介' },
    { id: 'mens', name: '男鞋' },
    { id: 'womens', name: '女鞋' },
    { id: 'kids', name: '童鞋' },
    { id: 'care', name: '鞋類維護' },
    { id: 'accessories', name: '配件' },
    { id: 'contact', name: '聯絡我們' }
  ];

  const navItemsHTML = pages.map(page => `
    <li>
      <a href="#${page.id}" class="nav-link ${activePage === page.id ? 'active' : ''}" data-page="${page.id}">
        ${page.name}
      </a>
    </li>
  `).join('');

  return `
    <div class="header-container">
      <a href="#home" class="logo-link">
        <img src="assets/images/logo.png" alt="StrideElite Logo" class="logo-img">
        <span class="logo-text">StrideElite</span>
      </a>
      <nav>
        <ul class="nav-menu" id="nav-menu">
          ${navItemsHTML}
        </ul>
      </nav>
      <div class="header-actions">
        <button class="action-btn theme-toggle" id="theme-toggle" title="切換深淺色模式">
          <i class="fas fa-moon"></i>
        </button>
        <button class="action-btn cart-toggle" id="cart-toggle" title="購物車" style="position: relative;">
          <i class="fas fa-shopping-bag"></i>
          ${cartItemCount > 0 ? `<span style="position: absolute; top: -5px; right: -5px; background: var(--primary-gold); color: #1e1e1a; font-size: 0.7rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center;" id="cart-badge">${cartItemCount}</span>` : ''}
        </button>
        <button class="action-btn menu-toggle" id="menu-toggle" title="選單">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  `;
}

// 渲染底部欄
function getFooterHTML() {
  return `
    <div class="footer-container">
      <div class="footer-logo-panel">
        <h3>StrideElite</h3>
        <p>邁步精英，打造您的專屬步伐。我們專注於將精湛手工藝與現代科技融合，為您提供無與倫比的舒適與優雅感受。</p>
        <div class="social-links">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-line"></i></a>
        </div>
      </div>
      <div class="footer-links-panel">
        <h4>探索類別</h4>
        <ul>
          <li><a href="#mens">紳士男鞋系列</a></li>
          <li><a href="#womens">時尚女鞋系列</a></li>
          <li><a href="#kids">歡樂童鞋系列</a></li>
          <li><a href="#accessories">精選配件系列</a></li>
        </ul>
      </div>
      <div class="footer-links-panel">
        <h4>售後服務</h4>
        <ul>
          <li><a href="#care">專業鞋類維護指南</a></li>
          <li><a href="#about">品牌故事與精神</a></li>
          <li><a href="#contact">門市資訊與聯絡</a></li>
          <li><a href="#">退換貨政策</a></li>
        </ul>
      </div>
      <div class="footer-newsletter-panel">
        <h4>訂閱電子報</h4>
        <p>訂閱以獲取 StrideElite 最新系列發佈資訊、獨家折扣優惠及鞋類保養秘笈。</p>
        <form class="newsletter-form" id="newsletter-form">
          <input type="email" placeholder="輸入您的電子信箱" required>
          <button type="submit">訂閱</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 StrideElite (邁步精英) 品牌概念店. 版權所有.</p>
      <div class="footer-payments">
        <i class="fab fa-cc-visa" title="Visa"></i>
        <i class="fab fa-cc-mastercard" title="MasterCard"></i>
        <i class="fab fa-cc-jcb" title="JCB"></i>
        <i class="fab fa-cc-apple-pay" title="Apple Pay"></i>
      </div>
    </div>
  `;
}

// 生成商品卡片 HTML
function getProductCardHTML(product) {
  const hasOriginalPrice = product.originalPrice && product.originalPrice > product.price;
  const originalPriceHTML = hasOriginalPrice ? `<span class="price-original">NT$ ${product.originalPrice}</span>` : '';
  const discountBadgeHTML = hasOriginalPrice ? `<span class="badge-tag">優惠中</span>` : '';
  
  // 映射英文類別名稱為中文
  const categoryNames = {
    mens: '男鞋系列',
    womens: '女鞋系列',
    kids: '童鞋系列',
    care: '鞋類維護',
    accessories: '專屬配件'
  };
  
  const categoryChinese = categoryNames[product.category] || '精選商品';

  return `
    <div class="product-card glass-panel" data-id="${product.id}">
      ${discountBadgeHTML}
      <div class="product-img-holder">
        <a href="#product/${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-meta">
        <div class="product-meta-header">
          <span class="product-cat">${categoryChinese}</span>
          <span class="product-rating">
            <i class="fas fa-star"></i> ${product.rating.toFixed(1)}
          </span>
        </div>
        <h3 class="product-card-title">
          <a href="#product/${product.id}">${product.name}</a>
        </h3>
        <div class="product-card-bottom">
          <div class="price-box">
            ${originalPriceHTML}
            <span class="price-current">${product.price}</span>
          </div>
          <button class="add-cart-btn add-to-cart-quick" data-id="${product.id}" title="加入購物車">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 生成購物車單項 HTML
function getCartItemHTML(item) {
  return `
    <div class="cart-item" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}">
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <div class="cart-item-spec">尺寸: ${item.size} | 顏色: ${item.color}</div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">NT$ ${item.product.price}</span>
          <span class="cart-item-qty">數量: ${item.quantity}</span>
        </div>
      </div>
      <button class="remove-item-btn" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}" title="刪除商品">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `;
}

// 生成單條顧客評論 HTML
function getReviewHTML(review) {
  const avatarChar = review.author.charAt(0);
  const starsHTML = Array.from({ length: 5 }, (_, i) => 
    `<i class="${i < review.rating ? 'fas' : 'far'} fa-star"></i>`
  ).join('');

  return `
    <div class="review-item glass-panel">
      <div class="review-meta">
        <div class="review-user-info">
          <div class="user-avatar">${avatarChar}</div>
          <div>
            <div class="user-name">${review.author}</div>
            <div class="rating-stars">${starsHTML}</div>
          </div>
        </div>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-content">${review.comment}</p>
    </div>
  `;
}

// 顯示 Toast 訊息
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // 3秒後自動移除
  setTimeout(() => {
    toast.style.animation = 'toastShow 0.4s ease reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
}
