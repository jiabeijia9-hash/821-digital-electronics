/**
 * ====================================================================
 * Day 2 · 组合逻辑标准设计与 MSI 器件应用 - 题库与交互数据源
 * 821 数电考研 · 5天强化突破学习系统
 * --------------------------------------------------------------------
 * 包含全局变量：
 *  - window.EXAM_CHECKLIST  : 12 项考点自查清单
 *  - window.QUESTION_DATA   : 25 道大题（20 道必做 + 5 道拓展）
 *  - window.REVIEW_QUESTIONS: 3 道当日闭卷复测题
 *  - window.KNOWLEDGE_CARDS : 12 张结构化重构知识卡片
 *  - window.STUDY_TASKS     : 今日学习任务清单
 * 说明：纯原生全局变量声明，无 ES Module，离线 file:// 协议可直接运行
 * ====================================================================
 */

// 1. 今日考点自查表（按 821 考纲 d 条目的器件级考点拆分）
window.EXAM_CHECKLIST = [
  {
    "id": "cp-enc-148",
    "name": "优先编码器 74HC148 的功能表、使能端与扩展端",
    "title": "优先编码器 74HC148 的功能表、使能端与扩展端",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：优先编码器功能分析",
    "knowledgePoint": "74HC148 逻辑功能、输入/输出低有效、¬EI/¬EO/¬YEX 含义",
    "examMethod": "由输入电平推编码输出（反码还原）；判别 EO/YEX 的语义",
    "requirement": "【核心考查】默认“输入 0 有效、输出为编码反码”两层反相必须分开处理；能 1 分钟内由输入电平写出 A2A1A0、EO、YEX，并说明“输出 111 不代表编码 7”。",
    "questionIds": [
      "Q001"
    ],
    "standard": "能独立完成 148 的三行功能表推演，并准确解释 EO 与 YEX 的差异。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-enc-cascade",
    "name": "编码器级联扩展（两片 148 → 16 线-4 线）",
    "title": "编码器级联扩展（两片 148 → 16 线-4 线）",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：MSI 级联扩展",
    "knowledgePoint": "EO→EI 串接方向、输出反码合并、最高位产生",
    "examMethod": "画级联连线；用与非门把两片反码输出合成高有效编码",
    "requirement": "【核心考查】“优先级高的片子其 EO 去使能优先级低的片子”是唯一判据；合并必须用与非门（普通 CMOS 不能线与），最高位取自高组片的 YEX。",
    "questionIds": [
      "Q002"
    ],
    "standard": "能独立完成 16-4 编码器连线，并正确验证高组与低组各一个输入。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-enc-147",
    "name": "74HC147 十进 BCD 优先编码器与 148 的差异",
    "title": "74HC147 十进 BCD 优先编码器与 148 的差异",
    "importance": "★★★☆☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：常用器件功能（防偏门）",
    "knowledgePoint": "10 线-4 线、无使能端、输出 BCD 反码、无输入与 0 键二义",
    "examMethod": "输出反码还原为 BCD；两类编码器五项对比",
    "requirement": "【核心考查】147 没有 EI/EO/YEX，不能级联；全 1 输出既是“0 键”也是“无键”，必须由外部扫描信号区分。",
    "questionIds": [
      "Q015"
    ],
    "standard": "能准确写出 147 在 I9/I7 有效时的输出电平并还原 BCD。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-dec-138",
    "name": "74HC138 结构、输出方程与使能条件",
    "title": "74HC138 结构、输出方程与使能条件",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：译码器功能分析（821 高频器件）",
    "knowledgePoint": "三使能端（G1 高有效、G2A/G2B 低有效）、Yi=m_i 的反、地址权重",
    "examMethod": "写出含使能端的输出方程；由地址判断选中端",
    "requirement": "【核心考查】牢记 ¬Yi = ¬mi 与 EN=G1·¬G2A·¬G2B；未选中或被禁止时输出全为 1，绝不是高阻。",
    "questionIds": [
      "Q003"
    ],
    "standard": "能默写 138 输出方程并说明三种禁止情形下的输出电平。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-138-function",
    "name": "用 138 实现逻辑函数（与非接法 / 取反策略）",
    "title": "用 138 实现逻辑函数（与非接法 / 取反策略）",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：译码器实现组合函数（真题批注列为高频）",
    "knowledgePoint": "最小项之和 ↔ 低有效输出与非；按 0 集合取反；门数最优化",
    "examMethod": "由 F 的集合选“1 的集合”或“0 的集合”；画与非门网络",
    "requirement": "【核心考查】F=Σm 时用与非门合并选中输出；当 0 的个数远少于 1 时，先求 ¬F 再取反（极端情形可 0 门直接取用输出端）。",
    "questionIds": [
      "Q003",
      "Q018"
    ],
    "standard": "能在 1 的个数与 0 的个数之间正确选择实现方向，并统计门数。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-138-extend",
    "name": "多片 138 使能扩展实现四变量函数",
    "title": "多片 138 使能扩展实现四变量函数",
    "importance": "★★★★☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：MSI 级联扩展",
    "knowledgePoint": "G1 作片选、片内 3 位编号重排、未选中片输出全 1、或门合并",
    "examMethod": "用最高位做片选；片内编号 = 最小项编号 − 8A；两路与非后用或门",
    "requirement": "【核心考查】片内编号必须重排（m9 → 片1 的 Y1）；两路合并必须用或门（未选中片贡献 0），严禁直接把两片输出线与。",
    "questionIds": [
      "Q004"
    ],
    "standard": "能独立完成两片 138 的四变量实现，并说明为何不能用与门合并。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-mux-151",
    "name": "74HC151 / 153 实现逻辑函数（降维法）",
    "title": "74HC151 / 153 实现逻辑函数（降维法）",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：数据选择器实现函数（真题批注标注 151 跨年份高频）",
    "knowledgePoint": "Y=ΣmiDi、地址权重、数据端接 0/1/D/¬D、双 4 选 1 共用地址",
    "examMethod": "降维法四步：选地址 → 分组 → 判定 → 校验",
    "requirement": "【核心考查】同一地址下两个最小项“同在取 1、同不在取 0、一半取变量、反向取反变量”；地址端顺序必须与变量权重严格一致。",
    "questionIds": [
      "Q005",
      "Q006",
      "Q007",
      "Q017"
    ],
    "standard": "能对任意 4 变量函数在 5 分钟内完成 8 个数据端的判定并抽样验证。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-msi-cascade",
    "name": "MSI 级联扩展与数据分配器",
    "title": "MSI 级联扩展与数据分配器",
    "importance": "★★★★☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：器件级联与扩展",
    "knowledgePoint": "两片 151 → 16 选 1、138 作 1-8 数据分配器、输出合并门的选择",
    "examMethod": "地址高位片选 + 低位片内寻址；按“禁止时输出电平”选合并门",
    "requirement": "【核心考查】151 禁止时输出 0 → 用或门；138 作分配器时数据接低有效使能端得同相输出，接 G1 得反相输出；未选中通道恒为 1 而非高阻。",
    "questionIds": [
      "Q008",
      "Q021"
    ],
    "standard": "能独立完成 16 选 1 扩展与 8 通道分配器设计，并说明合并门的选择依据。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-adder-283",
    "name": "74HC283 算术运算与代码转换",
    "title": "74HC283 算术运算与代码转换",
    "importance": "★★★★★",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：算术运算电路（真题批注：加法器多次出现）",
    "knowledgePoint": "S=A+B+C0、级联进位、补码减法、余 3 码、BCD 加 6 修正",
    "examMethod": "由数值关系写出“加常量 / 减常量”的接线；修正判别式推导",
    "requirement": "【核心考查】减法三动作（B 取反、C0=1、看 C4）；BCD 修正 M=C4+S3S2+S3S1；减 3 的补码是 1101 而非 1100。",
    "questionIds": [
      "Q009",
      "Q010",
      "Q011"
    ],
    "standard": "能在 10 分钟内完成 4 位加减、8 位级联与一位 BCD 加法器的完整演算。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-cmp-85",
    "name": "74HC85 数值比较器与多位扩展",
    "title": "74HC85 数值比较器与多位扩展",
    "importance": "★★★★☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：数值比较器功能与级联",
    "knowledgePoint": "三输出互斥、级联输入 (0,1,0)、低位输出接高位级联输入",
    "examMethod": "级联方向判断；分片输出 + 整体结论的规范书写",
    "requirement": "【核心考查】单片必须设 IA=B=1；级联方向为“低位片输出 → 高位片级联输入”，接反即变成低位优先。",
    "questionIds": [
      "Q012",
      "Q016"
    ],
    "standard": "能独立完成 8 位比较并说明“高位优先、相等时看低位”的机理。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-mixed",
    "name": "译码器 + 选择器混合电路与方案选型",
    "title": "译码器 + 选择器混合电路与方案选型",
    "importance": "★★★★☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：多知识点组合的综合分析",
    "knowledgePoint": "先写器件方程再逐层代入；地址复用；同一函数多方案对比",
    "examMethod": "混合电路求输出表达式与功能；门数/引脚/延迟对比选型",
    "requirement": "【核心考查】混合电路的读图顺序固定为“各自方程 → 找连接关系 → 代入化简 → 真值表 → 功能”；选型结论必须给量化依据。",
    "questionIds": [
      "Q013",
      "Q014",
      "Q020"
    ],
    "standard": "能独立分析 138+151 混合电路并给出正确的功能结论。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-glitch-system",
    "name": "使能端毛刺抑制与系统级综合",
    "title": "使能端毛刺抑制与系统级综合",
    "importance": "★★★★☆",
    "examPoint": "821考纲 d. 组合逻辑电路（真题频次 67%，分析与设计大题核心） · 考法：竞争冒险在 MSI 层面的表现 + 综合设计",
    "knowledgePoint": "多输出独立翻转、选通脉冲、输出锁存、总线互斥、三级链路",
    "examMethod": "毛刺极性判定；用使能端做选通；编码—译码—选择链路设计",
    "requirement": "【核心考查】逻辑可化简 ≠ 物理无冒险；无报警/无输入状态必须用 YEX 与使能联动屏蔽；系统级设计要把每一级电平写清。",
    "questionIds": [
      "Q019",
      "Q022",
      "Q023",
      "Q024",
      "Q025"
    ],
    "standard": "能指出 MSI 电路中的毛刺来源并给出不加器件的抑制方案。",
    "preMastery": "",
    "postStatus": ""
  }
];

