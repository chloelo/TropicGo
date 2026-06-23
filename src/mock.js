const mockUsers = {
  'test@gmail.com': '123456',
};

const categoryMapping = {
  asia: '亞洲',
  america: '美洲',
  africa: '非洲',
  oceania: '大洋洲',
};

const mockDatabase = {
  carts: JSON.parse(localStorage.getItem('mock_cart')) || [],
  products: [
    {
      id: 'asia_001',
      title: '峇里島奢華烏布 Villa 與火山健行 5 日遊',
      category: 'asia',
      origin_price: 35000,
      price: 29900,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【行程特色】體驗南洋極致奢華與大自然的鬼斧神工</h3><p>本次奢華深度遊將帶您遠離塵囂，深入峇里島的心臟地帶——烏布。我們特別安排入住全新落成的叢林隱密泳池別墅（Private Pool Villa），讓您在早晨的鳥鳴與芬多精中醒來。</p><h4>精選亮點一：聖泉寺與德格拉朗梯田漫步</h4><p>清晨前往聖泉寺體驗當地的淨化儀式，隨後安排在絕美梯田景觀餐廳享用印尼風味髒鴨餐，午後在網美大鞦韆上留下難忘的身影。</p><h4>精選亮點二：巴杜爾火山日出震撼健行</h4><p>由專業嚮導帶領，在滿天星斗下出發，登上巴杜爾火山頂端迎接破曉。當第一道曙光照亮阿貢火山與火山湖時，那份感動將讓您終生難忘。下山後直接前往火山溫泉泡湯，徹底放鬆肌肉。</p><h4>頂級美饌與極致 SPA</h4><p>尊享 120 分鐘皇家熱石療癒 SPA，並於金巴蘭海灘一邊欣賞夕陽一邊享用現烤龍蝦海鮮奢華晚宴，為您的渡假時光畫下完美的句點。</p>',
      content: '費用包含：桃園直飛峇里島經濟艙來回機票、獨棟叢林泳池別墅住宿四晚、巴杜爾火山專業嚮導、行程表列所有門票、金巴蘭龍蝦晚餐及 2 小時皇家熱石 SPA。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '桃園',
      },
    },
    {
      id: 'america_001',
      title: '墨西哥猶加敦半島 - 奇琴伊察馬雅遺跡與祕境地底河探險',
      category: 'america',
      origin_price: 68000,
      price: 59000,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1580934738416-ad531f2920f7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【古文明遺產】穿越時光隧道的馬雅與加勒比海交響曲</h3><p>一趟完美結合神秘古文明歷史與大自然造景的極限探索之旅。我們將從坎昆出發，深入猶加敦半島的核心，親眼見證傳奇的歷史軌跡。</p><h4>世界新七大奇景：奇琴伊察 Chichen Itza</h4><p>由專業文史導覽員帶領，解開羽蛇神金字塔、千柱群以及古代球場背後的馬雅星象曆法密碼。特別安排在清晨首批入園，避開暴曬與擁擠觀光人潮。</p><h4>神聖幽冥之眼：Cenote 地底下水洞浮潛</h4><p>造訪馬雅人眼中通往神界的天坑。當正午的陽光穿透地表洞口，直射入清澈見底的藍色地下湖時，會形成如夢似幻的光束。您將換上專業防寒衣與浮潛裝備，在成群的熱帶淡水魚群中悠游。</p<h4>粉紅湖與野生紅鸛生態保育區</h4><p>前往 IG 爆紅的 Las Coloradas 粉紅湖，見證高鹽度與藻類交織出的天然夢幻粉紅色澤，並搭乘快艇深入紅樹林尋找成千上萬隻的野生粉紅火烈鳥。</p>',
      content: '費用包含：各航段接駁巴士、世界遺產奇琴伊察門票與專屬英語導覽、三大地底河天坑入場費與救生裝備、粉紅湖生態快艇行程、每日特色墨式塔可與莊園料理。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '台北',
      },
    },
    {
      id: 'africa_001',
      title: '肯亞馬賽馬拉 - 熱帶草原獵遊與豪華帳篷體驗 6 日',
      category: 'africa',
      origin_price: 85000,
      price: 78000,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1523805081346-ef96128b7819?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【野性大冒險】東非大草原上的狂放生命力</h3><p>準備好迎接人生中最具震撼力的自然洗禮。馬賽馬拉國家保護區擁有地球上最密集的野生動物生態，您將近距離目睹野生動物最真實的生存日常。</p><h4>四驅升降頂獵遊車（Game Drive）</h4><p>全程安排六人座專業 4x4 獵遊車，保證每位旅客都擁有獨立靠窗的絕佳視野。在經驗豐富的動物追蹤師帶領下，尋找非洲五霸：獅子、豹、大象、犀牛及水牛的蹤跡。</p><h4>百萬天際線：草原頂級豪華帳篷酒店</h4><p>誰說看動物一定要過得艱苦？入住五星級奢華帳篷營地，房間內配有獨立衛浴、歐式浴缸及私人觀景露台。夜晚伴隨遠處的獅吼入睡，清晨在草原的日出地平線前享用英式香檳早餐。</p<h4>馬賽人原始村落深度拜訪</h4><p>親自走進馬賽族的紅土村落，欣賞他們著名的原地高跳躍舞蹈，了解這個至今仍與猛獸共存、維持數百年傳統獵人生活的神秘遊牧民族。</p>',
      content: '費用包含：全程專業開頂式獵遊四驅車、馬賽馬拉國家保護區全額門票費、五星帳篷渡假村住宿、每日三餐法式全餐或野餐便當、馬賽村落探訪入門費、隨車礦泉水無限供應。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '桃園',
      },
    },
    {
      id: 'oceania_001',
      title: '凱恩斯大堡礁 - 頂級雙體船出海與熱帶雨林高空纜車',
      category: 'oceania',
      origin_price: 42000,
      price: 36500,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1468413253725-0d5181030457?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【海陸雙棲】世界自然遺產雙重奇奏</h3><p>全方位暢遊澳洲昆士蘭。一天深入內陸探訪億萬年古老雨林，一天航向湛藍太平洋擁抱世界上最大的活珊瑚礁群，體驗海陸交織的極致饗宴。</p><h4>豪華雙體船：探索外堡礁極致秘境</h4><p>搭乘現代化的大型高科技雙體豪華遊艇前往外堡礁平台。避開近海遭到破壞的區域，這裡能見度高達 30 公尺。行程包含獨家水底觀景窗、玻璃底船巡航，並提供全套浮潛設備及專業教練指導指導，不會游泳也能輕鬆看見小丑魚、綠蠵龜與巨大硨磲貝。</p<h4>庫蘭達古老雨林與 Skyrail 熱帶雨林纜車</h4><p>搭乘全長 7.5 公里的空中纜車，在世界上最古老的熱帶雨林樹冠層上方滑行。中途可在雨林步道下車聆聽生態導覽。回程安排搭乘百年復古庫蘭達觀光火車，穿梭在懸崖峭壁與壯麗瀑布群之間。</p>',
      content: '費用包含：外堡礁豪華雙體船一日船票、大堡礁海洋公園環保稅、精緻海鮮自助午餐、Skyrail 高空纜車單程票、庫蘭達百年復古觀光火車票、凱恩斯市區飯店專車來回接送。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '高雄',
      },
    },
    {
      id: 'asia_002',
      title: '泰國普吉島攀牙灣 - 雙人獨木舟與跳島秘境 4 日遊',
      category: 'asia',
      origin_price: 26000,
      price: 21500,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1539367618428-f50f635c5748?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【海上桂林】漫遊攀牙灣翡翠海域</h3><p>一趟專為熱愛水上活動與秘境探險的您設計的精緻旅程。攀牙灣以其高聳入雲的石灰岩奇峰、星羅棋布的島嶼以及神祕的鐘乳石海洞聞名於世。</p<h4>雙人巡航獨木舟：穿梭鐘乳石秘境天坑</h4><p>由專業船伕操槳，帶領您乘坐雙人橡皮獨木舟，緩緩划進因地質侵蝕形成的狹窄海洞。穿過漆黑的隧道後，眼前將豁然開朗，展現出隱密於巨岩之中的奇幻熱帶潟湖天坑。</p<h4>經典地標：詹姆士龐德島（007島）</h4><p>親眼目睹電影《金槍人》中經典的名勝——大白菜石。我們特別挑選非尖峰時段登島，讓您能拍下空景，留下最完美的渡假紀念。</p<h4>PP島快艇極速跳島與絕美瑪雅灣</h4><p>搭乘三引擎豪華快艇，狂飆前往PP島。在好萊塢電影《海灘》的拍攝地瑪雅灣（Maya Bay）細白如麵粉的沙灘上踩水，並在澄澈如水晶的浮潛點與成千上萬隻斑馬蝶魚共游。</p>',
      content: '費用包含：普吉島精品設計酒店住宿、大船與豪華快艇雙體驗、獨木舟專人操作費、攀牙灣國家公園所有登島稅、隨船泰式經典海鮮Buffet午餐、全程安全防護救生衣。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '桃園',
      },
    },
    {
      id: 'america_002',
      title: '古巴哈瓦那 - 復古老爺車巡禮與加勒比海微醺 6 日遊',
      category: 'america',
      origin_price: 82000,
      price: 73000,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1564198879220-63f2741f7e23?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1605334460593-3b1a8d009fa5?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1572244243175-92794eb8ef86?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【時光倒流】造訪色彩斑斕的加勒比海珍珠</h3><p>走進沒有連鎖速食店、沒有大型廣告看板的時空。古巴哈瓦那，一個將 1950 年代的風華完美凍結的城市。跟著音樂與雪茄的香氣，體驗一場極具文藝氣息的享樂之旅。</p<h4>開篷老爺車：炫彩巡禮長堤大道</h4><p>精心挑選保養完美的粉色、天藍色經典雪佛蘭古董開篷車，展開 2 小時的尊榮市區導覽。從革命廣場一路奔馳到濱海長堤（Malecón），迎著加勒比海的海風，留下最張揚帥氣的照片。</p<h4>尋找海明威：小酒館的微醺探尋</h4><p>追隨文學大師海明威的足跡。前往「五分錢小酒館」（La Bodeguita del Medio）品嚐最正宗的 Mojito 摩希多調酒，再到「小佛羅里達酒吧」（El Floridita）啜飲大明威最愛的 Daiquiri 黛綺莉。行程更包含前往海明威在古巴居住長達20年的瞭望山莊古居。</p<h4>雲尼斯山谷：傳統手工雪茄莊園深度探訪</h4><p>深入被聯合國列為世界遺產的雲尼斯山谷（Viñales Valley），造訪傳統菸草農場。親眼觀看花農如何手工捲製世界上最頂級的古巴雪茄，並在農莊內品嚐現磨的古巴有機咖啡。</p>',
      content: '費用包含：哈瓦那舊城區精選特色民宿、經典開篷老爺車包車導覽費用、海明威故居入門票、兩大歷史酒館經典調酒各一杯、雪茄農莊導覽與體驗、每日古巴道地傳統早餐。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '台北',
      },
    },
    {
      id: 'africa_002',
      title: '模里西斯 - 印度洋上的熱帶天堂與野生動物漫步 5 日遊',
      category: 'africa',
      origin_price: 74000,
      price: 66000,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【天神遺落的明珠】上帝先創造了模里西斯，再照樣創造了天堂</h3><p>大文豪馬克吐溫讚譽不絕的渡假海島。模里西斯不僅擁有全亞洲最純淨奢華的沙灘，更將非洲的原野狂放與法式的優雅浪漫交織在一起，帶給您截然不同的高質感度假生活。</p<h4>卡塞拉冒險樂園：與野生萬獸之王獅子漫步</h4><p>一輩子必須嘗試一次的驚險體驗！在專業安全隨護的指引下，您將徒步走進叢林，近距離撫摸並伴隨威風凜凜的成年獅子一同散步、拍照，體驗逆駕原野的震撼感受。</p<h4>大自然的調色盤：夏馬爾七色土與壯麗瀑布</h4><p>探訪因火山熔岩冷卻速度不一而形成的奇幻地理景觀。地表在陽光折射下呈現紅、紫、藍、綠等七彩漸層色澤。隨後前往參觀高達百公尺的夏馬爾斷崖瀑布。</p<h4>雙體船黑河巡航：與野生飛旋海豚在大海共游</h4><p>清晨搭乘寬敞的雙體帆船出海，航行於波光粼粼的黑河灣。當成群的野生飛旋海豚躍出水面時，您可以換上輕裝，在教練引導下輕緩游入大海，近距離欣賞海豚在身邊優雅穿梭的英姿。</p>',
      content: '費用包含：五星級海濱度假村住宿（含早晚餐）、卡塞拉鳥園入場券及專屬「與獅漫步」活動費用、雙體帆船出海一日遊（含船上現烤BBQ與無限暢飲酒水）、七色土景區門票費。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '桃園',
      },
    },
    {
      id: 'oceania_002',
      title: '斐濟楠迪 - Bula 天堂外島放空與沉澱泥漿溫泉 5 日遊',
      category: 'oceania',
      origin_price: 58000,
      price: 49800,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1545562083-a600704fa487?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【純淨南太平洋】在世界上第一道曙光照耀的地方放空</h3><p>一踏上斐濟，耳邊就會傳來熱情的「Bula!」歡迎聲。這裡擁有世界上最純淨的藍天與海水，連空氣都瀰漫著香草的氣息。跟著斐濟時間（Fiji Time）慢活，徹底洗滌都市帶來的疲憊。</p<h4>南海島（South Sea Island）極致跳島一日放空</h4><p>搭乘高速雙體船前往被無瑕珊瑚礁包圍的無人外島。整座海島細白無瑕，您可以免費使用島上的獨木舟、站立式劃槳（SUP）、或搭乘半潛艇觀賞珊瑚。島上更無限量供應現烤BBQ、斐濟啤酒與各類軟性飲料。</p<h4>Sabeto 火山泥漿溫泉療癒體驗</h4><p>造訪斐濟最著名的天然地熱泉。將富含大量礦物質的天然火山泥均勻塗抹全身，待其在陽光下自然風乾後，再跳入天然溫泉池中洗淨。這道傳統的身體療程具有神奇的亮白、軟化角質功效，能讓肌膚重回嬰兒般的光滑。</p<h4>卡瓦（Kava）歡迎儀式與傳統聖火舞之夜</h4><p>夜幕低垂，加入度假村內莊嚴的傳統迎賓儀式，品嚐由胡椒科植物根部製成的神奇飲品卡瓦（Kava）。隨後在海灘前欣賞由健壯斐濟勇士帶來的驚險聖火舞蹈與傳統地灶大餐（Lovo）。</p>',
      content: '費用包含：南太平洋主島精品度假村住宿、南海島外島全日票（含島上水上活動工具借用及現烤BBQ、酒水無限暢飲）、天然地熱泥漿溫泉入場費與專人接待、斐濟傳統大餐。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '桃園',
      },
    },
    {
      id: 'asia_003',
      title: '菲律賓巴拉望 - 科隆島沉船浮尋與純淨鏡湖一日秘境',
      category: 'asia',
      origin_price: 31000,
      price: 26800,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【最後的處女地】探索世界級的頂級海底花園</h3><p>巴拉望科隆島曾被寂寞星球評為最美麗的島嶼。這裡擁有世界上保存最完好的二次大戰沉船遺跡，以及被巨大石灰岩陡峭高聳包圍的遺世淡水湖泊，是熱愛潛水者的終極天堂。</p<h4>世界奇觀：凱央根湖（Kayangan Lake）亞洲最鏡湖</h4><p>攀登 150 階拾級而上的山道，抵達明信片經典拍攝點俯瞰科隆灣。隨後下到另一側，走進被譽為亞洲最乾淨的淡水湖。湖水透明度直達水下 20 米，奇特的水下石灰岩石筍景觀有如魔戒場景，您可以躍入其中體驗永生難忘的清涼漂浮。</p<h4>二次大戰沉船遺跡：盧松砲艦（Luson Shipwreck）浮尋</h4><p>不需要有深潛執照，這艘戰艦沉沒的位置距離水面僅漸只有 1 到 3 公尺。只要戴上浮尋面鏡往下看，歷史斑駁的巨大鐵殼、滿佈其上的瑰麗彩色硬珊瑚與成群的珊瑚魚立刻近在眼前，帶來極度震撼的感官衝擊。</p<h4>珊瑚花園（Coral Garden）極致軟珊瑚林</h4><p>科隆島保護最完善的珊瑚礁群。這裡擁有連綿數百公尺、數十種不同品種的硬珊瑚與五彩斑斕的軟珊瑚，隨著海流輕緩搖曳，猶如一座海底的水中熱帶植物園。</p>',
      content: '費用包含：科隆島海景飯店住宿、私人螃蟹船包船出海跳島、凱央根湖登島稅、全套高規格浮尋裝備租借、隨船隨行專業救生員與嚮導、無人島現烤海鮮燒烤Buffet午餐。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '桃園',
      },
    },
    {
      id: 'america_003',
      title: '巴西里約熱內盧 - 基督山俯瞰科帕卡巴納熱帶海灘 5 日',
      category: 'america',
      origin_price: 89000,
      price: 79900,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1596751221703-9d4608c2a4cc?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【上帝之城】南美森巴熱情與上帝視角的壯麗奇觀</h3><p>一趟帶您走進熱情如火、風景如畫的巴西里約熱內盧。這裡將巨幅奇岩、浩瀚大西洋與繁華的城市街道融合一體，展現出令人窒息的視覺張力。</p<h4>世界新七大奇蹟：基督山守護之巔</h4><p>搭乘復古的齒軌火車，穿過蒂茹卡熱帶雨林，登上 710 公尺高的基督山山頂。親自站在三十公尺高的巨大救世基督像之下，展開雙臂，俯瞰整個瓜納巴拉灣以及里約全市360度的震撼全景。</p<h4>麵包山雙段高空纜車與經典落日</h4><p>搭乘全透明的高空纜車分為兩段登上矗立於海邊的糖麵包山（Sugarloaf Mountain）。特別安排在傍晚時分登頂，看著夕陽將整條科帕卡巴納海灘的海岸線染成一片金黃，隨後看著城市霓虹燈初上，感受南美最奢華的浪漫夜色。</p<h4>里約嘉年華發源地：塞勒隆階梯與森巴深度體驗</h4><p>親自走訪由藝術家塞勒隆利用來自全世界60多個國家的彩色瓷磚鋪設而成的網美塗鴉階梯。晚上特別安排前往知名的老牌森巴音樂俱樂部，一邊享用巴西著名的窯烤窯烤牛肉（Churrasco），一邊欣賞高水準的森巴舞孃舞台表演。</p>',
      content: '費用包含：里約熱內盧海景飯店、基督山環保齒軌小火車票、糖麵包山來回高空纜車門票、巴西道地窯烤餐廳頂級全餐（含精彩森巴晚宴表演入門票）、全程專業中英雙語地陪導覽。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '台北',
      },
    },
    {
      id: 'africa_003',
      title: '馬達加斯加 - 穆隆達瓦猴麵包樹大道與神祕雨林探秘',
      category: 'africa',
      origin_price: 92000,
      price: 84500,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【奇幻異世界】造訪孤立於印度洋上的生態諾亞方舟</h3><p>馬達加斯加擁有世界上高達 90% 以上絕無僅有的特有種生物。這裡的地質奇觀與奇特植被，會讓您誤以為自己降落在另一個星球。</p<h4>一生必看絕景：穆隆達瓦猴麵包樹大道日落</h4><p>親自來到明信片上的夢幻景點。數十棵樹齡超過千年的巨大猴麵包樹高聳挺立於紅土大道兩旁。當夕陽將天空染成一片紫紅色，這些巨大樹木的剪影交織在晚霞中，那份神祕孤寂的荒野美感將讓您深受震撼。</p<h4>奇靈地（Kirindy）保護區：夜間探秘野生狐猴</h4><p>由專業國家保護區嚮導帶領，配備手電筒進行刺激的夜間叢林徒步健行。尋找世界上最小的靈長類動物——侏儒狐猴，以及馬達加斯加特有的頂級掠食者馬島長尾狸貓（Fossa）。</p<h4>安達西貝國家公園：聆聽大狐猴的叢林高歌</h4><p>深入煙霧繚繞的熱帶雨林，探尋體型最大的狐猴——大狐猴（Indri）。牠們沒有尾巴，卻擁有驚人的彈跳力，清晨牠們會在樹冠層發出如同鯨魚般空靈悠揚的鳴叫聲，迴盪在整座山谷之中。</p>',
      content: '費用包含：馬達加斯加內陸段航線機票、全程專業 4WD 越野車包車含經驗豐富司機、各大國家公園與生態保護區所有入門票與本地專屬生態嚮導費、荒野精品叢林Resort住宿。',
      unit: '人',
      options: {
        popular: false,
        departureCity: '桃園',
      },
    },
    {
      id: 'oceania_003',
      title: '大溪地波拉波拉 - 水上別墅尊榮享受與鯊魚魔鬼魚共游',
      category: 'oceania',
      origin_price: 145000,
      price: 129000,
      enabled: true,
      imageUrl: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
      ],
      description: '<h3>【終極奢華渡假】海島之王，太平洋上無可比擬的夢幻玻璃海</h3><p>波拉波拉島（Bora Bora）被譽為最接近天堂的地方。由大自然親手調配出漸層的藍綠色巨型潟湖，環繞著雄偉的奧特馬努火山，構成全地球最頂級、最尊榮的蜜月渡假首選。</p<h4>夢幻逸品：入住五星級奢華水上別墅（Overwater Villa）</h4><p>連續四晚入住國際頂級連鎖度假村的水上別墅。房間地板採用透明玻璃設計，在室內就能看見熱帶魚穿梭。您可以從私人甲板直接躍入溫暖如湯的潟湖中，或在清晨享受由傳統大溪地獨木舟將早餐親自送到別墅露台的尊榮服務。</p<h4>四驅船外機快艇出海：近距離與黑鰭鯊、魟魚同游</h4><p>航向水質剔透的潟湖中央，在專業嚮導帶領下潛入水中。生性溫馴的黑鰭鯊與巨大的魔鬼魚（魟魚）將圍繞在您的身邊。您可以輕輕撫摸如絲綢般滑嫩的魟魚，體驗與海洋巨獸共處的神奇時刻。</p<h4>無人島大溪地傳統宴席與夕陽帆船</h4><p>中午登上專屬私人私密外灘無人島，享用利用香蕉葉與熱石悶烤而成的道地大溪地燒烤饗宴。傍晚搭乘雙體風帆船巡航，一邊暢飲頂級香檳，一邊看著落日將奧特馬努火山染成金紫色。</p>',
      content: '費用包含：大溪地主島至波拉波拉島來回雙螺旋槳飛機接駁、頂級五星水上別墅四晚住宿、獨木舟送早餐體驗一次、潟湖鯊魚魔鬼魚共游行程、無人島奢華BBQ午餐、黃昏香檳帆船巡航。',
      unit: '人',
      options: {
        popular: true,
        departureCity: '桃園',
      },
    },
  ],
  coupons: [
    {
      id: 'coupon_001',
      title: '限時折扣',
      code: 'tropicgo90',
      percent: 90,
      enabled: true,
      deadline: { datetime: '2026-12-31 23:59:59' },
    },
  ],
  orders: [],
};

