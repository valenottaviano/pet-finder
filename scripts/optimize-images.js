const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, options = {}) {
    const {
        width,
        quality = 80,
    } = options;

    try {
        await sharp(inputPath)
            .resize(width ? { width, withoutEnlargement: true } : null)
            .webp({ quality })
            .toFile(outputPath);
        
        console.log(`✅ Successfully optimized: ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error);
    }
}

async function main() {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    
    // Ensure images directory exists
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Optimize hero image
    await optimizeImage(
        path.join(__dirname, 'source-images', 'hero-hug.jpg'),
        path.join(imagesDir, 'hero-hug.webp'),
        { width: 1200 }
    );

    // Optimize community image
    await optimizeImage(
        path.join(__dirname, 'source-images', 'community.jpg'),
        path.join(imagesDir, 'community.webp'),
        { width: 1920 }
    );
}

main().catch(console.error);