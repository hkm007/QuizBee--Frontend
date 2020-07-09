export const initialstateLoading = false;

export const reducerLoading = (state, action) => {
    if(action.type === "SHOW") {
        return true;
    }
    else if(action.type === "HIDE") {
        return false;
    }
    else {
        return state;
    }
}