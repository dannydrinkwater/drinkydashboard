import React from "react";
import "./background-hero.styles.scss";

class BackgroundHero extends React.Component {
  state = {
    loading: true,
    photos: null
  };

  componentDidMount() {
    var self = this;

    fetch(
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b40ed9d836619a8f264788f716a3018c&user_id=186441728%40N06&tags=dashboard&format=json&nojsoncallback=1"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        self.setState({
          loading: false,
          photos: json
        });
      });
  }

  render() {
    if (this.state.photos !== null) {
      var photo = this.state.photos.photos.photo[5];
      return (
        <div className="background-hero">
          <img
            className="background-hero__image"
            src={
              "https://farm" +
              photo.farm +
              ".staticflickr.com/" +
              photo.server +
              "/" +
              photo.id +
              "_" +
              photo.secret +
              "_b.jpg"
            }
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default BackgroundHero;
