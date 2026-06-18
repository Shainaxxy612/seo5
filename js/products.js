// StrideElite 鞋類品牌網站產品資料庫
const productsData = [
  // --- 男鞋系列 (Men's Shoes) ---
  {
    id: "men-runner",
    name: "極光炫能專業跑鞋 (Aurora Speed Runner)",
    category: "mens",
    price: 3680,
    originalPrice: 4200,
    image: "assets/images/men_runner.png", alt: "極光炫能專業跑鞋 (Aurora Speed Runner)", title: "極光炫能專業跑鞋 (Aurora Speed Runner)",
    description: "StrideElite 旗艦級運動跑鞋。採用極光橘與暗黑的科技編織網眼鞋面，融合最新一波 AirFlow 透氣科技與高彈力氮氣避震中底。不論是日常慢跑還是馬拉松競速，都能為您提供強勁的推進力與完美的腳感回饋。",
    features: [
      "極光霓虹與酷黑雙色立體編織鞋面，吸睛且極具科技感",
      "全新氮氣中底 (NitroFoam) 技術，緩震與能量回饋提升 25%",
      "耐磨橡膠抓地大底，適應各類路面與濕滑天氣",
      "人體工學足踝包裹設計，防扭傷防側翻"
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["極光橘/酷黑", "幻影灰/曜石黑"],
    rating: 4.9,
    reviews: [
      { author: "張小明", rating: 5, date: "2026-05-12", comment: "這雙鞋的避震效果真的太棒了！慢跑 10 公里腳完全不會酸，而且配色超級帥氣，回頭率超高！" },
      { author: "林大華", rating: 4, date: "2026-05-28", comment: "透氣性很好，夏天跑起來也不悶熱。版型稍微偏小，建議買大半號。" }
    ]
  },
  {
    id: "men-oxford",
    name: "英倫經典典藏雕花皮鞋 (Classic Oxford Brogue)",
    category: "mens",
    price: 4580,
    originalPrice: 5200,
    image: "assets/images/men_oxford.png",
    description: "傳承英式傳統工藝的雕花牛津鞋。選用上乘全粒面牛皮手工擦色，呈現深邃典雅的漸層光澤。極致貼合腳型的固特異沿條結構與吸震真皮鞋墊，將時尚風範與極致舒適完美融合，是紳士出席正式場合的首選。",
    features: [
      "精選頂級義大利全粒面小牛皮，觸感細膩，光澤自然",
      "純手工擦色與精緻布洛克雕花工藝，彰顯品味與細節",
      "真皮透氣內裡配減壓記憶海綿鞋墊，久站不累",
      "固特異手工縫製鞋底，堅固耐用可更換大底"
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["典雅焦糖棕", "深邃紳士黑"],
    rating: 4.8,
    reviews: [
      { author: "陳經理", rating: 5, date: "2026-04-18", comment: "皮革質感非常好，手工擦色的漸層感很高級。穿去開會和宴會都非常合適，同事都在問在哪裡買的。" },
      { author: "李先生", rating: 4, date: "2026-05-02", comment: "剛穿前幾天皮質有點硬，穿了一星期後就非常貼合腳型了，越穿越好看！" }
    ]
  },
  {
    id: "men-hiking",
    name: "巔峰行者全地形防水登山靴 (Summit Waterproof Boots)",
    category: "mens",
    price: 4980,
    originalPrice: 5800,
    image: "assets/images/men_hiking.png",
    description: "專為挑戰極限設計的全地形登山靴。採用高耐磨防潑水皮革結合 GORE-SHIELD 奈米防水薄膜，確保足部絕對乾爽。大底使用防滑橡膠複合抓地齒，不論濕滑泥地、岩石絕壁還是雪地，皆能如履平地。",
    features: [
      "三層防水透氣結構，阻擋雨水侵入的同時迅速排出足部濕氣",
      "鞋頭與鞋跟加厚防撞保護，防禦戶外碎石重擊",
      "高筒包裹式設計，提供卓越的腳踝支撐與防扭轉防護",
      "越野級橡膠齒紋大底，極致抓地與減震性能"
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ["深邃岩褐/石炭灰", "軍野綠/極客黑"],
    rating: 4.7,
    reviews: [
      { author: "登山客阿風", rating: 5, date: "2026-06-01", comment: "上週末穿去爬中級山遇大雨，整雙鞋裡面完全沒濕！而且抓地力極佳，走在泥濘路上很安心。" },
      { author: "王先生", rating: 4, date: "2026-06-10", comment: "保護性無可挑剔，踝部包覆感很強。鞋子稍微有些重量，但登山靴這樣才扎實。" }
    ]
  },

  // --- 女鞋系列 (Women's Shoes) ---
  {
    id: "women-heels",
    name: "魅影紅伶時尚尖頭高跟鞋 (Scarlet Elegance Heels)",
    category: "womens",
    price: 3880,
    originalPrice: 4600,
    image: "assets/images/women_heels.png",
    description: "優雅極致的代表作。精緻的漸層魅影紅細絨面，搭配經典性感尖頭設計與 8cm 黃金比例細高跟，修飾身形曲線。獨特的足弓減壓承托墊設計，打破傳統高跟鞋久穿腳痛的痛點，讓您在各個重要場合散發自信魅力。",
    features: [
      "奢華進口綿羊反絨皮革面料，色彩飽滿，質感高級",
      "8公分精密力學鞋跟設計，美化身形曲線的同時保持重心穩定",
      "軟彈乳膠減壓前掌墊與足弓支撐，大幅舒緩前掌壓力",
      "防滑耐磨超薄牛筋底，踏步穩健安靜"
    ],
    sizes: [35, 36, 37, 38, 39, 40],
    colors: ["烈焰魅影紅", "神秘奧利奧黑", "溫柔裸粉色"],
    rating: 4.8,
    reviews: [
      { author: "Emily", rating: 5, date: "2026-05-20", comment: "這雙紅色真的美翻了！很顯白，而且裡面的鞋墊有一層軟軟的墊子，穿著站立主持兩個小時都不會覺得痛！" },
      { author: "Sophia", rating: 4, date: "2026-06-03", comment: "鞋跟高度很剛好，走起路來很穩，鞋型很修飾腳趾形狀，推薦！" }
    ]
  },
  {
    id: "women-sneaker",
    name: "微風粉霧透氣針織慢跑鞋 (Breeze Knit Sneaker)",
    category: "womens",
    price: 2980,
    originalPrice: 3500,
    image: "assets/images/women_sneaker.png",
    description: "像微風般輕盈無感的生活慢跑鞋。採用粉霧粉紅高彈力 3D 一體飛織科技，完美包覆腳型。雲感超軟中底配合排汗抗菌鞋墊，提供極致溫柔的踩踏腳感。不論是運動健身還是逛街通勤，都是女性的最佳夥伴。",
    features: [
      "3D 一體成型彈力飛織網眼，輕盈透氣如穿襪子般舒適貼合",
      "雲感彈力中底 (CloudFoam)，提供極致柔軟的避震與防滑耐磨",
      "可水洗抗菌防臭鞋墊，保持腳部一整天的乾爽清新",
      "鞋跟貼心拉環設計，穿脫更加快速方便"
    ],
    sizes: [35, 36, 37, 38, 39, 40],
    colors: ["微風櫻粉", "迷霧灰白", "簡約酷黑"],
    rating: 4.9,
    reviews: [
      { author: "莉莉", rating: 5, date: "2026-05-15", comment: "超、級、輕！穿上去像沒穿鞋子一樣舒服，櫻花粉真的超好看，平常搭牛仔褲或運動褲都超配。" },
      { author: "陳小姐", rating: 5, date: "2026-05-30", comment: "鞋底真的很軟，踩下去像踩在棉花糖上。我是寬腳板，穿這雙也完全不會壓迫，很棒的延展性！" }
    ]
  },
  {
    id: "women-loafer",
    name: "優雅晨光麂皮舒適樂福鞋 (Morning Suede Loafers)",
    category: "womens",
    price: 3280,
    originalPrice: 3800,
    image: "assets/images/women_loafer.png",
    description: "散發休閒法式優雅的經典樂福鞋。精選柔軟細緻的反絨麂皮，配以莫卡辛手工縫線與簡約的金屬扣飾，流露低調奢華。極柔軟的一體式橡膠底與可折疊後跟設計，一鞋兩穿，既是優雅樂福鞋也是隨性穆勒鞋。",
    features: [
      "特級防潑水反絨麂皮，質地溫潤，耐髒易打理",
      "可踩跟兩穿設計，一秒切換優雅通勤與慵懶休閒模式",
      "高密度減震乳膠鞋墊，提供沙發級踩踏享受",
      "極軟一體式防滑橡膠底，任意彎曲不變形"
    ],
    sizes: [35, 36, 37, 38, 39, 40],
    colors: ["溫暖燕麥沙", "經典摩卡棕", "海軍深海藍"],
    rating: 4.7,
    reviews: [
      { author: "Hannah", rating: 4, date: "2026-04-22", comment: "麂皮的質感很溫暖，燕麥沙色很百搭。後跟可以直接踩下去當穆勒鞋穿，懶人最愛！" },
      { author: "小琪", rating: 5, date: "2026-05-10", comment: "完全不磨腳！這對我這種極度容易磨腳後跟的人來說簡直是救星，真皮內裡很吸汗。" }
    ]
  },

  // --- 童鞋系列 (Kids' Shoes) ---
  {
    id: "kids-runner",
    name: "彩虹旋風超輕量兒童運動鞋 (Rainbow Wind Kids Sneaker)",
    category: "kids",
    price: 1880,
    originalPrice: 2200,
    image: "assets/images/kids_runner.png",
    description: "專為學齡兒童設計的超輕量運動鞋。採用繽紛活潑的炫彩拼色，激發孩子探索世界的熱情。寬楦設計符合亞洲兒童發育期腳型，魔鬼氈與高彈力拉帶讓穿脫變的非常簡單。高抓地力防滑鞋底，保護孩子每一次奔跑。",
    features: [
      "超輕量無負擔結構，單隻僅重約 120g，釋放孩子好動天性",
      "寬大鞋頭 (Wide Toe Box)，給予發育中腳趾充足活動空間",
      "高彈性雙向防護魔鬼氈，鬆緊易調，包覆穩固",
      "防滑凹槽橡膠鞋底，提供絕佳的彎曲度與耐磨抓地力"
    ],
    sizes: [28, 30, 31, 32, 33, 34, 35],
    colors: ["彩虹炫橘綠", "甜心粉紫藍"],
    rating: 4.8,
    reviews: [
      { author: "兔兔媽", rating: 5, date: "2026-05-18", comment: "兒子超喜歡這雙的配色，天天吵著要穿去幼兒園。重量真的很輕，魔鬼氈設計讓他自己就能穿得很好。" },
      { author: "林爸爸", rating: 4, date: "2026-06-05", comment: "防滑效果很好，去公園奔跑抓地力很夠，鞋頭有加厚防撞保護，小孩子踢石頭也不容易受傷。" }
    ]
  },
  {
    id: "kids-rainboots",
    name: "歡樂小鴨防水防滑兒童雨鞋 (Happy Duck Rainboots)",
    category: "kids",
    price: 1280,
    originalPrice: 1600,
    image: "assets/images/kids_rainboots.png",
    description: "下雨天踩水坑的最佳玩伴！亮黃色經典俏皮小鴨雨鞋，採用環保食品級無毒 PVC 材質，一體成型絕對防水。鞋內備有親膚吸汗純棉內裡，搭配後跟反光安全條，確保陰雨天與夜間的行走安全，讓雨天也充滿歡笑。",
    features: [
      "100% 食品級環保 PVC 材質，無異味、無塑化劑，呵護寶貝肌膚",
      "一體射出成型結構，絕不漏水，內層貼合吸汗棉布防黏腳",
      "超深防滑排水刻紋鞋底，在濕滑路面上行走防摔倒",
      "後跟安全 3M 反光防護貼片，保障雨天及夜間出行安全"
    ],
    sizes: [26, 28, 30, 32, 34],
    colors: ["俏皮小鴨黃", "恐龍冒險綠", "粉紅泡泡豬"],
    rating: 4.9,
    reviews: [
      { author: "佩佩媽", rating: 5, date: "2026-05-25", comment: "超級可愛！黃色很顯眼，下雨天穿出門很安全。材質沒有刺鼻的塑膠味，柔軟度也夠，小孩穿著走路很順。" },
      { author: "張先生", rating: 5, date: "2026-06-11", comment: "抓地力超強，小孩子穿著在積水廣場上跑也沒滑倒，裡面套上雨衣非常合適。" }
    ]
  },
  {
    id: "kids-velcro",
    name: "探索學院復古魔鬼氈兒童鞋 (Retro Academy Velcro Sneaker)",
    category: "kids",
    price: 1680,
    originalPrice: 1980,
    image: "assets/images/kids_velcro.png",
    description: "融合復古運動風與現代機能的學院風板鞋。高級耐磨超纖皮革鞋面，耐髒且極易擦拭整理。雙魔鬼氈快開設計，配合加固後跟杯，能牢牢鎖定孩子足跟，有效防止走路內八或外八，是孩子上學與日常休閒的絕佳鞋款。",
    features: [
      "優質超纖耐磨皮革，不易起皮破損，髒污用濕布擦拭即可乾淨",
      "後跟硬質 U 型加固穩定杯，支撐腳踝，培養正確行走體態",
      "可拆卸防菌防臭乳膠鞋墊，支撐足弓，排汗透氣",
      "耐磨橡膠包邊大底，經典復古板鞋輪廓，防滑耐磨"
    ],
    sizes: [28, 29, 30, 31, 32, 33, 34],
    colors: ["復古經典藍", "簡約象牙白", "活力珊瑚粉"],
    rating: 4.6,
    reviews: [
      { author: "小杰媽媽", rating: 4, date: "2026-05-14", comment: "鞋子很好清洗，白色帶點藍色很清爽。後跟摸起來滿扎實的，可以支撐小孩子的腳踝，穿去上小學很適合。" },
      { author: "李女士", rating: 5, date: "2026-05-29", comment: "版型很好看，百搭。魔鬼氈非常緊，不會容易脫落。包裝也很精緻。" }
    ]
  },

  // --- 鞋類維護系列 (Shoe Care) ---
  {
    id: "care-waterproof",
    name: "御盾奈米超感防水防污噴霧 (Nano Shield Waterproof Spray)",
    category: "care",
    price: 490,
    originalPrice: 600,
    image: "assets/images/care_waterproof.png",
    description: "StrideElite 實驗室研發的頂級防水護理劑。採用最新奈米級氟素撥水技術，噴灑後在鞋子表面形成一層肉眼不可見的隱形防護網。強效阻絕水珠、污漬、醬油及沙拉油的侵入，同時 100% 保持鞋子原本的透氣性。",
    features: [
      "奈米級強效撥水、防污、防油，有效維持長達 30-45 天的防護",
      "不改變皮革、編織網眼、麂皮、帆布等材質的顏色、質感與透氣性",
      "無刺鼻味環保配方，室內噴灑更安心，快速乾燥只需 15 分鐘",
      "適用於所有鞋類、包包及衣物，全面防禦生活髒污"
    ],
    sizes: ["250ml"],
    colors: ["透明防護"],
    rating: 4.9,
    reviews: [
      { author: "鞋頭大心", rating: 5, date: "2026-05-09", comment: "神級防水噴霧！我的麂皮鞋子噴了這個之後，水潑上去直接變成水珠滾落，髒水完全吸不進去，下雨天必備！" },
      { author: "阿吉", rating: 4, date: "2026-05-22", comment: "效果非常好，而且確實沒有其他牌子那麼刺鼻的味道。出門前噴一下，很快就乾了。" }
    ]
  },
  {
    id: "care-cream",
    name: "煥彩蜂蠟天然皮革滋養霜 (Premium Natural Leather Cream)",
    category: "care",
    price: 390,
    originalPrice: 480,
    image: "assets/images/care_cream.png",
    description: "純天然成分調配的奢華皮革護理膏。以頂級天然蜂蠟、巴西棕櫚蠟與有機荷荷巴油為基底，深入皮革纖維進行深層滋養，防止皮革乾裂褪色，恢復亮麗的自然皮革光澤。適用於牛皮、羊皮等光滑皮革製品。",
    features: [
      "100% 天然溫和配方，不含化學溶劑，不傷皮革不傷手",
      "深層滋潤皮革纖維，長效防霉防乾裂，延長皮革壽命 2 倍以上",
      "附贈高密度純棉擦拭布，上霜均勻，使用簡單",
      "輕微防水防塵效果，在皮革表面形成保護亮光層"
    ],
    sizes: ["80g"],
    colors: ["無色通用型"],
    rating: 4.8,
    reviews: [
      { author: "紳士生活", rating: 5, date: "2026-04-30", comment: "買來保養我的雕花牛津鞋，擦完之後皮革重新變得油亮水潤，細微的刮痕都被修復了，味道是淡淡的天然香味，非常舒服。" },
      { author: "陳太太", rating: 4, date: "2026-05-16", comment: "家裡的皮包和皮鞋都拿來擦了一遍，滋潤效果很好。注意麂皮和磨砂皮不能用喔。" }
    ]
  },
  {
    id: "care-brush",
    name: "大師級雙面極致清潔馬毛刷 (Master Dual-Sided Shoe Brush)",
    category: "care",
    price: 350,
    originalPrice: 450,
    image: "assets/images/care_brush.png",
    description: "清潔與拋光二合一的大師級鞋刷。選用進口柔軟天然馬毛與強韌豬鬃毛雙面設計：馬毛面柔軟綿密，適合清潔麂皮、飛織及高級皮革上的浮塵；豬鬃面強韌有彈力，適合刷洗鞋底頑固泥沙，木柄選用人體工學山毛櫸，握感極佳。",
    features: [
      "雙面不同軟硬度毛刷設計，一支滿足除塵、刷洗與拋光三大需求",
      "優選 100% 天然馬毛與天然豬鬃，不傷鞋面，除塵拋光效果顯著",
      "德國進口山毛櫸木柄，打磨圓潤，抗潮防裂，握感舒適省力",
      "精密植毛工藝，牢固不易掉毛，堅固耐用多年"
    ],
    sizes: ["標準型"],
    colors: ["天然木色"],
    rating: 4.7,
    reviews: [
      { author: "球鞋保養達人", rating: 5, date: "2026-05-11", comment: "刷毛很扎實，馬毛那一面用來給皮鞋拋光或者刷麂皮上的灰塵非常好用，木柄的弧度握起來很舒服，推薦入手。" },
      { author: "小劉", rating: 4, date: "2026-06-02", comment: "清潔力很夠，雙面設計很方便，不用再準備兩把刷子。剛開始用會有一兩根掉毛，之後就正常了。" }
    ]
  },

  // --- 配件系列 (Accessories) ---
  {
    id: "acc-insoles",
    name: "步態平衡人體工學減壓鞋墊 (Bio-Balance Arch Insoles)",
    category: "accessories",
    price: 580,
    originalPrice: 750,
    image: "assets/images/acc_insoles.png",
    description: "專為矯正步態與緩解足底壓力研發的機能鞋墊。採用高密度記憶泡棉與立體足弓 3D 支撐片，將足底重力均勻分散，減少足底筋膜拉扯。後跟內嵌 Poron 緩震果凍膠墊，吸收行走與跑步時 90% 的衝擊力，重塑行走舒適度。",
    features: [
      "人體工學 3D 足弓支撐片，穩定足踝，改善扁平足/高足弓引起的不適",
      "後跟軍工級 Poron 避震膠墊，吸收落地衝擊力，保護膝蓋與關節",
      "表面覆蓋 Coolmax 吸濕排汗抑菌布料，防熱防異味，腳感乾爽",
      "前掌設有防滑顆粒與裁剪引導線，可依自身鞋碼自由裁剪"
    ],
    sizes: ["S (35-39)", "M (40-43)", "L (44-47)"],
    colors: ["科技灰藍"],
    rating: 4.9,
    reviews: [
      { author: "久站上班族", rating: 5, date: "2026-05-24", comment: "我的工作需要每天站 8 小時，換上這款鞋墊之後，腳底板痛的毛病真的改善了超級多！足弓的地方支撐得非常舒服。" },
      { author: "王跑步", rating: 5, date: "2026-06-08", comment: "放入運動鞋後避震感明顯提升，後跟很穩，裁剪也很方便，對照原來的鞋墊剪一下塞進去就可以了。" }
    ]
  },
  {
    id: "acc-shoelaces",
    name: "引力免繫時尚反光彈力鞋帶 (Gravity Tie-Free Laces)",
    category: "accessories",
    price: 220,
    originalPrice: 300,
    image: "assets/images/acc_shoelaces.png",
    description: "徹底解放雙手的免繫彈力鞋帶。選用高彈力馬來西亞天然橡膠內芯，外層編織高亮 3M 反光絲，安全且具時尚感。搭配堅固的按壓式合金金屬膠囊鎖扣，一次調整，終身免繫，運動時絕不鬆脫，是跑者與兒童的最佳幫手。",
    features: [
      "高彈性拉伸結構，壓力均勻分布，腳背無壓迫感，運動更舒適",
      "按壓式合金金屬旋鈕鎖扣，簡約高級，安裝一次即可免除繫鞋帶煩惱",
      "雙線 3M 反光絲編織，夜間慢跑反光警示，極大提升夜間安全係數",
      "多款潮流配色，輕鬆為您的愛鞋更換風格"
    ],
    sizes: ["100cm (通用)"],
    colors: ["熒光霓虹", "極致簡約黑", "亮眼雪地白", "深邃藏青藍"],
    rating: 4.8,
    reviews: [
      { author: "夜跑狂熱", rating: 5, date: "2026-05-04", comment: "免繫鞋帶簡直是偉大的發明！跑步中途再也不用停下來綁鞋帶了，而且反光效果在晚上很亮，跑步安全感倍增。" },
      { author: "小雅", rating: 4, date: "2026-05-19", comment: "幫女兒的球鞋換了這個，上學穿脫超方便，再也不用擔心她被鬆掉的鞋帶絆倒了，金屬鎖扣看起來很有質感。" }
    ]
  },
  {
    id: "acc-shoehorn",
    name: "尊榮典藏手工藝長柄山毛櫸鞋拔 (Noble Beech Wood Shoehorn)",
    category: "accessories",
    price: 450,
    originalPrice: 600,
    image: "assets/images/acc_shoehorn.png",
    description: "展現優雅生活細節的手工木雕鞋拔。精選一整塊德國進口山毛櫸木，經數十道打磨工序精雕細琢而成。符合人體工學的流暢彎曲弧度，極致貼合腳後跟。尾端搭配高級植鞣皮革掛繩與黃銅掛環，不只是實用工具，更是玄關的藝術品。",
    features: [
      "精選天然德國山毛櫸，木紋細膩雅緻，手感溫潤如玉，長度達 55 公分",
      "符合腳跟弧度的人體工學設計，極致滑順，保護鞋後跟不塌陷變形",
      "免彎腰長柄設計，極為方便老人、孕婦及穿戴緊實皮鞋的紳士使用",
      "尾部配備義大利植鞣皮革提繩與經典黃銅扣，懸掛收納極美觀"
    ],
    sizes: ["55cm (長柄)"],
    colors: ["復古黃檀木色", "自然原木色"],
    rating: 4.7,
    reviews: [
      { author: "老張", rating: 5, date: "2026-05-17", comment: "送給老爸的，他腰不好，這款 55cm 長度讓他不用彎腰就能輕鬆穿上皮鞋，直誇木頭打磨得光滑極了，質感超棒。" },
      { author: "居家美學", rating: 4, date: "2026-05-23", comment: "掛在玄關非常好看，皮繩和黃銅的細節很高級。用它穿皮鞋確實比以前用塑料的小鞋拔滑順多了。" }
    ]
  }
];
