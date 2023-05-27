/**
 * Calculate and digest hash from the whole buffer blocks of the file
 * @param {FileReader} fileReader Reader that performs the file reading and can provide file array buffer
 * @param {number} chunksize Fixed size for dividing file array buffer to many blocks
 * @param {number} filesize Size of file
 * @returns {Promise<string>} Hash of the whole file
 */
function getFileHashSignature(fileReader = new FileReader(), chunksize = 0, filesize = 0) {
    return new Promise((resolve, reject) => {
        fileReader.onload = async (e) => {
            let blocks = []
            const buffers = new Uint8Array(e.target.result)

            for (let i = 0; i < filesize; i += chunksize)
                blocks.push(await generateHash(buffers.slice(i, i + chunksize).join('')))
            resolve(await generateHash(blocks.join('')))
        }
        fileReader.onerror = (e) => reject(e.target.error)
    })
}