import PhotoCard from "../PhotoCard";
import "./index.css";

function Cards({ photos }) {
    return (
        <div className='cards'>
            {photos?.length > 0 ? (
                photos.map((photo) => <PhotoCard photoInfo={photo} key={photo.id} />)
            ) : (
                <h1 className='app__message'>We couldn't find any photos for your search</h1>
            )}
        </div>
    );
}

export default Cards;
