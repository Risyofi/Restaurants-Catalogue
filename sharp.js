const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const target = path.resolve(__dirname, 'src/public/images/heros/')
const destination = path.resolve(__dirname, 'dist/images')

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true })
}

fs.readdirSync(target)
  .forEach((image) => {
    // Check if the file has a valid image extension
    const validExtensions = ['.jpg', '.png', '.jpeg']
    const extension = path.extname(image).toLowerCase()

    if (validExtensions.includes(extension)) {
      sharp(`${target}/${image}`)
        .resize(800)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`
        ))

      sharp(`${target}/${image}`)
        .resize(480)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`
        ))
    }
  })
