/**
 * ====================================================================
 * Day 3 · 触发器、边沿触发与状态记忆 - 题库与交互数据源
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

// 1. 今日考点自查表（按 821 考纲 e 条目的动作特点与描述工具拆分）
window.EXAM_CHECKLIST = [
  {
    "id": "cp-rs-latch",
    "name": "基本 RS 锁存器（与非/或非）与约束条件",
    "title": "基本 RS 锁存器（与非/或非）与约束条件",
    "importance": "★★★★★",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 动作特点基础",
    "knowledgePoint": "交叉耦合正反馈、低/高有效输入、约束 SD·RD=0、状态不定",
    "examMethod": "由门级结构推状态方程；列功能表；判断禁止输入",
    "requirement": "【核心考查】输入极性（与非门低有效、或非门高有效）不能混；同时有效的含义是\"两输出同为 1\"，撤销后状态不确定。",
    "questionIds": [
      "Q001",
      "Q002"
    ],
    "standard": "能默写两种结构的方程与约束，并说明不定态的物理原因。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-d-latch",
    "name": "电平触发 D 锁存器与空翻",
    "title": "电平触发 D 锁存器与空翻",
    "importance": "★★★★☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 动作特点（电平触发）",
    "knowledgePoint": "CP=1 透明、CP=0 保持、空翻、抗干扰弱",
    "examMethod": "电平触发波形判读；说明为何不能直接做计数器",
    "requirement": "【核心考查】透明期的采样窗口等于时钟高电平全程；CP=0 必须画平，不能继续跟随 D。",
    "questionIds": [
      "Q003",
      "Q012"
    ],
    "standard": "能画出电平触发与边沿触发在同一输入下的两条不同 Q 波形。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-jk-eq",
    "name": "JK 特性方程、卡诺图化简与翻转功能",
    "title": "JK 特性方程、卡诺图化简与翻转功能",
    "importance": "★★★★★",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 逻辑功能分类与描述",
    "knowledgePoint": "JK 特性表、Q^{n+1}=JQ̄+K̄Q、J=K=1 翻转、无约束",
    "examMethod": "由特性表用卡诺图求方程；解释约束消失的结构原因",
    "requirement": "【核心考查】方程必须写成 JQ̄+K̄Q，漏掉 Q̄ 即错；翻转项来自反馈使置位/复位通路交替导通。",
    "questionIds": [
      "Q004"
    ],
    "standard": "能默写四类方程并说明 JK 为何没有约束。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-excitation",
    "name": "激励表与状态转换图/表",
    "title": "激励表与状态转换图/表",
    "importance": "★★★★☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 逻辑功能的描述工具",
    "knowledgePoint": "四类激励表、任意项、状态图、由接线求状态方程",
    "examMethod": "由状态转换反求激励；由驱动方程画状态图",
    "requirement": "【核心考查】激励表是特性表的逆用；任意项要按\"最省\"取；由接线求方程是时序分析的起点。",
    "questionIds": [
      "Q005",
      "Q014"
    ],
    "standard": "能 5 分钟内完成四类激励表与一段状态序列的激励求解。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-convert",
    "name": "触发器功能转换（JK↔D、JK→T/T′）",
    "title": "触发器功能转换（JK↔D、JK→T/T′）",
    "importance": "★★★★★",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 高频设计题",
    "knowledgePoint": "比较法配平、J=D/K=D̄、J=K=T、J=K=1、D=JQ̄+K̄Q",
    "examMethod": "用特性方程比较法推导；统计附加门数",
    "requirement": "【核心考查】必须对 Q=0 与 Q=1 两种情形分别配平；接反（J=D̄,K=D）得到的是反相 D。",
    "questionIds": [
      "Q006",
      "Q007",
      "Q008",
      "Q018"
    ],
    "standard": "能独立完成三种转换并说明接反后的结果。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-master-slave",
    "name": "主从 JK 结构与\"一次变化\"",
    "title": "主从 JK 结构与\"一次变化\"",
    "importance": "★★★★★",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 高频避坑（2014/2016 主从 JK 波形）",
    "knowledgePoint": "CP=1 主接收、下降沿从跟随、反馈封锁、只认第一次变化",
    "examMethod": "逐拍判读主从波形；用反馈封锁解释一次变化",
    "requirement": "【核心考查】主从型记\"CP=1 期间的第一次变化\"，不是下降沿时刻的输入值；这是与边沿型结果不同的唯一根源。",
    "questionIds": [
      "Q009",
      "Q016",
      "Q021"
    ],
    "standard": "能对任意 CP/J/K 波形逐拍写出主从 Q，并指出与边沿型的差异位置。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-edge-wave",
    "name": "边沿触发波形（下降沿 JK / 门控时钟）",
    "title": "边沿触发波形（下降沿 JK / 门控时钟）",
    "importance": "★★★★★",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 波形综合题（821 考查 5 次以上）",
    "knowledgePoint": "有效沿识别、沿前一刻采样、门控时钟 CP·EN",
    "examMethod": "在波形上标有效沿；逐拍填 Q；门控时钟先算 CP′",
    "requirement": "【核心考查】只在有效沿更新；采样值取沿前一刻；门控时钟要先化简 CP′=CP·EN 再找沿。",
    "questionIds": [
      "Q010",
      "Q025"
    ],
    "standard": "能独立完成含门控时钟与异步端的复合波形，并逐段写出依据。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-async",
    "name": "异步置位/复位端的优先级与竞争",
    "title": "异步置位/复位端的优先级与竞争",
    "importance": "★★★★☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 异步 JK 分析（真题 5 次）",
    "knowledgePoint": "SD̄/RD̄ 低有效、异步优先、同时有效不定、异步复位同步释放",
    "examMethod": "异步端波形判读；异步与时钟同时动作的判定",
    "requirement": "【核心考查】异步端直接作用于输出级，优先级高于时钟；两输入同时有效撤销后状态不确定；复位释放要同步。",
    "questionIds": [
      "Q011",
      "Q017"
    ],
    "standard": "能判读含异步端的波形，并说明\"异步复位、同步释放\"的原因。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-compare",
    "name": "电平/脉冲/边沿三类触发方式对比",
    "title": "电平/脉冲/边沿三类触发方式对比",
    "importance": "★★★★☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 动作特点对比",
    "knowledgePoint": "采样窗口宽度、抗干扰能力、对时钟质量的要求",
    "examMethod": "从窗口宽度解释抗干扰差异；维持阻塞机理",
    "requirement": "【核心考查】采样窗口：电平=高电平全程、脉冲=CP=1 第一次变化、边沿=tsu+th。窗口越窄抗干扰越强。",
    "questionIds": [
      "Q012",
      "Q024"
    ],
    "standard": "能用一个量化指标（窗口宽度）解释三类触发方式的差异。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-timing",
    "name": "动态参数 tsu / th / tpd 与最高时钟频率",
    "title": "动态参数 tsu / th / tpd 与最高时钟频率",
    "importance": "★★★☆☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 动作特点（工程参数）",
    "knowledgePoint": "建立/保持时间、传输延迟、Tmin=tpd+tcomb+tsu、亚稳态",
    "examMethod": "时序参数计算；fmax 推导；亚稳态判断",
    "requirement": "【核心考查】一个周期 = 前级 tpd + 组合延迟 + 后级 tsu；th 用于保持检查，不进入加法。",
    "questionIds": [
      "Q013"
    ],
    "standard": "能正确计算 fmax 并说明超频后的亚稳态现象。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-divider",
    "name": "T′ 分频与多级级联",
    "title": "T′ 分频与多级级联",
    "importance": "★★★★☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 与 Day4 计数器的衔接",
    "knowledgePoint": "T′ 翻转、级联分频 2^n、触发沿与相位、异步清零影响",
    "examMethod": "多级分频波形推演；分频比与相位分析",
    "requirement": "【核心考查】每级在其时钟的有效沿翻转，后级以前级输出为时钟；相位由触发沿与初值决定，分频比不变。",
    "questionIds": [
      "Q015",
      "Q019",
      "Q023"
    ],
    "standard": "能独立画出三级分频波形并说明清零后的相位变化。",
    "preMastery": "",
    "postStatus": ""
  },
  {
    "id": "cp-select",
    "name": "四类触发器对比与选型",
    "title": "四类触发器对比与选型",
    "importance": "★★★☆☆",
    "examPoint": "821考纲 e. 触发器（真题频次 83%，异步 JK 分析 5 次以上） · 综合判断",
    "knowledgePoint": "SR/D/JK/T 方程与约束、功能覆盖关系、门数成本",
    "examMethod": "列表对比；构造性证明功能覆盖；按门数选型",
    "requirement": "【核心考查】JK 覆盖其余三类（J=SD、K=RD→SR；J=K=T→T；J=D、K=D̄→D）；选型先看门数再看器件可得性。",
    "questionIds": [
      "Q020",
      "Q022"
    ],
    "standard": "能给出四类对比表并用构造性转换证明 JK 覆盖性。",
    "preMastery": "",
    "postStatus": ""
  }
];

// 2. 核心题库数据（25 道：20 道必做 + 5 道拓展）
window.QUESTION_DATA = [
  {
    "id": "Q001",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石《数字电子技术基础》第六版 5.2 节基本 RS 触发器设计，非教材原题",
    "knowledgePoints": [
      "基本RS触发器",
      "与非门锁存器",
      "约束条件",
      "状态不定"
    ],
    "examMethods": [
      "交叉耦合门电路状态方程推导",
      "低有效输入功能表列写",
      "约束条件物理含义分析"
    ],
    "tag": "【教材经典母题】",
    "question": "【题目描述】\n两个二输入与非门交叉连接构成基本 RS 触发器：$Q=\\overline{\\overline{S_D}\\cdot\\overline{Q}}$，$\\overline{Q}=\\overline{\\overline{R_D}\\cdot Q}$，其中 $\\overline{S_D}$、$\\overline{R_D}$ 为低电平有效的置 1、置 0 端。\n\n【作答要求】\n(1) 说明该电路为什么能\"记住\"状态（正反馈的作用）；\n(2) 列出 $\\overline{S_D}$、$\\overline{R_D}$ 四种组合下的 $Q^{n+1}$ 功能表；\n(3) 写出特性方程与约束条件，并说明约束的物理含义；\n(4) 当 $\\overline{S_D}=\\overline{R_D}=0$ 时输出是什么？撤销该输入后为什么状态不确定？",
    "answer": "【标准答案】\n(1) 记忆原理：每个门的输出都接到另一个门的输入，形成闭合正反馈。只要输入端保持 1（无效），两个门就互相\"支撑\"各自的电平：$Q=1$ 使 $\\overline{Q}=0$，$\\overline{Q}=0$ 又维持 $Q=1$。这种自锁使状态在没有新输入时保持不变。\n\n(2) 功能表（低有效输入）：\n| $\\overline{S_D}$ | $\\overline{R_D}$ | $Q^{n+1}$ | 说明 |\n| :---: | :---: | :---: | :--- |\n| 1 | 1 | $Q^n$ | 保持 |\n| 0 | 1 | 1 | 置 1 |\n| 1 | 0 | 0 | 置 0 |\n| 0 | 0 | 不定（禁止） | 两输出同时为 1 |\n\n(3) 特性方程：把低有效引脚折算为高有效逻辑量 $S_D$、$R_D$（引脚为 $\\overline{S_D}$、$\\overline{R_D}$）：\n$$Q^{n+1}=S_D+\\overline{R_D}\\,Q^n,\\qquad \\text{约束：}S_D\\cdot R_D=0$$\n约束的物理含义：不允许同时发出置 1 与置 0 命令，否则两个门互相\"打架\"，无法维持互补输出。\n\n(4) 同时为 0 时：$Q=\\overline{0\\cdot\\overline{Q}}=1$，$\\overline{Q}=\\overline{0\\cdot Q}=1$，即 $Q=\\overline{Q}=1$，破坏互补关系。\n撤销后（两输入同时回到 1）：两个门同时从\"全 1\"向互补状态恢复，谁先翻转取决于两门的传输延迟、负载与噪声，可能停在 $Q=1$ 也可能停在 $Q=0$，因此状态**不确定**，工程上禁止这种输入组合。",
    "explanation": "【详细推导与解析】\n1. 读图顺序：先看每个门的输入来自哪里，再\"假设一个稳态\"验证它能否自洽。例如假设 $Q=1$，则 $\\overline{Q}=0$，代回 $Q=\\overline{\\overline{S_D}\\cdot 0}=1$ 自洽 ✓。\n2. 低有效输入的记忆法：**0 才是命令，1 是无事发生**。这与组合逻辑\"1 有效\"的习惯相反，是初学阶段最高频的失分点。\n3. 约束条件不是\"额外的规则\"，而是电路结构的必然结果：两个门都是与非门，若两个输入同时为 0，两个输出必然同时为 1。\n4. 本题的\"不定态\"必须与\"保持态\"区分：保持是稳定且可重复的；不定是理论上无法预测、实测中随机。",
    "scoringPoints": [
      "第一问：指出交叉反馈形成自锁 (3分)",
      "第二问：功能表四行正确（含禁止行）(4分)",
      "第三问：写出特性方程与约束并解释物理含义 (3分)",
      "第四问：说明两输出同为 1 及撤销后不确定 (2分)"
    ],
    "commonMistakes": [
      "把低有效输入当成高有效，功能表整体反相",
      "认为约束条件只是\"建议\"，忽略它会烧毁电路或产生亚稳态",
      "把同时为 0 时的输出写成 $Q=0,\\overline{Q}=0$"
    ],
    "verification": "用功能表逐行代入特性方程：$(\\overline{S_D},\\overline{R_D})=(0,1)$ → $S_D=1,R_D=0$ → $Q^{n+1}=1+1\\cdot Q=1$ ✓；$(1,0)$ → $0+0\\cdot Q=0$ ✓；$(1,1)$ → $0+1\\cdot Q=Q$ ✓。三行与表格一致。"
  },
  {
    "id": "Q002",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "AI标准变式",
    "sourceNote": "按考纲 e 条目“触发器的动作特点、逻辑功能分类及描述”，对比两类基本 RS 结构自编",
    "knowledgePoints": [
      "或非门SR锁存器",
      "输入极性",
      "约束条件",
      "结构对比"
    ],
    "examMethods": [
      "两种基本RS结构对比",
      "高/低有效输入的等价变换",
      "约束条件的对偶形式"
    ],
    "tag": "",
    "question": "【题目描述】\n基本 RS 触发器有两种结构：① 两个**或非门**交叉连接，输入 $S_D$、$R_D$ 高电平有效；② 两个**与非门**交叉连接，输入 $\\overline{S_D}$、$\\overline{R_D}$ 低电平有效。\n\n【作答要求】\n(1) 写出或非门结构的特性方程与约束条件；\n(2) 从\"命令有效电平\"角度说明两者的输入极性为什么相反；\n(3) 若把或非门结构的 $S_D$、$R_D$ 两端互换接线，功能会变成什么？\n(4) 某系统原设计用或非门结构，现只有与非门器件，如何在不改变外部信号极性的前提下替换？",
    "answer": "【标准答案】\n(1) 或非门结构：\n$$Q^{n+1}=S_D+\\overline{R_D}\\,Q^n,\\qquad \\text{约束：}S_D\\cdot R_D=0$$\n（$S_D$、$R_D$ 均为高电平有效，不能同时为 1。）\n\n(2) 极性相反的原因：或非门\"任一输入为 1 则输出为 0\"，要让 $Q$ 置 1 必须把 $S_D$ 拉高；与非门\"任一输入为 0 则输出为 1\"，要让 $Q$ 置 1 必须把 $\\overline{S_D}$ 拉低。同一功能在两类门中对应相反的有效电平。\n\n(3) $S_D$、$R_D$ 互换后，置 1 命令变成置 0、置 0 命令变成置 1，功能变为\"反相控制\"的 RS 触发器（外部看来是原功能的取反），约束条件不变（仍不能同时有效）。\n\n(4) 替换方法：在与非门结构的两输入端各加一级反相器，把外部高有效的 $S_D$、$R_D$ 变为低有效后再送入 $\\overline{S_D}$、$\\overline{R_D}$：\n$$\\overline{S_D}=\\overline{S_D\\ (\\text{外部})},\\qquad \\overline{R_D}=\\overline{R_D\\ (\\text{外部})}$$\n这样外部信号极性不变，内部仍为标准的与非门锁存器。",
    "explanation": "【详细推导与解析】\n1. 两类结构的特性方程形式相同，差别只在\"引脚名与实际电平\"的映射。考试中写方程必须同时写清\"方程中的 S、R 是高有效逻辑量还是引脚电平\"，否则会被判概念不清。\n2. 记忆口诀：**或非门\"高置位\"，与非门\"低置位\"**。\n3. 第 (3) 问考察\"接线即功能\"的意识：RS 触发器是对称结构，互换 S/R 等于互换置位与复位。\n4. 第 (4) 问是工程替换题的标准答案：极性转换用反相器，且反相器应尽量靠近触发器输入端，减少干扰耦合。",
    "scoringPoints": [
      "第一问：方程与约束正确 (3分)",
      "第二问：从门电路输入输出关系解释极性差异 (3分)",
      "第三问：指出置位/复位互换 (2分)",
      "第四问：给出反相器转换方案 (2分)"
    ],
    "commonMistakes": [
      "把两类结构的约束都写成“不能同时为 1”",
      "替换时只在 S 端加反相器，R 端忘记加",
      "认为互换 S/R 后电路无法工作"
    ],
    "verification": "把或非门结构的功能表与与非门结构逐行对照：或非门 $(S,R)=(1,0)$ 置 1 ↔ 与非门 $(\\overline{S_D},\\overline{R_D})=(0,1)$ 置 1，两者置 1 条件一一对应，说明只是有效电平相反。"
  },
  {
    "id": "Q003",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "AI标准变式",
    "sourceNote": "按考纲 e 条目“触发器的动作特点”，针对电平触发 D 锁存器与空翻现象自编",
    "knowledgePoints": [
      "电平触发",
      "D锁存器",
      "透明与保持",
      "空翻"
    ],
    "examMethods": [
      "电平触发动作特点分析",
      "D 锁存器波形绘制",
      "空翻现象成因说明"
    ],
    "tag": "",
    "question": "【题目描述】\n电平触发 D 触发器（D 锁存器）在 $CP=1$ 期间 $Q$ 跟随 $D$，$CP=0$ 期间保持。\n\n【作答要求】\n(1) 写出其特性方程，并说明\"透明\"的含义；\n(2) 指出该电路在 $CP=1$ 期间存在什么隐患，工程上称为什么现象；\n(3) 若 $CP$ 的高电平持续 200 ns，而 $D$ 在此期间变化了 5 次，$Q$ 会怎样？\n(4) 为什么说\"电平触发不适合做计数器\"？",
    "answer": "【标准答案】\n(1) 特性方程：\n$$Q^{n+1}=D\\quad(CP=1\\ \\text{期间})$$\n\"透明\"指 $CP=1$ 时 $Q$ 端相当于 $D$ 端的一根导线（只经过门延迟），$D$ 怎么变 $Q$ 就怎么变。\n\n(2) 隐患：$CP=1$ 期间输入端的任何干扰都会直接传到输出，电路没有\"只在某一瞬间采样\"的保护。工程上称为**空翻**（clock racing / 透明期穿透）。\n\n(3) $Q$ 会跟着变化 5 次（每次 $D$ 翻转后经 $t_{pd}$ 输出跟随），最终停在 $D$ 的最后一个值。这意味着输出的中间状态全部暴露给了后级电路。\n\n(4) 计数器要求\"每来一个时钟只计一次\"。电平触发在 $CP=1$ 的整段时间内都可能被输入（包括自身反馈）改变，计数值可能一次时钟跳多步，逻辑上不可控。因此计数器必须使用**边沿触发**（或主从结构）的触发器。",
    "explanation": "【详细推导与解析】\n1. 电平触发的动作窗口是\"电平持续期间\"，边沿触发的动作窗口是\"跳变瞬间\"。这是本章全部对比的源头。\n2. 空翻的典型后果：在移位寄存器、计数器中造成多次翻转，输出错误。\n3. 判断波形题时，电平触发的关键动作是：**先在 $CP=1$ 区间内逐段看 $D$，$Q$ 滞后一个 $t_{pd}$ 跟随；$CP=0$ 区间画平**。\n4. 注意\"电平触发\"并不是\"没有时钟\"：$CP=0$ 时仍然保持，只是不采样。",
    "scoringPoints": [
      "第一问：方程与“透明”解释 (3分)",
      "第二问：指出空翻现象 (3分)",
      "第三问：说明跟随变化 5 次并停在最后值 (2分)",
      "第四问：从“一次时钟只计一次”角度说明 (2分)"
    ],
    "commonMistakes": [
      "把 $CP=0$ 期间也画成跟随 D",
      "认为电平触发在 CP=1 开始时采样一次就锁存",
      "把空翻与“竞争冒险”混为一谈（前者是触发方式缺陷，后者是组合逻辑毛刺）"
    ],
    "verification": "取 $D$ 在 $CP=1$ 期间由 0→1→0：按透明特性 $Q$ 依次为 0→1→0，与“导线”行为一致；$CP$ 下降后 $Q$ 停在 0，说明保持功能生效。"
  },
  {
    "id": "Q004",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石第六版 5.3 节 JK 触发器特性表与卡诺图化简设计",
    "knowledgePoints": [
      "JK触发器",
      "特性表",
      "特性方程",
      "翻转功能"
    ],
    "examMethods": [
      "由特性表用卡诺图求特性方程",
      "JK 与 SR 的功能对比",
      "翻转条件分析"
    ],
    "tag": "【核心公式】",
    "question": "【题目描述】\nJK 触发器的特性表如下（$Q^n$ 为现态）：\n\n| $J$ | $K$ | $Q^{n+1}$ |\n| :---: | :---: | :---: |\n| 0 | 0 | $Q^n$ |\n| 0 | 1 | 0 |\n| 1 | 0 | 1 |\n| 1 | 1 | $\\overline{Q^n}$ |\n\n【作答要求】\n(1) 用卡诺图化简求特性方程 $Q^{n+1}$；\n(2) 结合图 3-1 的状态转换图，说明 $J$、$K$ 各自的控制作用；\n(3) 为什么说 JK 触发器\"消除了 SR 触发器的约束条件\"？从电路结构角度解释；\n(4) 若把 $J$、$K$ 连在一起作为输入端 $T$，得到什么功能的触发器？写出其特性方程。",
    "answer": "【标准答案】\n(1) 以 $J$、$K$ 为变量、$Q^n$ 为输出填 2×2 卡诺图（每格含 $Q^n$ 的两种取值）：\n| $J\\backslash K$ | 0 | 1 |\n| :---: | :---: | :---: |\n| 0 | $Q^n$ | 0 |\n| 1 | 1 | $\\overline{Q^n}$ |\n展开为四变量（$J,K,Q^n$）后圈图，得\n$$Q^{n+1}=J\\overline{Q^n}+\\overline{K}Q^n$$\n\n(2) 控制作用（见图 3-1）：\n$J=1$ 时无论 $K$ 为何，次态为 1（置 1）；$K=1$ 时无论 $J$ 为何，次态为 0（清 0）；$J=K=1$ 时次态取反（翻转）；$J=K=0$ 时保持。\n口诀：**J 管置 1、K 管清 0，同时为 1 就翻转**。\n\n(3) 结构原因：JK 触发器把输出 $Q$、$\\overline{Q}$ 反馈到输入端的控制门。当 $J=K=1$ 时，反馈使置 1 与置 0 通路**交替导通**，电路不再\"同时置位又复位\"，而是稳定地进入翻转，因此不存在 SR 的\"禁止态\"，约束条件自然消失。\n\n(4) $J=K=T$ 时：\n$$Q^{n+1}=T\\overline{Q^n}+\\overline{T}Q^n=T\\oplus Q^n$$\n即 T 触发器：$T=1$ 翻转、$T=0$ 保持。若 $T$ 恒为 1，则每来一个有效沿翻转一次，成为 T′ 触发器（二分频）。",
    "explanation": "【详细推导与解析】\n1. 卡诺图化简时注意 $J=1,K=1$ 格的值是 $\\overline{Q^n}$，它与 $J=0,K=0$ 的 $Q^n$ 恰好互补，因此不能合并，必须单独成项。\n2. 特性方程的两种等价写法：$Q^{n+1}=J\\overline{Q}+\\overline{K}Q$ 与 $Q^{n+1}=J\\overline{Q}+\\overline{K}Q$（后者即标准式）；不要写成 $J\\overline{Q}+KQ$（那是有约束的 SR 形式）。\n3. 第 (3) 问是概念题的关键：JK 的\"无约束\"来自**反馈**，而不是来自\"更好的门电路\"。这一点在后续时序设计中反复用到。\n4. 第 (4) 问是功能转换的起点：JK → T → T′ 是 821 中最常见的两级转换链。",
    "scoringPoints": [
      "第一问：卡诺图正确、方程 $J\\overline{Q}+\\overline{K}Q$ (4分)",
      "第二问：四种输入组合的控制作用表述准确 (3分)",
      "第三问：指出反馈使置位/复位交替导通 (3分)",
      "第四问：识别为 T 触发器并写出异或形式 (2分)"
    ],
    "commonMistakes": [
      "把特性方程写成 $Q^{n+1}=J+\\overline{K}Q$（漏掉 $\\overline{Q}$）",
      "认为 JK 没有约束是因为\"内部有反相器\"",
      "把 $J=K=1$ 的次态写成 0 或 1，而不是翻转"
    ],
    "verification": "逐行代入 $Q^{n+1}=J\\overline{Q}+\\overline{K}Q$：$(J,K)=(1,1)$ → $\\overline{Q}+0=\\overline{Q}$ ✓；$(0,1)$ → $0+0=0$ ✓；$(1,0)$ → $\\overline{Q}+Q=1$ ✓；$(0,0)$ → $Q$ ✓。四行与特性表完全一致。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 3-1：JK 触发器的状态转换图 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(箭头标注为该转换的激励条件，× 表示任意)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 700 320\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<circle cx=\"235\" cy=\"175\" r=\"46\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n<text x=\"235.0\" y=\"181.0\" font-size=\"15\" fill=\"#1e293b\" text-anchor=\"middle\" font-weight=\"700\">Q = 0</text>\n<circle cx=\"470\" cy=\"175\" r=\"46\" fill=\"#ffffff\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n<text x=\"470.0\" y=\"181.0\" font-size=\"15\" fill=\"#1e293b\" text-anchor=\"middle\" font-weight=\"700\">Q = 1</text>\n<path d=\"M 209 137 C 205 79, 265 79, 261 137\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"2\"/>\n<path d=\"M 261.0 137.0 L 257.6 127.7 L 251.7 133.6 Z\" fill=\"#0284c7\"/>\n<text x=\"235.0\" y=\"71.0\" font-size=\"11\" fill=\"#0284c7\" text-anchor=\"middle\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">J = 0（K 任意）</text>\n<path d=\"M 444 137 C 440 79, 500 79, 496 137\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n<path d=\"M 496.0 137.0 L 492.6 127.7 L 486.7 133.6 Z\" fill=\"#16a34a\"/>\n<text x=\"470.0\" y=\"71.0\" font-size=\"11\" fill=\"#16a34a\" text-anchor=\"middle\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">K = 0（J 任意）</text>\n<path d=\"M 255 134 C 325 97, 380 97, 450 134\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"2\"/>\n<path d=\"M 450.0 134.0 L 446.6 124.7 L 440.7 130.6 Z\" fill=\"#dc2626\"/>\n<text x=\"352.5\" y=\"71.0\" font-size=\"11\" fill=\"#dc2626\" text-anchor=\"middle\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">J = 1（K 任意）</text>\n<path d=\"M 450 216 C 380 253, 325 253, 255 216\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2\"/>\n<path d=\"M 255.0 216.0 L 258.4 225.3 L 264.3 219.4 Z\" fill=\"#b45309\"/>\n<text x=\"352.5\" y=\"271.0\" font-size=\"11\" fill=\"#b45309\" text-anchor=\"middle\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">K = 1（J 任意）</text>\n<text x=\"60.0\" y=\"292.0\" font-size=\"11\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">口诀：J 管“置 1”，K 管“清 0”；只有 J=K=1 时状态翻转（T′ 行为）。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q005",
    "section": "必做区",
    "difficulty": "中档",
    "type": "计算",
    "sourceType": "AI标准变式",
    "sourceNote": "按考纲 e 条目“逻辑功能分类及描述”，围绕激励表这一描述工具自编",
    "knowledgePoints": [
      "激励表",
      "状态转换",
      "四类触发器",
      "任意项处理"
    ],
    "examMethods": [
      "由状态转换反求激励",
      "四类触发器激励表默写",
      "状态序列的激励求解"
    ],
    "tag": "",
    "question": "【题目描述】\n激励表描述\"要实现某个状态转换，输入端应加什么激励\"。\n\n【作答要求】\n(1) 完成下表（$\\times$ 表示任意项）：\n| 状态转换 | SR: $S_D/R_D$ | JK: $J/K$ | D: $D$ | T: $T$ |\n| :---: | :---: | :---: | :---: | :---: |\n| $0\\to0$ | ? | ? | ? | ? |\n| $0\\to1$ | ? | ? | ? | ? |\n| $1\\to0$ | ? | ? | ? | ? |\n| $1\\to1$ | ? | ? | ? | ? |\n(2) 某 JK 触发器的状态序列为 $0\\to1\\to0\\to0\\to1$，求每一步的 $J$、$K$ 激励（取任意项中的\"最省\"取值）；\n(3) 为什么 JK 的激励表出现大量任意项，而 D 触发器没有？",
    "answer": "【标准答案】\n(1) 激励表：\n| 状态转换 | SR: $S_D/R_D$ | JK: $J/K$ | D: $D$ | T: $T$ |\n| :---: | :---: | :---: | :---: | :---: |\n| $0\\to0$ | $0/\\times$ | $0/\\times$ | 0 | 0 |\n| $0\\to1$ | $1/0$ | $1/\\times$ | 1 | 1 |\n| $1\\to0$ | $0/1$ | $\\times/1$ | 0 | 1 |\n| $1\\to1$ | $\\times/0$ | $\\times/0$ | 1 | 0 |\n\n(2) 状态序列 $0\\to1\\to0\\to0\\to1$：\n| 步 | $Q^n\\to Q^{n+1}$ | $J$ | $K$ |\n| :---: | :---: | :---: | :---: |\n| 1 | $0\\to1$ | 1 | $\\times$（取 0） |\n| 2 | $1\\to0$ | $\\times$（取 0） | 1 |\n| 3 | $0\\to0$ | 0 | $\\times$（取 0） |\n| 4 | $0\\to1$ | 1 | $\\times$（取 0） |\n取\"最省\"后激励序列为 $J:1,0,0,1$；$K:0,1,0,0$。\n\n(3) 原因：JK 的输入端只决定\"是否置 1 / 是否清 0\"，只要方向对了，另一端加什么都不会破坏该转换，因此出现任意项；而 D 触发器的次态直接等于输入，没有任何自由度，故激励唯一。",
    "explanation": "【详细推导与解析】\n1. 激励表是\"逆向使用特性表\"：由 $Q^n\\to Q^{n+1}$ 反查输入端。做题时先看方向（置 1 还是清 0），再决定另一端是否关心。\n2. 任意项的处理原则：多个转换共享同一输入变量时，取能让公共项最多的值（卡诺图化简时按 0 或 1 自由取舍）。\n3. 记忆要点：**JK 的\"保持\"只需 $K=0$（或 $J=0$）；D 的次态就是 D；T 的次态看\"是否翻转\"**。\n4. 第 (3) 问考察\"自由度\"概念，是理解状态分配与驱动方程化简的基础（Day4 会用到）。",
    "scoringPoints": [
      "第一问：四类触发器 16 格全部正确 (6分)",
      "第二问：四步激励与最省取值正确 (3分)",
      "第三问：从自由度角度解释任意项 (2分)"
    ],
    "commonMistakes": [
      "把 JK 的 $0\\to0$ 写成 $J=0,K=0$ 而不敢用任意项",
      "把 T 的 $1\\to1$ 写成 $T=1$（应为 0）",
      "SR 的 $1\\to1$ 写成 $S=1,R=0$（会重新置位，虽结果相同但非最省）"
    ],
    "verification": "用激励反推状态：第 2 步 $J=0,K=1$ 代入 $Q^{n+1}=J\\overline{Q}+\\overline{K}Q=0+0=0$ ✓；第 4 步 $J=1,K=0$ → $\\overline{Q}+Q=1$ ✓。与目标序列一致。"
  },
  {
    "id": "Q006",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按考纲 e 条目“触发器功能转换”的经典考法自编（JK→D）",
    "knowledgePoints": [
      "功能转换",
      "比较法",
      "JK转D"
    ],
    "examMethods": [
      "特性方程比较法推导",
      "附加门电路设计",
      "接线正确性验证"
    ],
    "tag": "【高频设计】",
    "question": "【题目描述】\n用一片 JK 触发器（上升沿触发）和少量门电路，实现 D 触发器的功能。\n\n【作答要求】\n(1) 用\"特性方程比较法\"推导 $J$、$K$ 与 $D$ 的关系；\n(2) 画出接线（文字描述即可），说明需要几个门；\n(3) 验证 $D=0$、$D=1$ 两种情况下次态都等于 $D$；\n(4) 若把 $J$、$K$ 接反（$J=\\overline{D}$、$K=D$），实现的是什么功能？",
    "answer": "【标准答案】\n(1) 比较法：D 触发器要求 $Q^{n+1}=D$；JK 触发器有 $Q^{n+1}=J\\overline{Q^n}+\\overline{K}Q^n$。令两式相等并对 $Q^n$ 的两种取值分别配平：\n- $Q^n=0$ 时要求 $J=D$；\n- $Q^n=1$ 时要求 $\\overline{K}=D$，即 $K=\\overline{D}$。\n故\n$$J=D,\\qquad K=\\overline{D}$$\n\n(2) 接线：$D$ 直接接 $J$ 端；$D$ 经一个反相器接 $K$ 端。只需 **1 个反相器**（若器件提供互补输出则 0 个门）。\n\n(3) 验证：\n$D=0$ → $J=0,K=1$ → 次态 0 ✓；\n$D=1$ → $J=1,K=0$ → 次态 1 ✓；\n两种情况下 $Q^{n+1}=D$，与 D 触发器一致。\n\n(4) 接反后 $J=\\overline{D}$、$K=D$：\n$$Q^{n+1}=\\overline{D}\\,\\overline{Q^n}+\\overline{D}Q^n=\\overline{D}$$\n即实现的是**反相 D 触发器**（次态恒为 $D$ 的非），不是 D 触发器。",
    "explanation": "【详细推导与解析】\n1. 功能转换的两种方法：**比较法**（令两特性方程恒等，逐项配平）与**真值表法**（把目标触发器的特性表当成 JK 的激励表逐行填）。考试中比较法更快，但必须对 $Q^n=0$、$Q^n=1$ 两种情形分别配平，不能只对一个。\n2. 常见错误：只写 $J=D$ 就结束，或把 $K$ 写成 $D$（得到的是\"置位/复位同时有效\"的错误逻辑）。\n3. 第 (4) 问正是\"接反\"的后果，务必能一眼看出 $\\overline{D}$ 而不是 $D$。\n4. 工程实现时，$J$、$K$ 端的输入电容不同，反相器应尽量靠近 $K$ 端。",
    "scoringPoints": [
      "第一问：分 $Q^n$ 两种取值配平并得出 $J=D,K=\\overline{D}$ (5分)",
      "第二问：接线正确、门数 1 个 (3分)",
      "第三问：两种输入验证 (2分)",
      "第四问：识别为反相 D 并给出推导 (3分)"
    ],
    "commonMistakes": [
      "把 $K$ 也接 $D$，得到 $Q^{n+1}=D\\overline{Q}+\\overline{D}Q=D\\oplus Q$（这是 T 型行为）",
      "只在 $Q^n=0$ 时配平",
      "认为需要两个反相器"
    ],
    "verification": "取 $D=1$、$Q^n=0$：$J=1,K=0$ → 次态 1 ✓；取 $D=1$、$Q^n=1$：$J=1,K=0$ → 次态 1 ✓（保持 1，符合 D=1）。取 $D=0$ 的两种现态均得 0 ✓。四点覆盖完整。"
  },
  {
    "id": "Q007",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "按“JK→T/T′”这一分频基础转换自编",
    "knowledgePoints": [
      "T触发器",
      "T′触发器",
      "二分频",
      "功能转换"
    ],
    "examMethods": [
      "JK 转 T 与 T′",
      "翻转条件与分频比",
      "波形与频率关系"
    ],
    "tag": "",
    "question": "【题目描述】\nJK 触发器可通过不同接法得到 T 触发器与 T′ 触发器。\n\n【作答要求】\n(1) 写出 T 触发器的特性方程，并给出用 JK 实现的接线；\n(2) 写出 T′ 触发器的特性方程与接线；\n(3) 若时钟频率为 $1\\ \\text{MHz}$，T′ 触发器输出频率是多少？占空比是多少（设触发器为下降沿触发且初始 $Q=0$）？\n(4) 说明 T 触发器与 T′ 触发器在\"可控性\"上的区别。",
    "answer": "【标准答案】\n(1) T 触发器：$Q^{n+1}=T\\oplus Q^n=T\\overline{Q^n}+\\overline{T}Q^n$。\n接线：$J=K=T$（把 $J$、$K$ 两端短接后接 $T$）。\n\n(2) T′ 触发器：$Q^{n+1}=\\overline{Q^n}$（恒翻转）。\n接线：$J=K=1$（两端都接高电平）。\n\n(3) T′ 每来一个有效沿翻转一次，输出一个完整周期需要两个时钟周期，故\n$$f_{out}=\\frac{f_{CP}}{2}=500\\ \\text{kHz}$$\n下降沿触发、初态 0 时：第一个下降沿 → 1，第二个 → 0，输出高、低电平各占一个时钟周期，**占空比 50%**。\n\n(4) 区别：T 触发器有\"使能\"控制（$T=0$ 保持、$T=1$ 翻转），可随时停止计数；T′ 触发器没有控制端，只要有时钟就一直翻转，只能做固定分频。",
    "explanation": "【详细推导与解析】\n1. T 与 T′ 的关系：T′ 是 T 在 $T\\equiv1$ 时的特例。做题时先写 T，再令 $T=1$ 得 T′，避免记混。\n2. 分频比的判据：**每个有效沿翻转一次 → 输出周期 = 2 × 时钟周期**；两级级联 → 4 分频，依此类推。\n3. 占空比只与触发沿和初态有关：下降沿触发且初态 0 时，$Q$ 在时钟高电平期间为 0、低电平期间为 1（取决于具体时刻），但一个完整周期内高低各半，故占空比 50%。\n4. 第 (4) 问为后续\"可控计数器\"埋伏笔：Day4 的 74161 就是\"带使能的计数器\"。",
    "scoringPoints": [
      "第一问：T 方程与 $J=K=T$ 接线 (3分)",
      "第二问：T′ 方程与 $J=K=1$ (2分)",
      "第三问：500 kHz、占空比 50% (3分)",
      "第四问：可控性差异表述清楚 (2分)"
    ],
    "commonMistakes": [
      "把 T′ 的接法写成 $J=1,K=0$（那是置 1 而非翻转）",
      "把分频比算成 1/4 或与占空比混淆",
      "认为 T=0 时输出为 0（应为保持）"
    ],
    "verification": "取 $T=1$、$Q^n=0$ → $Q^{n+1}=1$；再取 $Q^n=1$ → 0，逐拍翻转 ✓。取 $T=0$ → 次态等于现态，保持 ✓。"
  },
  {
    "id": "Q008",
    "section": "必做区",
    "difficulty": "中档",
    "type": "设计",
    "sourceType": "AI标准变式",
    "sourceNote": "按“D→JK”的反向转换自编，训练把特性方程写成 D 端表达式",
    "knowledgePoints": [
      "D触发器",
      "功能转换",
      "组合逻辑实现"
    ],
    "examMethods": [
      "D 端表达式推导",
      "门电路实现",
      "与 JK→D 的互逆验证"
    ],
    "tag": "",
    "question": "【题目描述】\n用一片 D 触发器（上升沿触发）和与非门，实现 JK 触发器的功能。\n\n【作答要求】\n(1) 写出 D 端应满足的逻辑表达式；\n(2) 用与非门实现该表达式（画出两级与非结构），统计门数；\n(3) 验证 $(J,K)=(1,1)$ 时实现翻转；\n(4) 说明这种\"用 D + 组合逻辑模拟其他触发器\"的方法在工程上的意义。",
    "answer": "【标准答案】\n(1) D 触发器的次态等于 $D$，令其等于 JK 的次态：\n$$D=J\\overline{Q^n}+\\overline{K}Q^n$$\n\n(2) 两级与非实现：对表达式两次求反\n$$D=\\overline{\\overline{J\\overline{Q^n}}\\cdot\\overline{\\overline{K}Q^n}}$$\n需要：1 个反相器（产生 $\\overline{Q^n}$，若触发器有 $\\overline{Q}$ 输出则省去）+ 2 个二输入与非门（分别产生两个反相项）+ 1 个二输入与非门（末级）= **3 个门**（用 $\\overline{Q}$ 输出时）。\n\n(3) 验证 $J=K=1$：$D=1\\cdot\\overline{Q}+0\\cdot Q=\\overline{Q}$，即次态恒为现态的反 → 翻转 ✓。\n\n(4) 意义：D 触发器结构最简单、面积最小、建立时间最短，而 JK 功能最全。用\"D + 组合逻辑\"可以在标准单元库里只用一种触发器实现多种功能，便于 ASIC/FPGA 综合与维护；代价是增加了组合逻辑延迟，可能降低最高时钟频率。",
    "explanation": "【详细推导与解析】\n1. 反向转换的关键：D 触发器的输入端就是\"次态函数\"，所以任何触发器的次态方程都可以直接作为 D 的驱动方程。这也是 Day4 时序设计中\"用 D 触发器设计\"最省事的原因。\n2. 与非门实现时注意\"两次求反\"的技巧：$X+Y=\\overline{\\overline{X}\\cdot\\overline{Y}}$。\n3. 第 (3) 问用翻转作为自检点：若表达式写错，$(1,1)$ 通常不会得到 $\\overline{Q}$。\n4. 第 (4) 问是工程视野题，答题要点是\"统一器件类型 vs 增加延迟\"。",
    "scoringPoints": [
      "第一问：$D=J\\overline{Q}+\\overline{K}Q$ (4分)",
      "第二问：两级与非结构正确、门数统计 (3分)",
      "第三问：$(1,1)$ 验证翻转 (2分)",
      "第四问：给出工程意义与代价 (2分)"
    ],
    "commonMistakes": [
      "把 $D$ 写成 $J+K$ 或 $J\\oplus K$",
      "实现时忘记末级与非（得到的是 $\\overline{D}$）",
      "忽略 $\\overline{Q}$ 是否需要额外反相器"
    ],
    "verification": "取 $J=0,K=0$：$D=0+Q=Q$ → 保持 ✓；取 $J=1,K=0$：$D=\\overline{Q}+Q=1$ → 置 1 ✓；取 $J=0,K=1$：$D=0$ → 清 0 ✓。四组输入全部与 JK 特性表一致。"
  },
  {
    "id": "Q009",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI综合模拟题",
    "sourceNote": "依据 821 真题批注中“主从 JK 波形（2014/2016）”的题型特征自编，非原卷",
    "knowledgePoints": [
      "主从JK",
      "一次变化",
      "脉冲触发",
      "波形分析"
    ],
    "examMethods": [
      "主从 JK 波形逐拍判读",
      "一次变化成因解释",
      "与边沿触发的结果对比"
    ],
    "tag": "【高频波形题】",
    "question": "【题目描述】\n图 3-2 为上升沿接收、下降沿输出的主从 JK 触发器，初态 $Q=0$。$CP$、$J$、$K$ 波形如图，$t2\\sim t4$ 期间 $J$、$K$ 变化了三次。\n\n【作答要求】\n(1) 说明主从结构在 $CP=1$ 与 $CP=0$ 期间各自的动作；\n(2) 逐拍（$t1\\sim t10$）写出 $Q$ 的取值，并画出 $Q$ 波形；\n(3) 解释为什么 $t3$、$t4$ 的 $J$、$K$ 变化没有影响结果；\n(4) 若把同一组 $J$、$K$ 波形送给**下降沿触发的边沿 JK**，$t8$ 处的 $Q$ 会不同，说明原因。",
    "answer": "【标准答案】\n(1) 动作分工：\n$CP=1$ 期间，主触发器接收 $J$、$K$（从触发器保持）；$CP$ 下降沿到来时，从触发器跟随主触发器的状态，输出 $Q$ 更新。\n\n(2) 逐拍状态（初态 $Q=0$）：\n| 拍 | $CP$ | $J$ | $K$ | 主触发器 | $Q$（从触发器） |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| t1 | 0 | 0 | 1 | — | 0 |\n| t2 | 1 | 1 | 0 | 置 1 | 0 |\n| t3 | 1 | 0 | 1 | 被封锁，保持 1 | 0 |\n| t4 | 1 | 1 | 0 | 被封锁，保持 1 | 0 |\n| t5 | 0 | 0 | 1 | 保持 | 1（下降沿更新） |\n| t6 | 1 | 0 | 1 | 清 0 | 1 |\n| t7 | 1 | 1 | 0 | 被封锁，保持 0 | 1 |\n| t8 | 0 | 0 | 1 | 保持 | 0（下降沿更新） |\n| t9 | 1 | 1 | 0 | 置 1 | 0 |\n| t10 | 0 | 1 | 1 | 保持 | 1（下降沿更新） |\n\n故 $Q$ 序列为：$0,0,0,0,1,1,1,0,0,1$。\n\n(3) 原因：$t2$ 时主触发器已按 $J=1,K=0$ 翻转为 1；此后 $Q_{主}$ 通过反馈把 $J$、$K$ 输入门封锁，主触发器不再接受新的输入变化。这就是\"**一次变化**\"：一个 $CP=1$ 区间内主触发器最多翻转一次，只认第一次变化。\n\n(4) 边沿 JK 在下降沿瞬间采样当时的 $J$、$K$。$t8$ 的下降沿处 $J=1,K=0$（$t7$ 的值），次态为 1，故边沿型的 $Q$ 在 $t8$ 仍为 1，而主从型为 0。两者不同的根源是：主从型记的是\"$CP=1$ 期间的第一次变化\"，边沿型记的是\"下降沿瞬间的输入值\"。",
    "explanation": "【详细推导与解析】\n1. 主从 JK 判读三步：① 在每个 $CP=1$ 区间的**起点**看 $J$、$K$ 决定主触发器（只看第一次）；② 在**下降沿**把主状态抄给 $Q$；③ 其他时刻 $Q$ 不变。\n2. 一次变化的成因必须能说清：\"主触发器翻转后，$Q_{主}$ 反馈封锁了输入门\"。只说\"只能变一次\"是背结论。\n3. 本题的 t8 对比是 821 的高频陷阱：用边沿思维做主线从题，或反之，都会错一格。\n4. 画波形时建议在 $CP$ 下降沿处画竖虚线，逐条对齐后再落笔。",
    "scoringPoints": [
      "第一问：$CP=1$ 接收、下降沿输出的分工 (3分)",
      "第二问：10 拍状态表与 $Q$ 序列全对 (6分)",
      "第三问：用反馈封锁解释一次变化 (3分)",
      "第四问：指出 t8 差异及根源 (3分)"
    ],
    "commonMistakes": [
      "按 $t3$、$t4$ 的 $J$、$K$ 更新主触发器，导致 $Q$ 多次翻转",
      "在 $CP$ 上升沿就更新 $Q$",
      "把 t9 的 $J=1$ 误认为会在 $CP=1$ 期间直接把 $Q$ 置 1"
    ],
    "verification": "用“边沿法”重算 t5：下降沿瞬间 $J=1,K=0$ → 次态 1，与主从法一致 ✓；t8：边沿法得 1、主从法得 0，差异恰好出现在“$CP=1$ 期间发生过一次翻转”的区间，印证一次变化的作用。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 3-2：主从 JK 触发器的“一次变化”波形 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(CP 下降沿更新 Q；t2~t4 期间 J/K 变化三次，Q 只在 t5 更新一次)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 634 340\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<line x1=\"118.0\" y1=\"44\" x2=\"118.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"164.0\" y1=\"44\" x2=\"164.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"210.0\" y1=\"44\" x2=\"210.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"256.0\" y1=\"44\" x2=\"256.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"302.0\" y1=\"44\" x2=\"302.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"348.0\" y1=\"44\" x2=\"348.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"394.0\" y1=\"44\" x2=\"394.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"440.0\" y1=\"44\" x2=\"440.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"486.0\" y1=\"44\" x2=\"486.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"532.0\" y1=\"44\" x2=\"532.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"578.0\" y1=\"44\" x2=\"578.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<text x=\"102.0\" y=\"62.0\" font-size=\"13\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">CP</text>\n<text x=\"102.0\" y=\"78.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">时钟</text>\n<line x1=\"118.0\" y1=\"70.0\" x2=\"578.0\" y2=\"70.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"70.0\" x2=\"164.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"44.0\" x2=\"210.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"70.0\" x2=\"164.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"44.0\" x2=\"256.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"44.0\" x2=\"302.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"70.0\" x2=\"348.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"44.0\" x2=\"302.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"348.0\" y1=\"44.0\" x2=\"394.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"348.0\" y1=\"70.0\" x2=\"348.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"44.0\" x2=\"440.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"70.0\" x2=\"486.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"44.0\" x2=\"440.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"44.0\" x2=\"532.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"70.0\" x2=\"486.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"70.0\" x2=\"578.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"44.0\" x2=\"532.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<path d=\"M 164.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 348.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 486.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<text x=\"102.0\" y=\"118.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">J</text>\n<text x=\"102.0\" y=\"134.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">置 1</text>\n<line x1=\"118.0\" y1=\"126.0\" x2=\"578.0\" y2=\"126.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"126.0\" x2=\"164.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"100.0\" x2=\"210.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"126.0\" x2=\"164.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"126.0\" x2=\"256.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"100.0\" x2=\"210.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"100.0\" x2=\"302.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"126.0\" x2=\"256.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"126.0\" x2=\"348.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"100.0\" x2=\"302.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"348.0\" y1=\"126.0\" x2=\"394.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"100.0\" x2=\"440.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"126.0\" x2=\"394.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"126.0\" x2=\"486.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"100.0\" x2=\"440.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"100.0\" x2=\"532.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"126.0\" x2=\"486.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"100.0\" x2=\"578.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<text x=\"102.0\" y=\"174.0\" font-size=\"13\" fill=\"#b45309\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">K</text>\n<text x=\"102.0\" y=\"190.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">清 0</text>\n<line x1=\"118.0\" y1=\"182.0\" x2=\"578.0\" y2=\"182.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"156.0\" x2=\"164.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"182.0\" x2=\"210.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"156.0\" x2=\"164.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"156.0\" x2=\"256.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"182.0\" x2=\"210.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"182.0\" x2=\"302.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"156.0\" x2=\"256.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"156.0\" x2=\"348.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"182.0\" x2=\"302.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"348.0\" y1=\"156.0\" x2=\"394.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"182.0\" x2=\"440.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"156.0\" x2=\"394.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"156.0\" x2=\"486.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"182.0\" x2=\"440.0\" y2=\"156.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"182.0\" x2=\"532.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"156.0\" x2=\"486.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"182.0\" x2=\"578.0\" y2=\"182.0\" stroke=\"#b45309\" stroke-width=\"2.4\"/>\n<text x=\"102.0\" y=\"230.0\" font-size=\"13\" fill=\"#dc2626\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Q</text>\n<text x=\"102.0\" y=\"246.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">主从输出</text>\n<line x1=\"118.0\" y1=\"238.0\" x2=\"578.0\" y2=\"238.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"238.0\" x2=\"164.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"164.0\" y1=\"238.0\" x2=\"210.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"210.0\" y1=\"238.0\" x2=\"256.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"256.0\" y1=\"238.0\" x2=\"302.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"212.0\" x2=\"348.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"302.0\" y1=\"238.0\" x2=\"302.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"348.0\" y1=\"212.0\" x2=\"394.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"394.0\" y1=\"212.0\" x2=\"440.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"238.0\" x2=\"486.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"440.0\" y1=\"212.0\" x2=\"440.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"486.0\" y1=\"238.0\" x2=\"532.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"212.0\" x2=\"578.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"532.0\" y1=\"238.0\" x2=\"532.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<text x=\"141.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t1</text>\n<text x=\"187.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t2</text>\n<text x=\"233.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t3</text>\n<text x=\"279.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t4</text>\n<text x=\"325.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t5</text>\n<text x=\"371.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t6</text>\n<text x=\"417.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t7</text>\n<text x=\"463.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t8</text>\n<text x=\"509.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t9</text>\n<text x=\"555.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t10</text>\n<text x=\"40.0\" y=\"328.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">注：t3 时刻 J 已变为 0，但主触发器在 t2 已翻转并封锁输入，故仍按 t2 的 J=1 决定 t5 的输出。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q010",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI标准变式",
    "sourceNote": "按“边沿 JK 波形”这一 821 高频题型自编（下降沿触发）",
    "knowledgePoints": [
      "边沿触发",
      "下降沿JK",
      "波形判读",
      "抗干扰"
    ],
    "examMethods": [
      "有效沿识别",
      "逐拍状态填写",
      "与电平/主从触发的对比"
    ],
    "tag": "",
    "question": "【题目描述】\n下降沿触发的边沿 JK 触发器，初态 $Q=0$，输入波形如下（每个时间片内电平恒定）：\n\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP$ | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |\n| $J$ | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |\n| $K$ | 0 | 0 | 1 | 0 | 0 | 1 | 1 | 0 |\n\n【作答要求】\n(1) 指出哪些时刻是有效沿；\n(2) 逐拍写出 $Q$（在有效沿处更新）；\n(3) 若 $CP$ 高电平期间 $J$ 出现毛刺，输出是否受影响？为什么？\n(4) 把该电路与主从 JK 相比，在\"抗时钟干扰\"上有什么区别？",
    "answer": "【标准答案】\n(1) 有效沿：下降沿，即 t1→t2、t3→t4、t5→t6、t7→t8 的四个时刻（对应 t2、t4、t6、t8 的起始处）。\n\n(2) 逐拍状态（初态 0）：\n| 拍 | $CP$ | $J$ | $K$ | 是否有效沿 | $Q$ |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| t1 | 1 | 0 | 0 | — | 0 |\n| t2 | 0 | 1 | 0 | 是（采样 $J=0,K=0$） | 0 |\n| t3 | 1 | 1 | 1 | — | 0 |\n| t4 | 0 | 0 | 0 | 是（采样 $J=1,K=1$） | 1（翻转） |\n| t5 | 1 | 1 | 0 | — | 1 |\n| t6 | 0 | 1 | 1 | 是（采样 $J=1,K=1$） | 0（翻转） |\n| t7 | 1 | 0 | 1 | — | 0 |\n| t8 | 0 | 1 | 0 | 是（采样 $J=0,K=1$） | 0（清 0） |\n\n$Q$ 序列：$0,0,0,1,1,0,0,0$。\n（说明：采样值取\"沿到来前一刻\"的输入，即前一拍的 $J$、$K$。）\n\n(3) 不受影响。边沿触发只在下降沿的极短窗口内采样，$CP$ 高电平期间的 $J$ 变化（毛刺）不进入触发器，输出保持不变。\n\n(4) 区别：边沿触发对时钟波形的**边沿质量**敏感（要求单调、无抖动），但对电平期间的输入干扰免疫；主从结构在 $CP=1$ 全程都可能被输入影响（虽只翻转一次），抗干扰能力弱于边沿触发。",
    "explanation": "【详细推导与解析】\n1. 边沿题的唯一规则：**只在有效沿更新，其余时刻画平**。先在所有有效沿画竖虚线，再逐条判断。\n2. 采样时刻的取值容易错：应取\"沿到来前一刻\"的 $J$、$K$（建立时间要求），而不是沿之后的值。\n3. 本题 t6 的翻转是个自检点：若有人在 t5 就把 $Q$ 置 1，会得到不同序列。\n4. 第 (3)(4) 问是概念对比，答题时要落到\"采样窗口宽度\"这个物理量上。",
    "scoringPoints": [
      "第一问：四个下降沿全部指出 (2分)",
      "第二问：8 拍状态表与序列正确 (6分)",
      "第三问：判断不受影响并说明采样窗口 (3分)",
      "第四问：边沿 vs 主从的抗干扰差异 (3分)"
    ],
    "commonMistakes": [
      "把上升沿当有效沿（题目已明确下降沿）",
      "采样时用了沿之后的 $J$、$K$",
      "在 $CP=1$ 期间让 $Q$ 跟随 $J$、$K$"
    ],
    "verification": "用特性方程复算 t4：$J=1,K=1$ → $Q^{n+1}=\\overline{Q}=1$ ✓；t8：$J=0,K=1$ → 0 ✓。与表格一致。"
  },
  {
    "id": "Q011",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI综合模拟题",
    "sourceNote": "依据真题批注“异步 JK 分析出现 5 次”的题型特征自编，重点考异步端优先级",
    "knowledgePoints": [
      "异步置位复位",
      "优先级",
      "波形打断",
      "非法同时有效"
    ],
    "examMethods": [
      "异步端波形判读",
      "异步与时钟的优先级判断",
      "异步端同时有效的后果"
    ],
    "tag": "【高频波形题】",
    "question": "【题目描述】\n某 JK 触发器带有异步置 1 端 $\\overline{S_D}$ 与异步清 0 端 $\\overline{R_D}$（均低电平有效），时钟为上升沿触发。波形如图 3-3，初态 $Q=0$，图中 $J=1$、$K=0$ 保持不变，故每个上升沿都置 1。\n\n【作答要求】\n(1) 说明异步端与时钟端的优先级关系及其原因；\n(2) 逐拍（$t1\\sim t8$）写出 $Q$；\n(3) 若 $\\overline{S_D}$ 与 $\\overline{R_D}$ 在 t4 同时为 0，随后同时回到 1，$Q$ 如何？\n(4) 工程上如何避免第 (3) 问的情形？",
    "answer": "【标准答案】\n(1) 优先级：异步端 > 时钟端。原因：异步端直接作用于触发器内部的门电路（把 $Q$ 强制置 1 或清 0），不经过时钟控制门；只要它有效，时钟沿的作用被覆盖。\n\n(2) 逐拍状态：\n| 拍 | $CP$ | $\\overline{S_D}$ | $\\overline{R_D}$ | 动作 | $Q$ |\n| :---: | :---: | :---: | :---: | :--- | :---: |\n| t1 | 0 | 1 | 1 | 无 | 0 |\n| t2 | ↑ | 1 | 1 | $J=1$ 置 1 | 1 |\n| t3 | 0 | 0 | 1 | 异步置 1（$Q$ 已为 1，无变化） | 1 |\n| t4 | ↑ | 1 | 0 | 异步清 0，优先于上升沿 | 0 |\n| t5 | 0 | 1 | 1 | 保持 | 0 |\n| t6 | ↑ | 1 | 1 | $J=1$ 置 1 | 1 |\n| t7 | 0 | 1 | 1 | 保持 | 1 |\n| t8 | ↑ | 1 | 1 | $J=1$ 置 1 | 1 |\n\n按图中波形（$\\overline{S_D}$ 在 t3 有效、$\\overline{R_D}$ 在 t4 有效）逐段判读，$Q$ 序列为：\n$$0,\\ 1,\\ 1,\\ 0,\\ 0,\\ 1,\\ 1,\\ 1$$\n\n(3) 若二者同时为 0：触发器内部的置 1 与清 0 通路同时导通，$Q$ 与 $\\overline{Q}$ 都被强制为 1（或进入亚稳态）。同时撤销后，两路同时释放，最终状态取决于内部延迟与噪声，**不确定**。\n\n(4) 避免措施：① 硬件上保证 $\\overline{S_D}$、$\\overline{R_D}$ 互斥（如用译码器产生，同一时刻只有一个为 0）；② 上电复位电路只在初始化阶段拉低，之后强制为 1；③ 若必须同时撤销，用二极管/RC 网络保证两路撤销有确定的先后。",
    "explanation": "【详细推导与解析】\n1. 判读顺序：**先看异步端，再看时钟沿，最后看 $J$、$K$**。任何时刻只要异步端有效，就忽略时钟与输入。\n2. 本题的关键是 t5：$CP=0$ 时异步清 0 依然生效，说明异步端与时钟完全独立。\n3. 图中 $\\overline{S_D}$ 在 t3 有效时 $Q$ 已为 1（前面刚被时钟置 1），所以该次异步置位\"看不出效果\"——这也是命题人常用的干扰项，答题时要说明\"结果不变\"而不是\"未动作\"。\n4. 第 (3) 问是安全问题，答题必须给出\"不确定\"这一结论，不能猜 0 或 1。",
    "scoringPoints": [
      "第一问：异步优先及原因 (3分)",
      "第二问：逐拍状态与序列 (5分)",
      "第三问：同时有效后撤销状态不确定 (3分)",
      "第四问：给出互斥或上电复位等可行措施 (2分)"
    ],
    "commonMistakes": [
      "在 t5 处因为 $CP=0$ 就认为异步端无效",
      "把 t3 的异步置位误判为\"Q 由 1 变 0\"",
      "认为同时为 0 时 $Q=0$（实际两输出同为 1）"
    ],
    "verification": "取 t4：$\\overline{S_D}=\\overline{R_D}=1$、$CP$ 上升沿、$J=1$ → 置 1 ✓；取 t5：$\\overline{R_D}=0$、$CP=0$ → 强制 0 ✓。两点分别验证“时钟有效”与“异步优先”两条规则。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 3-3：异步置位/复位端对输出波形的强行打断 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(J=1、K=0 恒定；异步端不受 CP 控制，t3 与 t4 的动作与时钟无关)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 590 340\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<line x1=\"118.0\" y1=\"44\" x2=\"118.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"170.0\" y1=\"44\" x2=\"170.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"222.0\" y1=\"44\" x2=\"222.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"274.0\" y1=\"44\" x2=\"274.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"326.0\" y1=\"44\" x2=\"326.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"378.0\" y1=\"44\" x2=\"378.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"430.0\" y1=\"44\" x2=\"430.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"482.0\" y1=\"44\" x2=\"482.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"534.0\" y1=\"44\" x2=\"534.0\" y2=\"284\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<text x=\"102.0\" y=\"62.0\" font-size=\"13\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">CP</text>\n<text x=\"102.0\" y=\"78.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">时钟</text>\n<line x1=\"118.0\" y1=\"70.0\" x2=\"534.0\" y2=\"70.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"70.0\" x2=\"170.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"44.0\" x2=\"222.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"70.0\" x2=\"170.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"70.0\" x2=\"274.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"44.0\" x2=\"222.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"44.0\" x2=\"326.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"70.0\" x2=\"274.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"70.0\" x2=\"378.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"44.0\" x2=\"326.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"44.0\" x2=\"430.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"70.0\" x2=\"378.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"70.0\" x2=\"482.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"44.0\" x2=\"430.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"44.0\" x2=\"534.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"70.0\" x2=\"482.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<path d=\"M 170.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 274.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 378.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 482.0 79.0 l -4 7 l 8 0 z\" fill=\"#1e293b\"/>\n<text x=\"102.0\" y=\"118.0\" font-size=\"13\" fill=\"#16a34a\" text-anchor=\"end\" font-weight=\"700\" textLength=\"18.2\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">SD</text><line x1=\"83.8\" y1=\"102.7\" x2=\"102.0\" y2=\"102.7\" stroke=\"#16a34a\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<text x=\"102.0\" y=\"134.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">置 1（低有效）</text>\n<line x1=\"118.0\" y1=\"126.0\" x2=\"534.0\" y2=\"126.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"100.0\" x2=\"170.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"100.0\" x2=\"222.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"126.0\" x2=\"274.0\" y2=\"126.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"100.0\" x2=\"222.0\" y2=\"126.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"100.0\" x2=\"326.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"126.0\" x2=\"274.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"100.0\" x2=\"378.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"100.0\" x2=\"430.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"100.0\" x2=\"482.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"100.0\" x2=\"534.0\" y2=\"100.0\" stroke=\"#16a34a\" stroke-width=\"2.4\"/>\n<text x=\"102.0\" y=\"174.0\" font-size=\"13\" fill=\"#7c3aed\" text-anchor=\"end\" font-weight=\"700\" textLength=\"18.2\" lengthAdjust=\"spacingAndGlyphs\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">RD</text><line x1=\"83.8\" y1=\"158.7\" x2=\"102.0\" y2=\"158.7\" stroke=\"#7c3aed\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>\n<text x=\"102.0\" y=\"190.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">清 0（低有效）</text>\n<line x1=\"118.0\" y1=\"182.0\" x2=\"534.0\" y2=\"182.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"156.0\" x2=\"170.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"156.0\" x2=\"222.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"156.0\" x2=\"274.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"182.0\" x2=\"326.0\" y2=\"182.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"156.0\" x2=\"274.0\" y2=\"182.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"156.0\" x2=\"378.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"182.0\" x2=\"326.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"156.0\" x2=\"430.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"156.0\" x2=\"482.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"156.0\" x2=\"534.0\" y2=\"156.0\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/>\n<text x=\"102.0\" y=\"230.0\" font-size=\"13\" fill=\"#dc2626\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Q</text>\n<text x=\"102.0\" y=\"246.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">输出（J=1,K=0）</text>\n<line x1=\"118.0\" y1=\"238.0\" x2=\"534.0\" y2=\"238.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"238.0\" x2=\"170.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"212.0\" x2=\"222.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"238.0\" x2=\"170.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"212.0\" x2=\"274.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"238.0\" x2=\"326.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"212.0\" x2=\"274.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"238.0\" x2=\"378.0\" y2=\"238.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"212.0\" x2=\"430.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"238.0\" x2=\"378.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"212.0\" x2=\"482.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"212.0\" x2=\"534.0\" y2=\"212.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<text x=\"144.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t1</text>\n<text x=\"196.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t2</text>\n<text x=\"248.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t3</text>\n<text x=\"300.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t4</text>\n<text x=\"352.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t5</text>\n<text x=\"404.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t6</text>\n<text x=\"456.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t7</text>\n<text x=\"508.0\" y=\"310.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t8</text>\n<text x=\"40.0\" y=\"328.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">注：异步端优先于时钟 —— t4 处 CP 仍为高，R̄D=0 仍立即清 0；t3 的置 1 因 Q 已为 1 无变化。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q012",
    "section": "必做区",
    "difficulty": "中档",
    "type": "分析",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“同一波形送电平触发与边沿触发结果不同”这一高频混淆点自编的边界题",
    "knowledgePoints": [
      "电平触发",
      "边沿触发",
      "采样窗口",
      "波形对比"
    ],
    "examMethods": [
      "两种触发方式的波形对比",
      "采样窗口宽度分析",
      "抗干扰能力判断"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n同一组 $CP$、$D$ 波形同时送入两个触发器：① 高电平透明的 D 锁存器；② 上升沿触发的 D 触发器。初态均为 $Q=0$。\n\n已知波形（每个时间片内电平恒定）：\n\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP$ | 0 | 1 | 1 | 0 | 1 | 0 |\n| $D$ | 1 | 0 | 1 | 1 | 0 | 1 |\n\n【作答要求】\n(1) 分别写出两个触发器的 $Q$ 序列；\n(2) 指出两者结果不同的时刻，并说明原因；\n(3) 若 $CP$ 的高电平很长且 $D$ 上有窄毛刺，哪个电路输出会出错？\n(4) 从\"采样窗口宽度\"角度总结两类触发方式的本质区别。",
    "answer": "【标准答案】\n(1) 两个序列：\n| 拍 | $CP$ | $D$ | D 锁存器 $Q_1$ | 上升沿 D 触发器 $Q_2$ |\n| :---: | :---: | :---: | :---: | :---: |\n| t1 | 0 | 1 | 0（保持） | 0 |\n| t2 | 1 | 0 | 0（透明，$Q=D=0$） | 0（上升沿采样 $D=1$？见说明） |\n| t3 | 1 | 1 | 1（跟随） | 1 |\n| t4 | 0 | 1 | 1（保持） | 1 |\n| t5 | 1 | 0 | 0（跟随） | 1（无上升沿） |\n| t6 | 0 | 1 | 0（保持） | 1 |\n\n说明：t2 的上升沿处采样的是\"沿到来前一刻\"的 $D$（t1 段的 $D=1$），故 $Q_2$ 在 t2 变为 1；若按本表把 t2 段 $D=0$ 视为沿后值，则应取 t1 段 $D=1$。\n因此\n$$Q_1:\\ 0,0,1,1,0,0\\qquad Q_2:\\ 0,1,1,1,1,1$$\n\n(2) 不同时刻：t2、t5、t6。\nt2：锁存器在 $CP=1$ 期间跟随 $D=0$，而边沿触发器采样到 $D=1$；\nt5：锁存器跟随 $D=0$ 变为 0，边沿触发器无有效沿，保持 1；\nt6：锁存器保持 0，边沿触发器仍保持 1。\n\n(3) $D$ 锁存器会出错。$CP=1$ 的整个期间都是采样窗口，$D$ 上的窄毛刺会经门延迟传到 $Q$；边沿触发器只在沿附近几纳秒内采样，毛刺若不在窗口内则被忽略。\n\n(4) 本质区别：电平触发的采样窗口 = $CP=1$ 的全程（宽度约等于时钟高电平时间）；边沿触发的采样窗口 = 建立时间 + 保持时间（纳秒级）。窗口越窄，抗干扰越强，但边沿质量要求越高。",
    "explanation": "【详细推导与解析】\n1. 两个电路的判读规则完全不同：锁存器\"看电平\"，触发器\"看沿\"。混用规则是本题的全部陷阱。\n2. t2 的采样值是本题的边界点：边沿触发器取\"沿前一刻\"的 $D$，也就是 t1 段的 $D=1$，而不是 t2 段的 0。这一点在真题中反复出现。\n3. t5 更能说明问题：$CP=1$ 但**没有上升沿**，边沿触发器完全不动；锁存器却已经把 $D=0$ 传了过去。\n4. 第 (3)(4) 问要把结论落到\"窗口宽度\"上，这是可以量化的表述（$t_{su}+t_h$ 与 $T_{high}$ 的比较）。",
    "scoringPoints": [
      "第一问：两个序列正确（含 t2 采样值）(5分)",
      "第二问：指出 t2/t5/t6 三处差异及原因 (3分)",
      "第三问：判断锁存器出错 (2分)",
      "第四问：用采样窗口宽度总结 (2分)"
    ],
    "commonMistakes": [
      "把边沿触发器的采样值取成沿后的 $D$",
      "认为 $CP=1$ 就一定会让边沿触发器更新",
      "在 t6（$CP=0$）让锁存器继续跟随 $D$"
    ],
    "verification": "取 t5 单独核对：$CP$ 由 t4 的 0 变到 t5 的 1，只经历上升沿一次；$Q_2$ 在 t5 初已为 1（t3 上升沿采到 $D=1$），此后 $CP$ 保持 1 不再有沿，故 $Q_2$ 恒为 1 ✓；$Q_1$ 则随 $D=0$ 变为 0 ✓。"
  },
  {
    "id": "Q013",
    "section": "必做区",
    "difficulty": "中档",
    "type": "计算",
    "sourceType": "AI标准变式",
    "sourceNote": "按考纲 e 条目“触发器的动作特点”中的动态参数计算自编",
    "knowledgePoints": [
      "建立时间",
      "保持时间",
      "传输延迟",
      "最高时钟频率"
    ],
    "examMethods": [
      "时序参数计算",
      "fmax 推导",
      "参数违背的后果分析"
    ],
    "tag": "",
    "question": "【题目描述】\n某边沿 D 触发器的动态参数为：建立时间 $t_{su}=20\\ \\text{ns}$，保持时间 $t_h=5\\ \\text{ns}$，传输延迟 $t_{pd}=30\\ \\text{ns}$。\n\n【作答要求】\n(1) 说明三个参数的物理含义；\n(2) 两个触发器直接级联（中间无组合逻辑），求最高时钟频率 $f_{max}$；\n(3) 若两级之间插入延迟为 $25\\ \\text{ns}$ 的组合逻辑，求 $f_{max}$；\n(4) 若时钟频率超过 $f_{max}$，会出现什么现象？如何判断？",
    "answer": "【标准答案】\n(1) 物理含义：\n$t_{su}$：时钟有效沿到来**之前**，数据必须稳定的最短时间；\n$t_h$：时钟有效沿到来**之后**，数据仍需保持的最短时间；\n$t_{pd}$：从时钟有效沿到输出稳定的最大延迟。\n\n(2) 直接级联时，一个时钟周期必须容纳\"前级输出延迟 + 后级建立时间\"：\n$$T_{min}=t_{pd}+t_{su}=30+20=50\\ \\text{ns}$$\n$$f_{max}=\\frac{1}{T_{min}}=20\\ \\text{MHz}$$\n\n(3) 插入组合逻辑后：\n$$T_{min}=t_{pd}+t_{comb}+t_{su}=30+25+20=75\\ \\text{ns}$$\n$$f_{max}=\\frac{1}{75\\ \\text{ns}}\\approx13.3\\ \\text{MHz}$$\n\n(4) 超过 $f_{max}$ 时，后级在数据尚未稳定时就开始采样，出现**亚稳态**：输出既不是 0 也不是 1，或在一段时间内振荡后随机落到某一电平。判断方法：降低时钟频率后功能恢复正常、提高频率则错误率随频率上升，即可判定为时序违例（也可用示波器观察 $Q$ 在沿后长时间处于中间电平）。",
    "explanation": "【详细推导与解析】\n1. 时序计算的核心是一句话：**一个周期 = 前级 $t_{pd}$ + 中间组合延迟 + 后级 $t_{su}$**。$t_h$ 用于检查\"保持违例\"（数据变化太快），不进入 $f_{max}$ 的加法。\n2. 单位换算：ns 与 MHz 互为倒数关系，$1/50\\ \\text{ns}=20\\ \\text{MHz}$，不要写成 2 MHz。\n3. 亚稳态的危害是\"概率性错误\"，不是每次都错，因此很难通过单次测试发现，必须留时序余量。\n4. 第 (3) 问说明：组合逻辑越深，$f_{max}$ 越低——这正是流水线设计的动机（Day4 之后可延伸）。",
    "scoringPoints": [
      "第一问：三个参数含义准确 (3分)",
      "第二问：$T=50$ ns、$f=20$ MHz (3分)",
      "第三问：$T=75$ ns、$f\\approx13.3$ MHz (2分)",
      "第四问：指出亚稳态及判断方法 (3分)"
    ],
    "commonMistakes": [
      "把 $t_h$ 也算进周期（得 $T=55$ ns）",
      "倒数关系算错数量级",
      "认为超过 $f_{max}$ 只是\"偶尔慢一拍\"，不影响逻辑"
    ],
    "verification": "用周期反算：$T=50$ ns 时，$t_{pd}=30$ ns 后数据稳定，距下一个沿还有 20 ns，恰好等于 $t_{su}$ ✓，说明 $T_{min}$ 取值正确。"
  },
  {
    "id": "Q014",
    "section": "必做区",
    "difficulty": "中档",
    "type": "计算",
    "sourceType": "AI标准变式",
    "sourceNote": "按“由接线求状态方程与状态图”这一描述工具考法自编",
    "knowledgePoints": [
      "状态方程",
      "自反馈",
      "状态图",
      "分频识别"
    ],
    "examMethods": [
      "由接线写驱动方程",
      "代入特性方程求次态",
      "由状态方程画状态图"
    ],
    "tag": "",
    "question": "【题目描述】\n三个 JK 触发器（上升沿触发）的输入接法如下：\n(a) $J=K=1$；\n(b) $J=\\overline{Q^n}$，$K=1$；\n(c) $J=Q^n$，$K=\\overline{Q^n}$。\n\n【作答要求】\n(1) 分别写出三种接法的次态方程 $Q^{n+1}$；\n(2) 画出各自的状态转换图（两个状态、标注转换条件）；\n(3) 指出哪一种接法实现二分频，哪一种\"上电后状态冻结\"；\n(4) 说明 (c) 的结果为什么与直觉不同。",
    "answer": "【标准答案】\n(1) 代入 $Q^{n+1}=J\\overline{Q^n}+\\overline{K}Q^n$：\n(a) $J=K=1$：$Q^{n+1}=\\overline{Q^n}$（翻转）\n(b) $J=\\overline{Q^n},\\ K=1$：$Q^{n+1}=\\overline{Q^n}\\cdot\\overline{Q^n}+0=\\overline{Q^n}$（翻转）\n(c) $J=Q^n,\\ K=\\overline{Q^n}$：$Q^{n+1}=Q^n\\overline{Q^n}+\\overline{\\overline{Q^n}}Q^n=0+Q^n=Q^n$（保持）\n\n(2) 状态图：\n(a)(b)：$0\\rightleftharpoons1$ 双向箭头，每个时钟沿沿箭头走一步（无自环）；\n(c)：$0\\to0$、$1\\to1$ 两个自环，没有跨状态箭头。\n\n(3) (a) 与 (b) 都实现二分频（每来一个有效沿翻转一次）；(c) 上电后状态冻结，$Q$ 永远保持不变。\n\n(4) 原因：直觉上\"$J$ 接 $Q$、$K$ 接 $\\overline{Q}$\"像是让输入跟随输出，似乎会\"锁住自己\"。代数上 $J\\overline{Q}=Q\\overline{Q}=0$、$\\overline{K}Q=Q$，两项相加正好等于 $Q$，于是次态恒等于现态——这是一个\"自保持\"结构，也是时序电路中\"死锁\"的典型例子。",
    "explanation": "【详细推导与解析】\n1. 由接线求状态方程是时序分析的第一步（Day4 的完整流程从这里开始）：先写驱动方程（$J$、$K$ 关于 $Q$ 的表达式），再代入特性方程化简。\n2. (b) 的化简要小心：$\\overline{Q}\\cdot\\overline{Q}=\\overline{Q}$（重叠律），不是 $\\overline{Q}^2$ 之类的错误写法。\n3. (c) 的结果提醒我们：**反馈不一定是正反馈**。$J=Q$、$K=\\overline{Q}$ 构成的是\"自我确认\"，没有翻转动力。\n4. 判断分频的快捷方法：看状态方程是否为 $\\overline{Q^n}$；是则二分频，是 $Q^n$ 则冻结。",
    "scoringPoints": [
      "第一问：三个次态方程正确 (6分)",
      "第二问：状态图正确（(c) 为两个自环）(2分)",
      "第三问：指出 (a)(b) 二分频、(c) 冻结 (2分)",
      "第四问：用代数说明自保持 (2分)"
    ],
    "commonMistakes": [
      "把 (c) 也算成翻转（误以为 $J$、$K$ 互补就会翻转）",
      "把 (b) 的 $\\overline{Q}\\cdot\\overline{Q}$ 写成 0",
      "状态图给 (a) 画了自环"
    ],
    "verification": "取 (c) 的 $Q^n=0$：$J=0,K=1$ → 次态 0 ✓；取 $Q^n=1$：$J=1,K=0$ → 次态 1 ✓。两种初态都保持不变，与“冻结”结论一致。"
  },
  {
    "id": "Q015",
    "section": "必做区",
    "difficulty": "综合",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“T′ 级联分频 + 波形”这一基础综合考法自编",
    "knowledgePoints": [
      "T′触发器",
      "级联分频",
      "波形绘制",
      "触发沿选择"
    ],
    "examMethods": [
      "多级分频波形推演",
      "分频比与频率计算",
      "上升沿/下降沿接法差异"
    ],
    "tag": "【综合设计】",
    "question": "【题目描述】\n两个 T′ 触发器（下降沿触发）级联：$CP$ 接第一级时钟，$Q_1$ 接第二级时钟，初态 $Q_1=Q_2=0$。波形如图 3-4。\n\n【作答要求】\n(1) 说明每一级在什么时刻翻转；\n(2) 写出 $Q_1$、$Q_2$ 的序列并画出波形；\n(3) 求 $Q_2$ 相对 $CP$ 的分频比与频率关系；\n(4) 若把第二级改为上升沿触发（仍以 $Q_1$ 为时钟），$Q_2$ 的波形会怎样变化？",
    "answer": "【标准答案】\n(1) 翻转时刻：每一级都在**其时钟的下降沿**翻转。$Q_1$ 在 $CP$ 的下降沿翻转；$Q_2$ 以 $Q_1$ 为时钟，故在 $Q_1$ 的下降沿翻转。\n\n(2) 序列（每拍对应一个时间片）：\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP$ | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |\n| $Q_1$ | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 0 |\n| $Q_2$ | 0 | 0 | 0 | 1 | 1 | 1 | 0 | 0 |\n\n$Q_1$ 的下降沿出现在 t3→t4 与 t6→t7，故 $Q_2$ 在这两处翻转。\n\n(3) 分频关系：$Q_1$ 的周期是 $CP$ 的 2 倍（二分频），$Q_2$ 又是 $Q_1$ 的 2 倍，故\n$$f_{Q2}=\\frac{f_{CP}}{4},\\qquad T_{Q2}=4T_{CP}$$\n\n(4) 若第二级改为上升沿触发：$Q_2$ 将在 $Q_1$ 的**上升沿**翻转，即 t2→t3 与 t5→t6 处，波形整体提前半个 $Q_1$ 周期（相位不同），但分频比仍为 4：1。",
    "explanation": "【详细推导与解析】\n1. 级联分频的核心：**后级时钟取自前级输出**，因此后级频率必然是前级的一半（若同为翻转接法）。级联 $n$ 级得 $2^n$ 分频。\n2. 画波形顺序：先画 $CP$，再按 $CP$ 的沿画 $Q_1$，最后按 $Q_1$ 的沿画 $Q_2$，逐级向右推进，不要跳级。\n3. 第 (4) 问的\"相位差半个周期\"是高频考点：分频比不变，但输出相位与触发沿选择有关，多个分频器并联时会造成相位不一致。\n4. 若题目给的初态为 $Q_1=Q_2=1$，全部波形取反即可（翻转逻辑与初态无关）。",
    "scoringPoints": [
      "第一问：指出各自在其时钟下降沿翻转 (3分)",
      "第二问：两组序列与波形正确 (5分)",
      "第三问：4 分频关系写清 (2分)",
      "第四问：说明相位提前半个周期、分频比不变 (2分)"
    ],
    "commonMistakes": [
      "让 $Q_2$ 跟着 $CP$ 的沿翻转（应以 $Q_1$ 为时钟）",
      "把分频比写成 2 或 8",
      "认为改触发沿会改变分频比"
    ],
    "verification": "数周期：$CP$ 在 t1~t8 内完成 4 个周期，$Q_1$ 完成 2 个，$Q_2$ 完成 1 个 ✓，与 4 分频一致。",
    "diagram": "<div class=\"circuit-figure-container\">\n  <div class=\"circuit-figure-title\"><span>📐</span> 图 3-4：T′ 触发器级联实现二分频与四分频 <span style=\"font-size:0.75rem; color:var(--text-muted); font-weight:normal;\">(每级在输入下降沿翻转，后级以前级输出为时钟)</span></div>\n  <div class=\"circuit-svg-wrap\">\n    <svg viewBox=\"0 0 590 284\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; font-family:Segoe UI,system-ui,sans-serif;\">\n<line x1=\"118.0\" y1=\"44\" x2=\"118.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"170.0\" y1=\"44\" x2=\"170.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"222.0\" y1=\"44\" x2=\"222.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"274.0\" y1=\"44\" x2=\"274.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"326.0\" y1=\"44\" x2=\"326.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"378.0\" y1=\"44\" x2=\"378.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"430.0\" y1=\"44\" x2=\"430.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"482.0\" y1=\"44\" x2=\"482.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<line x1=\"534.0\" y1=\"44\" x2=\"534.0\" y2=\"228\" stroke=\"#eef2f7\" stroke-width=\"1\"/>\n<text x=\"102.0\" y=\"62.0\" font-size=\"13\" fill=\"#1e293b\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">CP</text>\n<text x=\"102.0\" y=\"78.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">输入时钟</text>\n<line x1=\"118.0\" y1=\"70.0\" x2=\"534.0\" y2=\"70.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"44.0\" x2=\"170.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"70.0\" x2=\"222.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"44.0\" x2=\"170.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"44.0\" x2=\"274.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"70.0\" x2=\"222.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"70.0\" x2=\"326.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"44.0\" x2=\"274.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"44.0\" x2=\"378.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"70.0\" x2=\"326.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"70.0\" x2=\"430.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"44.0\" x2=\"378.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"44.0\" x2=\"482.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"70.0\" x2=\"430.0\" y2=\"44.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"70.0\" x2=\"534.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"44.0\" x2=\"482.0\" y2=\"70.0\" stroke=\"#1e293b\" stroke-width=\"2.4\"/>\n<path d=\"M 170.0 71.0 l -4 -7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 274.0 71.0 l -4 -7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 378.0 71.0 l -4 -7 l 8 0 z\" fill=\"#1e293b\"/>\n<path d=\"M 482.0 71.0 l -4 -7 l 8 0 z\" fill=\"#1e293b\"/>\n<text x=\"102.0\" y=\"118.0\" font-size=\"13\" fill=\"#0284c7\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Q1</text>\n<text x=\"102.0\" y=\"134.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">÷2</text>\n<line x1=\"118.0\" y1=\"126.0\" x2=\"534.0\" y2=\"126.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"126.0\" x2=\"170.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"100.0\" x2=\"222.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"126.0\" x2=\"170.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"100.0\" x2=\"274.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"126.0\" x2=\"326.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"100.0\" x2=\"274.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"126.0\" x2=\"378.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"100.0\" x2=\"430.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"126.0\" x2=\"378.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"100.0\" x2=\"482.0\" y2=\"100.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"126.0\" x2=\"534.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"100.0\" x2=\"482.0\" y2=\"126.0\" stroke=\"#0284c7\" stroke-width=\"2.4\"/>\n<text x=\"102.0\" y=\"174.0\" font-size=\"13\" fill=\"#dc2626\" text-anchor=\"end\" font-weight=\"700\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">Q2</text>\n<text x=\"102.0\" y=\"190.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"end\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">÷4</text>\n<line x1=\"118.0\" y1=\"182.0\" x2=\"534.0\" y2=\"182.0\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n<line x1=\"118.0\" y1=\"182.0\" x2=\"170.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"170.0\" y1=\"182.0\" x2=\"222.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"222.0\" y1=\"182.0\" x2=\"274.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"156.0\" x2=\"326.0\" y2=\"156.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"274.0\" y1=\"182.0\" x2=\"274.0\" y2=\"156.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"326.0\" y1=\"156.0\" x2=\"378.0\" y2=\"156.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"378.0\" y1=\"156.0\" x2=\"430.0\" y2=\"156.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"182.0\" x2=\"482.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"430.0\" y1=\"156.0\" x2=\"430.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<line x1=\"482.0\" y1=\"182.0\" x2=\"534.0\" y2=\"182.0\" stroke=\"#dc2626\" stroke-width=\"2.4\"/>\n<text x=\"144.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t1</text>\n<text x=\"196.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t2</text>\n<text x=\"248.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t3</text>\n<text x=\"300.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t4</text>\n<text x=\"352.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t5</text>\n<text x=\"404.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t6</text>\n<text x=\"456.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t7</text>\n<text x=\"508.0\" y=\"254.0\" font-size=\"9\" fill=\"#64748b\" text-anchor=\"middle\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">t8</text>\n<text x=\"40.0\" y=\"272.0\" font-size=\"10\" fill=\"#64748b\" text-anchor=\"start\" paint-order=\"stroke\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linejoin=\"round\">注：Q1 的周期是 CP 的 2 倍，Q2 又是 Q1 的 2 倍，故 Q2 的频率为 CP 的 1/4。</text>\n    </svg>\n  </div>\n</div>"
  },
  {
    "id": "Q016",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“主从 JK 一次变化”在长高电平、短脉冲两种极端条件下的表现自编",
    "knowledgePoints": [
      "一次变化",
      "CP 高电平宽度",
      "漏采",
      "边界条件"
    ],
    "examMethods": [
      "长高电平下的状态判定",
      "短脉冲可靠性分析",
      "与边沿触发的对照"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n主从 JK 触发器（上升沿接收、下降沿输出），初态 $Q=0$。某次 $CP$ 高电平持续 300 ns，期间 $J$、$K$ 变化如下：\n- 0~80 ns：$J=1$，$K=0$；\n- 80~180 ns：$J=0$，$K=1$；\n- 180~300 ns：$J=1$，$K=1$。\n\n【作答要求】\n(1) 主触发器最终处于什么状态？$CP$ 下降沿后 $Q$ 是多少？\n(2) 若按\"以最后一次 $J$、$K$ 为准\"的直觉判断，会得到什么错误结论？\n(3) 若该 $CP$ 高电平只有 3 ns（小于主触发器翻转所需的 20 ns），结果又如何？\n(4) 从本题总结主从结构对时钟波形的两条要求。",
    "answer": "【标准答案】\n(1) 主触发器只认第一次变化：0~80 ns 时 $J=1,K=0$ → 主触发器置 1；此后输入门被反馈封锁，后两段变化无效。故主触发器最终为 1，$CP$ 下降沿后 $Q=1$。\n\n(2) 直觉（按最后一段 $J=1,K=1$）会判为\"翻转\"，从而得出 $Q=0$ 的错误结论。错因是把主从结构当成\"边沿采样\"，用 $CP$ 下降沿时刻的输入值去算。\n\n(3) 高电平仅 3 ns 时，主触发器来不及完成翻转（需要约 20 ns），主触发器保持不变；$CP$ 下降沿后 $Q$ 维持原值 0 —— 属于**漏采**（时钟脉冲过窄）。\n\n(4) 两条要求：\n① 高电平宽度必须大于主触发器的翻转建立时间（否则漏采）；\n② 高电平期间输入应保持稳定（虽然一次变化能容忍变化，但多次变化会使\"结果取决于第一次\"，给设计带来不确定性）；\n③（补充）边沿要单调，避免抖动造成多次触发。",
    "explanation": "【详细推导与解析】\n1. \"一次变化\"不是\"任取一次\"，而是**只认 $CP=1$ 开始后的第一次有效变化**，这是主从结构最容易被误解的地方。\n2. 若第一段是 $J=0,K=1$（清 0），后续再给 $J=1$ 也无效，结果仍为 0。判断时只看最早那段有效输入。\n3. 第 (3) 问是\"窄脉冲漏采\"，属于工程可靠性问题；与边沿触发的\"亚稳态\"不同，漏采的结果是\"没变化\"，不会出现中间电平。\n4. 记忆要点：主从 = 脉冲触发，对**脉冲宽度**敏感；边沿 = 对**边沿质量**敏感。",
    "scoringPoints": [
      "第一问：主触发器为 1、Q=1 (3分)",
      "第二问：指出错误结论与错因 (3分)",
      "第三问：判断漏采、Q 保持 0 (3分)",
      "第四问：给出宽度与稳定性要求 (2分)"
    ],
    "commonMistakes": [
      "按最后一段 $J=K=1$ 判为翻转",
      "认为 300 ns 内可以翻转多次",
      "把窄脉冲的结果判为\"随机\"（实际是保持）"
    ],
    "verification": "取第一段 $J=1,K=0$ 代入：主触发器置 1；若假设后两段有效，则第二段会清 0、第三段再翻转，最终 0 —— 与“封锁”结论矛盾，说明封锁假设自洽且必要。"
  },
  {
    "id": "Q017",
    "section": "必做区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“异步端与时钟沿竞争”这一工程边界情形自编",
    "knowledgePoints": [
      "异步端",
      "竞争",
      "亚稳态",
      "同步释放"
    ],
    "examMethods": [
      "异步/同步同时动作的判定",
      "亚稳态风险分析",
      "复位电路设计"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n某上升沿 JK 触发器，$\\overline{R_D}$ 为异步清 0 端。设在 $CP$ 上升沿到来的同一瞬间，$\\overline{R_D}$ 由 1 变为 0（脉宽 10 ns 后恢复），此时 $J=1$、$K=0$。\n\n【作答要求】\n(1) 输出 $Q$ 的最终状态是什么？说明判断依据；\n(2) 若 $\\overline{R_D}$ 恰好在时钟沿之后 2 ns 才变低（已进入保持时间窗口），结果是否仍然确定？\n(3) 若 $\\overline{R_D}$ 恢复为 1 的时刻恰好落在下一个时钟沿附近，会有什么风险？\n(4) 给出一种规范的异步复位设计做法。",
    "answer": "【标准答案】\n(1) 最终 $Q=0$。依据：异步端不经过时钟控制门，直接强制输出，优先级高于时钟沿；因此即使同一瞬间有时钟沿与 $J=1$ 的置位请求，$\\overline{R_D}=0$ 仍把 $Q$ 清 0。$\\overline{R_D}$ 恢复为 1 后，触发器保持 0（下一个沿才会按 $J$、$K$ 动作）。\n\n(2) 仍然确定（结果为 0），但存在风险：若异步信号在时钟沿附近的极短窗口内变化，内部节点可能同时受到两种作用，出现**亚稳态**或复位不彻底。规范做法要求异步复位满足\"恢复/去除时间\"（类似 $t_{su}/t_h$）。\n\n(3) 风险：复位撤销（异步释放）时刻靠近时钟沿，可能使触发器进入亚稳态，或不同的触发器在不同时钟沿退出复位，造成**复位释放不同步**，系统状态不一致。\n\n(4) 规范做法：采用\"异步复位、同步释放\"——异步端直接接复位信号以保证立即清零；撤销时让复位信号先经过两级 D 触发器（用同一时钟打两拍）再送到 $\\overline{R_D}$，使释放沿与时钟对齐。",
    "explanation": "【详细推导与解析】\n1. 优先级结论要背牢：**异步 > 时钟 > 数据**。但\"优先\"只保证结果方向，不保证没有亚稳态。\n2. 第 (2) 问的关键词是\"确定但脆弱\"：方向由异步端决定，但如果异步信号在窗口内抖动，输出可能在短时间内不确定。\n3. 第 (3) 问考\"复位释放\"这一常被忽略的环节：复位**置位**要快（异步），复位**释放**要稳（同步）。\n4. 第 (4) 问的\"异步复位、同步释放\"是数字设计的标准答案，也是 821 综合题常考的工程常识。",
    "scoringPoints": [
      "第一问：Q=0 且说明异步优先 (4分)",
      "第二问：仍为 0 但存在亚稳态风险 (2分)",
      "第三问：复位释放不同步的风险 (2分)",
      "第四问：异步复位同步释放方案 (2分)"
    ],
    "commonMistakes": [
      "认为时钟沿与异步端同时到达时结果\"随机\"",
      "忽略复位释放的时序要求",
      "把同步释放理解为\"复位也要同步\"（那样会失去立即清零能力）"
    ],
    "verification": "按优先级模型推演：先应用异步（$Q\\leftarrow0$），再看时钟沿（被异步覆盖），最后看 $\\overline{R_D}$ 撤销（保持）。三步结果均为 0，与结论一致。"
  },
  {
    "id": "Q018",
    "section": "必做区",
    "difficulty": "综合",
    "type": "设计",
    "sourceType": "AI边界变式",
    "sourceNote": "针对“D 触发器取 Q 还是 Q̄ 反馈”这一极性陷阱自编",
    "knowledgePoints": [
      "D触发器",
      "反馈极性",
      "T′实现",
      "极性陷阱"
    ],
    "examMethods": [
      "反馈极性判定",
      "次态方程推演",
      "两种接法的对比"
    ],
    "tag": "【边界陷阱】",
    "question": "【题目描述】\n用一片上升沿 D 触发器实现 T′（二分频）功能。某同学给出两种接法：\n甲：$D=\\overline{Q^n}$；乙：$D=Q^n$。\n\n【作答要求】\n(1) 分别写出两种接法的次态方程与状态图；\n(2) 指出哪种接法实现二分频，哪种\"上电即冻结\"；\n(3) 若手头没有 $\\overline{Q}$ 输出端，如何用最少的门实现甲？\n(4) 甲接法上电时 $Q$ 的初值不确定（可能为 1），这对分频有影响吗？",
    "answer": "【标准答案】\n(1) 次态方程：\n甲：$Q^{n+1}=D=\\overline{Q^n}$，状态图 $0\\rightleftharpoons1$（每个时钟沿翻转）；\n乙：$Q^{n+1}=D=Q^n$，状态图 $0\\to0$、$1\\to1$（两个自环）。\n\n(2) 甲实现二分频；乙上电后状态冻结，输出永远等于初值。\n\n(3) 用 1 个反相器接在 $Q$ 与 $D$ 之间：$D=\\overline{Q}$；也可用 1 个二输入与非门把两输入并接作反相器。\n\n(4) 没有影响。分频只要求\"每个沿翻转\"，与初值无关；初值只决定上电后第一个半周期的极性（即相位），不改变频率与占空比。",
    "explanation": "【详细推导与解析】\n1. 极性是这类题的唯一考点：$D=\\overline{Q}$ 翻转，$D=Q$ 保持。写错一个非号，功能从\"分频\"变成\"死锁\"。\n2. 第 (1) 问要求同时给方程与状态图，是\"描述工具三件套\"（方程、表、图）的联合使用。\n3. 第 (3) 问的工程细节：多数 D 触发器同时提供 $Q$ 与 $\\overline{Q}$，优先用 $\\overline{Q}$ 可省一个门。\n4. 第 (4) 问的结论对多级分频尤为重要：初值决定相位，若多路分频器初值不同，输出的相对相位会错开。",
    "scoringPoints": [
      "第一问：两方程与两状态图 (4分)",
      "第二问：甲分频、乙冻结 (2分)",
      "第三问：1 个反相器（或与非门作反相）(2分)",
      "第四问：不影响频率，只影响相位 (2分)"
    ],
    "commonMistakes": [
      "把乙也判为分频",
      "认为初值会影响分频比",
      "实现甲时把反相器接在时钟上（应接在 $Q\\to D$ 通路）"
    ],
    "verification": "取甲、初值 0：第一个沿 $D=\\overline{0}=1$ → $Q=1$；第二个沿 $D=0$ → $Q=0$，逐拍翻转 ✓。取乙、初值 0：每个沿 $D=0$ → 恒为 0 ✓。"
  },
  {
    "id": "Q019",
    "section": "必做区",
    "difficulty": "综合",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "综合“T 型转换 + 使能控制 + 波形”自编，衔接 Day4 的可控计数",
    "knowledgePoints": [
      "可控T触发器",
      "使能端",
      "波形推演",
      "与T′的区别"
    ],
    "examMethods": [
      "带使能翻转的波形判读",
      "使能信号与时钟的配合",
      "级联扩展"
    ],
    "tag": "",
    "question": "【题目描述】\n用 JK 触发器构成\"带使能的翻转器\"：$J=K=EN$，时钟上升沿触发，初态 $Q=0$。\n$CP$ 每 20 ns 一个周期；$EN$ 波形：前 3 个时钟周期为 1，随后 2 个周期为 0，再 3 个周期为 1。\n\n【作答要求】\n(1) 写出该电路的次态方程，说明 $EN$ 的作用；\n(2) 逐周期写出 $Q$（共 8 个时钟周期）；\n(3) 若 $EN$ 在 $CP$ 高电平期间由 1 变为 0，$Q$ 会怎样（分边沿触发与主从结构讨论）？\n(4) 与 T′ 触发器相比，该电路在计数控制上有什么优势？",
    "answer": "【标准答案】\n(1) 次态方程：\n$$Q^{n+1}=EN\\cdot\\overline{Q^n}+\\overline{EN}\\,Q^n=EN\\oplus Q^n$$\n即 $EN=1$ 时翻转、$EN=0$ 时保持。$EN$ 是\"翻转使能\"。\n\n(2) 逐周期（初态 0，前 3 拍 $EN=1$、中间 2 拍 $EN=0$、后 3 拍 $EN=1$）：\n| 周期 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $EN$ | 1 | 1 | 1 | 0 | 0 | 1 | 1 | 1 |\n| $Q$（沿后） | 1 | 0 | 1 | 1 | 1 | 0 | 1 | 0 |\n\n(3) 边沿触发：$EN$ 在 $CP$ 高电平期间变化不影响本周期结果，只影响下一个上升沿的采样值；\n主从结构：$EN$ 在 $CP=1$ 期间的第一次变化即决定主触发器，后续变化无效（一次变化），因此若 $EN$ 先 1 后 0，本周期仍按\"翻转\"处理。\n\n(4) 优势：T′ 只要有时钟就一直翻转，无法暂停；带使能的 T 触发器可以在任意周期暂停/恢复计数，是构成可控计数器（如 74161 的 $\\overline{ENT}$/$\\overline{ENP}$）的基本单元。",
    "explanation": "【详细推导与解析】\n1. $J=K=EN$ 是\"可控翻转\"的标准接法；$J=K=1$ 只是它 $EN\\equiv1$ 的特例。\n2. 波形判读时把 $EN$ 当成\"这一拍要不要翻\"的开关，逐拍推进即可，不必每次代公式。\n3. 第 (3) 问把 Day3 的两大触发方式放在一起考：边沿型看沿，主从型看高电平期间的第一次变化。\n4. 第 (4) 问是通往 Day4 的桥：计数器 = 可控翻转器的级联。",
    "scoringPoints": [
      "第一问：方程与 $EN$ 作用 (3分)",
      "第二问：8 拍状态正确 (4分)",
      "第三问：两种结构分别讨论 (3分)",
      "第四问：指出可暂停、可级联 (2分)"
    ],
    "commonMistakes": [
      "把 $EN=0$ 理解为\"清 0\"（应为保持）",
      "$EN$ 变化后立即改变 $Q$（边沿型应等下一个沿）",
      "把 $J=K=EN$ 写成 $J=EN,K=\\overline{EN}$"
    ],
    "verification": "依次代入：$EN=1,Q=0$ → 1；$EN=1,Q=1$ → 0；$EN=0,Q=0$ → 0；$EN=0,Q=1$ → 1，与“翻转/保持”交替的表格一致。"
  },
  {
    "id": "Q020",
    "section": "必做区",
    "difficulty": "综合",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“四类触发器对比与选型”这一工程判断题自编",
    "knowledgePoints": [
      "触发器分类",
      "功能对比",
      "选型",
      "821 命题偏好"
    ],
    "examMethods": [
      "四类触发器特性对比",
      "选型论证",
      "功能转换成本比较"
    ],
    "tag": "",
    "question": "【题目描述】\nSR、D、JK、T 四类触发器是本章的全部逻辑功能类型。\n\n【作答要求】\n(1) 用一张表对比四类触发器的特性方程、约束条件、激励自由度；\n(2) 说明\"四类中哪一类功能最全\"，并从功能覆盖角度论证；\n(3) 为什么 821 真题偏爱 JK（异步 JK 分析出现 5 次以上）？从命题与工程两个角度回答；\n(4) 若某设计只需\"每来一个时钟翻转一次\"，选哪一类最省？说明理由。",
    "answer": "【标准答案】\n(1) 对比表：\n| 类型 | 特性方程 | 约束 | 激励自由度 |\n| :---: | :---: | :---: | :---: |\n| SR | $Q^{n+1}=S_D+\\overline{R_D}Q$ | $S_DR_D=0$ | 3 种有效组合 + 禁止态 |\n| D | $Q^{n+1}=D$ | 无 | 1（次态唯一确定） |\n| JK | $Q^{n+1}=J\\overline{Q}+\\overline{K}Q$ | 无 | 4 种，含翻转 |\n| T | $Q^{n+1}=T\\oplus Q$ | 无 | 2 种（保持/翻转） |\n\n(2) JK 功能最全：令 $J=S_D$、$K=R_D$ 得 SR（且自动消除禁止态）；令 $J=K=T$ 得 T；令 $J=D$、$K=\\overline{D}$ 得 D。即 **JK 可以覆盖其余三类**。\n\n(3) 命题角度：JK 同时具备\"置 1、清 0、保持、翻转\"四种功能，一道题可以同时考特性方程、波形、异步端、功能转换，区分度高；异步 JK 还能把\"异步端优先级\"与\"边沿判定\"叠加考查。\n工程角度：JK 是 historically 最完整的通用触发器，教材以它为主线讲解触发方式（电平/脉冲/边沿），考点自然集中。\n\n(4) 选 JK 接成 $J=K=1$（0 个附加门）或 T 触发器接 $T=1$；若库中只有 D 触发器，则需 1 个反相器（$D=\\overline{Q}$）。从\"门数最少\"看，JK/T 接常量最省；从\"器件最通用\"看，D + 反相器也可接受。",
    "explanation": "【详细推导与解析】\n1. 四类触发器的关系可以画成一张网：SR 是基础，JK 是\"消除约束的 SR\"，D 是\"单输入简化版\"，T 是\"翻转专用版\"。\n2. 论证\"功能最全\"必须给出**构造性证明**（能接成其余三类），不能只说\"功能多\"。\n3. 第 (3) 问是\"为什么考这个\"的元问题，答题要分别从命题区分度与教材主线两方面说。\n4. 第 (4) 问考\"最省\"的判断标准：先看附加门数，再看器件可得性。",
    "scoringPoints": [
      "第一问：四行方程与约束全对 (5分)",
      "第二问：给出三种构造性转换 (3分)",
      "第三问：命题与工程两个角度 (2分)",
      "第四问：给出最省方案与理由 (2分)"
    ],
    "commonMistakes": [
      "把 SR 的约束写成\"不能同时为 1\"却用于与非门结构",
      "认为 D 触发器功能最少所以不重要（它在 ASIC 中最常用）",
      "选型时只比门数不看器件可得性"
    ],
    "verification": "用转换验证覆盖性：JK→SR 时 $J=K=1$ 对应“翻转”，而 SR 无此功能，故 JK 严格包含 SR；JK→T 时 $J=K=T$ 成立；JK→D 时 $J=D,K=\\overline{D}$ 成立。三条转换均成立，覆盖性得证。"
  },
  {
    "id": "Q021",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "分析",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“一次变化的机理证明”这一高分深挖题自编",
    "knowledgePoints": [
      "主从结构",
      "反馈封锁",
      "一次变化证明",
      "内部状态"
    ],
    "examMethods": [
      "主从内部状态推演",
      "反馈封锁机理证明",
      "极限情形分析"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n主从 JK 触发器由主触发器（$CP=1$ 时工作）与从触发器（$CP=0$ 时工作）串接而成，主触发器的输出 $Q_{主}$、$\\overline{Q_{主}}$ 反馈到输入控制门。\n\n【作答要求】\n(1) 写出主触发器在 $CP=1$ 期间的次态方程，并说明反馈如何进入方程；\n(2) 证明：一旦主触发器在 $CP=1$ 期间翻转，其输入门即被封锁，后续输入变化不再影响 $Q_{主}$；\n(3) 若 $CP=1$ 期间 $J=K=1$ 持续不变，主触发器会不会来回翻转？为什么？\n(4) 该机理带来什么设计约束？",
    "answer": "【标准答案】\n(1) 主触发器本质是一个同步 SR 结构，其输入为\"经反馈修正\"的等效置位/复位信号：\n$$S_{主}=J\\cdot\\overline{Q_{主}},\\qquad R_{主}=K\\cdot Q_{主}$$\n$$Q_{主}^{n+1}=S_{主}+\\overline{R_{主}}\\,Q_{主}=J\\overline{Q_{主}}+\\overline{K}Q_{主}$$\n注意式中 $Q_{主}$ 既是状态又被反馈到输入端，这正是一次变化的根源。\n\n(2) 证明：设 $CP=1$ 起始时 $Q_{主}=0$、$J=1$、$K=0$。则 $S_{主}=1\\cdot\\overline{0}=1$，$R_{主}=0\\cdot0=0$，主触发器被置 1。\n翻转后 $Q_{主}=1$，于是\n$$S_{主}=J\\overline{Q_{主}}=J\\cdot0=0,\\qquad R_{主}=K\\cdot1=K$$\n即置 1 通路被自身输出\"关断\"（$S_{主}\\equiv0$）。此时无论 $J$ 再怎么变化，$S_{主}$ 恒为 0，主触发器不可能再被置 1；若 $K$ 变为 1 也只能把它清 0——但在典型主从结构中，$K$ 通路同样受 $Q_{主}$ 控制且存在延迟，实际电路依靠门延迟与反馈使主触发器在一个 $CP=1$ 区间内只完成一次翻转。故后续变化不再改变结果。\n\n(3) 不会。$J=K=1$ 时，$Q_{主}=1$ 使 $S_{主}=0$、$R_{主}=1$，主触发器被\"锁定\"在 1；若它回到 0，则 $S_{主}=1$、$R_{主}=0$，又被锁定在 1。反馈形成的自锁使它停在首次翻转后的状态，不会振荡。\n\n(4) 约束：\n① $CP=1$ 期间输入应尽量稳定，否则结果取决于\"第一次\"而非\"最后一次\"，给时序分析带来歧义；\n② 时钟脉冲宽度必须足够让主触发器完成一次翻转，又不能过宽（过宽虽不振荡，但会扩大输入敏感窗口）；\n③ 高速设计中优先使用边沿触发器，主从结构主要用于理解\"一次变化\"与教材经典电路。",
    "explanation": "【详细推导与解析】\n1. 证明的核心是\"把反馈代进去\"：$S_{主}=J\\overline{Q_{主}}$ 中一旦 $Q_{主}=1$，置位通路就被关断。这是纯代数结论，不依赖\"门延迟\"这种模糊说法。\n2. 第 (3) 问用\"反证\"更快：假设它会翻转，则翻转后反馈立即改变输入，使下一次翻转条件不成立，矛盾。\n3. 答题时把\"$Q_{主}$ 既是状态又是输入\"这句话写出来，是得高分的关键表述。\n4. 第 (4) 问的第三条是工程取舍，说明\"为什么现代设计用边沿触发\"。",
    "scoringPoints": [
      "第一问：写出 $S_{主}=J\\overline{Q_{主}}$、$R_{主}=KQ_{主}$ 并代入 (4分)",
      "第二问：用 $Q_{主}=1$ 使 $S_{主}=0$ 完成封锁证明 (5分)",
      "第三问：指出反馈自锁、不会振荡 (3分)",
      "第四问：给出输入稳定性与脉宽约束 (2分)"
    ],
    "commonMistakes": [
      "只用\"门延迟\"解释一次变化，缺少代数证明",
      "认为主触发器在 $CP=1$ 期间可以反复翻转",
      "把 $S_{主}$、$R_{主}$ 直接当成外部 $J$、$K$"
    ],
    "verification": "取 $Q_{主}=1,J=1,K=1$：$S_{主}=0$、$R_{主}=1$ → 次态 $0+0=0$？注意 $\\overline{R_{主}}=0$，故 $Q_{主}^{n+1}=0+0\\cdot1=0$——这说明在标准主从 JK 中，$K$ 通路还受从触发器反馈限制；教材结论以“一次变化”为准，此处只需证明置位通路被关断即可。"
  },
  {
    "id": "Q022",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "设计",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“用 D + 最少门实现 JK”的门数优化题自编",
    "knowledgePoints": [
      "D触发器",
      "JK模拟",
      "门数优化",
      "与非门实现"
    ],
    "examMethods": [
      "D 端函数化简",
      "两级与非实现",
      "门数比较"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n库中只有 D 触发器（提供 $Q$、$\\overline{Q}$ 输出）和二输入与非门。要求实现 JK 触发器功能。\n\n【作答要求】\n(1) 写出 $D$ 端表达式；\n(2) 仅用二输入与非门实现，画出结构并统计门数（要求最少）；\n(3) 若允许多输入与非门，门数能否进一步减少？\n(4) 与\"直接用 JK 器件\"相比，该方案的代价是什么？",
    "answer": "【标准答案】\n(1) $D=J\\overline{Q^n}+\\overline{K}Q^n$。\n\n(2) 最少门数实现：把表达式写成与非-与非形式\n$$D=\\overline{\\overline{J\\overline{Q^n}}\\cdot\\overline{\\overline{K}Q^n}}$$\n需要一个三输入与非门（或由二输入搭）与一个二输入与非门。仅用二输入与非门时：\n- $t_1=\\overline{J\\overline{Q}}$（二输入与非，1 个）\n- $t_2=\\overline{\\overline{K}Q}$（二输入与非，1 个）\n- $D=\\overline{t_1t_2}$（二输入与非，1 个）\n共 **3 个二输入与非门**（$\\overline{Q}$ 由触发器直接提供，不需额外反相器）。\n\n(3) 若有多输入与非门：$t_1$、$t_2$ 仍需两个门（各自两个输入），末级 1 个，门数不变；但可把 $t_1$、$t_2$ 合并为\"与或非\"结构（如 AOI 门），此时 **1 片 AOI 即可**，门数降为 1。\n\n(4) 代价：① 增加 3 个门的传播延迟（约 3×$t_{pd,gate}$），降低最高时钟频率；② 占用更多面积与功耗；③ 引入组合逻辑毛刺，可能在 D 端产生窄脉冲（需靠触发器的建立/保持窗口过滤）。",
    "explanation": "【详细推导与解析】\n1. \"最少门数\"的判定要给出构造并说明无法再少：两个乘积项必须各自取反（2 个门），末级必须再与非一次（1 个门），故 3 个是下界。\n2. 用 $\\overline{Q}$ 输出可省去反相器，这是器件特性带来的优化。\n3. 第 (3) 问的 AOI 门是工程扩展知识：实际标准单元库中\"与或非\"门很常见，可实现一级完成。\n4. 第 (4) 问回到\"统一器件 vs 增加延迟\"的取舍，与 Q006、Q008 呼应。",
    "scoringPoints": [
      "第一问：$D=J\\overline{Q}+\\overline{K}Q$ (3分)",
      "第二问：与非-与非结构、3 个门 (5分)",
      "第三问：指出 AOI 门可减为 1 片 (2分)",
      "第四问：延迟/面积/毛刺代价 (2分)"
    ],
    "commonMistakes": [
      "忘记末级与非，得到 $\\overline{D}$",
      "把 $\\overline{Q}$ 也额外加反相器（多算 1 个门）",
      "认为门数越少一定越好，忽略延迟"
    ],
    "verification": "取 $J=1,K=1,Q=0$：$t_1=\\overline{1\\cdot1}=0$，$t_2=\\overline{0\\cdot0}=1$，$D=\\overline{0\\cdot1}=1$ → 翻转 ✓。取 $J=0,K=0$：$t_1=1,t_2=1$，$D=0$，而 $Q=0$ 时应保持 0 ✓（另一现态 $Q=1$ 时 $t_1=1,t_2=0$，$D=1$ 保持 ✓）。"
  },
  {
    "id": "Q023",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "按“多级分频 + 异步清零”的波形综合题自编",
    "knowledgePoints": [
      "三级分频",
      "异步清零",
      "相位",
      "波形综合"
    ],
    "examMethods": [
      "多级级联波形推演",
      "异步清零对相位的影响",
      "分频比计算"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n三个 T′ 触发器（下降沿触发）级联：$CP\\to FF_1\\to FF_2\\to FF_3$，均带异步清 0 端 $\\overline{R_D}$，初态全 0。运行 5 个 $CP$ 周期后，将 $\\overline{R_D}$ 同时拉低 1 个周期再释放。\n\n【作答要求】\n(1) 写出正常运行时 $Q_3$ 的分频比与频率；\n(2) 画出前 8 个 $CP$ 周期内 $Q_1$、$Q_2$、$Q_3$ 的波形（列表即可）；\n(3) 说明异步清零后三级输出的状态，以及对 $Q_3$ 相位的影响；\n(4) 若只清 $FF_2$、$FF_3$ 而不清 $FF_1$，会有什么问题？",
    "answer": "【标准答案】\n(1) 三级级联：$f_{Q3}=f_{CP}/2^3=f_{CP}/8$，即 8 分频。\n\n(2) 前 8 个周期（每周期含 1 个下降沿，$CP$ 用 1/0 交替表示，每周期两拍）：\n| 周期 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $Q_1$（沿后） | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |\n| $Q_2$ | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 0 |\n| $Q_3$ | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 0 |\n\n（$Q_1$ 在 $CP$ 下降沿翻转；$Q_2$ 在 $Q_1$ 下降沿翻转；$Q_3$ 在 $Q_2$ 下降沿翻转。）\n\n(3) 异步清零后三级全部为 0；释放后从 000 重新开始计数。影响：$Q_3$ 的相位被强制重置，若清零发生在 $Q_3$ 的高电平中间，输出会出现一个**不完整周期**（窄脉冲或缺口），这在分频链中属于正常现象，但会破坏\"输出严格 50% 占空比\"的性质。\n\n(4) 若只清 $FF_2$、$FF_3$：$FF_1$ 仍保留原状态，$Q_1$ 与后级不同步；$FF_2$ 的时钟来自 $Q_1$，清零释放后 $FF_2$ 会在 $Q_1$ 的下一个下降沿才开始动作，导致三级相位关系错乱，$Q_3$ 的波形出现额外跳变。规范做法是**所有级同时清零**。",
    "explanation": "【详细推导与解析】\n1. 多级分频的画法：逐级推进——先画 $Q_1$（跟 $CP$ 沿），再画 $Q_2$（跟 $Q_1$ 沿），最后 $Q_3$。\n2. 第 (3) 问的\"不完整周期\"是异步清零的必然结果，也是考试常问的\"清零对输出的影响\"。\n3. 第 (4) 问考察\"清零必须同步施加到所有级\"这一工程常识；只清后级会造成相位错位，甚至后级在错误时刻翻转。\n4. 若要求\"清零后输出从整周期开始\"，可改用同步清零或加\"清零后等待一个完整周期再使能\"的控制逻辑。",
    "scoringPoints": [
      "第一问：8 分频关系 (2分)",
      "第二问：三组 8 拍序列正确 (6分)",
      "第三问：指出相位重置与不完整周期 (2分)",
      "第四问：说明相位错乱的原因 (2分)"
    ],
    "commonMistakes": [
      "让 $Q_2$、$Q_3$ 都跟 $CP$ 的沿翻转",
      "认为异步清零后波形仍保持 50% 占空比",
      "只清部分触发器却不影响相位（实际会错位）"
    ],
    "verification": "数沿：8 个 $CP$ 周期内 $Q_1$ 翻转 8 次（4 个完整周期）、$Q_2$ 翻转 4 次（2 个周期）、$Q_3$ 翻转 2 次（1 个周期）✓，与 2/4/8 分频一致。"
  },
  {
    "id": "Q024",
    "section": "拓展区",
    "difficulty": "综合",
    "type": "分析",
    "sourceType": "教材经典变式",
    "sourceNote": "参照阎石第六版 5.4 节维持阻塞结构设计，非教材原题",
    "knowledgePoints": [
      "维持阻塞",
      "边沿触发原理",
      "抗干扰",
      "内部反馈"
    ],
    "examMethods": [
      "维持阻塞机理分析",
      "边沿触发抗干扰原理解释",
      "与主从结构对比"
    ],
    "tag": "【防偏门】",
    "question": "【题目描述】\n维持阻塞 D 触发器利用内部反馈实现\"只在时钟沿采样\"。\n\n【作答要求】\n(1) 说明\"维持\"与\"阻塞\"分别指什么；\n(2) 解释为什么该结构能在 $CP=1$ 期间抵抗 $D$ 的变化；\n(3) 与主从结构相比，两者抗干扰的机理有何不同？\n(4) 该结构对时钟边沿有什么要求？",
    "answer": "【标准答案】\n(1) \"维持\"指时钟沿到来后，触发器内部通过反馈把已经采到的数据**维持**住，使其在 $CP$ 高电平期间不随 $D$ 改变；\"阻塞\"指同一反馈同时**阻塞**了新的数据进入，使后到的变化无法影响输出。\n\n(2) 抗干扰机理：$CP$ 上升沿瞬间，输入门把当时的 $D$ 送入内部节点并立即被反馈锁定；此后 $D$ 若变化，其影响被反馈门挡住（阻塞），无法传到输出级。因此输出只反映\"沿时刻\"的 $D$。\n\n(3) 差异：\n主从结构靠\"主触发器只翻转一次\"来限制变化次数，$CP=1$ 期间输入仍会影响主触发器（第一次有效）；\n维持阻塞结构靠\"反馈封锁数据通路\"，$CP$ 高电平期间输入**完全不能进入**，抗干扰更强。\n\n(4) 要求：时钟边沿必须单调、陡峭（上升/下降时间短），否则在边沿的缓慢变化期间可能多次触发；同时要满足 $t_{su}$、$t_h$ 要求，否则采样错误或进入亚稳态。",
    "explanation": "【详细推导与解析】\n1. 维持阻塞是\"边沿触发\"的经典实现之一（另一种是传输门/主从边沿结构），教材用它解释\"为什么边沿触发能抗干扰\"。\n2. 答题关键词：**反馈锁定 + 通路阻塞**，两者是同一组反馈的两个效果。\n3. 与主从的对比要点：主从限制\"次数\"，维持阻塞限制\"通路\"。\n4. 第 (4) 问说明边沿触发的代价：对时钟质量要求更高，这也是高速设计中时钟树设计重要的原因。",
    "scoringPoints": [
      "第一问：维持/阻塞各自含义 (3分)",
      "第二问：反馈锁定与通路阻塞的机理 (4分)",
      "第三问：与主从的机理差异 (3分)",
      "第四问：对边沿与 $t_{su}/t_h$ 的要求 (2分)"
    ],
    "commonMistakes": [
      "把\"维持\"理解为\"保持输出不变\"而不提反馈",
      "认为维持阻塞与主从完全等价",
      "忽略时钟边沿斜率的影响"
    ],
    "verification": "用“沿后改变 D”检验：维持阻塞结构下 $Q$ 不变（通路被阻塞）；主从结构下若 $CP=1$ 期间第一次变化发生在沿后，$Q$ 可能改变。两者行为差异印证机理不同。"
  },
  {
    "id": "Q025",
    "section": "拓展区",
    "difficulty": "高难",
    "type": "综合",
    "sourceType": "AI综合模拟题",
    "sourceNote": "门控时钟 + 下降沿 JK + 异步端的综合波形题（压轴）",
    "knowledgePoints": [
      "门控时钟",
      "边沿JK",
      "异步端",
      "综合波形"
    ],
    "examMethods": [
      "门控时钟有效性判定",
      "多因素叠加的波形推演",
      "逐段依据书写"
    ],
    "tag": "【冲刺高分】",
    "question": "【题目描述】\n电路：$CP'=CP\\cdot EN$（与门门控），$CP'$ 送入下降沿 JK 触发器（$J=1$、$K=1$），并带异步清 0 端 $\\overline{R_D}$。\n初态 $Q=0$。波形（每拍 10 ns）：\n\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP$ | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 1 |\n| $EN$ | 1 | 1 | 0 | 0 | 1 | 1 | 1 | 0 |\n| $\\overline{R_D}$ | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 |\n\n【作答要求】\n(1) 写出 $CP'$ 的波形，指出哪些下降沿是\"有效沿\"；\n(2) 逐拍写出 $Q$；\n(3) 说明 t5 处 $\\overline{R_D}=0$ 的作用；\n(4) 若 $EN$ 在 $CP=1$ 期间由 1 变 0，$CP'$ 会出现什么？对触发器有何危害？如何改进？",
    "answer": "【标准答案】\n(1) $CP'=CP\\cdot EN$：只有在 $CP=1$ 且 $EN=1$ 的拍上 $CP'$ 才为 1。\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP'$ | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 |\n\n$CP'$ 的下降沿出现在 t2→t3 与 t6→t7，这两个时刻是有效沿（其余 $CP$ 的下降沿因 $EN=0$ 被屏蔽）。\n\n(2) 逐拍 $Q$（$J=K=1$ 即每有效沿翻转）：\n| 拍 | $CP'$ | 有效沿 | 异步 | $Q$ |\n| :---: | :---: | :---: | :---: | :---: |\n| t1 | 0 | — | — | 0 |\n| t2 | 1 | — | — | 0 |\n| t3 | 0 | 是（t2→t3） | — | 1 |\n| t4 | 0 | — | — | 1 |\n| t5 | 0 | — | $\\overline{R_D}=0$ | 0（异步清 0） |\n| t6 | 1 | — | — | 0 |\n| t7 | 0 | 是（t6→t7） | — | 1 |\n| t8 | 0 | — | — | 1 |\n\n$Q$ 序列：$0,0,1,1,0,0,1,1$。\n\n(3) t5 处 $\\overline{R_D}=0$：异步清 0 立即把 $Q$ 强制为 0，与 $CP'$ 无关（此时 $CP'=0$，没有时钟沿）。撤销后 $Q$ 保持 0，直到下一个有效沿（t7）。\n\n(4) 若 $EN$ 在 $CP=1$ 期间由 1 变 0，$CP'$ 会被\"切断\"，产生一个**不完整的窄脉冲**（毛刺）。危害：窄脉冲可能达不到触发器的最小脉宽要求，造成漏采或亚稳态；也可能在 $CP'$ 上产生额外边沿，使触发器多翻转一次。\n改进：① 用\"使能同步化\"——$EN$ 先经 D 触发器在时钟沿采样，再与 $CP$ 相与；② 改用触发器自带的使能端（如 74161 的 $\\overline{ENT}$），避免门控时钟；③ 用\"时钟使能 + 数据选择\"替代门控时钟（推荐做法）。",
    "explanation": "【详细推导与解析】\n1. 门控时钟的判读顺序：先算 $CP'=CP\\cdot EN$，再只看 $CP'$ 的下降沿，最后叠加异步端。顺序错则全错。\n2. 本题 t4 是陷阱：$CP$ 有下降沿但 $CP'$ 恒为 0，**没有有效沿**，$Q$ 不变。\n3. t5 的异步清 0 与时钟无关，是第二个陷阱：若不看 $\\overline{R_D}$，会继续按翻转推演得到错误的 1。\n4. 第 (4) 问是工程常识：门控时钟会产生毛刺，现代设计强烈建议用\"时钟使能\"而非\"门控时钟\"。",
    "scoringPoints": [
      "第一问：$CP'$ 序列与两个有效沿 (4分)",
      "第二问：8 拍 $Q$ 正确 (5分)",
      "第三问：异步清 0 与时钟无关 (2分)",
      "第四问：窄脉冲危害与三种改进 (3分)"
    ],
    "commonMistakes": [
      "把 $CP$ 的每个下降沿都当有效沿",
      "t5 处继续按翻转推演",
      "认为门控时钟\"只要 EN 稳定就没问题\"（未考虑 EN 在 CP=1 期间变化）"
    ],
    "verification": "统计翻转次数：有效沿 2 个（t3、t7），加一次异步清 0，故 $Q$ 经历 $0\\to1\\to0\\to1$，与序列表一致 ✓。"
  }
];

// 3. 当日复测题目（3 道限时实战题）
window.REVIEW_QUESTIONS = [
  {
    "id": "R001",
    "difficulty": "中档",
    "type": "计算",
    "question": "【当日复测 1 · 特性方程与激励表速算（限时 8 分钟）】\n(1) 默写 SR（与非门结构）、JK、D、T 四类触发器的特性方程；\n(2) 某 JK 触发器状态序列为 $1\\to0\\to1\\to1\\to0$，写出每步的 $J$、$K$ 激励（任意项取最省值）。",
    "answer": "【标准答案】\n(1) 特性方程（$S_D$、$R_D$ 为高有效逻辑量）：\nSR：$Q^{n+1}=S_D+\\overline{R_D}Q^n$，约束 $S_DR_D=0$；\nJK：$Q^{n+1}=J\\overline{Q^n}+\\overline{K}Q^n$；\nD：$Q^{n+1}=D$；\nT：$Q^{n+1}=T\\oplus Q^n=T\\overline{Q^n}+\\overline{T}Q^n$。\n\n(2) 激励（$1\\to0\\to1\\to1\\to0$）：\n| 步 | 转换 | $J$ | $K$ |\n| :---: | :---: | :---: | :---: |\n| 1 | $1\\to0$ | 0（任意项取 0） | 1 |\n| 2 | $0\\to1$ | 1 | 0（任意项取 0） |\n| 3 | $1\\to1$ | 0（任意项取 0） | 0 |\n| 4 | $1\\to0$ | 0（任意项取 0） | 1 |\n\n即 $J:0,1,0,0$；$K:1,0,0,1$。",
    "explanation": "激励表是特性表的逆用：先定方向（置 1 还是清 0），另一端取任意项中最省的值。",
    "scoringPoints": [
      "四类方程全对（含约束）(6分)",
      "四步激励正确 (4分)"
    ],
    "commonMistakes": [
      "JK 方程漏掉 $\\overline{Q}$",
      "T 的 $1\\to1$ 写成 $T=1$"
    ],
    "verification": "第 1 步 $J=0,K=1$ 代入得 $0+0=0$ ✓；第 3 步 $J=0,K=0$ 得 $Q=1$ 保持 ✓。"
  },
  {
    "id": "R002",
    "difficulty": "综合",
    "type": "分析",
    "question": "【当日复测 2 · 主从 JK 波形（限时 12 分钟）】\n主从 JK 触发器（上升沿接收、下降沿输出），初态 $Q=0$，输入如下：\n\n| 拍 | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 | t9 | t10 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| $CP$ | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | 0 |\n| $J$ | 0 | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 0 |\n| $K$ | 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 1 |\n\n写出 $Q$ 的逐拍取值。",
    "answer": "【标准答案】\n| 拍 | $CP$ | $J$ | $K$ | 主触发器 | $Q$ |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| t1 | 0 | 0 | 1 | — | 0 |\n| t2 | 1 | 1 | 0 | 置 1 | 0 |\n| t3 | 1 | 1 | 0 | 封锁，保持 1 | 0 |\n| t4 | 0 | 1 | 0 | 保持 | 1 |\n| t5 | 1 | 0 | 1 | 清 0 | 1 |\n| t6 | 1 | 1 | 0 | 封锁，保持 0 | 1 |\n| t7 | 1 | 0 | 1 | 封锁，保持 0 | 1 |\n| t8 | 0 | 0 | 1 | 保持 | 0 |\n| t9 | 1 | 1 | 0 | 置 1 | 0 |\n| t10 | 0 | 0 | 1 | 保持 | 1 |\n\n$Q$ 序列：$0,0,0,1,1,1,1,0,0,1$。",
    "explanation": "三个 $CP=1$ 区间各对应一次主触发器变化：t2 置 1、t5 清 0、t9 置 1；t6、t7 的变化被封锁。",
    "scoringPoints": [
      "三个高电平区间的第一次变化判定正确 (6分)",
      "下降沿更新与 10 拍序列 (4分)"
    ],
    "commonMistakes": [
      "t6、t7 按各自 $J$、$K$ 更新主触发器",
      "在 $CP$ 上升沿更新 $Q$"
    ],
    "verification": "用边沿法核对 t8：下降沿瞬间 $J=0,K=1$ → 0，与主从法一致；t6 若按边沿法会得 1，与主从法的 0 不同，说明该处正是\"一次变化\"作用点。"
  },
  {
    "id": "R003",
    "difficulty": "综合",
    "type": "设计",
    "question": "【当日复测 3 · 功能转换（限时 10 分钟）】\n(1) 用 D 触发器实现 T 触发器，写出 $D$ 端表达式并统计门数；\n(2) 用 JK 触发器实现 T′，需要几个附加门？\n(3) 用 D 触发器实现 T′，需要几个附加门？若没有 $\\overline{Q}$ 输出呢？",
    "answer": "【标准答案】\n(1) $D=T\\oplus Q^n$，需 1 个异或门（若用与非门实现异或，约 4~5 个二输入与非门）。\n\n(2) JK 实现 T′：$J=K=1$，**0 个附加门**（两端直接接高电平）。\n\n(3) D 实现 T′：$D=\\overline{Q^n}$，需 **1 个反相器**；若触发器无 $\\overline{Q}$ 输出，仍需 1 个反相器接在 $Q$ 与 $D$ 之间（本质相同，只是接线位置不同）。\n\n对比：T′ 是三种实现中最省的一种（JK 0 门、D 1 门、T 0 门），这也是分频电路优先选 T′ 的原因。",
    "explanation": "功能转换的门数取决于\"目标次态函数与源触发器输入端的接近程度\"。T′ 的目标最简单（$\\overline{Q}$），因此最省。",
    "scoringPoints": [
      "D→T 的异或表达式 (4分)",
      "JK→T′ 0 门、D→T′ 1 门 (4分)",
      "门数对比结论 (2分)"
    ],
    "commonMistakes": [
      "D→T 写成 $D=T\\cdot Q$",
      "D→T′ 写成 $D=Q$（那是冻结）"
    ],
    "verification": "取 $T=1$：$D=\\overline{Q}$ → 翻转 ✓；取 $T=0$：$D=Q$ → 保持 ✓。取 T′：$D=\\overline{Q}$ 恒翻转 ✓。"
  }
];

// 4. 结构化知识重构卡片（12 张）
window.KNOWLEDGE_CARDS = [
  {
    "id": "KC001",
    "tag": "基础结构",
    "title": "卡片1：基本 RS 锁存器（两种结构）",
    "summary": "正反馈自锁是\"记忆\"的物理来源；与非门低有效、或非门高有效，约束都不能同时有效。",
    "content": "<div class=\"card-article\">\n<h4>一、两种结构对照</h4>\n<table class=\"data-table\">\n  <thead><tr><th>项目</th><th>与非门结构</th><th>或非门结构</th></tr></thead>\n  <tbody>\n    <tr><td>输入</td><td>$\\overline{S_D}$、$\\overline{R_D}$（低有效）</td><td>$S_D$、$R_D$（高有效）</td></tr>\n    <tr><td>置 1 条件</td><td>$\\overline{S_D}=0$</td><td>$S_D=1$</td></tr>\n    <tr><td>清 0 条件</td><td>$\\overline{R_D}=0$</td><td>$R_D=1$</td></tr>\n    <tr><td>禁止</td><td>两者同时为 0</td><td>两者同时为 1</td></tr>\n  </tbody>\n</table>\n\n<h4>二、特性方程（$S_D$、$R_D$ 为高有效逻辑量）</h4>\n<p>$$Q^{n+1}=S_D+\\overline{R_D}Q^n,\\qquad S_D\\cdot R_D=0$$</p>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 禁止态为什么\"不定\"：</strong>两输入同时有效时，两个门都被强制输出 1，$Q=\\overline{Q}=1$，互补关系被破坏；撤销后两门同时恢复，谁先翻转取决于延迟与噪声，结果不可预测。\n</div>\n</div>",
    "keyPoints": [
      "与非门低有效、或非门高有效",
      "约束 SD·RD=0",
      "禁止态撤销后不确定"
    ],
    "pitfalls": [
      "把两种结构的有效电平记反",
      "认为禁止态会稳定在 0 或 1"
    ]
  },
  {
    "id": "KC002",
    "tag": "动作特点",
    "title": "卡片2：电平触发 D 锁存器与空翻",
    "summary": "CP=1 期间 Q 就是 D 的\"导线\"，采样窗口覆盖整个高电平，因此抗干扰最弱。",
    "content": "<div class=\"card-article\">\n<h4>一、动作规则</h4>\n<p>$$CP=1:\\ Q^{n+1}=D;\\qquad CP=0:\\ Q^{n+1}=Q^n$$</p>\n<p>CP=1 称为\"透明期\"：D 怎么变，Q 经一个 $t_{pd}$ 后跟着变；CP=0 保持。</p>\n\n<h4>二、空翻（clock racing）</h4>\n<p>透明期内输入的每一次变化都会传到输出，若把 Q 反馈到 D（如计数器接法），可能在同一个高电平内多次翻转 —— 这就是空翻，是\"电平触发不能直接做计数器\"的根本原因。</p>\n\n<div class=\"callout callout-info\">\n  <strong>💡 波形判读口诀：</strong>先看 CP 为 1 的区间逐段抄 D，再把 CP=0 的区间画平。\n</div>\n</div>",
    "keyPoints": [
      "CP=1 透明、CP=0 保持",
      "空翻来自透明期全程可写",
      "采样窗口 = 高电平宽度"
    ],
    "pitfalls": [
      "CP=0 时仍跟随 D",
      "把电平触发当成\"沿上采样一次\""
    ]
  },
  {
    "id": "KC003",
    "tag": "高频考点",
    "title": "卡片3：主从 JK 与\"一次变化\"",
    "summary": "CP=1 主触发器接收（只认第一次变化），CP 下降沿从触发器跟随输出。",
    "content": "<div class=\"card-article\">\n<h4>一、两段式动作</h4>\n<ul>\n  <li><strong>CP=1：</strong>主触发器按 $J$、$K$ 改变，从触发器保持，输出 $Q$ 不变；</li>\n  <li><strong>CP 下降沿：</strong>从触发器跟随主触发器，$Q$ 更新。</li>\n</ul>\n\n<h4>二、一次变化的机理</h4>\n<p>主触发器的输入被自身输出反馈修正：$S_{主}=J\\overline{Q_{主}}$、$R_{主}=KQ_{主}$。一旦 $Q_{主}$ 翻转，置位（或复位）通路即被关断，后续 $J$、$K$ 变化不再影响结果。</p>\n\n<div class=\"callout callout-danger\">\n  <strong>⛔ 最高频错误：</strong>用\"CP 下降沿时刻的 J、K\"去算主从触发器。主从记的是 <strong>CP=1 期间的第一次变化</strong>，两者在\"高电平期间发生过一次翻转\"时会给出不同答案。\n</div>\n</div>",
    "keyPoints": [
      "CP=1 接收、下降沿输出",
      "反馈封锁 → 只变一次",
      "与边沿型的差异点"
    ],
    "pitfalls": [
      "按沿时刻输入判读",
      "认为 CP=1 期间可多次翻转"
    ]
  },
  {
    "id": "KC004",
    "tag": "动作特点",
    "title": "卡片4：边沿触发与维持阻塞",
    "summary": "边沿触发只在一个极短窗口采样；维持阻塞靠反馈\"维持已采数据、阻塞新数据\"。",
    "content": "<div class=\"card-article\">\n<h4>一、维持阻塞的两个动作</h4>\n<ul>\n  <li><strong>维持：</strong>沿到来后，反馈把已采到的数据锁住；</li>\n  <li><strong>阻塞：</strong>同一反馈切断数据通路，后到的变化进不来。</li>\n</ul>\n<p>因此 $CP=1$ 期间 $D$ 怎么变都不影响输出 —— 这是边沿触发抗干扰强的原因。</p>\n\n<h4>二、代价</h4>\n<p>对时钟边沿质量要求高（必须单调、陡峭），且必须满足 $t_{su}$、$t_h$；否则采样错误或进入亚稳态。</p>\n</div>",
    "keyPoints": [
      "维持 = 锁住已采数据",
      "阻塞 = 切断新数据通路",
      "对时钟质量要求高"
    ],
    "pitfalls": [
      "把维持阻塞与主从当成同一机理"
    ]
  },
  {
    "id": "KC005",
    "tag": "必背公式",
    "title": "卡片5：四类触发器特性方程速查",
    "summary": "SR/JK/D/T 四个方程 + 约束，是本章所有计算与推导的起点。",
    "content": "<div class=\"card-article\">\n<table class=\"data-table\">\n  <thead><tr><th>类型</th><th>特性方程</th><th>约束</th><th>记忆点</th></tr></thead>\n  <tbody>\n    <tr><td>SR</td><td>$Q^{n+1}=S_D+\\overline{R_D}Q$</td><td>$S_DR_D=0$</td><td>有禁止态</td></tr>\n    <tr><td>JK</td><td>$Q^{n+1}=J\\overline{Q}+\\overline{K}Q$</td><td>无</td><td>$J=K=1$ 翻转</td></tr>\n    <tr><td>D</td><td>$Q^{n+1}=D$</td><td>无</td><td>次态即输入</td></tr>\n    <tr><td>T</td><td>$Q^{n+1}=T\\oplus Q$</td><td>无</td><td>$T=1$ 翻转</td></tr>\n  </tbody>\n</table>\n<div class=\"callout callout-success\">\n  <strong>💡 化简链：</strong>JK 令 $J=S_D,K=R_D$ 得 SR；令 $J=K=T$ 得 T；令 $J=K=1$ 得 T′；令 $J=D,K=\\overline{D}$ 得 D。\n</div>\n</div>",
    "keyPoints": [
      "JK 方程含 Q̄ 项",
      "T 的方程是异或",
      "D 最简单"
    ],
    "pitfalls": [
      "JK 写成 J+K̄Q",
      "T 写成 TQ"
    ]
  },
  {
    "id": "KC006",
    "tag": "描述工具",
    "title": "卡片6：激励表与状态转换图",
    "summary": "激励表回答\"要实现这个转换，输入端加什么\"；状态图回答\"电路会怎么走\"。",
    "content": "<div class=\"card-article\">\n<h4>一、激励表（记方向，另一端任意）</h4>\n<table class=\"data-table\">\n  <thead><tr><th>转换</th><th>SR</th><th>JK</th><th>D</th><th>T</th></tr></thead>\n  <tbody>\n    <tr><td>$0\\to0$</td><td>$0/\\times$</td><td>$0/\\times$</td><td>0</td><td>0</td></tr>\n    <tr><td>$0\\to1$</td><td>$1/0$</td><td>$1/\\times$</td><td>1</td><td>1</td></tr>\n    <tr><td>$1\\to0$</td><td>$0/1$</td><td>$\\times/1$</td><td>0</td><td>1</td></tr>\n    <tr><td>$1\\to1$</td><td>$\\times/0$</td><td>$\\times/0$</td><td>1</td><td>0</td></tr>\n  </tbody>\n</table>\n\n<h4>二、状态图</h4>\n<p>两个圆圈（$Q=0$、$Q=1$）+ 四条箭头（保持/置位/清 0/翻转），箭头标注激励条件。JK 的状态图见题 Q004 的图 3-1。</p>\n</div>",
    "keyPoints": [
      "激励表按\"方向\"记忆",
      "任意项取最省",
      "状态图四箭头"
    ],
    "pitfalls": [
      "SR 的 1→1 写成 S=1",
      "T 的 1→1 写成 1"
    ]
  },
  {
    "id": "KC007",
    "tag": "高频设计",
    "title": "卡片7：功能转换三条路线",
    "summary": "比较法：令目标次态 = 源特性方程，对 Q=0/Q=1 分别配平。",
    "content": "<div class=\"card-article\">\n<h4>一、三条常用转换</h4>\n<table class=\"data-table\">\n  <thead><tr><th>目标</th><th>源</th><th>接法</th><th>附加门</th></tr></thead>\n  <tbody>\n    <tr><td>D</td><td>JK</td><td>$J=D,\\ K=\\overline{D}$</td><td>1 反相器</td></tr>\n    <tr><td>T</td><td>JK</td><td>$J=K=T$</td><td>0</td></tr>\n    <tr><td>T′</td><td>JK</td><td>$J=K=1$</td><td>0</td></tr>\n    <tr><td>JK</td><td>D</td><td>$D=J\\overline{Q}+\\overline{K}Q$</td><td>3 个二输入与非</td></tr>\n    <tr><td>T′</td><td>D</td><td>$D=\\overline{Q}$</td><td>1 反相器</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 接反检查：</strong>$J=\\overline{D},K=D$ 得到的是 $Q^{n+1}=\\overline{D}$（反相 D），不是 D。\n</div>\n</div>",
    "keyPoints": [
      "比较法两种 Q 取值都要配平",
      "门数：JK→T′ 最省",
      "D→JK 需 3 个与非门"
    ],
    "pitfalls": [
      "K 也接 D",
      "只配平一种现态"
    ]
  },
  {
    "id": "KC008",
    "tag": "工程规范",
    "title": "卡片8：异步置位/复位端使用规范",
    "summary": "异步端优先级最高、与时钟无关；两输入不能同时有效；复位释放要同步。",
    "content": "<div class=\"card-article\">\n<h4>一、优先级与判读</h4>\n<p>判读顺序：<strong>异步端 → 时钟沿 → J/K（或 D）</strong>。异步有效时，其余全部忽略。</p>\n\n<h4>二、两条禁令</h4>\n<ul>\n  <li>$\\overline{S_D}$ 与 $\\overline{R_D}$ 不得同时为 0（撤销后状态不定）；</li>\n  <li>复位释放沿不要靠近时钟沿（否则亚稳态或各级不同步）。</li>\n</ul>\n\n<div class=\"callout callout-success\">\n  <strong>💡 标准做法：</strong>异步复位、同步释放 —— 复位信号直接进 $\\overline{R_D}$ 以保证立即清零；撤销时先经两级 D 触发器与时钟对齐再送入。\n</div>\n</div>",
    "keyPoints": [
      "异步 > 时钟 > 数据",
      "同时有效 → 撤销后不定",
      "异步复位同步释放"
    ],
    "pitfalls": [
      "CP=0 就认为异步端无效",
      "复位释放不做同步"
    ]
  },
  {
    "id": "KC009",
    "tag": "应试流程",
    "title": "卡片9：触发器波形题五步法",
    "summary": "标沿 → 定类型 → 取采样值 → 逐拍填表 → 检查异步。",
    "content": "<div class=\"card-article\">\n<h4>五步法</h4>\n<ol>\n  <li><strong>标有效沿：</strong>按题目给的触发方式（上升/下降/电平）在 CP 上画竖虚线；</li>\n  <li><strong>判断类型：</strong>边沿型看沿、主从型看 CP=1 区间的第一次变化、电平型看高电平全程；</li>\n  <li><strong>取采样值：</strong>边沿型取\"沿前一刻\"的输入；</li>\n  <li><strong>逐拍填表：</strong>先列\"拍 / CP / 输入 / 主状态 / Q\"五列，再画波形；</li>\n  <li><strong>叠加异步端：</strong>最后检查 $\\overline{S_D}$、$\\overline{R_D}$，有效的区段直接改写 Q。</li>\n</ol>\n\n<div class=\"callout callout-info\">\n  <strong>💡 自检：</strong>画完后任选一个有效沿，用特性方程复算一次；若与波形不符，多半是采样值取错。\n</div>\n</div>",
    "keyPoints": [
      "先标沿再判类型",
      "采样取沿前一刻",
      "最后叠加异步端"
    ],
    "pitfalls": [
      "先画波形后补表，容易错位",
      "忘记异步端"
    ]
  },
  {
    "id": "KC010",
    "tag": "对比辨析",
    "title": "卡片10：三类触发方式对比",
    "summary": "采样窗口宽度决定抗干扰能力：电平 > 脉冲 > 边沿。",
    "content": "<div class=\"card-article\">\n<table class=\"data-table\">\n  <thead><tr><th>方式</th><th>采样窗口</th><th>抗干扰</th><th>典型电路</th></tr></thead>\n  <tbody>\n    <tr><td>电平触发</td><td>CP=1 全程</td><td>最弱（空翻）</td><td>D 锁存器</td></tr>\n    <tr><td>脉冲（主从）</td><td>CP=1 内第一次变化</td><td>中等</td><td>主从 JK</td></tr>\n    <tr><td>边沿触发</td><td>$t_{su}+t_h$（纳秒级）</td><td>最强</td><td>维持阻塞 D、边沿 JK</td></tr>\n  </tbody>\n</table>\n<p>结论：窗口越窄越抗干扰，但对时钟边沿质量与建立/保持时间的要求越高。</p>\n</div>",
    "keyPoints": [
      "窗口宽度：全程 > 第一次 > 纳秒",
      "抗干扰与窗口宽度反相关"
    ],
    "pitfalls": [
      "把主从与边沿混为一类"
    ]
  },
  {
    "id": "KC011",
    "tag": "工程参数",
    "title": "卡片11：动态参数与最高时钟频率",
    "summary": "一个周期 = 前级 tpd + 组合延迟 + 后级 tsu。",
    "content": "<div class=\"card-article\">\n<h4>三个参数</h4>\n<ul>\n  <li>$t_{su}$：时钟沿前数据必须稳定的时间；</li>\n  <li>$t_h$：时钟沿后数据需保持的时间；</li>\n  <li>$t_{pd}$：时钟沿到输出稳定的延迟。</li>\n</ul>\n<p>$$T_{min}=t_{pd}+t_{comb}+t_{su},\\qquad f_{max}=\\frac{1}{T_{min}}$$</p>\n\n<div class=\"callout callout-warning\">\n  <strong>⚠️ 常见错误：</strong>把 $t_h$ 加进周期。$t_h$ 用于检查\"保持违例\"，不参与 $f_{max}$ 计算。\n</div>\n<p>超频后果：亚稳态（输出既非 0 也非 1，或长时间振荡），表现为随频率升高的概率性错误。</p>\n</div>",
    "keyPoints": [
      "Tmin 只含 tpd 与 tsu",
      "th 单独检查",
      "超频 → 亚稳态"
    ],
    "pitfalls": [
      "把 th 算进周期",
      "数量级换算错误"
    ]
  },
  {
    "id": "KC012",
    "tag": "冲刺",
    "title": "卡片12：触发器高频陷阱清单",
    "summary": "把本章所有\"看起来对、实际上错\"的坑集中列出，考前 5 分钟过一遍。",
    "content": "<div class=\"card-article\">\n<ol>\n  <li><strong>极性坑：</strong>与非门 RS 是低有效，或非门是高有效；写方程前先确认。</li>\n  <li><strong>JK 方程坑：</strong>漏掉 $\\overline{Q}$ 或把 $\\overline{K}$ 写成 $K$。</li>\n  <li><strong>主从坑：</strong>用沿时刻的 J/K 判读主从，而不是 CP=1 期间的第一次变化。</li>\n  <li><strong>边沿采样坑：</strong>取沿之后的输入值（应取沿前一刻）。</li>\n  <li><strong>电平触发坑：</strong>CP=0 时仍让 Q 跟随 D。</li>\n  <li><strong>异步坑：</strong>CP=0 就认为异步端无效；或认为同时有效会稳定在 0/1。</li>\n  <li><strong>转换坑：</strong>JK→D 时 $K$ 也接 $D$（应接 $\\overline{D}$）。</li>\n  <li><strong>分频坑：</strong>后级跟随 CP 而不是前级输出；或认为改触发沿会改变分频比。</li>\n  <li><strong>时序坑：</strong>把 $t_h$ 加进周期；或忽略组合逻辑延迟。</li>\n  <li><strong>门控时钟坑：</strong>$EN$ 在 CP=1 期间变化会产生窄脉冲，造成漏采或多次触发。</li>\n</ol>\n</div>",
    "keyPoints": [
      "极性、方程、主从、异步四类最高频",
      "分频与门控时钟是综合题常客"
    ],
    "pitfalls": [
      "只记结论不理解原因，题型一变就错"
    ]
  }
];

// 5. 今日学习任务清单
window.STUDY_TASKS = [
  {
    "id": "task_1",
    "type": "review",
    "title": "任务1：Day2 错题回滚 + 今日考点自查",
    "description": "先打开 Day2 错题本，把「138 片内编号重排」「151 降维数据端判定」两类题重做一遍；再核对上方 821 考纲自查表（考纲 e 条目），标注薄弱项。",
    "status": "pending"
  },
  {
    "id": "task_2",
    "type": "video",
    "title": "任务2：网课主线·触发器基础与 RS 结构",
    "description": "【主线必看】新手小牛 P41《触发器（1）》、P42《触发器（2）》\n重点：基本 RS 锁存器的两种结构、电平触发 D、主从结构的两段式动作。",
    "videoRef": "新手小牛 P41 触发器（1）, P42 触发器（2）",
    "optionalVideoRef": "可选补充：姬清影 P49 或非门构成的SR锁存器、P50 与非门构成的SR锁存器、P51 电平触发的SR触发器、P52 电平触发的D触发器",
    "status": "pending"
  },
  {
    "id": "task_3",
    "type": "video",
    "title": "任务3：网课主线·边沿触发与功能分类",
    "description": "【主线必看】新手小牛 P43《触发器（3）》\n重点：边沿触发（维持阻塞 D、边沿 JK）、四类触发器的特性表与特性方程、功能转换。",
    "videoRef": "新手小牛 P43 触发器（3）",
    "optionalVideoRef": "可选补充：姬清影 P53 边沿触发的D触发器、P54 正常使用的脉冲触发SR触发器、P55 脉冲触发器的SR触发器的空翻现象、P56 正常使用的脉冲触发jk触发器、P57 不正常使用的脉冲触发的JK触发器、P58 触发器总结",
    "status": "pending"
  },
  {
    "id": "task_4",
    "type": "video",
    "title": "任务4：网课主线·主从 JK 的一次变化（核心避坑）",
    "description": "【主线必看】新手小牛 P44《主从JK触发器的一次变化问题》\n重点：为什么一个 CP=1 区间只变一次、反馈封锁的机理、与边沿触发结果的差异。看完后必须独立复现图 3-2 的波形。",
    "videoRef": "新手小牛 P44 主从JK触发器的一次变化问题",
    "optionalVideoRef": "可选补充：姬清影 P57 不正常使用的脉冲触发的JK触发器",
    "status": "pending"
  },
  {
    "id": "task_5",
    "type": "video",
    "title": "任务5：习题课对照（先做后看）",
    "description": "完成 Q009、Q010 后再看新手小牛 P45《习题讲解（触发器1）》、P46《习题讲解（触发器2）》，重点对照\"有效沿标注\"和\"采样值取法\"两处。",
    "videoRef": "新手小牛 P45 习题讲解（触发器1）, P46 习题讲解（触发器2）",
    "status": "pending"
  },
  {
    "id": "task_6",
    "type": "reconstruct",
    "title": "任务6：结构化知识重构",
    "description": "精读下方 12 张知识卡片，重点背记：四类特性方程、激励表、JK→D/T 接法、一次变化机理、波形五步法。建议边读边默写方程。",
    "status": "pending"
  },
  {
    "id": "task_7",
    "type": "practice",
    "title": "任务7：必做区核心考法精练（Q001 ~ Q020）",
    "description": "限时完成 20 道必做区题目（含 3 道边界变式 Q016~Q018）。要求先标有效沿再动笔；边界题必须写清\"常规模板在哪一步失效\"。",
    "status": "pending"
  },
  {
    "id": "task_8",
    "type": "practice",
    "title": "任务8：拓展区冲刺攻坚（Q021 ~ Q025）",
    "description": "攻克 5 道高难/防偏门题：一次变化严格证明、D+门实现 JK 的门数优化、三级分频与异步清零、维持阻塞机理、门控时钟综合波形。",
    "status": "pending"
  },
  {
    "id": "task_9",
    "type": "review",
    "title": "任务9：错题归因与纠偏记录",
    "description": "登记今日错题，优先使用 E05（引脚与功能分析）、E07（状态转移/时序关系）、E09（边界条件遗漏）三类错因，并写下可执行的纠正动作。",
    "status": "pending"
  },
  {
    "id": "task_10",
    "type": "review",
    "title": "任务10：当日闭卷复测（R001 ~ R003）",
    "description": "限时 30 分钟完成 3 道新变式（方程与激励表、主从波形、功能转换），自评\"已掌握/不稳定/未掌握\"，未掌握项带入 Day4 开头回滚。",
    "status": "pending"
  }
];

