document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('boxContainer');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.getElementById('closeBtn');
    // 新功能元素
    const addBox = document.querySelector('.add-box');
    const randomBox = document.querySelector('.random-box');
    const addForm = document.getElementById('addForm');
    const textInput = document.getElementById('textInput');
    const modalTextInput = document.getElementById('modalTextInput');
    const submitBtn = document.getElementById('submitBtn');
    const deleteBtn = document.querySelector('.delete-box');
    const clearBtn = document.querySelector('.clear-box');
    const infoBox = document.querySelector('.info-box');
    let isDeleteMode = false;
    // 从localStorage加载随机模式状态
    let isRandomMode = true;
    try {
        const mode = localStorage.getItem('isRandomMode');
        if (mode !== null) {
            isRandomMode = JSON.parse(mode);
        }
    } catch (e) {
        console.error('Failed to parse isRandomMode from localStorage:', e);
        localStorage.removeItem('isRandomMode');
    }

    // 从localStorage加载数据，如果没有则使用默认数据
    let boxTexts = [];
    try {
        const saved = localStorage.getItem('boxTexts');
        if (saved) {
            boxTexts = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to parse boxTexts from localStorage:', e);
        localStorage.removeItem('boxTexts');
    }
    const boxes = [];
    let animationId;
    let isPaused = false;
    let randomBoxCount = localStorage.getItem('randomBoxCount') ? parseInt(localStorage.getItem('randomBoxCount')) : 5;

// 数量设置表单元素
const countSettingBtn = document.querySelector('.count-setting-box');
const countForm = document.getElementById('countForm');
const randomCountInput = document.getElementById('randomCountInput');
const countSaveBtn = document.getElementById('countSaveBtn');

// 初始化输入框值
randomCountInput.value = randomBoxCount;

// 打开数量设置表单
if (countSettingBtn) {
    // 更新按钮状态
    function updateCountSettingState() {
        if (isRandomMode) {
            countSettingBtn.classList.remove('disabled');
            countSettingBtn.style.pointerEvents = 'auto';
        } else {
            countSettingBtn.classList.add('disabled');
            countSettingBtn.style.pointerEvents = 'none';
        }
    }

    // 初始化状态
    updateCountSettingState();

    countSettingBtn.addEventListener('click', function() {
        if (!isRandomMode) return; // 随机模式未开启时不响应点击
        countForm.style.display = countForm.style.display === 'block' ? 'none' : 'block';
        addForm.style.display = 'none'; // 关闭添加表单
        document.body.classList.toggle('count-setting-active', countForm.style.display === 'block');
    });
}

// 保存按钮点击事件
if (countSaveBtn) {
    countSaveBtn.addEventListener('click', function() {
        const newCount = parseInt(randomCountInput.value);
        if (newCount >= 1) {
            randomBoxCount = newCount;
            localStorage.setItem('randomBoxCount', newCount);
            countForm.style.display = 'none';
            document.body.classList.remove('count-setting-active');
            showNotification(`已设置随机盒子数量为: ${newCount}`);
        } else {
            alert('请输入1-20之间的有效数字');
            randomCountInput.value = randomBoxCount;
        }
    });
}

// 添加通知提示功能
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 创建单个盒子
function createBox(index) {
    const text = boxTexts[index];
    if (!text) return; // 防止无效索引
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = text.text;
    box.dataset.index = index;
    
    // 添加删除叉号
    const deleteX = document.createElement('div');
    deleteX.classList.add('delete-x');
    deleteX.textContent = '×';
    deleteX.dataset.index = index;
    box.appendChild(deleteX);
    
    container.appendChild(box);
    boxes.push(box);
    
    // 添加点击事件
    box.addEventListener('click', () => {
        if (isDeleteMode) return; // 删除模式下不显示模态框
        boxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        showModal(box);
    });
    
    // 删除叉号点击事件
    deleteX.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const currentIndex = parseInt(e.target.dataset.index);
            deleteBox(currentIndex);
        });
}

// 初始化盒子
function initBoxesFromStorage() {
    boxTexts.forEach((_, index) => {
        createBox(index);
    });
}

