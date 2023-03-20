export interface Node {
  id: string
  [key: string]: any
  children?: Node[]
}

export default function arrayToTree<T>(
  data: (Node & T)[],
  parentKey: string
): (Node & T)[] {
  const tree: { [id: string]: Node & T } = {}
  const lookup: { [id: string]: Node & T } = {}

  data.forEach((item: Node & T) => {
    const { id, [parentKey]: parentId, ...rest } = item
    lookup[id] = { id, ...rest } as Node & T
    const parentNode = lookup[parentId]
    if (parentNode) {
      parentNode.children = parentNode.children || []
      parentNode.children.push(lookup[id])
    } else {
      tree[id] = lookup[id]
    }
  })

  return Object.values(tree)
}
