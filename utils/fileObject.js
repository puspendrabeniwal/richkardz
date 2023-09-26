// Function to create a File object from a Blob
function createFileFromBlob(blob, fileName) {
  const file = new File([blob], fileName);
  return file;
}

// Function to download an image and convert it to a File object
async function downloadImageAsFile(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    console.log("image response", response);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1); // Extract the file name
    return createFileFromBlob(blob, fileName);
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
    return null;
  }
}

// Create File objects for each image URL
export async function createFileObjects(imageUrls) {
  console.log("inside one");
  const filePromises = imageUrls.map(async (imageUrl) => {
    return await downloadImageAsFile(imageUrl);
  });

  const files = await Promise.all(filePromises);
  return files;
}
