import React, { useState, useEffect } from 'react';
import CommentsSection from './comments_section';
import BidSection from './bidsection';
import axios from 'axios';

function PhotoGallery() {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // Fetch all photos from the backend "http://localhost:3000/"
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/`)
            .then(response => {
                setPhotos(response.data);
            })
            .catch(error => {
                console.error('Error fetching photos:', error);
            });
    }, []);

    const handleBidSubmitted = (updatedPhoto) => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) =>
                photo._id === updatedPhoto._id ? updatedPhoto : photo
            )
        );
    };
    
    return (
        <div className="photo-gallery">
            {photos.map(photo => (
                <div key={photo._id} className="photo-container">
                    <div className="photo">
                        <img src={photo.url} alt="" width="200" />
                    </div>
                    <CommentsSection bids={photo.bids} />
                    <BidSection photoId={photo._id} bids={photo.bids} onBidSubmitted={handleBidSubmitted}/>
                </div>
            ))}
        </div>    
    );
  }
  
  export default PhotoGallery;