const userAgent = window.navigator.userAgent;

/**
 * Check if browser userAgent is IE.
 *
 * @return {boolean}
 */
const isIe = () => {
	const trident = userAgent.indexOf('Trident/');

	return trident > 0
}

/**
 * Check if browser userAgent is Edge.
 *
 * @return {bollean}
 */
const isEdge = () => {
	const edge = userAgent.indexOf('Edge/');

	return edge > 0;
}

export {
	isIe,
	isEdge,
}
