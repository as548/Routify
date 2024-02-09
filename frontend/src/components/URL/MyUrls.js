// MyUrls.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUrls, clearErrors, deleteUrl } from '../../actions/urlActions';
import './MyUrls.css';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const MyUrls = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, userUrls, error } = useSelector((state) => state.myUrls);
    
    const [apibaseUrl] = useState(() =>
    process.env.NODE_ENV === 'production'
      ? window.location.hostname
      : window.location.hostname + ':' + window.location.port
  );
    useEffect(() => {
        dispatch(getUrls());
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    const openUrlInNewTab = (originalUrl) => {
        window.open(originalUrl, '_blank');
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (shortId) => {
        dispatch(deleteUrl(shortId));
        navigate('/');
        alert.success('Deleted Successfully');
    };

    const handleCopyLink = (shortId) => {
        const link = `${apiBaseUrl}/${shortId}`;
        navigator.clipboard.writeText(link);
        alert.success('Link copied to clipboard!');
    };

    return (
        <div className="my-urls-container">
            <h1 className="Heading">My URLs</h1>
            {loading ? (
                <Loader />
            ) : userUrls && userUrls.length === 0 ? (
                <p>No URLs found.</p>
            ) : (
                <div className="url-table-container">
                    <table className="url-table">
                        <thead>
                            <tr>
                                <th>Original URL</th>
                                <th>Short URL</th>
                                <th>Created Date</th>
                                <th>No of Clicks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userUrls &&
                                userUrls.map((url) => (
                                    <tr key={url._id}>
                                        <td
                                            className="original-url"
                                            onClick={() => openUrlInNewTab(url.redirectURL)}
                                        >
                                            <a
                                                href={url.redirectURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {url.redirectURL}
                                            </a>
                                        </td>
                                        <td className="short-url-container">
                                            <div className="short-url">
                                                <a
                                                    href={`${apiBaseUrl}/${url.shortId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {`${apiBaseUrl}/${url.shortId}`}
                                                </a>
                                            </div>
                                            <button
                                                className="copy-link-btn"
                                                onClick={() => handleCopyLink(url.shortId)}
                                            >
                                                Copy
                                            </button>
                                        </td>
                                        <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                                        <td>{url.visitHistory.length}</td>
                                        <td>
                                            <button
                                                className="editbtn"
                                                onClick={() => handleEdit(url._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="editbtn"
                                                onClick={() => handleDelete(url.shortId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default MyUrls;
