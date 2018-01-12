import _ from "lodash";
import * as types from "../actions/types";

const initialState = {
  apps: {
    pending: false,
    refreshing: false,
    fulfilled: false,
    rejected: false,
    settled: false,
    maps:{
      1: {
        pending: false,
        refreshing: false,
        fulfilled: false,
        rejected: false,
        settled: false,
      }, 
      2: {
        pending: false,
        refreshing: false,
        fulfilled: false,
        rejected: false,
        settled: false,
      },
      3: {
        pending: false,
        refreshing: false,
        fulfilled: false,
        rejected: false,
        settled: false,
      },
    }
  },

  incidents: {
    pending: false,
    refreshing: false,
    fulfilled: false,
    rejected: false,
    settled: false,
    maps:{
      
    }
  },
}


export default (initialState, action) =>{
  switch (action.type) {
    case types.
  }
}