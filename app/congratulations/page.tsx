'use client';

import React from 'react';

const CongratulationsPage = () => {
    const handleShare = (platform: string) => {
        const message = "I just helped save Delhi! Join me in making a difference!";
        const url = "https://pollutionfreeindia.org";
        let both = message + ' ' + url;

        let shareUrl = '';
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
        } else if (platform === 'bluesky') {
            shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(both)}`;
        }

        window.open(shareUrl, '_blank');
    };

    return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ marginBottom: '20px' }}>🎉 Congratulations, you helped save Delhi! 🎉</h1>
        <p style={{ marginBottom: '20px', fontSize: '18px' }}>Thank you for your contribution!</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
                src="https://media.giphy.com/media/pMlGTTDsuBRCwHhFEq/giphy.gif?cid=790b7611i9yo7hejth4foz0s1wkqqqpnw5w38uvso1ne5oif&ep=v1_gifs_search&rid=giphy.gif&ct=g" 
                alt="Celebration GIF" 
                style={{ width: '300px' }} 
            />
        </div>
        </div>
      <div className="flex gap-4">
        <button
            onClick={() => handleShare('facebook')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
            Share on Facebook
        </button>
        <button
            onClick={() => handleShare('twitter')}
            className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
            Share on X
        </button>
        {/* <button
            onClick={() => handleShare('bluesky')}
            className="flex-1 bg-blue-300 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
            Share on Bluesky
        </button>  */}
      </div>
    </div>
    );
};

export default CongratulationsPage;