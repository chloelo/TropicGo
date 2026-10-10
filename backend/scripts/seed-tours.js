// scripts/seed-tours.js — 塞入 13 筆行程範例資料。圖片是本地檔案(frontend/public/images/products),
// 價格為含台灣來回機票的團費,天數與價格參考台灣旅行社同類行程的市場行情
require('dotenv').config();
const { dataSource } = require('../db/data-source');

const TOURS = [
  {
    region: 'asia',
    title: '峇里島．烏布山林 villa 與巴杜爾火山日出 5 日',
    summary: '入住隱密泳池 villa，徒步登頂火山看雲海日出，在梯田餐廳享用道地印尼料理。',
    description: `<h3>【藏進烏布雨林的慢旅行】讓芬多精喚醒每一個清晨</h3>
<p>遠離南灣的喧囂，我們把旅程的重心放回峇里島的心臟——烏布。四晚入住擁有私人泳池的叢林 villa，窗外是連綿的稻田與蟲鳴鳥叫，這裡的時間流動得特別慢。</p>
<h4>巴杜爾火山日出健行</h4>
<p>凌晨跟著在地嚮導摸黑出發，踩著火山碎石一步步往上，當第一道光線刺破雲海、照亮阿貢火山的輪廓，所有的睡意都值得了。下山後直奔火山溫泉，讓痠痛的雙腿徹底放鬆。</p>
<h4>梯田餐廳與聖泉寺</h4>
<p>在德格拉朗梯田邊的景觀餐廳享用一頓悠閒早午餐，午後前往聖泉寺體驗當地人世代相傳的淨身儀式，為旅程留下一份寧靜的儀式感。</p>`,
    content: '費用包含：桃園直飛峇里島經濟艙來回機票、叢林泳池 villa 住宿四晚、巴杜爾火山嚮導與溫泉體驗、聖泉寺及梯田行程、每日早餐。',
    departure_city: '桃園',
    origin_price: 38000,
    price: 33000,
    is_popular: true,
    images: [
      '/images/products/bali-01.jpg',
      '/images/products/bali-02.jpg',
    ],
  },
  {
    region: 'america',
    title: '墨西哥猶加敦．奇琴伊察馬雅遺跡與粉紅湖秘境 9 日',
    summary: '走進世界新七大奇景，潛入天坑地底河，在粉紅湖前留下此生難忘的畫面。',
    description: `<h3>【消失的馬雅星圖】在金字塔前讀一堂歷史課</h3>
<p>從坎昆出發，深入猶加敦半島的核心，這趟旅程要帶你看懂馬雅人留給世界的謎題。</p>
<h4>奇琴伊察與羽蛇神金字塔</h4>
<p>專業文史嚮導會帶你解讀金字塔階梯背後的天文曆法，我們刻意安排清晨入園，避開正午的豔陽與人潮，把最好的光線留給你。</p>
<h4>Cenote 天坑地底河浮潛</h4>
<p>換上防寒衣，從地表的一個小洞口滑入地底，陽光從頭頂灑落形成夢幻光束，魚群在你身邊穿梭，像是進入另一個世界。</p>
<h4>Las Coloradas 粉紅湖</h4>
<p>搭乘快艇深入紅樹林，尋找高鹽度與藻類交織出的夢幻粉紅湖面，運氣好的話還能看到成群的野生紅鸛。</p>`,
    content: '費用包含：台灣—坎昆來回經濟艙機票（經轉機）、坎昆與猶加敦飯店住宿、各航段接駁巴士、奇琴伊察門票與專屬英語導覽、地底河浮潛裝備與救生安全人員、粉紅湖生態快艇、每日特色墨式料理。',
    departure_city: '台北',
    origin_price: 158000,
    price: 138000,
    is_popular: false,
    images: [
      '/images/products/mexico-01.jpg',
      '/images/products/mexico-02.jpg',
    ],
  },
  {
    region: 'africa',
    title: '肯亞馬賽馬拉．草原獵遊與星空帳篷 9 日',
    summary: '搭開頂吉普車追蹤非洲五霸，夜晚枕著獅吼入睡，清晨在草原上享用香檳早餐。',
    description: `<h3>【最真實的荒野劇場】草原上沒有劇本</h3>
<p>馬賽馬拉擁有地球上密度最高的野生動物生態，這裡的每一天都是獨家直播，沒有人知道下一秒會遇見什麼。</p>
<h4>開頂吉普車獵遊</h4>
<p>六人座專業獵遊車保證每位旅客都有獨立車窗視野，經驗豐富的追蹤師會帶你尋找獅子、豹、大象、犀牛與水牛的蹤跡。</p>
<h4>草原豪華帳篷營地</h4>
<p>別懷疑，看動物也可以很享受。帳篷內有獨立衛浴與觀景露台，夜裡聽著遠方的獅吼入睡，清晨在地平線日出前享用英式早餐。</p>
<h4>馬賽村落拜訪</h4>
<p>走進馬賽族的紅土村落，看他們引以為傲的跳高舞蹈，聽他們說至今仍與猛獸共存的遊牧故事。</p>`,
    content: '費用包含：台灣—奈洛比來回經濟艙機票（經杜拜轉機）、開頂式獵遊四驅車、馬賽馬拉國家保護區門票、五星帳篷渡假村住宿、每日三餐、馬賽村落拜訪、車上礦泉水無限供應。',
    departure_city: '桃園',
    origin_price: 198000,
    price: 175000,
    is_popular: true,
    images: [
      '/images/products/kenya-01.jpg',
      '/images/products/kenya-02.jpg',
    ],
  },
  {
    region: 'oceania',
    title: '凱恩斯大堡礁．雙體船出海與雨林高空纜車 7 日',
    summary: '一天潛進世界最大珊瑚礁群，一天滑過億萬年古老雨林樹冠層。',
    description: `<h3>【海陸雙棲】一趟旅程看兩種世界遺產</h3>
<p>昆士蘭最迷人的地方，是能讓你在同一趟旅程裡，同時擁抱兩個完全不同的自然奇蹟。</p>
<h4>外堡礁豪華雙體船</h4>
<p>前往能見度高達 30 公尺的外堡礁平台，水底觀景窗、玻璃底船巡航、全套浮潛裝備都幫你準備好了，不會游泳也能看見小丑魚與綠蠵龜。</p>
<h4>Skyrail 雨林高空纜車</h4>
<p>搭乘 7.5 公里長的纜車，在世界最古老熱帶雨林的樹冠層上方滑行，回程換搭百年復古觀光火車，穿梭在懸崖與瀑布之間。</p>`,
    content: '費用包含：台灣—凱恩斯來回經濟艙機票（經轉機）、凱恩斯市區飯店住宿、外堡礁雙體船一日船票、海洋公園環保稅、精緻海鮮自助午餐、Skyrail 纜車單程票、庫蘭達復古觀光火車票、飯店來回接送。',
    departure_city: '高雄',
    origin_price: 98000,
    price: 86000,
    is_popular: false,
    images: [
      '/images/products/cairns-01.jpg',
    ],
  },
  {
    region: 'asia',
    title: '泰國普吉．攀牙灣獨木舟與 PP 島跳島 5 日',
    summary: '划獨木舟穿進鐘乳石海洞秘境，搭快艇直奔電影場景瑪雅灣。',
    description: `<h3>【海上桂林】藏在石灰岩峰林裡的秘密水道</h3>
<p>攀牙灣的奇特之處，在於你得坐上一艘獨木舟，才能看見它真正的樣子。</p>
<h4>鐘乳石海洞獨木舟</h4>
<p>專業船伕操槳，帶你緩緩划進狹窄的海蝕洞，穿過漆黑的隧道後豁然開朗，眼前是一座藏在巨岩中的熱帶潟湖。</p>
<h4>007 島與瑪雅灣跳島</h4>
<p>三引擎快艇狂飆前往 PP 島，在電影《海灘》的拍攝地瑪雅灣踩一踩細白沙灘，浮潛點裡滿是成群的斑馬蝶魚。</p>`,
    content: '費用包含：桃園直飛普吉來回經濟艙機票、普吉島精品酒店住宿四晚、大船與快艇雙體驗、獨木舟操作費、國家公園登島稅、隨船泰式海鮮 buffet 午餐、全程救生衣。',
    departure_city: '桃園',
    origin_price: 36000,
    price: 31000,
    is_popular: true,
    images: [
      '/images/products/phuket-01.jpg',
    ],
  },
  {
    region: 'america',
    title: '古巴哈瓦那．老爺車巡禮與雪茄莊園 12 日',
    summary: '坐上粉色敞篷老爺車兜風，跟著海明威的腳步喝一杯道地 mojito。',
    description: `<h3>【被按下暫停鍵的城市】哈瓦那沒有連鎖招牌</h3>
<p>這裡的時間停在 1950 年代，音樂與雪茄的香氣，是這座城市最誠實的招牌。</p>
<h4>敞篷老爺車巡禮</h4>
<p>挑一台保養完美的粉色或天藍色雪佛蘭古董車，從革命廣場一路開到濱海長堤，海風吹過的照片張張都好看。</p>
<h4>追尋海明威的微醺路線</h4>
<p>到五分錢小酒館喝一杯正宗 mojito，再到小佛羅里達酒吧點一杯海明威最愛的 daiquiri，順道造訪他住了二十年的山莊故居。</p>
<h4>雲尼斯山谷雪茄莊園</h4>
<p>這座世界遺產山谷裡，農民仍以雙手捲製世界頂級雪茄，莊園現磨咖啡的香氣會讓你捨不得離開。</p>`,
    content: '費用包含：台灣—哈瓦那來回經濟艙機票（經加拿大轉機）、哈瓦那舊城特色民宿、敞篷老爺車包車導覽、海明威故居門票、兩間歷史酒館經典調酒各一杯、雪茄莊園體驗、每日傳統早餐。',
    departure_city: '台北',
    origin_price: 168000,
    price: 148000,
    is_popular: false,
    images: [
      '/images/products/cuba-01.jpg',
    ],
  },
  {
    region: 'africa',
    title: '模里西斯．印度洋秘境與七色土奇觀 8 日',
    summary: '和獅子一起散步、在七彩大地前拍照，還能跟野生海豚共游。',
    description: `<h3>【天堂的另一個版本】非洲狂放遇上法式優雅</h3>
<p>有人說上帝先創造了模里西斯，才照樣造出天堂。這裡的沙灘與海水，乾淨得不像話。</p>
<h4>與獅同行</h4>
<p>在專業隨護的陪同下徒步走進叢林，近距離與成年獅子一起散步拍照，這種經驗一生大概只會有一次。</p>
<h4>夏馬爾七色土</h4>
<p>火山熔岩冷卻速度不一，造就地表紅紫藍綠漸層交錯的奇幻景觀，隨後順道參觀百公尺高的瀑布。</p>
<h4>黑河灣與野生海豚共游</h4>
<p>清晨出海，當飛旋海豚躍出水面，換上輕裝緩緩游入海中，近距離感受牠們優雅穿梭的身影。</p>`,
    content: '費用包含：台灣—模里西斯來回經濟艙機票（經杜拜轉機）、五星海濱度假村住宿五晚（含早晚餐）、卡塞拉與獅漫步體驗、雙體帆船出海（含 BBQ 及酒水）、七色土景區門票。',
    departure_city: '桃園',
    origin_price: 148000,
    price: 128000,
    is_popular: true,
    images: [
      '/images/products/mauritius-01.jpg',
    ],
  },
  {
    region: 'oceania',
    title: '斐濟楠迪．外島放空與火山泥漿溫泉 7 日',
    summary: '登上無人外島盡情放空，全身敷上火山泥後跳進天然溫泉。',
    description: `<h3>【Bula 時間】南太平洋教你怎麼慢下來</h3>
<p>一踏上斐濟，耳邊就是熱情的「Bula！」，這裡的空氣裡都是香草的氣息。</p>
<h4>南海島跳島放空</h4>
<p>搭雙體船前往被珊瑚礁包圍的無人外島，免費使用獨木舟、SUP，現烤 BBQ 與斐濟啤酒無限供應，什麼都不做也很完美。</p>
<h4>Sabeto 火山泥漿溫泉</h4>
<p>全身塗滿富含礦物質的火山泥，曬乾後跳進天然溫泉池洗淨，肌膚會有意想不到的光滑感。</p>
<h4>卡瓦歡迎儀式與聖火舞</h4>
<p>品嚐傳統飲品卡瓦，欣賞斐濟勇士帶來的聖火舞蹈與傳統地灶大餐，夜晚的沙灘比白天更有魅力。</p>`,
    content: '費用包含：台灣—楠迪來回經濟艙機票（經轉機）、主島精品度假村住宿五晚、南海島全日票（含水上活動與 BBQ、酒水暢飲）、火山泥漿溫泉體驗、斐濟傳統大餐。',
    departure_city: '桃園',
    origin_price: 78000,
    price: 68000,
    is_popular: false,
    images: [
      '/images/products/fiji-01.jpg',
    ],
  },
  {
    region: 'asia',
    title: '菲律賓巴拉望．科隆沉船浮潛與鏡湖秘境 5 日',
    summary: '浮潛探索二戰沉船遺跡，再跳進亞洲最透明的淡水湖泊。',
    description: `<h3>【最後一片處女地】寂寞星球選出的最美島嶼</h3>
<p>科隆島擁有保存最完好的二戰沉船，以及被石灰岩峭壁環抱的夢幻淡水湖，是潛水愛好者心中的終極天堂。</p>
<h4>凱央根湖</h4>
<p>爬過 150 階山道俯瞰科隆灣的明信片美景，再走進亞洲公認最乾淨的淡水湖，湖水透明度直達水下 20 米，躍入其中的清涼感會讓你上癮。</p>
<h4>沉船浮潛</h4>
<p>不需要潛水執照，戴上浮潛面鏡就能看見距水面僅一到三公尺的戰艦殘骸，佈滿珊瑚與魚群，震撼感超乎想像。</p>
<h4>珊瑚花園</h4>
<p>保存最完善的珊瑚礁群，數十種軟硬珊瑚隨海流搖曳，像一座海底植物園。</p>`,
    content: '費用包含：台灣—科隆來回經濟艙機票（經馬尼拉轉機）、科隆島海景飯店住宿四晚、私人螃蟹船包船跳島、凱央根湖登島稅、全套浮潛裝備、專業救生員隨行、無人島現烤海鮮 buffet 午餐。',
    departure_city: '桃園',
    origin_price: 42000,
    price: 36000,
    is_popular: false,
    images: [
      '/images/products/palawan-01.jpg',
    ],
  },
  {
    region: 'america',
    title: '巴西．里約基督山與亞馬遜雨林 11 日',
    summary: '站上世界新七大奇蹟之巔，再深入亞馬遜雨林，搭船看黑白兩河交匯的奇景。',
    description: `<h3>【上帝視角】森巴熱情與壯麗奇岩的雙重震撼</h3>
<p>里約把巨幅奇岩、大西洋與繁華街道融合在一起，視覺張力令人屏息；再往北飛進赤道旁的亞馬遜，走進地球之肺。</p>
<h4>基督山守護之巔</h4>
<p>搭乘齒軌火車穿過蒂茹卡雨林，登上 710 公尺高的基督像下方，360 度俯瞰整個瓜納巴拉灣。</p>
<h4>糖麵包山夕陽纜車</h4>
<p>全透明纜車分段登頂，特意安排傍晚時分，看著夕陽把科帕卡巴納海灘染成金黃，城市霓虹接著亮起。</p>
<h4>塞勒隆階梯與森巴之夜</h4>
<p>走訪用六十多國彩色瓷磚拼貼而成的階梯，晚上到老牌俱樂部一邊享用窯烤牛肉，一邊欣賞森巴舞表演。</p>
<h4>亞馬遜雨林</h4>
<p>從里約搭國內線飛往瑪瑙斯，搭船前往黑色的內格羅河與黃褐色的索利蒙伊斯河交匯處，兩股河水並肩流了好幾公里都不相混。晚上入住雨林生態小屋，跟著嚮導划小船夜探凱門鱷，清晨在吼猴的叫聲中醒來。</p>`,
    content: '費用包含：台灣—里約來回經濟艙機票（經轉機）、里約—瑪瑙斯國內段機票、里約海景飯店與亞馬遜雨林生態小屋住宿、基督山齒軌火車票、糖麵包山來回纜車、亞馬遜河船遊與雨林嚮導、森巴晚宴餐廳、專業中英雙語地陪。',
    departure_city: '台北',
    origin_price: 238000,
    price: 208000,
    is_popular: true,
    images: [
      '/images/products/brazil-01.jpg',
    ],
  },
  {
    region: 'africa',
    title: '馬達加斯加．猴麵包樹大道與狐猴雨林 10 日',
    summary: '在千年猴麵包樹下等日落，夜探世界最小的靈長類動物。',
    description: `<h3>【另一個星球】90%物種只在這裡才看得到</h3>
<p>馬達加斯加的地質與植被奇特得不像話，降落的那一刻你會懷疑自己是不是到了外星。</p>
<h4>穆隆達瓦猴麵包樹大道</h4>
<p>數十棵千年巨樹挺立在紅土路兩旁，夕陽把天空染成紫紅色時，那份荒野的孤寂美感會讓你說不出話。</p>
<h4>奇靈地夜間狐猴探秘</h4>
<p>專業嚮導帶路，拿著手電筒尋找世界最小的靈長類——侏儒狐猴，運氣好還能遇見馬島長尾狸貓。</p>
<h4>安達西貝國家公園</h4>
<p>深入雲霧繚繞的雨林，聆聽大狐猴清晨在樹冠層發出如鯨魚般的空靈鳴叫。</p>`,
    content: '費用包含：台灣—安塔那那利佛來回經濟艙機票（經轉機）、內陸段航線機票、4WD 越野車包車含司機、國家公園與保護區門票及生態嚮導、荒野精品 Resort 住宿。',
    departure_city: '桃園',
    origin_price: 218000,
    price: 189000,
    is_popular: false,
    images: [
      '/images/products/madagascar-01.jpg',
    ],
  },
  {
    region: 'oceania',
    title: '大溪地波拉波拉．水上 villa 與魟魚共游 7 日',
    summary: '住進透明地板的水上別墅，和溫馴的黑鰭鯊、魟魚一起游泳。',
    description: `<h3>【最接近天堂的地方】漸層藍綠潟湖環繞的火山島</h3>
<p>波拉波拉被大自然親手調出漸層藍綠色的潟湖，環繞著雄偉的奧特馬努火山，是太平洋上最奢華的蜜月首選。</p>
<h4>水上 villa 住宿</h4>
<p>四晚入住透明玻璃地板的水上別墅，室內就能看見魚群穿梭，也能直接從私人甲板躍入溫暖的潟湖裡。</p>
<h4>黑鰭鯊與魟魚共游</h4>
<p>在嚮導帶領下潛入潟湖中央，溫馴的黑鰭鯊與巨大魟魚會在你身邊游動，輕輕觸摸如絲綢般滑嫩的魟魚背。</p>
<h4>無人島傳統宴席</h4>
<p>登上私密外灘享用香蕉葉悶烤的大溪地料理，傍晚搭雙體帆船巡航，看落日把火山染成金紫色。</p>`,
    content: '費用包含：台灣—大溪地來回經濟艙機票（經轉機）、大溪地本島飯店一晚、大溪地至波拉波拉來回接駁、水上別墅四晚住宿、鯊魚魟魚共游行程、無人島 BBQ 午餐、黃昏香檳帆船巡航。',
    departure_city: '桃園',
    origin_price: 188000,
    price: 165000,
    is_popular: true,
    images: [
      '/images/products/tahiti-01.jpg',
      '/images/products/tahiti-02.jpg',
    ],
  },
  {
    region: 'africa',
    title: '埃及開羅．金字塔日出與尼羅河遊船 10 日',
    summary: '騎駱駝走進吉薩金字塔，夜晚尼羅河遊船，穿越三千年前的古文明現場。',
    description: `<h3>【法老王的國度】站在人類最古老的奇蹟前</h3>
<p>吉薩金字塔群矗立了四千六百年，親眼站在它面前的那一刻，課本裡的歷史瞬間有了重量。</p>
<h4>金字塔與人面獅身像日出</h4>
<p>趁著清晨人潮未至，騎上駱駝緩緩靠近三大金字塔，陽光把沙漠染成金黃色，人面獅身像的輪廓在晨霧中格外神祕。</p>
<h4>尼羅河遊船與路克索神殿</h4>
<p>搭乘遊船沿尼羅河南下，兩岸是延續數千年的農耕風景，靠港後走進卡納克神殿，巨大的石柱林立，仍能想像當年祭司的腳步聲。</p>`,
    content: '費用包含：台灣—開羅來回經濟艙機票（經杜拜轉機）、開羅國際機場接送、開羅五星飯店住宿、金字塔區騎駱駝體驗、尼羅河三晚遊船住宿、路克索神殿區門票與中文導覽、每日三餐。',
    departure_city: '台北',
    origin_price: 109000,
    price: 89000,
    is_popular: true,
    images: [
      '/images/products/egypt-01.jpg',
      '/images/products/egypt-02.jpg',
    ],
  },
];

