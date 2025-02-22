import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function optimizeImages() {
    try {
        const imageDir = './images';
        const outputDir = './images/optimized';
        
        // Read all images from directory
        const files = await readdir(imageDir);
        const imageFiles = files.filter(file => file.endsWith('.jpg'));

        for (const file of imageFiles) {
            const inputPath = join(imageDir, file);
            const outputPath = join(outputDir, file.replace('.jpg', '.webp'));

            // Process image
            await sharp(inputPath)
                .resize(800, 600, { 
                    fit: 'cover',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Optimized: ${file}`);
        }

        console.log('All images have been optimized!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
