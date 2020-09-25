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
        this.setState({phrase: <h1>{phraseObj.phrase}</h1>})
        return (<h1>{phraseObj.phrase}</h1>)
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
                <div>
                    <h1>Loading</h1>
                </div>
            : <div>
                {this.state.sub ? 
                <div>
                    {/* reads in the user input */}
                    <h1>Select the words</h1>
                    <h2>Nouns: </h2>
                    {nouns.map((val, ind) => {
                        return(
                            <input onChange={(event => setNouns(event, ind))} />
                        )
                    })}
                    <h2>Verbs: </h2>
                    {verbs.map((val, ind) => {
                        return(
                            <input onChange={(event => setVerbs(event, ind))} />
                        )
                    }) }
                    <h2>Adjectives: </h2>
                    {adjectives.map((val, ind) => {
                        return(
                            <input onChange={(event => setAdjectives(event, ind))} />
                        )
                    })}
                    <button onClick={handleSubmit}>Submit!</button>
                </div>
                :
                <div>
                    {this.state.phrase}
                    <button onClick={handleRefresh}>Play Again!</button>
                </div>
                }
            </div>
            }
        </div>
    )

    }
}

export default connect(state => state)(UserInput);
