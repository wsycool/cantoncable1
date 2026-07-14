# 广缆国际 - 技术规划

## 依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| react | ^18.2.0 | UI 框架 |
| react-dom | ^18.2.0 | DOM 渲染 |
| typescript | ^5.2.0 | 类型系统 |
| vite | ^5.0.0 | 构建工具 |
| tailwindcss | ^3.4.0 | 样式方案 |
| gsap | ^3.12.0 | 核心动画引擎（含 ScrollTrigger、SplitText、Flip 插件） |
| @studio-freight/lenis | ^1.0.0 | 平滑滚动 |
| lucide-react | ^0.400.0 | 图标库 |
| @types/react | ^18.2.0 | React 类型定义 |
| @types/react-dom | ^18.2.0 | ReactDOM 类型定义 |

> 注意：d3 已在设计文档中被引用，但仅用于蓝图网格的极坐标角度生成（`d3.scaleLinear` 和 `d3.range`），考虑到其用量极小，**不使用 d3 依赖**，改用原生 JS `Array.from({length: N}, (_, i) => ...)` 和数学函数替代。

---

## 组件清单

### Layout (全局)

| 组件 | 来源 | 说明 |
|------|------|------|
| GlobalNav | 自定义 | 吸顶毛玻璃导航，含蓝图网格纹理背景，右侧胶囊按钮带呼吸光晕 |
| Footer | 自定义 | 深色页脚，集成 BlueprintMorphFooter 系统 |
| SmoothScrollProvider | 自定义 (Wrapper) | Lenis 实例封装，全局提供平滑滚动 |

### Sections (页面区块)

| 组件 | 说明 |
|------|------|
| HeroBlueprint | 150vh 沉浸式首屏，含 BlueprintGrid 背景 + 大标题 + 液态玻璃面板 |
| ScrollMaskReveal | 200vh 滚动揭示区，GSAP ScrollTrigger pin 驱动三层 clipPath 遮罩动画 |
| ProductShowcase | 明亮背景产品展示，集成 DiagonalSweepCard |
| ProductionFacility | 左右非对称分栏，左 60% 工厂图 + 右 40% 3D 视差卡片 |

### 可复用组件

| 组件 | 来源 | 复用情况 | 说明 |
|------|------|----------|------|
| BlueprintGrid | 自定义 | HeroBlueprint 背景 | 蓝图网格线条生成与循环动画系统 |
| DiagonalSweepCard | 自定义 | ProductShowcase 中 3 张卡片 | 对角线扫光数据揭示卡片 |
| BlueprintMorphFooter | 自定义 | Footer 内部 | GSAP Flip 驱动的蓝图线条重组系统 |

### Hooks

| Hook | 说明 |
|------|------|
| use3DParallax | 鼠标位置映射为 3D 旋转角度，配合 perspective/preserve-3d 实现视差 |

---

## 动画实现规划

| 动画 | 库 / 插件 | 实现方式 | 复杂度 |
|------|-----------|----------|--------|
| Blueprint Grid 循环动画 | 原生 JS + CSS @keyframes | requestAnimationFrame 控制批次显隐，setInterval 5500ms 触发全量重绘，ResizeObserver 响应尺寸变化 | 🔒 High |
| Scroll Mask Reveal (clipPath 遮罩揭示) | GSAP + ScrollTrigger | scrub timeline，三层 panel 依次执行 inset 裁剪动画，pin 容器 200vh | 🔒 High |
| Diagonal Data Sweep | React state + CSS transition | Hover 状态切换 isActive，background-position 2s ease 驱动 45deg 线性渐变扫光 | Medium |
| 3D Parallax Depth Card | 原生 JS (mousemove) + CSS transform | use3DParallax Hook 捕获鼠标位置，计算 rotateX/rotateY，配合 perspective(1000px) 和 translateZ 分层 | Medium |
| Blueprint Morph Footer | GSAP Flip | Flip.getState 捕获散落态 → classList 切换为 grid-locked → Flip.to 1.5s 重组动画 → 回调中淡入表单 | 🔒 High |
| 导航吸顶 + 毛玻璃 | CSS (position: sticky, backdrop-filter) | 纯 CSS，无 JS 动画 | Low |
| 按钮 Hover (液态折射) | CSS (backdrop-filter, transition) | 纯 CSS transition | Low |
| 图片灰度渐显 | CSS (filter: grayscale, transition) | 图片加载完成后移除 grayscale | Low |

---

## 状态与逻辑规划

### Lenis 全局集成

Lenis 实例需在 SmoothScrollProvider 中创建并挂载到 window，GSAP ScrollTrigger 的 scroller 必须同步绑定 Lenis 实例。关键：Lenis 的 `scroll` 事件需要调用 `ScrollTrigger.update()` 来保持 GSAP 动画与滚动位置的同步。

### BlueprintGrid 生命周期管理

该组件有 3 个需严格清理的副作用源：
1. `setInterval(intervalId)` —— 5500ms 循环重绘
2. `requestAnimationFrame(animationFrameId)` —— 批次显隐动画帧
3. `ResizeObserver` —— 尺寸变化监听

三者必须在 useEffect cleanup 中全部停止，避免热更新或路由切换后产生多个并行循环。

### ScrollMaskReveal 的 DOM 结构约束

三层 `.reveal-panel` 必须满足严格的 CSS 初始状态：
- panel[0]: `clipPath: inset(0% 0% 0% 0%)` → `inset(0% 0% 100% 0%)`
- panel[1]: `clipPath: inset(0% 0% 0% 100%)` → `inset(0% 0% 0% 0%)`
- panel[2]: `opacity: 0` → `opacity: 1`

这些初始态必须写在 CSS 中，不能仅靠 GSAP fromTo 定义，否则首次渲染时可能出现闪跳。

### BlueprintMorphFooter 的 Flip 时序

Flip.getState 必须在 classList 切换**之前**调用。顺序不可颠倒：
1. `Flip.getState(line, { props: 'opacity, backgroundColor' })` ← 先拍快照
2. `line.classList.remove('scattered'); line.classList.add('grid-locked')` ← 再切布局
3. `Flip.to(state, { ... })` ← 最后驱动过渡

---

## 其他关键决策

### 字体加载策略

Inter、Noto Sans SC、IBM Plex Mono 均通过 Google Fonts 加载，CSS 中设置 `font-display: swap`，避免字体加载阻塞首屏渲染。

### 性能优化

- BlueprintGrid 在移动设备上减少线条数量至 50 条（通过 `matchMedia('(hover: none)')` 判断）
- 所有频繁变化的动画元素使用 `will-change: opacity, transform` 提示浏览器优化图层合成
- 图片使用 Vite 的静态资源处理，自动 hash 和压缩

### 不使用 shadcn/ui 组件

本设计为高度定制化的工业展示站，所有 UI 元素（按钮、卡片、面板）均为自定义实现，不依赖 shadcn/ui 预设组件，以完全还原设计文档中的精确视觉规格。
