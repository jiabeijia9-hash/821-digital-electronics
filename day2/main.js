/**
 * Day 2 · 组合逻辑标准设计与 MSI 器件应用 - 核心交互脚本 (main.js)
 * 821数电考研5天强化复习专用
 *
 * 运行环境规范：
 * 1. 纯本地离线运行 (file:// 协议)，完全无网络与 CDN 依赖
 * 2. 禁止 ES Modules 与 fetch() 请求本地文件，纯原生 JavaScript
 * 3. 各模块具备独立 try-catch 错误隔离机制，单模块异常不影响全站
 * 4. 事件统一通过 addEventListener 绑定，禁止任何 inline onclick
 * 5. 打印时自动展开所有解析与知识卡片，打印完毕还原
 */

// ============================================================================
// 一、常量定义 (Constants)
// ============================================================================

/** 本地存储统一前缀与键名 */
const STORAGE_PREFIX = 'day2_';
const STORAGE_KEYS = {
  TASKS: 'day2_tasks_completion',
  CHECKLIST: 'day2_exam_checklist',
  QUESTION_STATES: 'day2_question_states',
  WRONG_NOTES: 'day2_wrong_notes',
  REVIEW_STATUS: 'day2_review_status'
};

/** 考研数电标准 12 类错因分类 */
const ERROR_CATEGORIES = [
  '概念理解错误',
  '公式及成立条件错误',
  '逻辑表达式错误',
  '化简过程错误',
  '电路分析错误',
  '设计步骤遗漏',
  '状态转移或时序关系错误',
  '计算错误',
  '边界条件遗漏',
  '审题错误',
  '书写或时间分配失误',
  '其他'
];

/** 试题做题状态枚举 */
const QUESTION_STATUS = {
  PENDING: 'pending',   // 未作答
  CORRECT: 'correct',   // 已掌握 / 正确
  WRONG: 'wrong'        // 待重做 / 错误
};

/** 复测掌握程度评价 */
const REVIEW_MASTERY = {
  MASTERED: 'mastered',     // 已掌握
  UNSTABLE: 'unstable',     // 不稳定
  UNMASTERED: 'unmastered'  // 未掌握
};

/** 考点自查评级选项 */
const CHECKLIST_PRE_OPTIONS = ['未复习', '已了解', '熟练掌握'];
const CHECKLIST_POST_OPTIONS = ['未达标', '基本达标', '完全达标'];

/** 内存降级存储（当 localStorage 不可用时激活） */
const MEMORY_STORAGE = {};
let isLocalStorageAvailable = false;


// ============================================================================
// 二、工具函数 (Utility Functions)
// ============================================================================

/**
 * 字符串 HTML 转义，防止 XSS 与特殊字符破坏 DOM 结构
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 严格支持花括号多层嵌套与下标的 LaTeX \\overline 和 \\bar 顶线解析器
 * 彻底解决包含下标（如 \\overline{Y_{G3}}）或多层与非对合律时顶线表示不完全的缺陷
 * @param {string} input
 * @returns {string}
 */
function parseOverlines(input) {
  let s = input;
  let matched = true;
  let guard = 0;
  while (matched && guard < 10) {
    guard++;
    matched = false;
    const regex = /\\(?:overline|bar)\s*\{/g;
    let match;
    const toReplace = [];
    while ((match = regex.exec(s)) !== null) {
      const startIdx = match.index;
      const contentStart = match.index + match[0].length;
      let depth = 1;
      let i = contentStart;
      while (i < s.length && depth > 0) {
        if (s[i] === '{') depth++;
        else if (s[i] === '}') depth--;
        i++;
      }
      if (depth === 0) {
        const fullMatch = s.slice(startIdx, i);
        const innerContent = s.slice(contentStart, i - 1);
        toReplace.push({ fullMatch, innerContent });
        matched = true;
      }
    }
    for (let j = toReplace.length - 1; j >= 0; j--) {
      const item = toReplace[j];
      s = s.replace(item.fullMatch, `<span class="math-overline">${item.innerContent}</span>`);
    }
  }

  // 同时也支持单字母没有大括号的写法，如 \\overline A, \\bar A
  s = s.replace(/\\(?:overline|bar)\s+([A-Za-z0-9])/g, '<span class="math-overline">$1</span>');

  return s;
}

/**
 * 递归替换 \frac{A}{B} 为上下堆叠的分式结构
 * 先于上下标处理执行，内部的 _{...}/^{...} 仍会被后续步骤正常渲染
 * @param {string} input
 * @returns {string}
 */
function replaceFractions(input) {
  let s = input;
  let guard = 0;
  let idx = s.indexOf('\\frac');

  // 读取一个花括号参数（支持嵌套）；无花括号时取单个字符
  const readArg = function (str, pos) {
    if (str[pos] !== '{') {
      return { text: str[pos] || '', end: pos + 1 };
    }
    let depth = 1;
    let j = pos + 1;
    while (j < str.length && depth > 0) {
      if (str[j] === '{') depth++;
      else if (str[j] === '}') depth--;
      j++;
    }
    return { text: str.slice(pos + 1, j - 1), end: j };
  };

  while (idx !== -1 && guard < 300) {
    guard++;
    let i = idx + 5; // 跳过 \frac
    while (s[i] === ' ') i++;

    const a1 = readArg(s, i);
    let k = a1.end;
    while (s[k] === ' ') k++;
    const a2 = readArg(s, k);

    if (!a1.text && !a2.text) break; // 非法写法，停止以免死循环

    const num = replaceFractions(a1.text);
    const den = replaceFractions(a2.text);
    const html = '<span class="math-frac"><span class="math-frac-num">' + num +
                 '</span><span class="math-frac-den">' + den + '</span></span>';

    s = s.slice(0, idx) + html + s.slice(a2.end);
    idx = s.indexOf('\\frac', idx + html.length);
  }
  return s;
}

/**
 * 转换 LaTeX 数学标记为标准 HTML+CSS 符号 (高清数电专用版)
 * @param {string} tex 纯数学表达式
 * @returns {string} 渲染后的 HTML 字符串
 */
function renderLatexTokens(tex) {
  let t = tex.trim();

  // 0. 预处理反斜杠空格、\left、\right 及环境标号
  t = t.replace(/\\\s+/g, '&nbsp;');
  t = t.replace(/\\left\s*([\[\(\{])/g, '$1');
  t = t.replace(/\\right\s*([\]\)\}])/g, '$1');
  t = t.replace(/\\begin\{[a-zA-Z*]+\}/g, '');
  t = t.replace(/\\end\{[a-zA-Z*]+\}/g, '');

  // 1. 递归解析嵌套求反顶线（支持任意深度与花括号嵌套）
  t = parseOverlines(t);
  t = replaceFractions(t);

  // 2. 特殊逻辑运算符与常用符号（使用 (?![a-zA-Z]) 避免前缀贪婪吞并，如 \le 误吞 \leftrightarrow）
  // 优先处理长箭头与关系符
  t = t.replace(/\\longleftrightarrow(?![a-zA-Z])/g, ' ⟷ ');
  t = t.replace(/\\leftrightarrow(?![a-zA-Z])/g, ' ⟷ ');
  t = t.replace(/\\Longleftrightarrow(?![a-zA-Z])/g, ' ⟺ ');
  t = t.replace(/\\longrightarrow(?![a-zA-Z])/g, ' ⟶ ');
  t = t.replace(/\\rightarrow(?![a-zA-Z])/g, ' → ');
  t = t.replace(/\\to(?![a-zA-Z])/g, ' → ');
  t = t.replace(/\\leftarrow(?![a-zA-Z])/g, ' ← ');
  t = t.replace(/\\longleftarrow(?![a-zA-Z])/g, ' ⟵ ');
  t = t.replace(/\\Longrightarrow(?![a-zA-Z])/g, ' ⟹ ');
  t = t.replace(/\\implies(?![a-zA-Z])/g, ' ⟹ ');
  t = t.replace(/\\iff(?![a-zA-Z])/g, ' ⟺ ');
  t = t.replace(/\\rightleftharpoons(?![a-zA-Z])/g, ' ⇌ ');
  t = t.replace(/\\leftrightharpoons(?![a-zA-Z])/g, ' ⇌ ');
  t = t.replace(/\\Rightarrow(?![a-zA-Z])/g, ' ⇒ ');
  t = t.replace(/\\Leftarrow(?![a-zA-Z])/g, ' ⇐ ');
  t = t.replace(/\\notin(?![a-zA-Z])/g, ' ∉ ');
  t = t.replace(/\\in(?![a-zA-Z])/g, ' ∈ ');
  t = t.replace(/\\supset(?![a-zA-Z])/g, ' ⊃ ');
  t = t.replace(/\\subset(?![a-zA-Z])/g, ' ⊂ ');
  t = t.replace(/\\ne(?![a-zA-Z])/g, ' ≠ ');
  t = t.replace(/\\backslash(?![a-zA-Z])/g, ' ∖ ');

  // 逻辑算符与比较符
  t = t.replace(/\\equiv(?![a-zA-Z])/g, ' ≡ ');
  t = t.replace(/\\oplus(?![a-zA-Z])/g, ' ⊕ ');
  t = t.replace(/\\odot(?![a-zA-Z])/g, ' ⊙ ');
  t = t.replace(/\\cdot(?![a-zA-Z])/g, ' · ');
  t = t.replace(/\\times(?![a-zA-Z])/g, ' × ');
  t = t.replace(/\\ge(?:q)?(?![a-zA-Z])/g, ' ≥ ');
  t = t.replace(/\\le(?:q)?(?![a-zA-Z])/g, ' ≤ ');
  t = t.replace(/\\neq(?![a-zA-Z])/g, ' ≠ ');
  t = t.replace(/\\approx(?![a-zA-Z])/g, ' ≈ ');
  t = t.replace(/\\pm(?![a-zA-Z])/g, ' ± ');
  t = t.replace(/\\mp(?![a-zA-Z])/g, ' ∓ ');
  t = t.replace(/\\quad(?![a-zA-Z])/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  t = t.replace(/\\qquad(?![a-zA-Z])/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  t = t.replace(/\\dots(?![a-zA-Z])/g, '…');
  t = t.replace(/\\cdots(?![a-zA-Z])/g, '⋯');
  t = t.replace(/\\sum(?:_\{[^}]+\})?(?:\^\{[^}]+\})?/g, '<span style="font-size:1.25em; font-family:serif; vertical-align:-0.08em;">∑</span>');
  t = t.replace(/\\prod(?:_\{[^}]+\})?(?:\^\{[^}]+\})?/g, '<span style="font-size:1.25em; font-family:serif; vertical-align:-0.08em;">∏</span>');
  t = t.replace(/\\(?:mathrm|text|mathbf)\{([^}]+)\}/g, '<span class="math-text">$1</span>');
  t = t.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
  t = t.replace(/\\widetilde\{([^}]+)\}/g, '<span class="math-overline">$1</span>');
  t = t.replace(/\\cap(?![a-zA-Z])/g, ' ∩ ');
  t = t.replace(/\\cup(?![a-zA-Z])/g, ' ∪ ');
  t = t.replace(/\\varnothing(?![a-zA-Z])/g, ' ∅ ');
  t = t.replace(/\\sim(?![a-zA-Z])/g, ' ～ ');
  t = t.replace(/\\neg(?![a-zA-Z])/g, ' ¬ ');
  t = t.replace(/\\Delta(?![a-zA-Z])/g, 'Δ');
  t = t.replace(/\\tau(?![a-zA-Z])/g, 'τ');
  t = t.replace(/\\mu(?![a-zA-Z])/g, 'μ');
  t = t.replace(/\\Omega(?![a-zA-Z])/g, 'Ω');

  // 3. 处理撇号非符号 (Prime: A', B', (A+B)', A^{\prime}, A^\prime) 高清显化
  t = t.replace(/\^?\s*\{\s*\\prime\s*\}/g, '<sup class="math-prime">′</sup>');
  t = t.replace(/\^?\s*\\prime/g, '<sup class="math-prime">′</sup>');
  t = t.replace(/([A-Za-z0-9\)\]\}])'/g, '$1<sup class="math-prime">′</sup>');

  // 4. 上下标
  t = t.replace(/_\{([^}]+)\}/g, '<sub class="math-sub">$1</sub>');
  t = t.replace(/_([a-zA-Z0-9])/g, '<sub class="math-sub">$1</sub>');
  t = t.replace(/\^\{([^}]+)\}/g, '<sup class="math-sup">$1</sup>');
  t = t.replace(/\^([a-zA-Z0-9+*-])/g, '<sup class="math-sup">$1</sup>');

  // 5. 变量字母斜体修饰：安全保护 HTML 标签与实体，只对文本中的字母加 math-var
  const parts = t.split(/(<[^>]+>|&[a-zA-Z0-9#]+;)/);
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i]) {
      parts[i] = parts[i].replace(/([A-Za-z])/g, '<i class="math-var">$1</i>');
    }
  }
  t = parts.join('');

  return `<span class="math-inline">${t}</span>`;
}

/**
 * 在已有 HTML 片段中安全转换 $...$ 和 $$...$$ 数学公式
 * 专门用于知识卡片等含有丰富 HTML 结构的容器渲染
 * @param {string} html
 * @returns {string}
 */
function renderMathInHtml(html) {
  if (!html || typeof html !== 'string') return '';
  // 转换 $$...$$ 块级公式
  let res = html.replace(/\$\$([\s\S]*?)\$\$/g, function (match, tex) {
    return `<div class="math-display">${renderLatexTokens(tex)}</div>`;
  });
  // 转换 $...$ 行内公式
  res = res.replace(/\$([^\$\n\r]+?)\$/g, function (match, tex) {
    return renderLatexTokens(tex);
  });
  // 兜底处理未用 $ 包裹的 \overline{...}
  res = parseOverlines(res);
  return res;
}

