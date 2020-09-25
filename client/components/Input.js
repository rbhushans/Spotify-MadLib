import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getMyInfo,
  setTokens,
}   from '../actions/actions';
import {phraseTest} from '../assets/phrases'

/**
 * Our user page
 * Displays the user's information
 */
class Input extends Component {
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    dispatch(setTokens({accessToken, refreshToken}));
    dispatch(getMyInfo());
  }

  /** Render the user's info */
  render() {
     const { accessToken, refreshToken, user } = this.props;
     const { loading, display_name, images, id, email, external_urls, href, country, product, artists, tracks} = user;

     let currLoading = true

    let randomPhrase = Math.floor(Math.random() * phraseTest.length)
    let phraseObj = phraseTest[randomPhrase]


      // while(currLoading == true){
      //   if(artists == undefined || tracks == undefined || loading){
      //     currLoading = true
      //   }else{
      //     currLoading = false
      //   }
      // }
    

      // if(!(artists == undefined || tracks == undefined || loading)){
      //   for(var i = 0; i < phraseObj.artists; i++){
      //     let randomArtist = Math.floor(Math.random() * artists.length)
      //     window.alert(randomArtist.name)
      //     phraseObj.phrase = phraseObj.phrase.replace("%a", randomArtist.name)
      //   }

      //   for(var i = 0; i < phraseObj.tracks; i++){
      //     let randomTrack = Math.floor(Math.random() * tracks.length)
      //     phraseObj.phrase = phraseObj.phrase.replace("%t", randomTrack.name)
      //   }
      // }

      function phraseCreator(){
        for(var i = 0; i < phraseObj.artists; i++){
          let randomArtist = Math.floor(Math.random() * artists.length)
          let rand = artists[randomArtist]
          phraseObj.phrase = phraseObj.phrase.replace("%a", rand.name)
        }

        for(var i = 0; i < phraseObj.tracks; i++){
          let randomTrack = Math.floor(Math.random() * tracks.length)
          let rand = tracks[randomTrack]
          phraseObj.phrase = phraseObj.phrase.replace("%t", rand.name)
        }
        return (<h1>{phraseObj.phrase}</h1>)
      }

    return(
        <div>
            {((artists == undefined || tracks == undefined || loading)) ?
                <h1>Loading</h1>
            : <div>
                {phraseCreator()}
              </div>
            }
            
        </div>
    )

    }
}

export default connect(state => state)(Input);
