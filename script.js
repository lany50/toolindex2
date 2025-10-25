// 工具数据配置
const toolsData = [
    {
        id: 1,
        title: 'JSON 格式化器',
        description: '快速格式化和验证 JSON 数据，支持压缩和美化。',
        icon: '{}',
        category: 'code',
        tags: ['JSON', '代码', '格式化'],
        link: 'tools/json-formatter.html'
    },
    {
        id: 2,
        title: '文本转换',
        description: '大小写转换、去空格、反转等多种文本处理功能。',
        icon: '✏️',
        category: 'text',
        tags: ['文本', '转换', '处理'],
        link: 'tools/text-converter.html'
    },
    {
        id: 3,
        title: '颜色转换',
        description: 'HEX、RGB、HSL 等多种颜色格式相互转换。',
        icon: '🎨',
        category: 'color',
        tags: ['颜色', '转换', '设计'],
        link: 'tools/color-converter.html'
    },
    {
        id: 4,
        title: 'URL 编码/解码',
        description: '快速编码和解码 URL，支持 Base64 转换。',
        icon: '🔗',
        category: 'convert',
        tags: ['URL', '编码', '转换'],
        link: '#'
    },
    {
        id: 5,
        title: '时间戳转换',
        description: '时间戳与日期时间相互转换，支持多时区。',
        icon: '⏰',
        category: 'convert',
        tags: ['时间', '转换', '日期'],
        link: '#'
    },
    {
        id: 6,
        title: '密码生成器',
        description: '生成强密码，自定义长度和字符类型。',
        icon: '🔐',
        category: 'code',
        tags: ['密码', '安全', '生成'],
        link: '#'
    }
];

// DOM 元素
const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryTags = document.querySelectorAll('.category-tag');

let currentCategory = 'all';
let currentSearch = '';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    setupEventListeners();
});

// 设置事件监听
function setupEventListeners() {
    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderTools();
    });

    // 分类过滤
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentCategory = tag.dataset.category;
            renderTools();
        });
    });
}

// 渲染工具卡片
function renderTools() {
    const filteredTools = toolsData.filter(tool => {
        const matchCategory = currentCategory === 'all' || tool.category === currentCategory;
        const matchSearch = 
            tool.title.toLowerCase().includes(currentSearch) ||
            tool.description.toLowerCase().includes(currentSearch) ||
            tool.tags.some(tag => tag.toLowerCase().includes(currentSearch));
        
        return matchCategory && matchSearch;
    });

    if (filteredTools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🔍</div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--deep-brown);">未找到工具</h3>
                <p>尝试调整搜索条件或分类过滤。</p>
            </div>
        `;
        return;
    }

    toolsGrid.innerHTML = filteredTools.map(tool => `
        <div class="tool-card" onclick="openTool('${tool.link}')">
            <div class="tool-icon">${tool.icon}</div>
            <h3 class="tool-title">${tool.title}</h3>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
            <button class="tool-button">打开工具 →</button>
        </div>
    `).join('');
}

// 打开工具
function openTool(link) {
    if (link && link !== '#') {
        window.location.href = link;
    }
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
