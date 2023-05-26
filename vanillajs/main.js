/* Variables */
const CHUNKSIZE = 1024 * 1024 * 100   // 100 Mo

const statusElement = document.getElementById('status')

const form = document.getElementById('my-form')

form.addEventListener('submit', async e => {
    e.preventDefault()
    try {
        if (!form['file'].files[0]) throw new Error('File not provided')
        else {
            statusElement.innerText = 'Calculating hash...'
            
            const file = form['file'].files[0]
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            getFileHashSignature(reader, CHUNKSIZE, file.size)
                .then(filehash => {
                    statusElement.innerText = 'HASH: ' + filehash
                })
                .catch(console.error)
        }
    } catch (err) { throw err }
})