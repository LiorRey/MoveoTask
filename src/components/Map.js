import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapComponent extends Component {
  render() {
    const style = {
      width: "100%",
      height: "40%",
    };
    return (
      <div className="map-area" style={{ height: "0%" }}>
        <Map
          google={this.props.google}
          zoom={7}
          initialCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude,
          }}
          style={style}
          zoomControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
        >
          <Marker
            position={{
              lat: this.props.latitude,
              lng: this.props.longitude,
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAP_API_KEY || "",
})(MapComponent);
