export default (state = [], action) => {
    if(action.type === "REGISTER_ACTION"){
        return action.payload;
    }
    return state;
}