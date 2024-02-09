import React, { Fragment, useState, useEffect } from "react";
import "./UpdateUrl.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, editUrl } from "../../actions/urlActions";
import { useAlert } from "react-alert";
import { EDIT_URL_RESET, UPDATE_PASSWORD_RESET } from "../../constants/urlConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate, useParams } from "react-router-dom";


const UpdateURL = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const {id}=useParams();
  const { error, success, loading } = useSelector((state) => state.updateUrl);

  
  const [newUrl, setNewUrl] = useState("");

  const updateUrlSubmit = (e) => {
    e.preventDefault();


    dispatch(editUrl(id,newUrl));
    setNewUrl("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Url Updated Successfully");

      navigate("/");
      dispatch({
        type: EDIT_URL_RESET,
      });

    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change URL" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update URL</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updateUrlSubmit}
              >
                
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="text"
                    placeholder="Enter new shortId"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateURL;