ABOUT
=====

> 阿里云控制台通用 LESS 常量及方法

参考规范 <http://ued.aliyun.com/Console_Guideline/main.html>

# HOW TO USE

安装：

```
tnpm install @ali/wind-less-mixin --save
```

在 LESS 文件中引入和使用：

```less
@import '~@ali/wind-less-mixin'; // 如果 webpack 报找不到，可以尝试加上 `/index`

// 使用值（只有以 @G_ 打头的是允许使用的）
.selector {
  color: @G_color_text_emphasis;
}
// 使用 mixin 方法
.some-error {
  #color.error(true); // 只能通过 namespace 来引用
}
```

# 代码规范说明

mixin 包含两部分，值和方法。

## 变量

全局可用的[变量](http://lesscss.org/features/#variables-feature)（其实叫「常量」可能更为妥当）。

由 `src/_var.less` 聚合位于 `src/var/` 目录下的文件，一个文件定义一组相关的变量，如 `color.less` 定义颜色，`size.less` 定义宽高大小。

命名规范：

* 公有变量以 `@G_` 打头，其余单词全小写，单词间以下划线 `_` 链接
* 私有变量以 `@_` 打头，其余跟公有的一样

关于「私有」：

less 没有「私有」的概念，所以事实上可以引用所有的变量，以 `@_` 只是表明「你不要用，我不保证它不会变」。

## 方法

全局可用的 [无输出 mixin 方法](http://lesscss.org/features/#mixins-feature-not-outputting-the-mixin)。

由 `src/_fn.less` 聚合位于 `src/fn/` 目录下的文件，一个文件定义一个 [namespace](http://lesscss.org/features/#mixins-feature-namespaces)，所有
的方法都包裹在 `namespace` 中。

命名规范：

* `namespace` 全小写，单词之间用中划线 `-` 链接（尽可能只用一个单词）
* 方法名跟 `namespace` 的命名方式一样
* 方法参数遵循变量的命名规范
* 方法参数之间以 `;` 分隔

关于「私有」：

跟变量一样，没有私有，但以 `_` 打头的方法，切记不要随便引用。

# API

> 由于维护的疏漏，这里有可能跟代码不同步，请查看源码

## 变量

### color

#### 文字颜色

code | 值 | 预览 | 说明
:-- | :-- | :--: | :--
`@G_color_text_error` | `#f15533` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xf15533) |最高级别：报错
`@G_color_text_warn` | `#f15533` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xf15533) | 最高级别：警告
`@G_color_text_emphasis` | `#ff8a00` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xff8a00) | 第二级别：突出说明，如「金额」、「最重要链接」等
`@G_color_text_info` | `#00c1de` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x00c1de) | 第二级别：重要提示、重要连接
`@G_color_text_positive` | `#35b34a` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x35b34a) | 第三级别：积极和正面引导的文本，如「验证通过」、「已支付」等
`@G_color_text_heading` | `#373d41` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x373d41) | 第四级别：标题
`@G_color_text_body` | `#73777a` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x73777a) | 第五级别：正文
`@G_color_text_help` | `#9b9ea0` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x9b9ea0) | 第六级别：最不重要的信息、最低级别的帮助信息
`@G_color_text_hint` | `#c3c5c6` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xc3c5c6) | 第七级别：水印、输入框中的提示文字
`@G_color_link` | `#00c1de` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x00c1de) | 第二级别：重要链接
`@G_color_link_gray` | `#73777a` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x73777a) | 第三级别：次重要链接、列表型链接，如「公告」

#### 背景色（浅色）

