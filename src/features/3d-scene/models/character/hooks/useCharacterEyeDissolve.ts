import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { dissolveEyesSpeed } from '@/core/constants/timing'

const COLOR_INITIAL = new THREE.Color('#2A2A2A')
const COLOR_FINAL = new THREE.Color('white')

export function useCharacterEyeDissolve(dissolveEyes: boolean) {
  const fadeFactorRef = useRef(0)
  const fadingRef = useRef(false)
  const eyesMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

  useEffect(() => {
    if (dissolveEyes) {
      fadingRef.current = true
    }
  }, [dissolveEyes])

  useFrame(() => {
    if (fadingRef.current && fadeFactorRef.current < 1) {
      fadeFactorRef.current += dissolveEyesSpeed
      if (eyesMaterialRef.current) {
        eyesMaterialRef.current.color
          .copy(COLOR_INITIAL)
          .lerp(COLOR_FINAL, fadeFactorRef.current)
      }
    } else if (fadeFactorRef.current >= 1 && fadingRef.current) {
      fadingRef.current = false
    }
  })

  return { eyesMaterialRef, initialEyeColor: COLOR_INITIAL }
}