// 比對既有行程時去掉標題結尾的天數(「 9 日」「 一日」)和所有空白,調整天數或中英文間的空格時
// 才不會被當成新行程重建、換掉行程 id(收藏和購物車都是用 id 記的,id 一換就失效)
const baseTitle = (title) => title.replace(/\s*(\d+|一)\s*日$/, '').replace(/\s+/g, '');

async function seed() {
  await dataSource.initialize();

  const regionRepo = dataSource.getRepository('Region');
  const tourRepo = dataSource.getRepository('Tour');
  const tourImageRepo = dataSource.getRepository('TourImage');

  const regions = await regionRepo.find();
  const regionIdBySlug = Object.fromEntries(regions.map((r) => [r.slug, r.id]));
  const existingTours = await tourRepo.find();

  for (const item of TOURS) {
    const exists = existingTours.find((t) => baseTitle(t.title) === baseTitle(item.title));

    if (exists) {
      // 不能只補 content——改了 images 之後重跑 seed 卻完全沒更新到資料庫,之前就因為這裡
      // 只 patch content 吃過一次虧(圖片改了但資料庫沒變),這裡統一改成每個欄位都同步,
      // 圖片也整組刪掉重灌(TourImage 本身沒有能拿來比對新舊的自然鍵,刪掉重建最簡單可靠)
      await tourRepo.update(exists.id, {
        title: item.title,
        summary: item.summary,
        description: item.description,
        content: item.content,
        departure_city: item.departure_city,
        origin_price: item.origin_price,
        price: item.price,
        is_popular: item.is_popular,
        region: { id: regionIdBySlug[item.region] },
      });
      await tourImageRepo.delete({ tour: { id: exists.id } });
      await tourImageRepo.save(
        item.images.map((url, index) => ({ url, sort_order: index, tour: { id: exists.id } })),
      );
      console.log(`= 已存在,整組同步更新: ${item.title}`);
      continue;
    }

    const tour = await tourRepo.save({
      title: item.title,
      summary: item.summary,
      description: item.description,
      content: item.content,
      unit: '人',
      departure_city: item.departure_city,
      origin_price: item.origin_price,
      price: item.price,
      is_popular: item.is_popular,
      is_enabled: true,
      region: { id: regionIdBySlug[item.region] },
    });

    await tourImageRepo.save(
      item.images.map((url, index) => ({ url, sort_order: index, tour: { id: tour.id } })),
    );

    console.log(`+ 新增: ${item.title}`);
  }

  // 清掉已經從 TOURS 陣列移除、但資料庫裡還留著的舊行程(例如墨西哥坎昆)——
  // 只刪沒有訂單引用的,避免誤刪掉已經有真實訂單資料的行程
  const currentTitles = TOURS.map((item) => baseTitle(item.title));
  const allTours = await tourRepo.find();
  const orderItemRepo = dataSource.getRepository('OrderItem');
  for (const tour of allTours) {
    if (currentTitles.includes(baseTitle(tour.title))) continue;
    const refCount = await orderItemRepo.count({ where: { tour: { id: tour.id } } });
    if (refCount > 0) {
      console.log(`! 保留(有訂單引用,未刪除): ${tour.title}`);
      continue;
    }
    await tourImageRepo.delete({ tour: { id: tour.id } });
    await tourRepo.delete(tour.id);
    console.log(`- 已從資料集移除,刪除: ${tour.title}`);
  }

  await dataSource.destroy();
  console.log('Seed tours 完成');
}

seed().catch((err) => {
  console.error('Seed tours 失敗', err);
  process.exit(1);
});
