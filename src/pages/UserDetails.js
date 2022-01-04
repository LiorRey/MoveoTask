import React from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import Map from "../components/Map";

const UserDetails = () => {
  const params = useParams();
  const userDetailsSplit = params.userDetails.split("|");
  const username = userDetailsSplit[0];
  const firstName = userDetailsSplit[1];
  const lastName = userDetailsSplit[2];
  const email = userDetailsSplit[3];
  const gender = userDetailsSplit[4];
  const age = userDetailsSplit[5];
  const picture = userDetailsSplit[6].replaceAll("-", "/");
  const latitude = userDetailsSplit[7];
  const longitude = userDetailsSplit[8];

  return (
    <div style={{ justifyContent: "center", textAlign: "center" }}>
      <h1>
        {firstName} {lastName}
      </h1>
      <Image
        preview={false}
        src={picture}
        style={{
          borderRadius: "50%",
        }}
      />
      <h2>Username: {username}</h2>
      <h2>E-mail: {email}</h2>
      <h2>Gender: {gender}</h2>
      <h2>Age: {age}</h2>
      <h3>
        Location of {firstName} {lastName}:
      </h3>
      <div
        className="map-container"
        style={{
          justifyContent: "center",
        }}
      >
        <Map latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default UserDetails;
