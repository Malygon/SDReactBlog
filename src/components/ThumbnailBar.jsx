import { useEffect, useState } from "react";
import generateThumbnails from "../helper/generateThumbnails";
import PropTypes from "prop-types";
import "../css/Thumbnail.css"

ThumbnailBar.propTypes = {
    images: PropTypes.array.isRequired,
    thumbnailHeight: PropTypes.number.isRequired,
    sideThumbnails: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number,
    setSelectedIndex: PropTypes.func.isRequired,
    slidingTime: PropTypes.number
}

ThumbnailBar.defaultProps = {
    slidingTime: 8000
}

export default function ThumbnailBar({ images, thumbnailHeight, slidingTime, sideThumbnails, selectedIndex, setSelectedIndex }) {
    const [thumbnails, setThumbnails] = useState(null);
    const [components, setComponents] = useState(null);
    const [sliding, setSliding] = useState(true);

    useEffect(() => {
        generateThumbnails(images, thumbnailHeight, setThumbnails);
        setSelectedIndex(0);
    }, [images, thumbnailHeight, setSelectedIndex])

    useEffect(() => {
        function createImageComponent(key, index, className) {
            return <img
                key={key}
                src={thumbnails[index]}
                className={className}
                onClick={() => setSelectedIndex(index)}
            />
        }
        const timer = setTimeout(() => { if (sliding && thumbnails) { selectNext(); } }, slidingTime);
        if (thumbnails) {
            let newComponents = {
                left: [],
                right: [],
                selected: null
            };
            for (let i = selectedIndex - sideThumbnails; i < selectedIndex; i++) {
                let index = i;
                while (index < 0) {
                    index = thumbnails.length + index;
                }
                newComponents.left.push(createImageComponent(i, index, "thumbnail"));
            }
            for (let i = selectedIndex + 1; i <= selectedIndex + sideThumbnails; i++) {
                let index = i;
                while (index >= thumbnails.length) {
                    index = index - thumbnails.length;
                }
                newComponents.right.push(createImageComponent(i, index, "thumbnail"));

            }
            newComponents.selected = createImageComponent(selectedIndex, selectedIndex, "selected-thumbnail");
            setComponents(newComponents);
        }
        return () => clearTimeout(timer);
    }, [selectedIndex, thumbnails, sideThumbnails, sliding]);

    function selectNext() {
        if (thumbnails) {
            let index = selectedIndex + 1;
            if (index >= thumbnails.length) {
                index = 0;
            }
            setSelectedIndex(index);
        }
    }

    function selectLast() {
        let index = selectedIndex - 1;
        if (index < 0) {
            index = thumbnails.length - 1;
        }
        setSelectedIndex(index);
    }

    return (
        <div className="thumbnail-bar">
            {!thumbnails && <h3>Loading thumbnails...</h3>}
            {thumbnails && components && (
                <div className="thumbnail-container">
                    <div className="left">{components.left}</div>
                    <div className="selected">
                        <button className="chevron" onClick={selectLast}>‹</button>
                        {sliding && <button className="speedControl" onClick={() => setSliding(false)}>⏸</button>}
                        {!sliding && <button className="speedControl" onClick={() => setSliding(true)}>⏵</button>}
                        {components.selected}
                        <button className="chevron" onClick={selectNext}>›</button>
                    </div>
                    <div className="right">{components.right}</div>
                </div>
            )}
        </div>
    );
}