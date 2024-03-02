export const uploadToS3Bucket = async (file: File, s3FilePath: string) =>
  new Promise<string>(async (resolve, reject) => {
    if (!file) {
      return reject('Please select a file to upload.')
    }
    fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ filename: s3FilePath, contentType: file.type }),
    })
      .then(response => {
        if (response.ok) {
          response.json()
            .then(result => {
              const {url, fields } = result
              const formData = new FormData()
              Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string)
              })
              formData.append('file', file)

              fetch(url, {
                method: 'POST',
                body: formData,
              }).then(uploadResponse => {
                if (uploadResponse.ok) {
                  const fileUrl = `${url}/${fields.key}`
                  console.log('fileUrl:',fileUrl)
                  resolve(fileUrl)
                } else {
                  reject(uploadResponse.statusText)
                }
              })
                .catch(err => reject(err.message || err))

            })
            .catch(err => reject(err.message || err))

        } else {
          reject('Failed to get pre-signed URL.')
        }
      })
      .catch(err => reject(err.message || err))
  })
