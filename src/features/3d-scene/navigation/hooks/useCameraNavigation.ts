import { useCallback, useEffect, useRef, useState } from 'react'
import type { CameraControls as CameraControlsImpl } from '@react-three/drei'
import {
  getCameraControls,
  getInitialCameraLookAt,
  truckSpeed,
} from '@/core/constants/cameraControls'
import type { CameraControlsMap } from '@/core/types/cameraControls'
import {
  enableCameraMovementTime,
  fixedMoveCameraToObjectTime,
  showFloatButtonsTime,
} from '@/core/constants/timing'
import { PortfolioView } from '@/core/types/portfolioView'
import {
  FLOAT_BUTTON_PLACEMENTS,
  type ChangeViewHandler,
  type UseCameraNavigationOptions,
  type UseCameraNavigationReturn,
} from '@/features/3d-scene/navigation/types/navigation3d.types'
import { useNavigationStore } from '@/store/navigationStore'
import { useSceneStore } from '@/store/sceneStore'

export function useCameraNavigation({
  moveInitialCamera,
}: UseCameraNavigationOptions): UseCameraNavigationReturn {
  const cameraControlRef = useRef<CameraControlsImpl | null>(null)
  const [cameraControls, setCameraControls] = useState<CameraControlsMap>(() =>
    getCameraControls(),
  )

  // Ref instead of state: this flag doesn't need to trigger re-renders,
  // it only gates a camera mutation inside an effect.
  const firstViewToCharacterRef = useRef(true)

  // ─── Store selectors ────────────────────────────────────────────────────────

  const cameraFocus = useSceneStore((state) => state.cameraFocus)
  const setCameraFocus = useSceneStore((state) => state.setCameraFocus)

  const isCancelButtonPressed = useNavigationStore(
    (state) => state.isCancelButtonPressed,
  )
  const setCancelButtonPressed = useNavigationStore(
    (state) => state.setCancelButtonPressed,
  )
  const setCancelButtonVisibility = useNavigationStore(
    (state) => state.setCancelButtonVisibility,
  )
  const isStartButtonPressed = useNavigationStore(
    (state) => state.isStartButtonPressed,
  )
  const setStartButtonVisibility = useNavigationStore(
    (state) => state.setStartButtonVisibility,
  )
  const setShowFloatButtons = useNavigationStore(
    (state) => state.setShowFloatButtons,
  )
  const isMenuView = useNavigationStore((state) => state.isMenuView)
  const setMenuView = useNavigationStore((state) => state.setMenuView)
  const menuOption = useNavigationStore((state) => state.menuOption)
  const setMenuOption = useNavigationStore((state) => state.setMenuOption)
  const setMenuButtonVisible = useNavigationStore(
    (state) => state.setMenuButtonVisible,
  )

  // ─── Pure camera mutations (no setState calls) ──────────────────────────────

  const moveCameraToObject = useCallback(() => {
    const camera = cameraControlRef.current
    if (!camera) return

    const { coordCamera, coordLook } = cameraControls[cameraFocus]
    camera.normalizeRotations()
    camera.setLookAt(
      coordCamera.x,
      coordCamera.y,
      coordCamera.z,
      coordLook.x,
      coordLook.y,
      coordLook.z,
      true,
    )
  }, [cameraControls, cameraFocus])

  // Renamed from updateControlsCamera. Only mutates the camera object —
  // all setState logic has been moved to the effects that call this.
  const applyControlsConfig = useCallback(() => {
    const camera = cameraControlRef.current
    if (!camera) return

    const { dolly, rotation } = cameraControls[cameraFocus]

    camera.dollySpeed = dolly.speed
    camera.minDistance = dolly.min
    camera.maxDistance = dolly.max

    camera.polarRotateSpeed = rotation.polar.speed
    camera.maxPolarAngle = rotation.polar.max
    camera.minPolarAngle = rotation.polar.min

    camera.azimuthRotateSpeed = rotation.azimuth.speed
    camera.minAzimuthAngle = rotation.azimuth.min
    camera.maxAzimuthAngle = rotation.azimuth.max
  }, [cameraControls, cameraFocus])

  const setCameraLookAt = useCallback((width: number) => {
    const camera = cameraControlRef.current
    if (!camera) return

    const { camera: cam, target } = getInitialCameraLookAt(width)
    camera.setLookAt(
      cam.x,
      cam.y,
      cam.z,
      target.x,
      target.y,
      target.z,
      false,
    )
  }, [])

  // ─── Navigation helpers ─────────────────────────────────────────────────────

  const changeView: ChangeViewHandler = useCallback(
    (view, showFloatButtons = false) => {
      setCameraFocus(view)
      setShowFloatButtons(showFloatButtons)
    },
    [setCameraFocus, setShowFloatButtons],
  )

  const updateCancelButtonVisibility = useCallback(() => {
    const isSubView =
      cameraFocus !== PortfolioView.CHARACTER &&
      cameraFocus !== PortfolioView.INITIAL
    setCancelButtonVisibility(isSubView)
  }, [cameraFocus, setCancelButtonVisibility])

  const handleResize = useCallback(() => {
    setCameraControls(getCameraControls())
  }, [])

  // ─── Effects ────────────────────────────────────────────────────────────────

  // Reapply camera config and reposition when the controls map changes (resize).
  useEffect(() => {
    applyControlsConfig()
    moveCameraToObject()
  }, [cameraControls, applyControlsConfig, moveCameraToObject])

  // Main navigation: runs on every view change.
  useEffect(() => {
    applyControlsConfig()
    setMenuButtonVisible(cameraFocus === PortfolioView.CHARACTER)

    if (cameraFocus === PortfolioView.INITIAL) {
      setCameraLookAt(globalThis.innerWidth)
    } else {
      moveCameraToObject()
      globalThis.setTimeout(updateCancelButtonVisibility, fixedMoveCameraToObjectTime)
    }

    // On the first transition to the character view, temporarily lock
    // camera rotation so it doesn't fight the intro animation.
    if (firstViewToCharacterRef.current) {
      const camera = cameraControlRef.current
      if (camera) {
        camera.polarRotateSpeed = 0
        camera.azimuthRotateSpeed = 0
      }
      firstViewToCharacterRef.current = false

      globalThis.setTimeout(() => {
        const controls = cameraControlRef.current
        const { rotation } = cameraControls[cameraFocus]
        if (!controls) return
        controls.polarRotateSpeed = rotation.polar.speed
        controls.azimuthRotateSpeed = rotation.azimuth.speed
      }, enableCameraMovementTime)
    }

    globalThis.addEventListener('resize', handleResize)
    return () => globalThis.removeEventListener('resize', handleResize)
  }, [
    applyControlsConfig,
    cameraControls,
    cameraFocus,
    handleResize,
    moveCameraToObject,
    setCameraLookAt,
    setMenuButtonVisible,
    updateCancelButtonVisibility,
  ])

  // Start button: kick off intro flow.
  // All setters are batched in setTimeout(0) to avoid synchronous setState
  // calls inside the effect body.
  useEffect(() => {
    if (!isStartButtonPressed) return

    globalThis.setTimeout(() => {
      setStartButtonVisibility(false)
      changeView(PortfolioView.CHARACTER, false)
      firstViewToCharacterRef.current = true
    }, 0)

    globalThis.setTimeout(() => {
      setShowFloatButtons(true)
    }, showFloatButtonsTime)
  }, [changeView, isStartButtonPressed, setShowFloatButtons, setStartButtonVisibility])

  // Cancel button: return to character view.
  useEffect(() => {
    if (!isCancelButtonPressed) return

    globalThis.setTimeout(() => {
      setCancelButtonPressed(false)
      setCancelButtonVisibility(false)
      changeView(PortfolioView.CHARACTER, true)
    }, 0)
  }, [
    changeView,
    isCancelButtonPressed,
    setCancelButtonPressed,
    setCancelButtonVisibility,
  ])

  // Menu view toggle.
  useEffect(() => {
    if (!isMenuView) return

    globalThis.setTimeout(() => {
      changeView(PortfolioView.MENU)
      setMenuView(false)
    }, 0)
  }, [changeView, isMenuView, setMenuView])

  // Menu option selection.
  useEffect(() => {
    if (menuOption === null) return

    globalThis.setTimeout(() => {
      setCancelButtonVisibility(false)
      changeView(menuOption)
      setMenuOption(null)
    }, 0)
  }, [changeView, menuOption, setCancelButtonVisibility, setMenuOption])

  // External trigger to reposition the camera on the initial view.
  useEffect(() => {
    if (moveInitialCamera && cameraFocus === PortfolioView.INITIAL) {
      moveCameraToObject()
    }
  }, [cameraFocus, moveInitialCamera, moveCameraToObject])

  return {
    cameraControlRef,
    truckSpeed,
    changeView,
    floatButtonPlacements: FLOAT_BUTTON_PLACEMENTS,
  }
}