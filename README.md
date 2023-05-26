# 🧮 File hash calculator
This repo contains many functions that are used for hash calculation from file content. The calculated has is used to verify or check the file's integrity while uploading that to a server and so we can determine if the file had or not been corrupted, modified or missing part of its content.

# 🤓 Usage
- Clone this repo
- Or copy code from the source
- Check some codes in **Example** section
- Send the calculated hash from file from client to the server while uploading the file. So that calculate in your server the hash too and just compare the two hashes. If those are same so that you're good and your file has been successfully uploaded without any errors 🥳🤩.

# Example of calculating hash
## VanillaJS
- client/index.html
```html
<form id="my-form">
    <input type="file" name="file" id="file">
    <br><br>
    <button type="submit">Hash</button>
</form>

<p id="status"></p>

<script src="hash.js"></script>
<script src="divide-file.js"></script>
<script src="main.js"></script>
```
- client/main.js
```js
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
```

## NodeJS
The **generateFileHashSignature** function can be located at **nodejs/index.js**
```js
generateFileHashSignature(filepath, chunksize).then(hash => console.log(hash))
//  1e08568ce1aaed8ab0d8d13951c0ebbdcea7602faa31c378105a7ddf73161710
```

# Disclaimer
- **Matroska** or **.mkv** still not supported.
- A npm package will be created soon.

Happy hacking 😎 😎