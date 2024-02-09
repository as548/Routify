// Home.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUrl, clearErrors } from '../../actions/urlActions';

import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, url, error } = useSelector((state) => state.newUrl);

  const [inputUrl, setInputUrl] = useState('');
  const apiBaseUrl = 'https://routify-tau.vercel.app';
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the user-entered URL
    const newUrl = {
      longUrl: inputUrl,
    };

    // Dispatch the createUrl action with the correct data
    dispatch(createUrl(newUrl));
  };

  // Clear errors on component unmount
  React.useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
//   console.log("URL:", url.shortId);
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the Routify</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Submit'}
          </button>
        </form>
        {url && <p>Shortened URL:<a
                                                href={`${apiBaseUrl}/${url.shortId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='link'
                                            >
                                                {`${apiBaseUrl}/${url.shortId}`}
                                            </a></p>}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default Home;
