export default function generateCollage(images, growHorizontal, collageSize, setImage) {
    let numImages = images.length;
    let loadedImages = new Array(numImages);
    let numLoadedImages = 0;
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    if (growHorizontal) { canvas.height = collageSize; }
    else { canvas.width = collageSize; }

    images.forEach((image, index) => {
        let loadedImage = new Image();
        loadedImage.addEventListener('load', onImageLoaded);
        loadedImage.src = "/img/" + image.name;
        function onImageLoaded() {
            loadedImages[index] = loadedImage;
            numLoadedImages++;
            if (numLoadedImages >= numImages) {
                handleAllCImagesLoaded();
            }
        }
    });

    function handleAllCImagesLoaded() {
        if (growHorizontal) {
            let imgHeight = numImages > 2 ? collageSize / 2 : collageSize;
            let ratio = imgHeight / loadedImages[0].height;
            let imgWidth = loadedImages[0].width * ratio;
            canvas.width = numImages > 2 ?
                Math.ceil((numImages / 2.0)) * imgWidth :
                numImages * imgWidth;
            let x = 0;
            let y = 0;
            loadedImages.forEach(image => {
                context.drawImage(image, x * imgWidth, y * imgHeight, imgWidth, imgHeight);
                x++;
                if (x > 1 && x >= Math.ceil((numImages / 2.0))) {
                    x = 0;
                    y++;
                }
            });
        }
        else {
            let imgWidth = numImages > 2 ? collageSize / 2 : collageSize;
            let ratio = imgWidth / loadedImages[0].width;
            let imgHeight = loadedImages[0].height * ratio;
            canvas.height = numImages > 2 ?
                Math.ceil((numImages / 2.0)) * imgHeight :
                numImages * imgHeight;
            let x = 0;
            let y = 0;
            loadedImages.forEach(image => {
                context.drawImage(image, x * imgWidth, y * imgHeight, imgWidth, imgHeight);
                y++;
                if (y > 1 && y >= Math.ceil((numImages / 2.0))) {
                    y = 0;
                    x++;
                }
            });
        }
        setImage(canvas.toDataURL("image/png"));
    }
}