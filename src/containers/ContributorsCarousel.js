import React, { Component } from "react";
import Slider from "react-slick";
import '../css/ContributorsCarousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ContributorsCarousel extends Component {

  constructor (props) {
    super(props);

    this.generateContributorIcons = this.generateContributorIcons.bind(this);
  }

  generateContributorIcons = (contributorData) => {

    let contributorIcons = [];
    // Loop over all repos creating a menu item for each
    for (var contributor in contributorData) {
      //console.log(contributorData[contributor])
      contributorIcons.push(<div><a href={contributorData[contributor].html_url} target="_blank" rel="noopener noreferrer"><img className="org-icon" src={contributorData[contributor].avatar_url} alt="user icon"/></a></div>);
    }

    return contributorIcons;
  }

  render() {

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 12,
      arrows: false,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 1000,
      cssEase: "linear"
    };

    return (
      <div>
        <Slider {...settings}>
            {this.generateContributorIcons(this.props.contributorData)}
        </Slider>
      </div>
    );
  }
}

export default ContributorsCarousel;
