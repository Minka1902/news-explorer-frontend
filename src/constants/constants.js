const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const findMonth = (month) => {
	let index;
	if(month.length === 2){
		index = Number(month) - 1;
	}else{
		index = shortMonthArray.indexOf(month);
	}
	return monthArray[index];
};

export default findMonth;
