import { useState } from "react";
import { Oval } from "react-loader-spinner";
import "./index.css";

function PhotoCard({ photoInfo }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className='card'>
            <div className='card__image'>
                <img
                    src={photoInfo.webformatURL}
                    alt='card__image'
                    onLoad={() => setVisible(true)}
                    style={{ visibility: visible ? "visible" : "hidden" }}
                />
                <Oval
                    width={"100%"}
                    color='#000'
                    secondaryColor='#968c8c'
                    wrapperStyle={{ display: visible ? "none" : "block" }}
                    wrapperClass='image-loader'
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
            <div className='cards__tags'>
                {photoInfo.tags
                    .split(", ")
                    .map((e) => `#${e}`)
                    .join(", ")}
            </div>
        </div>
    );
}

export default PhotoCard;
