import type { GLTF } from 'three-stdlib'
import type { ThreeElements } from '@react-three/fiber'
import type { Material, Mesh, SkinnedMesh } from 'three'

export type ModelGroupProps = ThreeElements['group']

/** useGLTF result — mesh tree typed loosely; JSX node names are immutable from gltfjsx */
export type PortfolioGLTF = GLTF & {
  nodes: Record<string, Mesh | SkinnedMesh>
  materials: Record<string, Material>
}

export function asPortfolioGltf(gltf: GLTF): PortfolioGLTF {
  return gltf as unknown as PortfolioGLTF
}
