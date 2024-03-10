import { useEffect, useState } from "react";
import generateCollage from "../helper/generateCollage";
import generateImage from "../helper/generateImage";
import ThumbnailBar from "./ThumbnailBar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

Preview.propTypes = {
    images: PropTypes.array,
    smallScreen: PropTypes.bool
}

Preview.defaultProps = {
    smallScreen: false
}

export default function Preview({ images, smallScreen }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSize, setPreviewSize] = useState(smallScreen ? 300 : 400);
    const [sideThumbnails, setSideThumbnails] = useState(smallScreen ? 1 : 2);
    const navigation = useNavigate();

    useEffect(() => {
        if (images) {
            setSelectedImage(images[selectedIndex]);
        }
    }, [selectedIndex, images])

    useEffect(() => {
        if (selectedImage) {
            if (selectedImage.type == "comparison") {
                generateCollage(selectedImage.images, true, previewSize, setPreviewImage);
            }
            else if (selectedImage.type == "single") {
                generateImage(selectedImage.image, true, previewSize, setPreviewImage);
            }
        }
    }, [selectedImage, previewSize])

    useEffect(() => {
        setPreviewSize(smallScreen ? 350 : 700);
        setSideThumbnails(smallScreen ? 1 : 2);
    }, [smallScreen])

    return <>
        <h2>Stable Diffusion Blog</h2>
        <p>Check out this little Stable diffusion blog, click on the preview Image to learn more! </p>
        {images && (<div className="preview">
            <h3>{selectedImage && selectedImage.title}</h3>
            <div className="preview-container">
                {!previewImage && <h3>Loading image....</h3>}
                {previewImage && <img src={previewImage} onClick={() => navigation("/detail", { state: { imageData: selectedImage } })} />}
                <p>{selectedImage && selectedImage.abstract}</p>
            </div>
            <ThumbnailBar
                images={images}
                thumbnailHeight={100}
                sideThumbnails={sideThumbnails}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex} />
        </div>)
        }</>
}


