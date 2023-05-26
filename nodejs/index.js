import { existsSync, readFile } from 'node:fs'
import { createHash } from 'node:crypto'

/**
 * Calculate hash of any string data:
 * - create hash object with specified algorithm
 * - update the hash by passing data to the object
 * - finalize the hashing by digest and specifying the format by default "hex"
 * @param {string} data 
 * @param {string} algorithm By default "sha256"
 * @returns {string} Hash from data
 */
export const generateHash = (data = '', algorithm = 'sha256') => createHash(algorithm).update(data).digest('hex')

/**
 * Generate hash signature from file
 * @param {string} filepath 
 * @param {number} chunksize 50Mb by default
 * @returns {Promise<string>}
 */
export const generateFileHashSignature = (filepath = '', chunksize = 1024 * 1024 * 5) => {
    return new Promise((resolve, reject) => {
        if (!existsSync(filepath)) reject(new Error('File does not exist'))
        else {
            let blocks = []
            readFile(filepath, (err, data) => {
                if (err) reject(err)
                else {
                    for (let i = 0; i < data.length; i += chunksize)
                        blocks.push(generateHash(data.slice(i, i + chunksize).join('')))
                    resolve(generateHash(blocks.join('')))
                }
            })
        }

    })
}