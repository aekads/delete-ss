const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqfnwh89v',
  api_key: '451893856554714',
  api_secret: 'zgbspSZH8AucreQM8aL1AKN9S-Y',
});






// Folder and Date Range
const folderPath = 'poc/ClientScreenshot';
const localDir = './downloads';
const startDate = new Date('2025-04-28');
const endDate = new Date('2025-05-04');

async function downloadAssetsByDateRange() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 50000,
    });

    // Filter assets based on creation date
    const filteredAssets = result.resources.filter((asset) => {
      const created = new Date(asset.created_at);
      return created >= startDate && created <= endDate;
    });

    if (filteredAssets.length === 0) {
      console.log(`No assets found between ${startDate.toDateString()} and ${endDate.toDateString()}.`);
      return;
    }

    for (const asset of filteredAssets) {
      const publicId = asset.public_id;
      await cloudinary.uploader.destroy(publicId);
      console.log(`🗑️  Deleted from Cloudinary: ${publicId}`);
    }

    console.log('\n🎉 All filtered assets deleted!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

downloadAssetsByDateRange();
setInterval(downloadAssetsByDateRange, 10 * 60 * 1000); // every 10 minutes




