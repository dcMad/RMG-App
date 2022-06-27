// import { render } from '@testing-library/react';
import React from 'react'

import '../css/style.css';


import Carousel from './carousel.js';

import {ReactComponent as ARBtn} from '../img/icons/ar-btn.svg';
import {ReactComponent as VoiceBtn} from '../img/icons/voiceover-btn.svg';
import {ReactComponent as DownArrow} from '../img/icons/down-arrow.svg';

import {ReactComponent as CCBtn} from '../img/icons/cc-button.svg';


import Audio from './audio.js';

// import data from '../data.json';


let menuUp = true;



class PullMenu extends React.Component {


render(){
    return (
    <div className="wrapper up-panel-open">
    <article className="menuUp-panel">
        <section className='panel-toggle-container'>
            <DownArrow className="panel-toggle" onClick={this.props.arrowClick}/>
        </section>
        <Carousel id={this.props.artId}/>
        <h1>{this.props.artTitle}</h1>
        <h2 className="name-artist">-- {this.props.artistName} --</h2>
        <div className="media-icons-container">
            {this.props.artId == 3 ? 
            <a href="https://development.rmgpublicart.ca/ar/"><ARBtn className='media-icon' alt="Augmented Reality Experience Button"/></a> :
            <a href="#"><ARBtn className='media-icon ar-disabled' alt="Augmented Reality Experience Button"/></a>
            }
            <Audio audioToPlay={this.props.artAudio} playing={this.props.audioState} playAudio={this.props.audioPlay} pauseAudio={this.props.audioPause}/>
            <CCBtn className='media-icon' alt="Closed Captioning Button" onClick={this.props.captionClick}/>
        </div>
        
        <p className="artworkCaption"> {this.props.artCaptions} </p>
    
        <p className="artwork-description">{this.props.artDescription}</p>
    </article>
    </div>
    )}
}

export { PullMenu as default };
