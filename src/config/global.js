let _checkedStarNumber = 0;
let _isStarCehcked = false;

export const myGlobalObject = {


    get checkedStarNumber() {
      // getter logic
     return _checkedStarNumber;
    },
    set checkedStarNumber(value) {
      // setter logic
      _checkedStarNumber=value;
    },

    // get isStarChecked() {
    //   return _isStarCehcked;
    // },
    // set isStarChecked(value){
    //   _isStarCehcked = value;
    // }
  }