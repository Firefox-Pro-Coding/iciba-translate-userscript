// ==UserScript==
// @name               iciba划词翻译
// @namespace          noe132.com
// @author             noe132
// @include            http://*
// @include            https://*
// @exclude            http://www.iciba.com*
// @grant              GM_xmlhttpRequest
// @grant              GM_addStyle
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @icon               http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version            3.2.9
// @supportURL         http://tieba.baidu.com/f?kw=firefox
// @contributionURL    nnnnoe132@gmail.com|alipay.com
// ==/UserScript==


/* ------------------ changelog -------------------
 * update INFO:
 * update 2017/05/09 : bug fix
 * update 2017/04/20 : 添加鼠标悬浮触发查词
 * update 2017/04/19 : 终于搞明白怎么定位了
 * update 2017/04/18 : 添加最大选择数设置和默认行为设置，优化样式
 * update 2017/04/12 : 添加了百度翻译谷歌翻译按钮
 * update 2017/04/12 : 搞了个字符串压缩~解压字符串速度还可以
 * update 2017/04/11 : bug fix，重写鼠标事件定位方法
 * update 2017/03/24 : 添加鼠标事件10ms延迟
 * update 2017/03/24 : 用babel翻译async function，可以支持到chrome33
 * update 2017/03/23 : 使用百度翻译API，iciba的程序员不更新api
 * update 2016/12/23 : trim查询字符串，更新版本号到3
 * update 2016/09/23 : mouseClick只能左键触发
 * update 2016/08/19 : 不知为何connect属性未加上
 * update 2016/05/30 : 样式修改
 * update 2016/05/03 : 解释处理修改
 * update 2016/05/02 : 样式修改
 * update 2016/05/01 : 样式修改
 * update 2016/04/22 : 老版本浏览器兼容性修复
 * update 2016/04/17 : 样式修改
 * update 2016/04/17 : 重写
 * update 2016/04/09 : 样式小改
 * update 2016/03/27 : 紧急修复。。。
 * update 2016/03/16 : 样式修正
 * update 2016/03/05 : 样式小改
 * update 2015/07/31 : 貌似之前的wordpress判断不太给力，干脆带wp-admin的都干掉
 * update 2015/07/12 : 去除wp-admin/post.php页面，防止wordpress编辑文章自动添加div
 * update 2015/05/19 : 设置查词默认为小写
 * update 2015/05/09 : 按Ctrl可以使小蓝圈隐藏起来（暂时）
 * update 2015/01/03 : 样式全加了 !important 提高优先级
 * update 2014/12/24 : 添加设置选项（可当且仅当按住ctrl键显示翻译按钮）
 * update 2014/12/20 : 修正语法错误。。。
 * update 2014/12/19 : 搜词BUG修复，修正点击定位~
 * update 2014/12/10 : 严格模式'use strict'，提高性能
 * update 2014/12/04  : 贴吧图册预览修正
 * update 2014/11/16 : 更换mouseClick的触发条件为mouseup
 * update 2014/11/14 : 添加输入框查词，修正定位不正确。
 * ------------------------------------------------ */

'use strict';

var Iciba = function() {
    this.init();
};

Iciba.prototype.auto_active = 1; //没用~
Iciba.prototype.ctrlKey_actived = null;

