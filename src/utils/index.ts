/**
 * Returns a promisified timeout
 * @param ms timeout in milliseconds
 */
export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
