// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkJsonEqulity = (data1: any, data2: any): void => {
	const data1Json = JSON.stringify(data1);
	const data2Json = JSON.stringify(data2);

	if (data1Json !== data2Json) {
		throw new Error("Data doesn't match");
	}
};
