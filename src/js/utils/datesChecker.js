// This function takes the date of the API and then refactors it. 
export const datesChecker = dateArray => {
    // This filters the array of dates that the API has, and we secure the one we want.
    let dateFilter = dateArray.filter(date => {
        return date.type === "onsaleDate";
    });

    let year = dateFilter[0].date.split("-")[0];
	let month = dateFilter[0].date.split("-")[1];
    let day = dateFilter[0].date.split("-")[2].split("T")[0];
    let sortedDate = new Date(year, month, day).toDateString().split(' ');

    return `${sortedDate[1]} ${sortedDate[2]}, ${sortedDate[3]}`;
};