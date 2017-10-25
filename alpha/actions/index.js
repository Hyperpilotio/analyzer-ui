import * as types from "./types";


export const addToHyperPilot = appId => ({
  type: types.ADD_TO_HYPERPILOT,
  appId,
});

export const removeFromHyperPilot = appId => ({
  type: types.REMOVE_FROM_HYPERPILOT,
  appId,
});
