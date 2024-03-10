import { useEffect, useState } from "react"
import ThumbnailBar from "./ThumbnailBar";
import { Link, useLocation } from "react-router-dom";
import "../css/Detail.css";
import generateImage from "../helper/generateImage";
import FilterSelector from "./FilterSelector";
import PropTypes from "prop-types";

Detail.propTypes = {
    smallScreen: PropTypes.bool
}

Detail.defaultProps = {
    smallScreen: false
}

export default function Detail({ smallScreen }) {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [detailImageData, setDetailImageData] = useState(null);
    const [detailImage, setDetailImage] = useState(null);
    const [images, setImages] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filter, setFilter] = useState(null);
    const [imageSize, setImageSize] = useState(smallScreen ? 400 : 800);
    const [sideThumbnails, setSideThumbnails] = useState(smallScreen ? 1 : 2);

    useEffect(() => {
        if (data) {
            if (data.type == "single") {
                setDetailImageData(data.image);
            }
            else if (data.type == "comparison") {
                setDetailImageData(data.images[selectedIndex]);
                setImages(data.images);
            }
        }
    }, [data, selectedIndex]);

    useEffect(() => {
        setData(location.state?.imageData ?? null);
    }, [location]);

    useEffect(() => {
        if (detailImageData) {
            generateImage(detailImageData, true, imageSize, setDetailImage, filter);
        }
    }, [detailImageData, imageSize, filter])

    useEffect(() => {
        setSideThumbnails(smallScreen ? 1 : 2);
        setImageSize(smallScreen ? 400 : 800);
    }, [smallScreen])

    return <><Link className="backLink" to="/">Back to the overview</Link>
        <FilterSelector setFilter={setFilter} />
        {data && detailImageData &&
            <div className="detail">
                <h2>{data.title}</h2>
                <h3>{detailImageData.title}</h3>
                <div className="detail-image-container">
                    {detailImage && <img className="detail-image" src={detailImage} />}
                </div>
                <p>{data.comment}</p>
                <div className="imageData">
                    <div>
                        <h3>Prompt</h3>
                        <p>{detailImageData.prompt}</p>
                    </div>
                    <div>
                        <h3>Negative Prompt</h3>
                        <p>{detailImageData.negativePrompt}</p>
                    </div>
                    <div>
                        <h3>Generation Information</h3>
                        <p>{detailImageData.generationInfo}</p>
                    </div>
                </div>
                {images && <ThumbnailBar
                    images={images}
                    thumbnailHeight={100}
                    sideThumbnails={sideThumbnails}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex} />}
            </div>
        }
    </>
}