function updateCartStorage() {
  localStorage.setItem('mock_cart', JSON.stringify(mockDatabase.carts));
}

const mockRoutes = {
  GET: {
    'ec/products': (url) => {
      let filteredProducts = [...mockDatabase.products];
      const urlObj = new URL(url, 'http://localhost');
      const categoryParam = urlObj.searchParams.get('category');

      if (categoryParam) {
        const targetQuery = categoryParam.toLowerCase();
        filteredProducts = filteredProducts.filter((p) => {
          const matchedZh = categoryMapping[targetQuery];
          return p.category === targetQuery || p.category === matchedZh;
        });
      }

      return {
        data: filteredProducts,
        meta: {
          pagination: {
            total: filteredProducts.length,
            count: filteredProducts.length,
            per_page: 12,
            current_page: 1,
            total_pages: 1,
            links: {},
          },
        },
      };
    },
    'ec/product/': (url) => {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const product = mockDatabase.products.find((p) => p.id === id);
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
      }
      return { data: product };
    },
    'ec/shopping': () => ({
      success: true,
      data: mockDatabase.carts,
    }),
    'ec/orders/': (url) => {
      const id = url.split('/').pop();
      const order = mockDatabase.orders.find((o) => o.id === id);
      if (order) return { success: true, data: order };
      throw new Error('訂單不存在');
    },
  },
  POST: {
    'auth/login': (url, data) => {
      const { email, password } = data;
      if (mockUsers[email] && mockUsers[email] === password) {
        return {
          success: true,
          token: 'mocked-jwt-token-xyz123456',
          expired: Math.floor(Date.now() / 1000) + 86400,
        };
      }
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    },
    'auth/check': () => ({
      success: true,
      message: 'success',
    }),
    'ec/shopping': (url, data) => {
      const { product: incomingProduct, quantity } = data;
      const qty = Number(quantity) || 1;

      const targetId = typeof incomingProduct === 'string' ? incomingProduct : incomingProduct.id;
      const fullProduct = mockDatabase.products.find((p) => p.id === targetId);

      if (!fullProduct) {
        const error = new Error('找不到該產品，無法加入購物車');
        error.status = 400;
        throw error;
      }

      const existItem = mockDatabase.carts.find((item) => item.product.id === targetId);

      if (existItem) {
        existItem.quantity += qty;
      } else {
        mockDatabase.carts.push({
          product: {
            id: fullProduct.id,
            title: fullProduct.title,
            price: fullProduct.price,
            imageUrl: fullProduct.imageUrl,
            unit: fullProduct.unit,
          },
          quantity: qty,
        });
      }

      updateCartStorage();

      return {
        success: true,
        message: '已成功加入購物車！',
      };
    },
    'ec/coupon/search': (url, data) => {
      const { code } = data;
      const coupon = mockDatabase.coupons.find((c) => c.code === code);

      if (coupon && coupon.enabled) {
        return {
          success: true,
          data: coupon,
        };
      }

      // 模擬找不到或過期的情況
      const error = new Error('折扣碼無效');
      error.status = 404;
      throw error;
    },
    'ec/orders/paying': (url) => {
      const parts = url.split('/');
      const id = parts[parts.length - 2];
      const order = mockDatabase.orders.find((o) => o.id === id);
      if (!order) throw new Error('訂單不存在');

      order.paid = true;

      // 這裡多包一層 data，為了讓前端的 res.data.data 存在
      return { data: { paid: true } };
    },
    'ec/orders': (url, data) => {
      const newOrder = {
        id: new Date().getTime().toString(),
        user: data,
        amount: mockDatabase.carts.reduce((acc, cur) => acc + (cur.product.price * cur.quantity), 0),
        paid: false,
        products: mockDatabase.carts,
      };
      mockDatabase.orders.push(newOrder);
      // 給 createOrder 前端檢查用
      return { data: newOrder };
    },
  },
  PATCH: {
    'ec/shopping': (url, data) => {
      const { product: productId, quantity } = data;
      const existItem = mockDatabase.carts.find((item) => item.product.id === productId);

      if (!existItem) {
        const error = new Error('購物車內找不到該商品');
        error.status = 404;
        throw error;
      }

      existItem.quantity = Number(quantity);
      updateCartStorage();

      return {
        success: true,
        message: '已成功更新購物車數量！',
      };
    },
  },
  DELETE: {
    'ec/shopping/all/product': () => {
      mockDatabase.carts = [];
      updateCartStorage();
      return { success: true, message: '已清空購物車！' };
    },
    'ec/shopping/': (url) => {
      const parts = url.split('/');
      const id = parts[parts.length - 1];

      const initialLength = mockDatabase.carts.length;
      mockDatabase.carts = mockDatabase.carts.filter((item) => item.product.id !== id);

      if (mockDatabase.carts.length === initialLength) {
        const error = new Error('購物車內無此品項');
        error.status = 404;
        throw error;
      }

      updateCartStorage();
      return {
        success: true,
        message: '已從購物車移除該項目！',
      };
    },
  },
};
function matchAndExecute(method, url, data) {
  const routes = mockRoutes[method];

  // 排序關鍵：先檢查 paying，確保它優先被匹配，防止被 ec/orders 搶走
  const keys = Object.keys(routes).sort((a, b) => {
    if (a.includes('paying')) return -1;
    return b.length - a.length;
  });

  const matchedKey = keys.find((k) => url.includes(k));

  if (!matchedKey) return null;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = routes[matchedKey](url, data);
        // 注意：這裡已經包了一層 { data: ... }，這樣回傳給 Axios 正好符合
        resolve({ data: result });
      } catch (err) {
        const error = new Error(err.message || 'Mock Server Error');
        error.response = { status: err.status || 500, data: { message: err.message } };
        reject(error);
      }
    }, 300);
  });
}