// init 初始化对象 插入样式 读取设置 绑定事件
Iciba.prototype.init = function() {
    var _this = this;
    var style = '#icibaCirclePointer{foď-family:"Mārosoft Yahei",sđifįans-İrĲ!importĵt;displaĝblockļľŀłď;z-Ďdex:10Š0ŒĿŁŃ;ovđfŎw:hidśnţŔŦwŰth:20pxŴťŖīightŻŽſĽŤŕńbŀśrŞž ĤlŰ #5ƛƀƍ;ƏrƑ-raņusŞŠžƝŦĄŐgĢund:#ABDƬŖƏxĸhƥoŭ0 ǃ3Ɣ#1ǉƺńopaĂtĝ.7ǋ;tƤĶitiĕ:.05sǕƼĸizĎg:ƠƢƼǋ}ĀĂĄĆĈĊČĎĐƒhŨđ{ǍǏǚĝ1Ǯǰăąćĉċčďđ:ǏǛũ{ǫȌ1ƔƖƘ#35șșǣǏkưoƲƴ#90a2c4ǣoƽsƿdǁ:ǃǅǇ2ȶȃāȅResultCĕłĎǼŘŚŜƩšǕŷdŹȍutoǕƃƅƇaɐɒƋŵŖmaƽɌɎ3żƫɚƁƎƐȌnĕeȝƯƱƳƵEɲȫȭȯȱȳ 8ƔȔxƙ9ɿǕĊtǸĸǎĂnǩŢɥƍǯȹĄȻȽȿɁďaɄr *ȑȬǥǧʈǪɨr-ǭʋŃʍǱa_İaĈh_Ƽ{ņňŊŌŎŐǕɝrgĎȲǕǎűǨʼʤŖɠźş0%ȫơđʢoʃomƓɽȖdƙC˖ǕĔĖsǦeˁœɦ;ʂʄňǿʞʊ˟ƞwƐʅ˥ʉȸʧʐȾɀɂʕnđ Ďpɐ{Ŀ˛ǛǝsłǛcʷʫʺn˞ƌƭʠƣƥiƧ̉ɛɧɵǀŭɪ˶ɴʜˀȒʡʣ˨Ŧʱŉŋ:ĎƗ˶ʢʵő˂ńũŁāal-̰Ƅ̈ĚűĊ˘ŎaƇ̗ɬ̫ʦȅʩeʫcʭƼ>ȄĄS̓ʬIn˺t˼ƥņ˦ 7ɤ̟˃Ÿźc̰c(ˆ% -ɹ͗x)ˉƑ:̽ɓĬɕŻɺƊ͙ń̦e-ɔƆͰ̊͘ƻȞȠȢ:wůĐǕcoŎƒ#6΋˘ɂʜ˝14ͻ̒ˡeʃˋˤʇˮ̫;˙tėęěĝğġģĥħĩƃĮĹĲĴĶĸıf˯ȅ͋̈́h͎͐Ůǻr,͉aε͍͏ɐ:ĔcƧʚ̔ȰǂǄ ǆɽǃ#˖C˸ĶΖ΅·ŀƵȶ2Ǯ.ʎο͌ͅBɐɑn͒ʿ˦ɋ͛Ż9Γˠ͸Ƈ2ͱͩˋƤƦƨ˧ͼƎ;ɯd-ΆΈɱɳΜƮȟϽƣep̼̓oЈЊ̻ϴƒͬЄ̌ĊĦˑƕ·ȗϒϝϟπϢϤǝǺ̭ȑϼȡƳϿϘΉĘЬaНʧПhϣˎ̈ȎiȐЅͿШЀϙ#e5пп̙Ȯ̕Ȳό2Ǉ8ъϔİtγ͊ϡвСϦйЇĽag˝url("d̻a̤ɝљ/svg+xmlƟaİ64,PHN2ZyBѷXJzaW9uPSIxLjEiIGlk҃JDYXBhXz҉IHƆbG5zҏodHRwOi8vd3ҪLnczLm9yѸ8yMDAwL3ѶѸIљG1sbnM6eGxpbms9Imh0ҢA6Ly9ҫ3φdzMub3JnLҗ5OTkũӊӌӎҊHgӐjBweCӀeT0iMHB4IiѺѿV3QҲ4҃IwIҹgNTYuөY2ԎU2҇k2NҊgc3R5ҜUӐmVuYWJsZS1iԫNrZӣҩW5kOm5ldyҺԎAԐԒԔԒԗDԙԛԝj˛ҙқDpzcGFjZӻāHJlc2VydmUiPgogICՄѴҔdGgKիՄմժCBҎSJNԑUuMTQԚՊ҆jg4N0w0MS41ODgsMՔuNzg2Yӟ֘֓Ԛւրւ0LՊրzԜLӪ֨U4֦տ֖֪TE֥jȩNmMһִy҇Y4Ġ0xMC4ӟTgtMjM׋׍׏֙֫IҰDEһ׍xOC0ҷywמB׈A֨E֯Dה֦שרz֝Q֘׭҆ҹsO֏yө׊֎4֍׭֕TӠցԡ֫ׯցYybזҰjԖ֎wxN׆ҷDh׍׆1֙E֕ؖөM֕֏ӟؚ֩45Ġנ҇E2إטkyҋֻ҇ԡ׵wһזִ֘֯Tפ׌k3תրDc5֫פ֒MԇzՋjIؗSwؗ׆ӨרsԑԓػוU؊AקU1ا0Ԟَ׺4֒d6Iֵמأ֒Qֺٓق׍ҽCس֦Eؽـ֘يքٵٴӜy0ؽ؋y٠؏پڄ؎NѹҰִؽTφNٹ֫ٻڋֵֿ٘ײY֕׍Շg֥DZ٦ԃzҢlԮ՚ZѬӄDթcmņKז։ןgցgؽլךـpOح+PC9wҒRoէo8ҼҾz4K"ͨЄЦȢ-˽ǚǜ̈ceȋrɭІЧϾ˛zΐ5ɻۢͲϺ̀ѐζгϥTǘsŊĐGoթĊХɮ۝řѤњќўѠłѣјeѦѨѪѬѮѰѲPD94bWwgգա՟lvbjӼ׺ԍԃlӍNvZҌuZzӼVVRG֫ʺҙ֊ԫԺԫxܕդԧ5vIj8+CjxڢmcӁӃӅMԧӓӕӗәӛӝ֞ӢӤӦԌҸAvԡZnԂԄWԆԈ܋ԋԍԏ֙ՄݠӰdpZңۄ҄3ׅӀaGVݥ2ӓԋݪӸܺiյլ8ՕFȦAթնހGZӌGwӐӽ֍և1RjQiĆݸޑgZDӼT׿ٝي5ԎQֆޝV׍ySґ3؆ׇ֎AֆYֶQ3ԎӠԑg֟݀N֏2כՂٷҸY׋֏ؤՁ؏֏3׵0֯҈1ԎI־jީٕ֫ՊԐiׇڑ؊ȩԎkٸ޼׌؄רg׵4ԝkM؏ߒӟݷ޷؟޵ׇԞA1My4٣ߩݷzؐأ׺ߵݷ߁߷߀ԞާߒٟՁߵ؟҇ޭ֝ח҇Uڳڷڈ٪լֶEح׬ֿߞ֏0O܎t߾ԝլԚ؋0؆Š҇Aڊް֚tߟࠗS0ࠞc־ִࠞؼߎװI׋׿Ԕґࠋם߶ޮזֆڒIֶ݀׌ֱDMࠋީ߯߱߬ׄ׆։լڂ֏w߯Aڂ׆࠽ًࠣzԎ޲өȟׅީ߶ׄࠫ؊YxԎٻ׍قՆ֒࡟ߒԝiםֿՉׯNזࠚࠀ߬ޙE࠶EٸVsדߋQٯީĬIvۅۇҽѷۊیێͳѮ۶ۑۣ۟ۡϮƞѕ۷ۓ˿ۖۘǸяϠ۩ѓ۬ĵۮ̻eBʕdu۵ۜۑїљ:ћѝџѡۿѥѧѩѫѭĄ܇ѳѵѷѹѻѽѿҁԋ࠿ҊҌպҐҒҔҖҘҚtҜҞҠҢҤҦҨҪҬҮҰҲҴyҶݑһࢌҿ݁ӄӆӈӭӍӏӑ݆HӖӘӚҪ݋Ӡݍӥӧ࡞ӬӋ࣬ӰӲܷӵӷӹ՚ӾԀݗ3ѿRȦޕiөँӸgݭݯZݱ0ԋؤӿԁԃ2ԅԇԉݝՃߞعढAӰ֊eWxlҏܜmFăGUtYमjȧՀӢԩޔ˺ZXࡃլݞkुҥحࣧOnNہWNफջwڬVzऽJѷ҄+DQoJծhհgऑWQӐkJƿWR߈ԃ࣌Nߛؿࠑ֦֖ࠉ٣Gدj٘޵wڀYٝ࠷ڏEײڕ҈ݪپٯIࠜڇؖ֊Mࢅ5ڈ֌כ֐վٓ׆ҥזٓרٸcٝࡆضփ॰ޙࡕࡔժॴ׋֖ؖलࠍԝٍࡥࡣ׃ࡢ֙٬ߟڂލ࠶ࡵڍxQҗ߆փإҷঔٔڙްـק࡙jkߵןࡖ4ࡓTI֕֞ޱ4ĬBսيՇMקࡾ֒c0նࠡޙࢄ֎׃ࠅࡓࠫࡣ׻র֕߰ࠗDk࠶؀׭־זثҷW׎٢өUٓ৫֖ৎܙ׌؝ցশج֦ԓԑڕזޙkؤةৠقصؐ؎׺ٟ׭׋৫֒֔ցৰॻڑ৴ިժEن׺ؤւ״׆ךਥڏ؄ॶוIրߌק؆ԛzכ؎҇ڵNHթޗচ਷ׄiנ߾ؤjޠ֫տ֙਽ҹؿ֛ਝ҇Mٍ֑ޙU߃০ׅ4ҷ࡛׾ߜֈ৞zغ্ٶ޲ԑ֦ٚׯөAڝ९׍ڱ਒׆޷Պ׾ਮ֖ީ֝ੇՔ࠯غ֠ٴט੏כࠢ҈ࡓןࡍ੗֖৷্ٸֵহੌ׍ਭٯ؆٠ҽ߰ਨ৺׌ԓ੧ছ਽ևਿੁߒ੃V٦լਠ0ӟ߰঍ॶ֕তߪࠗԒؚǠԛٍ߮ࠞب֫ߘ৹ঀߕֺؗشڎӪքࡵՊছEસ߯wٯkર਒߰ҽTڏપԕؚૅયׂલؗן૆߮ࡱׄ૊ԑࡇիƸࡶӠөٻґ֣ژֲ֟ࡦ֦A৏ૡԒছB٦ֵߦߠ؜গਮ֙Jj֫؀ڍছশ޼߾ҽو״ࡒցࡼਚװਲזֶڜMةࡸ٪֓ٓ֏ׁ࡛ࠨ޾ԑৎߟ։׉ଗأଙ׾੶ે੝૫ߪؤ׽ࡊ਴଒ցଢુٙҷੀ߻߃Tޠߟةz٬ׅঈ੗ө࠵Ġ4ׄ҈ڙ৚ִॼੲ্x֝ڎيו૫ց૷ਫ਼ٶਮԕਏߊ੎਴ٍߋԜ׵յॴ઎ࠃٳ؉ֿ֑לٯॿ঎૚ߠޱ࠶ࡅ٘֝Aࠚ޾֖c޽୪ଖলө୴ߟ਴ִ࠶ߏ࠮ֶࠡkֶٟࠫMٟࡱ୦਴לڀֈ޵ম߂Ҹାڍؿࡕ৞پ؊ࡁஏֶUҥל࠱ڱ0ঠ٣לઃؤक़ୱো֒hࡆ֩Շ਋॰࠭։ফߪ੬஋ୀڏਁ࡛ٸে੥ߋ࠮ࢇԠԢԤऱԧރҜw٦՜nYƄୠڳଃ߉াk7ܷ4ࢋկձॗख़ࢋۉࡏg==ۍۛк۞˜ɏɑ 1ۤ௤Ї࢜ە:ۗۙࢡ˱ȿTŜtBȬ{ʸ̇̑ˠʾ͔ǩşɻƉόఄۥΔмΉϛǕĐxΟ̳g̈ЖюΜΞΏŞΒఉˠఘĘĚĜ:Aĺ̰,HeܔΖ̯ήķάβۏ࢓ɰ#fbఴఴ̅ƽϰŻ5ƉǕλūǁ-ŝůűۘా̭ీw-ĝɗɑ௴ȼ˲௷ఐ௺ŝȍĦǼΆȋďĞ"Ǖ̡ʳǪ̩௭۝:Ǘࢦǎr࢟ͭƄ͹ఈЯIࢪhح-˶w_˪ơʰŇ̢ĝГͳ}Ϟc౰Ī౳Ŋbన_Ɨ́>LƷEL౺ʲ̣̥Ʉ౏ʑt౒௹Ȭ ņvνϟ௵ಘ௸౔ Ⱦಟ˰౐௶ಣಛƗಧȺ಩ಢ౓ಛpಮʏರಙತĔrmವaಡಸಛ˹ɐಽಿಫɽಆన௼̆ʻϹΔఁˀ್ఝΎӶ౬Ќ಻̰ಖ౑ೆϔ͐ೄಷ೛bѓೞಗೀɽఏł౩aē೓ͮ͹Ďīĺఖ࢑ఘ́yĊ̤n೰ǚ΍˚௧೯ıೲϺΝΎట΢ఢతlదనũ̃aబΰĺయ౿ξ೅ಲɽದഔ೟ഖ Ɨ{ಊΟ೵೷౾ۦങ೤೛Ѣυχȡt͵ͫɫ೙ಪഛĽgʚˊƒ೑ʌഥ೚ഛ́Ģʈ೫Ė೔ͯˆ೼Οഅడ"͋ըe UIĮVđѠnഎLuĂѠ Sࢦ Ȼ޲Ŋμൖ൘a൚൜Unāҡe,ణiథsࢦഐĻ̿ഺറಚɽಁಃ౲I-ņ୴ĄĒ೴௧1шజഹಠച൷ ൹౱౳౩ʺ́đೣ഻ඊඌ಄ർĺɕʮgඓ൶ತඖൻ-u಴൵ಱඕāൺ౳ϊϦీ̻:඙Ɔരඦඟඨඍ඘eඐǸϧం-క఻࢘ʥඥ೥ aච౳೧ʮŊŐඝඳಛෆർൔvಉŇħഽĕഴఋƵ3ෛ඲ස೪ෙ#236fdȪΜ೧ൽeΆƤ࢝ࢳƳđ͵ෝധκФ෠෢෤෦ෳഛාͷĵdwೱ൫ෂ೛෽ƿƳกǚe_λ෌ස෽dĢp_ණ˼ģ۔ǝabƖɐ̾࢑˄Ş6වƂ೭Ƈ1ยආŦφrĤƒĿǷđ෻ටಂබ෾จข{ɑpచรńධฦ3ఽరࢯШ௯ǝǃ-7โഓඈദ෼ඵ඗ึ฀ขฌФฺ฼ษŖ฿Şแ฽࢒ไϾๆ̈-1ͱ๊ͣ฽ۧಾඉತǰඩർൾt_ɝĎර೐ఎ௸̲Ɨఓ:కาපิ๑๱඀಑౼ౡŏ̪࢑೏ϩΜ఺్ə࢑͵ͷลŞ.Ϝ൴ํඔ຀๯-Ǜബeถ˾௰౩ۯзพം຋ఃศ௪ͦఇϳΜ෠ෛ3൅-ൂ͹ƏԿິ࢕ŻఛິേౌഈഏమʁɄຓೕ:ɢ๞౸Ͼb೩kǪ໎๺l๿෎๐ඡ๱_ພ۴ັොగ೬໇ຸd຾Ρడʫ൮ഉ൰ίໃຘನ๎ำຜpാs຅ౠōຈʽ͓๷ຍດຏɋ΃ͶΙ˝ɪ೗໓ໞുດ๊സශນඞ໕ກ໗ā࣓ʫඋ໖౳ū{̭഍̱ఒ̵Űd̸༆ഠඃඅໄ̧఺༃ɝ༅์໭ບ༎ຜ຃༓෽ūʘീ༢۠Ş༤໬ಯ໮ປี൩ʩ۝ู๹ś෬̻௰ണΔ̜മ̘Μ౟ಓnຒ໶ʶΜిŬŮ༞ెΜ௽ೌϪɍ˅ศ౫ൃའใ௥ࢳۻࢶ۾ࢱ܁ࢺ܄ࢽѯeѱࣀҾࣃ॓ѾҀ҂҄ࣉҋҍҏґғҕҗӰқҝҟջҡңҥҧҩӛҭүұҳҵؒҺۈࣂӹӂࣨӇӉࣼӎ݅Ӕࣰ݈ࣳӜuӞࣶӣࣸEӨӪࣻӮՏӱӳएःܘङݗजݙञݜ҄ݞՄ਀ߋE߮Ձ੘େ٘ݗڢHڤՙӼZԹhऴपLԬ࿌2tҮҲ1ӍQ6ӍԆडࡠ࿁֣࿃׬ି؏׿௕ԃ܌܎6ԡҔԖԦ͎BҴXौcnZl௖KCTxݖ࣋ҏQҜFޛjۋCQkݺՖݽग़စl࿅࿇ڦڨbC1բऩlҦBԿԨӡ2RԻѹjҜlһѼ࿖ऱ٦ݮѷԹܟGQ௕ނބ௉ҙӤ்ֈ଺ڳ׿һࡐ׌Aںح࿸ဆJޔޖ্ઁ4ଳؙ࡞ٸI4Tक़ٯֻ঎ߋI঍઩উַ׋ߒݪӪ࠶غ੫דਯԖڑஜҷࠫၓࡰଢ଼આφਚ৲୰؁ؿՋୢيڂڅࠍwী؅ضȩd҈ӨِNॴش୓஭كؿ੉ળॶ੔ڇ߰ၷબၹԑف׮ਯg୍଄ଟTઔ׆ִٟਗ਼ض҅ၠકޮડ؈྾߶৬׎୹֖֨ࠇߋ׀઼֫QુטQ߲মࡹ৭׾פࡶg࡫ႈQࠗV߯ႏـঀၷ઒֙৾ߌߕؤٍӨ޶׌h٦ဃ௘ढ़௚CgဇLȨܺjwݓ3ݕۅ௢࢐ം౦Ǚ෮0ǢΜ༙̯༛๻༝̷ວ̒๪ക໯༾Άཀ΀УǼǾǐǒǔ༺ಶ༼༮ჷoჹɰжȐჽȀǞ9໔൸༕ർමฎฅᄑජ໳ຩຝǍ௿ƞఞ໤ΣlൗŰ൤໩sಥ൨ΆśĮ໦೘ཌྷ౻໵ౢᄁ๫ᄃᄐ༏౳౵౷Ɛē̺Ƈ๾Μᄙ๗༹༫༻༭ᄵຜᄸ໋හ໴̣དྷຉຨ໹ʞώ௪ఆǃɣ๙ńภș๞఺1ͦౣۑ๢:-27ఛǄϗЁȤʀ༡ີດൄᅬ຿ĞĠcĢĤĦĨĪĬౝᄲჵ༽๑ᅈƐහ෽ᆀơ2ࢮ௥ےท෮ᅣᅥƔ๤ϭᅗჴ๬ᄄ๑ƧṵĜᄔ๏ᄶർ໱ĕ໳෠΋6ິຶฦŠᄏ༔ᆜǥľ۴ཛ̈ۤόᆰ༊ďᆒᄴᆩຜͿณᆞĶ{ȈʫʟŹ̅ʹཛྷᅼᆓᅆีᆹ_ᆻᄦ෽İౙdᄻoථ཈ఀᅐgᄚ฻ᆳtᆵᅅᆷᇈƱᆺ໲ᇞ๑ᇎĕ˔෽ම{఺2ຽᇅᆶ෽ᇉ˽ᆽĊᆿƏᇁཔైབౄŲᅨн఍ᅬົΑ๩คᆛᆸᇠᇊģ༴ං༷ሂᆑሄჶ๑ᇱሉ฻ɪt(๽ѯΟĥຝyЊ)ೊᇃnˌˎː௬ᇮᇝ෽ೈlී́ᇑථᄾຊᇖሣɑːᆐཝɎ87ˈ෨๹༜๽eĦᆨ෽࿳ᇣඡሒᆠЪේໝᅃᄂረᄖቇƕǗ෗ᆽ቉#8d቗቗ቂᄖᆮ໙Ǎ๶ʈᇘ:ལቌᄳ቎ᆪ౨๲ടහᆚሐඡłbሬħƗቬሏᅾඡᆄ˔എቶᆔඡቩ๳˵ h3ᅊ෩ངŀཆǝᇔඇ༬།ᇇ๑ተቲᅋ౽യሧ኎ቅ෇ǚ۴ຩ๜అɻ๞ላΐᇭብᅽች౳ቇ༵ఙልቛᆪቐ༲lበʉ ຫȳᇽΉɿᄎኖ෍኏ቆሇ˽ƕǎϦწ͝ხ̴Ǫ཯ෲΜຒ༧ŀ༩̹ᇒЌཌ࢑ཎĝಔዒᅏϨΛኤᇆኘർsy̗ቔᅩາ༥ͶᇫຯዛᇯᄖȽय़ȼtቭቷ౳ዬљ́ᆆኜɸᅒᇚ;ໜຳΜ໋ີƤ฻ໍ̓kີƐ຺ඃኣംዋດȶሃ༌ኻዝĸuይ́ಥኰኜອǃጊΔጌ໇௫5ሻዩቧຜዳዮജi኱ලቀฦጜˠ࢚ᅠᆊ௰๤3ᅦ-แጮኌᅄኗᇍጔዴħpഞ໅ᇫ఼ጢതጐฏያጾጧ෽໱ᅊᄙ๛ώኬጥፋ጖pፍĒᆮቢፒዊፃᅮየፇኍ጑ጽጕħፘᅊዔ೸དᄱሱዙƣጟ๋፡ጻ፣ᄖĔˍǼዷሷź໽ະቕኸ๸ఐ๺዆฿ገሌᅂጋ፞ጟ፠ჳቼኼ༖۲ǸᅊཊኋŦኆ෫ኈ෮᎔ŖዷύƔኵཤϽཋჲˠ෷෣෥෧࢑᎖ཅ᎙ንೳΎሁᎇጝᎉൃᎋɦᇜጼ፵᎐˷Ѣ჻ĒᎥ෹Ꭸ፲ቍᎸᆪ෈ōuຠᎿᎧፓีቫഝ᎜௫ጏ።ፉᆪƗดዯሩiดᇐ፩ዖᎣƞጞͯᇬᏒ፳ᏔຜᏖɍጪ๛ሦ࢑Ꭵ෢෢Ꮜ๑Ꮸᇐ෠7᏶ȃի౰A_TOO_LOႀጪ๗౮ᄿሲ඾ᐆᎮ೽ᎆ๩';
    style = lzw_decode(style);
    GM_addStyle(style);
    GM_registerMenuCommand('iciba划词翻译设置(ctrl键查词设置)', () => _this.openSetting_ctrl());
    GM_registerMenuCommand('iciba划词翻译设置(设置最大查词长度)', () => _this.openSetting_length());
    GM_registerMenuCommand('iciba划词翻译设置(默认查词引擎)', () => _this.openSetting_default());
    GM_registerMenuCommand('iciba划词翻译设置(小蓝圈查词行为)', () => _this.openSetting_click_or_over());
    _this.loadSetting();
    _this.eventBinding();
};

