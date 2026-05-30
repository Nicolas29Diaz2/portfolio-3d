import { Environment, MeshReflectorMaterial, Stars } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEnvironmentSettings } from '@/features/3d-scene/environment/hooks/useEnvironmentSettings'
import { SCENE_ENVIRONMENT_CONSTANTS } from '@/features/3d-scene/environment/types/environment.types'
import { useSceneStore } from '@/store/sceneStore'

export function SceneEnvironment() {
  const gpuTier = useSceneStore((state) => state.gpuTier)
  const { settings, bloom } = useEnvironmentSettings(gpuTier)

  return (
    <>
      <color attach="background" args={[settings.backgroundColor]} />
      <Environment preset={SCENE_ENVIRONMENT_CONSTANTS.environmentPreset} />
      <EffectComposer>
        <Bloom
          intensity={bloom.intensity}
          luminanceThreshold={bloom.luminanceThreshold}
          luminanceSmoothing={bloom.luminanceSmoothing}
        />
      </EffectComposer>

      <fogExp2
        attach="fog"
        args={[settings.fogColor, SCENE_ENVIRONMENT_CONSTANTS.fogDensity]}
      />

      <Stars
        radius={SCENE_ENVIRONMENT_CONSTANTS.starsRadius}
        depth={SCENE_ENVIRONMENT_CONSTANTS.starsDepth}
        count={settings.starsCount}
        factor={settings.starsFactor}
        saturation={SCENE_ENVIRONMENT_CONSTANTS.starsSaturation}
        fade={SCENE_ENVIRONMENT_CONSTANTS.starsFade}
        speed={SCENE_ENVIRONMENT_CONSTANTS.starsSpeed}
      />

      <mesh
        rotation={[...SCENE_ENVIRONMENT_CONSTANTS.floorRotation]}
        position-y={SCENE_ENVIRONMENT_CONSTANTS.floorPositionY}
      >
        <planeGeometry args={[...SCENE_ENVIRONMENT_CONSTANTS.floorSize]} />
        <MeshReflectorMaterial
          blur={settings.blur}
          resolution={settings.floorResolution}
          mixBlur={SCENE_ENVIRONMENT_CONSTANTS.reflectorMixBlur}
          mixStrength={settings.mixStrength}
          depthScale={settings.depthScale}
          minDepthThreshold={
            SCENE_ENVIRONMENT_CONSTANTS.reflectorMinDepthThreshold
          }
          maxDepthThreshold={
            SCENE_ENVIRONMENT_CONSTANTS.reflectorMaxDepthThreshold
          }
          color={SCENE_ENVIRONMENT_CONSTANTS.reflectorColor}
          metalness={SCENE_ENVIRONMENT_CONSTANTS.reflectorMetalness}
        />
      </mesh>
    </>
  )
}
