document.addEventListener('DOMContentLoaded', () => {

  const clobtn = document.getElementById('clo-btn');
  const infbox = document.getElementById('inf-box');
  const mod = document.getElementById('mod');
  const modtext = document.getElementById('mod-text');

  const reclobtn = document.getElementById('re-clo-btn');
  const addbox = document.getElementById('add-box');
  const add = document.getElementById('add');
  const textinput = document.getElementById('text-input');
  const areainput = document.getElementById('area-input');
  const subbtn = document.getElementById('sub-btn');
  const main = document.querySelector('main');

  const seclobtn = document.getElementById('se-clo-btn');
  const ranbox = document.getElementById('ran-box');
  const coubox = document.getElementById('cou-box');
  const couinput = document.getElementById('cou-input');
  const serbtn = document.getElementById('ser-btn');

  const delbox = document.getElementById('del-box');

  const clebox = document.getElementById('cle-box');







  //创建存储词条数据的数组，每个元素都是包含text和conten的对象
  let worddatas = [];

  //创建存储词条DOM的数组
  const wordspaces = [];

  //创建一个状态变量用来实现函数的切换
  let att = true;

  //创建一个状态变量实现删除模式
  let ddl = true;













  function showmod() {
    modtext.innerHTML = `这是一个记忆辅助网页：看见词条时尝试回忆相关知识，不确定时点击查看详情。<br>
    可通过‘添加’、‘删除’和‘清空’功能管理词条。
    <br>‘随机’功能可随机显示部分词条，‘数量’功能可调整显示数量。`;
    mod.style.display = 'block'
    mod.style.left = '50%';
    mod.style.top = '40%';
    mod.style.transform = 'translate(-50%, -50%)';
  }

  function showadd() {
    add.style.display = 'block'
    add.style.left = '50%';
    add.style.top = '50%';
    add.style.transform = 'translate(-50%, -50%)';
  }

  function showcou() {
    cou.style.display = 'block'
    cou.style.left = '50%';
    cou.style.top = '50%';
    cou.style.transform = 'translate(-50%, -50%)';
  }

  function hidecou() {
    cou.style.display = 'none'
  }

  function hidemod() {
    mod.style.display = 'none'
  }

  function hideadd() {
    add.style.display = 'none'
  }

  //定义一个函数用来初始化词条的位置
  function wordplace() {

    //创建数组存放词条和内容的尺寸
    const wordsizes = [];

    //获取创建的词条的尺寸
    const newword = wordspaces[wordspaces.length - 1];
    const { offsetWidth: wordwidth, offsetHeight: wordheight } = newword;
    let x, y, i = 0, t;

    //让词条生成的位置不超过边界，并循环尝试生成不重叠的位置
    do {
      //重置重叠标志
      t = false;
      x = Math.random() * (main.clientWidth - wordwidth);
      y = Math.random() * (main.clientHeight - wordheight - 50);
      //检查当前位置是否与已放置的词条重叠
      for (const old of wordsizes) {
        if (
          x > old.x - wordwidth &&
          x < old.x + old.width &&
          y > old.y - wordheight &&
          y < old.y + old.height
        ) {
          i = true;
          break;
        }
      }
    } while (i && i++ < 50);// 当重叠且未达最大尝试次数时继续尝试

    //设置词条位置,使用Object.assign批量设置样式
    Object.assign(newword.style, { left: `${x}px`, top: `${y}px` });

    //将创建的盒子的位置存入数组备份
    wordsizes.push({ x, y, width: wordwidth, height: wordheight });
  }

  //定义一个函数用来随机显示词条
  function ranword() {
    //隐藏所有词条
    wordspaces.forEach(word => word.style.display = 'none');

    //复制词条数组用于洗牌
    const rewordspaces = [...wordspaces];

    //调用备份数组实现乱序
    for (let i = rewordspaces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rewordspaces[i], rewordspaces[j]] = [rewordspaces[j], rewordspaces[i]];
    }
    //显示指定数量的词条
    const count = couinput.value;
    const ranwordspaces = Math.ceil(count);
    for (let i = 0; i < ranwordspaces; i++) {
      rewordspaces[i].style.display = 'block';
    }
  }

  //定义函数显示全部词条
  function imranword() {
    wordspaces.forEach(word => word.style.display = 'block');
  }








  infbox.addEventListener('click', showmod);
  clobtn.addEventListener('click', hidemod);

  addbox.addEventListener('click', showadd);
  reclobtn.addEventListener('click', hideadd);

  ranbox.addEventListener('click', () => {
    //通过点击来切换显示模式
    if (att) {
      ranword();
      coubox.classList.remove('disabled');



    } else {
      imranword();
      coubox.classList.add('disabled');



    }
    att = !att;
  });

  coubox.addEventListener('click', () => {
    if (coubox.classList.contains('disabled')) {
      return;
    }
    showcou();
  });
  seclobtn.addEventListener('click', hidecou);
  serbtn.addEventListener('click', hidecou);


  subbtn.addEventListener('click', () => {
    const text = textinput.value.trim();
    const area = areainput.value.trim();
    if (text && area) {
      //如果text和area都有数据，则执行
      // 创建词条并将数据添加至词条库
      worddatas.push({ text, area });

      //创建词条
      const word = document.createElement('div');
      word.classList.add('word');
      word.textContent = text;
      main.appendChild(word);
      wordspaces.push(word);


      //清空表单
      textinput.value = '';
      areainput.value = '';
      add.style.display = 'none';

      //调用函数初始化词条位置
      wordplace();

      //添加点击词条展示详情事件,
      word.addEventListener('click', () => {
        showmod()
        modtext.innerHTML = area;
      })

      //创建删除按钮
      const delbtn = document.createElement('span')
      delbtn.classList.add('clobtn');
      delbtn.innerHTML = '&times;';
      delbtn.style.display = 'none';
      word.appendChild(delbtn);

      delbtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        
        // 从数组中移除对应的词条数据
        const index = wordspaces.indexOf(word);
        if (index !== -1) {
          worddatas.splice(index, 1);
          wordspaces.splice(index, 1);
        }
        // 从DOM中移除词条
        main.removeChild(word);
      });

    }
  });

  // 实现删除功能
  delbox.addEventListener('click', () => {
    ddl = !ddl; 

    // 显示或隐藏所有词条的删除按钮
    const delbtns = document.querySelectorAll('.clobtn');
    delbtns.forEach(btn => {
      btn.style.display = ddl ? 'block' : 'none';
    });
  });

  //清空
  clebox.addEventListener('click', () => {
    worddatas = [];
    wordspaces.forEach(word => main.removeChild(word));
    wordspaces = [];
});


});