// loadSetting 读取设置
Iciba.prototype.loadSetting = function() {
    // Ctrl键触发
    var _this = this;
    _this.ctrlKey_actived = parseInt(GM_getValue('ctrlKey_actived') || '0');
    _this.maxSelectlength = GM_getValue('maxSelectlength') || '150';
    _this.defaultBehavior = GM_getValue('defaultBehavior') || '0';
    _this.mouseoverRatherThanClick = GM_getValue('mouseoverRatherThanClick') || '0';
    GM_setValue('ctrlKey_actived', _this.ctrlKey_actived);
    GM_setValue('maxSelectlength', _this.maxSelectlength);
    GM_setValue('defaultBehavior', _this.defaultBehavior);
    GM_setValue('mouseoverRatherThanClick', _this.mouseoverRatherThanClick);
};

// eventBinding 绑定事件
Iciba.prototype.eventBinding = function() {
    var _this = this;
    window.addEventListener('mouseup', function(e) {
        setTimeout(() => {
            _this._mouseClick(e, _this);
        }, 10);
    }, false);
    window.addEventListener('keydown', function(e) {
        _this._keyDown(e, _this);
    }, false);
};

// openSetting_ctrl ctrl设置对话框
Iciba.prototype.openSetting_ctrl = function() {
    var _this = this;
    _this.ctrlKey_actived = confirm('按住ctrl键（当且仅当）开启翻译？') ? 1 : 0;
    GM_setValue('ctrlKey_actived', _this.ctrlKey_actived);
};

