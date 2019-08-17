import React from "react";
import MusicSearch from "./MusicSearch";
import AlbumDetails from "./AlbumDetails";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      artist: [],
      selectAlbum: null,
      errMess: undefined
    };
  }

  handleChange = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleClick = async () => {
    await this.fetchMusic(this.state.value);
  };

  render() {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <Label for="Search">Search Music:</Label>
          <Input
            type="text"
            name="search"
            id="searchInput"
            placeholder=""
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleClick}>Search </Button>
        </div>

          <div className="container my-5">
          {this.state.artist && (
            <MusicSearch
              artist={this.state.artist}
              onArtistClicked={id => this.setState({ selectAlbum: id })}
            />
          )}

          {this.state.selectAlbum && (
            <AlbumDetails id={this.state.selectAlbum} />
          )}
        </div> 
      </>
    );
  }



  /* 
     MIGLIORATA LA FETCH HO AGGIUNTO IL CONTROLLO INTERNO CON RESULT.OK E AGGIUNTO IL TRY E CATCH PER IL CONTROLLO ESTERNO DELLA FETCH
     LA FETCH RICEVE COME PARAMETRO UNA SEARCH WORD SU CUI POI ESEGUIRà UNA FETCH. LA SEARCH WORD è IL "THIS.STATE.VALUE" IN QUESTO CASO.
     AGGIUNTO ANCHE IL CATCH DEGLI ERRORI 
  */
  fetchMusic = async searchWord => {
    try {
      var result = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchWord,
        {
          headers: new Headers({
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "081fe7ac1dmshc01ed6deec8fd84p1c4339jsn69b9e391bb08"
          })
        }
      );

      var json = await result.json();
      if (result.ok) {
        this.setState({
          artist: json.data
        });
      } else {
        this.setState({
          errMess: json.message
        });
      }
    } catch (err) {
      return this.setState({
        errMess: "Error on fetch" + err
      });
    }
  };
}

export default FormSearch;
