import { format, formatDistanceToNow, parse } from 'date-fns';

// get the time like "about 1 hour ago", "1 day ago" etc
export function calculateRelativeTime(date) {
    // console.log(date);
     return formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true });
}

 // getthing the date in right format for firestore Database
 export const getDateInRightFormat = (date)=>{
    const formattedDate = date.toISOString().split('.')[0];
    // console.log(formattedDate)
    return formattedDate;
  }