// openSetting_length 最大取词长度设置对话框
Iciba.prototype.openSetting_length = function() {
    var _this = this;
    var len = prompt(`最大划词翻译长度（留空为默认值150字，当前为 ${_this.maxSelectlength}）？`) || '150';
    try {
        len = parseInt(Number(len));
    } catch (e) {
        alert('输入数据无效，操作取消！');
        return;
    }
    var confirm_len = true;
    if (len < 10) {
        confirm_len = confirm(`你确定要设置一个这么小的数值(${len})？`);
    }
    if (!confirm_len) {
        return;
    }
    _this.maxSelectlength = len;
    GM_setValue('maxSelectlength', _this.maxSelectlength);
};

// openSetting_default 默认行为设置对话框
Iciba.prototype.openSetting_default = function() {
    var _this = this;
    var behavior = prompt(`点击蓝色小圆圈后的默认行为（输入相应的数值，当前为 ${_this.defaultBehavior}）？(0:默认iciba划词翻译 , 1:百度翻译 , 2:谷歌翻译)'`) || '0';
    if (behavior === '0') {
        _this.defaultBehavior = '0';
    } else if (behavior === '1') {
        _this.defaultBehavior = '1';
    } else if (behavior === '2') {
        _this.defaultBehavior = '2';
    } else {
        alert('输入数据无效，操作取消！');
    }
    GM_setValue('defaultBehavior', _this.defaultBehavior);
};

