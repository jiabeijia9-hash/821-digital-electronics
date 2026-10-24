/* ==========================================================================
   Day3 · 基本 RS 锁存器 / 门控 D 锁存器 · 原理图动画
   ---------------------------------------------------------------------------
   设计原则：
   1. 门级真实连接：两条交叉反馈线、每个门输入引脚电平、输出节点电平全部
      随仿真结果实时着色，能看清"哪个门的哪个输入先变、输出后变"。
   2. 时序按门延迟分段推进：输入先变 → 反馈线变 → 对侧门输出变（最多 4 段），
      不是一步跳到终态，因此"因果顺序"与"传输延迟"可见。
   3. 禁止态、竞争（不定态）单独标注，表述与知识卡片 KC001 / KC002 一致。
   4. 讲解、特性方程、真值表随当前步同步高亮，动画与文字严格对应。
   通道约定（与阎石教材图一致）：
     上方门输出 = Q，其第二输入为"清 0 侧"（或非：R_D；与非：S̄_D）
     下方门输出 = Q̄，其第二输入为"置 1 侧"（或非：S_D；与非：R̄_D）
   ========================================================================== */
(function () {
  'use strict';

  if (window.__DAY3_LATCH_LAB__) return;
  window.__DAY3_LATCH_LAB__ = true;

  var C = {
    hi: '#2563eb', lo: '#94a3b8', x: '#d97706'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * SVG 里不能用 <sub>/<sup>（会破坏 SVG 解析），统一转成 tspan。
   */
  function svgLabel(html) {
    return String(html)
      .replace(/<sub>/g, '<tspan font-size="9.5" baseline-shift="sub">')
      .replace(/<\/sub>/g, '</tspan>')
      .replace(/<sup>/g, '<tspan font-size="9.5" baseline-shift="super">')
      .replace(/<\/sup>/g, '</tspan>');
  }

  /* ================================================================== *
   * 1. 四种结构配置
   * ================================================================== */
  var MODES = {
    nor: {
      key: 'nor', tab: '或非门 SR', badge: '高电平有效', family: 'nor', kind: 'basic',
      sym: '≥1', bubble: true,
      inputs: [
        { k: 'R', label: 'R<sub>D</sub>', y: 112, x: 66 },
        { k: 'S', label: 'S<sub>D</sub>', y: 210, x: 66 }
      ],
      eq: 'Q<sup>n+1</sup> = S<sub>D</sub> + R̄<sub>D</sub>·Q<sup>n</sup>　约束：S<sub>D</sub>·R<sub>D</sub> = 0',
      rule: '或非门：任一输入为 1 → 输出 0；两输入全 0 → 输出 1。S<sub>D</sub>、R<sub>D</sub> 均为高电平有效。',
      rows: [
        { vals: ['0', '0'], out: 'Q<sup>n</sup>', desc: '保持' },
        { vals: ['1', '0'], out: '1', desc: '置 1' },
        { vals: ['0', '1'], out: '0', desc: '清 0' },
        { vals: ['1', '1'], out: '×', desc: '禁止（Q=Q̄=0）' }
      ],
      head: ['S<sub>D</sub>', 'R<sub>D</sub>'],
      condKeys: ['S', 'R'],
      wave: [{ k: 'S', label: 'S<sub>D</sub>', c: C.hi }, { k: 'R', label: 'R<sub>D</sub>', c: C.hi }, { k: 'q', label: 'Q', c: '#1f2937' }, { k: 'qb', label: 'Q̄', c: '#6b7280' }],
      steps: [
        { set: { S: 0, R: 0 }, name: '① 初始 · 正反馈自锁', text: 'S<sub>D</sub>=0、R<sub>D</sub>=0 时两个门都没有被强制，各自的输出去看对方的输出 —— Q 与 Q̄ 互为输入，构成闭环。这就是"记忆"的物理来源。' },
        { set: { S: 1, R: 0 }, name: '② 置 1（S<sub>D</sub>=1）', text: 'S<sub>D</sub>=1 使下方或非门"任一输入为 1 则输出 0"，Q̄ 先被强制为 0；这个 0 沿反馈线送到上方门，与 R<sub>D</sub>=0 相或仍为 0，于是上方门输出 Q=1。注意顺序：先 Q̄ 后 Q。' },
        { set: { S: 0, R: 0 }, name: '③ 撤去 S<sub>D</sub> · 状态被记住', text: 'S<sub>D</sub> 回到 0，但下方门并没有解除锁定：它的另一个输入是 Q=1，输出 Q̄ 继续为 0。状态自己维持自己 —— 这叫锁存。' },
        { set: { S: 0, R: 1 }, name: '④ 清 0（R<sub>D</sub>=1）', text: 'R<sub>D</sub>=1 先强行把上方门拉成 Q=0；Q 的 0 沿反馈线送到下方门，与 S<sub>D</sub>=0 相或为 0，下方门输出 Q̄=1。输出完成翻转。' },
        { set: { S: 0, R: 0 }, name: '⑤ 撤去 R<sub>D</sub> · 稳定为 0', text: '两输入均为 0，Q=0 经反馈维持 Q̄=1，电路稳定停在 0 态。"保持"不是没有动作，而是正反馈锁住了当前值。' },
        { set: { S: 1, R: 1 }, name: '⑥ 禁止态（S<sub>D</sub>·R<sub>D</sub>=1）', text: '两输入同时为 1：两个或非门都被强制输出 0，得到 Q=Q̄=0，互补关系被破坏。这不是有效状态 —— 约束条件 S<sub>D</sub>·R<sub>D</sub>=0 就是为排除它而设。' },
        { set: { S: 0, R: 0 }, name: '⑦ 同时撤销 · 竞争不定', text: '两输入同时回 0，两门同时脱离强制，各自看到对方的 0 都想输出 1，随即又互相拉低 —— 反复振荡。谁先翻转取决于门延迟与噪声，结果不可预测，记为不定态 ×。' }
      ]
    },

    nand: {
      key: 'nand', tab: '与非门 SR', badge: '低电平有效', family: 'nand', kind: 'basic',
      sym: '&', bubble: true,
      inputs: [
        { k: 'Sn', label: 'S̄<sub>D</sub>', y: 112, x: 66 },
        { k: 'Rn', label: 'R̄<sub>D</sub>', y: 210, x: 66 }
      ],
      eq: 'Q<sup>n+1</sup> = S<sub>D</sub> + R̄<sub>D</sub>·Q<sup>n</sup>　约束：S<sub>D</sub>·R<sub>D</sub> = 0（S<sub>D</sub>、R<sub>D</sub> 为内部高有效量）',
      rule: '与非门：任一输入为 0 → 输出 1；两输入全 1 → 输出 0。外部 S̄<sub>D</sub>、R̄<sub>D</sub> 低电平有效。',
      rows: [
        { vals: ['1', '1'], out: 'Q<sup>n</sup>', desc: '保持' },
        { vals: ['0', '1'], out: '1', desc: '置 1' },
        { vals: ['1', '0'], out: '0', desc: '清 0' },
        { vals: ['0', '0'], out: '×', desc: '禁止（Q=Q̄=1）' }
      ],
      head: ['S̄<sub>D</sub>', 'R̄<sub>D</sub>'],
      condKeys: ['Sn', 'Rn'],
      wave: [{ k: 'Sn', label: 'S̄<sub>D</sub>', c: C.hi }, { k: 'Rn', label: 'R̄<sub>D</sub>', c: C.hi }, { k: 'q', label: 'Q', c: '#1f2937' }, { k: 'qb', label: 'Q̄', c: '#6b7280' }],
      steps: [
        { set: { Sn: 1, Rn: 1 }, name: '① 初始 · 双高保持', text: '与非门两输入都为 1 时，输出完全由对方的输出决定，闭环自锁。这里"1"是无效电平：两个 1 才是保持状态，与或非结构正好相反。' },
        { set: { Sn: 0, Rn: 1 }, name: '② 置 1（S̄<sub>D</sub>=0）', text: 'S̄<sub>D</sub>=0 使上方与非门"任一输入为 0 则输出 1" → Q 先被强制为 1；这个 1 送到下方门，与 R̄<sub>D</sub>=1 相与非得 0，于是 Q̄=0。' },
        { set: { Sn: 1, Rn: 1 }, name: '③ 释放 · 保持 1', text: 'S̄<sub>D</sub> 回到 1，上方门靠反馈 Q̄=0 继续输出 1（1 与非 0 得 1），下方门靠 Q=1 与 R̄<sub>D</sub>=1 输出 0。两个门互相撑住，状态不变。' },
        { set: { Sn: 1, Rn: 0 }, name: '④ 清 0（R̄<sub>D</sub>=0）', text: 'R̄<sub>D</sub>=0 使下方门被强制输出 Q̄=1；这个 1 送到上方门，与 S̄<sub>D</sub>=1 相与非得 0，于是 Q=0。' },
        { set: { Sn: 1, Rn: 1 }, name: '⑤ 释放 · 稳定为 0', text: '两输入回到 1，Q=0 与 S̄<sub>D</sub>=1 使上方门输出保持 1？请对照引脚逐门核对：这一拍正是"低有效"最容易记反的地方 —— 输出值的维持由反馈承担，与输入有效电平无关。' },
        { set: { Sn: 0, Rn: 0 }, name: '⑥ 禁止态（两输入同时为 0）', text: '两个与非门都因存在 0 输入而被强制输出 1：Q=Q̄=1，互补关系被破坏。它与或非结构的禁止态正好互为镜像。' },
        { set: { Sn: 1, Rn: 1 }, name: '⑦ 同时撤销 · 竞争不定', text: '两输入同时回 1，两门同时脱离强制并互相拉扯，振荡不止，最终值由延迟与噪声决定，记为不定态 ×。' }
      ]
    },

    gated: {
      key: 'gated', tab: '门控 SR', badge: 'EN 使能', family: 'nor', kind: 'gated',
      sym: '≥1', bubble: true,
      inputs: [
        { k: 'EN', label: 'EN', y: 160, x: 52 },
        { k: 'R', label: 'R<sub>D</sub>', y: 122, x: 52 },
        { k: 'S', label: 'S<sub>D</sub>', y: 220, x: 52 }
      ],
      eq: 'EN=1：等效基本 SR；EN=0：S′=R′=0 → 保持',
      rule: '输入级两个与门由 EN 控制：EN=0 时与门输出恒为 0，锁存器两边都"看不到"输入。',
      rows: [
        { vals: ['0', '×', '×'], out: 'Q<sup>n</sup>', desc: '保持（输入被屏蔽）' },
        { vals: ['1', '0', '1'], out: '1', desc: '置 1' },
        { vals: ['1', '1', '0'], out: '0', desc: '清 0' },
        { vals: ['1', '1', '1'], out: '×', desc: '禁止' }
      ],
      head: ['EN', 'R<sub>D</sub>', 'S<sub>D</sub>'],
      condKeys: ['EN', 'R', 'S'],
      wave: [{ k: 'EN', label: 'EN', c: C.hi }, { k: 'R', label: 'R<sub>D</sub>', c: '#7c3aed' }, { k: 'S', label: 'S<sub>D</sub>', c: C.hi }, { k: 'q', label: 'Q', c: '#1f2937' }, { k: 'qb', label: 'Q̄', c: '#6b7280' }],
      steps: [
        { set: { EN: 0, S: 1, R: 0 }, name: '① EN=0：输入被屏蔽', text: 'S<sub>D</sub> 拉高但 EN=0：输入级与门有一个 0，输出恒为 0，锁存器收到的是 S′=R′=0 —— 相当于没按按钮。这就是"门控"的意义：先允许，才有效。' },
        { set: { EN: 1, S: 1, R: 0 }, name: '② EN=1 且 S<sub>D</sub>=1 → 置 1', text: 'EN=1 打开与门，S<sub>D</sub>=1 通过成为 S′=1，下方门被强制输出 0（Q̄=0），反馈到上方门后 Q=1。' },
        { set: { EN: 1, S: 0, R: 0 }, name: '③ 撤去 S<sub>D</sub> → 保持 1', text: 'S′ 回落为 0，但锁存器已进入自锁，Q 仍为 1。此后只要 S、R 都不有效，状态就不动。' },
        { set: { EN: 1, S: 0, R: 1 }, name: '④ EN=1 且 R<sub>D</sub>=1 → 清 0', text: 'R<sub>D</sub>=1 通过使能门成为 R′=1，上方门被强制输出 0，Q=0、Q̄=1。' },
        { set: { EN: 0, S: 0, R: 0 }, name: '⑤ EN=0 → 锁定', text: '使能撤除，两个与门输出被钉在 0，锁存器两端都收不到有效命令，状态被完整锁住 —— 这就是"数据在使能撤销瞬间被记住"的电路实现。' },
        { set: { EN: 1, S: 1, R: 1 }, name: '⑥ EN=1 且 S<sub>D</sub>·R<sub>D</sub>=1 → 禁止', text: '使能打开时两输入同时有效，禁止态照样出现：Q=Q̄=0，互补关系被破坏。门控并不能免除约束条件。' }
      ]
    },

    dlatch: {
      key: 'dlatch', tab: '门控 D 锁存器', badge: '透明 / 锁存', family: 'nor', kind: 'd',
      sym: '≥1', bubble: true,
      inputs: [
        { k: 'EN', label: 'EN', y: 160, x: 52 },
        { k: 'D', label: 'D', y: 220, x: 52 }
      ],
      eq: 'EN=1：Q<sup>n+1</sup> = D（透明）；EN=0：Q<sup>n+1</sup> = Q<sup>n</sup>（锁存）',
      rule: '把 D 与其反相值分别接到置 1、清 0 两端，禁止态被天然排除 —— 这是 D 锁存器不会出现"×"的原因。',
      rows: [
        { vals: ['1', '1'], out: '1', desc: '透明（Q 跟随 D）' },
        { vals: ['1', '0'], out: '0', desc: '透明（Q 跟随 D）' },
        { vals: ['0', '×'], out: 'Q<sup>n</sup>', desc: '锁存（保持）' }
      ],
      head: ['EN', 'D'],
      condKeys: ['EN', 'D'],
      wave: [{ k: 'EN', label: 'EN', c: C.hi }, { k: 'D', label: 'D', c: '#7c3aed' }, { k: 'q', label: 'Q', c: '#1f2937' }, { k: 'qb', label: 'Q̄', c: '#6b7280' }],
      steps: [
        { set: { EN: 0, D: 1 }, name: '① EN=0：D 变化无效', text: 'D=1 但 EN=0，两个与门都被钉在 0，D 及其反相值都进不去，Q 保持原值 0。' },
        { set: { EN: 1, D: 1 }, name: '② EN=1、D=1 → Q 变 1（透明）', text: 'EN=1 后 D=1 走置 1 通道、D̄=0 走清 0 通道，锁存器被置 1。此区间内 Q 就等于 D —— 称为透明期，Q 只是 D 的"带门延迟导线"。' },
        { set: { EN: 1, D: 0 }, name: '③ EN=1 期间 D 翻转 → Q 立即跟随', text: '透明期内 D 由 1 变 0，Q 经一个门延迟后跟着变 0。注意：D 每变化一次，Q 就跟着变一次。' },
        { set: { EN: 0, D: 1 }, name: '④ EN 下降 → 锁存最后的值', text: 'EN 变 0 的瞬间 D 被关在门外，Q 停在 0 不再跟随 —— 锁存器记住的是使能撤销前一刻的值。' },
        { set: { EN: 1, D: 1 }, name: '⑤ 再次透明 · 空翻的根源', text: '若把 Q 反馈接到 D（计数器接法），EN=1 期间 Q 一变又让 D 变、D 变又让 Q 变 —— 同一个高电平内多次翻转，这就是空翻。所以电平触发的锁存器不能直接做计数器。' }
      ]
    }
  };

  var ORDER = ['nor', 'nand', 'gated', 'dlatch'];

  /* ================================================================== *
   * 2. 门级模型
   * ================================================================== */
  /** 两个通道的原始输入与生效输入（生效值已与 EN 相与） */
  function channels(cfg, inp) {
    var en = inp.EN ? 1 : 0;
    if (cfg.kind === 'basic') {
      if (cfg.family === 'nand') {
        return { rawTop: inp.Sn ? 1 : 0, rawBot: inp.Rn ? 1 : 0, top: inp.Sn ? 1 : 0, bot: inp.Rn ? 1 : 0, en: 1, hasEn: false };
      }
      return { rawTop: inp.R ? 1 : 0, rawBot: inp.S ? 1 : 0, top: inp.R ? 1 : 0, bot: inp.S ? 1 : 0, en: 1, hasEn: false };
    }
    if (cfg.kind === 'gated') {
      return { rawTop: inp.R ? 1 : 0, rawBot: inp.S ? 1 : 0, top: (inp.R && en) ? 1 : 0, bot: (inp.S && en) ? 1 : 0, en: en, hasEn: true };
    }
    // D 锁存器：置 1 通道接 D，清 0 通道接 D̄
    return { rawTop: inp.D ? 0 : 1, rawBot: inp.D ? 1 : 0, top: ((inp.D ? 0 : 1) && en) ? 1 : 0, bot: (inp.D && en) ? 1 : 0, en: en, hasEn: true };
  }

  function gateTop(cfg, c, qb) {
    if (cfg.family === 'nand') return (c.top === 0 || qb === 0) ? 1 : 0;
    return (c.top === 1 || qb === 1) ? 0 : 1;
  }

  function gateBottom(cfg, c, q) {
    if (cfg.family === 'nand') return (c.bot === 0 || q === 0) ? 1 : 0;
    return (c.bot === 1 || q === 1) ? 0 : 1;
  }

  function isForbidden(cfg, c) {
    if (cfg.kind === 'd') return false;
    if (cfg.family === 'nand') return c.top === 0 && c.bot === 0;
    return c.top === 1 && c.bot === 1;
  }

  /**
   * 从上一稳态出发反复求值，得到逐级快照（模拟门延迟）与终态。
   */
  function settle(cfg, inp, q0, qb0) {
    var c = channels(cfg, inp);
    var frames = [{ q: q0, qb: qb0 }];
    var q = q0, qb = qb0, i, nq, nqb, stable = false;

    for (i = 0; i < 20; i++) {
      nq = gateTop(cfg, c, qb);
      nqb = gateBottom(cfg, c, q);
      if (nq === q && nqb === qb) { stable = true; break; }
      q = nq; qb = nqb;
      frames.push({ q: q, qb: qb });
    }

    var status = 'ok';
    if (!stable) status = 'race';
    else if (isForbidden(cfg, c)) status = 'forbidden';

    if (status === 'race') { q = 'x'; qb = 'x'; }

    if (frames.length > 4) frames = [frames[0], frames[1], frames[2], frames[frames.length - 1]];
    if (status !== 'ok') frames[frames.length - 1] = { q: q, qb: qb };

    return { frames: frames, q: q, qb: qb, status: status, ch: c };
  }

  /* ================================================================== *
   * 3. 电路图
   * ================================================================== */
  function gateBody(x, y, w, h, sym, bubble) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" class="ll-gate-body"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 7) + '" text-anchor="middle" class="ll-gate-sym">' + sym + '</text>' +
      (bubble ? '<circle cx="' + (x + w + 6) + '" cy="' + (y + h / 2) + '" r="6" class="ll-bubble"/>' : '');
  }

  function buildSchematic(cfg) {
    var o = [];
    o.push('<svg viewBox="0 0 620 300" class="ll-svg" role="img" aria-label="' + esc(cfg.tab) + ' 门级电路图">');
    o.push('<g class="ll-wires">');

    if (cfg.kind === 'basic') {
      o.push('<path data-w="wTop" d="M66,112 L250,112" class="ll-wire"/>');
      o.push('<path data-w="wBot" d="M66,210 L250,210" class="ll-wire"/>');
    } else {
      if (cfg.kind === 'd') {
        // D 锁存器：下方通道直接接 D，上方通道经反相器接 D̄
        o.push('<path data-w="wBot" d="M52,220 L170,220" class="ll-wire"/>');
      } else {
        o.push('<path data-w="wTop" d="M52,122 L170,122" class="ll-wire"/>');
        o.push('<path data-w="wBot" d="M52,220 L170,220" class="ll-wire"/>');
      }
      o.push('<path data-w="wTop2" d="M228,112 L250,112" class="ll-wire"/>');
      o.push('<path data-w="wBot2" d="M228,210 L250,210" class="ll-wire"/>');
      // 使能总线：白色底衬跨越信号线，且在交叉处画"跳线弧"，表示不连接
      o.push('<path data-w="wEN" d="M52,160 L120,160" class="ll-wire"/>');
      o.push('<path data-w="wENb" d="M120,102 L120,114 A8,8 0 0 0 120,130 L120,200" class="ll-wire ll-wire-over"/>');
      o.push('<path data-w="wEN1" d="M120,102 L170,102" class="ll-wire ll-wire-over"/>');
      o.push('<path data-w="wEN2" d="M120,200 L170,200" class="ll-wire ll-wire-over"/>');
    }

    // 反馈线：Q → 下方门，Q̄ → 上方门
    o.push('<path data-w="wQ" d="M353,102 L436,102 L436,190 L250,190" class="ll-wire"/>');
    o.push('<path data-w="wQb" d="M353,200 L548,200 L548,92 L250,92" class="ll-wire"/>');
    o.push('</g>');

    // 器件
    o.push('<g class="ll-gates">');
    if (cfg.kind !== 'basic') {
      o.push(gateBody(170, 92, 52, 40, '&', false));
      o.push(gateBody(170, 190, 52, 40, '&', false));
    }
    o.push(gateBody(250, 74, 86, 56, cfg.sym, cfg.bubble));
    o.push(gateBody(250, 172, 86, 56, cfg.sym, cfg.bubble));
    o.push('</g>');

    // 引脚结点
    var pins = [
      { id: 'g1p1', x: 250, y: 92 }, { id: 'g1p2', x: 250, y: 112 },
      { id: 'g2p1', x: 250, y: 190 }, { id: 'g2p2', x: 250, y: 210 }
    ];
    if (cfg.kind !== 'basic') {
      pins.push({ id: 'a1p1', x: 170, y: 102 }, { id: 'a1p2', x: 170, y: 122 });
      pins.push({ id: 'a2p1', x: 170, y: 200 }, { id: 'a2p2', x: 170, y: 220 });
    }
    o.push('<g class="ll-pins">');
    pins.forEach(function (p) {
      o.push('<circle data-pin="' + p.id + '" cx="' + p.x + '" cy="' + p.y + '" r="3.4" class="ll-pin"/>');
    });
    o.push('</g>');

    // 输入端点（可点击）
    o.push('<g class="ll-nodes">');
    cfg.inputs.forEach(function (i) {
      o.push('<circle data-node="' + i.k + '" cx="' + i.x + '" cy="' + i.y + '" r="5.5" class="ll-node"/>');
    });
    o.push('</g>');

    // 反相器（D 锁存器：D̄ → 上方门）
    if (cfg.kind === 'd') {
      o.push('<g class="ll-inv">');
      o.push('<path data-w="wInv1" d="M80,220 L80,168 A8,8 0 0 0 80,152 L80,122 L100,122" class="ll-wire"/>');
      o.push('<path d="M100,112 L100,132 L118,122 Z" class="ll-gate-body"/>');
      o.push('<circle cx="124" cy="122" r="6" class="ll-bubble"/>');
      o.push('<path data-w="wInv2" d="M130,122 L170,122" class="ll-wire"/>');
      o.push('<circle data-pin="inv" cx="80" cy="220" r="3.4" class="ll-pin"/>');
      o.push('</g>');
    }

    // 输出徽标
    o.push('<g class="ll-badges">');
    o.push('<rect x="366" y="88" width="64" height="28" rx="6" class="ll-badge" data-badge="q"/>');
    o.push('<text x="398" y="107" text-anchor="middle" class="ll-badge-txt" data-badge-txt="q">Q = 0</text>');
    o.push('<rect x="366" y="186" width="64" height="28" rx="6" class="ll-badge" data-badge="qb"/>');
    o.push('<text x="398" y="205" text-anchor="middle" class="ll-badge-txt" data-badge-txt="qb">Q̄ = 1</text>');
    o.push('</g>');

    // 静态文字
    o.push('<g class="ll-labels">');
    cfg.inputs.forEach(function (i) {
      o.push('<text x="' + (i.x - 12) + '" y="' + (i.y + 5) + '" text-anchor="end" class="ll-in-label">' + svgLabel(i.label) + '</text>');
    });
    o.push('<text x="398" y="78" text-anchor="middle" class="ll-net-label">Q</text>');
    o.push('<text x="398" y="176" text-anchor="middle" class="ll-net-label">Q̄</text>');
    if (cfg.kind !== 'basic') {
      o.push('<text x="196" y="86" text-anchor="middle" class="ll-net-label">R′</text>');
      o.push('<text x="196" y="184" text-anchor="middle" class="ll-net-label">S′</text>');
    }
    o.push('</g>');
    o.push('</svg>');
    return o.join('');
  }

  /* ================================================================== *
   * 4. 状态
   * ================================================================== */
  var S = {
    cfg: null, inp: {}, q: 0, qb: 1, status: 'ok',
    hist: [], stepIdx: -1, playing: false, speed: 1, timers: []
  };
  var dom = {};

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function initInputs(cfg) {
    var o = {};
    cfg.inputs.forEach(function (i) { o[i.k] = 0; });
    if (cfg.key === 'nand') { o.Sn = 1; o.Rn = 1; }
    return o;
  }

  /* ================================================================== *
   * 5. 界面装配
   * ================================================================== */
  function buildUI(mount, cfg) {
    mount.innerHTML = '';
    var wrap = el('div', 'll-wrap');

    var tabs = el('div', 'll-tabs');
    ORDER.forEach(function (k) {
      var m = MODES[k];
      var b = el('button', 'll-tab' + (k === cfg.key ? ' is-active' : ''),
        '<span class="ll-tab-name">' + m.tab + '</span><span class="ll-tab-badge">' + m.badge + '</span>');
      b.type = 'button';
      b.setAttribute('aria-pressed', k === cfg.key ? 'true' : 'false');
      b.addEventListener('click', function () { switchMode(k); });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    var stage = el('div', 'll-stage');
    var svgWrap = el('div', 'll-svg-wrap');
    svgWrap.innerHTML = buildSchematic(cfg);
    stage.appendChild(svgWrap);

    var panel = el('aside', 'll-panel');
    panel.innerHTML =
      '<div class="ll-panel-head">' +
        '<span class="ll-panel-tag">' + esc(cfg.tab) + '</span>' +
      '</div>' +
      '<p class="ll-panel-rule">' + cfg.rule + '</p>' +
      '<div class="ll-eq">' + cfg.eq + '</div>' +
      '<div class="ll-now">' +
        '<span class="ll-chip" data-chip="q">Q = <b>0</b></span>' +
        '<span class="ll-chip" data-chip="qb">Q̄ = <b>1</b></span>' +
        '<span class="ll-chip ll-chip-state" data-chip="state">稳态</span>' +
      '</div>' +
      '<div class="ll-step">' +
        '<div class="ll-step-name">点击「播放」开始</div>' +
        '<p class="ll-step-text">动画按门延迟逐级推进：输入先变 → 反馈线变 → 对侧门输出最后变。</p>' +
      '</div>' +
      '<div class="ll-table-wrap" data-table></div>';
    stage.appendChild(panel);
    wrap.appendChild(stage);

    var ctrl = el('div', 'll-ctrl');
    ctrl.innerHTML =
      '<button type="button" class="ll-btn ll-btn-primary" data-act="play">▶ 播放</button>' +
      '<button type="button" class="ll-btn" data-act="step">⏭ 单步</button>' +
      '<button type="button" class="ll-btn" data-act="reset">↺ 重置</button>' +
      '<label class="ll-speed">速度<select data-act="speed">' +
        '<option value="0.7">慢</option><option value="1" selected>中</option><option value="1.6">快</option>' +
      '</select></label>' +
      '<span class="ll-tip">也可点击电路左侧端点，自由验证真值表</span>';
    wrap.appendChild(ctrl);

    var wave = el('div', 'll-wave');
    wave.innerHTML =
      '<div class="ll-wave-title">同步时序波形<span>每步一列，宽度随步数增长，可横向滚动</span></div>' +
      '<div class="ll-wave-scroll" data-wave></div>';
    wrap.appendChild(wave);

    wrap.appendChild(el('div', 'll-legend',
      '<span class="ll-lg"><i class="ll-lg-dot ll-lg-hi"></i>电平 1</span>' +
      '<span class="ll-lg"><i class="ll-lg-dot ll-lg-lo"></i>电平 0</span>' +
      '<span class="ll-lg"><i class="ll-lg-dot ll-lg-x"></i>不定 ×</span>' +
      '<span class="ll-lg">小圆点 = 门的输入引脚电平；虚线 = 该处为不定态</span>'
    ));

    mount.appendChild(wrap);

    dom = {
      svg: svgWrap.querySelector('svg'),
      panel: panel,
      stepName: panel.querySelector('.ll-step-name'),
      stepText: panel.querySelector('.ll-step-text'),
      chipQ: panel.querySelector('[data-chip="q"]'),
      chipQb: panel.querySelector('[data-chip="qb"]'),
      chipState: panel.querySelector('[data-chip="state"]'),
      tableWrap: panel.querySelector('[data-table]'),
      wave: wave.querySelector('[data-wave]'),
      playBtn: ctrl.querySelector('[data-act="play"]'),
      speedSel: ctrl.querySelector('[data-act="speed"]')
    };

    dom.playBtn.addEventListener('click', togglePlay);
    ctrl.querySelector('[data-act="step"]').addEventListener('click', function () { stopPlay(); manualNext(); });
    ctrl.querySelector('[data-act="reset"]').addEventListener('click', function () { stopPlay(); resetMode(); });
    dom.speedSel.addEventListener('change', function () { S.speed = parseFloat(this.value) || 1; });
    dom.speedSel.value = String(S.speed);

    Array.prototype.forEach.call(dom.svg.querySelectorAll('[data-node]'), function (n) {
      n.addEventListener('click', function () { toggleInput(n.getAttribute('data-node')); });
    });

    renderTable();
  }

  function renderTable() {
    if (!dom.tableWrap) return;
    var cfg = S.cfg;
    var head = cfg.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '<th>Q<sup>n+1</sup></th><th>含义</th>';
    var body = '';
    cfg.rows.forEach(function (r, i) {
      body += '<tr data-row="' + i + '">' +
        r.vals.map(function (v) { return '<td>' + v + '</td>'; }).join('') +
        '<td class="ll-td-out">' + r.out + '</td>' +
        '<td class="ll-td-desc">' + r.desc + '</td></tr>';
    });
    dom.tableWrap.innerHTML = '<table class="ll-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table>';
  }

  function highlightRow() {
    if (!dom.tableWrap) return;
    var cfg = S.cfg;
    var hit = -1;
    cfg.rows.forEach(function (r, idx) {
      var ok = true;
      r.vals.forEach(function (v, j) {
        if (v === '×') return;
        var key = cfg.condKeys[j];
        if (String(S.inp[key] ? 1 : 0) !== v) ok = false;
      });
      if (ok) hit = idx;
    });
    Array.prototype.forEach.call(dom.tableWrap.querySelectorAll('tbody tr'), function (tr, i) {
      tr.classList.toggle('is-now', i === hit);
    });
  }

  /* ================================================================== *
   * 6. 上色
   * ================================================================== */
  function clsFor(v) {
    if (v === 'x' || v === undefined || v === null) return 'lv-x';
    return v ? 'lv-1' : 'lv-0';
  }

  function setWire(id, v) {
    if (!dom.svg) return;
    var p = dom.svg.querySelector('[data-w="' + id + '"]');
    if (!p) return;
    var over = p.getAttribute('class').indexOf('ll-wire-over') >= 0 ? ' ll-wire-over' : '';
    p.setAttribute('class', 'll-wire ' + clsFor(v) + over);
  }

  function setPin(id, v) {
    if (!dom.svg) return;
    var c = dom.svg.querySelector('[data-pin="' + id + '"]');
    if (c) c.setAttribute('class', 'll-pin ' + clsFor(v));
  }

  function setNode(k, v) {
    if (!dom.svg) return;
    var c = dom.svg.querySelector('[data-node="' + k + '"]');
    if (c) c.setAttribute('class', 'll-node ' + clsFor(v));
  }

  function paint(q, qb) {
    var cfg = S.cfg, c = channels(cfg, S.inp);
    var qs = (q === 'x') ? 'x' : (q ? 1 : 0);
    var qbs = (qb === 'x') ? 'x' : (qb ? 1 : 0);
    var cx = channels(cfg, S.inp);

    cfg.inputs.forEach(function (i) { setNode(i.k, S.inp[i.k] ? 1 : 0); });

    if (cfg.kind === 'basic') {
      setWire('wTop', cx.rawTop);
      setWire('wBot', cx.rawBot);
    } else {
      var en = cx.en;
      setWire('wEN', en); setWire('wENb', en); setWire('wEN1', en); setWire('wEN2', en);
      setWire('wTop', cx.rawTop);
      setWire('wBot', cx.rawBot);
      setWire('wTop2', cx.top);
      setWire('wBot2', cx.bot);
      if (cfg.kind === 'd') {
        setWire('wInv1', cx.rawBot);   // 反相器输入 = D
        setWire('wInv2', cx.rawTop);   // 反相输出 = D̄
        setPin('inv', cx.rawBot);
      }
      setPin('a1p1', en);
      setPin('a1p2', cx.rawTop);
      setPin('a2p1', en);
      setPin('a2p2', cx.rawBot);
    }

    setWire('wQ', qs);
    setWire('wQb', qbs);
    setPin('g1p1', qbs); setPin('g1p2', cx.top);
    setPin('g2p1', qs); setPin('g2p2', cx.bot);

    if (dom.chipQ) dom.chipQ.innerHTML = 'Q = <b class="' + clsFor(qs) + '">' + (qs === 'x' ? '×' : qs) + '</b>';
    if (dom.chipQb) dom.chipQb.innerHTML = 'Q̄ = <b class="' + clsFor(qbs) + '">' + (qbs === 'x' ? '×' : qbs) + '</b>';

    var bq = dom.svg.querySelector('[data-badge="q"]');
    var bqt = dom.svg.querySelector('[data-badge-txt="q"]');
    var bqb = dom.svg.querySelector('[data-badge="qb"]');
    var bqbt = dom.svg.querySelector('[data-badge-txt="qb"]');
    if (bq) bq.setAttribute('class', 'll-badge ' + clsFor(qs));
    if (bqt) { bqt.setAttribute('class', 'll-badge-txt ' + clsFor(qs)); bqt.textContent = 'Q = ' + (qs === 'x' ? '×' : qs); }
    if (bqb) bqb.setAttribute('class', 'll-badge ' + clsFor(qbs));
    if (bqbt) { bqbt.setAttribute('class', 'll-badge-txt ' + clsFor(qbs)); bqbt.textContent = 'Q̄ = ' + (qbs === 'x' ? '×' : qbs); }

    if (dom.chipState) {
      var t = '稳态';
      var bad = false;
      if (S.status === 'race') { t = '竞争 · 不定 ×'; bad = true; }
      else if (S.status === 'forbidden') { t = '禁止态'; bad = true; }
      else if (cfg.kind === 'd') t = S.inp.EN ? '透明期 · Q=D' : '锁存 · 保持';
      else if (cfg.kind === 'gated' && !S.inp.EN) t = '使能关闭 · 保持';
      dom.chipState.textContent = t;
      dom.chipState.className = 'll-chip ll-chip-state' + (bad ? ' is-x' : '');
    }

    highlightRow();
  }

  function setStepText(name, html) {
    if (dom.stepName) dom.stepName.innerHTML = name;
    if (dom.stepText) dom.stepText.innerHTML = html;
  }

  /* ================================================================== *
   * 7. 波形
   * ================================================================== */
  function renderWave() {
    if (!dom.wave) return;
    var rows = S.cfg.wave.slice();
    var pL = 56, top = 16, rh = 36;
    var avail = dom.wave.clientWidth || 640;
    var inner = avail - pL - 16;
    // 列数与列宽自适应：优先铺满容器（列宽上限 52），列多了再横向滚动
    var fitWide = Math.floor(inner / 52);
    var fitMin = Math.floor(inner / 30);
    var n = Math.max(8, Math.min(fitWide, 22), Math.min(S.hist.length + 2, 22));
    n = Math.min(n, Math.max(8, fitMin));
    var cw = Math.max(30, Math.min(52, Math.floor(inner / n)));
    var all = S.hist;
    var cols = all.length > n ? all.slice(all.length - n) : all;
    var w = pL + n * cw + 10;
    var h = top + rows.length * rh + 14;
    var o = [];
    o.push('<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" class="ll-wave-svg">');

    if (cols.length) {
      o.push('<rect x="' + (pL + (cols.length - 1) * cw) + '" y="6" width="' + cw + '" height="' + (h - 12) + '" class="ll-col-hi"/>');
    }

    // 列刻度：让"每一步一列"的节拍可见
    for (var t = 0; t <= n; t++) {
      var tx = pL + t * cw;
      o.push('<line x1="' + tx + '" y1="6" x2="' + tx + '" y2="' + (h - 8) + '" class="ll-wave-tick"/>');
    }

    rows.forEach(function (r, ri) {
      var yHi = top + ri * rh + 7;
      var yLo = yHi + 20;
      o.push('<line x1="' + pL + '" y1="' + yLo + '" x2="' + (w - 8) + '" y2="' + yLo + '" class="ll-wave-base"/>');
      o.push('<text x="' + (pL - 10) + '" y="' + (yLo - 4) + '" text-anchor="end" class="ll-wave-label">' + svgLabel(r.label) + '</text>');
      if (!cols.length) return;

      var d = '', prevY = null;
      cols.forEach(function (col, i) {
        var v = col[r.k];
        var y = (v === 1) ? yHi : (v === 0 ? yLo : (yHi + 8));
        var x0 = pL + i * cw;
        if (i === 0) { d += 'M' + x0 + ',' + y + ' '; }
        else if (y !== prevY) { d += 'L' + x0 + ',' + prevY + ' L' + x0 + ',' + y + ' '; }
        if (i === cols.length - 1) d += 'L' + (x0 + cw) + ',' + y + ' ';
        prevY = y;
      });

      var hasX = cols.some(function (c) { return c[r.k] === 'x'; });
      o.push('<path d="' + d + '" class="ll-wave-line' + (hasX ? ' is-x' : '') + '" style="stroke:' + r.c + '"/>');
    });

    o.push('</svg>');
    dom.wave.innerHTML = o.join('');
  }

  /* ================================================================== *
   * 8. 推进
   * ================================================================== */
  function snapshot() {
    var col = { q: S.q, qb: S.qb, status: S.status };
    S.cfg.inputs.forEach(function (i) { col[i.k] = S.inp[i.k] ? 1 : 0; });
    S.hist.push(col);
    if (S.hist.length > 80) S.hist.shift();
  }

  function clearTimers() {
    S.timers.forEach(function (t) { clearTimeout(t); });
    S.timers = [];
  }

  function later(fn, ms) {
    var t = setTimeout(fn, ms);
    S.timers.push(t);
  }

  function transition(nextInputs, done) {
    clearTimers();
    var cfg = S.cfg;
    var res = settle(cfg, nextInputs, S.q === 'x' ? 0 : S.q, S.qb === 'x' ? 1 : S.qb);

    S.inp = nextInputs;
    S.status = res.status;
    paint(S.q, S.qb);

    var base = Math.round(180 / S.speed);
    var frames = res.frames;

    frames.forEach(function (f, i) {
      if (i === 0) return;
      later(function () { paint(f.q, f.qb); }, base * i);
    });

    later(function () {
      S.q = res.q; S.qb = res.qb;
      paint(S.q, S.qb);
      snapshot();
      renderWave();
      if (done) done();
    }, base * frames.length + 70);
  }

  /* ================================================================== *
   * 9. 播放控制
   * ================================================================== */
  function gotoStep(idx, done) {
    var steps = S.cfg.steps;
    if (idx < 0 || idx >= steps.length) { stopPlay(); if (done) done(); return; }
    S.stepIdx = idx;
    var st = steps[idx];
    var next = {};
    S.cfg.inputs.forEach(function (i) { next[i.k] = S.inp[i.k] ? 1 : 0; });
    Object.keys(st.set).forEach(function (k) { next[k] = st.set[k]; });
    setStepText(st.name + ' <span class="ll-step-count">' + (idx + 1) + '/' + steps.length + '</span>', st.text);
    transition(next, done);
  }

  function manualNext() {
    var next = S.stepIdx + 1;
    if (next >= S.cfg.steps.length) {
      setStepText('演示已结束', '点「重置」回到起始状态；也可以点左侧输入端点自由试验，波形会继续追加。');
      return;
    }
    gotoStep(next);
  }

  function togglePlay() {
    if (S.playing) { stopPlay(); return; }
    if (S.stepIdx >= S.cfg.steps.length - 1) resetMode();
    S.playing = true;
    dom.playBtn.innerHTML = '⏸ 暂停';
    runPlay();
  }

  function runPlay() {
    if (!S.playing) return;
    var idx = S.stepIdx + 1;
    if (idx >= S.cfg.steps.length) { stopPlay(); return; }
    gotoStep(idx, function () {
      if (!S.playing) return;
      later(runPlay, Math.round(950 / S.speed));
    });
  }

  function stopPlay() {
    S.playing = false;
    clearTimers();
    if (dom.playBtn) dom.playBtn.innerHTML = '▶ 播放';
  }

  function resetMode() {
    stopPlay();
    S.stepIdx = -1;
    S.inp = initInputs(S.cfg);
    S.hist = [];
    S.q = (S.cfg.key === 'nand') ? 1 : 0;
    S.qb = (S.cfg.key === 'nand') ? 0 : 1;
    var res = settle(S.cfg, S.inp, S.q, S.qb);
    S.q = res.q; S.qb = res.qb; S.status = res.status;
    paint(S.q, S.qb);
    snapshot();
    renderWave();
    setStepText('初始状态', '输入已置为无效电平，电路处于稳态。点「播放」按脚本演示，或点左侧端点自由切换。');
  }

  function toggleInput(k) {
    stopPlay();
    var next = {};
    S.cfg.inputs.forEach(function (i) { next[i.k] = S.inp[i.k] ? 1 : 0; });
    next[k] = next[k] ? 0 : 1;
    setStepText('自由探索 · ' + k + ' ' + (S.inp[k] ? '1→0' : '0→1'),
      '你手动改变了输入，电路按门延迟重新收敛，波形在右侧追加一列。请对照真值表核对 Q 的变化；若出现 ×，说明进入了禁止或竞争状态。');
    transition(next, null);
  }

  function switchMode(key) {
    stopPlay();
    S.cfg = MODES[key];
    S.inp = initInputs(S.cfg);
    S.stepIdx = -1;
    S.hist = [];
    S.q = (key === 'nand') ? 1 : 0;
    S.qb = (key === 'nand') ? 0 : 1;
    buildUI(document.getElementById('latch-lab-mount'), S.cfg);
    var res = settle(S.cfg, S.inp, S.q, S.qb);
    S.q = res.q; S.qb = res.qb; S.status = res.status;
    paint(S.q, S.qb);
    snapshot();
    renderWave();
    setStepText('初始状态', '输入已置为无效电平，电路处于稳态。点「播放」按脚本演示，或点左侧端点自由切换。');
  }

  /* ================================================================== *
   * 10. 入口
   * ================================================================== */
  function init() {
    var host = document.getElementById('latch-lab-container');
    if (!host) return;
    host.innerHTML = '<div id="latch-lab-mount"></div>';
    S.cfg = MODES.nor;
    S.inp = initInputs(S.cfg);
    S.q = 0; S.qb = 1;
    buildUI(document.getElementById('latch-lab-mount'), S.cfg);
    var res = settle(S.cfg, S.inp, S.q, S.qb);
    S.q = res.q; S.qb = res.qb; S.status = res.status;
    paint(S.q, S.qb);
    snapshot();
    renderWave();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      try { init(); } catch (e) { console.error('[LatchLab] 初始化失败:', e); }
    });
  } else {
    try { init(); } catch (e) { console.error('[LatchLab] 初始化失败:', e); }
  }
})();
