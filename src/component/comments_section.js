import React, { useState } from 'react';


function CommentsSection({bids}){
    const sortedBids = [...bids].sort((a, b) => a.bidamount - b.bidamount);

    return(
        <div className="comments-section">
        <div>
            <h4>Bids</h4>
            <ul>
               {sortedBids.map((bid, index) => (
                    <li key={index}>
                        <strong>{bid.biddername}:</strong> ${bid.bidamount}
                    </li>
                ))}
            </ul>
        </div>
       </div>
    );
}

export default CommentsSection;