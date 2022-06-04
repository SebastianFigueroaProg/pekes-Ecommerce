import React from 'react';

export const LoadingCard = () => {
    return (
        <div className='card_container'>
            <article className='card_loading'>        
                <div className='center_loading'>
                    <div className='ring'></div>
                    <span>Loading...</span>
                </div>
            </article>
        </div>
    )
}
