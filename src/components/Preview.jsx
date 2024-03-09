import { useEffect, useState } from "react";
import generateCollage from "../helper/generateCollage";
import generateImage from "../helper/generateImage";
import ThumbnailBar from "./ThumbnailBar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

Preview.propTypes = {
    images: PropTypes.array,
    previewSize: PropTypes.number
}

Preview.defaultProps = {
    previewSize: 400
}

export default function Preview({ images, previewSize }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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

    return <>
        <h2>Stable Diffusion Blog</h2>
        <p>Check out this little Stable diffusion blog, click on the preview Image to learn more! </p>
        {images && (<div className="preview">
            <h3>{selectedImage && selectedImage.title}</h3>
            <div className="preview-container">
                {previewImage && <img src={previewImage} onClick={() => navigation("/detail", { state: { imageData: selectedImage } })} />}
                <p>{selectedImage && selectedImage.abstract}</p>
            </div>
            <ThumbnailBar
                images={images}
                thumbnailHeight={100}
                sideThumbnails={2}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex} />
        </div>)
        }</>
}


