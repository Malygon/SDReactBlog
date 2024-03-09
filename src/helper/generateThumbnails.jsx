import generateCollage from "./generateCollage";
import generateImage from "./generateImage";

export default function generateThumbnails(imagesData, thumbnailHeight, setThumbnails) {
    let numLoadedImages = 0;
    let numImages = imagesData.length;
    let loadedImages = new Array(numImages);

    imagesData.forEach((imageData, index) => {
        if (!imageData.type) {
            loadSingleImage(imageData, index);
        }
        if (imageData.type == "single") {
            loadSingleImage(imageData.image, index);
        }
        if (imageData.type == "comparison") {
            loadComparisonImage(imageData, index);
        }
    });

    function loadSingleImage(image, index) {
        function handleImageCreated(loadedImage) {
            loadedImages[index] = loadedImage
            handleImageLoaded();
        }
        generateImage(image, true, thumbnailHeight, handleImageCreated);
    }

    function loadComparisonImage(imageData, index) {
        function handleCollageCreated(image) {
            loadedImages[index] = image;
            handleImageLoaded();
        }
        generateCollage(imageData.images, true, thumbnailHeight, handleCollageCreated);
    }

    function handleImageLoaded() {
        numLoadedImages++;
        if (numLoadedImages >= numImages) {
            setThumbnails(loadedImages);
        }
    }
}