import React from 'react';

const imageHelper = ({product}) => {
    const imageUrl = product ? product.image : `https://via.placeholder.com/500x500?text=Image+not+found`
    return (
        <div className="rounded border border-success p-2">
            <img 
                src={imageUrl}
                style={{maxHeight:"100%",maxWidth:"100%"}}
                className="mb-3 rounded"
            />
        </div>
    );
}

export default imageHelper;