code | 值 | 预览 | 说明
:-- | :-- | :--: | :--
`@G_color_bg_error` | `#feeeeb` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xfeeeeb) | 最高级别：错误提示的底色
`@G_color_bg_warn` | `#feeeeb` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xfeeeeb) | 最高级别：警告提示的底色
`@G_color_bg_emphasis` | `#fff3e6` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xfff3e6) | 第二级别：突出说明的底色
`@G_color_bg_info` | `#e6f9fc` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xe6f9fc) | 第二级别：重要说明的底色
`@G_color_bg_positive` | `#ebf7ed` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xebf7ed) | 第三级别：积极和正面引导的文本，如「验证通过」、「已支付」等
`@G_color_bg_dark` | `#d7d8d9` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xd7d8d9) | 强调需要严格强调模块之间差异的场景
`@G_color_bg_heading` | `#ebecec` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xebecec) | 不可点按钮的底色，模块间的区分或模块中信息的层次区分，如「表头」、「卡片标题区」等
`@G_color_bg_light` | `#f5f5f6` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xf5f5f6) | 不可点输入框的底色，页面中用于区分不同区块时的背景底色，以及斑马条表单的底色

#### 线条色（边框）

code | 值 | 预览 | 说明
:-- | :-- | :--: | :--
`@G_color_line_error` | `#f15533` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xf15533) | 最高级别：报错
`@G_color_line_warn` | `#f15533` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xf15533) | 最高级别：警告
`@G_color_line_emphasis` | `#ff8a00` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xff8a00) | 第二级别：突出说明，如「金额」、「最重要链接」等
`@G_color_line_info` | `#00c1de` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x00c1de) | 第二级别：重要提示、重要连接
`@G_color_line_positive` | `#35b34a` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x35b34a) | 第三级别：积极和正面引导的文本，如「验证通过」、「已支付」等
`@G_color_line_dark` | `#373d41` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0x373d41) | 重线，强展示，突出可操作的组件的线 / 边框，如按钮
`@G_color_line_heading` | `#c3c5c6` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xc3c5c6) | 深线，次强展示，可操作的组件的线 / 边框，如「输入框」
`@G_color_line_regular` | `#d7d8d9` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xd7d8d9) | 常规线，常规展示的组件的线 / 边框，如「卡片」
`@G_color_line_light` | `#ebecec` | ![](https://tps.alibaba-inc.com/app/ph/32x32?fontSize=0&bgColor=0xebecec) | 浅线，弱展示，区分段落或不可操作内容的线 / 边框

### 组件相关

code | 值 | 说明
:-- | :-- | :--
`@G_height_top_bar` | `50px` | 控制台通用顶栏高度（如果有顶栏的话，body 上会有个 `hasTopbar` 的 class，可以用它来判断有没有顶栏）
`@G_width_app_menu` | `180px` | 应用侧栏菜单的宽度
`@G_height_app_menu_title` | `50px` | 应用侧栏菜单的标题高度
`@G_height_app_menu_item` | `40px` | 应用侧栏菜单项的一般高度
`@G_height_app_menu_item_s` | `32px` | 应用侧栏菜单项的稍小高度（用于实例列表）
`@G_padding_app_menu` | `20px` | 应用侧栏菜单的左右边距
`@G_z_index_popover` | `1001` | 布局（顶栏 + 侧栏）的 z-index 是 999，next-menu 的 z-index 偏偏是 1001，所以用 next-menu 的作为 popover 的

## 方法

### `#color` namespace

有些颜色需要组合使用，这里主要封装了颜色组合使用的情形。

> 其中的 `@hoveActive` 设为 `true` 表示需要 `:hover` 和 `:active` 状态。

方法 | 说明
:-- | :--
`.error(@hoveActive)` | 错误文本色
`.error-bg(@hoveActive)` | 错误深色背景（白色文字）
`.error-bg-light()` | 错误浅色背景 + 错误文本色
`.warn(@hoveActive)` | 警告文本色
`.warn-bg(@hoveActive)` | 警告深色背景（白色文字）
`.warn-bg-light()` | 警告浅色背景 + 警告文本色
`.info(@hoveActive)` | 提示文本色
`.info-bg(@hoveActive)` | 提示深色背景（白色文字）
`.info-bg-light()` | 提示浅色背景 + 提示文本色
`.success(@hoveActive)` | 成功文本色
`.success-bg(@hoveActive)` | 成功深色背景（白色文字）
`.success-bg-light()` | 成功浅色背景 + 成功文本色

```less
@import '~@ali/wind-less-mixin/index';

.your-selector {
  .error-text {
    #color.error();
  }
  .error-text-with-ha {
    #color.error(true);
  }
  .error-bg {
    #color.error-bg();
  }
  .error-bg-with-ha {
    #color.error-bg(true);
  }
  .error-bg-light {
    #color.error-bg-light(); // 无 :hover :active 设置
  }
}
```

### `#glyph` namespace

iconfont 工厂方法，默认生成以 `glyph-` 打头的 iconfont 样式。

方法 | 说明
:-- | :--
`.base(@fontFamily)` | 设置 glyph 的基础样式（但是 `@fontFamily` 要使用者自己写 `@font-face`），包括几个旋转用的帮助类
`.type(@type; @code; @prefix: glyph)` | 定义一个字体，默认用 `glyph` 为 `className` 前缀，即传入 `@type` 为 `hello` 的话，`className` 则为 `glyph-hello`

例子：

```less
@import '~@ali/wind-less-mixin/index';

// 你需要手动引入自己的 font-face
@font-face {
  font-family: '________'; // 字体名称
  // 这里写相关的 src
  // src: ...;
}

.your-selector {
  #glyph.base(________); // 对应上方的字体名称
  
  #glyph.type(xx; '\e600');
  #glyph.type(yy; '\e601'; 'another-prefix'); // 如果不想用默认的前缀
  // ...
}
```

在你的代码中使用形如 `your-selector glyph-xx` 的复合 `className` 即可。

### `#triangle` namespace

八个方向的三角形生成器。

```
           up
            ▲
       ◤ tl - tr ◥
left ︎◀ |         | ▶ right
       ◣ bl - br ◢
            ︎▼
          down
```

方法 | 说明
:-- | :--
`.base()` | 三角形基础，一般不允许在三角形中添加内容，所以它的宽高都是 0
`.up(@b; @h; @c)` | 向上 ▲
`.down(@b; @h; @c)` | 向下 ▼
`.right(@b; @h; @c)` | 向右 ▶
`.left(@b; @h; @c)` | 向左 ◀
`.tl(@b; @h; @c)` | 左上角 ◤
`.tr(@b; @h; @c)` | 右上角 ◥
`.bl(@b; @h; @c)` | 左下角 ◣
`.br(@b; @h; @c)` | 右下角 ◢

例子：

```less
@import '~@ali/wind-less-mixin/index';

.your-selector {
  #triangle.base();
  #triangle.top(30px; 20px; #f00);
}
```

### `#responsive` namespace

简单的响应式封装方法。

方法 | 说明
:-- | :--
`.retina(@rules)` | 适配视网膜屏
`.above(@min; @rules)` | 在某个宽度之上（包含这个宽度）
`.below(@max; @rules)` | 在某个宽度之下（包含这个宽度）
`.between(@min; @max; @rules)` | 在某个宽度范围之内（包含边界）

例子：

```less
@import '~@ali/wind-less-mixin/index';

.your-selector {
  #responsive.retina { // retina 屏幕
    // ...
  }
  #responsive.above(1024px; { // 超过 1024px 宽度
    // ...
  });
  #responsive.between(800px; 1023px; { // 在 [800px, 1023px] 宽度之间
    // ...
  });
  #responsive.below(799px; { // 小于 799px 宽度
    // ...
  });
}
```

### `#typo` namespace

文字和排版。

方法 | 说明
:-- | :--
`.link(@level: 0)` | 链接，`@level=0` 表示一般的重要连接（一般为蓝色），`@level=1` 表示最重要的连接（一般为橙色），`@level=-1` 表示不重要的链接（一般为深灰色）
`.ellipsis()` | 文字截断

例子：

```less
@import '~@ali/wind-less-mixin/index';

.your-selector {
  .some-text {
    #typo.ellipsis();
  }
  a.very-important {
    #typo.link(1);
  }
}
```

### `#util` namespace

杂项工具。

方法 | 说明
:-- | :--
`.clearfix()` | 修复因内部元素 `float` 造成的容器无高度的问题

例子：

```less
@import '~@ali/wind-less-mixin/index';

ul.your-selector {
  #util.clearfix();
  
  li {
    float: left;
    // ...
  }
}
```