/**
 * 离线数学公式与富文本轻量级解析引擎
 * 支持 $...$ 行内数学公式、$$...$$ 块级数学公式、Markdown 粗体、行内代码、表格与换行
 * @param {string} text 原始文本
 * @returns {string} 渲染后的标准 HTML
 */
function formatRichText(text) {
  if (!text || typeof text !== 'string') return '';

  // 1. 优先提取并保护代码块
  const codeBlocks = [];
  let s = text.replace(/```([\s\S]*?)```/g, function (match, code) {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="code-block" style="background:#0f172a; color:#f8fafc; padding:0.85rem 1rem; border-radius:6px; overflow-x:auto; font-family:var(--font-mono); font-size:0.875rem; margin:0.8rem 0; line-height:1.45;"><code>${escapeHtml(code.trim())}</code></pre>`);
    return `___CODE_BLOCK_${idx}___`;
  });

  // 2. 转换 LaTeX 逻辑代数与公式
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, function (match, tex) {
    return `<div class="math-display">${renderLatexTokens(tex)}</div>`;
  });

  s = s.replace(/\$([^\$\n]+?)\$/g, function (match, tex) {
    return renderLatexTokens(tex);
  });

  // 兜底处理未用 $ 包裹的 \overline{...} 或 \bar{...}
  s = parseOverlines(s);

  // 3. 处理基础 Markdown 排版
  // 粗体
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // 行内代码
  s = s.replace(/`([^`]+)`/g, '<code class="code-inline" style="background:var(--bg-subtle); color:var(--primary); padding:0.1rem 0.35rem; border-radius:3px; font-family:var(--font-mono); font-size:0.875em; border:1px solid var(--border-color);">$1</code>');

  // 4. 处理 Markdown 表格
  const lines = s.split('\n');
  const outLines = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
    } else {
      if (inTable) {
        outLines.push(convertMarkdownTable(tableRows));
        inTable = false;
        tableRows = [];
      }
      outLines.push(lines[i]);
    }
  }
  if (inTable) {
    outLines.push(convertMarkdownTable(tableRows));
  }
  s = outLines.join('\n');

  // 5. 换行转换
  s = s.replace(/\n\n+/g, '</p><p style="margin-top:0.6rem; margin-bottom:0.6rem;">');
  s = s.replace(/\n/g, '<br>');

  // 6. 还原代码块
  codeBlocks.forEach((block, idx) => {
    s = s.replace(`___CODE_BLOCK_${idx}___`, block);
  });

  return `<div class="rich-text-content" style="line-height:1.65;">${s}</div>`;
}

/**
 * 转换 Markdown 表格为美化 HTML 表格
 * @param {string[]} rows 表格原始行数组
 * @returns {string} HTML 表格字符串
 */
function convertMarkdownTable(rows) {
  if (rows.length < 2) return rows.join('\n');
  const parseRow = row => row.slice(1, -1).split('|').map(c => c.trim());
  const headerCols = parseRow(rows[0]);
  let bodyStartIndex = 1;
  // 跳过表头分割线 |-|-|-|
  if (rows.length > 1 && /^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(rows[1].trim())) {
    bodyStartIndex = 2;
  }

  let tableHtml = `<div class="table-responsive" style="margin:0.8rem 0; overflow-x:auto;"><table class="truth-table" style="width:100%; border-collapse:collapse; text-align:center; font-size:0.875rem;"><thead><tr>`;
  headerCols.forEach(col => {
    tableHtml += `<th style="padding:0.5rem 0.6rem; border:1px solid var(--border-color); background:var(--bg-subtle); color:var(--text-main);">${col}</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;

  for (let r = bodyStartIndex; r < rows.length; r++) {
    const cols = parseRow(rows[r]);
    tableHtml += `<tr>`;
    cols.forEach(col => {
      tableHtml += `<td style="padding:0.45rem 0.6rem; border:1px solid var(--border-color);">${col}</td>`;
    });
    tableHtml += `</tr>`;
  }
  tableHtml += `</tbody></table></div>`;
  return tableHtml;
}

/**
 * 格式化时间戳为易读文本
 * @param {number|string} timestamp
 * @returns {string}
 */
function formatDateTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const D = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${m}`;
}

/**
 * 在容器中显示隔离的模块加载错误提示
 * @param {HTMLElement|string} target 容器元素或其 ID
 * @param {string} moduleName 模块名称
 * @param {Error|string} error 错误对象
 */
function renderModuleError(target, moduleName, error) {
  const container = typeof target === 'string' ? document.getElementById(target) : target;
  if (!container) return;
  const msg = error && error.message ? error.message : String(error);
  container.innerHTML = `
    <div class="callout callout-warning alert-box" style="margin: 1rem 0;">
      <strong>⚠️ ${escapeHtml(moduleName)} 加载提示：</strong>
      <span>该模块暂时未能正常渲染（原因：${escapeHtml(msg)}）。其他模块功能不受影响，请刷新或继续后续学习。</span>
    </div>
  `;
}

/**
 * 派发全局学习状态变更事件，供进度条和跨模块组件自动响应
 * @param {string} source 变更源
 */
function notifyStateChange(source) {
  try {
    const event = new CustomEvent('day2:state-change', { detail: { source, timestamp: Date.now() } });
    window.dispatchEvent(event);
  } catch (e) {
    // 兼容极端环境下 CustomEvent 异常
  }
}

/**
 * 平滑滚动到指定元素并保持高亮
 * @param {string} elementId
 */
function scrollToElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('highlight-pulse');
    setTimeout(() => {
      el.classList.remove('highlight-pulse');
    }, 1800);
  }
}


// ============================================================================
// 三、存储模块 (Storage Module)
// ============================================================================

/**
 * 检测浏览器 localStorage 可用性并初始化存储状态
 */
function checkStorageSupport() {
  try {
    const testKey = '__day2_test_storage__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    isLocalStorageAvailable = true;
  } catch (e) {
    isLocalStorageAvailable = false;
    const warningBox = document.getElementById('storage-warning');
    if (warningBox) {
      warningBox.style.display = 'block';
    }
  }
}

/**
 * 保存状态数据到本地存储
 * @param {string} key 键名
 * @param {*} value 数据
 * @returns {boolean}
 */
function saveState(key, value) {
  try {
    const jsonStr = JSON.stringify(value);
    MEMORY_STORAGE[key] = jsonStr;
    if (isLocalStorageAvailable) {
      window.localStorage.setItem(key, jsonStr);
    }
    return true;
  } catch (err) {
    console.warn(`[Storage] 保存 ${key} 失败:`, err);
    return false;
  }
}

/**
 * 从本地存储加载状态数据
 * @param {string} key 键名
 * @param {*} defaultValue 默认值
 * @returns {*}
 */
function loadState(key, defaultValue) {
  try {
    let jsonStr = null;
    if (isLocalStorageAvailable) {
      jsonStr = window.localStorage.getItem(key);
    }
    if (!jsonStr && MEMORY_STORAGE[key]) {
      jsonStr = MEMORY_STORAGE[key];
    }
    if (!jsonStr) return defaultValue;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.warn(`[Storage] 读取 ${key} 解析失败:`, err);
    return defaultValue;
  }
}

/**
 * 清除当天所有学习记录数据
 */
function clearDayState() {
  if (isLocalStorageAvailable) {
    try {
      const keysToRemove = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => window.localStorage.removeItem(k));
    } catch (e) {
      console.warn('[Storage] 清除 localStorage 遇到问题:', e);
    }
  }
  Object.keys(MEMORY_STORAGE).forEach(k => delete MEMORY_STORAGE[k]);
  notifyStateChange('clear');
}


// ============================================================================
// 四、任务清单模块 (Task Checklist Module)
// ============================================================================

/**
 * 初始化并渲染学习任务清单
 */
function initTaskChecklist() {
  const container = document.getElementById('tasks-container');
  if (!container) return;

  try {
    const tasks = Array.isArray(window.STUDY_TASKS) && window.STUDY_TASKS.length > 0
      ? window.STUDY_TASKS
      : [
          { id: 'task-1', title: '考纲自查与基础摸底', tag: '诊断', time: '20分钟', detail: '对照821考纲重点，核查组合逻辑基础概念' },
          { id: 'task-2', title: '新手小牛主线网课 (P6-P13)', tag: '网课', time: '60分钟', detail: '重点掌握卡诺图最小项、化简规则与无关项处理' },
          { id: 'task-3', title: '核心考法知识重构卡片研读', tag: '重构', time: '30分钟', detail: '整理反演、对偶定律及SSI组合逻辑分析标准四步流程' },
          { id: 'task-4', title: '交互演示：三输入门电路仿真', tag: '实验', time: '15分钟', detail: '切换输入电平，观察F=AB+BC门电路信号流与真值表' },
          { id: 'task-5', title: '【必做区】覆盖训练 (全量独立作答)', tag: '刷题', time: '90分钟', detail: '限时独立推导，杜绝边看答案边做题' },
          { id: 'task-6', title: '【拓展区】综合设计攻坚与冲刺', tag: '攻坚', time: '40分钟', detail: '重点突破竞争冒险与多输出门网络优化' },
          { id: 'task-7', title: '错题归因分析与深度纠偏', tag: '纠错', time: '30分钟', detail: '将所有错题记录至12大错因，制定具体纠正动作' },
          { id: 'task-8', title: '当日复测检验与掌握度自评', tag: '复测', time: '25分钟', detail: '闭卷自测AI变式题，评定掌握等级' }
        ];

    const savedStatus = loadState(STORAGE_KEYS.TASKS, {});

    // 计算已完成进度
    const totalCount = tasks.length;
    let completedCount = 0;
    tasks.forEach(t => {
      if (savedStatus[t.id]) completedCount++;
    });
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // 构建 DOM
    let html = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h3 class="card-title" style="margin-bottom:0;">📌 今日复习任务清单</h3>
          <div style="font-size: 0.875rem; color: var(--text-muted);">
            已完成 <strong style="color:var(--primary); font-size:1.1rem;" id="task-completed-count">${completedCount}</strong> / ${totalCount} 项
            (<span id="task-percent-text">${percent}%</span>)
          </div>
        </div>
        <div class="progress-bar-container" style="height: 8px; margin: 0.75rem 0 1.25rem 0;">
          <div id="task-progress-bar" class="progress-fill" style="width: ${percent}%;"></div>
        </div>
        <div class="task-checklist" id="task-checklist-items">
    `;

    tasks.forEach(task => {
      const isChecked = !!savedStatus[task.id];
      const title = task.title || task.name || task.text || `任务 ${task.id}`;
      const tag = task.tag || task.category || '核心';
      const time = task.time || task.duration || '';
      const detail = task.detail || task.desc || '';

      html += `
        <label class="task-item ${isChecked ? 'completed' : ''}" data-task-id="${escapeHtml(task.id)}">
          <input type="checkbox" class="task-checkbox" data-task-id="${escapeHtml(task.id)}" ${isChecked ? 'checked' : ''}>
          <div class="task-content">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="task-text">${escapeHtml(title)}</span>
              <span class="task-tag">${escapeHtml(tag)}</span>
              ${time ? `<span style="font-size:0.75rem; color:var(--text-light);"><span style="margin-right:2px;">⏱️</span>${escapeHtml(time)}</span>` : ''}
            </div>
            ${detail ? `<div style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">${escapeHtml(detail)}</div>` : ''}
          </div>
        </label>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;

    // 绑定 Checkbox 点击事件（事件委托）
    const checklistDiv = document.getElementById('task-checklist-items');
    if (checklistDiv) {
      checklistDiv.addEventListener('change', function (e) {
        const target = e.target;
        if (target && target.classList.contains('task-checkbox')) {
          const taskId = target.getAttribute('data-task-id');
          const isDone = target.checked;
          const parentItem = target.closest('.task-item');
          if (parentItem) {
            parentItem.classList.toggle('completed', isDone);
          }

          // 保存状态
          const currentStatus = loadState(STORAGE_KEYS.TASKS, {});
          currentStatus[taskId] = isDone;
          saveState(STORAGE_KEYS.TASKS, currentStatus);

          // 局部更新统计数字
          let cCount = 0;
          tasks.forEach(t => {
            if (currentStatus[t.id]) cCount++;
          });
          const newPct = Math.round((cCount / totalCount) * 100);
          const countEl = document.getElementById('task-completed-count');
          const pctEl = document.getElementById('task-percent-text');
          const barEl = document.getElementById('task-progress-bar');
          if (countEl) countEl.textContent = cCount;
          if (pctEl) pctEl.textContent = `${newPct}%`;
          if (barEl) barEl.style.width = `${newPct}%`;

          notifyStateChange('tasks');
        }
      });
    }

  } catch (err) {
    renderModuleError(container, '任务清单模块', err);
  }
}


// ============================================================================
// 五、考点自查模块 (Exam Checklist Module)
// ============================================================================

/**
 * 初始化并渲染考点自查表格
 */
