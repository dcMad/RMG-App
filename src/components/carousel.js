import React from 'react'

import '../css/style.css';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



// import slick files
// import '../css/slick-theme.css';
// import '../css/slick.css';

// import '../vendor/slick.js';
// import '../vendor/slick.min.js';
// import '../vendor/vendor/jquery.js';
// import '../vendor/vendor/what-input.js';
// import '../vendor/vendor/vendor.js';
// import '../vendor/vendor/jquery-3.6.0.min.js';

export default function Carousel(props) {

    const sliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                rows: 1,
                }
            }
            ]
    }

    if (props.id === 1) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/bentham/bentham1.jpg')} alt="Crown Image 1" />
                </Slider>
            </div>
        )
    }
    else if (props.id === 2) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                        <img id="artwork-1-image-1" className="carousel-image media-icon" media='(min-width: 900px)' src={require('../img/artworks/barkhouse/barkhouse1.jpg')} alt="Grace Image 1" />
                        <img id="artwork-1-image-2" className="carousel-image media-icon" media='(min-width: 900px)' src={require('../img/artworks/barkhouse/barkhouse2.JPG')} alt="Grace Image 2" />
                </Slider>
            </div>
        )
    }
    else if (props.id === 3) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/coupland/coupland1.PNG')} alt="Group Portrait Image 1" />
                </Slider>
            </div>
        )
    }
    else if (props.id === 4) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/harding/harding1.jpg')} alt="Reverb Image 1" />
                    <img id="artwork-1-image-2" className="carousel-image media-icon" src={require('../img/artworks/harding/harding2.jpg')} alt="Reverb Image 2" />
                </Slider>
            </div>
        )
    }
    else if (props.id === 5) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/reitzenstein/reitzenstein1.jpg')} alt="River tree/bench Image 1" />
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/reitzenstein/reitzenstein2.jpg')} alt="River tree/bench Image 2" />
                </Slider>
            </div>
        )
    }
    else if (props.id === 6) {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/meadmore/meadmore1.jpg')} alt="Upstart II Image 1" />
                    <img id="artwork-1-image-2" className="carousel-image media-icon" src={require('../img/artworks/meadmore/meadmore2.jpg')} alt="Upstart II Image 2" />
                </Slider>
            </div>
        )
    }
    else {
        return (
            <div className="pull-up-carousel">
                <Slider {...sliderSettings}>
                    <img id="artwork-1-image-1" className="carousel-image media-icon" src={require('../img/artworks/robert-mclaughlin-gallery.jpeg')} alt="Robert McLaughlin Gallery" />
                </Slider>
            </div>
        )
    }
    

}