// 等待DOM加载完成后初始化
// 随机显示功能
    function showRandomBoxes() {
    // 确保随机量不大于盒子总量
    const displayCount = randomBoxCount;
    // 隐藏所有盒子
    boxes.forEach(box => box.style.display = 'none');
    // 随机选择displayCount个盒子显示
    const shuffled = [...boxes].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, displayCount);
    selected.forEach(box => box.style.display = 'flex');
}



    // 初始化盒子
    initBoxesFromStorage();
    // 根据保存的模式显示盒子
    if (isRandomMode) {
        showRandomBoxes();
    } else {
        showAllBoxes();
    }
    // 初始化盒子位置（无重叠）
    function initBoxes() {
        const placedBoxes = [];
        boxes.forEach(box => {
            const boxWidth = box.offsetWidth;
            const boxHeight = box.offsetHeight;
            
const navbarHeight = 60; // 导航栏高度
let x, y;
            let attempts = 0;
            const maxAttempts = 50;
            let overlapping;

            // 尝试生成不重叠的位置
            do {
                overlapping = false;
                x = Math.random() * (container.clientWidth - boxWidth);
                y = navbarHeight + Math.random() * (container.clientHeight - boxHeight - navbarHeight);

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
}

    // 显示说明模态框
    function showInfoModal() {
        modalText.textContent = '这是一个记忆辅助网页：看见词条时尝试回忆相关知识，不确定时点击查看详情。\n可通过‘添加’、‘删除’和‘清空’功能管理词条。\n‘随机’功能可随机显示部分词条，‘数量’功能可调整显示数量。';
        modal.style.display = 'block';
        document.body.classList.add('blur-background');
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
    }

    // 隐藏模态框
    function hideModal() {
        modal.style.display = 'none';
        document.body.classList.remove('blur-background');
    boxes.forEach(box => box.classList.remove('selected'));
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

    // 说明按钮点击事件
    if (infoBox) {
        infoBox.addEventListener('click', showInfoModal);
    }

    // 添加表单关闭按钮事件
    document.getElementById('addFormClose').addEventListener('click', () => {
        addForm.style.display = 'none';
    });

    // 数量设置表单关闭按钮事件
    document.getElementById('countFormClose').addEventListener('click', () => {
        countForm.style.display = 'none';
    });

    // 窗口大小改变时重新初始化
window.addEventListener('resize', initBoxes);

// 添加新盒子后重新定位
addBox.addEventListener('click', function() {
    setTimeout(initBoxes, 100); // 短暂延迟确保DOM已更新
});

    // 删除盒子函数
    function deleteBox(index) {
        // 从DOM中移除盒子
        const boxToRemove = document.querySelector(`.box[data-index="${index}"]`);
        if (boxToRemove) {
            boxToRemove.remove();
        }
        
        // 从数组中移除数据
        boxTexts.splice(index, 1);
        boxes.splice(index, 1);
        
        // 更新剩余盒子的索引
        boxes.forEach((box, i) => {
            box.dataset.index = i;
            const deleteX = box.querySelector('.delete-x');
            if (deleteX) deleteX.dataset.index = i;
        });
        
        // 保存到localStorage
        localStorage.setItem('boxTexts', JSON.stringify(boxTexts));
        
        // 退出删除模式
        toggleDeleteMode(false);
        
        // 更新显示
        if (isRandomMode) {
            showRandomBoxes();
        } else {
            showAllBoxes();
        }
    }
    
    // 切换删除模式
    function toggleDeleteMode(enable) {
        isDeleteMode = enable;
        document.body.classList.toggle('delete-active', enable);
        
        boxes.forEach(box => {
            box.classList.toggle('delete-mode', enable);
        });
    }
    
    // 控制按钮事件
    // 显示/隐藏添加表单
    addBox.addEventListener('click', () => {
        addForm.style.display = addForm.style.display === 'block' ? 'none' : 'block';
    });
    
    // 删除按钮事件
    deleteBtn.addEventListener('click', () => {
        if (boxes.length === 0) return;
        toggleDeleteMode(!isDeleteMode);
    });
    
    // 清空按钮事件
    clearBtn.addEventListener('click', () => {
        if (boxes.length === 0) return;
        
        // 确认清空
        if (confirm('确定要删除所有盒子吗？')) {
            // 清空DOM
            boxes.forEach(box => box.remove());
            
            // 清空数据
            boxTexts = [];
            boxes.length = 0;
            
            // 保存到localStorage
            localStorage.setItem('boxTexts', JSON.stringify(boxTexts));
            
            // 退出删除模式
            toggleDeleteMode(false);
        }
    });

    // 提交新内容
    submitBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        const modalText = modalTextInput.value.trim();
        if (text && modalText) {
            // 添加到数据数组
            const newIndex = boxTexts.length;
            boxTexts.push({ text, modalText });
localStorage.setItem('boxTexts', JSON.stringify(boxTexts));

            // 创建新盒子
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = text;
            box.dataset.index = newIndex;
            container.appendChild(box);
            boxes.push(box);

            // 添加点击事件
            box.addEventListener('click', () => {
                boxes.forEach(b => b.classList.remove('selected'));
                box.classList.add('selected');
                showModal(box);
            });

            // 重新初始化位置
            initBoxes();

            // 清空表单并隐藏
            textInput.value = '';
            modalTextInput.value = '';
            addForm.style.display = 'none';
        }
    });


    // 显示所有盒子
    function showAllBoxes() {
        boxes.forEach(box => {
            box.style.display = 'flex';
        });
    }

    randomBox.addEventListener('click', () => {
        isRandomMode = !isRandomMode;
        localStorage.setItem('isRandomMode', isRandomMode);
        updateCountSettingState();
        
        // 创建提示通知
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = isRandomMode ? '随机生成已经开启' : '随机功能已关闭';
        document.body.appendChild(notification);
        
        // 3秒后移除提示
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // 切换显示模式
        if (isRandomMode) {
            showRandomBoxes();
        } else {
            showAllBoxes();
        }
    });

    // 初始化静态位置
    initBoxes();
    // 已在DOMContentLoaded事件中根据模式状态初始化显示模式
    // showRandomBoxes();
});
