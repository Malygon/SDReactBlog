import { useEffect, useState } from "react"
import ThumbnailBar from "./ThumbnailBar";
import { Link, useLocation } from "react-router-dom";
import "../css/Detail.css";

export default function Detail() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [detailImage, setDetailImage] = useState(null);
    const [images, setImages] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (data || selectedIndex) {
            if (data.type == "single") {
                setDetailImage(data.image);
            }
            else if (data.type == "comparison") {
                setDetailImage(data.images[selectedIndex]);
                setImages(data.images);
            }
        }
    }, [data, selectedIndex]);

    useEffect(() => {
        setData(location.state?.imageData ?? null);
    }, [location]);


    return <><Link className="backLink" to="/">Back to the overview</Link>
        {data && detailImage &&
            <div className="detail">
                <h2>{data.title}</h2>
                <img className="detailImage" src={"/img/" + detailImage.name} />
                <p>{data.comment}</p>
                <div className="imageData">
                    <div>
                        <h3>Prompt</h3>
                        <p>{detailImage.prompt}</p>
                    </div>
                    <div>
                        <h3>Negative Prompt</h3>
                        <p>{detailImage.negativePrompt}</p>
                    </div>
                    <div>
                        <h3>Generation Information</h3>
                        <p>{detailImage.generationInfo}</p>
                    </div>
                </div>
                {images && <ThumbnailBar
                    images={images}
                    thumbnailHeight={100}
                    sideThumbnails={1}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex} />}
            </div>
        }
    </>
}