// 2. 核心题库数据（25 道：20 道必做区 + 5 道拓展区）
window.QUESTION_DATA = [
  {
    "id": "Q001",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石《数字电子技术基础》第六版 4.3.1 节 74HC148 功能表设计，非教材原题",
    "knowledgePoints": [
      "74HC148",
      "优先编码器",
      "低电平有效",
      "使能端与扩展端"
    ],
    "examMethods": [
      "优先编码器功能表推演",
      "使能端/扩展端含义判定",
      "输出反码还原"
    ],
    "tag": "【教材经典母题】",
    "question": "【题目描述】\n某控制系统的 8 路中断请求 $\\overline{I_0}\\sim\\overline{I_7}$ 送入 74HC148（8 线-3 线优先编码器）编码，其中 $\\overline{I_7}$ 优先级最高。芯片引脚包括使能输入 $\\overline{EI}$、级联输出 $\\overline{EO}$、有输入指示 $\\overline{Y_{EX}}$（也记作 $\\overline{GS}$），编码输出为 $\\overline{A_2}\\overline{A_1}\\overline{A_0}$。\n\n【作答要求】\n(1) 说明 $\\overline{EI}$、$\\overline{EO}$、$\\overline{Y_{EX}}$ 三个控制端的逻辑含义，并指出哪一个可以用于判别“本片无有效输入”；\n(2) 当 $\\overline{EI}=0$、$\\overline{I_5}=0$ 且其余输入全为 1 时，写出 $\\overline{A_2}\\overline{A_1}\\overline{A_0}$、$\\overline{EO}$、$\\overline{Y_{EX}}$ 的取值；\n(3) 当 $\\overline{EI}=0$ 且 $\\overline{I_0}\\sim\\overline{I_7}$ 全为 1 时，输出端与控制端分别为多少？\n(4) 为什么说“$\\overline{A_2}\\overline{A_1}\\overline{A_0}=111$”这一现象具有二义性？应如何消除？",
    "answer": "【标准答案】\n(1) 控制端含义：\n$\\overline{EI}$：低电平有效的使能输入，$\\overline{EI}=0$ 时芯片进入编码工作状态；$\\overline{EI}=1$ 时芯片被禁止，全部输出为 1。\n$\\overline{EO}$：低电平有效的级联输出，仅在“$\\overline{EI}=0$ 且本片 8 路均无有效输入”时为 0，专用于使能下一片（低位片）。\n$\\overline{Y_{EX}}$：低电平有效的“有输入指示”端，本片存在任一有效输入时为 0。\n判别“本片无有效输入”应使用 $\\overline{EO}$（为 0 表示无输入），而 $\\overline{Y_{EX}}$ 为 0 表示有输入。\n\n(2) $\\overline{I_5}=0$ 是唯一的有效（低）输入，且优先级最高者即为 I5，故编码值为 5：\n编码输出为编码值的反码：$(5)_{10}=(101)_2$，反码为 $010$，即\n$$\\overline{A_2}\\overline{A_1}\\overline{A_0}=010$$\n$\\overline{EO}=1$（本片有输入），$\\overline{Y_{EX}}=0$（有输入指示有效）。\n\n(3) 8 路全为 1，即全部无请求：\n$$\\overline{A_2}\\overline{A_1}\\overline{A_0}=111,\\quad \\overline{EO}=0,\\quad \\overline{Y_{EX}}=1$$\n\n(4) 二义性的来源：编码 7 的输出反码同样是 $111$（$7=(111)_2$ 的反码为 $000$？——注意此处须精确：7 的编码为 111，其反码为 000，因此“输出 111”并不对应编码 7）。\n更准确地说，$\\overline{A_2}\\overline{A_1}\\overline{A_0}=111$ 只在“无有效输入”或“芯片被禁止”时出现，并不表示任何编码值；真正的编码 7（$\\overline{I_7}=0$）输出为 $000$。\n消除方式：用 $\\overline{Y_{EX}}$ 与 $\\overline{EO}$ 作为“数据有效”标志，只有 $\\overline{Y_{EX}}=0$ 时才允许后级接收 $A_2A_1A_0$；否则将输出按“无请求”处理（如强制送出 0000）。",
    "explanation": "【详细推导与解析】\n1. 读表顺序必须固定：先看 $\\overline{EI}$ 是否允许工作，再看哪一路输入为 0，最后按“优先级最高者为编码对象”取值。\n2. 74HC148 的输入是“0 有效”（0 表示有请求），输出是“编码值的反码”，这两层反相是本器件全部错误的来源：\n   - 输入层反相：把“0”读成“有请求”；\n   - 输出层反相：把 $A_2A_1A_0$ 再取反。两层反相相互独立，不能相互抵消。\n3. 三个控制端的组合关系可归纳为一张速查表：\n| $\\overline{EI}$ | 有无有效输入 | $\\overline{A_2}\\overline{A_1}\\overline{A_0}$ | $\\overline{EO}$ | $\\overline{Y_{EX}}$ |\n| :---: | :---: | :---: | :---: | :---: |\n| 1 | 任意 | 111 | 1 | 1 |\n| 0 | 有 | 编码反码 | 1 | 0 |\n| 0 | 无 | 111 | 0 | 1 |\n4. 第 (4) 问的实质是“编码有效性判定”，这是后续两片级联（Q002）能够成立的前提：级联时必须靠 $\\overline{EO}$ 把“本组无输入”这一信息传给低位片。",
    "scoringPoints": [
      "第一问：准确说明三个控制端含义并指出 EO 用于判无输入 (4分)",
      "第二问：写出 010 并正确给出 EO=1、YEX=0 (4分)",
      "第三问：全部输出为 111、EO=0、YEX=1 (2分)",
      "第四问：指出 111 不对应编码 7 并用 YEX/EO 作数据有效标志 (4分)"
    ],
    "commonMistakes": [
      "把 $\\overline{I_5}=0$ 的编码直接写成 101，忽略了输出为反码",
      "认为“输出 111”就是编码 7 有效，导致后级误判为第 7 路请求",
      "把 $\\overline{EO}$ 与 $\\overline{Y_{EX}}$ 的极性记反，级联时把高组与低组的使能顺序接错"
    ],
    "verification": "查 74HC148 功能表三行即可核对：$\\overline{EI}=0,\\ \\overline{I_5}=0$ 行给出 $\\overline{A_2}\\overline{A_1}\\overline{A_0}=010$；$\\overline{EI}=0$ 且输入全 1 行给出 111/0/1。三行结论与本答案完全一致。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 2-1：74HC148 引脚与信号定义 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(参照阎石数电第六版 4.3.1 节器件功能)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 700 344\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<rect x=\"250.0\" y=\"36.0\" width=\"210.0\" height=\"268.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"250.0\" y=\"36.0\" width=\"210.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"355.0\" y=\"54.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC148</text>\n<text x=\"355.0\" y=\"176.0\" font-size=\"30\" fill=\"#dbe3ee\" text-anchor=\"middle\" font-weight=\"700\">8 → 3</text>\n<text x=\"355.0\" y=\"200.0\" font-size=\"11\" fill=\"#dbe3ee\" text-anchor=\"middle\" font-weight=\"700\">优先编码</text>\n<line x1=\"150.0\" y1=\"64.0\" x2=\"250.0\" y2=\"64.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"68.0\" font-size=\"12\" fill=\"#b45309\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.2\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">EI</text><line x1=\"135.8\" y1=\"53.8\" x2=\"146.0\" y2=\"53.8\" stroke=\"#b45309\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"92.0\" x2=\"250.0\" y2=\"92.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"96.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I7</text><line x1=\"135.3\" y1=\"81.8\" x2=\"146.0\" y2=\"81.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"118.0\" x2=\"250.0\" y2=\"118.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"122.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I6</text><line x1=\"135.3\" y1=\"107.8\" x2=\"146.0\" y2=\"107.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"144.0\" x2=\"250.0\" y2=\"144.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"148.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I5</text><line x1=\"135.3\" y1=\"133.8\" x2=\"146.0\" y2=\"133.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"170.0\" x2=\"250.0\" y2=\"170.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"174.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I4</text><line x1=\"135.3\" y1=\"159.8\" x2=\"146.0\" y2=\"159.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"196.0\" x2=\"250.0\" y2=\"196.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"200.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I3</text><line x1=\"135.3\" y1=\"185.8\" x2=\"146.0\" y2=\"185.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"222.0\" x2=\"250.0\" y2=\"222.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"226.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I2</text><line x1=\"135.3\" y1=\"211.8\" x2=\"146.0\" y2=\"211.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"248.0\" x2=\"250.0\" y2=\"248.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"252.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I1</text><line x1=\"135.3\" y1=\"237.8\" x2=\"146.0\" y2=\"237.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"150.0\" y1=\"274.0\" x2=\"250.0\" y2=\"274.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"146.0\" y=\"278.0\" font-size=\"12\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" textLength=\"10.7\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">I0</text><line x1=\"135.3\" y1=\"263.8\" x2=\"146.0\" y2=\"263.8\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"460.0\" y1=\"118.0\" x2=\"560.0\" y2=\"118.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"564.0\" y=\"122.0\" font-size=\"12\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" textLength=\"15.3\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">A2</text><line x1=\"564.0\" y1=\"107.8\" x2=\"579.3\" y2=\"107.8\" stroke=\"#dc2626\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"460.0\" y1=\"148.0\" x2=\"560.0\" y2=\"148.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"564.0\" y=\"152.0\" font-size=\"12\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" textLength=\"15.3\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">A1</text><line x1=\"564.0\" y1=\"137.8\" x2=\"579.3\" y2=\"137.8\" stroke=\"#dc2626\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"460.0\" y1=\"178.0\" x2=\"560.0\" y2=\"178.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"564.0\" y=\"182.0\" font-size=\"12\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" textLength=\"15.3\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">A0</text><line x1=\"564.0\" y1=\"167.8\" x2=\"579.3\" y2=\"167.8\" stroke=\"#dc2626\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"460.0\" y1=\"224.0\" x2=\"560.0\" y2=\"224.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"564.0\" y=\"228.0\" font-size=\"12\" fill=\"#16a34a\" text-anchor=\"start\" font-weight=\"700\" textLength=\"15.5\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">EO</text><line x1=\"564.0\" y1=\"213.8\" x2=\"579.5\" y2=\"213.8\" stroke=\"#16a34a\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"460.0\" y1=\"254.0\" x2=\"560.0\" y2=\"254.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"564.0\" y=\"258.0\" font-size=\"12\" fill=\"#16a34a\" text-anchor=\"start\" font-weight=\"700\" textLength=\"21.5\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">YEX</text><line x1=\"564.0\" y1=\"243.8\" x2=\"585.5\" y2=\"243.8\" stroke=\"#16a34a\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<text x=\"355.0\" y=\"292.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">8 线-3 线优先编码器（I7 优先级最高）</text>\n<text x=\"30.0\" y=\"328.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">注：带上划线的引脚名为低电平有效；输出 A2A1A0 为编码值的反码。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q002",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据 821 考纲 d 条目“常用组合逻辑器件的逻辑功能和使用方法”，按 74HC148 级联扩展的经典考法设计",
    "knowledgePoints": [
      "74HC148",
      "编码器级联",
      "使能端串接",
      "输出合并逻辑"
    ],
    "examMethods": [
      "多片 MSI 编码器级联扩展",
      "低有效输出合并为高有效编码",
      "级联优先级分析"
    ],
    "tag": "",
    "question": "【题目描述】\n用两片 74HC148 扩展为 **16 线-4 线优先编码器**：输入为 $\\overline{Z_0}\\sim\\overline{Z_{15}}$（$\\overline{Z_{15}}$ 优先级最高），要求输出**高电平有效**的 4 位编码 $A_3A_2A_1A_0$，并提供系统级的有输入指示 $\\overline{GS}$ 与无输入指示 $\\overline{EO}$。\n\n【作答要求】\n(1) 说明两片的分工、使能端如何串接，并解释为什么这样接能保证 $\\overline{Z_{15}}$ 优先级最高；\n(2) 给出 3 位编码 $A_2A_1A_0$ 的合并逻辑（画出或写出所用门电路及表达式），说明最高位 $A_3$ 如何产生；\n(3) 定义系统 $\\overline{GS}$ 与系统 $\\overline{EO}$；\n(4) 验证：当 $Z_{12}$ 有效（$\\overline{Z_{12}}=0$）时输出 $A_3A_2A_1A_0=1100$；当 $Z_5$ 有效时输出为 0101。",
    "answer": "【标准答案】\n(1) 分工与使能串接：\n片 1（高组）负责 $\\overline{Z_8}\\sim\\overline{Z_{15}}$，片 2（低组）负责 $\\overline{Z_0}\\sim\\overline{Z_7}$。\n系统使能 $\\overline{EI}$ 接片 1 的 $\\overline{EI}$；片 1 的 $\\overline{EO}$ 接片 2 的 $\\overline{EI}$。\n因为片 1 只有在“自身 8 路全无输入”时 $\\overline{EO}=0$，才会放开片 2 的使能，所以只要高组有请求，低组就被封锁 → 高组（含 $Z_{15}$）优先级最高。\n\n(2) 3 位编码的合并：\n两片同一时刻至多一片处于编码态，另一片被禁止时输出恒为 111。把两片的同名反码输出分别送入二输入与非门：\n$$A_0=\\overline{\\overline{A_{01}}\\cdot\\overline{A_{02}}},\\quad A_1=\\overline{\\overline{A_{11}}\\cdot\\overline{A_{12}}},\\quad A_2=\\overline{\\overline{A_{21}}\\cdot\\overline{A_{22}}}$$\n即共需 3 个二输入与非门（也可用 3 个二输入与门后接反相，但与非门更省）。\n推导依据：当片 1 有效时片 2 输出为 111，此时 $A_k=\\overline{\\overline{A_{k1}}\\cdot 1}=\\overline{\\overline{A_{k1}}}=A_{k1}$，把反码还原为原码。\n最高位：高组被选中时 $\\overline{Y_{EX1}}=0$，故\n$$A_3=\\overline{\\overline{Y_{EX1}}}$$\n（1 个反相器，或直接把 $\\overline{Y_{EX1}}$ 取非后使用）。\n\n(3) 系统控制端：\n$$\\overline{GS}=\\overline{Y_{EX1}}\\cdot\\overline{Y_{EX2}}$$\n（两片都无输入时两者均为 1，故 $\\overline{GS}=1$ 表示 16 路全无请求；只要有一路请求，$\\overline{GS}=0$。）\n$$\\overline{EO}=\\overline{EO_2}$$\n（片 2 无输入即代表 16 路全无输入。）\n\n(4) 验证：\n$Z_{12}$ 有效 → 属高组，片 1 编码局部值 $12-8=4=(100)_2$，片 1 输出反码 $011$；片 1 有输入 → $\\overline{Y_{EX1}}=0$ → $A_3=1$；片 2 被封锁输出 111 → $A_2A_1A_0=\\overline{011}=100$。\n故 $A_3A_2A_1A_0=1\\,100=1100$ ✓（等于 12）。\n$Z_5$ 有效 → 属低组，片 1 无输入（$\\overline{Y_{EX1}}=1$ → $A_3=0$，输出 111），片 2 编码 5，输出反码 $010$ → $A_2A_1A_0=101$。\n故 $A_3A_2A_1A_0=0\\,101=0101$ ✓（等于 5）。",
    "explanation": "【详细推导与解析】\n1. “谁接谁的 $\\overline{EO}$”是级联题的唯一判断点：**优先级高的那一片，其 $\\overline{EO}$ 去使能优先级低的那一片**。因为 $\\overline{EO}$ 的含义是“本片无输入”，只有高组空了才轮到低组。\n2. 为什么必须用与非门合并而不能把两片输出直接“线与”：\n普通 CMOS 推挽输出的高电平与低电平都是低阻驱动，两片输出直接相连时，未选中片输出 111、选中片输出含 0，会在同一节点上形成“1 与 0”对抗，产生大电流并烧毁器件；只有 OC/OD 输出（外接上拉电阻）才允许线与。\n3. 输出“反码 → 原码”的本质是一次与非运算，而不是两级反相：因为另一片输出恒为 1，与非门的另一个输入相当于“1 与”——这正是与非门在此处比“与门 + 反相器”更省的原因。\n4. 系统 $\\overline{GS}$ 用“与非”还是“与”？两个 $\\overline{Y_{EX}}$ 都是低有效，只有都为 1（都无输入）时 $\\overline{GS}$ 才为 1，因此是**与**关系，用与门（或与非门+反相）。",
    "scoringPoints": [
      "第一问：两片分工正确、EO→EI 串接方向正确并说明优先级来源 (4分)",
      "第二问：写出 3 个与非门的合并式并解释“另一片输出为 111” (4分)",
      "第三问：正确写出 GS 为两 YEX 之与、EO 取片 2 的 EO (2分)",
      "第四问：两组输入验证过程完整、数值正确 (2分)"
    ],
    "commonMistakes": [
      "把片 2（低组）的 EO 接片 1 的 EI，导致低组反而优先",
      "把两片输出直接相连（误用线与），忽略普通 CMOS 不能线与",
      "最高位用 $\\overline{EO_1}$ 而不是 $\\overline{Y_{EX1}}$，导致“本片有输入”与“高组有输入”混淆"
    ],
    "verification": "以 $Z_8$ 与 $Z_7$ 同时有效做交叉检验：片 1 因 $Z_8$ 有效输出编码 0（反码 111）+ $A_3=1$，片 2 被封锁 → 结果 1000 = 8，说明 $Z_8$ 优先于 $Z_7$，级联优先级正确。"
  },
  {
    "id": "Q003",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据 821 考纲 d 条目“用译码器实现组合逻辑函数”的高频考法设计",
    "knowledgePoints": [
      "74HC138",
      "译码器",
      "最小项",
      "与非门实现"
    ],
    "examMethods": [
      "74HC138 实现三变量逻辑函数",
      "低有效输出与最小项的对应",
      "电路逻辑功能识别"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 74HC138（3 线-8 线译码器，输出低电平有效，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$、$G_1=1$ 时工作）及必要的门电路，实现三变量逻辑函数\n$$F(A,B,C)=\\sum m(1,2,4,7)$$\n\n【作答要求】\n(1) 写出 74HC138 输出与最小项的对应关系式；\n(2) 画出（或用文字精确描述）接线方案，并写出用与非门实现 $F$ 的表达式，标明所用门的输入个数；\n(3) 若库房中只有二输入与非门，画出实现该函数的门级结构并统计门数；\n(4) 指出该函数的逻辑功能名称，并说明其与“奇偶校验”的关系。",
    "answer": "【标准答案】\n(1) 输出与最小项的对应：\n74HC138 在使能有效时，被选中输出为 0，其余为 1，即\n$$\\overline{Y_i}=\\overline{m_i}\\quad (i=0,1,\\cdots,7)$$\n其中 $m_i$ 是以 $A_2A_1A_0=ABC$ 为变量、按 $A$ 为最高位编号的最小项。\n\n(2) 接线与表达式：\n地址端 $A_2=A,\\ A_1=B,\\ A_0=C$；$G_1=1$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$。\n由于 $\\overline{Y_i}=\\overline{m_i}$，输出端给出的是 $m_i$ 的“反”，单个 $m_i$ 不能直接取出；但求和可以，因为\n$$F=\\sum m_i=\\overline{\\prod \\overline{Y_i}}$$\n即把选中的 4 个输出送入**四输入与非门**：\n$$F=\\overline{\\overline{Y_1}\\cdot\\overline{Y_2}\\cdot\\overline{Y_4}\\cdot\\overline{Y_7}}$$\n验证：与非门输出 $=\\overline{\\overline{m_1}\\overline{m_2}\\overline{m_4}\\overline{m_7}}=m_1+m_2+m_4+m_7$ ✓（4 输入与非门 1 片）。\n\n(3) 仅用二输入与非门：\n先两两合并：$t_1=\\overline{\\overline{Y_1}\\cdot\\overline{Y_2}}=m_1+m_2$，$t_2=\\overline{\\overline{Y_4}\\cdot\\overline{Y_7}}=m_4+m_7$；\n再求 $F=t_1+t_2=\\overline{\\overline{t_1}\\cdot\\overline{t_2}}$，其中 $\\overline{t_1}=\\overline{t_1\\cdot t_1}$，$\\overline{t_2}=\\overline{t_2\\cdot t_2}$。\n共需：2 个（合并）+ 2 个（作反相器）+ 1 个（末级与非）= **5 个二输入与非门**。\n\n(4) 逻辑功能：\n$F=\\sum m(1,2,4,7)$ 中 1 的个数分别为 1、1、1、3（均为奇数），即“输入中 1 的个数为奇数时输出 1”，故\n$$F=A\\oplus B\\oplus C$$\n为**三变量奇校验函数（奇偶判别器 / 奇数个 1 检测器）**。若再取反即得偶校验输出。",
    "explanation": "【详细推导与解析】\n1. 译码器实现函数的唯一核心公式是 $\\overline{Y_i}=\\overline{m_i}$。所有接法都由它推出：\n   - 需要“最小项之和”→ 对低有效输出取与非（等价于对其反码取或）；\n   - 需要“最小项之积”→ 对低有效输出取与（等价于对 $m_i$ 取反再与）。\n2. 为什么用与非门而不是或门：$\\overline{Y_1}+\\overline{Y_2}$ 需要或门；而 $\\overline{\\overline{Y_1}\\overline{Y_2}}$ 用与非门即可得到同样的“或”，且与非门是数字电路中最基本的门，工程上更省。\n3. 第 (3) 问的关键技巧：**与非门自身可以当反相器用**（两输入并接），因此不需要额外的非门器件。\n4. 第 (4) 问要求把“函数”读成“功能”，这是 821 分析题的标准收尾。识别奇偶性的快捷判据：最小项编号的二进制中 1 的个数为奇数 → 奇校验。",
    "scoringPoints": [
      "第一问：写出 $\\overline{Y_i}=\\overline{m_i}$ 并说明使能条件 (3分)",
      "第二问：地址/使能接线正确，四输入与非门表达式正确 (5分)",
      "第三问：给出 5 个二输入与非门的结构并统计正确 (2分)",
      "第四问：识别为三变量奇校验并写出 $A\\oplus B\\oplus C$ (2分)"
    ],
    "commonMistakes": [
      "把 $\\overline{Y_i}$ 当成 $m_i$ 直接相加，写成 $F=\\overline{Y_1}+\\overline{Y_2}+\\overline{Y_4}+\\overline{Y_7}$ 却用与门实现",
      "忘记把 $\\overline{G_{2A}}$、$\\overline{G_{2B}}$ 接地（认为悬空即无效），导致全部输出为 1",
      "把地址端接成 $A_0=A$、$A_2=C$（权重颠倒），函数集合被整体重排"
    ],
    "verification": "把 $A=0,B=0,C=1$（$m_1$）代入：$\\overline{Y_1}=0$ → 与非门输入含 0 → $F=1$ ✓；代入 $A=0,B=1,C=0$（$m_2$，不在集合）→ 四个输入均为 1 → $F=0$ ✓。再用奇校验式 $A\\oplus B\\oplus C=0\\oplus0\\oplus1=1$ 交叉核对一致。"
  },
  {
    "id": "Q004",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合考纲 d 条目“译码器功能”与“MSI 级联扩展”两项考法自编的四变量设计题",
    "knowledgePoints": [
      "74HC138",
      "使能端扩展",
      "片选",
      "输出合并",
      "CMOS 不能线与"
    ],
    "examMethods": [
      "两片译码器扩展为四变量译码",
      "用使能端作片选",
      "多片输出合并逻辑"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n用**两片** 74HC138 及必要的门电路实现四变量逻辑函数\n$$F(A,B,C,D)=\\sum m(0,3,5,6,9,12,15)$$\n规定 $A$ 为最高位变量。\n\n【作答要求】\n(1) 说明如何用最高位 $A$ 完成两片的片选，写出两片各自的使能端接法；\n(2) 分别列出两片中被选中的输出编号（按片内 $BCD$ 三位地址编号）；\n(3) 给出输出合并方案，写出最终表达式，并统计所需门电路；\n(4) 有同学提出“把两片的同名输出直接相连（线与）即可”，请判断该方案是否可行并说明理由。",
    "answer": "【标准答案】\n(1) 片选方案：\n片 0 负责 $A=0$（$m_0\\sim m_7$），片 1 负责 $A=1$（$m_8\\sim m_{15}$），两片地址端均接 $A_2=B,\\ A_1=C,\\ A_0=D$。\n利用 $G_1$（高有效）作片选：\n片 0：$G_1=\\overline{A}$（需 1 个反相器），$\\overline{G_{2A}}=\\overline{G_{2B}}=0$；\n片 1：$G_1=A$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$。\n于是 $A=0$ 时片 0 工作、片 1 全部输出为 1；$A=1$ 时反之。\n\n(2) 片内选中输出（片内编号 = $BCD$ 的十进制值）：\n| 最小项 | $ABCD$ | 所属片 | 片内地址 $BCD$ | 选中输出 |\n| :---: | :---: | :---: | :---: | :---: |\n| $m_0$ | 0000 | 片 0 | 000 | $\\overline{Y_0}$ |\n| $m_3$ | 0011 | 片 0 | 011 | $\\overline{Y_3}$ |\n| $m_5$ | 0101 | 片 0 | 101 | $\\overline{Y_5}$ |\n| $m_6$ | 0110 | 片 0 | 110 | $\\overline{Y_6}$ |\n| $m_9$ | 1001 | 片 1 | 001 | $\\overline{Y_1}$ |\n| $m_{12}$ | 1100 | 片 1 | 100 | $\\overline{Y_4}$ |\n| $m_{15}$ | 1111 | 片 1 | 111 | $\\overline{Y_7}$ |\n\n(3) 输出合并：\n片 0 侧：$F_0=\\overline{\\overline{Y_0}\\cdot\\overline{Y_3}\\cdot\\overline{Y_5}\\cdot\\overline{Y_6}}$（四输入与非门）\n片 1 侧：$F_1=\\overline{\\overline{Y_1}\\cdot\\overline{Y_4}\\cdot\\overline{Y_7}}$（三输入与非门）\n由于未选中片的所有输出恒为 1，其对应与非门输出必为 0，故可用**或门**合并：\n$$F=F_0+F_1$$\n共需：四输入与非门 1 个、三输入与非门 1 个、二输入或门 1 个、（片 0 的 $\\overline{A}$）反相器 1 个，合计 4 个门。\n\n(4) 不可行。\n理由：74HC138 为普通 CMOS 推挽输出，输出级上下管均为低阻。若把两片同名输出直接相连，当一片输出 0（选中）而另一片输出 1（未选中）时，两输出级形成 $V_{CC}\\to GND$ 的低阻通路，产生数十毫安级短路电流，既造成逻辑电平不确定，又可能损坏芯片。\n只有 **OC/OD 输出**（外接上拉电阻）或**三态输出**才允许线与。因此必须用门电路（与非 + 或）合并，而不能直接相连。",
    "explanation": "【详细推导与解析】\n1. 片选的两条路径：用 $G_1$（高有效）接最高位，或用 $\\overline{G_{2A}}$（低有效）接最高位的反。本题用 $G_1$ 只需一个反相器（$\\overline{A}$ 供片 0），用 $\\overline{G_{2A}}$ 同样只需一个反相器。考试中写清“哪片用哪个使能端、接什么信号”即可得分。\n2. 合并逻辑的关键事实：**未选中片的 8 个输出全为 1**。因此该片对应的与非门一定输出 0，对或门无贡献 —— 这正是可以“两路独立算、最后或起来”的依据。\n3. 若改用“与门”合并会怎样？两路中一路为 0、一路为有效值，与门输出恒 0，函数完全失效 —— 这是本题最常见的结构性错误。\n4. 第 (4) 问是 821 常考的“工程常识 + 电气特性”小题，答题时必须同时给出**逻辑后果**（电平不确定）与**电气后果**（大电流、发热损坏），只答“会冲突”得分不完整。",
    "scoringPoints": [
      "第一问：$G_1$ 片选方案正确，两片使能端接法写全 (4分)",
      "第二问：7 个最小项的片内编号全部正确 (4分)",
      "第三问：两路与非 + 或门合并，表达式与门数正确 (4分)",
      "第四问：指出推挽输出不能线与并说明电气后果 (3分)"
    ],
    "commonMistakes": [
      "片内编号直接用最小项编号（如 $m_9$ 写成 $Y_9$），忽略了片内只有 3 位地址",
      "两路输出用与门合并，导致函数恒为 0",
      "片 0 的 $G_1$ 直接接 $A$，使两片同时使能，输出互相冲突"
    ],
    "verification": "取 $m_{12}$（1100）验证：$A=1$ → 片 1 工作，片内 $BCD=100$ → $\\overline{Y_4}=0$ → $F_1=1$，$F_0=0$ → $F=1$ ✓；取 $m_4$（0100，不在集合）：片 0 工作、$BCD=100$ → $\\overline{Y_4}=1$，$F_0$ 的四个输入中仅 $\\overline{Y_0},\\overline{Y_3},\\overline{Y_5},\\overline{Y_6}$ 参与，均非该地址 → 全为 1 → $F_0=0$，$F_1=0$ → $F=0$ ✓。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 2-2：两片 74HC138 用使能端扩展实现四变量函数 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(A 作片选，片内编号需减去 8A)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 720 396\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<text x=\"40.0\" y=\"34.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">片0 管 A=0，片1 管 A=1；未选中片输出全为 1，不干扰合并结果。</text>\n<rect x=\"40.0\" y=\"48.0\" width=\"170.0\" height=\"140.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"40.0\" y=\"48.0\" width=\"170.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"125.0\" y=\"66.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC138（片0）</text>\n<text x=\"54.0\" y=\"108.0\" font-size=\"10\" fill=\"#b45309\" text-anchor=\"start\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">G1 = A</text>\n<text x=\"54.0\" y=\"130.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">G2A = G2B = 0</text>\n<text x=\"54.0\" y=\"156.0\" font-size=\"10\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">地址 = B C D</text>\n<text x=\"198.0\" y=\"108.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y0</text><line x1=\"185.0\" y1=\"95.0\" x2=\"198.0\" y2=\"95.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"104.0\" x2=\"250.0\" y2=\"104.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"198.0\" y=\"134.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y3</text><line x1=\"185.0\" y1=\"121.0\" x2=\"198.0\" y2=\"121.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"130.0\" x2=\"250.0\" y2=\"130.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"198.0\" y=\"160.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y5</text><line x1=\"185.0\" y1=\"147.0\" x2=\"198.0\" y2=\"147.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"156.0\" x2=\"250.0\" y2=\"156.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"198.0\" y=\"186.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y6</text><line x1=\"185.0\" y1=\"173.0\" x2=\"198.0\" y2=\"173.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"182.0\" x2=\"250.0\" y2=\"182.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"40.0\" y=\"214.0\" width=\"170.0\" height=\"140.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"40.0\" y=\"214.0\" width=\"170.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"125.0\" y=\"232.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC138（片1）</text>\n<text x=\"54.0\" y=\"274.0\" font-size=\"10\" fill=\"#b45309\" text-anchor=\"start\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">G1 = A（经反相）</text>\n<text x=\"54.0\" y=\"296.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">G2A = G2B = 0</text>\n<text x=\"54.0\" y=\"322.0\" font-size=\"10\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">地址 = B C D</text>\n<text x=\"198.0\" y=\"254.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y1</text><line x1=\"185.0\" y1=\"241.0\" x2=\"198.0\" y2=\"241.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"250.0\" x2=\"250.0\" y2=\"250.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"198.0\" y=\"280.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y4</text><line x1=\"185.0\" y1=\"267.0\" x2=\"198.0\" y2=\"267.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"276.0\" x2=\"250.0\" y2=\"276.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"198.0\" y=\"306.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y7</text><line x1=\"185.0\" y1=\"293.0\" x2=\"198.0\" y2=\"293.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"302.0\" x2=\"250.0\" y2=\"302.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"250.0\" y=\"88.0\" width=\"106.0\" height=\"112.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#334155\" stroke-width=\"1.8\"/><text x=\"303.0\" y=\"143.0\" font-size=\"12\" fill=\"#1e293b\" text-anchor=\"middle\" font-weight=\"700\">与非门</text><text x=\"303.0\" y=\"161.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\">4 输入</text>\n<rect x=\"250.0\" y=\"232.0\" width=\"106.0\" height=\"88.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#334155\" stroke-width=\"1.8\"/><text x=\"303.0\" y=\"275.0\" font-size=\"12\" fill=\"#1e293b\" text-anchor=\"middle\" font-weight=\"700\">与非门</text><text x=\"303.0\" y=\"293.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\">3 输入</text>\n<rect x=\"400.0\" y=\"170.0\" width=\"80.0\" height=\"100.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#334155\" stroke-width=\"1.8\"/><text x=\"440.0\" y=\"219.0\" font-size=\"12\" fill=\"#1e293b\" text-anchor=\"middle\" font-weight=\"700\">或门</text><text x=\"440.0\" y=\"237.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\">2 输入</text>\n<line x1=\"356.0\" y1=\"144.0\" x2=\"378.0\" y2=\"144.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"378.0\" y1=\"144.0\" x2=\"378.0\" y2=\"200.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"378.0\" y1=\"200.0\" x2=\"400.0\" y2=\"200.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"356.0\" y1=\"276.0\" x2=\"378.0\" y2=\"276.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"378.0\" y1=\"276.0\" x2=\"378.0\" y2=\"240.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"378.0\" y1=\"240.0\" x2=\"400.0\" y2=\"240.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<line x1=\"480.0\" y1=\"220.0\" x2=\"560.0\" y2=\"220.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"568.0\" y=\"225.0\" font-size=\"14\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">F</text>\n<text x=\"40.0\" y=\"376.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">合并依据：未选中片的输出恒为 1 → 其与非门输出恒为 0 → 用或门合并互不干扰。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q005",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据 821 考纲 d 条目“用数据选择器实现逻辑函数”的基础考法设计",
    "knowledgePoints": [
      "74HC151",
      "数据选择器",
      "数据端接常量",
      "函数实现"
    ],
    "examMethods": [
      "151 实现三变量函数",
      "数据端 0/1 配置",
      "函数与真值表映射"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 74HC151（8 选 1 数据选择器，地址 $A_2A_1A_0$，使能端 $\\overline{E}$ 低有效）实现三变量逻辑函数\n$$F(A,B,C)=\\sum m(0,2,3,6,7)$$\n\n【作答要求】\n(1) 写出 74HC151 的输出表达式；\n(2) 给出地址端与数据端的完整接法（列出 $D_0\\sim D_7$ 的取值）；\n(3) 若要求改用 $\\overline{Y}$（反相输出端）直接得到 $\\overline{F}$，是否需要改动数据端？说明理由；\n(4) 与直接用与非门实现相比，用 151 实现的优势与代价各是什么？",
    "answer": "【标准答案】\n(1) 输出表达式：\n$$Y=\\sum_{i=0}^{7}m_i D_i=\\overline{A_2}\\,\\overline{A_1}\\,\\overline{A_0}D_0+\\overline{A_2}\\,\\overline{A_1}A_0D_1+\\cdots+A_2A_1A_0D_7$$\n\n(2) 接法：\n地址端 $A_2=A,\\ A_1=B,\\ A_0=C$，$\\overline{E}=0$；数据端按真值表逐项配置：\n| 地址 $ABC$ | 最小项 | $F$ | 数据端 |\n| :---: | :---: | :---: | :---: |\n| 000 | $m_0$ | 1 | $D_0=1$ |\n| 001 | $m_1$ | 0 | $D_1=0$ |\n| 010 | $m_2$ | 1 | $D_2=1$ |\n| 011 | $m_3$ | 1 | $D_3=1$ |\n| 100 | $m_4$ | 0 | $D_4=0$ |\n| 101 | $m_5$ | 0 | $D_5=0$ |\n| 110 | $m_6$ | 1 | $D_6=1$ |\n| 111 | $m_7$ | 1 | $D_7=1$ |\n\n(3) 不需要改动数据端。\n74HC151 的 $\\overline{Y}$ 端在片内已对 $Y$ 取反，而 $\\overline{F}=\\overline{\\sum m_i D_i}$ 恰好等于对同一组 $D_i$ 的输出取反，故直接取 $\\overline{Y}$ 即得 $\\overline{F}$，数据端保持上表不变。\n\n(4) 对比：\n优势 —— 无需任何外围门电路，函数改变时只需改接线（或改存储内容），通用性强、调试快、引脚可预测；\n代价 —— 占用一片 MSI 芯片、8 个数据端都要接到 0 或 1（布线量增大），且当输入变量多于 3 个时单个 151 不够用，必须降维或扩展。",
    "explanation": "【详细推导与解析】\n1. 三变量函数用 151 是“一一映射”：地址即输入，数据端即真值表的输出列。写出真值表就能直接抄成 $D_i$，这是最不该丢分的题型。\n2. 必须牢记 $Y=\\sum m_iD_i$ 中 $m_i$ 的编号与地址权重一致：$A_2$ 是最高位。若把 $A$ 接到 $A_0$，则 $D$ 表要按位反转重排（见 Q017 的错位陷阱）。\n3. 第 (3) 问考察“器件内部已有反相”的敏感度：151 同时提供 $Y$ 与 $\\overline{Y}$，等价于免费获得一个反相器，考试中常用来省门。\n4. 第 (4) 问是“设计权衡”型简答，答题要点是“通用性 vs 资源占用”，不要写成空泛的优缺点。",
    "scoringPoints": [
      "第一问：写出 $Y=\\sum m_iD_i$ 且地址权重正确 (2分)",
      "第二问：地址与数据端 8 项全部正确 (6分)",
      "第三问：判断不需改动并说明原因 (2分)",
      "第四问：优势与代价各答出实质内容 (2分)"
    ],
    "commonMistakes": [
      "数据端按 $m_1,m_2,m_4,m_7$ 编号填写而地址接的是 $ABC$，导致顺序错乱",
      "把 $\\overline{E}$ 接 1（误以为高有效），芯片始终不工作，输出恒为 0",
      "第 (3) 问误答“需要把 $D_i$ 全部取反”"
    ],
    "verification": "逐点抽验：$ABC=011$（$m_3$，应在集合内）→ 选中 $D_3=1$ → $Y=1$ ✓；$ABC=100$（$m_4$，不在集合）→ 选中 $D_4=0$ → $Y=0$ ✓。8 点全验与 $\\sum m(0,2,3,6,7)$ 一致。"
  },
  {
    "id": "Q006",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据 821 真题批注中“151 数据选择器跨年份高频”线索，按降维法经典考法设计（非原卷）",
    "knowledgePoints": [
      "74HC151",
      "降维法",
      "四变量函数",
      "数据端接变量"
    ],
    "examMethods": [
      "151 降维法实现四变量函数",
      "数据端接常量/D/D′ 的判定",
      "函数实现完整性校验"
    ],
    "tag": "【高频骨干题】",
    "question": "【题目描述】\n用一片 74HC151 实现四变量逻辑函数\n$$F(A,B,C,D)=\\sum m(0,1,4,5,7,9,12,14)$$\n要求地址端接 $A_2=A,\\ A_1=B,\\ A_0=C$。\n\n【作答要求】\n(1) 说明“降维法”的基本思想，并指出本题为什么不能把 8 个数据端全部接 0 或 1；\n(2) 列表给出 $D_0\\sim D_7$ 的取值（允许取 $0$、$1$、$D$、$\\overline{D}$）；\n(3) 写出最终用 $D$ 与地址变量表示的输出表达式，并验证 $m_7$ 与 $m_9$ 两个最小项；\n(4) 若把地址端改为 $A_2=B,\\ A_1=C,\\ A_0=D$，数据端应如何修改？说明判断依据（不必列全表）。",
    "answer": "【标准答案】\n(1) 降维法思想：\n把 $n$ 变量函数中的 3 个变量接到地址端，剩下的第 4 个变量“下放”到数据端 —— 这样 151 的 8 个数据端不再是常量，而可以是 $0、1、D、\\overline{D}$。\n本题中地址固定为 $A,B,C$，剩余变量是 $D$。同一地址对应两个最小项（$D=0$ 与 $D=1$）：\n- 两者都在集合内 → $D_i=1$；\n- 两者都不在 → $D_i=0$；\n- 只有 $D=1$ 的在 → $D_i=D$；\n- 只有 $D=0$ 的在 → $D_i=\\overline{D}$。\n因此绝不可能全部接 0/1。\n\n(2) 数据端取值：\n| 地址 $ABC$ | 对应最小项 | 集合内情况 | $D_i$ |\n| :---: | :---: | :---: | :---: |\n| 000 | $m_0,m_1$ | 两者皆在 | $D_0=1$ |\n| 001 | $m_2,m_3$ | 都不在 | $D_1=0$ |\n| 010 | $m_4,m_5$ | 两者皆在 | $D_2=1$ |\n| 011 | $m_6,m_7$ | 仅 $m_7$ 在 | $D_3=D$ |\n| 100 | $m_8,m_9$ | 仅 $m_9$ 在 | $D_4=D$ |\n| 101 | $m_{10},m_{11}$ | 都不在 | $D_5=0$ |\n| 110 | $m_{12},m_{13}$ | 仅 $m_{12}$ 在 | $D_6=\\overline{D}$ |\n| 111 | $m_{14},m_{15}$ | 仅 $m_{14}$ 在 | $D_7=\\overline{D}$ |\n\n(3) 输出表达式：\n$$F=\\overline{A}\\,\\overline{B}\\,\\overline{C}\\cdot 1+\\overline{A}B\\overline{C}\\cdot 1+\\overline{A}BCD+AB\\overline{C}D+A\\overline{B}C\\overline{D}+ABC\\overline{D}$$\n整理为\n$$F=\\overline{A}\\,\\overline{C}+\\overline{A}BCD+AB\\overline{C}D+A\\overline{B}C\\overline{D}+ABC\\overline{D}$$\n验证：\n$m_7=0111$ → 地址 011 → $D_3=D=1$ → $F=1$ ✓；\n$m_9=1001$ → 地址 100 → $D_4=D=1$ → $F=1$ ✓。\n\n(4) 地址改为 $B,C,D$ 时：\n此时剩余变量为 $A$，判断规则不变，只需按 $(B,C,D)$ 的 8 种组合重新归组：\n- $(B,C,D)=000$ → 涉及 $m_0(A=0)$、$m_8(A=1)$：仅 $m_0$ 在集合 → $D_0=\\overline{A}$；\n- $(1,1,0)$ → 涉及 $m_6$、$m_{14}$：仅 $m_{14}$ 在 → $D_6=A$；\n- 其余各组的判定同理：把该组两个最小项的“在/不在”与 $A=0/A=1$ 对应起来即可。\n判断依据：**数据端必须接“除地址变量之外的那个变量”，且极性由“该变量取何值时函数为 1”决定**。",
    "explanation": "【详细推导与解析】\n1. 降维法的本质是“合并同类项”：$\\overline{A}\\,\\overline{B}\\,\\overline{C}(\\overline{D}+D)=\\overline{A}\\,\\overline{B}\\,\\overline{C}$，即把 $D$ 从与项中消掉，改为在数据端体现。\n2. 四种情形的判定口诀：**同在取 1、同不在取 0、一半取变量、反向取反变量**。\n3. 本题最容易错的两处：\n   - $D_6$：$m_{12}=1100$ 在集合、$m_{13}=1101$ 不在 → 只有 $D=0$ 时成立 → $D_6=\\overline{D}$（不是 $D$）；\n   - $D_7$：$m_{14}=1110$ 在、$m_{15}=1111$ 不在 → 同样是 $\\overline{D}$。\n   只要把“$D=0$ 与 $D=1$ 分别对应哪个最小项”写清楚，就不会反。\n4. 第 (4) 问不要求列全表，考的是“规则迁移能力”：地址换成哪 3 个变量，剩下那个变量就下放到数据端，极性由真值表决定。",
    "scoringPoints": [
      "第一问：说清降维思想并指出不能全接 0/1 的原因 (3分)",
      "第二问：8 个数据端全部正确（尤其 $D_6,D_7$ 为 $\\overline{D}$）(6分)",
      "第三问：表达式正确且两点验证通过 (3分)",
      "第四问：给出正确判定规则并至少正确推出 1 个数据端 (3分)"
    ],
    "commonMistakes": [
      "把 $D_6$、$D_7$ 误写成 $D$（只看“有一个在集合内”就取 $D$）",
      "把地址端当成 $C,B,A$（权重颠倒），导致整表位移",
      "忘记把 $\\overline{E}$ 接地，8 个数据端配得再对也无输出"
    ],
    "verification": "用“$D$ 的系数法”交叉核对：$F$ 中含 $D$ 的项应仅在 $D_3,D_4$ 通道出现（$\\overline{A}BC+AB\\overline{C}$），含 $\\overline{D}$ 的项仅在 $D_6,D_7$（$AB\\overline{C}+ABC$），不依赖 $D$ 的项为 $\\overline{A}\\,\\overline{C}$。与真值表逐行比对一致。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 2-3：用 74HC151 以“降维法”实现四变量函数 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(地址 3 位 + 数据端 1 位变量)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 700 362\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<rect x=\"260.0\" y=\"48.0\" width=\"170.0\" height=\"268.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"260.0\" y=\"48.0\" width=\"170.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"345.0\" y=\"66.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC151</text>\n<text x=\"345.0\" y=\"186.0\" font-size=\"30\" fill=\"#dbe3ee\" text-anchor=\"middle\" font-weight=\"700\">8 → 1</text>\n<text x=\"345.0\" y=\"210.0\" font-size=\"11\" fill=\"#dbe3ee\" text-anchor=\"middle\" font-weight=\"700\">数据选择</text>\n<rect x=\"196\" y=\"79\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"94.0\" font-size=\"11\" fill=\"#dc2626\" text-anchor=\"middle\" font-weight=\"700\">1</text>\n<text x=\"188.0\" y=\"94.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D0</text>\n<line x1=\"236.0\" y1=\"90.0\" x2=\"260.0\" y2=\"90.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"107\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"122.0\" font-size=\"11\" fill=\"#dc2626\" text-anchor=\"middle\" font-weight=\"700\">0</text>\n<text x=\"188.0\" y=\"122.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D1</text>\n<line x1=\"236.0\" y1=\"118.0\" x2=\"260.0\" y2=\"118.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"135\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"150.0\" font-size=\"11\" fill=\"#dc2626\" text-anchor=\"middle\" font-weight=\"700\">1</text>\n<text x=\"188.0\" y=\"150.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D2</text>\n<line x1=\"236.0\" y1=\"146.0\" x2=\"260.0\" y2=\"146.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"163\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"178.0\" font-size=\"11\" fill=\"#7c3aed\" text-anchor=\"middle\" font-weight=\"700\">D</text>\n<text x=\"188.0\" y=\"178.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D3</text>\n<line x1=\"236.0\" y1=\"174.0\" x2=\"260.0\" y2=\"174.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"191\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"206.0\" font-size=\"11\" fill=\"#7c3aed\" text-anchor=\"middle\" font-weight=\"700\">D</text>\n<text x=\"188.0\" y=\"206.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D4</text>\n<line x1=\"236.0\" y1=\"202.0\" x2=\"260.0\" y2=\"202.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"219\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"234.0\" font-size=\"11\" fill=\"#dc2626\" text-anchor=\"middle\" font-weight=\"700\">0</text>\n<text x=\"188.0\" y=\"234.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D5</text>\n<line x1=\"236.0\" y1=\"230.0\" x2=\"260.0\" y2=\"230.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"247\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"262.0\" font-size=\"11\" fill=\"#7c3aed\" text-anchor=\"middle\" font-weight=\"700\">D′</text>\n<text x=\"188.0\" y=\"262.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D6</text>\n<line x1=\"236.0\" y1=\"258.0\" x2=\"260.0\" y2=\"258.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<rect x=\"196\" y=\"275\" width=\"40\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.4\"/>\n<text x=\"216.0\" y=\"290.0\" font-size=\"11\" fill=\"#7c3aed\" text-anchor=\"middle\" font-weight=\"700\">D′</text>\n<text x=\"188.0\" y=\"290.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D7</text>\n<line x1=\"236.0\" y1=\"286.0\" x2=\"260.0\" y2=\"286.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"345.0\" y=\"336.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">地址端 A2A1A0 接 A、B、C（A 权重 4）</text>\n<line x1=\"430.0\" y1=\"152.0\" x2=\"510.0\" y2=\"152.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"518.0\" y=\"157.0\" font-size=\"13\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y = F</text>\n<text x=\"24.0\" y=\"122.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">① 地址端接 A、B、C</text>\n<text x=\"24.0\" y=\"146.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">② 数据端接变量 D</text>\n<text x=\"24.0\" y=\"170.0\" font-size=\"10\" fill=\"#7c3aed\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">　 取 0 / 1 / D / D′</text>\n<text x=\"24.0\" y=\"214.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">同一地址对应两项：</text>\n<text x=\"24.0\" y=\"236.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">同在 → 接 1</text>\n<text x=\"24.0\" y=\"258.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">同不在 → 接 0</text>\n<text x=\"24.0\" y=\"280.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">仅一项在 → 接 D 或 D′</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q007",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据考纲 d 条目“数据选择器的功能和使用方法”，按双 4 选 1 多输出共享地址考法设计",
    "knowledgePoints": [
      "74HC153",
      "双4选1",
      "多输出共享地址",
      "数据端接变量"
    ],
    "examMethods": [
      "153 双通道实现两个函数",
      "共用地址端的资源复用",
      "数据端接剩余变量"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 74HC153（双 4 选 1 数据选择器，两组数据端 $1D_0\\sim1D_3$、$2D_0\\sim2D_3$，共用地址 $A_1A_0$，两组使能端 $\\overline{1G}$、$\\overline{2G}$ 均低有效）同时实现\n$$F_1(A,B,C)=\\sum m(0,1,3,5),\\qquad F_2(A,B,C)=\\sum m(1,2,6,7)$$\n地址端固定接 $A_1=A,\\ A_0=B$。\n\n【作答要求】\n(1) 写出 74HC153 单通道的输出表达式；\n(2) 分别给出两组数据端 $1D_0\\sim1D_3$ 与 $2D_0\\sim2D_3$ 的接法；\n(3) 写出 $F_1$、$F_2$ 关于 $A,B,C$ 的表达式并化简，检验 $m_3$ 与 $m_4$；\n(4) 说明这种“双通道共享地址”方案相比用两片 151 节省了什么。",
    "answer": "【标准答案】\n(1) 单通道表达式（以通道 1 为例，$\\overline{1G}=0$）：\n$$Y_1=\\overline{A_1}\\,\\overline{A_0}\\,1D_0+\\overline{A_1}A_0\\,1D_1+A_1\\overline{A_0}\\,1D_2+A_1A_0\\,1D_3$$\n\n(2) 数据端接法（剩余变量为 $C$）：\n| 地址 $AB$ | 涉及最小项 | $F_1$ 情况 | $1D_i$ | $F_2$ 情况 | $2D_i$ |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| 00 | $m_0,m_1$ | 两者皆在 | $1D_0=1$ | 仅 $m_1$ 在 | $2D_0=C$ |\n| 01 | $m_2,m_3$ | 仅 $m_3$ 在 | $1D_1=C$ | 仅 $m_2$ 在 | $2D_1=\\overline{C}$ |\n| 10 | $m_4,m_5$ | 仅 $m_5$ 在 | $1D_2=C$ | 都不在 | $2D_2=0$ |\n| 11 | $m_6,m_7$ | 都不在 | $1D_3=0$ | 两者皆在 | $2D_3=1$ |\n\n(3) 输出表达式：\n$$F_1=\\overline{A}\\,\\overline{B}+\\overline{A}B\\,C+AB\\overline{C}\\,C+0=\\overline{A}\\,\\overline{B}+C(A\\oplus B)$$\n$$F_2=\\overline{A}\\,\\overline{B}\\,C+\\overline{A}B\\,\\overline{C}+AB$$\n检验：$m_3=011$（$A=0,B=1,C=1$）→ $F_1$：$\\overline{A}\\,\\overline{B}=0$，$A\\oplus B=1$，$C=1$ → $F_1=1$ ✓；$F_2$：$\\overline{A}B\\overline{C}=0$，其余为 0 → $F_2=0$ ✓（$m_3$ 不在 $F_2$ 集合）。\n$m_4=100$（$A=1,B=0,C=0$）→ $F_1$：$\\overline{A}\\,\\overline{B}=0$，$A\\oplus B=1$ 但 $C=0$ → $F_1=0$ ✓；$F_2$：$AB=0$ → $F_2=0$ ✓。\n\n(4) 节省之处：\n- 芯片数量：1 片 153 替代 2 片 151；\n- 地址线：只需 2 根（$A_1A_0$），不必为每个函数各布 3 根地址；\n- 使能线：两组 $\\overline{G}$ 可并联接地，减少控制线；\n- 布线量：8 个数据端共用 4 个地址组合，整体连线明显减少。\n代价：每个函数只能使用 2 位地址（等效“降低一维”），若函数对第 3 位变量依赖复杂，数据端仍需接变量。",
    "explanation": "【详细推导与解析】\n1. 153 是“两片 4 选 1 装在一个封装里”，两组数据端独立、地址端共用。命题人正是利用“共用地址”来考“多输出函数共享同一组低维变量”的化简。\n2. 判定规则与 151 完全一致，只是每个通道只有 4 个数据端，因此每组只涉及 2 个最小项：\n   - 两个都在 → 1；都不在 → 0；一个在 → 接 $C$ 或 $\\overline{C}$。\n3. 本题的直观校验：$F_1$ 在 $AB=00$ 时恒为 1（$m_0,m_1$ 都在），所以 $1D_0=1$ 是一个“送分点”；$F_2$ 在 $AB=11$ 时恒为 1（$m_6,m_7$ 都在），所以 $2D_3=1$。\n4. 两个函数的使能端必须都接地（$\\overline{1G}=\\overline{2G}=0$），否则对应通道输出恒 0。",
    "scoringPoints": [
      "第一问：单通道表达式正确（含地址权重）(2分)",
      "第二问：8 个数据端全部正确 (6分)",
      "第三问：表达式正确且两点检验通过 (3分)",
      "第四问：答出芯片数、地址线、布线量三项中的至少两项 (2分)"
    ],
    "commonMistakes": [
      "把两组数据端接成同一组（误认为 153 的两组共用数据端）",
      "$2D_1$ 误接 $C$（$m_2$ 在集合意味着 $C=0$ 时成立，应接 $\\overline{C}$）",
      "只接一个使能端，另一通道悬空，导致 $F_2$ 恒为 0"
    ],
    "verification": "把 $A=1,B=1,C=1$（$m_7$）代入：$F_1$ 三项全为 0 → 0 ✓（$m_7$ 不在集合）；$F_2=AB=1$ → 1 ✓。与真值表一致。"
  },
  {
    "id": "Q008",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据考纲 d 条目“译码器的使用方法”，按 138 作数据分配器的经典考法设计",
    "knowledgePoints": [
      "74HC138",
      "数据分配器",
      "使能端作数据输入",
      "同相/反相输出"
    ],
    "examMethods": [
      "译码器构成数据分配器",
      "使能端极性对输出相位的影响",
      "通道选通关系分析"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 74HC138 构成 **1 路到 8 路的数据分配器**：数据输入为 $D$，地址为 $A_2A_1A_0$，要求被选中通道输出与 $D$ **同相**。\n\n【作答要求】\n(1) 写出 74HC138 的输出方程（含使能端）；\n(2) 说明 $D$ 应接哪个引脚才能得到同相输出，并给出严格推导；\n(3) 若把 $D$ 改接 $G_1$ 端，被选中通道的输出与 $D$ 是什么关系？\n(4) 分析该分配器在“未被选中”的 7 个通道上输出什么电平，并指出这对后级电路提出了什么要求。",
    "answer": "【标准答案】\n(1) 输出方程：\n设 $p_1$ 为 $G_1$ 引脚电平，$p_2$、$p_3$ 分别为 $\\overline{G_{2A}}$、$\\overline{G_{2B}}$ 引脚电平，则使能条件为\n$$EN=p_1\\cdot\\overline{p_2}\\cdot\\overline{p_3}$$\n$$\\overline{Y_i}=\\overline{EN\\cdot m_i}\\quad(i=0,1,\\cdots,7)$$\n\n(2) 同相输出的接法：\n令 $p_1=1$、$p_3=0$、$p_2=D$，即 **$D$ 直接接 $\\overline{G_{2A}}$ 端**，则\n$$EN=1\\cdot\\overline{D}\\cdot 1=\\overline{D}$$\n被选中通道（$m_i=1$）：\n$$\\overline{Y_i}=\\overline{\\overline{D}\\cdot 1}=D$$\n即输出与 $D$ 同相 ✓。\n\n(3) 若 $D$ 改接 $G_1$：\n$$EN=D\\cdot 1\\cdot 1=D\\Rightarrow \\overline{Y_i}=\\overline{D\\cdot 1}=\\overline{D}$$\n被选中通道输出为 $D$ 的**反相**（反相数据分配器）。\n\n(4) 未选中通道的电平：\n未选中通道 $m_i=0$，故\n$$\\overline{Y_i}=\\overline{EN\\cdot 0}=1$$\n即 7 个未选中通道恒为高电平 1（不是高阻态）。\n对后级的要求：后级不能简单地把 8 路输出“或”起来取数据（否则恒为 1），必须按地址配合选通信号选通对应通道，或在后级加三态门/与门屏蔽。",
    "explanation": "【详细推导与解析】\n1. 数据分配器与数据选择器互为逆过程：分配器把 1 路数据送到 8 个通道中的 1 个，选择器从 8 路中选 1 路。\n2. 用 138 做分配器的本质是“**把数据当作使能信号**”：使能为 1 时译码器工作，选中通道输出 0；使能为 0 时全部输出 1。因此数据的 0/1 直接体现为“选中通道是 0 还是 1”。\n3. 相位判定的通用结论（务必背下）：\n| 数据接入端 | 极性 | 选中通道输出 |\n| :---: | :---: | :---: |\n| $\\overline{G_{2A}}$ 或 $\\overline{G_{2B}}$（低有效） | 低 | $D$（同相） |\n| $G_1$（高有效） | 高 | $\\overline{D}$（反相） |\n原因是低有效端本身在使能式中已被取反一次，与输出端的取反相互抵消。\n4. 第 (4) 问是工程细节，也是“能不能真正用起来”的关键：138 输出不是三态，未选中通道恒为 1，因此不能像三态总线那样直接并接。",
    "scoringPoints": [
      "第一问：写出含使能端的输出方程 (3分)",
      "第二问：$D$ 接 $\\overline{G_{2A}}$ 并完成同相推导 (4分)",
      "第三问：判断为反相并给出推导 (2分)",
      "第四问：指出未选中通道恒为 1 及对后级的选通要求 (3分)"
    ],
    "commonMistakes": [
      "把 $D$ 接 $G_1$ 后仍认为输出同相（忽略输出端本身已取反）",
      "认为未选中通道为高阻态，直接与总线并接，造成电平被拉高",
      "把地址端与数据端接反，使 $D$ 被当作地址位处理"
    ],
    "verification": "取 $D=0$、地址 101：$EN=\\overline{0}=1$ → $\\overline{Y_5}=\\overline{1\\cdot1}=0=D$ ✓，其余 $\\overline{Y_i}=\\overline{1\\cdot0}=1$ ✓；取 $D=1$：$EN=0$ → 全部输出 1，其中 $\\overline{Y_5}=1=D$ ✓。"
  },
  {
    "id": "Q009",
    "section": "必做区",
    "difficulty": "中档",
    "type": "计算",
    "sourceType": "AI标准变式",
    "sourceNote": "依据考纲 d 条目“算术运算电路”与真题批注中“加法器”题型设计",
    "knowledgePoints": [
      "74HC283",
      "超前进位加法器",
      "级联",
      "补码减法"
    ],
    "examMethods": [
      "四位加法器输出计算",
      "多片级联进位传递",
      "用加法器实现减法"
    ],
    "tag": "",
    "question": "【题目描述】\n74HC283 为 4 位二进制超前进位全加器，输入 $A_3A_2A_1A_0$、$B_3B_2B_1B_0$、进位输入 $C_0$，输出和 $S_3S_2S_1S_0$ 与进位输出 $C_4$（均为高电平有效）。\n\n【作答要求】\n(1) 计算 $A=1001$、$B=0110$、$C_0=0$ 时的 $S_3S_2S_1S_0$ 与 $C_4$；\n(2) 计算 $A=1111$、$B=0001$、$C_0=0$ 时的输出；\n(3) 用两片 74HC283 级联实现 8 位加法：$A=1000\\,0111$、$B=0000\\,1001$，求 8 位和 $S_7\\sim S_0$ 与最终进位 $C_8$；\n(4) 用一片 74HC283 实现 $A-B$（$A=1001$，$B=0110$），说明 $B$ 与 $C_0$ 应如何设置，并由 $C_4$ 判断是否有借位。",
    "answer": "【标准答案】\n(1) $1001+0110+0$：\n$$1001+0110=01111$$\n故 $S_3S_2S_1S_0=1111$（即 15），$C_4=0$。\n\n(2) $1111+0001+0$：\n$$1111+0001=1\\,0000$$\n故 $S_3S_2S_1S_0=0000$，$C_4=1$（产生进位，结果为 16）。\n\n(3) 8 位级联（低片进位送高片 $C_0$）：\n低片：$0111+1001=1\\,0000$ → $S_3\\sim S_0=0000$，$C_4=1$；\n高片：$1000+0000+1=1001$ → $S_7\\sim S_4=1001$，$C_8=0$。\n故\n$$S_7\\sim S_0=1001\\,0000=(144)_{10}$$\n$C_8=0$。校验：$135+9=144$ ✓。\n\n(4) 用加法器实现减法：\n$$A-B=A+\\overline{B}+1$$\n设置：$B$ 端送入 $\\overline{B}=1001$（每位取反），$C_0=1$（加 1，构成补码）。\n计算：$1001+1001+1=1\\,0011$ → $S_3\\sim S_0=0011=(3)_{10}$，$C_4=1$。\n判借位：$C_4=1$ 表示**无借位**（$A\\ge B$）；若 $C_4=0$ 则表示有借位，结果需按补码解释为负。\n本题 $9-6=3$ ✓，且 $C_4=1$ 与 $9\\ge 6$ 一致。",
    "explanation": "【详细推导与解析】\n1. 74HC283 是“超前进位”结构：4 位内部的进位由 $P_i=A_i\\oplus B_i$、$G_i=A_iB_i$ 直接产生，不必逐级等待，因此比串行进位快；但**片间进位仍需外部连接**，级联后整体延迟随片数增长。\n2. 计算时逐位加并跟踪进位即可，不要漏掉 $C_0$：\n   - 第 (2) 问若忘记 $C_4$，会错答“结果为 0”，而实际是 16。\n3. 级联顺序：低位片的 $C_4$ 接高位片的 $C_0$，最高位的 $C_4$ 即总进位 $C_8$。这是“位权从低到高”的唯一正确方向。\n4. 补码减法的三条固定动作：**$B$ 逐位取反、$C_0=1$、用 $C_4$ 判借位**。$C_4$ 与借位互为反相，这一点与 74161 的“同步置数/异步清零”一样，是必须形成条件反射的结论。",
    "scoringPoints": [
      "第一问：$S=1111$、$C_4=0$ (2分)",
      "第二问：$S=0000$、$C_4=1$ 且说明结果为 16 (3分)",
      "第三问：级联方向正确、结果 10010000、$C_8=0$ (4分)",
      "第四问：取反 + $C_0=1$ 设置正确，$C_4=1$ 判为无借位 (3分)"
    ],
    "commonMistakes": [
      "级联时把高片 $C_4$ 接低片 $C_0$（进位方向反了）",
      "减法时忘记加 1（只做 $A+\\overline{B}$），结果少 1",
      "把 $C_4=1$ 判为“有借位”"
    ],
    "verification": "第 (3) 问用十进制校验：$A=135$、$B=9$，$135+9=144$，与 $1001\\,0000$ 一致；第 (4) 问用 $A-B=3$ 与 $0011$ 一致。两处校验互相独立，结论一致。"
  },
  {
    "id": "Q010",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "依据考纲 d 条目“算术运算电路的应用”，按 283 实现代码转换的经典考法设计",
    "knowledgePoints": [
      "74HC283",
      "8421BCD",
      "余3码",
      "代码转换"
    ],
    "examMethods": [
      "用加法器实现码制转换",
      "常量输入端配置",
      "转换范围与进位分析"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 74HC283 实现 **8421BCD 码到余 3 码**的转换。输入为 $D_3D_2D_1D_0$（8421BCD），输出为余 3 码 $Y_3Y_2Y_1Y_0$。\n\n【作答要求】\n(1) 说明余 3 码与 8421BCD 码的数值关系，给出转换所需的加法运算；\n(2) 写出 74HC283 各输入端的接法（$A$ 端、$B$ 端、$C_0$）；\n(3) 求输入为 $0100$、$1001$ 时的输出，并说明 $C_4$ 的取值；\n(4) 若反向要求“余 3 码 → 8421BCD 码”，应如何修改接法？给出输入为 $0111$ 时的转换结果。",
    "answer": "【标准答案】\n(1) 数值关系：\n余 3 码 = 8421BCD 码 + $(0011)_2$，即每个十进制数位加 3（偏移二进制码）。\n$$Y=D+3$$\n\n(2) 接法：\n$A$ 端接输入 $D_3D_2D_1D_0$；$B$ 端接常量 $0011$（即 $B_3=0,B_2=0,B_1=1,B_0=1$）；$C_0=0$。\n输出端 $S_3S_2S_1S_0$ 即余 3 码；$C_4$ 不使用（恒为 0）。\n\n(3) 计算：\n输入 $0100$（4）：$0100+0011=0111$ → $Y=0111$，$C_4=0$；\n输入 $1001$（9）：$1001+0011=1100$ → $Y=1100$，$C_4=0$。\n一般地，$0\\le D\\le 9$，$D+3\\le 12<16$，故 $C_4$ 恒为 0（可直接悬空不使用）。\n\n(4) 反向转换（余 3 → 8421）：\n需减去 3，即 $D=Y-3=Y+(-3)=Y+(1101)_2$（4 位补码），$C_0=0$。\n接法改为：$A$ 端接余 3 码，$B$ 端接常量 $1101$，$C_0=0$；输出 $S$ 即 8421BCD 码，$C_4=1$ 表示“无借位”（结果非负）。\n输入 $0111$（余 3 码 7，对应十进制 4）：\n$$0111+1101=1\\,0100$$\n取低 4 位 → $0100=(4)_{10}$ ✓，$C_4=1$ 表示转换有效。",
    "explanation": "【详细推导与解析】\n1. 码制转换题的通用套路：**先把“数值关系”写成加减法，再把加减法翻译成 283 的“常量输入端 + 进位输入”**。\n   - 加常量 $k$：$B$ 端接 $k$ 的二进制，$C_0=0$；\n   - 减常量 $k$：$B$ 端接 $-k$ 的 4 位补码（即 $k$ 取反加 1），$C_0=0$，用 $C_4$ 判断是否出现负结果。\n2. 注意“$-3$ 的补码”是 $1101$，不是 $0011$ 取反后忘记加 1（$1100$）。这是本题唯一的计算陷阱。\n3. $C_4$ 的工程含义：在“加法”场景下 $C_4=1$ 表示溢出（$\\ge 16$）；在“减法”场景下 $C_4=1$ 表示无借位（结果 $\\ge 0$）。同一引脚在不同语境下含义相反，必须结合运算类型解释。\n4. 余 3 码的一个重要性质：它是对 9 的自补码（每位取反即得 9 的补码），因此常用于 BCD 减法运算，这也是教材强调它的原因。",
    "scoringPoints": [
      "第一问：写出“加 3”的数值关系 (2分)",
      "第二问：$A$/$B$/$C_0$ 接法全对（$B=0011$）(4分)",
      "第三问：两个输入的结果正确并说明 $C_4$ 恒为 0 (3分)",
      "第四问：正确使用 $1101$ 实现减 3，并得出 0100 (4分)"
    ],
    "commonMistakes": [
      "反向转换时用 $1100$ 代替 $1101$（取反后忘加 1）",
      "把常量接到 $A$ 端、变量接到 $B$ 端，虽结果相同但接线不规范，易被扣分",
      "把 $C_4=1$ 解释为“溢出/错误”，与无借位混淆"
    ],
    "verification": "取 $D=0000$：$0000+0011=0011$ ✓（0 的余 3 码为 0011）；取反向 $Y=0011$：$0011+1101=1\\,0000$ → 低 4 位 $0000$ ✓。两端边界值均自洽。"
  },
  {
    "id": "Q011",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“加法器应用”与“BCD 码修正”两项考法自编，对应 821 真题批注中“加法器 + T 型电阻”类综合题型思路",
    "knowledgePoints": [
      "74HC283",
      "BCD 加法",
      "加 6 修正",
      "修正判别逻辑"
    ],
    "examMethods": [
      "一位 BCD 加法器设计",
      "修正判别式推导",
      "两片级联的修正通路"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n用两片 74HC283 及必要的门电路构成 **1 位 8421BCD 码加法器**：输入为两个 BCD 数 $A_3A_2A_1A_0$、$B_3B_2B_1B_0$，输出为 BCD 和 $D_3D_2D_1D_0$ 及十进制进位 $C$。\n\n【作答要求】\n(1) 说明为什么 BCD 加法不能直接使用 4 位二进制加法的结果；\n(2) 写出“需要加 6 修正”的判别条件，并说明各项的物理含义；\n(3) 画出（或文字描述）两片 283 的连接关系，写出第二片的输入端接法；\n(4) 以 $8+7$ 为例完整演算，给出 $D_3D_2D_1D_0$ 与 $C$；\n(5) 若输入出现非法码（如 $1010$），该电路输出是否仍然正确？说明理由。",
    "answer": "【标准答案】\n(1) 原因：\n4 位二进制加法按“逢 16 进 1”工作，而 BCD 码要求“逢 10 进 1”。当两数之和在 $10\\sim 15$ 之间时，二进制结果是一个**非法 BCD 码**，必须再加上 6 才能跳过 6 个非法状态（$1010\\sim1111$），并产生正确的十进制进位。\n\n(2) 修正判别条件：\n设第一片 283 的输出为 $S_3S_2S_1S_0$，进位为 $C_4$，则\n$$M=C_4+S_3S_2+S_3S_1$$\n各项含义：\n$C_4$：和 $\\ge 16$，必然需要进位并修正；\n$S_3S_2$：覆盖 $1100\\sim1111$（12~15）；\n$S_3S_1$：覆盖 $1010,1011$（10、11）。\n三项合起来恰好覆盖 $10\\sim15$ 与 $\\ge 16$ 两种情形，$M=1$ 表示需要加 6。\n\n(3) 连接关系：\n第一片：$A$ 接 $A_3\\sim A_0$，$B$ 接 $B_3\\sim B_0$，$C_0=0$，输出 $S_3\\sim S_0$ 与 $C_4$。\n修正判别门：$M=C_4+S_3S_2+S_3S_1$（2 个二输入与门 + 1 个三输入或门）。\n第二片：$A$ 端接第一片的 $S_3\\sim S_0$，$B$ 端接 $0\\,M\\,M\\,0$（即 $B_3=0,B_2=M,B_1=M,B_0=0$，实现“$M=1$ 时加 0110”），$C_0=0$。\n输出：$D_3\\sim D_0$ 取第二片的 $S_3\\sim S_0$；十进制进位 $C=C_4+$（第二片的 $C_4$），二者不会同时为 1，可直接用或门合并。\n\n(4) $8+7$ 演算：\n$1000+0111=1111$，$C_4=0$；\n判别：$S_3S_2=11$ → $M=1$；\n修正：$1111+0110=1\\,0101$ → $C_4'=1$，$D_3\\sim D_0=0101$；\n结果：$C=1$，$D=0101$ → 十进制 $15$ ✓。\n\n(5) 非法码输入：\n不能保证正确。若输入 $1010$（10）参与运算，$M$ 判别式只针对“和”的取值设计，无法识别“输入本身非法”；输出的 BCD 码可能落在非法区间或产生错误进位。\n工程上应在输入端增加“非法码检测”电路（如用 74HC138 检测 $1010\\sim1111$，见拓展题 Q022），检测到非法输入时输出错误标志并屏蔽结果。",
    "explanation": "【详细推导与解析】\n1. BCD 加法的本质是“二进制加法 + 条件修正”，两步缺一不可。修正量恒为 6，因为 $16-10=6$：跳过 6 个非法码正好把“逢 16”改成“逢 10”。\n2. 判别式的推导（可用卡诺图验证）：需要修正的最小项为 $m_{10}\\sim m_{15}$ 以及 $C_4=1$ 的全部情形。\n   - $m_{10},m_{11}$：$S_3=1,S_1=1$ → $S_3S_1$；\n   - $m_{12}\\sim m_{15}$：$S_3=1,S_2=1$ → $S_3S_2$。\n   两圈覆盖全部 6 个最小项，故 $M=C_4+S_3S_2+S_3S_1$，无冗余项。\n3. 第二片的 $B$ 端接法是本题的核心操作：$B_2=B_1=M$、$B_3=B_0=0$，即“$M$ 控制是否加 0110”。这种“用判别信号去控制常量输入端”的写法在 821 中非常常见。\n4. 进位合并：$C_4$ 与第二片 $C_4'$ 不会同时为 1（$C_4=1$ 时和已 $\\ge16$，加 6 后更 $\\ge16$ 但此时 $C_4'$ 可能为 1...）——严谨说法是二者之一为 1 即表示十进制进位，用或门合并是安全且正确的，因为不存在“两个进位都有效但只需计 1 次”的矛盾情形。",
    "scoringPoints": [
      "第一问：说明“逢 16”与“逢 10”的差异及加 6 的必要性 (3分)",
      "第二问：判别式 $M=C_4+S_3S_2+S_3S_1$ 正确且逐项解释 (4分)",
      "第三问：两片连接与 $B$ 端 $0MM0$ 接法正确 (4分)",
      "第四问：$8+7$ 演算完整，得 $C=1,D=0101$ (3分)",
      "第五问：指出非法输入无法被该判别式覆盖 (2分)"
    ],
    "commonMistakes": [
      "判别式写成 $C_4+S_3S_2+S_3S_0$（$S_3S_0$ 并不能覆盖 $1010/1011$）",
      "第二片 $B$ 端接成 $00MM$ 或 $0M0M$，加的不是 6 而是 3 或 5",
      "把修正后的进位漏掉，得到 $D=0101$ 却报 $C=0$（错答为 5）"
    ],
    "verification": "$6+7=1101$：$S_3S_2=11$ → $M=1$ → $1101+0110=1\\,0011$ → $C=1,D=0011$ → 13 ✓；$5+3=1000$：$S_3S_2=10$ → $M=0$ → $D=1000$、$C=0$ → 8 ✓。两例覆盖“需修正/不需修正”两条路径。"
  },
  {
    "id": "Q012",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石第六版 4.4 节数值比较器功能表与级联方法设计，非教材原题",
    "knowledgePoints": [
      "74HC85",
      "数值比较器",
      "级联输入端",
      "比较位数扩展"
    ],
    "examMethods": [
      "比较器功能表分析",
      "级联输入的正确设置",
      "多位比较扩展"
    ],
    "tag": "",
    "question": "【题目描述】\n74HC85 为 4 位数值比较器，输入 $A_3\\sim A_0$、$B_3\\sim B_0$，级联输入 $I_{A>B}$、$I_{A=B}$、$I_{A<B}$，输出 $O_{A>B}$、$O_{A=B}$、$O_{A<B}$。\n\n【作答要求】\n(1) 说明三个级联输入的作用，单片使用时必须如何设置；\n(2) 若把级联输入接成 $I_{A>B}=0,\\ I_{A=B}=0,\\ I_{A<B}=0$，当 $A=B$ 时输出是什么？说明这种接法为什么错误；\n(3) 用两片 74HC85 构成 8 位比较器，说明级联输入与输出的连接顺序，并解释“为什么高位片决定最终结果”；\n(4) 比较 $A=1011\\,0110$ 与 $B=1011\\,1001$（8 位），写出各片输出与最终结论。",
    "answer": "【标准答案】\n(1) 级联输入的作用：\n它们用于“低位比较结果”的传入，使多片比较器能够串接成更宽的比较器。单片（4 位）使用时必须设置为\n$$I_{A>B}=0,\\quad I_{A=B}=1,\\quad I_{A<B}=0$$\n否则当 $A=B$ 时输出会跟随级联输入而错误。\n\n(2) 接成全 0 的后果：\n当 $A=B$ 时，芯片输出直接复现级联输入，即 $O_{A>B}=0$、$O_{A=B}=0$、$O_{A<B}=0$ —— 三个输出全为 0，既不表示“相等”，也破坏了“三者有且仅有一个为 1”的编码约束，后级无法判读。\n\n(3) 8 位级联：\n低 4 位片（$A_3\\sim A_0$、$B_3\\sim B_0$）的级联输入接 $(0,1,0)$，其三个输出接高 4 位片（$A_7\\sim A_4$）的级联输入；高 4 位片的输出即整体比较结果。\n原因：高位片的比较优先。只要高 4 位不相等，高位片立即按其自身 $A$、$B$ 给出结果，级联输入被忽略；只有当高 4 位完全相等时，高位片才把级联输入（即低 4 位的结果）原样输出。\n\n(4) 计算：\n$A$ 高 4 位 $=1011$，$B$ 高 4 位 $=1011$ → 高位片 $A=B$，输出跟随级联输入；\n$A$ 低 4 位 $=0110$，$B$ 低 4 位 $=1001$ → 低位片 $A<B$，输出 $O_{A<B}=1$；\n故整体 $A<B$（$A=182$，$B=185$ ✓）。",
    "explanation": "【详细推导与解析】\n1. 比较器的输出是“三选一”的互斥编码：$O_{A>B}$、$O_{A=B}$、$O_{A<B}$ 中恰有一个为 1。级联输入正是“第四种来源”，用于在“本位相等”时接管输出。\n2. 单片设置 (0,1,0) 的记忆法：**“相等时默认相等”** —— 把 $I_{A=B}$ 置 1，相当于告诉芯片“低位部分相等”，于是输出完全由本片决定。\n3. 级联方向的判断口诀：**低位片的输出 → 高位片的级联输入**。若接反，则变成“低位优先”，比较结果完全错误（这是本题最高频的失分点）。\n4. 第 (4) 问的规范写法：先比较高 4 位，相等则看低 4 位；给出每片的三个输出，最后给整体结论。只写“A<B”而不写分片输出会被扣过程分。",
    "scoringPoints": [
      "第一问：级联输入作用与 (0,1,0) 设置 (3分)",
      "第二问：指出三输出全 0 并说明破坏互斥编码 (3分)",
      "第三问：级联方向正确并解释高位优先 (3分)",
      "第四问：分片输出与整体结论均正确 (3分)"
    ],
    "commonMistakes": [
      "把高位片输出接低位片级联输入（方向反了）",
      "单片使用时级联输入悬空，导致 $A=B$ 时输出不确定",
      "认为“高位片一定输出 1”，忽略高位相等时由低位决定"
    ],
    "verification": "用十进制核对：$A=1011\\,0110=182$，$B=1011\\,1001=185$，$182<185$ ✓，与逐片分析一致。"
  },
  {
    "id": "Q013",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“译码器”与“数据选择器”两项器件考法自编的混合电路分析题",
    "knowledgePoints": [
      "74HC138",
      "74HC151",
      "混合电路",
      "地址复用"
    ],
    "examMethods": [
      "译码器+选择器混合电路分析",
      "地址共享关系的识别",
      "混合电路功能化简"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n图 2-4 所示电路中：74HC138 的三个地址端接 $X_2X_1X_0$（$G_1=1$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$），其输出 $\\overline{Y_0}\\sim\\overline{Y_3}$ 依次接到 74HC151 的 $D_0\\sim D_3$；151 的 $A_2$ 端接地，$A_1=X_1$、$A_0=X_0$，$\\overline{E}=0$；输出为 $Y$。\n\n【作答要求】\n(1) 写出 138 的输出与最小项的关系，以及 151 的输出表达式；\n(2) 推导 $Y$ 关于 $X_2X_1X_0$ 的表达式；\n(3) 列出 $X_2X_1X_0$ 从 000 到 111 的 $Y$ 值，指出该电路实现的逻辑功能；\n(4) 说明本题中“地址复用”带来的一个设计风险，以及在工程上如何规避。",
    "answer": "【标准答案】\n(1) 基本关系：\n$$\\overline{Y_i}=\\overline{m_i}\\ (i=0,1,\\cdots,7),\\quad m_i\\text{ 以 }X_2X_1X_0\\text{ 编号}$$\n151 在 $\\overline{E}=0$、$A_2=0$ 时只用 $D_0\\sim D_3$：\n$$Y=\\overline{A_1}\\,\\overline{A_0}D_0+\\overline{A_1}A_0D_1+A_1\\overline{A_0}D_2+A_1A_0D_3$$\n\n(2) 代入 $A_1=X_1$、$A_0=X_0$、$D_k=\\overline{Y_k}=\\overline{m_k}$：\n$$Y=\\overline{X_1}\\,\\overline{X_0}\\,\\overline{m_0}+\\overline{X_1}X_0\\,\\overline{m_1}+X_1\\overline{X_0}\\,\\overline{m_2}+X_1X_0\\,\\overline{m_3}$$\n注意 $\\overline{X_1}\\,\\overline{X_0}=\\overline{X_2}\\,\\overline{X_1}\\,\\overline{X_0}+X_2\\overline{X_1}\\,\\overline{X_0}$，故\n$$\\overline{X_1}\\,\\overline{X_0}\\,\\overline{m_0}=\\overline{X_1}\\,\\overline{X_0}\\cdot\\overline{\\overline{X_2}\\,\\overline{X_1}\\,\\overline{X_0}}=X_2\\overline{X_1}\\,\\overline{X_0}$$\n同理其余三项分别化为 $X_2\\overline{X_1}X_0$、$X_2X_1\\overline{X_0}$、$X_2X_1X_0$。四项相加即“$X_2=1$ 时的全部 4 个最小项”：\n$$Y=X_2(\\overline{X_1}\\,\\overline{X_0}+\\overline{X_1}X_0+X_1\\overline{X_0}+X_1X_0)=X_2$$\n\n(3) 真值表：\n| $X_2$ | $X_1$ | $X_0$ | $Y$ |\n| :---: | :---: | :---: | :---: |\n| 0 | 0 | 0 | 0 |\n| 0 | 0 | 1 | 0 |\n| 0 | 1 | 0 | 0 |\n| 0 | 1 | 1 | 0 |\n| 1 | 0 | 0 | 1 |\n| 1 | 0 | 1 | 1 |\n| 1 | 1 | 0 | 1 |\n| 1 | 1 | 1 | 1 |\n功能：**输出等于最高位 $X_2$**，即“取最高位”电路（$Y=X_2$）。\n\n(4) 风险与规避：\n风险：138 与 151 共享同一组地址信号，地址同时翻转时两条路径的传输延迟不同，可能在输出端产生**竞争毛刺**；此外 151 的 $A_2$ 被固定接地，只用了 4 个通道，资源利用率低、功能受限。\n规避：在地址稳定后再给出使能（选通脉冲），或对输出加锁存/滤波；若需完整 8 通道，应把 $A_2$ 也接到 $X_2$ 并补齐 $D_4\\sim D_7$。",
    "explanation": "【详细推导与解析】\n1. 混合电路的读图顺序：**先各自独立写出器件方程，再找“哪个器件的输出是另一个器件的输入”**，逐层代入，最后化简。\n2. 本题的巧妙点是“反相信号被 151 采样”：$D_k$ 接的是 $\\overline{m_k}$ 而不是 $m_k$，因此 $Y$ 是“选中地址的反相”。这就是为什么 $X_2=0$ 时输出 0（选中项为 0），$X_2=1$ 时输出 1（选中项全部为 1）。\n3. 代数化简的捷径：把 $D_k=\\overline{m_k}$ 与 $m_k$ 的定义式对照，可发现每一项都含 $X_2$ 因子（因为 $\\overline{m_k}$ 对 $X_2$ 取反后必然出现 $X_2$），故结果只含 $X_2$。\n4. 这类题在 821 中常以“求输出表达式并说明功能”形式出现，评分看重“表达式 → 真值表 → 功能描述”三步是否齐全。",
    "scoringPoints": [
      "第一问：两个器件方程写对 (3分)",
      "第二问：代入与化简过程完整、结果 $Y=X_2$ (5分)",
      "第三问：8 行真值表正确且功能描述准确 (3分)",
      "第四问：指出毛刺风险或通道利用率问题并给出规避措施 (2分)"
    ],
    "commonMistakes": [
      "把 $D_k$ 当作 $m_k$ 代入，得出 $Y=1$（与真值表矛盾）",
      "忽略 $A_2$ 接地，误用 $D_4\\sim D_7$ 的悬空状态",
      "只写表达式不列真值表，功能描述含糊（如“实现某种译码功能”）"
    ],
    "verification": "取 $X_2X_1X_0=101$：138 选中 $\\overline{Y_5}$，但 $D_5$ 未接（$A_2=0$ 只用 $D_0\\sim D_3$）；151 选中 $D_1=\\overline{Y_1}=\\overline{m_1}$，此处 $m_1=001$ 对应 $X_2=0$，实际地址 101 使 $m_1=0$ → $D_1=1$ → $Y=1=X_2$ ✓。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 2-4：译码器 + 数据选择器混合电路 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(共享地址总线，151 只取 4 个通道)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 700 330\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<path d=\"M 135 58 L 135 50 L 455 50 L 455 58\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/>\n<text x=\"295.0\" y=\"42.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">共用地址 X2X1X0</text>\n<rect x=\"60.0\" y=\"58.0\" width=\"150.0\" height=\"175.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"60.0\" y=\"58.0\" width=\"150.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"135.0\" y=\"76.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC138</text><text x=\"135.0\" y=\"221.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\">A2A1A0 = X2X1X0</text>\n<rect x=\"380.0\" y=\"58.0\" width=\"150.0\" height=\"175.0\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/><rect x=\"380.0\" y=\"58.0\" width=\"150.0\" height=\"26\" rx=\"6\" fill=\"#eef2ff\" opacity=\"0.55\"/><text x=\"455.0\" y=\"76.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\">74HC151</text><text x=\"455.0\" y=\"221.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"middle\">A2 = 0，仅用 A1A0</text>\n<text x=\"198.0\" y=\"104.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y0</text><line x1=\"185.0\" y1=\"91.0\" x2=\"198.0\" y2=\"91.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"100.0\" x2=\"380.0\" y2=\"100.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"392.0\" y=\"104.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D0</text>\n<text x=\"198.0\" y=\"136.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y1</text><line x1=\"185.0\" y1=\"123.0\" x2=\"198.0\" y2=\"123.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"132.0\" x2=\"380.0\" y2=\"132.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"392.0\" y=\"136.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D1</text>\n<text x=\"198.0\" y=\"168.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y2</text><line x1=\"185.0\" y1=\"155.0\" x2=\"198.0\" y2=\"155.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"164.0\" x2=\"380.0\" y2=\"164.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"392.0\" y=\"168.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D2</text>\n<text x=\"198.0\" y=\"200.0\" font-size=\"11\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" textLength=\"13.0\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y3</text><line x1=\"185.0\" y1=\"187.0\" x2=\"198.0\" y2=\"187.0\" stroke=\"#1e293b\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<line x1=\"210.0\" y1=\"196.0\" x2=\"380.0\" y2=\"196.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"392.0\" y=\"200.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D3</text>\n<line x1=\"530.0\" y1=\"148.0\" x2=\"610.0\" y2=\"148.0\" stroke=\"#334155\" stroke-width=\"2\"/>\n<text x=\"618.0\" y=\"153.0\" font-size=\"14\" fill=\"#dc2626\" text-anchor=\"start\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Y</text>\n<text x=\"60.0\" y=\"268.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">X2X1X0 同时送 138 的地址端与 151 的低两位地址端。</text>\n<text x=\"60.0\" y=\"292.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">D_k 接的是 Y_k 的反（即 m_k 的非），故 151 输出为选中地址的反相。</text>\n<text x=\"60.0\" y=\"314.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">图中 Y0~Y3 与 D0~D3 逐条直连，不再逐行标注对应关系。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q014",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“译码器实现函数”与“多输出共享”两项考法自编",
    "knowledgePoints": [
      "74HC138",
      "多输出函数",
      "共享译码器",
      "反函数取反"
    ],
    "examMethods": [
      "一片 138 实现双输出函数",
      "互补输出省门策略",
      "门数最优化比较"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n用**一片** 74HC138 及尽量少的门电路，同时实现\n$$F_1(A,B,C)=\\sum m(0,2,3,5),\\qquad F_2(A,B,C)=\\sum m(1,4,6,7)$$\n\n【作答要求】\n(1) 观察两个函数的集合关系，给出省门最多的实现方案；\n(2) 分别写出两种方案的表达式与门电路数量：方案甲“各自独立实现”、方案乙“利用互补关系”；\n(3) 画出（或描述）方案乙的接线；\n(4) 若要求 $F_1$、$F_2$ 均以“高有效”输出，方案乙是否仍然成立？说明判断依据。",
    "answer": "【标准答案】\n(1) 集合关系：\n$F_1$ 的集合 $\\{0,2,3,5\\}$ 与 $F_2$ 的集合 $\\{1,4,6,7\\}$ 恰好互补且并集为全部 8 个最小项，故\n$$F_2=\\overline{F_1}$$\n这是本题的最优切入点。\n\n(2) 两种方案：\n方案甲（独立实现）：\n$$F_1=\\overline{\\overline{Y_0}\\cdot\\overline{Y_2}\\cdot\\overline{Y_3}\\cdot\\overline{Y_5}}$$\n$$F_2=\\overline{\\overline{Y_1}\\cdot\\overline{Y_4}\\cdot\\overline{Y_6}\\cdot\\overline{Y_7}}$$\n需 2 个四输入与非门。\n\n方案乙（利用互补）：\n$$F_1=\\overline{\\overline{Y_0}\\cdot\\overline{Y_2}\\cdot\\overline{Y_3}\\cdot\\overline{Y_5}},\\qquad F_2=\\overline{F_1}$$\n需 1 个四输入与非门 + 1 个反相器（可用二输入与非门并接实现），**门数由 2 个降为 2 个但器件种类更省**；若库中只有二输入与非门，则方案甲需 2×(3+1)=8 个，方案乙需 4 个（含反相器 1 个），优势明显。\n\n(3) 方案乙接线：\n地址 $A_2=A$、$A_1=B$、$A_0=C$，$G_1=1$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$；\n$\\overline{Y_0},\\overline{Y_2},\\overline{Y_3},\\overline{Y_5}$ 送入四输入与非门，输出即 $F_1$；\n$F_1$ 再经一级反相（或二输入与非门并接）输出 $F_2$。\n\n(4) 仍然成立。\n判断依据：$F_1$ 与 $F_2$ 的“互补”是**逻辑函数的互补**，与输出高低有效无关。只要两个函数的真值表逐行相反，就恒有 $F_2=\\overline{F_1}$，因此用一个反相器即可从一个得到另一个。但要注意：若题目要求“输出低有效”，则需再各加一级反相，此时互补关系依旧成立，只是两级反相会相互抵消，等于直接用 138 的输出。",
    "explanation": "【详细推导与解析】\n1. 多输出函数的第一反应应是“**看集合是否互补、是否包含**”，而不是立刻各画一个与非门。互补可以省一个反相器级别的门，包含关系（$F_2\\supset F_1$）可以共用部分与非门。\n2. 方案比较要落到“门数/输入数/器件种类”三个可量化指标上，不能只说“更简单”。\n3. 本题还隐含一个知识点：$F_1$ 与 $F_2$ 互补时，它们的卡诺图恰好互补，且 $F_1$ 的最简式与 $F_2$ 的最简式不能通过简单取反互相代入（因为最简式不唯一），所以必须回到“函数级互补”而不是“表达式级取反”。\n4. 第 (4) 问考察“有效性（active level）”与“逻辑互补”的区别：前者是电气约定，后者是逻辑关系，二者独立。",
    "scoringPoints": [
      "第一问：识别互补关系并指出 $F_2=\\overline{F_1}$ (4分)",
      "第二问：两方案表达式正确，门数统计合理 (4分)",
      "第三问：接线（地址/使能/输出）完整正确 (3分)",
      "第四问：判断成立并说明“逻辑互补与有效性无关” (2分)"
    ],
    "commonMistakes": [
      "未发现互补关系，直接画两个独立与非门（虽正确但不是最优）",
      "把 $F_2=\\overline{F_1}$ 先取反得到 $F_1$，又在 $F_2$ 上再加一级与非门，造成双重取反回到 $F_1$",
      "使能端接错，导致两路输出恒为 0"
    ],
    "verification": "逐点核对：$m_0$ → $\\overline{Y_0}=0$ → $F_1=1$，$F_2=\\overline{1}=0$ ✓；$m_7$ → $\\overline{Y_7}=0$ 但不在 $F_1$ 的门输入中 → $F_1=0$，$F_2=1$ ✓。8 点核对全部满足互补。"
  },
  {
    "id": "Q015",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石第六版 4.3.1 节 74HC147 功能表设计，非教材原题",
    "knowledgePoints": [
      "74HC147",
      "10-4线编码器",
      "BCD 反码",
      "与 148 的差异"
    ],
    "examMethods": [
      "10-4 线优先编码器分析",
      "输出反码还原为 BCD",
      "两类编码器对比"
    ],
    "tag": "",
    "question": "【题目描述】\n74HC147 为 10 线-4 线优先编码器（BCD 输出，输入 $\\overline{I_0}\\sim\\overline{I_9}$ 低有效且 $\\overline{I_9}$ 优先级最高，输出 $\\overline{A_3}\\overline{A_2}\\overline{A_1}\\overline{A_0}$ 低有效），芯片**没有**使能端与级联端。\n\n【作答要求】\n(1) 写出输入 $\\overline{I_9}=0$ 与 $\\overline{I_7}=0$ 时输出端的电平，并还原为高有效 BCD 码；\n(2) 当 $\\overline{I_9}=0$ 与 $\\overline{I_5}=0$ 同时出现时，输出是什么？依据是什么？\n(3) 当所有输入均为 1 时，输出是什么？它对应哪个十进制数字？这说明什么？\n(4) 列表比较 74HC147 与 74HC148 在输入线数、输出线数、使能端、级联能力、输出编码形式五个方面的差异。",
    "answer": "【标准答案】\n(1) 输出电平：\n$\\overline{I_9}=0$：BCD 码 9 = $1001$，输出反码为 $0110$，即\n$$\\overline{A_3}\\overline{A_2}\\overline{A_1}\\overline{A_0}=0110$$\n$\\overline{I_7}=0$：BCD 码 7 = $0111$，反码为 $1000$，即输出 $1000$。\n\n(2) 同时有效：\n输出 $0110$（对应 9）。依据：$\\overline{I_9}$ 优先级最高，只要它有效，其余输入被全部忽略。\n\n(3) 全部为 1：\n输出 $1111$（BCD 码 0 的反码）。它对应十进制数字 **0**，但同时与“无按键按下”状态重合 —— 说明 74HC147 无法区分“按下 0 键”与“没有任何键按下”，必须由外部电路（如键盘扫描信号）另行判定。\n\n(4) 对比表：\n| 比较项 | 74HC147 | 74HC148 |\n| :---: | :---: | :---: |\n| 输入线数 | 10（$\\overline{I_0}\\sim\\overline{I_9}$） | 8（$\\overline{I_0}\\sim\\overline{I_7}$） |\n| 输出线数 | 4（BCD） | 3（二进制） |\n| 使能端 | 无 | 有 $\\overline{EI}$ |\n| 级联端 | 无 $\\overline{EO}$/$\\overline{Y_{EX}}$ | 有 $\\overline{EO}$、$\\overline{Y_{EX}}$ |\n| 输出形式 | BCD 反码（低有效） | 二进制反码（低有效） |\n| 可扩展性 | 不能直接级联 | 可级联扩展为 16-4、32-5 等 |",
    "explanation": "【详细推导与解析】\n1. 147 与 148 的“反码输出”规则相同：输出 = 编码值的逐位取反。区别在于 147 的编码值是 BCD（0~9，4 位），148 是二进制（0~7，3 位）。\n2. 147 无使能端，因此“无输入”与“输入 0”在输出上不可区分（都是 1111）。这是键盘编码电路中必须处理的经典问题。\n3. 147 的典型应用：十进制键盘 → BCD 码 → 送 7448 显示译码器。它与 138/7448 常一起出现在“按键显示”综合题中。\n4. 记忆要点：**147 是“十进四”，148 是“八进三”**；带使能、能级联的是 148。",
    "scoringPoints": [
      "第一问：两组输出电平与 BCD 还原均正确 (4分)",
      "第二问：输出 0110 并说明优先级依据 (2分)",
      "第三问：指出 1111 且与“无输入”重合 (3分)",
      "第四问：五项对比全部正确 (3分)"
    ],
    "commonMistakes": [
      "把 147 的输出当作高有效，写成 1001（应是 0110）",
      "认为 147 可以像 148 一样用 $\\overline{EO}$ 级联",
      "忽略“无输入 = 输入 0”的二义性，直接说 1111 就是 0 键"
    ],
    "verification": "查 147 功能表：$\\overline{I_9}=0$ 行给出 0110 ✓（= $\\overline{1001}$）；$\\overline{I_7}=0$ 行给出 1000 ✓（= $\\overline{0111}$）；全 1 输入行给出 1111 ✓。"
  },
  {
    "id": "Q016",
    "section": "必做区",
    "difficulty": "综合",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“加法器算术运算”与“数值比较器”两项考法自编",
    "knowledgePoints": [
      "74HC283",
      "74HC85",
      "补码减法",
      "借位与进位"
    ],
    "examMethods": [
      "加法器与比较器联用",
      "借位与 $C_4$ 的对应关系",
      "结果一致性验证"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n某 4 位数据通路要求同时给出“$A-B$ 的差值”和“$A$ 与 $B$ 的大小关系”。现用一片 74HC283（实现 $A-B$）和一片 74HC85（实现比较）并联构成该电路。\n\n【作答要求】\n(1) 写出 283 实现 $A-B$ 的接线（$B$ 端、$C_0$）与结果解释规则；\n(2) 写出 85 单片使用时的级联输入设置，并给出三个输出与 $A$、$B$ 大小关系的对应；\n(3) 以 $A=0101$、$B=1001$ 为例，分别求 283 的输出与 85 的输出，验证二者结论一致；\n(4) 说明为什么在工程上“比较”与“求差”通常要分别用专用器件，而不是只用一个减法器的结果去判断大小。",
    "answer": "【标准答案】\n(1) 283 实现减法：\n$A$ 端接 $A_3\\sim A_0$，$B$ 端接 $\\overline{B_3}\\sim\\overline{B_0}$（逐位取反，需 4 个反相器），$C_0=1$。\n$$S=A+\\overline{B}+1=A-B\\ (\\text{4 位补码})$$\n解释规则：$C_4=1$ → 无借位（$A\\ge B$），$S$ 即为差的真值；$C_4=0$ → 有借位（$A<B$），$S$ 为负差的补码。\n\n(2) 85 的设置与输出：\n级联输入 $I_{A>B}=0$、$I_{A=B}=1$、$I_{A<B}=0$；输出：\n$$A>B\\Rightarrow O_{A>B}=1;\\quad A=B\\Rightarrow O_{A=B}=1;\\quad A<B\\Rightarrow O_{A<B}=1$$\n三者互斥，恒有一个为 1。\n\n(3) $A=0101(5)$、$B=1001(9)$：\n283：$\\overline{B}=0110$，$0101+0110+1=1\\,1100$ → $S=1100$，$C_4=0$ → 有借位，$A<B$，差值为 $-4$（$1100$ 是 $-4$ 的 4 位补码）。\n85：$A<B$ → $O_{A<B}=1$，其余为 0。\n二者结论一致（$A<B$）；且 $S=1100$ 的补码值恰为 $5-9=-4$ ✓。\n\n(4) 原因：\n- 时序与延迟：减法器的借位要经过 4 位（或多片）传播才能确定，比较器内部为并行比较结构，判定更快；\n- 语义清晰：比较器输出直接给出三种互斥状态，无需后级再解释 $C_4$ 的含义，减少误判；\n- 位宽扩展：比较器可用级联端自然扩展，而减法器扩展后需同时处理多片进位与符号解释，逻辑更复杂；\n- 可靠性：把“算术结果”和“关系判定”解耦，任一路故障不会同时污染两类信息。",
    "explanation": "【详细推导与解析】\n1. 减法的三条固定动作再复述一次：**$B$ 取反、$C_0=1$、看 $C_4$**。本题把 $C_4$ 的语义（无借位）与 85 的 $O_{A>B}/O_{A=B}$ 对齐，是关键得分点。\n2. $C_4=1$ 时 $A\\ge B$ 包含“相等”的情形，因此不能写成“$A>B$”。若要严格判 $A>B$，还需排除相等（即 $C_4=1$ 且 $S\\ne 0$）。\n3. 第 (3) 问中 $S=1100$ 的解释必须说明“这是补码”，否则会被判为算错（很多人看到 1100 就写 12）。\n4. 第 (4) 问是“工程判断”型简答，答题要落到可验证的指标上（延迟、语义、扩展性、可靠性），避免空话。",
    "scoringPoints": [
      "第一问：取反 + $C_0=1$ 接线正确，$C_4$ 语义正确 (4分)",
      "第二问：级联输入 (0,1,0) 与三输出对应关系正确 (3分)",
      "第三问：两组结果正确且指出 $S$ 为补码 (4分)",
      "第四问：给出至少两条实质性工程理由 (2分)"
    ],
    "commonMistakes": [
      "把 $C_4=0$ 解释为“结果为负”却不说明 $S$ 是补码，导致数值解释错误",
      "85 单片使用时级联输入接 (0,0,0)，$A=B$ 时输出错误",
      "认为 $C_4=1$ 就等于 $A>B$（漏掉相等的情形）"
    ],
    "verification": "用十进制反算：$A=5$、$B=9$，$5-9=-4$，补码 $1100$ ✓；$5<9$ → $O_{A<B}=1$ ✓。再取 $A=B=0110$：$0110+1001+1=1\\,0000$ → $S=0000$、$C_4=1$（无借位），85 输出 $O_{A=B}=1$，两者一致。"
  },
  {
    "id": "Q017",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“151 地址端权重顺序”这一机械套模板最易失效的环节自编的边界诊断题",
    "knowledgePoints": [
      "74HC151",
      "地址权重",
      "最小项编号错位",
      "接线诊断"
    ],
    "examMethods": [
      "151 接线错误诊断",
      "地址权重颠倒的函数推导",
      "两种修正方案比较"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n要求用一片 74HC151 实现 $F(A,B,C)=\\sum m(0,1,4,6)$。\n某同学的方案如下：把 $A$ 接 $A_2$ 端、$B$ 接 $A_1$ 端、$C$ 接 $A_0$ 端属于“标准接法”；但他实际把 **$C$ 接 $A_2$、$B$ 接 $A_1$、$A$ 接 $A_0$**，并按“标准接法”的真值表把数据端填成\n$$D_0=1,\\ D_1=1,\\ D_2=0,\\ D_3=0,\\ D_4=1,\\ D_5=0,\\ D_6=1,\\ D_7=0$$\n\n【作答要求】\n(1) 判断该电路实际实现的逻辑函数（写出 $\\sum m(\\cdots)$ 形式）；\n(2) 指出错误发生在设计的哪一步，并说明为什么“数据端填对了”仍会出错；\n(3) 给出两种修正方案（一种改接线、一种改数据端），并写出改数据端后的 $D_0\\sim D_7$；\n(4) 从本题总结一条做 151 设计题时必须执行的检查动作。",
    "answer": "【标准答案】\n(1) 实际实现的函数：\n地址端为 $(A_2A_1A_0)=(C,B,A)$，即地址码 $i=(CBA)_2$。对每组输入 $ABC$，实际选中的通道为\n$$i=4C+2B+A$$\n逐点计算：\n| $ABC$ | $CBA$ 的十进制 | 选中 $D_i$ | $F_{实际}$ |\n| :---: | :---: | :---: | :---: |\n| 000 | 0 | $D_0=1$ | 1 |\n| 001 | 4 | $D_4=1$ | 1 |\n| 010 | 2 | $D_2=0$ | 0 |\n| 011 | 6 | $D_6=1$ | 1 |\n| 100 | 1 | $D_1=1$ | 1 |\n| 101 | 5 | $D_5=0$ | 0 |\n| 110 | 3 | $D_3=0$ | 0 |\n| 111 | 7 | $D_7=0$ | 0 |\n故实际函数为\n$$F_{实际}=\\sum m(0,1,3,4)$$\n而目标函数是 $\\sum m(0,1,4,6)$ —— 两者仅在 $m_3$ 与 $m_6$ 上不同，属于“难以肉眼发现”的错位。\n\n(2) 错误环节：\n错在“**地址分配**”这一步：把权重最低的变量 $A$ 接到了权重最高的 $A_2$ 端（$A_2\\leftrightarrow A_0$ 整体互换），相当于对地址码做了“位反转”。\n数据端本身是按标准接法填的，没有错；但由于地址被重排，同一个 $D_i$ 被送到了错误的最小项上，所以“数据对、地址错 = 结果错”。这正是模板化做题最典型失效点。\n\n(3) 修正方案：\n方案一（改接线）：恢复 $A\\to A_2$、$B\\to A_1$、$C\\to A_0$，数据端保持不变。\n方案二（保留接线，改数据端）：需满足 $F(A,B,C)=D_{4C+2B+A}$，即按位反转后的编号填表：\n$$D_0=1,\\ D_1=1,\\ D_2=0,\\ D_3=1,\\ D_4=1,\\ D_5=0,\\ D_6=0,\\ D_7=0$$\n验证：$ABC=011$ → $i=6$ → $D_6=0$，而 $F(011)=0$ ✓；$ABC=110$ → $i=3$ → $D_3=1$，而 $F(110)=1$ ✓。\n\n(4) 必须执行的检查动作：\n**在填数据端之前，先把“地址端 ← 变量”的对应关系写成一行显式等式（如 $A_2=A,\\ A_1=B,\\ A_0=C$），并在填表时对每个 $D_i$ 注明其对应的输入组合。**\n填完后至少抽验 2 个点（一个“应为 1”、一个“应为 0”），反查地址码是否与该组合一致。",
    "explanation": "【详细推导与解析】\n1. 151 的输出 $Y=\\sum m_iD_i$ 中，$m_i$ 的下标完全由“地址端权重”决定：$A_2$ 权重 4、$A_1$ 权重 2、$A_0$ 权重 1。一旦变量与引脚的对应关系改变，$m_i$ 的编号随之改变，但 $D_i$ 的物理接线不会自动跟着变。\n2. 位反转映射：$i=4C+2B+A$ 与“标准编号”$i'=4A+2B+C$ 之间是“首尾两位互换”，属于 $0\\leftrightarrow0$、$1\\leftrightarrow4$、$2\\leftrightarrow2$、$3\\leftrightarrow6$、$5\\leftrightarrow5$、$7\\leftrightarrow7$ 的置换。\n3. 本题的“隐蔽性”在于：$\\sum m(0,1,4,6)$ 与 $\\sum m(0,1,3,4)$ 的十进制数字看起来很像，且只差两项。考场上若不做抽样验证，几乎不可能发现。\n4. 方案二的意义：它说明“接线错”与“数据错”可以互相补偿，但工程上不推荐 —— 因为可读性极差，后续维护者无法从数据表看出原函数。",
    "scoringPoints": [
      "第一问：正确推出 $\\sum m(0,1,3,4)$ 并给出推导表格 (6分)",
      "第二问：明确指出“地址分配”环节错误 (3分)",
      "第三问：两种方案均给出，方案二数据端 8 项正确 (3分)",
      "第四问：给出可执行的检查动作（显式等式 + 抽样验证）(2分)"
    ],
    "commonMistakes": [
      "只检查“数据端是否等于真值表”，不检查地址对应关系",
      "把位反转误认为“取反”，写出 $\\sum m(7,6,3,1)$ 之类的错误集合",
      "方案二只改 $D_3$ 或只改 $D_6$（两者都必须改）"
    ],
    "verification": "用方案二的数据端重算 $ABC=001$：$i=4$ → $D_4=1$，$F(001)=1$ ✓；$ABC=111$：$i=7$ → $D_7=0$，$F(111)=0$ ✓；$ABC=100$：$i=1$ → $D_1=1$，$F(100)=1$ ✓。三点均与目标函数一致。"
  },
  {
    "id": "Q018",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“1 的个数远多于 0”时译码器实现函数的取反策略自编的边界题",
    "knowledgePoints": [
      "74HC138",
      "反函数策略",
      "门数最优化",
      "低有效输出特性"
    ],
    "examMethods": [
      "按 0 的集合实现函数",
      "低有效输出直接取用",
      "门数与输入数的最优化"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n用一片 74HC138 及**尽量少的门电路**实现\n$$F(A,B,C)=\\sum m(0,1,2,3,5,6,7)$$\n\n【作答要求】\n(1) 若按“$F$ 的 1 的集合”用与非门实现，需要几个门？受什么限制？\n(2) 观察 $F$ 的 0 的集合，给出门数最少的方案，并写出表达式；\n(3) 若题目改成 $F'=\\sum m(4)$（即只要求输出一个最小项），实现方式是否相同？\n(4) 用与非门（SSI）实现同一函数需要几个门？与 (2) 的方案比较，说明“器件选择”对门数的影响。",
    "answer": "【标准答案】\n(1) 按“1 的集合”实现：\n$$F=\\overline{\\overline{Y_0}\\cdot\\overline{Y_1}\\cdot\\overline{Y_2}\\cdot\\overline{Y_3}\\cdot\\overline{Y_5}\\cdot\\overline{Y_6}\\cdot\\overline{Y_7}}$$\n需要 1 个 **7 输入与非门**。而标准与非门（7400/74HC00）只有 2 输入，74HC20 为 4 输入，实际器件中不存在 7 输入与非门；若用二输入与非门搭树，需 1（末级）+ 3（合并 7 路需 6 个输入二级）+ 反相 …… 门数与布线量都很大。\n\n(2) 门数最少的方案：\n$F$ 的 0 的集合只有一个最小项 $m_4$，即\n$$F=\\overline{m_4}$$\n而 74HC138 的输出恰好是 $\\overline{Y_4}=\\overline{m_4}$，因此\n$$F=\\overline{Y_4}$$\n**直接把 $\\overline{Y_4}$ 作为 $F$ 输出，不需要任何门电路（0 个门）**。\n\n(3) 若要求 $F'=\\sum m(4)=m_4$：\n此时 $m_4=\\overline{\\overline{Y_4}}$，需要 1 个反相器（或二输入与非门并接），即\n$$F'=\\overline{\\overline{Y_4}}$$\n与 (2) 的区别在于：目标函数与译码器输出极性相同则 0 门，相反则 1 门。\n\n(4) SSI 对照：\n由 $F=\\overline{m_4}=\\overline{A\\overline{B}\\,\\overline{C}}$ 得\n$$F=\\overline{A}+B+C$$\n需 1 个反相器（产生 $\\overline{A}$）+ 1 个三输入或门（或 2 个二输入或门）= **3 个门**。\n对比：138 方案 0 个门。结论：当函数“1 多 0 少”时，用译码器按“0 的集合”实现，可把门数降到极低；器件选择直接决定门数与布线复杂度。",
    "explanation": "【详细推导与解析】\n1. 译码器实现函数的两个方向必须都掌握：\n   - 按 1 的集合：$F=\\overline{\\prod\\overline{Y_i}}$（与非门），适合 1 少；\n   - 按 0 的集合：先求 $\\overline{F}=\\overline{\\prod\\overline{Y_j}}$，再 $F=\\overline{\\overline{F}}$（与非门 + 反相），适合 0 少。\n   本题 0 只有一个，属于极端情形，此时“先求 $\\overline F$ 再取反”恰好与 138 输出极性重合，反相被“免费”掉了。\n2. 关键洞察：$\\overline{Y_i}=\\overline{m_i}$ 本身就是一个“反相信号”。当目标函数刚好等于某个 $\\overline{m_i}$ 时，可以直接取用。这是本题的“边界感”所在 —— 模板化做题的人会条件反射地画一个与非门。\n3. 极性核对：本函数在 $m_4$ 处为 0、其余为 1；而 $\\overline{Y_4}=\\overline{m_4}$ 恰在 $m_4$ 处为 0、其余为 1 —— 两者逐点相同，故可直接取用，无需再加反相。\n4. 第 (4) 问说明“门数不是函数复杂度的函数，而是函数复杂度与器件特性的联合函数”。",
    "scoringPoints": [
      "第一问：指出需 7 输入与非门并说明器件限制 (3分)",
      "第二问：给出 $F=\\overline{Y_4}$、0 个门的方案 (5分)",
      "第三问：判断需 1 个反相器 (2分)",
      "第四问：SSI 方案 3 个门并完成对比 (3分)"
    ],
    "commonMistakes": [
      "机械地画一个与非门把 $\\overline{Y_4}$ 再取反，得到 $m_4$（与目标函数相反）",
      "认为“必须用与非门才算实现”，忽略可直接取用输出端",
      "把 $F=\\overline{A}+B+C$ 化简错（如写成 $\\overline{A}+BC$）"
    ],
    "verification": "代入 $m_4=100$：$\\overline{Y_4}=0$，故 $F=0$ ✓（$m_4$ 不在集合）；代入 $m_0=000$：$\\overline{Y_0}=0$，$\\overline{Y_4}=1$ → $F=1$ ✓。与 SSI 式 $\\overline{A}+B+C=1+0+0=1$ 一致。"
  },
  {
    "id": "Q019",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI边界变式",
    "sourceNote": "结合 Day1 竞争冒险基础，针对“MSI 实现中逻辑可化简但物理冒险仍存在”的边界情形自编",
    "knowledgePoints": [
      "74HC138",
      "竞争冒险",
      "选通脉冲",
      "传输延迟"
    ],
    "examMethods": [
      "MSI 电路的毛刺判定",
      "逻辑化简与物理冒险的区别",
      "毛刺抑制措施"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n某电路用一片 74HC138（$G_1=1$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$）实现\n$$F(A,B,C)=\\sum m(2,6)$$\n接线为 $F=\\overline{\\overline{Y_2}\\cdot\\overline{Y_6}}$（二输入与非门）。\n\n【作答要求】\n(1) 化简该函数，指出它在逻辑上等价于什么；\n(2) 既然逻辑上可以化简，为什么该电路在 $A$ 变化时仍可能出现毛刺？给出毛刺的极性与宽度来源；\n(3) 画出 $A$ 由 0 变 1（$B=1,C=0$）时的关键波形（可用文字描述各信号跳变次序）；\n(4) 给出三种抑制措施，并指出哪一种最适合本题（不增加器件）。",
    "answer": "【标准答案】\n(1) 逻辑化简：\n$$F=m_2+m_6=A\\overline{B}C+AB\\overline{C}=B\\overline{C}$$\n即 $F$ 与 $A$ 无关，逻辑上等价于 $B\\overline{C}$。\n\n(2) 仍出现毛刺的原因：\nMSI 实现中，$m_2$ 与 $m_6$ 由 138 的**两个不同输出** $\\overline{Y_2}$、$\\overline{Y_6}$ 提供，最后经与非门合并。虽然代数上 $m_2+m_6=B\\overline{C}$ 可以合并成一个与项，但硬件中并不存在这个“公共与项”，两个输出各自独立翻转。\n当 $B=1,C=0$ 且 $A$ 由 $0\\to1$ 时：\n$\\overline{Y_2}$ 由 $0\\to1$（释放），$\\overline{Y_6}$ 由 $1\\to0$（选中），两个信号经 138 内部不同路径传输，翻转时刻存在偏差。若 $\\overline{Y_2}$ 先升到 1 而 $\\overline{Y_6}$ 尚未降到 0，则与非门两输入同时为 1，输出瞬时为 0 → 产生**负向毛刺**（稳态应为 1）。\n毛刺宽度由 138 内部两级门延迟之差与外部与非门延迟决定，量级为纳秒。\n\n(3) 波形描述（$B=1,C=0$，$A:0\\to1$）：\n```\nA        ‾‾‾‾‾‾‾‾‾‾  (0→1)\nY2'      ‾‾‾‾‾‾‾‾‾‾  (0→1，有 t_pd1)\nY6'      ‾‾‾‾________  (1→0，滞后 t_pd2)\nF        ‾‾‾‾┐┌‾‾‾‾‾‾  (在 t_pd1~t_pd2 之间出现负毛刺)\n```\n（$t_{pd2}>t_{pd1}$ 时毛刺出现在 $\\overline{Y_6}$ 尚未翻转的窗口内。）\n\n(4) 抑制措施：\n① **加选通脉冲**：把 $G_1$ 接选通信号，等地址稳定后再使能译码器；\n② **输出加滤波电容**：在 $F$ 端并联几十~几百 pF 电容吸收窄脉冲（简单但会增加延迟）；\n③ **加锁存/触发**：在 $F$ 后接 D 触发器，在稳定时刻采样（需时序配合）；\n④ **改用共享与项的 SSI 实现**：直接实现 $B\\overline{C}$，从根本上消除相切路径。\n最适合本题且不增加器件的是 ①：138 本身有 $G_1$ 使能端，只需把 $G_1$ 由固定接 1 改为接选通脉冲，不增加任何器件。",
    "explanation": "【详细推导与解析】\n1. 这是 Day1“竞争冒险”知识在 MSI 层面的延伸：Day1 的判据是“表达式能化成 $A+\\overline A$ 或 $A\\overline A$”，而 MSI 电路的冒险来自“**同一函数被拆到多个物理节点实现**”，逻辑化简并不能消除物理路径差异。\n2. 命题人常在这里设置“逻辑上已化简，所以没有冒险”的认知陷阱。正确结论是：**逻辑等价 ≠ 物理无冒险**。\n3. 本题的 $m_2,m_6$ 在卡诺图中相邻（只差 $A$），但由两个独立输出提供，等价于“相切的两个卡诺圈未被同一圈覆盖”——这正是静态冒险的几何判据在器件层面的再现。\n4. 三种措施的取舍：选通最“干净”（不改变逻辑、不增加器件）；滤波电容会牺牲速度；锁存需要额外的时钟配合（属 Day3 内容）。",
    "scoringPoints": [
      "第一问：化简得 $B\\overline{C}$ 并指出与 $A$ 无关 (2分)",
      "第二问：指出两个输出独立翻转、存在传输延迟差 (4分)",
      "第三问：波形阶次正确、毛刺极性为负 (2分)",
      "第四问：给出三种措施并选出“选通”为最优 (4分)"
    ],
    "commonMistakes": [
      "认为“逻辑已化简为 $B\\overline{C}$，所以不可能有毛刺”",
      "把毛刺判为正向（误以为两输入同时为 0 时与非门输出 1）",
      "提出“增加冗余项”却无法说明在 138 方案中冗余项加在哪里"
    ],
    "verification": "取 $A=0\\to1$ 的极限情形：若两输出同时为 1 则 $F=0$，而稳态 $F=B\\overline{C}=1$，故毛刺必为负向 ✓；静态测量（万用表/示波器平均）仍读到 1，说明毛刺只在动态切换瞬间出现。"
  },
  {
    "id": "Q020",
    "section": "必做区",
    "difficulty": "综合",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“同一函数多方案实现与选型”这一工程判断类考法自编",
    "knowledgePoints": [
      "MSI 选型",
      "SSI 对照",
      "门数与引脚数",
      "方案权衡"
    ],
    "examMethods": [
      "同一函数多方案实现",
      "门数/引脚/延迟对比",
      "工程选型论证"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n要求实现三变量函数\n$$F(A,B,C)=\\sum m(0,1,3,5,7)$$\n现有三种可选方案：① 用 SSI 与非门；② 用一片 74HC138 + 与非门；③ 用一片 74HC151。\n\n【作答要求】\n(1) 化简 $F$，给出 SSI 方案的最简式与门数；\n(2) 给出 138 方案的数据（选中的输出编号、门类型与输入数）；\n(3) 给出 151 方案的数据端配置；\n(4) 列表比较三种方案在“外围门数、芯片数、引脚占用、修改灵活性、延迟”五个方面的差异，并给出选型建议（说明适用场景）。",
    "answer": "【标准答案】\n(1) $F$ 的化简：\n$F$ 的 1 覆盖 $m_0,m_1,m_3,m_5,m_7$。其中 $m_1,m_3,m_5,m_7$ 构成“$C=1$ 的 4 格圈” → $C$；$m_0$ 孤立（$m_2$ 处为 0，不能与 $m_0$ 合并），只能单独成项 → $\\overline{A}\\,\\overline{B}\\,\\overline{C}$。\n$$F=C+\\overline{A}\\,\\overline{B}\\,\\overline{C}$$\n注意：此处**不能**把 $\\overline{A}\\,\\overline{B}\\,\\overline{C}$ 吸收成 $\\overline{A}\\,\\overline{B}$ —— 那会额外把 $m_2$（$010$，函数值为 0）也圈进来，属典型“过度化简”。\nSSI 实现：若 $\\overline{A},\\overline{B},\\overline{C}$ 需自行产生，则 3 个反相器 + 1 个三输入与非门（搭成与项）+ 1 个与非门（作非）+ 1 个或门，**约 5~6 个门**；即使反变量可用，至少也需 1 个三输入与门 + 1 个或门。\n\n(2) 138 方案：\n选中输出 $\\overline{Y_0},\\overline{Y_1},\\overline{Y_3},\\overline{Y_5},\\overline{Y_7}$ 共 5 个 → 需 1 个五输入与非门（器件受限，可用 4 输入 + 2 输入组合）；\n更优做法：按 0 的集合（仅 $m_2,m_4,m_6$ 三个）实现\n$$F=\\overline{\\overline{Y_2}\\cdot\\overline{Y_4}\\cdot\\overline{Y_6}}\\ \\text{再取反}$$\n即 1 个三输入与非门 + 1 个反相器 = **2 个门**。\n\n(3) 151 方案：\n地址 $A_2=A,A_1=B,A_0=C$，数据端\n$$D_0=1,D_1=1,D_2=0,D_3=1,D_4=0,D_5=1,D_6=0,D_7=1$$\n**外围门数 0**。\n\n(4) 对比表：\n| 指标 | SSI 与非门 | 74HC138 方案 | 74HC151 方案 |\n| :---: | :---: | :---: | :---: |\n| 外围门数 | 5~6 | 2 | 0 |\n| 芯片数 | 2~3 片（7400/7404） | 2 片（138+门） | 1 片 |\n| 引脚占用 | 少 | 中（8 输出 + 3 地址 + 3 使能） | 中（8 数据端全部要接） |\n| 修改灵活性 | 改函数需重画 | 中（改门输入即可） | 高（只改数据端接 0/1） |\n| 延迟 | 2~3 级门 | 1 级译码 + 1~2 级门 | 1 级（片内） |\n| 适用场景 | 函数固定、批量小 | 多输出、需同时产生多个函数 | 快速验证、需频繁改函数 |\n\n选型建议：\n- 若只需一个函数且追求最少外围器件 → **151**（0 门、1 片、延迟最低）；\n- 若需同时产生多个函数（共享译码结果）→ **138**（一次译码多处使用）；\n- 若函数极简单（1~2 个与项）或需最低成本 → **SSI**，避免为简单函数占用整片 MSI。",
    "explanation": "【详细推导与解析】\n1. 本题的核心不是“能不能实现”，而是“**为什么这样选**”。821 的综合设计题常以“方案比较”收尾，要求给出量化指标而不是主观评价。\n2. 化简的边界在于：$C$ 覆盖了 $m_1,m_3,m_5,m_7$，剩下的 $m_0$ 只能与 $m_1$ 合并不成立（$m_2$ 为 0 挡住了 $\\overline{A}\\,\\overline{B}$ 这个 2 格圈），因此 $m_0$ 必须单独写成三变量乘积项 $\\overline{A}\\,\\overline{B}\\,\\overline{C}$。误用吸收律写成 $\\overline{A}\\,\\overline{B}$ 会把 $m_2$ 一并圈入，是最典型的过度化简。\n3. 138 方案的“按 0 集合实现”是上一题（Q018）技巧的复用：$F$ 的 0 只有 3 个，比 1 的 5 个少，取反后门数更少。\n4. 151 方案的“0 门”结论并不奇怪：151 的每个数据端就是一个“存储位”，把真值表直接“烧”进接线即可，本质是用芯片面积换门电路。",
    "scoringPoints": [
      "第一问：化简为 $C+\\overline{A}\\,\\overline{B}\\,\\overline{C}$（不得吸收为 $\\overline{A}\\,\\overline{B}$），并如实统计 SSI 方案门数 (3分)",
      "第二问：138 方案按 0 集合实现、2 个门 (3分)",
      "第三问：151 数据端 8 项全对 (3分)",
      "第四问：五项对比 + 有依据的选型建议 (4分)"
    ],
    "commonMistakes": [
      "把 $\\overline{A}\\,\\overline{B}\\,\\overline{C}$ 过度吸收成 $\\overline{A}\\,\\overline{B}$，导致 $m_2$ 被误圈",
      "138 方案按 1 的集合实现却只画 4 输入与非门（漏掉一路）",
      "选型建议写成“三种都可以”，未给出适用条件"
    ],
    "verification": "取 $m_0(000)$：$C+\\overline{A}\\,\\overline{B}\\,\\overline{C}=0+1=1$ ✓；取 $m_1(001)$：$1+0=1$ ✓；取 $m_2(010)$：$0+0=0$ ✓（关键点，验证未过度化简）；取 $m_7(111)$：$1+0=1$ ✓。四点覆盖“仅第三项为 1 / 仅 C 为 1 / 两者皆 0”三类情形。"
  },
  {
    "id": "Q021",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“151 级联扩展为 16 选 1”的高分考法自编",
    "knowledgePoints": [
      "74HC151",
      "级联扩展",
      "片选",
      "输出合并"
    ],
    "examMethods": [
      "两片 151 扩展为 16 选 1",
      "使能端作片选",
      "输出合并的门选择"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n用两片 74HC151 扩展为 **16 选 1 数据选择器**：数据输入 $D_0\\sim D_{15}$，地址 $A_3A_2A_1A_0$，输出 $Y$。\n\n【作答要求】\n(1) 说明两片的分工与使能端接法；\n(2) 给出输出合并方案，说明为什么可以用或门，并写出表达式；\n(3) 若要求同时提供反相输出 $\\overline{Y}$，应如何取得？说明所用门；\n(4) 有同学提出“把两片 Y 端直接相连实现线与”，判断是否可行并说明理由；\n(5) 若地址只有 $A_2A_1A_0$ 三位可用，该扩展方案是否仍然成立？",
    "answer": "【标准答案】\n(1) 分工与使能：\n片 1 负责 $D_0\\sim D_7$（低 8 路），片 2 负责 $D_8\\sim D_{15}$（高 8 路）；两片地址端均接 $A_2A_1A_0$。\n用最高位 $A_3$ 作片选：片 1 的 $\\overline{E_1}=A_3$（$A_3=0$ 时使能），片 2 的 $\\overline{E_2}=\\overline{A_3}$（$A_3=1$ 时使能，需 1 个反相器）。\n\n(2) 输出合并：\n74HC151 被禁止时输出 $Y=0$（不是高阻），因此两片输出可以直接送入**二输入或门**：\n$$Y=Y_1+Y_2$$\n因为未被选中的那一片恒为 0，对或门无贡献；被选中的那一片输出即所需数据。\n\n(3) 反相输出：\n方法一：在 $Y$ 后加 1 个反相器 → $\\overline{Y}$；\n方法二：用两片的 $\\overline{Y}$ 端（$W_1,W_2$）经**二输入与门**合并：未被选中片 $W=1$，故 $\\overline{Y}=W_1\\cdot W_2$。\n方法二省一个反相器，但需要与门，门数相同；若库中只有与非门，可用“与非 + 反相”实现与门。\n\n(4) 不可行。\n两片均为普通 CMOS 推挽输出，未选中片输出 0（低阻），选中片输出可能为 1（低阻），直接相连会形成 $V_{CC}\\to GND$ 低阻通路，产生大电流并可能损坏器件，同时输出电平不确定。只有 OC/OD 或三态输出才允许线与。\n\n(5) 不成立。\n16 选 1 必须有 4 位地址（$2^4=16$）；若只有 3 位地址，最多区分 8 个通道，第 4 位必须由外部提供（如另一路控制信号、计数器的进位、或片选信号）。若强行用 3 位地址，则两片会同时被选中同一通道，输出在或门处“1 与 0 相或”，无法区分高低组。",
    "explanation": "【详细推导与解析】\n1. 扩展的本质是“**地址高位做片选，低位做片内地址**”：$A_3$ 决定用哪片，$A_2A_1A_0$ 决定片内通道。\n2. 合并门的选择取决于“禁止时的输出电平”：\n   - 151 禁止时 $Y=0$ → 用**或门**；\n   - 若某器件禁止时输出为 1 → 用**与门**。\n   这是“输出合并”题的通用判据，比死记“或门”更可靠。\n3. 第 (3) 问的两种取反方式体现“用器件自带反相端省门”的思路（与 Q005 第 (3) 问同源）。\n4. 第 (5) 问考察“地址位数的物理含义”：$n$ 位地址最多 $2^n$ 个通道，这是硬件约束，不能靠接线绕过。",
    "scoringPoints": [
      "第一问：分工与 $A_3$ 片选（含反相器）正确 (4分)",
      "第二问：或门合并并说明“禁止时输出 0” (3分)",
      "第三问：给出两种取反方式之一且正确 (2分)",
      "第四问：指出推挽输出不能线与及电气后果 (2分)",
      "第五问：指出地址位不足、需外部提供第 4 位 (2分)"
    ],
    "commonMistakes": [
      "用与门合并两片输出（未选中片输出 0，与门结果恒 0）",
      "把 $A_3$ 接到两片的 $\\overline{E}$ 而未加反相，导致两片同时使能",
      "认为“151 有 8 个数据端，两片就是 16 个，地址随便接 3 位即可”"
    ],
    "verification": "取 $D_{11}$、地址 $1011$：$A_3=1$ → 片 2 使能、片 1 禁止（$Y_1=0$）；片 2 片内地址 $011$ → 选中 $D_3$（即 $D_{11}$）→ $Y_2=D_{11}$ → $Y=D_{11}$ ✓。"
  },
  {
    "id": "Q022",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“译码器检测非法码”与“加法器修正”两项考法自编的跨器件设计题",
    "knowledgePoints": [
      "74HC138",
      "74HC283",
      "非法码检测",
      "BCD 修正"
    ],
    "examMethods": [
      "用译码器检测非法码",
      "检测信号与修正通路联动",
      "多位 BCD 加法系统设计"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n设计一个“带非法码检测的 1 位 BCD 加法器”：输入 $A_3\\sim A_0$、$B_3\\sim B_0$ 为两个 8421BCD 数，要求\n① 输出 BCD 和 $D_3\\sim D_0$ 与十进制进位 $C$；\n② 当任一输入为非法码（$1010\\sim1111$）时，输出错误标志 $E=1$ 并强制 $D=0000$、$C=0$。\n可用器件：74HC283 两片、74HC138 一片、与非门/或门若干。\n\n【作答要求】\n(1) 说明如何用一片 74HC138 检测 4 位 BCD 码中的非法码，写出接线与检测表达式；\n(2) 给出加法与修正通路的连接（含修正判别式）；\n(3) 写出错误标志 $E$ 与输出屏蔽逻辑；\n(4) 验证：$A=1001$、$B=1000$ 时输出；$A=1011$、$B=0001$ 时输出。",
    "answer": "【标准答案】\n(1) 非法码检测：\n非法码为 $1010\\sim1111$，其共同特征是 $A_3=1$ 且低 3 位为 $010\\sim111$。\n接线：138 的 $G_1=A_3$（高有效，只有 $A_3=1$ 时才工作），$\\overline{G_{2A}}=\\overline{G_{2B}}=0$，地址 $A_2A_1A_0$ 接低 3 位。\n则 $A_3=1$ 时被选中的输出为 $\\overline{Y_2}\\sim\\overline{Y_7}$（对应低 3 位 $010\\sim111$），故\n$$E_A=\\overline{\\overline{Y_2}\\cdot\\overline{Y_3}\\cdot\\overline{Y_4}\\cdot\\overline{Y_5}\\cdot\\overline{Y_6}\\cdot\\overline{Y_7}}$$\n（6 输入与非门；$A_3=0$ 时 138 被禁止，全部输出为 1，$E_A=0$，正好表示“合法”。）\n对 $B$ 端同理，用第二片 138 得 $E_B$（或分时复用一片，需外加地址选择）。\n\n(2) 加法与修正通路：\n第一片 283：$A$ 端接 $A_3\\sim A_0$，$B$ 端接 $B_3\\sim B_0$，$C_0=0$，得 $S_3\\sim S_0$、$C_4$。\n修正判别：\n$$M=C_4+S_3S_2+S_3S_1$$\n第二片 283：$A$ 端接 $S_3\\sim S_0$，$B$ 端接 $0\\,M\\,M\\,0$，$C_0=0$，得修正结果 $S_3'\\sim S_0'$ 与 $C_4'$。\n进位：$C=C_4+C_4'$（或门）。\n\n(3) 错误标志与屏蔽：\n$$E=E_A+E_B$$\n屏蔽：$D_i=S_i'\\cdot\\overline{E}$（4 个二输入与门），$C_{out}=C\\cdot\\overline{E}$。\n即检测到非法输入时，强制 $D=0000$、$C=0$，并置 $E=1$ 供系统报警。\n\n(4) 验证：\n$A=1001(9)$、$B=1000(8)$：两者均合法（$A_3=1$ 但低 3 位为 001/000，$\\overline{Y_0}/\\overline{Y_1}$ 被选中，$E_A=E_B=0$）；和 $=1\\,0001$ → $C_4=1,S=0001$；$M=C_4+0=1$；修正 $0001+0110=0111$，$C_4'=0$ → $C=1,D=0111$ → 十进制 17 ✓。\n$A=1011$、$B=0001$：$A$ 的低 3 位为 $011$ → 138 选中 $\\overline{Y_3}$ → $E_A=1$ → $E=1$ → $D=0000$、$C=0$，输出错误标志，与设计要求一致 ✓（$1011$ 是非法 BCD 码）。",
    "explanation": "【详细推导与解析】\n1. 用 138 检测“区间非法码”的关键是：把“区间的高位条件”接到使能端，把“区间的低位范围”交给地址端。本题高位条件是 $A_3=1$（用 $G_1$ 高有效），低 3 位范围是 $010\\sim111$（正好是 $Y_2\\sim Y_7$）。\n2. 若把 $A_3$ 接到 $\\overline{G_{2A}}$，则 $A_3=1$ 时芯片被禁止，检测逻辑完全反了 —— 这是本题最容易错的一步。\n3. 屏蔽用“与门”而不是“或门”：因为要“强制为 0”，与 0 相与必得 0；若要“强制为 1”则用或门与 1 相或。\n4. 第 (4) 问的两个例子分别覆盖“合法 + 需修正”与“非法 + 屏蔽”两条路径，是自检设计是否完整的最小测试集。",
    "scoringPoints": [
      "第一问：$G_1=A_3$ 接法与 6 输入与非门表达式正确 (5分)",
      "第二问：两片 283 连接与 $M$ 判别式正确 (4分)",
      "第三问：$E=E_A+E_B$ 与四个与门屏蔽逻辑正确 (3分)",
      "第四问：两组验证过程与结果正确 (3分)"
    ],
    "commonMistakes": [
      "把 $A_3$ 接 $\\overline{G_{2A}}$，导致合法码被判为非法",
      "屏蔽用或门（$D_i=S_i+E$），非法时反而输出全 1",
      "漏掉 $B$ 端的非法检测，只检测 $A$"
    ],
    "verification": "取合法边界 $A=1001$、$B=0000$：$E=0$，和 $1001$ → $M=0$ → $D=1001$、$C=0$ → 9 ✓；取非法最小码 $A=1010$：低 3 位 $010$ → $\\overline{Y_2}$ 选中 → $E_A=1$ → 屏蔽生效 ✓。两端边界行为正确。"
  },
  {
    "id": "Q023",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“两片 85 + 两片 283 构成 8 位算术比较通路”的跨器件综合考法自编",
    "knowledgePoints": [
      "74HC85",
      "74HC283",
      "8 位级联",
      "补码与借位"
    ],
    "examMethods": [
      "8 位比较器级联",
      "8 位减法器级联",
      "关系判定与差值一致性验证"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n用两片 74HC85 与两片 74HC283 构成 8 位数据通路：输入 $A_7\\sim A_0$、$B_7\\sim B_0$，输出\n① 比较结果 $G$（$A>B$）、$L$（$A<B$）、$Q$（$A=B$）；\n② 差值 $S_7\\sim S_0$ 与借位标志 $B_{ow}$。\n\n【作答要求】\n(1) 给出两片 85 的级联连接（含级联输入设置）与输出命名；\n(2) 给出两片 283 的级联连接（实现 $A-B$），说明 $B$ 端与 $C_0$ 的设置；\n(3) 说明 $B_{ow}$ 与 283 的 $C_8$ 的关系，并与 $L$ 做一致性核对；\n(4) 以 $A=1011\\,0110$、$B=1011\\,1001$ 为例，写出各片输出、$S$、$B_{ow}$ 与最终结论；\n(5) 若把两片 85 的级联顺序接反（高位片输出接低位片级联输入），会出现什么错误？举一例说明。",
    "answer": "【标准答案】\n(1) 比较器连接：\n低 4 位片（$A_3\\sim A_0$、$B_3\\sim B_0$）级联输入接 $(I_{A>B},I_{A=B},I_{A<B})=(0,1,0)$；其输出接高 4 位片（$A_7\\sim A_4$）的级联输入；高 4 位片的三个输出即整体结果：\n$$G=O_{A>B},\\quad Q=O_{A=B},\\quad L=O_{A<B}$$\n\n(2) 减法器连接：\n低 4 位片：$A$ 接 $A_3\\sim A_0$，$B$ 接 $\\overline{B_3}\\sim\\overline{B_0}$，$C_0=1$；\n高 4 位片：$A$ 接 $A_7\\sim A_4$，$B$ 接 $\\overline{B_7}\\sim\\overline{B_4}$，$C_0=$ 低片的 $C_4$；\n高位片的 $C_4$ 即 $C_8$，输出 $S_7\\sim S_0$ 为 8 位补码差值。\n\n(3) 借位关系：\n$$B_{ow}=\\overline{C_8}$$\n$C_8=1$ 表示 $A\\ge B$（无借位），$C_8=0$ 表示 $A<B$（有借位）。\n一致性：$B_{ow}=1\\Leftrightarrow C_8=0\\Leftrightarrow A<B\\Leftrightarrow L=1$，故 $B_{ow}$ 与 $L$ 必须始终相同；若不同，说明级联或取反有误。\n\n(4) 计算：\n高 4 位：$1011$ 与 $1011$ → 相等，高位片输出跟随级联输入；\n低 4 位：$0110(6)$ 与 $1001(9)$ → $6<9$ → 低片 $O_{A<B}=1$；\n故整体 $L=1$、$G=0$、$Q=0$ → $A<B$（$182<185$ ✓）。\n减法：$\\overline{B}=0100\\,0110$；低片：$0110+0110+1=1101$，$C_4=0$；高片：$1011+0100+0=1111$，$C_8=0$；\n$S=1111\\,1101$（补码 $-3$），$B_{ow}=\\overline{0}=1$。\n核对：$182-185=-3$ ✓，$B_{ow}=1$ 与 $L=1$ 一致 ✓。\n\n(5) 接反的后果：\n级联方向反了会使“低位优先”，即高 4 位不相等时仍被低 4 位结果覆盖。\n例：$A=1000\\,0000$、$B=0111\\,1111$（$A=128>B=127$）。正确结果 $G=1$；接反后高位片的级联输入被低位片结果驱动（低位 $0000<1111$ → $L=1$），高位片在自身 $A>B$ 时本应输出 $G=1$，但若片内逻辑按“级联优先”处理，输出会变成 $L=1$，与真实大小关系相反。",
    "explanation": "【详细推导与解析】\n1. 8 位通路的“两条链”必须分别记清：**比较链（85 级联）与进位链（283 级联）方向一致，都是低位→高位**。两条链任一接反都会导致结果错误，且错误往往“看起来合理”。\n2. $C_8$ 与借位互反，是 283 做减法的固定结论，必须能与 85 的 $L$ 输出对齐核对；这种“两器件互相验证”的思路在 821 综合题中很受青睐。\n3. 第 (4) 问的 $S=11111101$ 是补码，答题时要注明“补码表示 $-3$”，否则易被判为数值错误。\n4. 第 (5) 问是“故障分析”型，考的是对级联语义的理解：级联输入只在“本位相等”时才起作用，接反等于把“低位优先”强加给高位。",
    "scoringPoints": [
      "第一问：低片 (0,1,0)、低片输出接高片级联输入 (3分)",
      "第二问：两片 283 的 $B$ 取反、$C_0=1$、进位串联正确 (4分)",
      "第三问：$B_{ow}=\\overline{C_8}$ 且与 $L$ 一致性说明 (2分)",
      "第四问：各片输出、$S$ 的补码解释、结论均正确 (4分)",
      "第五问：指出“低位优先”错误并举反例 (2分)"
    ],
    "commonMistakes": [
      "两片 283 的高位片 $C_0$ 接 0 而不用低位片进位，导致差值少算进位",
      "$B$ 端忘记取反或 $C_0$ 忘记置 1，得到 $A+B$ 而非 $A-B$",
      "把 $S=11111101$ 直接读成 253"
    ],
    "verification": "用 $A=B=0000\\,0110$ 检验：比较得 $Q=1$；减法 $00000110+11111001+1=1\\,0000\\,0000$ → $S=0000\\,0000$、$C_8=1$ → $B_{ow}=0$，与 $L=0$ 一致 ✓。"
  },
  {
    "id": "Q024",
    "section": "拓展区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI标准变式",
    "sourceNote": "对应考纲 d 条目“常用组合逻辑器件”中的 BCD-十进制译码器与显示译码器（网课：姬清影 P42、P43）",
    "knowledgePoints": [
      "74HC42",
      "7448",
      "显示译码",
      "灭零控制"
    ],
    "examMethods": [
      "BCD-十进制译码器功能分析",
      "七段显示译码器控制端分析",
      "非法码与灭零处理"
    ],
    "tag": "【防偏门】",
    "question": "【题目描述】\n某仪表用 74HC42（BCD-十进制译码器，输出 $\\overline{Y_0}\\sim\\overline{Y_9}$ 低有效）驱动 10 只指示灯，用 7448（BCD-七段译码/驱动器，共阴数码管，输出 $a\\sim g$ 高有效）驱动数码管显示同一位 BCD 数。输入为 $D_3D_2D_1D_0$。\n\n【作答要求】\n(1) 说明 74HC42 的功能与“输入为非法码”时的输出行为；\n(2) 说明 7448 的 $\\overline{LT}$、$\\overline{RBI}$、$\\overline{BI}/\\overline{RBO}$ 三个控制端的作用；\n(3) 当输入 $D_3D_2D_1D_0=1101$ 时，写出 42 与 7448 的输出状态；\n(4) 说明多位显示中“灭零”功能的实现方式与作用，并解释为什么最高位与最低位的接法不同；\n(5) 若发现数码管显示“8”但指示灯无一位点亮，判断故障范围。",
    "answer": "【标准答案】\n(1) 74HC42 的功能：\n把 4 位 BCD 码译成 10 个十进制输出，被选中输出为低电平 0，其余为高电平 1。\n当输入为非法码（$1010\\sim1111$）时，**10 个输出全部为 1**（无任何输出被选中），即“不点亮任何指示灯”。\n\n(2) 7448 控制端：\n$\\overline{LT}$（试灯，低有效）：$\\overline{LT}=0$ 时无视输入，七段全亮，用于检查数码管是否损坏；\n$\\overline{RBI}$（灭零输入，低有效）：当本位输入为 $0000$ 且 $\\overline{RBI}=0$ 时，本位熄灭（不显示 0），用于消除高位无意义的零；\n$\\overline{BI}/\\overline{RBO}$（灭灯输入/灭零输出）：作输入时 $\\overline{BI}=0$ 强制全灭（可用于亮度调制）；作输出时 $\\overline{RBO}=0$ 表示“本位为 0 且已被灭零”，可传给下一位的 $\\overline{RBI}$。\n\n(3) 输入 $1101$（非法码）：\n74HC42：$\\overline{Y_0}\\sim\\overline{Y_9}$ 全部为 1（无指示灯点亮）；\n7448：输出 $a\\sim g$ 全部为低电平（全灭，数码管不显示任何字符）。\n\n(4) 灭零功能：\n多位显示时，把高位的 $\\overline{RBO}$ 依次接到相邻低位的 $\\overline{RBI}$，最低位的 $\\overline{RBI}$ 接 1（不灭零）。\n作用：消除整数前导零（如 $0012$ 显示为 $12$）与小数末尾零，使读数符合习惯。\n最高位与最低位接法不同的原因：最高位没有“更高位”来判断自己是否属于前导零，故其 $\\overline{RBI}$ 通常接 0（允许灭零）或由系统控制；最低位必须显示 0（如 $1.0$ 的末位），故 $\\overline{RBI}$ 接 1 强制保留。\n严格地说：整数部分最高位 $\\overline{RBI}$ 接 0（允许灭前导零），最低位（个位）$\\overline{RBI}$ 接 1（必须显示）。\n\n(5) 故障判断：\n数码管显示“8”说明 7448 的输出 $a\\sim g$ 全为高（可能是输入非法码全灭的反面，或试灯端被拉低），而指示灯全灭说明 42 的 10 个输出全为 1（无选中）。\n两者同时出现的共同原因是**输入为非法码**（如 $1101$）——此时 42 全部输出 1、7448 全灭；但显示“8”与“全灭”矛盾，故应重点检查：\n① 7448 的 $\\overline{LT}$ 是否被误拉低（试灯状态，全亮显示 8）；\n② 42 与 7448 的输入是否连接到同一组信号（可能 42 输入悬空/接错），\n③ 42 的输入是否存在开路导致全 1。\n结论：优先检查两芯片输入是否同源，以及 $\\overline{LT}$ 电平。",
    "explanation": "【详细推导与解析】\n1. 42 与 138 的区别：138 是 3-8 线二进制译码（8 个输出），42 是 4-10 线 BCD 译码（10 个输出，只译合法 BCD 码）。二者都是低有效输出，但 42 对非法码“全 1”，这一行为常用于“非法码不响应”的场合。\n2. 7448 与 42 常配合使用：42 点亮“当前是第几位”的指示灯，7448 显示该位数值。二者输入同源，因此“一个正常一个异常”就是故障定位的线索。\n3. 灭零链的方向：**高位 $\\overline{RBO}$ → 低位 $\\overline{RBI}$**，方向与“前导零在高位”一致。接反会导致低位被灭、高位保留，显示结果错乱。\n4. 本题属“防偏门”但确在考纲“常用组合逻辑器件”范围内，且两套网课均有对应讲解（姬清影 P42 译码器 74HC42、P43 显示译码器 7448），属于“看一眼就会、不看就丢分”的题。",
    "scoringPoints": [
      "第一问：42 功能与非法码全 1 行为 (3分)",
      "第二问：三个控制端作用全对 (3分)",
      "第三问：两组输出状态正确 (2分)",
      "第四问：灭零链方向与高低位接法差异 (3分)",
      "第五问：给出有条理的故障排查方向 (2分)"
    ],
    "commonMistakes": [
      "认为 42 对非法码会“随机点亮一位”",
      "把灭零链方向接反（低位 RBO → 高位 RBI）",
      "把 7448 的输出当作低有效（共阴数码管为高有效驱动）"
    ],
    "verification": "取输入 $0000$：42 的 $\\overline{Y_0}=0$（0 号灯亮），7448 显示 “0”（$a\\sim f$ 亮、$g$ 灭）；取 $1001$：$\\overline{Y_9}=0$、显示 “9”。两点与功能表一致。"
  },
  {
    "id": "Q025",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "跨 148/138/151 三器件的综合系统设计（压轴题，对应 821 真题批注中“报警/表决类综合设计”题型思路）",
    "knowledgePoints": [
      "74HC148",
      "74HC138",
      "74HC151",
      "优先编码",
      "通道指示",
      "阈值选择"
    ],
    "examMethods": [
      "多器件系统级综合设计",
      "编码—译码—选择三级链路",
      "无输入状态处理"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n设计一个 **8 路传感器报警系统**：\n- 8 路传感器 $S_0\\sim S_7$ 输出低电平表示“该路报警”，$S_7$ 优先级最高；\n- 要求用 3 只 LED 数码指示“当前最高优先级报警通道号”（用 74HC138 的 8 个输出分别驱动 8 只指示灯，低电平点亮）；\n- 用 74HC151 按通道号选择该通道预置的“危险等级” $D_0\\sim D_7$（1 表示需要总报警），输出 $Y$ 驱动总报警器；\n- 无任何传感器报警时，指示灯全灭、总报警器不响。\n\n可用器件：74HC148、74HC138、74HC151 各一片，反相器与门若干。\n\n【作答要求】\n(1) 画出（或文字描述）三级链路的连接：148 → 138、148 → 151，说明每一级的地址/使能接法；\n(2) 说明“无报警时指示灯全灭”是如何实现的（给出关键接线）；\n(3) 写出总报警输出 $Y$ 的表达式，并说明其与“最高优先级通道”的关系；\n(4) 当 $S_5$ 与 $S_2$ 同时报警、且 $D_5=1$、$D_2=0$ 时，写出 148 输出、138 选中端、151 选中端与 $Y$；\n(5) 指出该设计的一个局限，并给出改进方向。",
    "answer": "【标准答案】\n(1) 三级链路：\n第一级（编码）：148 的 $\\overline{I_7}\\sim\\overline{I_0}$ 接 $S_7\\sim S_0$，$\\overline{EI}=0$；输出 $\\overline{A_2}\\overline{A_1}\\overline{A_0}$ 为通道号的**反码**，$\\overline{Y_{EX}}$ 为“有报警”标志（有报警时 $=0$）。\n第二级（指示）：用 3 个反相器把 $\\overline{A_2}\\overline{A_1}\\overline{A_0}$ 还原为高有效的 $A_2A_1A_0$，接 138 的地址端；138 的 $G_1=\\overline{\\overline{Y_{EX}}}$（即把“有报警”反相后作高有效使能），$\\overline{G_{2A}}=\\overline{G_{2B}}=0$。138 输出 $\\overline{Y_0}\\sim\\overline{Y_7}$ 经限流电阻接 8 只 LED（低电平点亮）。\n第三级（阈值选择）：同一个高有效 $A_2A_1A_0$ 接 151 的地址端，$D_0\\sim D_7$ 预置各通道危险等级，$\\overline{E}=0$，输出 $Y$ 为总报警。\n\n(2) 无报警时全灭的实现：\n关键在 $G_1=\\overline{\\overline{Y_{EX}}}$：无报警时 $\\overline{Y_{EX}}=1$ → $G_1=0$ → 138 被禁止 → 全部输出为 1 → 8 只 LED（低电平点亮）全部熄灭。\n同时 151 虽然仍被使能，但其地址无意义（148 输出 111 → 反相后 000），只会选中 $D_0$；为保证不误报，需把 $D_0$ 预置为 0，或把 $Y$ 与“有报警”信号相与：\n$$Y_{out}=Y\\cdot\\overline{\\overline{Y_{EX}}}$$\n\n(3) 总报警表达式：\n$$Y=\\sum_{i=0}^{7}m_iD_i$$\n其中 $m_i$ 为通道 $i$ 的编码（即最高优先级报警通道），$D_i$ 为该通道预置的危险等级。即 $Y$ 等于“当前最高优先级通道的危险等级”。\n\n(4) $S_5$、$S_2$ 同时报警：\n148 中 $\\overline{I_5}=0$（$S_5$ 优先级高），$\\overline{I_2}=0$ 被忽略 → 编码 5，输出反码 $\\overline{A_2}\\overline{A_1}\\overline{A_0}=010$，$\\overline{Y_{EX}}=0$。\n反相后 $A_2A_1A_0=101$ → 138 选中 $\\overline{Y_5}=0$ → 5 号指示灯亮（其余为 1，灭）。\n151 地址 $101$ → 选中 $D_5=1$ → $Y=1$ → 总报警响。\n（若 $D_5=0$ 而 $D_2=1$，总报警仍不响 —— 因为系统只按最高优先级通道判定，这是本设计的策略选择。）\n\n(5) 局限与改进：\n局限一：只按“最高优先级通道”判定危险等级，忽略了低优先级通道可能更危险的情形；\n局限二：无报警时 151 地址为 000，若 $D_0=1$ 会误报（必须靠 $Y\\cdot\\overline{\\overline{Y_{EX}}}$ 屏蔽）；\n局限三：8 路指示灯同时只亮 1 只，无法反映“多路同时报警”的规模。\n改进：用 8 个锁存器分别锁存各通道报警状态并驱动指示灯；总报警改为“各路危险等级的逻辑或”；或采用可编程逻辑器件（PLD）实现优先级可配置的判定表（注意：PLD 属考纲外内容，仅作工程视野了解）。",
    "explanation": "【详细推导与解析】\n1. 三级链路的信号流：**传感器 → 优先编码（谁最急）→ 译码指示（是哪一路）→ 数据选择（该路的等级）**。这是“编码—译码—选择”最典型的工程组合，也是 821 综合题常见的命题骨架。\n2. 关键接线只有两处容易错：\n   ① 148 输出是反码，必须反相后才能接 138/151 的地址端（否则指示灯与通道号错位）；\n   ② 138 的使能必须与“有报警”联动（$G_1=\\overline{\\overline{Y_{EX}}}$），否则无报警时会误点亮 0 号灯。\n3. 第 (4) 问同时考“优先级”和“阈值选择”两个概念，答题要点是把中间每一级的电平都写出来，而不是直接跳到结论。\n4. 第 (5) 问要求批判性思考，能指出“只看最高优先级”的策略缺陷即为高分点；注意不要引入考纲外的 PLD 作为主方案（本答案仅作为视野拓展提及）。",
    "scoringPoints": [
      "第一问：三级链路连接完整，148 反码反相、138 使能联动 (5分)",
      "第二问：$G_1=\\overline{\\overline{Y_{EX}}}$ 的关键接线 (3分)",
      "第三问：$Y=\\sum m_iD_i$ 且解释为“最高优先级通道的等级” (3分)",
      "第四问：逐级电平与最终 $Y=1$ 全部正确 (3分)",
      "第五问：指出实质局限并给出可行改进 (2分)"
    ],
    "commonMistakes": [
      "把 148 的反码输出直接接 138 地址，导致“$S_5$ 报警却点亮 2 号灯”",
      "138 的 $G_1$ 固定接 1，无报警时 0 号灯常亮",
      "151 的地址取自 148 的反码输出（未反相），选中错误通道"
    ],
    "verification": "$S_0$ 单独报警：148 输出 111（0 的反码），反相得 000 → 138 选中 $\\overline{Y_0}=0$ → 0 号灯亮；151 选中 $D_0$ → $Y=D_0$ ✓。$S_7$ 报警同理得 111 → 7 号灯亮、$Y=D_7$ ✓。两端通道均自洽。"
  }
];

// 3. 当日复测题目（3 道限时实战题）
window.REVIEW_QUESTIONS = [
  {
    "id": "R001",
    "difficulty": "综合",
    "type": "设计",
    "question": "【当日复测 1 · 138 扩展实现四变量函数（限时 12 分钟）】\n用两片 74HC138 及必要门电路实现\n$$F(A,B,C,D)=\\sum m(2,5,9,11,14,15)$$\n要求 $A$ 作片选。(1) 写出两片的使能接法；(2) 列出两片中被选中的输出编号；(3) 给出合并方案与最终表达式。",
    "answer": "【标准答案】\n(1) 片 0（$A=0$）：$G_1=\\overline{A}$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$；片 1（$A=1$）：$G_1=A$，$\\overline{G_{2A}}=\\overline{G_{2B}}=0$；两片地址均接 $A_2=B,A_1=C,A_0=D$。\n(2) 片内编号 = $BCD$ 的十进制值：\n$m_2\\to$ 片 0 的 $\\overline{Y_2}$；$m_5\\to$ 片 0 的 $\\overline{Y_5}$；\n$m_9\\to$ 片 1 的 $\\overline{Y_1}$；$m_{11}\\to$ 片 1 的 $\\overline{Y_3}$；$m_{14}\\to$ 片 1 的 $\\overline{Y_6}$；$m_{15}\\to$ 片 1 的 $\\overline{Y_7}$。\n(3) 合并：\n$$F_0=\\overline{\\overline{Y_2}\\cdot\\overline{Y_5}}\\ (\\text{二输入与非门}),\\qquad F_1=\\overline{\\overline{Y_1}\\cdot\\overline{Y_3}\\cdot\\overline{Y_6}\\cdot\\overline{Y_7}}\\ (\\text{四输入与非门})$$\n$$F=F_0+F_1\\ (\\text{二输入或门})$$\n未选中片输出全 1，故其与非门输出为 0，可安全用或门合并。",
    "explanation": "本题考查“用最高位做片选 + 片内 3 位编号重排”的完整流程。易错点是直接把最小项编号当片内编号（如把 $m_9$ 写成 $Y_9$）。",
    "scoringPoints": [
      "第一问：两片使能接法正确（含 $\\overline{A}$）(3分)",
      "第二问：6 个片内编号全部正确 (4分)",
      "第三问：两路与非 + 或门合并 (3分)"
    ],
    "commonMistakes": [
      "片内编号未减去 $8A$ 的偏移",
      "两路输出用与门合并导致恒为 0"
    ],
    "verification": "取 $m_{14}=1110$：片 1 工作、$BCD=110$ → $\\overline{Y_6}=0$ → $F_1=1$；片 0 禁止 → $F_0=0$ → $F=1$ ✓。"
  },
  {
    "id": "R002",
    "difficulty": "综合",
    "type": "设计",
    "question": "【当日复测 2 · 151 降维法（限时 12 分钟）】\n用一片 74HC151 实现\n$$F(A,B,C,D)=\\sum m(2,3,6,7,8,11,14,15)$$\n地址端接 $A_2=A,A_1=B,A_0=C$。(1) 列出 $D_0\\sim D_7$；(2) 写出 $F$ 的表达式并化简到最简与或式。",
    "answer": "【标准答案】\n(1) 按地址分组（每组两个最小项）：\n| 地址 $ABC$ | 最小项 | 集合情况 | $D_i$ |\n| :---: | :---: | :---: | :---: |\n| 000 | $m_0,m_1$ | 都不在 | $D_0=0$ |\n| 001 | $m_2,m_3$ | 都在 | $D_1=1$ |\n| 010 | $m_4,m_5$ | 都不在 | $D_2=0$ |\n| 011 | $m_6,m_7$ | 都在 | $D_3=1$ |\n| 100 | $m_8,m_9$ | 仅 $m_8$ | $D_4=\\overline{D}$ |\n| 101 | $m_{10},m_{11}$ | 仅 $m_{11}$ | $D_5=D$ |\n| 110 | $m_{12},m_{13}$ | 都不在 | $D_6=0$ |\n| 111 | $m_{14},m_{15}$ | 都在 | $D_7=1$ |\n\n(2) 表达式：\n$$F=\\overline{A}\\,\\overline{B}C+\\overline{A}BC+A\\overline{B}\\,\\overline{C}\\,\\overline{D}+A\\overline{B}CD+ABC$$\n化简：$\\overline{A}\\,\\overline{B}C+\\overline{A}BC=\\overline{A}C$；$ABC$ 与 $A\\overline{B}CD$ 合并：$ABC+A\\overline{B}CD=AC(B+\\overline{B}D)=AC(B+D)$。\n故\n$$F=\\overline{A}C+AC(B+D)+A\\overline{B}\\,\\overline{C}\\,\\overline{D}=\\overline{A}C+ABC+ACD+A\\overline{B}\\,\\overline{C}\\,\\overline{D}$$\n即 $F=\\overline{A}C+ABC+ACD+A\\overline{B}\\,\\overline{C}\\,\\overline{D}$。\n注意：$ABC$ **不能**吸收成 $AB$ —— 那样会把 $m_{12}(1100)$、$m_{13}(1101)$ 也圈进来（两者不在集合内），属过度化简。",
    "explanation": "本题的判定关键在 $D_4=\\overline{D}$ 与 $D_5=D$（同为“只有一个在集合内”，但极性相反）。化简时务必核对每一项覆盖的最小项，$ABC$ 与 $AB$ 只差 $m_{12},m_{13}$ 两项，极易误吸收。",
    "scoringPoints": [
      "第一问：8 个数据端全部正确（含 $D_4,D_5$ 极性）(6分)",
      "第二问：表达式正确、化简合理 (4分)"
    ],
    "commonMistakes": [
      "$D_4$ 与 $D_5$ 极性写反",
      "把 $ABC$ 误吸收成 $AB$，多覆盖 $m_{12},m_{13}$（函数值应为 0）"
    ],
    "verification": "取 $m_8=1000$：地址 100 → $D_4=\\overline{D}=1$ → $F=1$ ✓；取 $m_9=1001$：$D_4=\\overline{1}=0$ → $F=0$ ✓。"
  },
  {
    "id": "R003",
    "difficulty": "高难",
    "type": "综合",
    "question": "【当日复测 3 · BCD 加法与非法码（限时 16 分钟）】\n(1) 用两片 74HC283 构成 1 位 BCD 加法器，写出修正判别式；\n(2) 计算 $9+8$ 的 $D_3\\sim D_0$ 与进位 $C$；\n(3) 若输入为 $A=1100$、$B=0011$（$A$ 为非法 BCD 码），该加法器的输出是否可信？说明理由与处理办法。",
    "answer": "【标准答案】\n(1) 判别式：\n$$M=C_4+S_3S_2+S_3S_1$$\n第二片 283 的 $B$ 端接 $0\\,M\\,M\\,0$，实现 $M=1$ 时加 $0110$；$C=C_4+C_4'$。\n\n(2) $9+8$：\n$1001+1000=1\\,0001$ → $C_4=1$、$S=0001$；\n$M=C_4+0+0=1$ → 加 $0110$：$0001+0110=0111$，$C_4'=0$；\n故 $C=1$、$D_3\\sim D_0=0111$ → 十进制 $17$ ✓。\n\n(3) 不可信。\n理由：$A=1100$ 是非法 BCD 码（对应十进制 12 在 BCD 中不存在），第一片 283 仍会按二进制把它当作 12 参与运算，修正判别式只针对“和”的范围设计，无法识别“输入非法”，因此输出可能落在非法区间且进位含义错误。\n处理办法：在输入端增加非法码检测（用 74HC138 检测 $1010\\sim1111$，见 Q022），检测到非法时置错误标志并屏蔽输出（$D=S\\cdot\\overline{E}$、$C=C\\cdot\\overline{E}$）。",
    "explanation": "本题考查“加法 + 修正 + 非法输入”三层。第 (3) 问的关键认识是：BCD 加法器的修正逻辑只保证“合法输入得到合法输出”，不保证“非法输入被识别”。",
    "scoringPoints": [
      "第一问：判别式与 $0MM0$ 接法 (4分)",
      "第二问：$C=1$、$D=0111$ (3分)",
      "第三问：判断不可信 + 给出检测屏蔽方案 (3分)"
    ],
    "commonMistakes": [
      "漏掉进位，答“结果为 7”",
      "认为修正判别式也能检测非法输入"
    ],
    "verification": "用 $5+5=1010$ 检验：$C_4=0$、$S_3S_1=1$ → $M=1$ → $1010+0110=1\\,0000$ → $C=1$、$D=0000$ → 10 ✓。"
  }
];

// 4. 结构化知识重构卡片（12 张）
window.KNOWLEDGE_CARDS = [
  {
    "id": "KC001",
    "tag": "器件功能",
    "title": "卡片1：编码器分类与 74HC148 功能表",
    "summary": "编码是“给每个输入编一个二进制号”，优先编码器允许同时多个输入有效，只对优先级最高者编码。",
    "content": "<div class=\"card-article\">\n<h4>一、编码器的分类</h4>\n<ul>\n  <li><strong>普通编码器：</strong>任一时刻只允许一个输入有效，否则输出无定义（实际不可用）。</li>\n  <li><strong>优先编码器：</strong>允许多个输入同时有效，按事先规定的优先级只对最高优先级者编码（工程中真正使用的类型）。</li>\n</ul>\n<p>按输入线数分：8 线-3 线（74HC148）、10 线-4 线（74HC147）。</p>\n\n<h4>二、74HC148 的三行核心功能表</h4>\n<table class=\"data-table\">\n  <thead><tr><th>$\\overline{EI}$</th><th>有效输入</th><th>$\\overline{A_2}\\overline{A_1}\\overline{A_0}$</th><th>$\\overline{EO}$</th><th>$\\overline{Y_{EX}}$</th></tr></thead>\n  <tbody>\n    <tr><td>1</td><td>任意</td><td>111</td><td>1</td><td>1</td></tr>\n    <tr><td>0</td><td>有（取最高优先级）</td><td>编码值的<strong>反码</strong></td><td>1</td><td>0</td></tr>\n    <tr><td>0</td><td>无（全 1）</td><td>111</td><td>0</td><td>1</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 两层反相，必须分开处理：</strong>\n  <br>① 输入层：<strong>0 表示有请求</strong>（低有效）；\n  <br>② 输出层：输出是<strong>编码值的反码</strong>。\n  <br>例：$\\overline{I_5}=0$ → 编码 5 = 101 → 输出 $010$。两层反相相互独立，不可“抵消”。\n</div>\n\n<div class=\"callout callout-info\">\n  <strong>💡 三个控制端的分工（速记）：</strong>\n  <br>$\\overline{EI}$：我能不能工作；$\\overline{EO}$：我这儿<strong>没人</strong>（去使能低位片）；$\\overline{Y_{EX}}$：我这儿<strong>有人</strong>（数据有效标志）。\n</div>\n</div>",
    "keyPoints": [
      "输入 0 有效、输出为反码，两层反相互不抵消",
      "EO 表示“本片无输入”，YEX 表示“本片有输入”",
      "输出 111 只对应“无输入/被禁止”，不等于编码 7"
    ],
    "pitfalls": [
      "把 I5 的编码写成 101（漏掉输出反码）",
      "把 EO 与 YEX 极性记反，级联时高低组顺序接反"
    ]
  },
  {
    "id": "KC002",
    "tag": "级联扩展",
    "title": "卡片2：编码器级联扩展为 16 线-4 线",
    "summary": "级联的唯一判据是“高优先级片的 EO 去使能低优先级片”，输出合并必须用与非门而不是线与。",
    "content": "<div class=\"card-article\">\n<h4>一、连线三步</h4>\n<ol>\n  <li><strong>分组：</strong>高组 $\\overline{Z_8}\\sim\\overline{Z_{15}}$ 接片 1，低组 $\\overline{Z_0}\\sim\\overline{Z_7}$ 接片 2。</li>\n  <li><strong>串使能：</strong>系统 $\\overline{EI}$ → 片 1 的 $\\overline{EI}$；片 1 的 $\\overline{EO}$ → 片 2 的 $\\overline{EI}$。</li>\n  <li><strong>合并输出：</strong>3 个二输入与非门 + 1 个反相器。</li>\n</ol>\n\n<h4>二、输出合并的推导</h4>\n<p>任何时刻至多一片处于编码态，另一片被禁止时输出恒为 111（反码的全 1）。因此</p>\n<p>$$A_k=\\overline{\\overline{A_{k1}}\\cdot\\overline{A_{k2}}}\\quad(k=0,1,2),\\qquad A_3=\\overline{\\overline{Y_{EX1}}}$$</p>\n<p>当片 1 有效时片 2 输出 111，与非门的另一端相当于“与 1”，故与非门同时完成了“反码 → 原码”的还原。</p>\n\n<h4>三、系统控制端</h4>\n<p>$$\\overline{GS}=\\overline{Y_{EX1}}\\cdot\\overline{Y_{EX2}},\\qquad \\overline{EO}=\\overline{EO_2}$$</p>\n\n<div class=\"callout callout-danger\">\n  <strong>⛔ 严禁把两片同名输出直接相连（线与）：</strong>普通 CMOS 为推挽输出，一片输出 0、另一片输出 1 时形成 $V_{CC}\\to GND$ 低阻通路，产生大电流并损坏芯片。只有 OC/OD 或三态输出才允许线与。\n</div>\n</div>",
    "keyPoints": [
      "“高优先级片的 EO → 低优先级片的 EI”是唯一判据",
      "与非门合并同时完成反码还原，比“与门+反相器”省器件",
      "A3 取自高组片的 YEX，不是 EO"
    ],
    "pitfalls": [
      "把低组片的 EO 接高组片的 EI，导致优先级反了",
      "用线或/线与直接合并两片输出"
    ]
  },
  {
    "id": "KC003",
    "tag": "防偏门",
    "title": "卡片3：74HC147 十进 BCD 优先编码器",
    "summary": "147 是“10 线-4 线”，输出 BCD 反码，没有使能与级联端，无输入时输出 1111 与“按 0 键”无法区分。",
    "content": "<div class=\"card-article\">\n<h4>一、关键参数对照</h4>\n<table class=\"data-table\">\n  <thead><tr><th>项目</th><th>74HC147</th><th>74HC148</th></tr></thead>\n  <tbody>\n    <tr><td>输入线数</td><td>10（$\\overline{I_0}\\sim\\overline{I_9}$）</td><td>8（$\\overline{I_0}\\sim\\overline{I_7}$）</td></tr>\n    <tr><td>输出线数</td><td>4（BCD）</td><td>3（二进制）</td></tr>\n    <tr><td>使能端</td><td>无</td><td>$\\overline{EI}$</td></tr>\n    <tr><td>级联端</td><td>无</td><td>$\\overline{EO}$、$\\overline{Y_{EX}}$</td></tr>\n    <tr><td>输出极性</td><td>BCD 反码（低有效）</td><td>二进制反码（低有效）</td></tr>\n  </tbody>\n</table>\n\n<h4>二、典型输出（均为反码）</h4>\n<p>$\\overline{I_9}=0\\Rightarrow 0110$（$\\overline{1001}$）；$\\overline{I_7}=0\\Rightarrow 1000$（$\\overline{0111}$）；无输入 $\\Rightarrow 1111$（$\\overline{0000}$）。</p>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 二义性：</strong>“无键按下”与“按 0 键”输出都是 1111。键盘电路中必须用扫描信号（或另外的按键标志位）区分，不能只看 147 的输出。\n</div>\n<p>典型应用：十进制键盘 → 147 → BCD → 7448 → 数码管显示。</p>\n</div>",
    "keyPoints": [
      "147 是“十进四”、148 是“八进三”",
      "147 无使能端，不能级联",
      "无输入与 0 键输出相同，必须外部区分"
    ],
    "pitfalls": [
      "把 147 输出当作高有效",
      "试图用 EO 级联 147（该芯片没有此引脚）"
    ]
  },
  {
    "id": "KC004",
    "tag": "核心器件",
    "title": "卡片4：74HC138 的输出方程与使能条件",
    "summary": "138 的全部行为都能由一个方程推出：受使能控制时，被选中输出为 0，其余为 1。",
    "content": "<div class=\"card-article\">\n<h4>一、输出方程（必须会默写）</h4>\n<p>设 $p_1$ 为 $G_1$ 引脚电平，$p_2$、$p_3$ 为 $\\overline{G_{2A}}$、$\\overline{G_{2B}}$ 引脚电平，则</p>\n<p>$$EN=p_1\\cdot\\overline{p_2}\\cdot\\overline{p_3},\\qquad \\overline{Y_i}=\\overline{EN\\cdot m_i}$$</p>\n<p>其中 $m_i$ 以 $A_2A_1A_0$ 为变量、$A_2$ 为最高位编号。</p>\n\n<h4>二、使能组合表</h4>\n<table class=\"data-table\">\n  <thead><tr><th>$G_1$</th><th>$\\overline{G_{2A}}$</th><th>$\\overline{G_{2B}}$</th><th>$EN$</th><th>输出</th></tr></thead>\n  <tbody>\n    <tr><td>0</td><td>×</td><td>×</td><td>0</td><td>全部为 1</td></tr>\n    <tr><td>×</td><td>1</td><td>×</td><td>0</td><td>全部为 1</td></tr>\n    <tr><td>×</td><td>×</td><td>1</td><td>0</td><td>全部为 1</td></tr>\n    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>选中端 0，其余 1</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-info\">\n  <strong>💡 三条推论（做题直接用）：</strong>\n  <br>① 被禁止时输出<strong>全为 1</strong>，不是高阻 → 不能当三态总线用；\n  <br>② 未选中片输出全 1 → 多片合并时该片对“与非”贡献 1、对“或”贡献 0；\n  <br>③ 把数据接到低有效使能端，可实现数据分配器（见卡片 8）。\n</div>\n</div>",
    "keyPoints": [
      "EN=G1·¬G2A·¬G2B",
      "Yi 是 mi 的反，不是 mi 本身",
      "禁止时输出全 1（非高阻）"
    ],
    "pitfalls": [
      "把 G2A/G2B 当作高有效，悬空导致一直使能",
      "认为未选中输出为高阻，直接并接总线"
    ]
  },
  {
    "id": "KC005",
    "tag": "核心考法",
    "title": "卡片5：用 138 实现逻辑函数的三种接法",
    "summary": "按“1 的集合”用与非门、按“0 的集合”取反、以及极端情形下 0 门直接取用输出端。",
    "content": "<div class=\"card-article\">\n<h4>一、三连接法总览</h4>\n<table class=\"data-table\">\n  <thead><tr><th>方向</th><th>表达式</th><th>适用</th><th>门</th></tr></thead>\n  <tbody>\n    <tr><td>按 1 的集合</td><td>$F=\\overline{\\prod_{i\\in S_1}\\overline{Y_i}}$</td><td>1 的个数较少</td><td>$|S_1|$ 输入与非门</td></tr>\n    <tr><td>按 0 的集合</td><td>$F=\\overline{\\overline{\\prod_{j\\in S_0}\\overline{Y_j}}}$</td><td>0 的个数较少</td><td>$|S_0|$ 输入与非门 + 反相</td></tr>\n    <tr><td>极端情形</td><td>$F=\\overline{Y_k}$（当 $F=\\overline{m_k}$）</td><td>0 只有一个且极性吻合</td><td>0 个门</td></tr>\n  </tbody>\n</table>\n\n<h4>二、接法要点</h4>\n<ol>\n  <li>地址端接变量，<strong>最高位接 $A_2$</strong>；使能端必须满足 $G_1=1$、$\\overline{G_{2A}}=\\overline{G_{2B}}=0$。</li>\n  <li>把所有“选中”的输出送入与非门，未参与的输出不接。</li>\n  <li>若库中只有二输入与非门，可用“两两合并 + 与非门作反相器”搭树，门数按层计算。</li>\n</ol>\n\n<div class=\"callout callout-success\">\n  <strong>💡 判据一句话：</strong>“1 少用 1，0 少用 0；极性刚好重合时，一个门都不用。”\n</div>\n</div>",
    "keyPoints": [
      "F=Σm 用与非门；F 的 0 少时先求 ¬F",
      "与非门两输入并接可作反相器",
      "Address 权重必须与最小项编号一致"
    ],
    "pitfalls": [
      "用与门代替与非门，得到 ¬F",
      "1 的个数很多仍硬画大输入与非门"
    ]
  },
  {
    "id": "KC006",
    "tag": "级联扩展",
    "title": "卡片6：多片 138 使能扩展（四变量）",
    "summary": "用最高位做片选，片内编号 = 最小项编号 − 8A，两路与非后用或门合并。",
    "content": "<div class=\"card-article\">\n<h4>一、片选方案</h4>\n<p>片 0 管 $A=0$：$G_1=\\overline{A}$（1 个反相器）；片 1 管 $A=1$：$G_1=A$。两片的 $\\overline{G_{2A}}=\\overline{G_{2B}}=0$，地址均接 $A_2=B,A_1=C,A_0=D$。</p>\n\n<h4>二、片内编号重排（最关键一步）</h4>\n<p>$$i_{片内}=i_{最小项}-8A$$</p>\n<p>例：$m_9$（$A=1$）→ 片 1，片内 $001$ → $\\overline{Y_1}$；若照抄成 $\\overline{Y_9}$ 则芯片上根本没有这个引脚。</p>\n\n<h4>三、合并逻辑</h4>\n<p>未选中片输出全为 1 → 其对应与非门输出必为 0 → 用<strong>或门</strong>合并：</p>\n<p>$$F=F_0+F_1,\\quad F_0=\\overline{\\prod\\overline{Y_i}}\\ (i\\in S_0),\\quad F_1=\\overline{\\prod\\overline{Y_j}}\\ (j\\in S_1)$$</p>\n<p>若误用与门，则一路为 0 时输出恒 0，函数完全失效。</p>\n\n<div class=\"callout callout-danger\">\n  <strong>⛔ 不能直接把两片同名输出相连：</strong>普通 CMOS 推挽输出不允许线与，必须经门电路合并。\n</div>\n</div>",
    "keyPoints": [
      "i片内 = i − 8A",
      "两路必须用或门合并",
      "未选中片贡献 0（对或门）"
    ],
    "pitfalls": [
      "片内编号未重排",
      "与门合并导致恒 0",
      "两片同时使能"
    ]
  },
  {
    "id": "KC007",
    "tag": "最高频考法",
    "title": "卡片7：用 151 实现函数的降维法四步",
    "summary": "地址 3 位 + 数据端 1 位变量，是 821 组合逻辑设计题中出现频率最高的单一考法。",
    "content": "<div class=\"card-article\">\n<h4>一、器件方程</h4>\n<p>$$Y=\\sum_{i=0}^{7}m_iD_i,\\qquad \\overline{Y}=\\overline{Y}\\ (\\text{片内已取反})$$</p>\n\n<h4>二、降维法四步</h4>\n<ol>\n  <li><strong>选地址：</strong>从 $n$ 个变量中取 3 个接 $A_2A_1A_0$（一般取高三位），剩下 1 个留给数据端。</li>\n  <li><strong>分组：</strong>按地址把 $2^n$ 个最小项分成 8 组，每组恰好 2 个（仅剩的那个变量取 0 与 1）。</li>\n  <li><strong>判定：</strong>\n    <br>· 两个都在集合内 → $D_i=1$；\n    <br>· 两个都不在 → $D_i=0$；\n    <br>· 只有“变量 = 1”的在 → $D_i=$ 该变量；\n    <br>· 只有“变量 = 0”的在 → $D_i=$ 该变量的反。\n  </li>\n  <li><strong>校验：</strong>抽一个“应为 1”和一个“应为 0”的点反查地址码。</li>\n</ol>\n\n<div class=\"callout callout-info\">\n  <strong>💡 口诀：</strong>同在取 1、同不在取 0、一半取变量、反向取反变量。\n</div>\n\n<h4>三、易错清单</h4>\n<ul>\n  <li>地址权重颠倒（$A$ 接 $A_0$）→ 整表位移，函数看似相近实则错误（详见 Q017）。</li>\n  <li>$\\overline{E}$ 忘记接地 → 输出恒 0。</li>\n  <li>$D_6,D_7$ 这类“只有变量 = 0 时成立”的通道误接成变量本身。</li>\n</ul>\n</div>",
    "keyPoints": [
      "Y=ΣmiDi；地址权重 A2 为最高位",
      "四种判定：1 / 0 / 变量 / 反变量",
      "填完必须抽两点校验"
    ],
    "pitfalls": [
      "地址顺序接反",
      "¬E 未接地",
      "D 端接变量的极性判反"
    ]
  },
  {
    "id": "KC008",
    "tag": "扩展与分配",
    "title": "卡片8：151 扩展 16 选 1 与 138 数据分配器",
    "summary": "地址高位做片选、低位做片内地址；合并门按“禁止时的输出电平”选择。",
    "content": "<div class=\"card-article\">\n<h4>一、两片 151 → 16 选 1</h4>\n<p>片 1 管 $D_0\\sim D_7$：$\\overline{E_1}=A_3$；片 2 管 $D_8\\sim D_{15}$：$\\overline{E_2}=\\overline{A_3}$（1 个反相器）；两片地址均接 $A_2A_1A_0$。</p>\n<p>151 被禁止时 $Y=0$，故用<strong>或门</strong>合并：$Y=Y_1+Y_2$。</p>\n<p>若要反相输出：用两片 $\\overline{Y}$ 经<strong>与门</strong>合并（禁止时 $\\overline{Y}=1$）。</p>\n\n<h4>二、合并门的选择判据</h4>\n<table class=\"data-table\">\n  <thead><tr><th>器件禁止时的输出</th><th>合并门</th></tr></thead>\n  <tbody>\n    <tr><td>0</td><td>或门</td></tr>\n    <tr><td>1</td><td>与门</td></tr>\n    <tr><td>高阻</td><td>直接并接（三态总线）</td></tr>\n  </tbody>\n</table>\n\n<h4>三、138 作 1-8 数据分配器</h4>\n<p>把数据 $D$ 当作使能：</p>\n<p>· $D$ 接 $\\overline{G_{2A}}$（低有效）→ 选中通道输出 $=D$（同相）；<br>· $D$ 接 $G_1$（高有效）→ 选中通道输出 $=\\overline{D}$（反相）。</p>\n<p>未选中通道恒为 <strong>1</strong>（不是高阻），后级必须按地址选通。</p>\n</div>",
    "keyPoints": [
      "地址高位片选、低位片内寻址",
      "合并门由“禁止时输出电平”决定",
      "分配器极性取决于数据接哪个使能端"
    ],
    "pitfalls": [
      "用与门合并 151（禁止时输出 0）",
      "把分配器的未选中通道当高阻处理"
    ]
  },
  {
    "id": "KC009",
    "tag": "算术电路",
    "title": "卡片9：74HC283 的加减、级联与码制转换",
    "summary": "一切算术类设计的通用套路：先把“数值关系”写成加减法，再翻译成常量输入端与进位输入。",
    "content": "<div class=\"card-article\">\n<h4>一、基本关系</h4>\n<p>$$S=A+B+C_0,\\qquad \\text{减法：}A-B=A+\\overline{B}+1$$</p>\n<p>减法三动作：<strong>$B$ 逐位取反、$C_0=1$、用 $C_4$ 判借位</strong>（$C_4=1$ 表示无借位）。</p>\n\n<h4>二、级联</h4>\n<p>低位片 $C_4$ → 高位片 $C_0$；最高位片的 $C_4$ 即总进位。低位片内部为超前进位，片间仍需串行传进位。</p>\n\n<h4>三、码制转换的翻译表</h4>\n<table class=\"data-table\">\n  <thead><tr><th>转换</th><th>运算</th><th>$B$ 端常量</th><th>$C_0$</th></tr></thead>\n  <tbody>\n    <tr><td>8421BCD → 余 3 码</td><td>$+3$</td><td>$0011$</td><td>0</td></tr>\n    <tr><td>余 3 码 → 8421BCD</td><td>$-3$</td><td>$1101$（$-3$ 的补码）</td><td>0</td></tr>\n    <tr><td>取反加 1（求补）</td><td>$-B$</td><td>$\\overline{B}$</td><td>1</td></tr>\n  </tbody>\n</table>\n\n<h4>四、BCD 加法修正</h4>\n<p>$$M=C_4+S_3S_2+S_3S_1,\\qquad D=S+M\\times 0110$$</p>\n<p>第二片 283 的 $B$ 端接 $0\\,M\\,M\\,0$；进位 $C=C_4+C_4'$。</p>\n</div>",
    "keyPoints": [
      "减法三动作；C4=1 表示无借位",
      "减 3 的补码是 1101，不是 1100",
      "M=C4+S3S2+S3S1；B 端接 0MM0"
    ],
    "pitfalls": [
      "级联方向接反",
      "取反后忘加 1",
      "判别式写成 S3S0"
    ]
  },
  {
    "id": "KC010",
    "tag": "器件功能",
    "title": "卡片10：74HC85 比较器与级联规范",
    "summary": "三输出互斥；级联方向为“低位片输出 → 高位片级联输入”，高位相等时才看低位。",
    "content": "<div class=\"card-article\">\n<h4>一、输出关系</h4>\n<p>$$A>B\\Rightarrow O_{A>B}=1;\\quad A=B\\Rightarrow O_{A=B}=1;\\quad A<B\\Rightarrow O_{A<B}=1$$</p>\n<p>三者<strong>有且仅有一个</strong>为 1（互斥编码）。</p>\n\n<h4>二、级联输入</h4>\n<p>单片使用必须设：$I_{A>B}=0,\\ I_{A=B}=1,\\ I_{A<B}=0$（“相等时默认相等”）。</p>\n<p>8 位扩展：低位片级联输入接 $(0,1,0)$，其输出接高位片级联输入，高位片输出即总结果。</p>\n\n<h4>三、为什么高位优先</h4>\n<p>高位片只有在自身高 4 位完全相等时，才把级联输入（低位结果）原样传出；否则按自身比较结果直接输出。</p>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 与减法器联用时的核对：</strong>$A-B$ 的 $C_8=\\overline{借位}$，而 $C_8=1\\Leftrightarrow A\\ge B\\Leftrightarrow(O_{A>B}+O_{A=B})=1$。若两者不一致，说明级联方向或取反有误。\n</div>\n</div>",
    "keyPoints": [
      "三输出互斥，恒有一个为 1",
      "单片级联输入 (0,1,0)",
      "低位输出接高位级联输入"
    ],
    "pitfalls": [
      "级联方向接反",
      "级联输入全 0，A=B 时输出全 0"
    ]
  },
  {
    "id": "KC011",
    "tag": "综合与选型",
    "title": "卡片11：混合电路分析法与器件选型",
    "summary": "混合电路的读图顺序固定；选型结论必须落到“门数、芯片数、引脚、延迟”四项量化指标。",
    "content": "<div class=\"card-article\">\n<h4>一、混合电路五步分析法</h4>\n<ol>\n  <li>分别写出各器件的独立方程（138：$\\overline{Y_i}=\\overline{m_i}$；151：$Y=\\sum m_iD_i$）。</li>\n  <li>找出器件间的连接关系（谁是谁的输入、地址是否共用）。</li>\n  <li>逐层代入，消去中间变量。</li>\n  <li>列真值表（8 行或 16 行），确认无遗漏。</li>\n  <li>给出功能结论（“取最高位”“奇校验”“多数表决”等）。</li>\n</ol>\n\n<h4>二、同一函数的三方案对照（以 $F=\\sum m(0,1,3,5,7)$ 为例）</h4>\n<table class=\"data-table\">\n  <thead><tr><th>指标</th><th>SSI 与非门</th><th>138 + 门</th><th>151</th></tr></thead>\n  <tbody>\n    <tr><td>外围门数</td><td>3</td><td>2（按 0 集合）</td><td>0</td></tr>\n    <tr><td>芯片数</td><td>2~3</td><td>2</td><td>1</td></tr>\n    <tr><td>改函数</td><td>重画</td><td>改门输入</td><td>改数据端接 0/1</td></tr>\n    <tr><td>延迟</td><td>2~3 级</td><td>1 级译码 + 1~2 级门</td><td>1 级</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-success\">\n  <strong>💡 选型三句话：</strong>单函数求快 → 151；多函数共享 → 138；函数极简求省 → SSI。\n</div>\n</div>",
    "keyPoints": [
      "混合电路：先各自方程，再代入化简",
      "选型要有量化指标",
      "138 适合多输出共享译码"
    ],
    "pitfalls": [
      "跳过器件方程直接猜功能",
      "选型结论无依据（“都可以”）"
    ]
  },
  {
    "id": "KC012",
    "tag": "系统综合",
    "title": "卡片12：MSI 毛刺抑制与系统级链路",
    "summary": "逻辑可化简不等于物理无冒险；系统设计的骨架是“编码 → 译码 → 选择”。",
    "content": "<div class=\"card-article\">\n<h4>一、MSI 电路中的毛刺来源</h4>\n<p>同一函数被拆到多个独立输出上实现时（如 $F=m_2+m_6$ 用 $\\overline{Y_2},\\overline{Y_6}$ 经与非门合并），两个输出各自翻转、延迟不同，切换瞬间可能出现“同时有效”，输出端产生窄脉冲。逻辑化简为 $B\\overline{C}$ 并不能消除这条物理路径。</p>\n\n<h4>二、四种抑制措施</h4>\n<table class=\"data-table\">\n  <thead><tr><th>措施</th><th>做法</th><th>代价</th></tr></thead>\n  <tbody>\n    <tr><td>选通脉冲（首选）</td><td>把 $G_1$ 由固定接 1 改为接选通信号，地址稳定后再使能</td><td>需时序配合，不增加器件</td></tr>\n    <tr><td>输出滤波</td><td>$F$ 端并联几十~几百 pF 电容</td><td>增加延迟、降低速度</td></tr>\n    <tr><td>输出锁存</td><td>$F$ 后接 D 触发器，在稳定时刻采样</td><td>需时钟（Day3 内容）</td></tr>\n    <tr><td>改实现方式</td><td>直接用 SSI 实现 $B\\overline{C}$，消除相切路径</td><td>增加门电路</td></tr>\n  </tbody>\n</table>\n\n<h4>三、系统级链路骨架</h4>\n<p><strong>传感器 → 优先编码（谁最急）→ 译码指示（是哪一路）→ 数据选择（该路的等级/参数）</strong></p>\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 两个必查接线：</strong>\n  <br>① 148 输出是反码，进 138/151 地址前必须反相；\n  <br>② 138 的 $G_1$ 要与“有输入”联动（$G_1=\\overline{\\overline{Y_{EX}}}$），否则无输入时会误点亮 0 号通道。\n</div>\n</div>",
    "keyPoints": [
      "MSI 实现的冒险来自多输出独立翻转",
      "选通脉冲是最不增加器件的抑制手段",
      "系统链路：编码 → 译码 → 选择，反码必须反相"
    ],
    "pitfalls": [
      "认为逻辑化简后必无毛刺",
      "无输入状态未屏蔽导致 0 号通道常亮"
    ]
  }
];

// 5. 今日学习任务清单
window.STUDY_TASKS = [
  {
    "id": "task_1",
    "type": "review",
    "title": "任务1：Day1 错题回滚 + 今日考点自查",
    "description": "先打开 Day1 系统的错题本，把“卡诺图化简、无关项、竞争冒险”三类未掌握题重做一遍（不看答案）；再逐项核对上方 821 考纲自查表（考纲 d 条目 MSI 部分），标注薄弱项。",
    "status": "pending"
  },
  {
    "id": "task_2",
    "type": "video",
    "title": "任务2：网课主线·编码器",
    "description": "【主线必看】新手小牛 P25《组合逻辑集成电路——编码器（1）》、P26《组合逻辑集成电路——编码器（2）》\n重点：普通编码器与优先编码器的区别、74HC148 引脚与功能表、EO/YEX 的作用。",
    "videoRef": "新手小牛 P25 组合逻辑集成电路——编码器（1）, P26 组合逻辑集成电路——编码器（2）",
    "optionalVideoRef": "可选补充：姬清影 P37 普通编码器、P38 优先编码器功能熟悉、P39 优先编码器74HC148、P40 优先编码器74HC147",
    "status": "pending"
  },
  {
    "id": "task_3",
    "type": "video",
    "title": "任务3：网课主线·译码器（核心）",
    "description": "【主线必看】新手小牛 P27《组合逻辑集成电路——译码器(1)》、P28《…译码器(2)》、P29《…译码器(3)》\n重点：74HC138 结构与使能端、输出低有效、用译码器实现逻辑函数、级联扩展。",
    "videoRef": "新手小牛 P27 组合逻辑集成电路——译码器(1), P28 组合逻辑集成电路——译码器(2), P29 组合逻辑集成电路——译码器(3)",
    "optionalVideoRef": "可选补充：姬清影 P41 译码器74HC138、P42 译码器74HC42、P43 显示译码器7448",
    "status": "pending"
  },
  {
    "id": "task_4",
    "type": "video",
    "title": "任务4：网课主线·数据选择器与比较器",
    "description": "【主线必看】新手小牛 P31《组合逻辑集成电路---数据选择器》、P32《组合逻辑集成电路——比较器》\n重点：151/153 的功能表与输出方程、用数据选择器实现任意逻辑函数的降维法。",
    "videoRef": "新手小牛 P31 组合逻辑集成电路---数据选择器, P32 组合逻辑集成电路——比较器",
    "optionalVideoRef": "可选补充：姬清影 P45 数据选择器、P48 数值比较器",
    "status": "pending"
  },
  {
    "id": "task_5",
    "type": "video",
    "title": "任务5：网课主线·算术运算电路 + 前四章串联",
    "description": "【主线必看】新手小牛 P35《组合逻辑集成电路——算术运算电路》、P37《前四章内容归纳复习》\n重点：半加器/全加器、74HC283 超前进位与级联、代码转换；用 P37 把“代数 → 门电路 → 组合逻辑”串成一条线。",
    "videoRef": "新手小牛 P35 组合逻辑集成电路——算术运算电路, P37 前四章内容归纳复习",
    "optionalVideoRef": "可选补充：姬清影 P46 半加器与全加器、P47 多位加法器",
    "status": "pending"
  },
  {
    "id": "task_6",
    "type": "reconstruct",
    "title": "任务6：结构化知识重构",
    "description": "精读下方 12 张知识卡片，重点背记：138 输出方程、151 数据端四判据、283 减法三动作、BCD 修正判别式、85 级联方向。建议边读边在纸上默写公式。",
    "status": "pending"
  },
  {
    "id": "task_7",
    "type": "practice",
    "title": "任务7：必做区核心考法精练（Q001 ~ Q020）",
    "description": "限时完成 20 道必做区题目（含 3 道边界变式 Q017~Q019）。要求闭卷独立作答，先写接线/数据端表格，再对照得分点自评；边界题必须写清“为什么常规模板在此失效”。",
    "status": "pending"
  },
  {
    "id": "task_8",
    "type": "practice",
    "title": "任务8：拓展区冲刺攻坚（Q021 ~ Q025）",
    "description": "攻克 5 道高难/防偏门题：16 选 1 扩展、BCDA 非法码检测、8 位比较与减法通路、42+7448 显示译码、8 路报警系统综合设计。时间紧可先写思路，Day5 集中处理。",
    "status": "pending"
  },
  {
    "id": "task_9",
    "type": "review",
    "title": "任务9：错题归因与纠偏记录",
    "description": "在错题记录模块登记今日错题，按 12 类错因（尤其 E05 引脚与功能分析、E10 审题）填写，并写下可执行的纠正动作（如“重画 138 使能表，再做一个四变量片选题”）。",
    "status": "pending"
  },
  {
    "id": "task_10",
    "type": "review",
    "title": "任务10：当日闭卷复测（R001 ~ R003）",
    "description": "限时 40 分钟完成 3 道新变式（138 扩展、151 降维、BCD 加法与非法码），完成后自评“已掌握 / 不稳定 / 未掌握”，未掌握项将在 Day3 开头回滚。",
    "status": "pending"
  }
];

