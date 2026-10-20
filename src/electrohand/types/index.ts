export type CableId = 'cable-red' | 'cable-black' | 'cable-blue';
export type TerminalId = 'term-vcc' | 'term-gnd' | 'term-signal';

export type CableState = 'RESTING' | 'DRAGGING' | 'CONNECTED' | 'RETURNING';

export interface CableDefinition {
  id: CableId;
  name: string;
  nameUz: string;
  colorHex: string;
  colorNumber: number;
  expectedTerminalId: TerminalId;
  sourcePos: { x: number; y: number; z: number };
  restPos: { x: number; y: number; z: number };
  descriptionUz: string;
}

export interface TerminalDefinition {
  id: TerminalId;
  name: string;
  nameUz: string;
  label: string;
  colorHex: string;
  position: { x: number; y: number; z: number };
  acceptedCableId: CableId;
  voltageText: string;
  descriptionUz: string;
}

export interface HandLandmarkPoint {
  x: number;
  y: number;
  z: number;
}

export interface GestureDetectionResult {
  isHandDetected: boolean;
  landmarks: HandLandmarkPoint[] | null;
  isPinching: boolean;
  pinchDistance: number; // Normalized distance (0.0 to 1.0)
  pinchStrength: number; // Percentage (0% to 100%)
  screenPoint: { x: number; y: number }; // Mirrored screen space [0, 1]
  worldPoint: { x: number; y: number; z: number } | null;
  rawPinchDistance: number;
}

export type CameraStatus = 'idle' | 'starting' | 'active' | 'error' | 'stopped';

export interface CameraErrorDetails {
  titleUz: string;
  messageUz: string;
  canRetry: boolean;
}

export interface SimulationTask {
  id: string;
  cableId: CableId;
  terminalId: TerminalId;
  titleUz: string;
  descUz: string;
  isCompleted: boolean;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  textUz: string;
  type: ToastType;
  timestamp: number;
}