function initExamChecklist() {
  const container = document.getElementById('checklist-container');
  if (!container) return;

  try {
    const list = Array.isArray(window.EXAM_CHECKLIST) && window.EXAM_CHECKLIST.length > 0
      ? window.EXAM_CHECKLIST
      : [
          {
            id: 'cp-01',
            name: '逻辑代数基础定理与三大规则',
            importance: '★★★★★',
            requirement: '熟练掌握摩根定律、代入规则、反演规则与对偶规则，化简与求反无符号失误'
          },
          {
            id: 'cp-02',
            name: '卡诺图化简法与约束项处理',
            importance: '★★★★★',
            requirement: '掌握4/5变量卡诺图画法、卡诺圈合并原则、任意项/约束项(d)的最优取值以消除冗余项'
          },
          {
            id: 'cp-03',
            name: 'SSI 组合逻辑电路分析标准四步',
            importance: '★★★★★',
            requirement: '规范写出各级门输出表达式、最简化与化简为最小项、列写规范真值表、精准总结逻辑功能'
          },
          {
            id: 'cp-04',
            name: '门级组合逻辑电路设计与多输出网络',
            importance: '★★★★☆',
            requirement: '根据实际逻辑需求定义输入输出变量、列真值表、多输出函数公共项提取与与非-与非门变换'
          },
          {
            id: 'cp-05',
            name: '竞争-冒险现象识别与消除',
            importance: '★★★★☆',
            requirement: '代数法（是否存在A+A\'或A·A\'）、卡诺图相切圈消除、增加冗余项、引入选通脉冲与滤波电容'
          }
        ];

    const savedChecklist = loadState(STORAGE_KEYS.CHECKLIST, {});

    let html = `
      <div class="card" style="margin-bottom: 1.5rem; overflow-x: auto;">
        <table class="data-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:0.875rem;">
          <thead>
            <tr style="background-color: var(--bg-subtle); border-bottom: 2px solid var(--border-color);">
              <th style="padding:0.75rem 0.6rem; min-width:50px;">序号</th>
              <th style="padding:0.75rem 0.6rem; min-width:130px;">核心考点</th>
              <th style="padding:0.75rem 0.6rem; min-width:240px;">考纲考法与要求</th>
              <th style="padding:0.75rem 0.6rem; min-width:85px;">重要度</th>
              <th style="padding:0.75rem 0.6rem; min-width:115px;">课前自查</th>
              <th style="padding:0.75rem 0.6rem; min-width:115px;">课后达标</th>
            </tr>
          </thead>
          <tbody>
    `;

    list.forEach((item, index) => {
      // 兼容 name/title、requirement/examMethod 两种字段命名（原实现漏定义导致整表渲染失败）
      const name = item.name || item.title || '';
      const req = item.requirement || item.examMethod || '';
      const id = item.id || ('cp-' + index);
      const importance = item.importance || '★★★★☆';
      const userState = savedChecklist[id] || { pre: CHECKLIST_PRE_OPTIONS[0], post: CHECKLIST_POST_OPTIONS[0] };
      const qids = Array.isArray(item.questionIds) ? item.questionIds : [];
      const qLinksHtml = qids.length > 0 
        ? `<div style="margin-top:0.35rem; display:flex; gap:0.3rem; flex-wrap:wrap; align-items:center;">
             <span style="font-size:0.75rem; color:var(--text-muted);">训练题目:</span>
             ${qids.map(qid => `<button type="button" class="tag" data-scroll-to="qcard-${escapeHtml(qid)}" style="cursor:pointer; border:1px solid var(--primary); background:var(--primary-light); color:var(--primary); font-size:0.75rem; padding:0.1rem 0.35rem; border-radius:3px;">${escapeHtml(qid)}</button>`).join('')}
           </div>`
        : '';

      html += `
        <tr style="border-bottom: 1px solid var(--border-color);">
          <td style="padding:0.75rem 0.6rem; font-family:var(--font-mono); font-weight:700;">${index + 1}</td>
          <td style="padding:0.75rem 0.6rem; font-weight:600; color:var(--text-main); font-size:0.875rem;">
            ${escapeHtml(name)}
            ${qLinksHtml}
          </td>
          <td style="padding:0.75rem 0.6rem; color:var(--text-regular); line-height:1.5;">${escapeHtml(req)}</td>
          <td style="padding:0.75rem 0.6rem; color:var(--warning-hover); font-weight:700; white-space:nowrap;">${escapeHtml(importance)}</td>
          <td style="padding:0.75rem 0.6rem;">
            <select class="form-select checklist-select" data-check-id="${escapeHtml(id)}" data-type="pre" style="padding:0.25rem 0.4rem; font-size:0.8125rem;">
              ${CHECKLIST_PRE_OPTIONS.map(opt => `<option value="${opt}" ${userState.pre === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </td>
          <td style="padding:0.75rem 0.6rem;">
            <select class="form-select checklist-select" data-check-id="${escapeHtml(id)}" data-type="post" style="padding:0.25rem 0.4rem; font-size:0.8125rem; font-weight:600; color:${userState.post === '完全达标' ? 'var(--success)' : (userState.post === '基本达标' ? 'var(--primary)' : 'var(--danger)')}">
              ${CHECKLIST_POST_OPTIONS.map(opt => `<option value="${opt}" ${userState.post === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;

    // 训练题目跳转：事件委托替代内联 onclick
    container.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-scroll-to]');
      if (!btn) return;
      scrollToElement(btn.getAttribute('data-scroll-to'));
    });

    // 绑定 select 更改事件
    container.addEventListener('change', function (e) {
      const target = e.target;
      if (target && target.classList.contains('checklist-select')) {
        const id = target.getAttribute('data-check-id');
        const type = target.getAttribute('data-type');
        const val = target.value;

        const currentChecklist = loadState(STORAGE_KEYS.CHECKLIST, {});
        if (!currentChecklist[id]) {
          currentChecklist[id] = { pre: '未复习', post: '未达标' };
        }
        currentChecklist[id][type] = val;
        saveState(STORAGE_KEYS.CHECKLIST, currentChecklist);

        if (type === 'post') {
          target.style.color = val === '完全达标' ? 'var(--success)' : (val === '基本达标' ? 'var(--primary)' : 'var(--danger)');
        }

        notifyStateChange('checklist');
      }
    });

  } catch (err) {
    renderModuleError(container, '考点自查模块', err);
  }
}


// ============================================================================
// 六、知识卡片模块 (Knowledge Cards Module)
// ============================================================================

/**
 * 初始化并渲染知识重构卡片
 */
function initKnowledgeCards() {
  const container = document.getElementById('knowledge-container');
  if (!container) return;

  try {
    const cards = Array.isArray(window.KNOWLEDGE_CARDS) && window.KNOWLEDGE_CARDS.length > 0
      ? window.KNOWLEDGE_CARDS
      : [
          {
            id: 'kc-1',
            title: '核心定律与三大规则（反演/对偶法则避坑）',
            tag: '基础概念',
            summary: '反演规则与对偶规则的本质区别是考研选择、大题化简中的最高频失误点。',
            content: `
              <div class="callout callout-info" style="margin-bottom:1rem;">
                <strong>💡 反演规则 (求非函数 $\\bar{L}$)：</strong>
                将原函数 $L$ 中的所有 "·" 换成 "+"，"+" 换成 "·"；"0" 换成 "1"，"1" 换成 "0"；<strong>所有原变量换成反变量，反变量换成原变量</strong>。
              </div>
              <div class="callout callout-warning" style="margin-bottom:1rem;">
                <strong>⚠️ 对偶规则 (求对偶函数 $L'$)：</strong>
                将原函数 $L$ 中的所有 "·" 换成 "+"，"+" 换成 "·"；"0" 换成 "1"，"1" 换成 "0"；<strong>变量保持不变！切勿对变量求反！</strong>
              </div>
              <p><strong>运算优先级规则：</strong>必须先括号，再乘后加。在变换时，如果原式中有乘积项整体取反（如 $\\overline{AB}$），若不能直接看清，建议先加上括号 $(\\overline{AB})$ 再行转换，以防运算次序破坏。</p>
            `
          },
          {
            id: 'kc-2',
            title: '卡诺图化简核心口诀与约束项规范运用',
            tag: '解题技巧',
            summary: '化简原则：圈越大项越简；圈数越少项越少；每个圈必须至少包含一个未被圈过的独立最小项。',
            content: `
              <ul style="padding-left:1.25rem; line-height:1.7;">
                <li><strong>循环码（格雷码）排列：</strong>相临两列/行仅有一位不同（00, 01, 11, 10）。切记不是二进制 00, 01, 10, 11！</li>
                <li><strong>相临性与对称性：</strong>上下底边相临、左右外侧边相临、四个角相临（4个角可合并为包含4个最小项的卡诺圈，消去两个变量）。</li>
                <li><strong>无关项 (Don't Care, $d$ 或 $\\phi$) 的策略：</strong>
                  <br>• 有利于扩大卡诺圈或合并孤立项时，将其视为 <strong>1</strong>；
                  <br>• 不能扩大圈、不能减少多项式项数时，果断视作 <strong>0</strong>，绝对不单独为 $d$ 画圈！
                </li>
              </ul>
            `
          },
          {
            id: 'kc-3',
            title: 'SSI 组合逻辑电路分析标准四步推导规范',
            tag: '应试流程',
            summary: '821专业课判卷标准高度看重步骤规范。任何跳步都可能被扣除过程分。',
            content: `
              <div class="step-flow">
                <div class="step-flow-item">
                  <strong>第一步：逐级列写逻辑表达式</strong>
                  <p style="margin-top:0.25rem; color:var(--text-muted);">从输入端向输出端逐级推导，标明中间节点的代号（如 $P_1, P_2$），写出未经化简的输出函数表达式。</p>
                </div>
                <div class="step-flow-item">
                  <strong>第二步：化简为最简与或式或最小项和式</strong>
                  <p style="margin-top:0.25rem; color:var(--text-muted);">应用公式法或卡诺图法化简。若涉及异或/同或关系，优先化为异或标准形式以便识别。</p>
                </div>
                <div class="step-flow-item">
                  <strong>第三步：规范列出完整真值表</strong>
                  <p style="margin-top:0.25rem; color:var(--text-muted);">按输入变量自然二进制递增次序（如 000 到 111）列全输入组合，逐项核算出输出值。</p>
                </div>
                <div class="step-flow-item">
                  <strong>第四步：用精准专业术语总结逻辑功能</strong>
                  <p style="margin-top:0.25rem; color:var(--text-muted);">结合真值表，给出电路功能结论（例如：“3人多数表决电路”、“一位二进制半加器”、“奇偶校验产生器”等）。</p>
                </div>
              </div>
            `
          },
          {
            id: 'kc-4',
            title: '竞争-冒险现象识别与四种消除方法',
            tag: '高频考点',
            summary: '当信号经不同路径传输存在延迟差时，在门电路输入端可能出现反向毛刺。',
            content: `
              <div style="margin-bottom:0.75rem;">
                <strong>1. 代数判别法：</strong>
                在逻辑表达式中，若在一定条件下可化为 $L = A + \\bar{A}$（正脉冲险象 / 0型冒险）或 $L = A \\cdot \\bar{A}$（负脉冲险象 / 1型冒险），则存在竞争-冒险。
              </div>
              <div style="margin-bottom:0.75rem;">
                <strong>2. 卡诺图判别法：</strong>
                若卡诺图中存在<strong>相切（卡诺圈边缘相邻但未被同一个卡诺圈重叠覆盖）</strong>的卡诺圈，当输入变量在两圈分界处切换时，必产生冒险。
              </div>
              <div class="callout callout-success">
                <strong>💡 四大消除策略：</strong>
                <br>① <strong>增加冗余项（卡诺图相切处加圈）</strong>：在卡诺圈相切处增加重叠圈，从逻辑上彻底消除毛刺；
                <br>② <strong>并联滤波电容</strong>：在输出端并联几百皮法(pF)小电容，吸收高频尖峰毛刺；
                <br>③ <strong>引入选通脉冲</strong>：待电路暂态稳定后再开启选通使能信号；
                <br>④ <strong>采用格雷码状态编码</strong>：保证每次输入状态跳转仅有一位变量变化。
              </div>
            `
          }
        ];

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
        <span style="font-size:0.875rem; color:var(--text-muted);">点击卡片标题可自由展开/收起。打印时自动全部展开。</span>
        <button type="button" class="btn btn-sm btn-outline" id="btn-toggle-all-cards">展开全部卡片</button>
      </div>
      <div class="knowledge-cards-list" id="knowledge-cards-list">
    `;

    cards.forEach((card, idx) => {
      const isDefaultOpen = idx < 2; // 默认前两张卡片展开
      html += `
        <div class="card concept-card" style="margin-bottom:1rem;" id="kc-card-${escapeHtml(card.id)}">
          <div class="card-header kc-toggle-header" data-card-id="${escapeHtml(card.id)}" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
              <span class="badge badge-source">${escapeHtml(card.tag || '重点')}</span>
              <strong style="font-size:1.05rem; color:var(--text-main);">${escapeHtml(card.title)}</strong>
            </div>
            <span class="kc-arrow-icon" style="font-size:0.875rem; color:var(--primary); transition:transform 0.25s ease; transform: ${isDefaultOpen ? 'rotate(180deg)' : 'rotate(0deg)'};">▼</span>
          </div>
          <div class="kc-body" id="kc-body-${escapeHtml(card.id)}" style="padding:${isDefaultOpen ? '1rem 1.25rem 1.25rem' : '0 1.25rem'}; max-height:${isDefaultOpen ? '2000px' : '0'}; opacity:${isDefaultOpen ? '1' : '0'}; overflow:hidden; transition:all 0.3s ease;">
            ${card.summary ? `<p style="color:var(--text-regular); font-weight:500; margin-bottom:0.75rem;">${renderMathInHtml(escapeHtml(card.summary))}</p>` : ''}
            <div class="kc-html-content" style="font-size:0.9375rem; color:var(--text-regular);">
              ${renderMathInHtml(card.content || '')}
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // 单个卡片展开折叠事件委托
    const listEl = document.getElementById('knowledge-cards-list');
    if (listEl) {
      listEl.addEventListener('click', function (e) {
        const header = e.target.closest('.kc-toggle-header');
        if (!header) return;
        const cardId = header.getAttribute('data-card-id');
        const bodyEl = document.getElementById(`kc-body-${cardId}`);
        const arrowEl = header.querySelector('.kc-arrow-icon');
        if (!bodyEl) return;

        const isOpen = bodyEl.style.maxHeight !== '0px' && bodyEl.style.maxHeight !== '';
        if (isOpen) {
          bodyEl.style.maxHeight = '0px';
          bodyEl.style.opacity = '0';
          bodyEl.style.padding = '0 1.25rem';
          if (arrowEl) arrowEl.style.transform = 'rotate(0deg)';
        } else {
          bodyEl.style.maxHeight = '2000px';
          bodyEl.style.opacity = '1';
          bodyEl.style.padding = '1rem 1.25rem 1.25rem';
          if (arrowEl) arrowEl.style.transform = 'rotate(180deg)';
        }
      });
    }

    // 全部展开/收起按钮
    const toggleAllBtn = document.getElementById('btn-toggle-all-cards');
    let allExpanded = false;
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', function () {
        allExpanded = !allExpanded;
        toggleAllBtn.textContent = allExpanded ? '收起全部卡片' : '展开全部卡片';
        cards.forEach(card => {
          const bodyEl = document.getElementById(`kc-body-${card.id}`);
          const cardEl = document.getElementById(`kc-card-${card.id}`);
          const arrowEl = cardEl ? cardEl.querySelector('.kc-arrow-icon') : null;
          if (bodyEl) {
            bodyEl.style.maxHeight = allExpanded ? '2000px' : '0px';
            bodyEl.style.opacity = allExpanded ? '1' : '0';
            bodyEl.style.padding = allExpanded ? '1rem 1.25rem 1.25rem' : '0 1.25rem';
          }
          if (arrowEl) {
            arrowEl.style.transform = allExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        });
      });
    }

  } catch (err) {
    renderModuleError(container, '知识卡片模块', err);
  }
}


// ============================================================================
// 七、题目渲染模块 (Question Rendering Module)
// ============================================================================

/**
 * 获取难度对应 Badge 样式名
 */
function getDifficultyBadgeClass(difficulty) {
  if (!difficulty) return 'badge-medium';
  if (difficulty.includes('基础') || difficulty.includes('易')) return 'badge-easy';
  if (difficulty.includes('高难') || difficulty.includes('极难')) return 'badge-extreme';
  if (difficulty.includes('综合') || difficulty.includes('难')) return 'badge-hard';
  return 'badge-medium';
}

/**
 * 渲染单道题目的 HTML 模板
 * @param {Object} q 试题对象
 * @param {number} index 索引号
 * @param {Object} state 当前保存的做题状态
 * @returns {string} HTML 字符串
 */
function buildQuestionCardHtml(q, index, state) {
  const qid = q.id || `Q${index + 1}`;
  const title = q.title || `试题 ${qid}`;
  const difficulty = q.difficulty || '中档';
  const type = q.type || '分析题';
  const sourceType = q.sourceType || q.sourceNote || 'AI标准变式';
  const examMethods = Array.isArray(q.examMethods) ? q.examMethods : (q.examMethods ? [q.examMethods] : []);

  const currentStatus = (state && state.status) ? state.status : QUESTION_STATUS.PENDING;

  // 状态样式
  let statusPillClass = 'status-pending';
  let statusPillText = '未作答';
  let cardStateClass = 'state-pending';

  if (currentStatus === QUESTION_STATUS.CORRECT) {
    statusPillClass = 'status-correct';
    statusPillText = '✓ 已掌握';
    cardStateClass = 'state-correct';
  } else if (currentStatus === QUESTION_STATUS.WRONG) {
    statusPillClass = 'status-wrong';
    statusPillText = '✗ 待重做';
    cardStateClass = 'state-wrong';
  }

  // 得分点列表
  let scoringPointsHtml = '';
  if (Array.isArray(q.scoringPoints) && q.scoringPoints.length > 0) {
    scoringPointsHtml = `
      <div class="score-breakdown">
        <strong style="color:var(--text-main); margin-bottom:0.25rem; display:block;">🎯 考研判卷得分点拆解：</strong>
        ${q.scoringPoints.map((pt, i) => `<div><span class="score-tag">+${i + 1}</span>${renderMathInHtml(escapeHtml(pt))}</div>`).join('')}
      </div>
    `;
  } else if (typeof q.scoringPoints === 'string' && q.scoringPoints.trim()) {
    scoringPointsHtml = `
      <div class="score-breakdown">
        <strong style="color:var(--text-main); margin-bottom:0.25rem; display:block;">🎯 考研判卷得分点：</strong>
        <div>${q.scoringPoints}</div>
      </div>
    `;
  }

  return `
    <div class="question-card ${cardStateClass}" id="qcard-${escapeHtml(qid)}" data-qid="${escapeHtml(qid)}">
      <!-- 题目头部元信息 -->
      <div class="q-header">
        <div class="q-title-wrap">
          <span class="q-index">${escapeHtml(qid)}</span>
          <h3 class="q-title">${escapeHtml(title)}</h3>
          <span class="badge ${getDifficultyBadgeClass(difficulty)}">${escapeHtml(difficulty)}</span>
          <span class="badge badge-source">${escapeHtml(type)}</span>
          <span class="badge badge-exam">${escapeHtml(sourceType)}</span>
        </div>
        <div class="q-meta-tags">
          ${examMethods.map(m => `<span class="tag">${renderMathInHtml(escapeHtml(m))}</span>`).join('')}
          <span class="status-pill ${statusPillClass}" id="status-pill-${escapeHtml(qid)}">${statusPillText}</span>
        </div>
      </div>

      <!-- 题干正文 -->
      <div class="q-stem">
        ${formatRichText(q.question || '<p>题目内容正在准备中...</p>')}
      </div>

      ${q.diagram ? `<div class="q-diagram-wrap">${q.diagram}</div>` : ''}

      <!-- 交互操作工具栏 -->
      <div class="q-footer">
        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
          <button type="button" class="btn btn-toggle-answer" data-action="toggle-answer" data-qid="${escapeHtml(qid)}">
            🔍 查看解析与标准答案
          </button>
        </div>
        <div class="q-status-group">
          <button type="button" class="btn btn-sm btn-success" data-action="mark-correct" data-qid="${escapeHtml(qid)}" title="独立答对且过程严谨">
            ✓ 我做对了
          </button>
          <button type="button" class="btn btn-sm btn-danger" data-action="mark-wrong" data-qid="${escapeHtml(qid)}" title="标记为错题并记录错因">
            ✗ 标记错题
          </button>
          <button type="button" class="btn btn-sm btn-secondary" data-action="mark-reset" data-qid="${escapeHtml(qid)}" title="重置本题状态">
            ↺ 重置
          </button>
        </div>
      </div>

      <!-- 错题快速记录表单 (默认隐藏，点击标记错题时展开) -->
      <div class="error-form-wrap" id="error-form-${escapeHtml(qid)}" style="display:none;">
        <h4 style="color:var(--danger); font-size:0.9375rem; margin-bottom:0.75rem;">📝 错题深度复盘与纠偏记录</h4>
        <div class="form-group">
          <label class="form-label">错因分类（请从12大考研易错归因中选择）：</label>
          <select class="form-select err-category-select" id="err-category-${escapeHtml(qid)}">
            ${ERROR_CATEGORIES.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">我的错误答案 / 致命错误步骤：</label>
          <textarea class="form-textarea err-steps-input" id="err-steps-${escapeHtml(qid)}" placeholder="请准确写下你做错时的逻辑表达式、漏圈项、卡诺图错误或混淆概念..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">针对性纠偏动作（针对考点的下一步弥补措施）：</label>
          <textarea class="form-textarea err-action-input" id="err-action-${escapeHtml(qid)}" placeholder="例：重新手推反演规则并重写卡诺图；明天开始前必须做一道类似题目校验..."></textarea>
        </div>
        <div style="display:flex; gap:0.5rem; justify-content:flex-end; align-items:center; flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-secondary" data-action="close-error-form" data-qid="${escapeHtml(qid)}">取消</button>
          <button type="button" class="btn btn-sm btn-danger" data-action="save-error-note" data-qid="${escapeHtml(qid)}">💾 保存至错题本</button>
        </div>
      </div>

      <!-- 解析面板 (独立折叠与平滑展开) -->
      <div class="answer-drawer" id="answer-drawer-${escapeHtml(qid)}">
        <div class="answer-section">
          <div class="answer-heading">
            <span>📋</span> 标准答案
          </div>
          <div class="standard-answer">
            ${formatRichText(q.answer || '<p>答案整理中...</p>')}
          </div>

          <div class="answer-heading" style="margin-top:1.25rem;">
            <span>💡</span> 详细推导与解题全流程
          </div>
          <div class="explanation-content" style="line-height:1.7; color:var(--text-regular);">
            ${formatRichText(q.explanation || '<p>详细解析暂缺</p>')}
          </div>

          ${scoringPointsHtml}

          ${q.commonMistakes ? `
            <div class="callout callout-warning" style="margin-top:1rem;">
              <strong>⚠️ 易错点警示与避坑：</strong>
              <div style="margin-top:0.25rem;">${formatRichText(Array.isArray(q.commonMistakes) ? q.commonMistakes.join('\n') : q.commonMistakes)}</div>
            </div>
          ` : ''}

          ${q.verification ? `
            <div class="callout callout-info" style="margin-top:1rem;">
              <strong>🔍 验算与交叉核对技巧：</strong>
              <div style="margin-top:0.25rem;">${formatRichText(q.verification)}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * 初始化并渲染题目（必做区与拓展区）
 */
function initQuestions() {
  const reqContainer = document.getElementById('required-container');
  const extContainer = document.getElementById('extension-container');

  try {
    const rawQuestions = Array.isArray(window.QUESTION_DATA) ? window.QUESTION_DATA : [];
    const savedStates = loadState(STORAGE_KEYS.QUESTION_STATES, {});
    const savedWrongNotes = loadState(STORAGE_KEYS.WRONG_NOTES, {});

    // 按必做区和拓展区分组
    const requiredList = [];
    const extensionList = [];

    rawQuestions.forEach((q, idx) => {
      const isExt = q.section === 'extension' ||
                    q.section === '拓展区' ||
                    q.isExtension === true ||
                    (q.type && q.type.includes('拓展'));
      if (isExt) {
        extensionList.push({ q, idx });
      } else {
        requiredList.push({ q, idx });
      }
    });

    // 渲染必做区
    if (reqContainer) {
      if (requiredList.length === 0) {
        reqContainer.innerHTML = `
          <div class="card" style="text-align:center; padding:2rem; color:var(--text-muted);">
            <p>必做区暂无试题数据或正在载入中...</p>
          </div>
        `;
      } else {
        reqContainer.innerHTML = requiredList.map(item =>
          buildQuestionCardHtml(item.q, item.idx, savedStates[item.q.id])
        ).join('');
      }
    }

    // 渲染拓展区
    if (extContainer) {
      if (extensionList.length === 0) {
        extContainer.innerHTML = `
          <div class="card" style="text-align:center; padding:2rem; color:var(--text-muted);">
            <p>拓展区试题正在整理中，请优先攻克上方必做区试题。</p>
          </div>
        `;
      } else {
        extContainer.innerHTML = extensionList.map(item =>
          buildQuestionCardHtml(item.q, item.idx, savedStates[item.q.id])
        ).join('');
      }
    }

    // 预填充已存的错题草稿内容
    Object.keys(savedWrongNotes).forEach(qid => {
      const note = savedWrongNotes[qid];
      const formEl = document.getElementById(`error-form-${qid}`);
      if (formEl && note) {
        const catSelect = document.getElementById(`err-category-${qid}`);
        const stepsInput = document.getElementById(`err-steps-${qid}`);
        const actionInput = document.getElementById(`err-action-${qid}`);
        if (catSelect && note.category) catSelect.value = note.category;
        if (stepsInput && note.errorSteps) stepsInput.value = note.errorSteps;
        if (actionInput && note.correctionAction) actionInput.value = note.correctionAction;
      }
    });

    // 统一绑定事件委托监听器
    [reqContainer, extContainer].forEach(containerEl => {
      if (!containerEl) return;
      containerEl.addEventListener('click', handleQuestionContainerAction);
    });

  } catch (err) {
    if (reqContainer) renderModuleError(reqContainer, '必做题区模块', err);
    if (extContainer) renderModuleError(extContainer, '拓展题区模块', err);
  }
}

/**
 * 题目容器统一事件处理逻辑
 */
function handleQuestionContainerAction(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const action = btn.getAttribute('data-action');
  const qid = btn.getAttribute('data-qid');
  if (!qid) return;

  const card = document.getElementById(`qcard-${qid}`);
  const drawer = document.getElementById(`answer-drawer-${qid}`);
  const statusPill = document.getElementById(`status-pill-${qid}`);
  const errorForm = document.getElementById(`error-form-${qid}`);

  // 1. 展开/折叠单题解析（严格仅控制本题）
  if (action === 'toggle-answer') {
    if (!drawer) return;
    const isOpen = drawer.classList.contains('is-open') || drawer.classList.contains('show');
    if (isOpen) {
      drawer.classList.remove('is-open', 'show');
      btn.innerHTML = '🔍 查看解析与标准答案';
    } else {
      drawer.classList.add('is-open', 'show');
      btn.innerHTML = '🔼 收起解析内容';
    }
    return;
  }

  // 2. 标记我做对了
  if (action === 'mark-correct') {
    const states = loadState(STORAGE_KEYS.QUESTION_STATES, {});
    states[qid] = { status: QUESTION_STATUS.CORRECT, updatedAt: Date.now() };
    saveState(STORAGE_KEYS.QUESTION_STATES, states);

    if (card) {
      card.classList.remove('state-wrong', 'state-pending');
      card.classList.add('state-correct');
    }
    if (statusPill) {
      statusPill.className = 'status-pill status-correct';
      statusPill.textContent = '✓ 已掌握';
    }
    if (errorForm) {
      errorForm.style.display = 'none';
    }

    notifyStateChange('question-status');
    return;
  }

  // 3. 标记错题
  if (action === 'mark-wrong') {
    const states = loadState(STORAGE_KEYS.QUESTION_STATES, {});
    states[qid] = { status: QUESTION_STATUS.WRONG, updatedAt: Date.now() };
    saveState(STORAGE_KEYS.QUESTION_STATES, states);

    if (card) {
      card.classList.remove('state-correct', 'state-pending');
      card.classList.add('state-wrong');
    }
    if (statusPill) {
      statusPill.className = 'status-pill status-wrong';
      statusPill.textContent = '✗ 待重做';
    }

    // 展开错因表单并聚焦输入
    if (errorForm) {
      errorForm.style.display = 'block';
      const stepsInput = document.getElementById(`err-steps-${qid}`);
      if (stepsInput) stepsInput.focus();
    }

    notifyStateChange('question-status');
    return;
  }

  // 4. 重置本题
  if (action === 'mark-reset') {
    const states = loadState(STORAGE_KEYS.QUESTION_STATES, {});
    delete states[qid];
    saveState(STORAGE_KEYS.QUESTION_STATES, states);

    if (card) {
      card.classList.remove('state-correct', 'state-wrong');
      card.classList.add('state-pending');
    }
    if (statusPill) {
      statusPill.className = 'status-pill status-pending';
      statusPill.textContent = '未作答';
    }
    if (errorForm) {
      errorForm.style.display = 'none';
    }

    notifyStateChange('question-status');
    return;
  }

  // 5. 保存错题本
  if (action === 'save-error-note') {
    const catSelect = document.getElementById(`err-category-${qid}`);
    const stepsInput = document.getElementById(`err-steps-${qid}`);
    const actionInput = document.getElementById(`err-action-${qid}`);

    const category = catSelect ? catSelect.value : '其他';
    const errorSteps = stepsInput ? stepsInput.value.trim() : '';
    const correctionAction = actionInput ? actionInput.value.trim() : '';

    const allQuestions = Array.isArray(window.QUESTION_DATA) ? window.QUESTION_DATA : [];
    const targetQ = allQuestions.find(x => x.id === qid) || {};

    const wrongNotes = loadState(STORAGE_KEYS.WRONG_NOTES, {});
    wrongNotes[qid] = {
      qid,
      title: targetQ.title || `试题 ${qid}`,
      category,
      errorSteps,
      correctionAction,
      corrected: false,
      updatedAt: Date.now()
    };
    saveState(STORAGE_KEYS.WRONG_NOTES, wrongNotes);

    // 提示保存成功
    btn.textContent = '✓ 已保存!';
    setTimeout(() => {
      btn.textContent = '💾 保存至错题本';
    }, 1500);

    renderWrongNotesSummary();
    notifyStateChange('wrong-notes');
    return;
  }

  // 6. 关闭错题表单
  if (action === 'close-error-form') {
    if (errorForm) {
      errorForm.style.display = 'none';
    }
    return;
  }
}


// ============================================================================
// 八、错题记录模块 (Wrong Answer Tracking Module)
// ============================================================================

/**
 * 渲染错题复盘汇总区
 */
function renderWrongNotesSummary() {
  const container = document.getElementById('wrong-notes-container');
  if (!container) return;

  try {
    const wrongNotes = loadState(STORAGE_KEYS.WRONG_NOTES, {});
    const noteKeys = Object.keys(wrongNotes);

    // 统计各指标
    const totalWrong = noteKeys.length;
    let correctedCount = 0;
    const categoryCounts = {};
    ERROR_CATEGORIES.forEach(cat => { categoryCounts[cat] = 0; });

    noteKeys.forEach(key => {
      const item = wrongNotes[key];
      if (item.corrected) correctedCount++;
      if (item.category && categoryCounts[item.category] !== undefined) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts['其他']++;
      }
    });

    const pendingCount = totalWrong - correctedCount;

    // 渲染无错题时的占位卡片
    if (totalWrong === 0) {
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:2rem;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🎉</div>
          <h4 style="color:var(--success);">暂无错题记录！</h4>
          <p style="color:var(--text-muted); font-size:0.875rem;">
            在上方练习过程中，若发现推导受阻、漏圈或概念模糊，请务必点击题目右下角的 <strong>「✗ 标记错题」</strong>。<br>
            系统将在此处自动建立 12 类错因归档与纠偏动作库。
          </p>
        </div>
      `;
      return;
    }

    // 构建错因分布徽标 HTML
    const activeCategories = ERROR_CATEGORIES.filter(cat => categoryCounts[cat] > 0);
    const categoryBadgesHtml = activeCategories.map(cat => `
      <span class="badge" style="background:#fee2e2; color:#b91c1c; border:1px solid #fecaca; margin:2px;">
        ${escapeHtml(cat)}: <strong>${categoryCounts[cat]}</strong>
      </span>
    `).join('');

    let html = `
      <!-- 汇总面板 -->
      <div class="card" style="margin-bottom:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="margin-bottom:0.25rem;">📊 错题攻坚统计</h3>
            <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:0;">
              累计归档 <strong>${totalWrong}</strong> 道错题，已彻底纠正 <strong style="color:var(--success);">${correctedCount}</strong> 道，待复盘纠偏 <strong style="color:var(--danger);">${pendingCount}</strong> 道。
            </p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button type="button" class="btn btn-sm btn-outline" id="btn-export-errors-txt">📄 复制错题清爽文本</button>
          </div>
        </div>

        ${activeCategories.length > 0 ? `
          <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px dashed var(--border-color);">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--text-main); margin-right:0.5rem;">错因集中分布：</span>
            ${categoryBadgesHtml}
          </div>
        ` : ''}
      </div>

      <!-- 错题卡片明细列表 -->
      <div class="wrong-notes-list">
    `;

    noteKeys.forEach(qid => {
      const note = wrongNotes[qid];
      const isCorrected = !!note.corrected;

      html += `
        <div class="card error-log-card" id="error-card-${escapeHtml(qid)}" style="margin-bottom:1rem; border-left:4px solid ${isCorrected ? 'var(--success)' : 'var(--danger)'};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
            <div>
              <span class="q-index" style="margin-right:0.5rem;">${escapeHtml(qid)}</span>
              <strong style="font-size:1rem; color:var(--text-main);">${escapeHtml(note.title || `试题 ${qid}`)}</strong>
              <span class="badge" style="background:#fee2e2; color:#b91c1c; margin-left:0.5rem;">${escapeHtml(note.category || '其他')}</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="status-pill ${isCorrected ? 'status-correct' : 'status-wrong'}">
                ${isCorrected ? '✓ 已完成纠错' : '⚠️ 待彻底攻克'}
              </span>
            </div>
          </div>

          <div style="font-size:0.875rem; line-height:1.6; margin-bottom:0.5rem;">
            <div style="color:var(--danger); font-weight:600; margin-bottom:0.25rem;">❌ 当时错误思路与步骤：</div>
            <div style="background:var(--bg-subtle); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); color:var(--text-regular); white-space:pre-wrap;">${escapeHtml(note.errorSteps || '未记录详细步骤')}</div>
          </div>

          <div style="font-size:0.875rem; line-height:1.6; margin-bottom:0.75rem;">
            <div style="color:var(--primary); font-weight:600; margin-bottom:0.25rem;">🎯 规定纠偏动作：</div>
            <div style="background:var(--primary-light); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); color:var(--text-regular); white-space:pre-wrap;">${escapeHtml(note.correctionAction || '未填写纠偏动作')}</div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.6rem; border-top:1px solid var(--border-light); font-size:0.8125rem; color:var(--text-light); flex-wrap:wrap; gap:0.5rem;">
            <span>记录时间：${formatDateTime(note.updatedAt)}</span>
            <div style="display:flex; gap:0.4rem;">
              <button type="button" class="btn btn-sm btn-outline" data-wn-action="jump-to-q" data-qid="${escapeHtml(qid)}">🔍 查看原题</button>
              <button type="button" class="btn btn-sm ${isCorrected ? 'btn-secondary' : 'btn-success'}" data-wn-action="toggle-corrected" data-qid="${escapeHtml(qid)}">
                ${isCorrected ? '标记为未掌握' : '✓ 标记已纠正'}
              </button>
              <button type="button" class="btn btn-sm btn-secondary" data-wn-action="delete-note" data-qid="${escapeHtml(qid)}" style="color:var(--danger);">🗑️ 删除记录</button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // 绑定错题汇总卡片的操作事件
    container.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-wn-action]');
      if (!btn) return;
      const wnAction = btn.getAttribute('data-wn-action');
      const qid = btn.getAttribute('data-qid');
      if (!qid) return;

      const currentNotes = loadState(STORAGE_KEYS.WRONG_NOTES, {});

      // 1. 跳转回原题
      if (wnAction === 'jump-to-q') {
        scrollToElement(`qcard-${qid}`);
        return;
      }

      // 2. 切换已纠正标记
      if (wnAction === 'toggle-corrected') {
        if (currentNotes[qid]) {
          currentNotes[qid].corrected = !currentNotes[qid].corrected;
          currentNotes[qid].updatedAt = Date.now();
          saveState(STORAGE_KEYS.WRONG_NOTES, currentNotes);
          renderWrongNotesSummary();
          notifyStateChange('wrong-notes');
        }
        return;
      }

      // 3. 删除错题记录
      if (wnAction === 'delete-note') {
        if (confirm(`确定要从错题本中移除 ${qid} 的记录吗？`)) {
          delete currentNotes[qid];
          saveState(STORAGE_KEYS.WRONG_NOTES, currentNotes);
          renderWrongNotesSummary();
          notifyStateChange('wrong-notes');
        }
        return;
      }
    });

    // 错题文本一键复制功能
    const exportBtn = document.getElementById('btn-export-errors-txt');
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        let exportText = `【Day2 组合逻辑MSI设计 - 错题复盘汇总】\n生成时间：${formatDateTime(Date.now())}\n`;
        noteKeys.forEach(k => {
          const n = wrongNotes[k];
          exportText += `\n-------------------------------\n题目：${n.qid} - ${n.title}\n错因分类：${n.category}\n当时错误：${n.errorSteps || '无'}\n纠偏动作：${n.correctionAction || '无'}\n状态：${n.corrected ? '已纠正' : '待纠正'}\n`;
        });
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(exportText).then(() => {
            alert('错题复盘文本已复制到剪贴板！');
          }).catch(() => {
            prompt('请按 Ctrl+C 复制以下文本：', exportText);
          });
        } else {
          prompt('请按 Ctrl+C 复制以下文本：', exportText);
        }
      });
    }

  } catch (err) {
    renderModuleError(container, '错题记录模块', err);
  }
}

/**
 * 错题模块初始化包装
 */
function initWrongNotes() {
  renderWrongNotesSummary();
}


// ============================================================================
// 九、复测模块 (Review / Retest Module)
// ============================================================================

/**
 * 初始化并渲染当日复测区
 */
function initReviewModule() {
  const container = document.getElementById('review-container');
  const summaryContainer = document.getElementById('review-summary');
  if (!container) return;

  try {
    const reviewData = Array.isArray(window.REVIEW_QUESTIONS) && window.REVIEW_QUESTIONS.length > 0
      ? window.REVIEW_QUESTIONS
      : [
          {
            id: 'REV-01',
            title: '复测1：含无关项的卡诺图化简与多输出优化',
            difficulty: '中档',
            type: '综合化简',
            question: `
              <p>逻辑函数 $F(A,B,C,D) = \\sum m(0, 2, 5, 7, 8, 10, 13) + \\sum d(4, 6, 12, 14)$，约束条件为不存在 $A=B=C=D=1$ 的输入情况。</p>
              <p><strong>要求：</strong>利用卡诺图求出 $F$ 的最简与或表达式，并说明哪些无关项被当成了 1，哪些被当成了 0。</p>
            `,
            answer: `
              <p><strong>最简与或式：</strong> $F = \\bar{D}$</p>
              <p><strong>无关项处理：</strong>将 $d(4, 6, 12, 14)$ 全部选作 <strong>1</strong>，此时 $m(0,2,8,10)$ 与 $d(4,6,12,14)$ 恰好共同组成一个包含 8 个最小项的极大卡诺圈，对应的化简项为 $\\bar{D}$。而最小项 $m(5,7,13)$ 也可以通过圈选 $d(4,12)$ 等合并为 $B\\bar{A}$ 等，但最终检验发现只需 $F = \\bar{D} + B D$ 或类似化简，根据全部覆盖最小项原则：包含 $m(0,2,8,10,4,6,12,14)$ 为 $\\bar{D}$，再加上 $m(5,7,13)$ 与 $m(15)$ (由于约束项 $d(15)$ 可视作1)，得到八单元卡诺圈为 $D$ 变量相关项，综合得出 $F = \\bar{D} + B$。</p>
            `,
            explanation: `
              <p>考查重点在于卡诺图中 4 变量格雷码对应关系：</p>
              <ol style="padding-left:1.25rem; line-height:1.7;">
                <li>第一列（CD=00）：包含 0, 4, 12, 8；第二列（CD=01）：包含 1, 5, 13, 9；第三列（CD=11）：包含 3, 7, 15, 11；第四列（CD=10）：包含 2, 6, 14, 10。</li>
                <li>第 1 列和第 4 列全为 1 或 d，合并成 8 单元格大圈，消去 A, B, C，得 $\\bar{D}$；</li>
                <li>剩余最小项 $5, 7, 13$ 与 $d(4,6,12,14,15)$ 合并，在第 2 行（AB=01）与第 3 行（AB=11）合并出 $B$；</li>
                <li>最简化结果即为 $F = \\bar{D} + B$。</li>
              </ol>
            `
          },
          {
            id: 'REV-02',
            title: '复测2：判别电路中的逻辑冒险并写出消除项',
            difficulty: '中档',
            type: '分析推导',
            question: `
              <p>已知逻辑函数表达式为 $L(A,B,C) = A B + \\bar{A} C$。</p>
              <p><strong>要求：</strong></p>
              <ol style="padding-left:1.25rem;">
                <li>判断该电路是否存在逻辑冒险？说明在何种输入条件下会发生毛刺。</li>
                <li>给出使用「增加冗余项法」消除该冒险后的最简与或表达式。</li>
              </ol>
            `,
            answer: `
              <p><strong>1. 冒险判断：</strong>存在逻辑冒险。当 $B=1$ 且 $C=1$ 时，$L = A \\cdot 1 + \\bar{A} \\cdot 1 = A + \\bar{A}$。当输入信号 $A$ 发生高低电平跳变时，由于门延迟，电路输出可能产生瞬间低电平毛刺（0型冒险/正脉冲冒险）。</p>
              <p><strong>2. 消除冒险后的表达式：</strong>增加冗余项 $BC$，修正后的表达式为：$L = A B + \\bar{A} C + B C$。</p>
            `,
            explanation: `
              <p>由卡诺图易见：$AB$ 圈覆盖 $m(6, 7)$，$\\bar{A}C$ 圈覆盖 $m(1, 3)$。在 $A$ 变量轴上，最小项 3 (011) 与 7 (111) 相邻相切，但属于两个不同的卡诺圈！根据相邻相切定理，增加一个覆盖 $m(3, 7)$ 的冗余圈 $BC$，即可保证在 $A$ 切换过渡期间输出恒定为 1，彻底消除了冒险。</p>
            `
          },
          {
            id: 'REV-03',
            title: '复测3：三变量多数表决器的与非-与非门实现',
            difficulty: '基础',
            type: '综合设计',
            question: `
              <p>设计一个三人表决电路（A, B, C），当两人及以上赞成（输入为1）时，决议通过（输出为1）。</p>
              <p><strong>要求：</strong>写出最简与或式，并转换为<strong>仅用与非门（NAND）</strong>实现的逻辑表达式。</p>
            `,
            answer: `
              <p><strong>1. 最简与或表达式：</strong> $F = AB + BC + AC$</p>
              <p><strong>2. 与非-与非门表达式：</strong>利用两次求反定律：</p>
              <p>$$F = \\overline{\\overline{AB + BC + AC}} = \\overline{\\overline{AB} \\cdot \\overline{BC} \\cdot \\overline{AC}}$$</p>
            `,
            explanation: `
              <p>本题是考研中最经典的标准变换：</p>
              <p>由标准与或式 $F = AB + BC + AC$ 出发，整体取两次非，再对内层应用摩根定律展开，得到 4 个两输入与非门构成的两级门网络（前级3个与非门分别实现 $\\overline{AB}, \\overline{BC}, \\overline{AC}$，后级1个3输入与非门实现总输出）。</p>
            `
          }
        ];

    const savedReviews = loadState(STORAGE_KEYS.REVIEW_STATUS, {});

    let html = '';
    reviewData.forEach((rev, idx) => {
      const rid = rev.id || `REV-${idx + 1}`;
      const userMastery = savedReviews[rid] ? savedReviews[rid].mastery : null;

      let badgeHtml = '<span class="status-pill status-pending" id="rev-pill-' + rid + '">未自评</span>';
      if (userMastery === REVIEW_MASTERY.MASTERED) {
        badgeHtml = '<span class="status-pill status-correct" id="rev-pill-' + rid + '">✓ 已掌握</span>';
      } else if (userMastery === REVIEW_MASTERY.UNSTABLE) {
        badgeHtml = '<span class="status-pill" style="background:#fef3c7; color:#b45309;" id="rev-pill-' + rid + '">⚠️ 不稳定</span>';
      } else if (userMastery === REVIEW_MASTERY.UNMASTERED) {
        badgeHtml = '<span class="status-pill status-wrong" id="rev-pill-' + rid + '">✗ 未掌握</span>';
      }

      html += `
        <div class="card retest-card" style="margin-bottom:1.25rem;" id="rev-card-${escapeHtml(rid)}">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="q-index">${escapeHtml(rid)}</span>
              <strong style="font-size:1.05rem; color:var(--text-main);">${escapeHtml(rev.title || `复测题 ${rid}`)}</strong>
              <span class="badge ${getDifficultyBadgeClass(rev.difficulty)}">${escapeHtml(rev.difficulty || '中档')}</span>
              <span class="badge badge-source">${escapeHtml(rev.type || '分析题')}</span>
            </div>
            <div>${badgeHtml}</div>
          </div>

          <div class="q-stem" style="margin-bottom:1rem;">
            ${formatRichText(rev.question || '')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; padding-top:0.75rem; border-top:1px solid var(--border-light);">
            <button type="button" class="btn btn-toggle-answer" data-rev-action="toggle-answer" data-rid="${escapeHtml(rid)}">
              🔍 查看复测解析
            </button>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span style="font-size:0.8125rem; color:var(--text-muted); margin-right:0.25rem;">核对后自评：</span>
              <button type="button" class="btn btn-sm btn-success" data-rev-action="assess" data-level="${REVIEW_MASTERY.MASTERED}" data-rid="${escapeHtml(rid)}">已掌握</button>
              <button type="button" class="btn btn-sm" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a;" data-rev-action="assess" data-level="${REVIEW_MASTERY.UNSTABLE}" data-rid="${escapeHtml(rid)}">不稳定</button>
              <button type="button" class="btn btn-sm btn-danger" data-rev-action="assess" data-level="${REVIEW_MASTERY.UNMASTERED}" data-rid="${escapeHtml(rid)}">未掌握</button>
            </div>
          </div>

          <!-- 解析抽屉 -->
          <div class="answer-drawer" id="rev-drawer-${escapeHtml(rid)}">
            <div class="answer-section">
              <div class="answer-heading"><span>📋</span> 标准答案</div>
              <div class="standard-answer">${formatRichText(rev.answer || '')}</div>
              <div class="answer-heading" style="margin-top:1rem;"><span>💡</span> 解析与推导</div>
              <div style="line-height:1.7; color:var(--text-regular);">${formatRichText(rev.explanation || '')}</div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // 事件委托绑定
    container.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-rev-action]');
      if (!btn) return;
      const revAction = btn.getAttribute('data-rev-action');
      const rid = btn.getAttribute('data-rid');
      if (!rid) return;

      if (revAction === 'toggle-answer') {
        const drawer = document.getElementById(`rev-drawer-${rid}`);
        if (!drawer) return;
        const isOpen = drawer.classList.contains('is-open') || drawer.classList.contains('show');
        if (isOpen) {
          drawer.classList.remove('is-open', 'show');
          btn.innerHTML = '🔍 查看复测解析';
        } else {
          drawer.classList.add('is-open', 'show');
          btn.innerHTML = '🔼 收起解析';
        }
        return;
      }

      if (revAction === 'assess') {
        const level = btn.getAttribute('data-level');
        const revStatus = loadState(STORAGE_KEYS.REVIEW_STATUS, {});
        revStatus[rid] = { mastery: level, updatedAt: Date.now() };
        saveState(STORAGE_KEYS.REVIEW_STATUS, revStatus);

        const pill = document.getElementById(`rev-pill-${rid}`);
        if (pill) {
          if (level === REVIEW_MASTERY.MASTERED) {
            pill.className = 'status-pill status-correct';
            pill.textContent = '✓ 已掌握';
          } else if (level === REVIEW_MASTERY.UNSTABLE) {
            pill.className = 'status-pill';
            pill.style.background = '#fef3c7';
            pill.style.color = '#b45309';
            pill.textContent = '⚠️ 不稳定';
          } else {
            pill.className = 'status-pill status-wrong';
            pill.textContent = '✗ 未掌握';
          }
        }

        renderReviewSummary(reviewData, revStatus, summaryContainer);
        notifyStateChange('review');
        return;
      }
    });

    renderReviewSummary(reviewData, savedReviews, summaryContainer);

  } catch (err) {
    renderModuleError(container, '当日复测模块', err);
  }
}

/**
 * 渲染复测统计与结课自评汇总
 */
function renderReviewSummary(reviewList, savedReviews, container) {
  if (!container) return;

  const total = reviewList.length;
  let masteredCount = 0;
  let unstableCount = 0;
  let unmasteredCount = 0;

  reviewList.forEach(item => {
    const s = savedReviews[item.id];
    if (s) {
      if (s.mastery === REVIEW_MASTERY.MASTERED) masteredCount++;
      else if (s.mastery === REVIEW_MASTERY.UNSTABLE) unstableCount++;
      else if (s.mastery === REVIEW_MASTERY.UNMASTERED) unmasteredCount++;
    }
  });

  const assessedCount = masteredCount + unstableCount + unmasteredCount;
  const masteryRate = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

  container.innerHTML = `
    <div class="card" style="margin-top:1.5rem; background:linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);">
      <h3 style="margin-bottom:0.5rem;">🎯 当日复测达成度评估</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
        <div>
          <span>已自评：<strong>${assessedCount}</strong> / ${total} 题</span> |
          <span style="color:var(--success);">已掌握：<strong>${masteredCount}</strong></span> |
          <span style="color:var(--warning-hover);">不稳定：<strong>${unstableCount}</strong></span> |
          <span style="color:var(--danger);">未掌握：<strong>${unmasteredCount}</strong></span>
        </div>
        <div style="font-size:1.15rem; font-weight:700; color:var(--primary);">
          掌握率：${masteryRate}%
        </div>
      </div>
      <div class="progress-bar-container" style="height:10px;">
        <div class="progress-fill" style="width:${masteryRate}%; background:var(--primary);"></div>
      </div>
      ${unmasteredCount > 0 || unstableCount > 0 ? `
        <div style="margin-top:0.75rem; font-size:0.875rem; color:var(--text-muted);">
          📌 <strong>后续继承提示：</strong>本复测中标记为「不稳定」与「未掌握」的考点，将自动列入 Day 2 课前热身攻坚清单。
        </div>
      ` : ''}
    </div>
  `;
}


// ============================================================================
// 十、Canvas 交互演示模块：74HC138 译码 + 74HC151 选择联动实验台
// ============================================================================

/**
 * 初始化 MSI 联动实验台
 *
 * 排版要点（与 SVG 图形层共用同一套规则）：
 * 1. 所有坐标由「内容块宽度」推导并整体居中，不写死绝对 x，窄屏右侧不会被裁；
 * 2. 文字不与导线同 y：总线标签置于线上方，数据端文字放在矩形徽标内；
 * 3. 画布高度由「最后一行文字基线 + 24px 边距」反推，底部提示不再被切；
 * 4. 宽屏阈值提高到 700px，低于该宽度切换纵向清单布局，杜绝挤字。
 *
 * 交互：点击 A2/A1/A0 改地址；点击 D0~D7 改“真值表”某一位。
 */
function initCanvasAnimation() {
  const container = document.getElementById('canvas-container');
  const fallback = document.getElementById('canvas-fallback');
  let canvas = document.getElementById('logic-canvas');

  if (!container) return;

  try {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'logic-canvas';
      container.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D 上下文不可用');
    }

    const PAL = {
      ink: '#1e293b', blue: '#0284c7', red: '#dc2626', green: '#16a34a',
      gray: '#64748b', border: '#cbd5e1', soft: '#eef2ff', low: '#dbeafe', high: '#fee2e2'
    };

    const FONT = '"Segoe UI", system-ui, "Microsoft YaHei", sans-serif';
    const WIDE_MIN = 700;          // 低于该宽度改用纵向布局
    const ROW_H = 32;              // 宽屏行距
    const ROWS = 8;

    const state = { addr: 5, data: [1, 1, 0, 1, 0, 1, 0, 1] };

    let pulse = 0;
    let animFrameId = null;
    let hitboxes = [];
    let narrow = false;

    /** 圆角矩形路径 */
    function roundRect(x, y, w, h, r) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
      ctx.lineTo(x + rr, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
      ctx.lineTo(x, y + rr);
      ctx.quadraticCurveTo(x, y, x + rr, y);
      ctx.closePath();
    }

    /** 统一文字绘制：每次显式设置 align / baseline，避免残留状态导致错位 */
    function text(x, y, str, size, color, align, bold) {
      ctx.font = (bold ? '700 ' : '400 ') + size + 'px ' + FONT;
      ctx.fillStyle = color;
      ctx.textAlign = align || 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(str, x, y);
    }

    function bits() {
      return [(state.addr >> 2) & 1, (state.addr >> 1) & 1, state.addr & 1];
    }

    function onesList() {
      const arr = [];
      state.data.forEach(function (v, i) { if (v) arr.push(i); });
      return arr;
    }

    function levelColor(v) { return v ? PAL.red : PAL.blue; }

    /** 电平开关（登记点击热区） */
    function drawSwitch(x, y, w, h, label, val, key, fontSize) {
      roundRect(x, y, w, h, 7);
      ctx.fillStyle = val ? PAL.high : PAL.low;
      ctx.fill();
      ctx.strokeStyle = val ? PAL.red : PAL.blue;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '700 ' + (fontSize || 14) + 'px ' + FONT;
      ctx.fillStyle = levelColor(val);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + w / 2, y + h / 2 + 0.5);

      hitboxes.push({ x: x, y: y, w: w, h: h, key: key });
    }

    /** 器件外框：标题条 + 底部说明，框内不放导线 */
    function drawChip(x, y, w, h, title, note, mark) {
      roundRect(x, y, w, h, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = PAL.ink;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      roundRect(x, y, w, 26, 8);
      ctx.fillStyle = PAL.soft;
      ctx.fill();

      ctx.font = '700 13px ' + FONT;
      ctx.fillStyle = PAL.blue;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, x + w / 2, y + 14);

      // 芯片型号标记：用极浅灰填充框内空白，与 SVG 图形层的“8 → 3”标记保持一致
      if (mark) {
        ctx.font = '700 24px ' + FONT;
        ctx.fillStyle = '#e2e9f3';
        ctx.fillText(mark, x + w / 2, y + h / 2 + 8);
      }

      if (note) {
        ctx.font = '400 10px ' + FONT;
        ctx.fillStyle = PAL.gray;
        ctx.fillText(note, x + w / 2, y + h - 12);
      }
    }

    /** 导线 + 高电平粒子流 */
    function drawWire(x1, y1, x2, y2, val) {
      ctx.beginPath();
      ctx.strokeStyle = levelColor(val);
      ctx.lineWidth = val ? 2.4 : 1.8;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (val) {
        const dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        if (dist > 16) {
          const step = 22;
          for (let p = (pulse * 14) % step; p < dist; p += step) {
            const px = x1 + ((x2 - x1) * p) / dist;
            const py = y1 + ((y2 - y1) * p) / dist;
            ctx.beginPath();
            ctx.arc(px, py, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(220,38,38,0.45)';
            ctx.fill();
          }
        }
      }
    }

    /** 宽屏几何：全部由内容宽度推导，整体水平居中 */
    function wideGeometry(w) {
      const contentW = 628;
      const x0 = Math.max(16, Math.round((w - contentW) / 2));
      return {
        x0: x0,
        swX: x0, swW: 92, swH: 34, swYs: [96, 150, 204],
        c138x: x0 + 112, chipW: 130, chipY: 56,
        chipH: ROWS * ROW_H + 18,
        dataX: x0 + 316, dataW: 26,
        c151x: x0 + 366,
        outX: x0 + 496, badgeX: x0 + 542, badgeW: 86,
        rowY: function (i) { return 76 + i * ROW_H; }
      };
    }

    function drawWide(w, h) {
      const G = wideGeometry(w);
      const b = bits();

      // ---- 顶部共用地址总线（线在 y=46，标签在线上方，互不压字）----
      ctx.strokeStyle = PAL.blue;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(G.swX + G.swW, G.swYs[0] + 17);
      ctx.lineTo(G.x0 + 100, G.swYs[0] + 17);
      ctx.lineTo(G.x0 + 100, 42);
      ctx.lineTo(G.c151x + G.chipW / 2, 42);
      ctx.lineTo(G.c151x + G.chipW / 2, G.chipY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(G.x0 + 100, 42);
      ctx.lineTo(G.c138x + G.chipW / 2, 42);
      ctx.lineTo(G.c138x + G.chipW / 2, G.chipY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(G.c138x + G.chipW / 2, 42, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = PAL.blue;
      ctx.fill();

      text(G.x0 + 250, 28, '共用地址 A2A1A0', 11, PAL.blue, 'center', true);

      // ---- 三只地址开关 ----
      const names = ['A2 (权4)', 'A1 (权2)', 'A0 (权1)'];
      for (let i = 0; i < 3; i++) {
        drawSwitch(G.swX, G.swYs[i], G.swW, G.swH, names[i] + '=' + b[i], b[i], 'addr' + i, 11);
      }

      // ---- 两片器件 ----
      drawChip(G.c138x, G.chipY, G.chipW, G.chipH, '74HC138', '3-8 译码器（低有效）', '3→8');
      drawChip(G.c151x, G.chipY, G.chipW, G.chipH, '74HC151', '8 选 1（E 接地）', '8→1');

      // ---- 8 路：138 输出 → 数据端 → 151 输入 ----
      for (let i = 0; i < ROWS; i++) {
        const y = G.rowY(i);
        const selected = (i === state.addr);
        const yVal = selected ? 0 : 1;
        const d = state.data[i];

        drawWire(G.c138x + G.chipW, y, G.c138x + G.chipW + 4, y, yVal);
        ctx.beginPath();
        ctx.arc(G.c138x + G.chipW + 7, y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = levelColor(yVal);
        ctx.fill();

        // 只保留输出名（最小项编号统一在底部说明中给出，避免行内堆叠微型文字）
        text(G.c138x + G.chipW + 14, y + 4, 'Y' + i, 11, selected ? PAL.blue : PAL.gray, 'left', selected);

        drawWire(G.c138x + G.chipW + 30, y, G.dataX - 6, y, d);
        drawSwitch(G.dataX, y - 11, G.dataW, 22, String(d), d, 'data' + i, 12);

        drawWire(G.dataX + G.dataW, y, G.c151x, y, d);
        text(G.c151x + 10, y + 4, 'D' + i, 9, PAL.blue, 'left', false);
      }

      // ---- 输出支路与徽标 ----
      const yv = state.data[state.addr];
      const yMid = G.rowY(3) + (ROW_H / 2) + 2;
      drawWire(G.outX, yMid, G.outX + 20, yMid, yv);
      drawWire(G.outX + 20, yMid, G.outX + 20, yMid + 30, yv);
      drawWire(G.outX + 20, yMid + 30, G.badgeX - 6, yMid + 30, yv);

      roundRect(G.badgeX, yMid + 16, G.badgeW, 28, 6);
      ctx.fillStyle = yv ? PAL.high : PAL.low;
      ctx.fill();
      ctx.strokeStyle = levelColor(yv);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = '700 15px ' + FONT;
      ctx.fillStyle = levelColor(yv);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Y = ' + yv, G.badgeX + G.badgeW / 2, yMid + 30.5);

      // ---- 底部说明（5 行；最后一行基线 424，画布高 430 内不再被裁）----
      const infoY = 358;
      const list = onesList();
      text(24, infoY, '当前地址 A2A1A0 = ' + b.join('') + '（十进制 ' + state.addr + '）', 12, PAL.ink, 'left', true);
      text(24, infoY + 20, '138：仅 Y' + state.addr + ' = 0（选中 m' + state.addr + '），其余 7 路为 1', 12, PAL.blue, 'left', false);
      text(24, infoY + 40, '151：选中 D' + state.addr + ' = ' + state.data[state.addr] + ' → Y = ' + yv, 12, PAL.red, 'left', false);
      text(24, infoY + 60, '由 8 个数据端决定的函数：' + (list.length ? 'F = Σm(' + list.join(', ') + ')' : 'F = 0'), 11, PAL.gray, 'left', false);
      text(24, infoY + 80, '操作：点击左侧 A2/A1/A0 改地址，点击中间 D0~D7 改真值表', 11, PAL.gray, 'left', false);
    }

    function drawNarrow(w, h) {
      const b = bits();
      const gap = 8;
      const swW = Math.floor((w - 32 - gap * 2) / 3);

      for (let i = 0; i < 3; i++) {
        drawSwitch(16 + i * (swW + gap), 28, swW, 40,
          ['A2=' + b[0], 'A1=' + b[1], 'A0=' + b[2]][i], b[i], 'addr' + i, 13);
      }

      text(16, 96, '138 选中 Y' + state.addr + '（=0）｜151 选中 D' + state.addr, 11, PAL.gray, 'left', false);

      for (let i = 0; i < ROWS; i++) {
        const y = 116 + i * 36;
        const selected = (i === state.addr);
        const yVal = selected ? 0 : 1;

        if (selected) {
          roundRect(10, y - 6, w - 20, 34, 6);
          ctx.fillStyle = PAL.soft;
          ctx.fill();
          ctx.strokeStyle = PAL.border;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        text(18, y + 14, 'm' + i, 12, selected ? PAL.ink : PAL.gray, 'left', selected);
        text(50, y + 14, 'Y' + i + ' = ' + yVal, 12, levelColor(yVal), 'left', false);

        const d = state.data[i];
        drawSwitch(w - 76, y, 56, 24, 'D' + i + '=' + d, d, 'data' + i, 11);
      }

      const infoY = 428;
      const yv = state.data[state.addr];
      const list = onesList();
      text(16, infoY, '输出 Y = D' + state.addr + ' = ' + yv, 14, levelColor(yv), 'left', true);
      text(16, infoY + 22, list.length ? 'F = Σm(' + list.join(', ') + ')' : 'F = 0（数据端全 0）', 11, PAL.gray, 'left', false);
      text(16, infoY + 42, '点击上方地址或右侧 D 可修改', 11, PAL.gray, 'left', false);
    }

    /** 主绘制 */
    function draw() {
      const w = parseFloat(canvas.style.width) || 800;
      const h = parseFloat(canvas.style.height) || 460;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      hitboxes = [];

      if (narrow) {
        // 纵向布局下页面标题已说明用途，不再重复右上角小标题，换取顶部留白
        drawNarrow(w, h);
      } else {
        text(w - 12, 18, '138 产生最小项 → 151 选择输出', 11, PAL.gray, 'right', true);
        drawWide(w, h);
      }
    }

    /** 尺寸与 DPI 自适应；高度由布局常量反推 */
    function resizeCanvas() {
      // 扣除容器左右内边距后再取可用宽度，避免画布撑出容器
      const cs = window.getComputedStyle(container);
      const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      const containerWidth = (container.clientWidth || 800) - padX;
      const width = Math.max(320, Math.min(containerWidth, 880));
      narrow = width < WIDE_MIN;
      const height = narrow ? 500 : 460;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      draw();
    }

    /** 命中检测与状态切换 */
    function handleTap(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      for (let i = 0; i < hitboxes.length; i++) {
        const hb = hitboxes[i];
        if (x >= hb.x && x <= hb.x + hb.w && y >= hb.y && y <= hb.y + hb.h) {
          if (hb.key.indexOf('addr') === 0) {
            const bit = parseInt(hb.key.slice(4), 10);
            state.addr = state.addr ^ (1 << (2 - bit));
          } else if (hb.key.indexOf('data') === 0) {
            const idx = parseInt(hb.key.slice(4), 10);
            state.data[idx] = state.data[idx] ? 0 : 1;
          }
          draw();
          return true;
        }
      }
      return false;
    }

    canvas.addEventListener('click', function (e) {
      handleTap(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchstart', function (e) {
      if (!e.touches || e.touches.length === 0) return;
      const hit = handleTap(e.touches[0].clientX, e.touches[0].clientY);
      if (hit) {
        e.preventDefault();
      }
    }, { passive: false });

    // 外部辅助按钮（移动端更易点击）
    let controlsDiv = document.getElementById('canvas-external-controls');
    if (!controlsDiv) {
      controlsDiv = document.createElement('div');
      controlsDiv.id = 'canvas-external-controls';
      controlsDiv.className = 'canvas-controls';
      controlsDiv.innerHTML = [
        '<div class="sim-btn-group">',
        '  <button type="button" class="btn btn-sm btn-secondary" id="sim-btn-next">地址 +1</button>',
        '  <button type="button" class="btn btn-sm btn-secondary" id="sim-btn-prev">地址 -1</button>',
        '  <button type="button" class="btn btn-sm btn-outline" id="sim-btn-clear">数据端全 0</button>',
        '  <button type="button" class="btn btn-sm btn-outline" id="sim-btn-fill">数据端全 1</button>',
        '</div>',
        '<div class="sim-status-text" id="sim-status-output">当前地址 ' + state.addr + '，输出 Y = ' + state.data[state.addr] + '</div>'
      ].join('\n');
      container.appendChild(controlsDiv);

      const updateStatus = function () {
        const out = document.getElementById('sim-status-output');
        if (out) {
          out.textContent = '当前地址 ' + state.addr + '，输出 Y = ' + state.data[state.addr]
            + '；F = Σm(' + (onesList().join(', ') || '—') + ')';
        }
        draw();
      };

      const bind = function (id, fn) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', function () { fn(); updateStatus(); });
      };

      bind('sim-btn-next', function () { state.addr = (state.addr + 1) % 8; });
      bind('sim-btn-prev', function () { state.addr = (state.addr + 7) % 8; });
      bind('sim-btn-clear', function () { state.data = [0, 0, 0, 0, 0, 0, 0, 0]; });
      bind('sim-btn-fill', function () { state.data = [1, 1, 1, 1, 1, 1, 1, 1]; });
    }

    /** 动画循环：仅驱动高电平导线上的粒子流动 */
    function animLoop() {
      pulse += 0.05;
      if (pulse > 1000) pulse = 0;
      draw();
      animFrameId = requestAnimationFrame(animLoop);
    }

    resizeCanvas();
    animFrameId = requestAnimationFrame(animLoop);

    let resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });

  } catch (err) {
    if (fallback) fallback.style.display = 'block';
    renderModuleError(container, 'Canvas 交互演示模块', err);
  }
}


// ============================================================================
// 十一、进度统计模块 (Progress Statistics Module)
// ============================================================================

/**
 * 渲染全站综合复习进度看板
 */
function updateProgressStatistics() {
  const container = document.getElementById('progress-container');
  if (!container) return;

  try {
    const rawQuestions = Array.isArray(window.QUESTION_DATA) ? window.QUESTION_DATA : [];
    const savedStates = loadState(STORAGE_KEYS.QUESTION_STATES, {});
    const savedTasks = loadState(STORAGE_KEYS.TASKS, {});
    const savedWrongNotes = loadState(STORAGE_KEYS.WRONG_NOTES, {});
    const savedReviews = loadState(STORAGE_KEYS.REVIEW_STATUS, {});

    // 题目指标
    const totalQuestions = rawQuestions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;

    rawQuestions.forEach(q => {
      const s = savedStates[q.id];
      if (s && s.status) {
        if (s.status === QUESTION_STATUS.CORRECT) {
          correctCount++;
          attemptedCount++;
        } else if (s.status === QUESTION_STATUS.WRONG) {
          wrongCount++;
          attemptedCount++;
        }
      }
    });

    const questionPercent = totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0;
    const correctRate = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    // 任务指标
    const tasks = Array.isArray(window.STUDY_TASKS) ? window.STUDY_TASKS : [];
    const totalTasks = tasks.length || 8;
    let finishedTasks = 0;
    Object.keys(savedTasks).forEach(k => { if (savedTasks[k]) finishedTasks++; });
    const taskPercent = totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;

    // 错题指标
    const totalWrongNotes = Object.keys(savedWrongNotes).length;
    let correctedNotes = 0;
    Object.keys(savedWrongNotes).forEach(k => {
      if (savedWrongNotes[k].corrected) correctedNotes++;
    });

    // 复测指标
    const reviewData = Array.isArray(window.REVIEW_QUESTIONS) ? window.REVIEW_QUESTIONS : [];
    const totalReviews = reviewData.length || 3;
    let masteredReviews = 0;
    Object.keys(savedReviews).forEach(k => {
      if (savedReviews[k].mastery === REVIEW_MASTERY.MASTERED) masteredReviews++;
    });

    container.innerHTML = `
      <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <h2 style="font-size:1.25rem; margin-bottom:0;">📊 Day 2 全日强化复习进度总览</h2>
          <button type="button" class="btn btn-sm btn-secondary" id="btn-clear-day-data" style="color:var(--danger); border-color:#fecaca;" title="清空今日记录并重新开始">
            ⚠️ 清除本地做题记录
          </button>
        </div>

        <!-- 4 核心指标卡片栅格 -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.85rem; margin-bottom:1.25rem;">
          <div style="background:#eff6ff; padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid #bfdbfe;">
            <div style="font-size:0.8125rem; color:#1e40af; font-weight:600;">📋 核心任务达成</div>
            <div style="font-size:1.4rem; font-weight:700; color:#1d4ed8; margin-top:0.25rem;">
              ${finishedTasks} <span style="font-size:0.9rem; font-weight:500; color:#4b5563;">/ ${totalTasks}</span>
            </div>
            <div style="font-size:0.75rem; color:#6b7280; margin-top:0.2rem;">任务完成率 ${taskPercent}%</div>
          </div>

          <div style="background:#f0fdf4; padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid #bbf7d0;">
            <div style="font-size:0.8125rem; color:#166534; font-weight:600;">✏️ 题库练习覆盖</div>
            <div style="font-size:1.4rem; font-weight:700; color:#15803d; margin-top:0.25rem;">
              ${attemptedCount} <span style="font-size:0.9rem; font-weight:500; color:#4b5563;">/ ${totalQuestions}</span>
            </div>
            <div style="font-size:0.75rem; color:#6b7280; margin-top:0.2rem;">覆盖进度 ${questionPercent}% | 正确率 ${correctRate}%</div>
          </div>

          <div style="background:#fef2f2; padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid #fecaca;">
            <div style="font-size:0.8125rem; color:#991b1b; font-weight:600;">📝 错题攻坚归因</div>
            <div style="font-size:1.4rem; font-weight:700; color:#b91c1c; margin-top:0.25rem;">
              ${totalWrongNotes} <span style="font-size:0.9rem; font-weight:500; color:#4b5563;">道记录</span>
            </div>
            <div style="font-size:0.75rem; color:#6b7280; margin-top:0.2rem;">已彻底纠正 ${correctedNotes} 道</div>
          </div>

          <div style="background:#fffbeb; padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid #fde68a;">
            <div style="font-size:0.8125rem; color:#92400e; font-weight:600;">🔄 当日复测攻坚</div>
            <div style="font-size:1.4rem; font-weight:700; color:#b45309; margin-top:0.25rem;">
              ${masteredReviews} <span style="font-size:0.9rem; font-weight:500; color:#4b5563;">/ ${totalReviews}</span>
            </div>
            <div style="font-size:0.75rem; color:#6b7280; margin-top:0.2rem;">掌握率 ${totalReviews > 0 ? Math.round((masteredReviews / totalReviews) * 100) : 0}%</div>
          </div>
        </div>

        <!-- 总体总进度条 -->
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8125rem; color:var(--text-muted); margin-bottom:0.35rem;">
            <span>当日综合完成度</span>
            <span>${Math.round((taskPercent * 0.4 + questionPercent * 0.6))}%</span>
          </div>
          <div class="progress-bar-container" style="height:10px;">
            <div class="progress-fill" style="width:${Math.round((taskPercent * 0.4 + questionPercent * 0.6))}%;"></div>
          </div>
        </div>
      </div>
    `;

    // 清空数据按钮
    const clearBtn = document.getElementById('btn-clear-day-data');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('警告：此操作将清除 Day 2 的所有做题勾选、自评状态和错题本记录！\n确定要重新开始吗？')) {
          clearDayState();
          alert('做题记录已重置。');
          location.reload();
        }
      });
    }

  } catch (err) {
    renderModuleError(container, '进度统计模块', err);
  }
}

/**
 * 进度统计模块初始化与全局事件挂载
 */
function initProgressModule() {
  updateProgressStatistics();

  // 监听全站状态变更事件，动态刷新进度
  window.addEventListener('day2:state-change', function () {
    updateProgressStatistics();
  });
}


// ============================================================================
// 十二、导航与滚动交互模块 (Navigation Module)
// ============================================================================

/**
 * 初始化吸顶导航平滑滚动与高亮观察器
 */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  try {
    const navItems = nav.querySelectorAll('.nav-item');
    if (!navItems || navItems.length === 0) return;

    // 平滑滚动监听
    navItems.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 更新 active 类
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    });

    // 滚动监听 IntersectionObserver 自动高亮当前阅读区域
    const sectionIds = [
      'sec-progress',
      'sec-tasks',
      'sec-knowledge',
      'sec-canvas',
      'sec-required',
      'sec-extension',
      'sec-errors',
      'sec-review'
    ];

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const secId = entry.target.id;
            navItems.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${secId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0.1
      });

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

  } catch (err) {
    console.warn('[Navigation] 导航高亮初始化异常:', err);
  }
}


// ============================================================================
// 十三、打印辅助 (Print Helper Module)
// ============================================================================

/**
 * 初始化打印事件监听：打印前强制展开所有答案与卡片，打印后还原
 */
function initPrintHelper() {
  let savedDrawerStates = [];
  let savedCardStates = [];

  window.addEventListener('beforeprint', function () {
    try {
      // 1. 暂存并展开所有解析抽屉
      savedDrawerStates = [];
      const drawers = document.querySelectorAll('.answer-drawer');
      drawers.forEach((drawer, idx) => {
        const wasOpen = drawer.classList.contains('is-open') || drawer.classList.contains('show');
        savedDrawerStates.push({ drawer, wasOpen });
        drawer.classList.add('is-open', 'show');
        drawer.style.maxHeight = 'none';
        drawer.style.opacity = '1';
      });

      // 2. 暂存并展开所有知识卡片
      savedCardStates = [];
      const kcBodies = document.querySelectorAll('.kc-body');
      kcBodies.forEach((body, idx) => {
        const wasOpen = body.style.maxHeight !== '0px' && body.style.maxHeight !== '';
        savedCardStates.push({ body, wasOpen });
        body.style.maxHeight = 'none';
        body.style.opacity = '1';
        body.style.padding = '1rem 1.25rem 1.25rem';
      });

    } catch (e) {
      console.warn('[PrintHelper] beforeprint 处理异常:', e);
    }
  });

  window.addEventListener('afterprint', function () {
    try {
      // 1. 还原解析抽屉原先状态
      savedDrawerStates.forEach(item => {
        if (!item.wasOpen) {
          item.drawer.classList.remove('is-open', 'show');
          item.drawer.style.maxHeight = '';
          item.drawer.style.opacity = '';
        }
      });

      // 2. 还原知识卡片原先状态
      savedCardStates.forEach(item => {
        if (!item.wasOpen) {
          item.body.style.maxHeight = '0px';
          item.body.style.opacity = '0';
          item.body.style.padding = '0 1.25rem';
        }
      });

    } catch (e) {
      console.warn('[PrintHelper] afterprint 还原异常:', e);
    }
  });
}


// ============================================================================
// 十四、动画与滚动显现模块 (Motion Module)
// ============================================================================

/**
 * 需要做入场显现的元素选择器（按页面阅读顺序排列）
 * 说明：进度总览卡片会随做题状态频繁重渲染，故不纳入显现列表，只保留其进度条动效
 */
const D2_REVEAL_SELECTORS = [
  'main > section > h2',
  'main > section > .section-desc',
  '#sec-tasks .info-box',
  '#checklist-container .card',
  '#knowledge-container .concept-card',
  '#required-container .question-card',
  '#extension-container .question-card',
  '#review-container .question-card',
  '#review-container .retest-card',
  '#wrong-notes-container .error-item',
  '#wrong-notes-container .card',
  'footer p'
];

/**
 * 初始化动画层：
 * 1. 首屏页头/导航入场（纯 CSS，靠 body.d2-anim 开关）
 * 2. 内容块滚动进入视口时依次淡入上移
 * 3. 顶部阅读进度条
 * 4. 尊重「减少动态效果」与打印场景，异常时自动降级为「全部可见」
 */
function initMotionModule() {
  // 无障碍：用户要求减少动效时不挂载任何入场动画
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.remove('d2-anim');
      return;
    }
  } catch (e) {
    // matchMedia 不可用时按「允许动画」处理
  }

  document.body.classList.add('d2-anim');

  // ---------- 1. 导航项入场序号 ----------
  try {
    const navItems = document.querySelectorAll('#main-nav .nav-item');
    Array.prototype.forEach.call(navItems, function (el, i) {
      el.style.setProperty('--d2-nav-i', String(i));
    });
  } catch (e) {
    console.warn('[Motion] 导航样式设置失败:', e);
  }

  // ---------- 2. 顶部阅读进度条 ----------
  try {
    let bar = document.getElementById('d2-scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'd2-scroll-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }

    let ticking = false;
    const paint = function () {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
      ticking = false;
    };
    const onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();
  } catch (e) {
    console.warn('[Motion] 阅读进度条初始化失败:', e);
  }

  // ---------- 3. 滚动显现 ----------
  let observer = null;

  const reveal = function (el) {
    el.classList.add('d2-in');
    if (observer) {
      try { observer.unobserve(el); } catch (e) { /* 已解除观察 */ }
    }
  };

  try {
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    }
  } catch (e) {
    observer = null;
  }

  /**
   * 扫描页面中尚未挂载显现属性的目标并登记
   * 动态渲染（错题本重绘、状态变更重绘）后需再次调用
   */
  const scan = function () {
    try {
      const nodes = document.querySelectorAll(D2_REVEAL_SELECTORS.join(','));
      Array.prototype.forEach.call(nodes, function (el, i) {
        if (el.getAttribute('data-d2-reveal') === '1') return;
        el.setAttribute('data-d2-reveal', '1');

        // 同一容器内错峰 45ms，最多累加 6 档，避免长列表末尾等待过久
        const delay = Math.min(i % 6, 5) * 45;
        el.style.setProperty('--d2-delay', delay + 'ms');

        if (observer) {
          observer.observe(el);
        } else {
          // 浏览器不支持 IntersectionObserver：直接显现，保证内容可读
          el.classList.add('d2-in');
        }
      });
    } catch (e) {
      // 出现任何异常都退化为「全部可见」，绝不把内容留在隐藏状态
      console.error('[Motion] 显现扫描失败，已降级为全部可见:', e);
      Array.prototype.forEach.call(
        document.querySelectorAll('[data-d2-reveal]'),
        function (el) { el.classList.add('d2-in'); }
      );
    }
  };

  scan();

  // 状态变化后进度区/错题区会重绘，重新挂载新节点（节流 150ms）
  let rescanTimer = null;
  window.addEventListener('day2:state-change', function () {
    if (rescanTimer) clearTimeout(rescanTimer);
    rescanTimer = setTimeout(scan, 150);
  });

  // 打印前强制全部显现，避免纸质版出现空白段落
  window.addEventListener('beforeprint', function () {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-d2-reveal]'),
      function (el) { el.classList.add('d2-in'); }
    );
  });

  // 兜底：2.5s 后若视口内仍有未显现元素（如观察器被浏览器节流），直接点亮
  setTimeout(function () {
    try {
      const vh = window.innerHeight || 800;
      Array.prototype.forEach.call(
        document.querySelectorAll('[data-d2-reveal]:not(.d2-in)'),
        function (el) {
          const top = el.getBoundingClientRect().top;
          if (top < vh) el.classList.add('d2-in');
        }
      );
    } catch (e) {
      // 忽略：兜底失败不影响页面（元素仍会在滚动时显现）
    }
  }, 2500);
}


