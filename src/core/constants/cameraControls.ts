import type {
  BreakpointCoords,
  CameraControlsMap,
  Vector3Coords,
} from "../types";

export const truckSpeed = 0;

const BREAKPOINT_POSITION: BreakpointCoords = {
  extralarge: { x: 1.5, y: 2.5, z: 5 },
  large: { x: 1.2, y: 2.5, z: 5 },
  medium: { x: 1.2, y: 2.5, z: 5.5 },
  small: { x: 1, y: 2.8, z: 7 },
};

const BREAKPOINT_LOOK: BreakpointCoords = {
  extralarge: { x: 2.5, y: 1.2, z: 0 },
  large: { x: 2.2, y: 1.2, z: 0 },
  medium: { x: 1.9, y: 1.2, z: 0 },
  small: { x: 0, y: 2.8, z: 0 },
};

function relativeDistance(
  width: number,
  maxDist: number,
  minDist: number,
  maxWidth = 1440,
  minWidth = 320,
): number {
  const slope = (maxDist - minDist) / (maxWidth - minWidth);
  const intercept = -slope * minWidth + minDist;
  const value = width * slope + intercept;

  if (maxDist > minDist) {
    return Math.max(minDist, Math.min(maxDist, value));
  }

  return Math.min(minDist, Math.max(maxDist, value));
}

function getCoords(
  width: number,
  breakpoints: BreakpointCoords,
): Vector3Coords {
  if (width >= 1440) return breakpoints.extralarge;
  if (width >= 1024) return breakpoints.large;
  if (width >= 768) return breakpoints.medium;
  return breakpoints.small;
}

/** Legacy limits used 0..2π; camera-controls v3 uses -π..π after normalizeRotations(). */
function azimuthLimitForV3(legacyRadians: number): number {
  let theta = legacyRadians % (Math.PI * 2);
  if (theta > Math.PI) {
    theta -= Math.PI * 2;
  }
  return theta;
}

export function getCameraControls(
  viewportWidth = window.innerWidth,
): CameraControlsMap {
  const xDistanceAbout = relativeDistance(viewportWidth, 6.33, 3.64);
  const zPositionProjects = relativeDistance(viewportWidth, 3.5, 2.32);
  const xPositionSkills = relativeDistance(viewportWidth, -5.52, -2.04);
  const zPositionSkills = relativeDistance(viewportWidth, -1.91, -0.61);
  const xPositionCharacter = relativeDistance(viewportWidth, 2.66, 1.69);
  const yPositionCharacter = relativeDistance(viewportWidth, 1.62, 3.29);
  const zPositionCharacter = relativeDistance(viewportWidth, 3.07, 5.08);
  const xPositionMenu = relativeDistance(viewportWidth, 1.31, 1.5, 1024);
  const yPositionMenu = relativeDistance(viewportWidth, 1.48, 2.32, 1024);
  const zPositionMenu = relativeDistance(viewportWidth, 0.81, 1.21, 1024);
  const yPositionContact = relativeDistance(viewportWidth, 3.5, 3.59);
  const zPositionContact = relativeDistance(viewportWidth, -5.45, -4.72);
  const positionInitial = getCoords(viewportWidth, BREAKPOINT_POSITION);
  const lookInitial = getCoords(viewportWidth, BREAKPOINT_LOOK);

  return {
    SKILLS: {
      rotation: {
        polar: { speed: 0, min: 0, max: Math.PI },
        azimuth: { speed: 0, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 0.8, min: 2, max: 8 },
      coordCamera: { x: xPositionSkills, y: 3.95, z: zPositionSkills },
      coordLook: { x: -7.87, y: 3.96, z: -2.85 },
    },
    CHARACTER: {
      rotation: {
        polar: { speed: 1, min: Math.PI / 4, max: Math.PI / 2.5 },
        azimuth: { speed: 1, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 0, min: 0, max: 6 },
      coordCamera: {
        x: xPositionCharacter,
        y: yPositionCharacter,
        z: zPositionCharacter,
      },
      coordLook: { x: 0.5, y: 1, z: 0 },
    },
    INITIAL: {
      rotation: {
        polar: { speed: 0, min: 0, max: Math.PI },
        azimuth: { speed: 0, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 0, min: 1, max: 15 },
      coordCamera: positionInitial,
      coordLook: lookInitial,
    },
    CONTACT: {
      rotation: {
        polar: { speed: 0, min: 0, max: Math.PI },
        azimuth: { speed: 0, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 0, min: 2, max: 6 },
      coordCamera: { x: 0.18, y: yPositionContact, z: zPositionContact },
      coordLook: { x: 0.275, y: 3, z: -8 },
    },
    PROJECTS: {
      rotation: {
        polar: { speed: 0, min: 0, max: Math.PI },
        azimuth: { speed: 0, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 1, min: 3, max: 11 },
      coordCamera: { x: 0.6, y: 2.55, z: zPositionProjects },
      coordLook: { x: 0.6, y: 2.55, z: 7 },
    },
    ABOUT: {
      rotation: {
        polar: { speed: 1, min: 1.15, max: 1.7 },
        azimuth: {
          speed: 1,
          min: azimuthLimitForV3(3.6),
          max: azimuthLimitForV3(5.6),
        },
      },
      dolly: { speed: 0.5, min: 2.6, max: 7.7 },
      coordCamera: { x: xDistanceAbout, y: 2.78, z: 0.5 },
      coordLook: { x: 8.93, y: 2.78, z: 0.55 },
    },
    MENU: {
      rotation: {
        polar: { speed: 0, min: 0, max: Math.PI },
        azimuth: { speed: 0, min: -Infinity, max: Infinity },
      },
      dolly: { speed: 0, min: 0, max: 10 },
      coordCamera: { x: xPositionMenu, y: yPositionMenu, z: zPositionMenu },
      coordLook: { x: 1.5, y: 0.5, z: 0 },
    },
  };
}

export function getInitialCameraLookAt(viewportWidth = window.innerWidth): {
  camera: Vector3Coords;
  target: Vector3Coords;
} {
  if (viewportWidth >= 1440) {
    return {
      camera: { x: 1.3, y: 3.5, z: 6 },
      target: { x: 3.3, y: 1.2, z: 0 },
    };
  }

  if (viewportWidth >= 1024) {
    return {
      camera: { x: 1.8, y: 3.5, z: 6 },
      target: { x: 2.8, y: 1.2, z: 0 },
    };
  }

  if (viewportWidth >= 768) {
    return {
      camera: { x: 1.2, y: 3.5, z: 6 },
      target: { x: 2.2, y: 1.2, z: 0 },
    };
  }

  return {
    camera: { x: 1, y: 5, z: 8 },
    target: { x: 0, y: 3, z: 0 },
  };
}
