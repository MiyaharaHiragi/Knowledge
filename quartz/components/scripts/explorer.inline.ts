import { FileTrieNode } from "../../util/fileTrie"
import { FullSlug, resolveRelative } from "../../util/path"
import { ContentDetails } from "../../plugins/emitters/contentIndex"

let explorerInitialized = false

function createFileNode(currentSlug: FullSlug, node: FileTrieNode): HTMLLIElement {
  const tpl = document.getElementById("template-file") as HTMLTemplateElement
  const clone = tpl.content.cloneNode(true) as DocumentFragment
  const li = clone.querySelector("li") as HTMLLIElement
  const a = li.querySelector("a") as HTMLAnchorElement
  a.href = resolveRelative(currentSlug, node.slug)
  a.textContent = node.displayName
  if (window.location.pathname.includes(node.slug)) a.classList.add("active")
  return li
}

function createDropdownNode(currentSlug: FullSlug, node: FileTrieNode): HTMLLIElement {
  const tpl = document.getElementById("template-folder") as HTMLTemplateElement
  const clone = tpl.content.cloneNode(true) as DocumentFragment
  const li = clone.querySelector("li") as HTMLLIElement
  const btn = li.querySelector(".folder-button") as HTMLElement
  const title = li.querySelector(".folder-title") as HTMLElement
  const ul = li.querySelector(".dropdown-menu") as HTMLElement
  const arrow = li.querySelector(".arrow-icon") as SVGElement

  title.textContent = node.displayName

  btn.addEventListener("click", (e) => {
    e.preventDefault()
    li.classList.toggle("open")
    arrow.classList.toggle("rotate")
  })

  for (const child of node.children) {
    const childNode = child.isFolder
      ? createDropdownNode(currentSlug, child)
      : createFileNode(currentSlug, child)
    ul.appendChild(childNode)
  }
  return li
}

// === 初始化 Explorer ===
async function setupExplorer() {
  const explorer = document.querySelector(".explorer") as HTMLElement
  const root = document.querySelector(".dropdown-root") as HTMLElement
  if (!explorer || !root) return

  const currentSlug = (window.location.pathname || "/") as FullSlug
  const data = await fetchData.catch(() => ({})) // 確保 fetchData 可用
  if (!data || Object.keys(data).length === 0) {
    console.warn("⚠️ Explorer data not ready yet.")
    return
  }

  const entries = [...Object.entries(data)] as [FullSlug, ContentDetails][]
  const trie = FileTrieNode.fromEntries(entries)

  root.innerHTML = ""
  const fragment = document.createDocumentFragment()
  for (const child of trie.children) {
    const node = child.isFolder
      ? createDropdownNode(currentSlug, child)
      : createFileNode(currentSlug, child)
    fragment.appendChild(node)
  }
  root.appendChild(fragment)
  explorerInitialized = true
  console.log("✅ Explorer loaded successfully.")
}

// === 控制 Explorer 漂浮開關 ===
function bindExplorerFloat() {
  const explorer = document.querySelector(".explorer") as HTMLElement
  const toggle = explorer.querySelector(".explorer-toggle") as HTMLElement
  const arrow = explorer.querySelector(".explorer-arrow") as SVGElement

  toggle.addEventListener("click", async (e) => {
    e.stopPropagation()
    const isOpen = explorer.classList.toggle("open")
    arrow.classList.toggle("rotate", isOpen)

    // ✅ 第一次點擊時初始化
    if (isOpen && !explorerInitialized) {
      await setupExplorer()
    }
  })

  // 點擊外部時關閉
  document.addEventListener("click", (e) => {
    if (!explorer.contains(e.target as Node)) {
      explorer.classList.remove("open")
      arrow.classList.remove("rotate")
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  bindExplorerFloat()
})

// ✅ Quartz Router 切換時重新建樹
document.addEventListener("nav", async () => {
  if (explorerInitialized) await setupExplorer()
})
