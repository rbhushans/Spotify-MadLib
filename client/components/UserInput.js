import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getMyInfo,
  setTokens,
}   from '../actions/actions';
import {phrases} from '../assets/phrases'

/**
 * Our user page
 * Displays the user's information
 */
class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {sub: true, phrase: ""}
    }
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

    let randomPhrase = Math.floor(Math.random() * phrases.length)
    let phraseObj = phrases[randomPhrase]

    let nouns = new Array(phraseObj.nouns).fill("");
    let verbs = new Array(phraseObj.verbs).fill("");
    let adjectives = new Array(phraseObj.adjectives).fill("");
    //window.alert("here")

    //let sub = true;

    // puts entire phrase together 
    const phraseCreator = () => {
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

        for(var i = 0; i < nouns.length; i++){
            phraseObj.phrase = phraseObj.phrase.replace("%n", nouns[i])
        }

        for(var i = 0; i < verbs.length; i++){
            phraseObj.phrase = phraseObj.phrase.replace("%v", verbs[i])
        }

        for(var i = 0; i < adjectives.length; i++){
            phraseObj.phrase = phraseObj.phrase.replace("%adj", adjectives[i])
        }

        this.setState({phrase: <h2 class="about">{phraseObj.phrase}</h2>})
    }

    // stores the inputs by changing the state
    const setNouns = (event, index) => {
        nouns[index] = (event.target.value)
    }

    const setVerbs = (event, index) => {
        verbs[index] = (event.target.value)
    }

    const setAdjectives = (event, index) => {
        adjectives[index] = (event.target.value)
    }

    const handleSubmit = () => {
        this.setState({sub: false}, () => phraseCreator())
    }

    const handleRefresh = () => {
        window.location.reload()
    }
    

    return(
        <div>
            {((artists == undefined || tracks == undefined || loading)) ?
                <div className="Loading" style={{position: 'absolute', top: 0, right: 0, bottom:0, left: 0, 'z-index': 0, 'background-color':'#394053'}}>
                    <h1>Loading</h1>
                </div>
            : <div className="options" style={{position: 'absolute', top: 0, right: 0, bottom:0, left: 0, 'z-index': 0, 'background-color':'#DDFFF7'}}>
                <h1>Spotify Mad Libs</h1>
                {this.state.sub ? 
                <div className='userInput'>
                    {/* reads in the user input */}
                    <h3>Select the words</h3>
                    
                    {nouns.length > 0 && <h2>nouns: </h2>}

                    {nouns.map((val, ind) => {
                        return(
                            <input style={{margin: '1%'}} onChange={(event => setNouns(event, ind))} />
                        )
                    })}
                    {nouns.length>0 && <p></p>}
                    {verbs.length > 0 && <h2>verbs: </h2>}
                    
                    {verbs.map((val, ind) => {
                        return(
                            <input style={{margin: '1%'}} onChange={(event => setVerbs(event, ind))} />
                        )
                    }) }
                    {verbs.length>0 && <p></p>}                    
                    {adjectives.length > 0 && <h2>adjectives: </h2>}
                    {adjectives.map((val, ind) => {
                        return(
                            <input style={{margin: '1%'}} onChange={(event => setAdjectives(event, ind))} />
                        )
                    })}
                    {adjectives.length>0 && <p></p>}
                    <button className='button' onClick={handleSubmit}>Submit!</button>
                </div>
                :
                <div className="madlib">
                    {this.state.phrase}
                    <button className='button' onClick={handleRefresh}>Play Again!</button>
                </div>
                }
            </div>
            }
        </div>
    )

    }
}

export default connect(state => state)(UserInput);
