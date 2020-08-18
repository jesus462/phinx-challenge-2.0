//these function help us to check and restrict the length of the string that we want to show.

export const stringChecker = string => {
	let previewStringArray = [];

	if (string === null) {
		return;
	} else {
		for (let i = 0; i < 10; i++) {
			previewStringArray.push(string.split(" ")[i]);
		}
		return `${previewStringArray.join(" ")}...`;
	}
};