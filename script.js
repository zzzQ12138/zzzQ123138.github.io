document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.getElementById('closeBtn');
    const boxTexts = [
        { text: "论语体例", modalText: "论语是记录孔子及其弟子言行为主的汇编，是一部优秀的语录体散文集，记录特点言简意赅，含蓄隽永。" },
        { text: "儒家文化的当代意义", modalText: "①道德价值：市场经济需道德支撑，儒家“以义制利、忠恕之道、互信互利”契合市场经济与现代公民社会的基本价值取向，可补当代道德缺失，助力信用体系建设.②教育价值：孔子“有教无类”、朱熹“学习终身性与知行合一”思想，对解决应试与素质教育相矛盾、学校教育与社会需求相脱节问题有十分重要的意义。③政治价值：儒家“仁政、民本（轻刑薄税等）”及“和”的思想，与建设社会主义和谐社会相通。同时强调，儒家文化要与现代公民教育适配，需“去糟粕、取精华” 。" },
        { text: "战国策是谁的思想" , modalText: "2.纵横家，在政治上他们崇尚谋略，强调审时度势、举贤任能，在人生观上则是追求功名显达，富贵利禄。"},
        { text: " 战国七雄" , modalText: "秦，楚，燕，韩，赵，魏，齐"},
        { text: "苏秦的人生观", modalText: "功利主义，以现实的功名和利益为根本，为了获得名利而讲求积极进取、勤奋苦练，重视在现实中积极行动和理论的实践" },
        { text: "狡兔三窟" , modalText: "一窟指得到封地薛城人民的拥戴，有安身之处。二窟指取得相国之位、巩固在齐国的地位。三窟指请求齐王在薛地建立宗庙，使安全更有保障"},
        { text: "史记体例", modalText: "我国第一部纪传体通史，全书一百三十篇，包括十二本纪（黄帝时代到西汉武帝的故事），三十世家，七十列传，十表，八书" },
        { text: "项羽失败原因" , modalText: "性格缺陷：感情用事、自大自满，战略失误：在关键时刻未能采取果断行动，例如在鸿门宴上未能杀掉刘邦，没能利用降兵等"},
        { text: "李广难封原因", modalText: "时代背景：汉武帝登基后，采取积极反击匈奴的措施，　在对匈奴消极防御环境下成长起来的李广，必然就显得“江郎才尽。个人原因：性格缺陷：李广心胸狭隘，还表现在不会放过自己。战略失误：李广更擅长近战格斗而非战略指挥" },
        { text: "建安风骨", modalText: "也称汉魏风骨，是指建安时期的作家反映社会动乱、民生疾苦和抒写雄心壮志时所形成的悲凉慷慨、明朗刚健的写作风格。代表作家是“三曹”、“建安七子”和蔡琰。 继承了汉乐府民歌的现实主义传统，广泛而深刻地反应社会现实生活，充满积极进取精神，情调慷慨悲凉。包含对民生疾苦的关怀以及廓清天下的盼望，悲天悯人的情操配合建功立业的壮志，正是建安风骨的精髓。" },
        { text: "三曹", modalText: "曹操：丞相之尊，雅爱诗章，古直苍凉。曹丕：帝王之重，妙善辞赋，文秀婉细。曹植：公子之毫，下笔琳琅，词采华茂。" },
        { text: "曹植代表作", modalText: "《七步诗》《白马篇》《洛神赋》" },
        { text: "燕歌行赏析", modalText: "一、情景交融的意境：诗歌以“秋风萧瑟”“草木摇落”等意象开篇，将自然萧瑟与人物孤寂相融合。通过环境描写展示动态画面与思妇“茕茕守空房”的静态孤独形成对照，烘托出“忧来思君不敢忘”的绵长愁绪。​二、细腻婉转的情感：全诗通过四层心理转折展现思妇情感：从思念、疑虑、悲情再到自我排遣，最终以诘问收束，使情感表达层层深入。全诗反映的是秦汉以来四百年间的历史现象，同时也是他所亲处的建安时期的社会现实，表现了作者对下层人民疾苦的关心与同情。《燕歌行》还被誉为“七言之祖”" },
        { text: "蒿里行赏析" , modalText: "全诗用了简洁明了的白描手法，用极凝练的语言记叙了关东之师从聚合到离散的过程，在揭露军阀祸国殃民的同时，表现出对人民的无限同情和对国事的关注和担忧，反映了诗人的忧国忧民之心。"},
        { text: "建安七子", modalText: "王粲、孔融、陈琳、徐幹、阮瑀、应玚、刘桢，王粲被誉为“七子之冠冕”" },
        { text: "李白诗歌的艺术特色", modalText: "李白是继屈原之后我国最伟大的浪漫主义诗人。具有鲜明个性和震撼人心的艺术力量。他的诗歌根据不同的四象和感情表现出多种多样的风格，《蜀道难》中“上有六龙回日之高标，下有冲波逆折之回川”体现了他的磅礴气势与超现实想象，《行路难》中“长风破浪会有时，直挂云帆济沧海”表达了其诗情感喷发直接强烈，语言不拘格律，《早发白帝城》中“朝发白帝彩云间，千里江陵一日还”体现了其想象跳跃性强，常突破时空限制，融合现实与幻境。" },
        { text: "唐宋八大家", modalText: "唐代韩愈、柳宗元和宋代欧阳修、苏洵、苏轼、苏辙、王安石、曾巩" },
        { text: "苏轼坎坷的一生" , modalText: "苏轼一生经历四朝皇帝，政治正在纷纷扰扰的党争迭起之中，他一生反复的入朝和贬官，但面对贬谪之繁、磨难之重，他以旷达超然的情怀面对窘迫，以乐观幽默淡化悲剧，在人生艺术化的努力中超脱苦难。"},
        { text: "元杂剧四大家", modalText: "关汉卿、郑光祖、白朴、马致远" },
        { text: "元朝四大爱情剧", modalText: "王实甫《西厢记》、关汉卿《拜月亭》、白朴《墙头马上》、郑光祖《倩女离魂》" },
        { text: "元朝四大悲剧", modalText: "关汉卿《窦娥冤》、马致远《汉宫秋》、白朴《梧桐雨》、纪君祥《赵氏孤儿》" },
        { text: "西厢记有哪些方面的突破", modalText: "1.突破了元杂剧的一本四折有更多的体量2.并未一人主唱而是多个角色都有戏份3.内容上通过心理描写和情感的递进来宣传自己的思想" },
        { text: "金陵十二衩", modalText: "贾府四春：贾元春、贾探春、贾迎春、贾惜春。贾府的媳妇：李纨、秦可卿、王熙凤。贾宝玉的表姐：林黛玉，薛宝钗，史湘云。贾宝玉的侄女：贾巧姐。尼姑：妙玉" },
        { text: "木石前盟", modalText: "指贾宝玉与林黛玉之间的前世姻缘。木指林黛玉，前世是绛珠草；石指贾宝玉，前世是顽石。这个词语象征着他们之间深厚的情感和命运的纠缠，表达了知己之爱的隐喻。" },
         { text: "林黛玉薛宝钗人物分析", modalText: "林黛玉与薛宝钗是《红楼梦》中截然不同的两位女性代表，其性格对比深刻体现了作者对人性、时代与命运的思考：林黛玉：1.敏感多思：寄人篱下的身世（父母双亡、依附贾府）养成她敏锐的洞察力与不安全感。2.孤高傲世，叛逆精神：既因才华自信，又因身世自卑，言语刻薄实为保护脆弱内心的铠甲。3.悲剧宿命性：“木石前盟”象征自然情感，却败给“金玉良缘”的世俗规则。焚稿断痴情之举，宣告她对污浊世界的彻底决裂。薛宝钗：1.周全圆融，世故通达：出身皇商之家，深谙人情世故，展现治世之才。2.克己复礼，压抑天性：遵奉封建规范，劝宝玉读圣贤书、黛玉少读杂书。即便对宝玉有情，亦以“端庄”克制情感。3.务实主义与妥协性：接受“金玉良缘”安排，婚后以“举案齐眉”维系婚姻形式，最终在宝玉出家后独守空闺，成为家族利益的牺牲品。" },
        { text: "阿Q人物形象", modalText: "精神麻痹：现实屡屡受辱，却用幻想自我麻痹，恃强凌弱。奴性逻辑：被剥削者却维护剥削制度；渴求“革命”改变命运，却不懂革命真义。思想蒙昧：热衷“祖宗阔过”的虚妄，盲目排斥新事物" },
        { text: "鲁迅的小说集", modalText: "《呐喊》 《彷徨》 《故事新编》" },
         { text: "鲁迅的散文集", modalText: "《朝花夕拾》" },
        { text: "鲁迅的散文诗集", modalText: "《野草》" },
        { text: "鲁迅的杂文集", modalText: "《热风》《坟》《华盖集》《南北腔调集》" },
        { text: "张爱玲的作品", modalText: "《金锁记》——曹七巧。《倾城之恋》（唯一一部团圆结局）——白流苏、范柳原。《半生缘》（原名十八春）——顾曼桢、沈世钧​。唯一一部学术著作——《红楼梦魇》" },
        { text: "郭沫若代表了五四精神的诗", modalText: "《女神》" },
        { text: "闻一多的三美法则", modalText: "绘画美、音乐美、建筑美" },
        { text: "第一部白话诗集", modalText: "胡适的《尝试集》" },
        { text: "各派诗人", modalText: "新月派——闻一多、徐志摩。象征派——李金发、穆木天。现代派——戴望舒。九叶派——穆旦。朦胧派——北岛、顾城、舒婷。鲁迅说的最杰出的抒情诗人——冯志。童话诗人——顾城" },
        { text: "网络文学和传统文学相比的利弊", modalText: "利：网络的宽容和自由使文学的创作主体、内容、方式都不再需要社会和权威的认定，呈现出平民化、开放性的特征，自由发表和交流，突破了传统文学的束缚，任何人都可以去参与和评判。弊：由于网络信息的即时传递性，网络文学在写作、阅读、反馈上都十分迅速，不同于传统文学的精雕细刻，被称为“快餐文学”。" },
        { text: "网络文学有哪些解构特征", modalText: "1.反经典、反权威，对大文学祛魅2.反对二元对立3.不追求本质意义4.有虚无主义的倾向" },
        { text: "古希腊文学的特点", modalText: "1.生命意识，肯定生命本身，赞颂自由；强调命运的绝对2.人本意识，不压抑以人为本的本性3.反抗意识，崇尚对阻碍生命发展的命运力量" },
        { text: "三大悲剧作家", modalText: "埃斯库罗斯——《被缚的普罗米修斯》《俄瑞斯忒亚》。索福克勒斯——《埃阿斯》《安提戈涅》。欧里庇得斯——《美狄亚》《特洛伊妇女》《酒神的伴侣》" },
        { text: "荷马史诗", modalText: "《伊利昂纪》、《奥德修纪》" },
        { text: "半人半神的英雄", modalText: "赫拉克勒斯" },
        { text: "文艺复兴的概念", modalText: "14-17世纪初，欧洲资产阶级对抗封建神学，建立以人为主的新文化运动" },
        { text: "文艺复兴作品的主要特征", modalText: "1.强调人权，反对神权。2.用个性解放来反对禁欲主义。3.提倡理性，反对蒙昧主义" },
        { text: "文艺复兴各国代表作", modalText: "意大利：彼特拉克(被誉为“文艺复兴之父”)《歌集》、薄伽丘《十日谈》、但丁《神曲》。法国：拉伯雷《巨人传》。英国：莎士比亚《哈姆雷特》、《麦克白》、《李尔王》、《奥赛罗》。西班牙：塞万提斯《堂吉诃德》。"},
        { text: "莎士比亚的四大悲剧四大喜剧", modalText: "悲：《哈姆雷特》、《奥赛罗》、《李尔王》、《麦克白》喜：《仲夏夜之梦》、《威尼斯商人》、《第十二夜》、《皆大欢喜》" },
        { text: "《唐山大地震》作者", modalText: "钱铜" },
        { text: "莎士比亚喜剧创作走向成熟的标志", modalText: "《仲夏夜之梦》" },
        { text: "绮思梦达出自", modalText: "《十日谈》" },
        { text: "女娲补天和后羿射日出自", modalText: "《淮南子》" },
        { text: "鲧禹治水出自", modalText: "《山海经》" },
        { text: "表现了原始初民与大自然的抗争的古代神话", modalText: "《后羿射日》" },
        { text: "张爱玲唯一一部以喜剧结尾的小说", modalText: "《倾城之恋》" },
        { text: " “我手写我口”出自", modalText: "黄遵宪" },
        { text: "魏国信陵君叫", modalText: "魏无忌" },
        { text: "结合实例说说什么叫建安风骨", modalText: "​现实关怀——直面乱世苦难，如曹操《蒿里行》'白骨露于野'揭露战争惨烈；​进取精神——抒写理想抱负，如曹植《白马篇》'捐躯赴国难，视死忽如归'；。悲慨之气——融合时代悲情与个人壮志，如王粲《七哀诗》'南登霸陵岸，回首望长安'。" },
        { text: "元杂曲的角色", modalText: "旦、末、净、杂" },
    ];
    const boxes = [];
    let animationId;
    let isPaused = false;

    // 随机选择部分盒子显示（每次刷新显示不同的8个，可通过修改DEFAULT_BOX_COUNT调整数量）
    const DEFAULT_BOX_COUNT = 8;
    const shuffledWithIndices = boxTexts
        .map((text, index) => ({ text, index }))
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(DEFAULT_BOX_COUNT, boxTexts.length));

    // 创建盒子
    for (let i = 0; i < shuffledWithIndices.length; i++) {
        const { text, index } = shuffledWithIndices[i];
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = text.text;
        box.dataset.index = index;
        container.appendChild(box);
        boxes.push(box);
    }

    // 初始化盒子位置（无重叠）
    function initBoxes() {
        const placedBoxes = [];
        boxes.forEach(box => {
            const boxWidth = box.offsetWidth;
            const boxHeight = box.offsetHeight;
            let x, y;
            let attempts = 0;
            const maxAttempts = 50;
            let overlapping;

            // 尝试生成不重叠的位置
            do {
                overlapping = false;
                x = Math.random() * (window.innerWidth - boxWidth);
                y = Math.random() * (window.innerHeight - boxHeight);

                // 检查与已放置盒子的重叠
                for (const placedBox of placedBoxes) {
                    const dx = x - placedBox.x;
                    const dy = y - placedBox.y;
                    const minDist = boxWidth / 2 + placedBox.width / 2 + 20; // 20px间距
                    if (dx * dx + dy * dy < minDist * minDist) {
                        overlapping = true;
                        break;
                    }
                }
                attempts++;
            } while (overlapping && attempts < maxAttempts);

            // 如果多次尝试仍重叠，强制放置（避免无限循环）
            box.style.left = `${x}px`;
            box.style.top = `${y}px`;
            placedBoxes.push({ x, y, width: boxWidth, height: boxHeight });
        });
    }

    // 显示模态框
    function showModal(box) {
    const index = parseInt(box.dataset.index);
    const boxRect = box.getBoundingClientRect();
    
    // 检查索引有效性
    if (isNaN(index) || !boxTexts[index] || !boxTexts[index].modalText) {
        modalText.textContent = '暂无相关内容';
    } else {
        modalText.textContent = boxTexts[index].modalText;
    }
    
    modal.style.display = 'block';
    
    // 计算模态框位置（下方空间不足则显示在上方）
    const modalHeight = modal.offsetHeight;
    const windowHeight = window.innerHeight;
    const boxBottom = boxRect.bottom + window.scrollY;
    const spaceBelow = windowHeight - boxBottom - 10;
    
    // 如果下方空间不足，显示在上方
    if (spaceBelow < modalHeight) {
        modal.style.top = `${boxRect.top + window.scrollY - modalHeight - 10}px`;
    } else {
        modal.style.top = `${boxRect.bottom + window.scrollY + 10}px`;
    }
    modal.style.left = `${boxRect.left + window.scrollX}px`;
    
    // 确保模态框不超出左侧边界
    const modalWidth = modal.offsetWidth;
    if (parseInt(modal.style.left) + modalWidth > window.innerWidth + window.scrollX) {
        modal.style.left = `${window.innerWidth + window.scrollX - modalWidth}px`;
    }
    
    document.body.classList.add('blur-background');
    toggleAnimation(true);
}

    // 隐藏模态框
    function hideModal() {
        modal.style.display = 'none';
        document.body.classList.remove('blur-background');
        boxes.forEach(box => box.classList.remove('selected'));
        toggleAnimation(false);
    }

    // 事件监听
    boxes.forEach(box => {
        // 点击事件
        box.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            showModal(box);
        });
    });

    // 关闭按钮事件
    closeBtn.addEventListener('click', hideModal);

    // 窗口大小改变时重新初始化
    window.addEventListener('resize', initBoxes);

    // 初始化静态位置
    initBoxes();
});