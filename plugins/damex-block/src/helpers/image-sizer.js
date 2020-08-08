/**
 * Iterate over image sizes and create a srcset attribute. Removes last ','.
 */
export function imageSizer(sizes) {
	const EMPTY_STRING = ""
	if (sizes === undefined || sizes === null) {
		return EMPTY_STRING;
	}

	return Object.keys(sizes).reduce((srcset, size) => {
		return (srcset + `${sizes[size].url} ${sizes[size].width}w, `);
	}, EMPTY_STRING).slice(0, -2)
}
