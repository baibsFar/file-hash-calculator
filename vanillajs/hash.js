/**
 * Calculate hash of any string data
 * @param {string} data 
 * @returns {Promise<string | null>} Hash from data
 */
async function generateHash(data = '') {
    if (data && data.length > 0) {
        const dataUInt8 = new TextEncoder().encode(data) 
        const hashBuff = await crypto.subtle.digest('SHA-256', dataUInt8)
        const hashHex = Array.from(new Uint8Array(hashBuff))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('')
        return hashHex
    } else return null
}