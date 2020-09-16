export default (loginObj)=> {
    return {
        type: "LOGIN_ACTION",
        payload: loginObj
    }
}