import { useEffect } from "react";
import useAuthenticatedAxios from "../../hooks/useAuthenticatedAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Profile(props) {
  const axios = useAuthenticatedAxios();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [someData, setSomeData] = useState(null);
  const getSomeData = async () => {
    try {
      const response = await axios.get("user/list");
      setSomeData(response.data);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    console.log("executing");
    const getProfile = async () => {
      try {
        const response = await axios.get("user/profile", {});
        setProfileData(response.data);
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    getProfile();
    return abortController.abort();
  }, []);
  return (
    <section className="profile">
      <h2 className="profile-page__welcome">Welcome to your profile page</h2>
      {profileData != null && <h2>{profileData.email}</h2>}
      <button onClick={() => getSomeData()}>This is now here</button>
      {someData && <p className="some-data">{someData[0]}</p>}
    </section>
  );
}
