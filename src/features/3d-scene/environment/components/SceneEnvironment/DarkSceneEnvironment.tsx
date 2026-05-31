import { Environment, MeshReflectorMaterial, Stars } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEnvironmentSettings } from '@/features/3d-scene/environment/hooks/useEnvironmentSettings'
import {
  DARK_SCENE_CONSTANTS,
  SCENE_ENVIRONMENT_PRESET,
} from '@/features/3d-scene/environment/types/environment.types'
import type { GpuTier } from '@/core/performance/types'

type DarkSceneEnvironmentProps = {
  gpuTier: GpuTier
}

export function DarkSceneEnvironment({ gpuTier }: DarkSceneEnvironmentProps) {
  const { settings, bloom } = useEnvironmentSettings(gpuTier)

  return (
    <>
      <color attach="background" args={[settings.backgroundColor]} />
      <Environment preset={SCENE_ENVIRONMENT_PRESET} />
      <EffectComposer>
        <Bloom
          intensity={bloom.intensity}
          luminanceThreshold={bloom.luminanceThreshold}
          luminanceSmoothing={bloom.luminanceSmoothing}
        />
      </EffectComposer>

      <fogExp2
        attach="fog"
        args={[settings.fogColor, DARK_SCENE_CONSTANTS.fogDensity]}
      />

      <Stars
        radius={DARK_SCENE_CONSTANTS.starsRadius}
        depth={DARK_SCENE_CONSTANTS.starsDepth}
        count={settings.starsCount}
        factor={settings.starsFactor}
        saturation={DARK_SCENE_CONSTANTS.starsSaturation}
        fade={DARK_SCENE_CONSTANTS.starsFade}
        speed={DARK_SCENE_CONSTANTS.starsSpeed}
      />

      <mesh
        rotation={[...DARK_SCENE_CONSTANTS.floorRotation]}
        position-y={DARK_SCENE_CONSTANTS.floorPositionY}
      >
        <planeGeometry args={[...DARK_SCENE_CONSTANTS.floorSize]} />
        <MeshReflectorMaterial
          blur={settings.blur}
          resolution={settings.floorResolution}
          mixBlur={DARK_SCENE_CONSTANTS.reflectorMixBlur}
          mixStrength={settings.mixStrength}
          depthScale={settings.depthScale}
          minDepthThreshold={DARK_SCENE_CONSTANTS.reflectorMinDepthThreshold}
          maxDepthThreshold={DARK_SCENE_CONSTANTS.reflectorMaxDepthThreshold}
          color={DARK_SCENE_CONSTANTS.reflectorColor}
          metalness={DARK_SCENE_CONSTANTS.reflectorMetalness}
        />
      </mesh>
    </>
  )
}