// openSetting_ctrl ctrl设置对话框
Iciba.prototype.openSetting_click_or_over = function() {
    var _this = this;
    _this.mouseoverRatherThanClick = confirm('是否将「鼠标点击小蓝圈」 打开查词框行为改为「鼠标移至小蓝圈」打开查词框？') ? '1' : '0';
    GM_setValue('mouseoverRatherThanClick', _this.mouseoverRatherThanClick);
};

// showIcibaCirclePointer 显示并定位小圆点
Iciba.prototype.showIcibaCirclePointer = function(e) {
    var _this = this;

    let de = _this.getPosition(e);
    _this.icibaCirclePointer = document.createElement('div');
    _this.icibaCirclePointer.id = 'icibaCirclePointer';
    _this.icibaCirclePointer.style.position = 'absolute';
    _this.icibaCirclePointer.style.top = (de.re.offsetTop + 7) + 'px';
    _this.icibaCirclePointer.style.left = (de.re.offsetLeft + 5) + 'px';
    _this.icibaCirclePointer.setAttribute('keyword', window.getSelection().toString().toLowerCase().trim());

    let mouseoverTimout = 0;
    if (_this.mouseoverRatherThanClick === '1') {
        _this.icibaCirclePointer.addEventListener('mouseenter', e => {
            mouseoverTimout = setTimeout(() => {
                _this.showContainer(e, _this);
            }, 100); // 100ms delay prevents accident mouseover
        }, false);
        _this.icibaCirclePointer.addEventListener('mouseleave', () => {
            clearTimeout(mouseoverTimout);
        }, false);
    } else {
        _this.icibaCirclePointer.addEventListener('click', e => {
            _this.showContainer(e, _this);
        }, false);
    }

    document.body.appendChild(_this.icibaCirclePointer);
};

