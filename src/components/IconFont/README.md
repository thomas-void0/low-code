---
title: IconFont
subGroup: Components
---

## IconFont

使用 IconFont 字体图标库组件

> 注意事项
> iconfont 图标库权限@newrakwanggang 添加
>
> icon 统一(去除颜色)上传到 iconfont 然后使用，记得把最新的(Symbool 类型) iconfont url 修改至 config/fontConfig
>
> 正则统一使用 `new RegExp` 的方式创建，避免 `safari` 兼容性问题

## 使用方法

```tsx
import IconFont from '@/components/IconFont'

// type 为图标 name
;<IconFont type="icon-bofang" />
```
