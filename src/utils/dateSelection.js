export const years = [];
const DateSelect=()=> {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1995; i--) {
      years.push(i);
    }
}

DateSelect();