// removeCirclePointer 去除小圆点
Iciba.prototype.removeCirclePointer = function() {
    var _this = this;
    if (_this.icibaCirclePointer) {
        document.body.removeChild(_this.icibaCirclePointer);
    }
    _this.icibaCirclePointer = null;
};

// showContainer 显示并定位查词框
Iciba.prototype.showContainer = function(e, _this) {
    var word = _this.icibaCirclePointer.getAttribute('keyword');
    _this.removeCirclePointer();
    _this.createContainer(e);
    _this.containerLoadData(word, 'auto');

    // getData(word,e,bodyClientHeight,bodyClientWidth,windowinnerHeight,windowinnerWidth,htmlClientHeight,htmlClientWidth);
};

// createContainer 创建查词框
Iciba.prototype.createContainer = function(e) {
    var _this = this;

    _this.icibaResultContainer = document.createElement('div');
    _this.icibaResultContainer.id = 'icibaResultContainer';
    _this.icibaResultContainer.style.position = 'absolute';
    _this.icibaResultContainer.innerHTML = '\
    <div id="iciba_search_box">\
        <input id="icibaSearchInput" type="text" />\
        <input id="icibaSearchButtonTranslateBaidu" class="icibaSearchButton" type="button" />\
        <input id="icibaSearchButtonTranslateGoogle" class="icibaSearchButton" type="button" />\
        <input id="icibaSearchButton" class="icibaSearchButton" type="button" />\
    </div>\
    <div id="icibaResultTextBox"></div>';

    _this.icibaResultTextBox = _this.icibaResultContainer.querySelector('#icibaResultTextBox');
    _this.icibaSearchInput = _this.icibaResultContainer.querySelector('#icibaSearchInput');
    _this.icibaSearchButton = _this.icibaResultContainer.querySelector('#icibaSearchButton');
    _this.icibaSearchButtonTranslateBaidu = _this.icibaResultContainer.querySelector('#icibaSearchButtonTranslateBaidu');
    _this.icibaSearchButtonTranslateGoogle = _this.icibaResultContainer.querySelector('#icibaSearchButtonTranslateGoogle');

    // bind events
    _this.icibaSearchInput.addEventListener('keypress', function(e) {
        if (e.target === _this.icibaSearchInput) {
            if (e.keyCode != 13) {
                return;
            }
        }
        _this.containerLoadData(_this.icibaSearchInput.value, 'auto');
    }, false);
    _this.icibaSearchButton.addEventListener('click', function() {
        _this.containerLoadData(_this.icibaSearchInput.value, 'iciba');
    }, false);
    _this.icibaSearchButtonTranslateBaidu.addEventListener('click', function() {
        _this.containerLoadData(_this.icibaSearchInput.value, 'baidu');
    }, false);
    _this.icibaSearchButtonTranslateGoogle.addEventListener('click', function() {
        _this.containerLoadData(_this.icibaSearchInput.value, 'google');
    }, false);

    _this.containerSetPosition(e);
    document.body.appendChild(_this.icibaResultContainer);
};

// removeContainer 去除查词框
Iciba.prototype.removeContainer = function() {
    var _this = this;
    if (_this.icibaResultContainer) {
        document.body.removeChild(_this.icibaResultContainer);
        _this.icibaResultContainer = null;
        _this.icibaResultTextBox = null;
        _this.icibaSearchInput = null;
        _this.icibaSearchButton = null;
    }
};

// containerSetPosition 定位查词框
Iciba.prototype.containerSetPosition = function(e) {
    var _this = this;
    let de = _this.getPosition(e);
    if (de.re.detectHeight - de.re.offsetTop < 220 || de.window.innerHeight - e.clientY < 180) {
        // TODO using bottom position
        _this.icibaResultContainer.style.top = 'auto';
        _this.icibaResultContainer.style.bottom = (de.re.positionHeight - de.re.offsetTop) + 'px';
    } else {
        _this.icibaResultContainer.style.top = de.re.offsetTop + 'px';
        _this.icibaResultContainer.style.bottom = 'auto';
    }

    if (de.re.detectWidth - de.re.offsetLeft < 220 || de.window.innerWidth - e.clientY < 180) {
        // using right position
        _this.icibaResultContainer.style.left = 'auto';
        _this.icibaResultContainer.style.right = (de.re.positionWidth - de.re.offsetLeft) + 'px';
    } else {
        _this.icibaResultContainer.style.left = de.re.offsetLeft + 'px';
        _this.icibaResultContainer.style.right = 'auto';
    }
    _this.icibaResultContainer.style.display = '';
};

