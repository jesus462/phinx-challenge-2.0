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