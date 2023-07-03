 // Getting error message
 export const getErrorMsg = (e)=>{
    const fullErrorMessage = e.message;
    const removeSlashFromMsg = fullErrorMessage.split("/")[1].trim();
    // return "Error: " + removeSlashFromMsg.split(")")[0].trim();
    let error = removeSlashFromMsg.split(")")[0].trim();

    if(error==="invalid-email")
    error="Please use the right email";
    else if(error==="missing-password")
    error="Please enter the password";
    else if(error==="weak-password")
    error="Your password is very weak"
    else if(error==="user-not-found")
    error="User not found";

    return "Error: "+error;
}