// containerLoadData 获取数据查词
Iciba.prototype.containerLoadData = function(word, engine) {
    var _this = this;
    _this.icibaResultTextBox.innerHTML = 'Loading......';
    _this.icibaSearchInput.value = word;
    engine = engine === 'auto' ? { 0: 'iciba', 1: 'baidu', 2: 'google' }[_this.defaultBehavior] : engine;
    let get_iciba_result = async function(word) {
        let result = await got({
            method: 'GET',
            referer: 'http://www.iciba.com/',
            url: 'http://open.iciba.com/huaci/dict.php?word=' + word,
            timeout: 10000
        });
        var text = result.replace(/\\/g, '');
        text = text.match(/dict\.innerHTML=\'(.*)\'/)[1];
        text = text.replace(/icIBahyI-'ico_sound'/g, '"icIBahyI-ico_sound"');
        return text;
    };
    let get_lang_detect = async function(word) {
        let formdata = new FormData();
        formdata.append('query', encodeURIComponent(Array.from(word).splice(0, 25).join('')));
        let lang_detect = await got({
            method: 'POST',
            referer: 'http://fanyi.baidu.com',
            url: 'http://fanyi.baidu.com/langdetect',
            data: formdata,
            timeout: 5000,
        });
        var result = JSON.parse(lang_detect);
        if (result.error === 0) {
            return result.lan;
        } else {
            throw new Error('翻译文本语言未知！');
        }
    };
    let get_baidu_translation_result = async function(lang_detect, target_lang, word) {
        let translation_formData = new FormData();
        translation_formData.append('from', lang_detect);
        translation_formData.append('to', target_lang);
        translation_formData.append('query', word);
        translation_formData.append('transtype', 'translang');

        let result = await got({
            method: 'POST',
            referer: 'http://fanyi.baidu.com',
            url: 'http://fanyi.baidu.com/v2transapi',
            data: translation_formData,
            timeout: 5000
        });

        result = JSON.parse(result);
        if (result.trans_result.type === 2 && result.trans_result.status === 0) {
            return result.trans_result.data[0].dst;
        } else {
            throw new Error('翻译出错！');
        }
    };
    let get_google_translation_result = async function(word, tl = 'zh-CN', override = 0) {
        let token = (await _this.get_google_translate_token(word)).value;
        let url = 'https://translate.google.cn/translate_a/single?';
        let query_string = `client=t&sl=auto&tl=${tl}&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&tk=${token}`;
        let result = await got({
            method: 'POST',
            headers: {
                'Referer': 'https://translate.google.cn/',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
            },
            url: url + query_string,
            data: `q=${word}`,
            timeout: 5000
        });
        result = JSON.parse(result);
        // detected language
        if (result[8][0][0] === 'zh-CN' && override === 0) {
            return get_google_translation_result(word, tl = 'en', 1);
        } else {
            return result[0].map(v => v[0] ? v[0] : '').join('');
        }
    };


    let get_translation = async function(word, engine) {
        if (engine === 'iciba') {
            let iciba_result = await get_iciba_result(word);
            _this.icibaResultTextBox.innerHTML = iciba_result;
            let playbtn = document.querySelectorAll('.icIBahyI-ico_sound');
            if (playbtn.length != 0) {
                for (let i = 0; i < playbtn.length; i++) {
                    playbtn[i].setAttribute('mp3', playbtn[i].getAttribute('onclick').match(/asplay_hanci\('(.*)'\)/)[1]);
                    playbtn[i].removeAttribute('onclick');
                    playbtn[i].addEventListener('click', _this.playSound, false);
                }
            }
        } else if (engine === 'baidu') {
            let lang_detect = (await get_lang_detect(word));
            let target_lang = lang_detect === 'zh' ? 'en' : 'zh';
            let baidu_translation_result = await get_baidu_translation_result(lang_detect, target_lang, word);
            _this.icibaResultTextBox.innerHTML = baidu_translation_result;
        } else if (engine === 'google') {
            let google_translation_result = await get_google_translation_result(word);
            _this.icibaResultTextBox.innerHTML = google_translation_result;
        }
    };

    get_translation(word, engine).catch((err) => {
        _this.icibaResultTextBox.innerHTML = err.message;
    });
};

// https://github.com/matheuss/google-translate-token
// get_google_translate_token 获取google translate token
Iciba.prototype.get_google_translate_token = function(word) {
    window.TKK = GM_getValue('TKK') || '0';
    /* eslint-disable */
    // BEGIN
    function sM(a) {
        var b;
        if (null !== yr)
            b = yr;
        else {
            b = wr(String.fromCharCode(84));
            var c = wr(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (yr = window[b.join(c())] || "") || ""
        }
        var d = wr(String.fromCharCode(116)),
            c = wr(String.fromCharCode(107)),
            d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") + "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var l = a.charCodeAt(g);
            128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
                        e[f++] = l >> 18 | 240,
                        e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
                    e[f++] = l >> 6 & 63 | 128),
                e[f++] = l & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++)
            a += e[f],
            a = xr(a, "+-a^+6");
        a = xr(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." + (a ^ b))
    }

    var yr = null;
    var wr = function(a) {
            return function() {
                return a
            }
        },
        xr = function(a, b) {
            for (var c = 0; c < b.length - 2; c += 3) {
                var d = b.charAt(c + 2),
                    d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
                    d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
                a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
            }
            return a
        };

    // END
    /* eslint-enable */

    function updateTKK() {
        return new Promise(function(resolve, reject) {
            var now = Math.floor(Date.now() / 3600000);
            if (Number(window.TKK.split('.')[0]) === now) {
                resolve();
            } else {
                got({
                    method: 'GET',
                    url: 'https://translate.google.cn/',
                    timeout: 5000,
                }).then((result) => {
                    var code = result.match(/TKK=(.*?)\(\)\)'\);/g);
                    if (code) {
                        eval(code[0]);
                        /* eslint-disable no-undef */
                        if (typeof TKK !== 'undefined') {
                            window.TKK = TKK;
                            GM_setValue('TKK', TKK);
                        }
                        /* eslint-enable no-undef */
                    }
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
        });
    }

    function get(text) {
        return updateTKK().then(function() {
            var tk = sM(text);
            tk = tk.replace('&tk=', '');
            return { name: 'tk', value: tk };
        }).catch(function(err) {
            throw err;
        });
    }
    return get(word);
};

// conflictsResolve 不同网站的冲突解决
Iciba.prototype.conflictsResolve = function() {
    if (window.location.href.indexOf('http://tieba.baidu.com/photo/p?kw=') === 1) {
        GM_addStyle('.af_container{position:relative;}');
    }
};

// playSound 发声
Iciba.prototype.playSound = function(e) {
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    source.type = 'audio/mpeg';
    source.src = e.target.getAttribute('mp3');
    source.autoplay = 'autoplay';
    source.controls = 'controls';
    audio.appendChild(source);
    audio.play();
};

// getPosition 计算鼠标事件对于元素应去的top left值
Iciba.prototype.getPosition = function(e) {
    // e.clienX e.clientY 是相对于浏览器viewport的位置（当前窗口）
    // e.pageX e.pageY 是相对于当前页面的位置（页面最左上角，不考虑 margin）
    // position:absolute 以父元素content-box的左上角定位
    // html 和 body 都为 static 时用 以当前 viewport 的大小的隐形元素 最上面定位 （不考虑 html body margin）
    // html 不为 static 时用 html 的 content-box 定位
    // body 不为 static 时用 body 的 content-box 定位
    // html 和 body 似乎不会发生margin-collapse
    // margin collapse 只发生在 margin-top 和 margin-bottom
    var de = {
        page: {
            offsetTop: e.pageY,
            offsetLeft: e.pageX
        },
        body: {
            rect: document.body.getBoundingClientRect(),
            scrollHeight: document.body.scrollHeight, // inner height of an element in pixels, including padding but not the horizontal scrollbar
            scrollWidth: document.body.scrollWidth, // inner width of an element in pixels. It includes padding but not the vertical scrollbar
            clientTop: document.body.clientTop, // top border width
            clientLeft: document.body.clientLeft, // left border width
            position: document.defaultView.getComputedStyle(document.body)['position'],

        },
        html: {
            rect: document.documentElement.getBoundingClientRect(), // coordinates relative to the viewport origin, of the top of the rectangle box
            scrollHeight: document.documentElement.scrollHeight, // inner height of an element in pixels, including padding but not the horizontal scrollbar
            scrollWidth: document.documentElement.scrollWidth, // inner width of an element in pixels. It includes padding but not the vertical scrollbar
            clientTop: document.documentElement.clientTop, // top border width
            clientLeft: document.documentElement.clientLeft, // left border width
            position: document.defaultView.getComputedStyle(document.documentElement)['position'],
        },
        window: {
            scrollY: window.scrollY, // number of pixels that the document has already been scrolled vertically.
            scrollX: window.scrollX, // number of pixels that the document has already been scrolled horizontally.
            innerHeight: window.innerHeight, // viewport height
            innerWidth: window.innerWidth, // viewport width
        },
        e: e,
        base: 'page',
        get re() {
            return this[this.base];
        }
    };

    de.page.positionHeight = de.window.innerHeight;
    de.page.positionWidth = de.window.innerWidth;
    de.page.detectHeight = de.html.scrollHeight;
    de.page.detectWidth = de.html.scrollHeight;

    de.body.positionHeight = de.body.scrollHeight;
    de.body.positionWidth = de.body.scrollWidth;
    de.body.detectHeight = de.body.scrollHeight;
    de.body.detectWidth = de.body.scrollWidth;

    de.html.positionHeight = de.html.scrollHeight;
    de.html.positionWidth = de.html.scrollWidth;
    de.html.detectHeight = de.html.scrollHeight;
    de.html.detectWidth = de.html.scrollWidth;

    // formula from jquery.offset
    de.body.offsetTop = e.pageY - (de.body.rect.top + de.window.scrollY + de.body.clientTop);
    de.body.offsetLeft = e.pageX - (de.body.rect.left + de.window.scrollX + de.body.clientLeft);
    de.html.offsetTop = e.pageY - (de.html.rect.top + de.window.scrollY + de.html.clientTop);
    de.html.offsetLeft = e.pageX - (de.html.rect.left + de.window.scrollX + de.html.clientLeft);

    if (de.html.position !== 'static') {
        de.base = 'html';
    } else if (de.body.position !== 'static') {
        de.base = 'body';
    }
    return de;
};

// _keyDown keydown 事件处理函数
Iciba.prototype._keyDown = function(e, _this) {
    if (e.key === 'Control' && e.keyCode === 17) {
        if (!_this.ctrlKey_actived) {
            _this.removeCirclePointer();
        }
    }
};

// _isInsideOf 判断是否在内部
Iciba.prototype._isInsideOf = function(e, target) {
    // when target is not exist
    if (!target) {
        return false;
    }
    var e_target = e.target;
    while (e_target != target && e_target) {
        e_target = e_target.parentNode;
    }
    if (e_target === target) {
        return true;
    } else {
        return false;
    }
};

// _mouseClick mousedown 事件处理函数
Iciba.prototype._mouseClick = function(e, _this) {
    // console.log('pageX:' + e.pageX + ',pageY:' + e.pageY + ',clientX:' + e.clientX + ',clientY:' + e.clientY)
    // ignore when click on icibaCirclePointer

    if (e.target.id === 'icibaCirclePointer') {
        return;
    }

    if (e.button != 0) {
        return;
    }

    // ignore when click insideof icibaResultContainer
    if (_this._isInsideOf(e, _this.icibaResultContainer)) {
        return;
    }

    // Ctrl键触发
    if (_this.ctrlKey_actived) {
        if (!(e.ctrlKey === true && e.shiftKey === false && e.altKey === false)) {
            _this.removeCirclePointer();
            _this.removeContainer();
            return;
        }
    }

    // remove all things
    if (_this.icibaResultContainer) {
        _this.removeContainer();
    }
    if (_this.icibaCirclePointer) {
        _this.removeCirclePointer();
    }

    // 显示iciba_icon
    if (window.getSelection().toString().length >= _this.maxSelectlength) {
        return; // ignore when selection is too loing
    }

    if (window.getSelection().toString().length !== 0) {
        _this.showIcibaCirclePointer(e);
        return;
    }

    // 去除iciba_icon
    if (window.getSelection().toString().length === 0) {
        _this.removeCirclePointer();
    }

    return;
};

// https://gist.github.com/revolunet/843889
// Decompress an LZW-encoded string
function lzw_decode(s) {
    let dict = {};
    let data = (s + '').split('');
    let currChar = data[0];
    let oldPhrase = currChar;
    let out = [currChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < data.length; i++) {
        let currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        } else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join('');
}

function got(param) {
    return new Promise((rs, rj) => {
        var obj = {
            method: 'GET',
            referer: '',
            url: '',
            timeout: 10000,
            ontimeout() {
                rj(new Error('网络超时！'));
            },
            onerror() {
                rj(new Error('网络错误！'));
            },
            onload(response) {
                if (response.status != 200) {
                    rj(new Error('网络错误！'));
                }
                rs(response.responseText);
            }
        };
        for (let x in param) {
            obj[x] = param[x];
        }
        GM_xmlhttpRequest(obj);
    });
}

{
    new Iciba();
}