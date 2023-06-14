 // Getting error message
 export const getErrorMsg = (e)=>{
    const fullErrorMessage = e.message;
    const removeSlashFromMsg = fullErrorMessage.split("/")[1].trim();
    return "Error: " + removeSlashFromMsg.split(")")[0].trim();
}