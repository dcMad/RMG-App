import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import {Howl, Howler} from 'howler';
// import {ReactComponent as VoiceBtn} from '../img/icons/voiceover-btn.svg';
import {ReactComponent as PlayBtn} from '../img/icons/play-button.svg';
import {ReactComponent as PauseBtn} from '../img/icons/pause-button.svg';


class Audio extends Component {
  constructor (props) {
    super(props)
    this.alertRef = React.createRef()
  }

  render () {

    Howler.volume(1);
    let props = this.props
    function alertAndPlay(){
      props.playAudio();
      const alertRef = document.getElementById('alertRef')
      alertRef.style.display = "flex"
      setTimeout(function(){alertRef.style.display = "none"},2500)
    }

    return (
      
      <div>
        <div ref={this.alertRef} id="alertRef" className="audio-alert hide">
          <h1>Please make sure your audio is on</h1>
          <img src={require("../img/icons/volume-up.png")}/>
        </div>
        <ReactHowler
          src={[this.props.audioToPlay]}
          playing={this.props.playing}
        />
        <PlayBtn className='media-icon' id="playButton" alt="Voiceover Recording Button" onClick={alertAndPlay} />
        <PauseBtn className='media-icon' id="pauseButton" alt="Pause Recording Button" onClick={this.props.pauseAudio} />
      </div>
    )
  }
}

export { Audio as default };
