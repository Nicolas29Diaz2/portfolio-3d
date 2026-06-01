import type { ModelGroupProps } from '@/features/3d-scene/models/types/gltf.types'

export type CharacterProps = ModelGroupProps & {
  introAnimation?: boolean
  sitAnimation?: boolean
  visible?: boolean
  dissolveEyes?: boolean
}
