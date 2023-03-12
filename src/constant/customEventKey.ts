// CUSTOM EVENT KEY
export const PLAYER_SHOOT = 'CustomEvent:playerShoot';
export const THROWING_OBJECT_REMOVE = 'CustomEvent:throwingObjectRemove';

export const ALL_CUSTOM_EVENT_KEY = {
  PLAYER_SHOOT,
  THROWING_OBJECT_REMOVE,
} as const;

export default ALL_CUSTOM_EVENT_KEY;
