export default function generateImage(image, scaleHorizontal, size, setImage) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let loadedImage = new Image();
    loadedImage.addEventListener("load", onImageLoaded);
    loadedImage.src = "/img/" + image.name;
    function onImageLoaded() {
        if (scaleHorizontal) {
            canvas.height = size;
            let ratio = size / loadedImage.height;
            canvas.width = loadedImage.width * ratio;
        }
        else {
            canvas.width = size;
            let ratio = size / loadedImage.width;
            canvas.height = loadedImage.height * ratio;
        }
        context.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL("image/png"));
    }
}