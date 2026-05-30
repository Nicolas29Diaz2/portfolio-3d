import type { PortfolioView } from "./portfolioView";

export type Vector3Coords = {
  x: number;
  y: number;
  z: number;
};

export type RotationAxisConfig = {
  speed: number;
  min: number;
  max: number;
};

export type CameraRotationConfig = {
  polar: RotationAxisConfig;
  azimuth: RotationAxisConfig;
};

export type CameraDollyConfig = {
  speed: number;
  min: number;
  max: number;
};

export type CameraViewConfig = {
  rotation: CameraRotationConfig;
  dolly: CameraDollyConfig;
  coordCamera: Vector3Coords;
  coordLook: Vector3Coords;
};

export type CameraControlsMap = Record<PortfolioView, CameraViewConfig>;

export type BreakpointCoords = {
  extralarge: Vector3Coords;
  large: Vector3Coords;
  medium: Vector3Coords;
  small: Vector3Coords;
};