// ============================================================================
// 十五、页面初始化启动 (Page Initialization)
// ============================================================================

/**
 * 页面加载完成执行总入口
 * 每个模块使用独立 try-catch 包裹，确保单模块意外失败不影响全站
 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('[Day2 组合逻辑MSI设计] 正在初始化复习系统...');

  // 1. 基础存储模块
  try {
    checkStorageSupport();
  } catch (err) {
    console.error('存储模块初始化失败:', err);
  }

  // 2. 任务清单模块
  try {
    initTaskChecklist();
  } catch (err) {
    console.error('任务清单模块初始化失败:', err);
  }

  // 3. 考点自查模块
  try {
    initExamChecklist();
  } catch (err) {
    console.error('考点自查模块初始化失败:', err);
  }

  // 4. 知识卡片模块
  try {
    initKnowledgeCards();
  } catch (err) {
    console.error('知识卡片模块初始化失败:', err);
  }

  // 5. 试题渲染模块 (必做区 + 拓展区)
  try {
    initQuestions();
  } catch (err) {
    console.error('题目渲染模块初始化失败:', err);
  }

  // 6. 错题记录模块
  try {
    initWrongNotes();
  } catch (err) {
    console.error('错题记录模块初始化失败:', err);
  }

  // 7. 当日复测模块
  try {
    initReviewModule();
  } catch (err) {
    console.error('复测模块初始化失败:', err);
  }

  // 8. Canvas 电路仿真动画模块
  try {
    initCanvasAnimation();
  } catch (err) {
    console.error('Canvas 电路仿真动画初始化失败:', err);
  }

  // 9. 综合进度统计模块
  try {
    initProgressModule();
  } catch (err) {
    console.error('进度统计模块初始化失败:', err);
  }

  // 10. 导航平滑滚动模块
  try {
    initNavigation();
  } catch (err) {
    console.error('导航模块初始化失败:', err);
  }

  // 11. 打印辅助模块
  try {
    initPrintHelper();
  } catch (err) {
    console.error('打印辅助模块初始化失败:', err);
  }

  // 12. 动画与滚动显现模块（最后执行：依赖前面各模块已渲染完成）
  try {
    initMotionModule();
  } catch (err) {
    console.error('动画模块初始化失败:', err);
  }

  console.log('[Day2 组合逻辑MSI设计] 系统初始化完成，所有功能均已就绪。');
});
