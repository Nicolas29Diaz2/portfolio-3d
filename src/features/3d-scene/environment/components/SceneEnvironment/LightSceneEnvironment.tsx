import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
} from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import {
  LIGHT_SCENE_CONSTANTS,
  SCENE_ENVIRONMENT_PRESET,
} from '@/features/3d-scene/environment/types/environment.types'

const { bloom, vignette, shadows, randomizedLight, environment } =
  LIGHT_SCENE_CONSTANTS

export function LightSceneEnvironment() {
  return (
    <>
      <EffectComposer>
        <Bloom
          mipmapBlur={bloom.mipmapBlur}
          luminanceThreshold={bloom.luminanceThreshold}
          intensity={bloom.intensity}
        />
        <Vignette
          eskil={vignette.eskil}
          offset={vignette.offset}
          darkness={vignette.darkness}
        />
      </EffectComposer>

      <ambientLight intensity={LIGHT_SCENE_CONSTANTS.ambientLightIntensity} />

      <AccumulativeShadows
        position={[...shadows.position]}
        frames={shadows.frames}
        alphaTest={shadows.alphaTest}
        scale={shadows.scale}
      >
        <RandomizedLight
          amount={randomizedLight.amount}
          radius={randomizedLight.radius}
          ambient={randomizedLight.ambient}
          position={[...randomizedLight.position]}
        />
      </AccumulativeShadows>

      <Environment
        resolution={environment.resolution}
        background={environment.background}
        blur={environment.blur}
        preset={SCENE_ENVIRONMENT_PRESET}
      />
    </>
  )
}
