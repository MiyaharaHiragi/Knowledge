import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem 2rem 0 2rem;
}

.flex-component {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap:5rem;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
