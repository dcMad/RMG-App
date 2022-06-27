import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import {Howl, Howler} from 'howler';
// import {ReactComponent as VoiceBtn} from '../img/icons/voiceover-btn.svg';
import {ReactComponent as PlayBtn} from '../img/icons/play-button.svg';
import {ReactComponent as PauseBtn} from '../img/icons/pause-button.svg';


class Audio extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    Howler.volume(1);

    return (
      
      <div>
        <ReactHowler
          src={[this.props.audioToPlay]}
          playing={this.props.playing}
        />
        <PlayBtn className='media-icon' id="playButton" alt="Voiceover Recording Button" onClick={this.props.playAudio} />
        <PauseBtn className='media-icon' id="pauseButton" alt="Pause Recording Button" onClick={this.props.pauseAudio} />
      </div>
    )
  }
}

export { Audio as default };
