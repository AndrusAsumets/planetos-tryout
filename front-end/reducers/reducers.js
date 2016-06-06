import { SET_INTRA_DAY, SET_API } from './../actions/actions'

let defaultState = {
    energy: [],
    solar: [],
    cloud: []
};

/**
 * Describes how stores state should be changed for a given action.
 * @param state - current state of the store
 * @param action - dispatched action
 * @returns {*} - new store state. NB new object. No mutations on existing store.
 */
export default function reducers(state = defaultState, action = {}) {
    switch (action.type) {
        case SET_INTRA_DAY:
            return Object.assign({}, state, {
                energy: action.data.response
            });
            case SET_API:
                var newState = {};

                newState[action.data.type] = action.data.data.entries;

                return Object.assign({}, state, newState);
        default:
            return state;
    }
}