export default function setupMock(axiosInstance) {
  const instance = axiosInstance;

  const originalGet = instance.get;
  instance.get = function mockGet(url, config) {
    const mockResponse = matchAndExecute('GET', url, null);
    if (mockResponse) return mockResponse;
    return originalGet.apply(this, [url, config]);
  };

  const originalPost = instance.post;
  instance.post = function mockPost(url, data, config) {
    const mockResponse = matchAndExecute('POST', url, data);
    if (mockResponse) return mockResponse;
    return originalPost.apply(this, [url, data, config]);
  };

  const originalPut = instance.put;
  instance.put = function mockPut(url, data, config) {
    const mockResponse = matchAndExecute('PUT', url, data);
    if (mockResponse) return mockResponse;
    return originalPut.apply(this, [url, data, config]);
  };

  const originalPatch = instance.patch || function fallbackPatch() {
    return Promise.reject(new Error('patch method not implemented'));
  };
  instance.patch = function mockPatch(url, data, config) {
    const mockResponse = matchAndExecute('PATCH', url, data);
    if (mockResponse) return mockResponse;
    return originalPatch.apply(this, [url, data, config]);
  };

  const originalDelete = instance.delete;
  instance.delete = function mockDelete(url, config) {
    const mockResponse = matchAndExecute('DELETE', url, null);
    if (mockResponse) return mockResponse;
    return originalDelete.apply(this, [url, config]);
  };
}
