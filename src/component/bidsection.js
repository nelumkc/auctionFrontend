import React, { useState } from 'react';
import axios from 'axios';

function BidSection({ photoId, bids =[],onBidSubmitted }){

    const [biddername, setName] = useState('');
    const [bidamount, setBidAmount] = useState('');
    const [error, setError] = useState('');

    console.log("Bids array:", bids);

    // highest bid 
    const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => Number(bid.bidamount))) : 0;
    console.log("Highest bid amount:", highestBid);

    const handleBidSubmit = (e) => {
        console.log("photoId:", photoId);
        console.log("bidData:", { biddername, bidamount });

        e.preventDefault();
        const newBidAmount = parseFloat(bidamount);

        if (newBidAmount <= highestBid) {
            setError(`Your bid must be higher than the current highest bid of $${highestBid}.`);
            return;
        }

        const bidData = {
          biddername: biddername,
          bidamount: newBidAmount,
        };
    
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/${photoId}/bid`, bidData)
            .then(response => {
                setName('');
                setBidAmount('');

                // Call the onBidSubmitted callback to update the parent component
                if (onBidSubmitted) {
                    onBidSubmitted(response.data);
                }
            })
            .catch(error => {
                console.error("There was an error submitting the bid!", error);
            });

    };


    return(
        <div className="addbid">
            <form className="comment-form"  onSubmit={handleBidSubmit} method="post">
                    <input type="text" 
                           placeholder="Your name" 
                           value={biddername}
                           onChange={(e) => setName(e.target.value)}
                           required
                    />
                    <input type="number" 
                        placeholder={`Your bid (must be > $${highestBid})`}
                        value={bidamount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                    <button type="submit" >Submit Your Higher Bid</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default BidSection;