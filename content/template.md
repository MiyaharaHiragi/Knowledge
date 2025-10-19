---
title: 範例筆記
date: 2025-10-18
tags:
  - 範例
  - Quartz
  - Obsidian
---
# Update
````bash
npx quartz build --serve
npx quartz sync
git add .
git commit -m"update"
git push
````
# 這是一級標題 (H1)

歡迎來到您的 Quartz 網站！這是一篇用 Markdown 語法寫成的範例筆記，用來展示各種常見的格式。

## 這是二級標題 (H2)

您可以使用標題來組織文章的結構。在 Obsidian 中寫作，發佈後在網站上也能看到同樣的結構。

### 基本文字格式

這裡是些基本的文字格式範例：

* **這是粗體文字**
* *這是斜體文字*
* ~~這是刪除線~~
* `這是行內程式碼`
* 您也可以 **組合*這些*格式**。

### 列表

#### 無序列表
* 項目一
* 項目二
    * 子項目 A
    * 子項目 B

#### 有序列表
1.  第一個步驟
2.  第二個步驟
3.  第三個步驟

#### 任務列表 (Checklist)
- [x] 已完成的項目
- [ ] 未完成的項目
- [ ] 另一個待辦事項

### 連結

Quartz 最強大的功能之一就是處理連結。

* **內部連結（Wiki-links）**：這是一個連到 [[另一篇筆記]] 的連結。在網站上，它會被自動轉換成可以點擊的頁面連結。
* **外部連結**：您可以直接插入網址，例如 [Google](https://www.google.com)。

### 引用區塊

> 這是一個引用區塊。通常用來引述名言、重點摘要，或是特別需要強調的段落。
> — 某人

### 程式碼區塊

對於技術筆記，程式碼區塊非常有用，並且支援語法高亮。

```python
def hello_quartz():
    """一個簡單的 Python 函數"""
    site_name = "My Quartz Site"
    print(f"歡迎來到 {site_name}！")

hello_quartz()
```