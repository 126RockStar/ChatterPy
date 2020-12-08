import React from "react";

class Preloader extends React.Component {
  render() {
    return (
      <div className="preloader" data-com>
        <div className="preloader-wrapper">
          <img src="./assets/css/ajax-loader.gif" alt="ajax-loader" />
        </div>
      </div>
    );
  }
}

export default Preloader;
