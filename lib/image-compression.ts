import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  quality?: number;
}

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const defaultOptions = {
    maxSizeMB: 0.8, // Compress to max 800KB for free tier
    maxWidthOrHeight: 1920, // Max dimension for good quality
    useWebWorker: true,
    quality: 0.8, // 80% quality
    ...options,
  };

  try {
    console.log(`🔧 Compressing "${file.name}"`);
    console.log(`📏 Original: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const compressedFile = await imageCompression(file, defaultOptions);

    const sizeMB = (compressedFile.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - compressedFile.size / file.size) * 100).toFixed(1);

    console.log(`✅ Compressed: ${sizeMB} MB (${reduction}% reduction)`);

    return compressedFile;
  } catch (error) {
    console.error("❌ Error compressing image:", error);
    console.log("🔄 Using original file as fallback");
    // If compression fails, return original file
    return file;
  }
};

export const compressMultipleImages = async (
  files: File[],
  options: CompressionOptions = {}
): Promise<File[]> => {
  const compressionPromises = files.map((file) => compressImage(file, options));
  return Promise.all(compressionPromises);
};
