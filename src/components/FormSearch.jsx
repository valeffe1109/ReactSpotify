import React from 'react';
import MusicSearch from './MusicSearch'
import AlbumDetails from './AlbumDetails'
import {  Form, FormGroup, Label, Input } from 'reactstrap';



class FormSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ' ' , artist:[], selectAlbum:null};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value:event.target.value});
    }
  
    handleSubmit() {
      console.log(this.state.value);
 
    }
  
    render() {
      return (
          <>
          <div className="container d-flex justify-content-center">
            <Form>
        <FormGroup>
          <Label for="Search">Search Music:</Label>
          <Input type="text" name="search" id="searchInput" placeholder=""  value={this.state.value} onChange={this.handleChange}/>
        </FormGroup>
        </Form>
        </div>

                      
            <div className="container my-5">
            {this.state.artist &&
              <MusicSearch artist={this.state.artist} 
              onArtistClicked={(id)=> this.setState({selectAlbum:id})}/>}



      {this.state.selectAlbum && 
          <AlbumDetails id={this.state.selectAlbum}/>}
          </div>

        
          
        </>

        
      );
    }




    componentDidUpdate = async (prevState) => {
        console.log(this.state.selectAlbum)
        var search = this.state.value
        if (prevState.value !== this.state.value){
       var result = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+search, {
         headers: new Headers({
           "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
           "x-rapidapi-key": "081fe7ac1dmshc01ed6deec8fd84p1c4339jsn69b9e391bb08"
         })
       });
    
   
       var json = await result.json();
   
       this.setState({
   
         artist: json.data,
         
       });
       console.log(json.data)
       console.log(this.props.id)
   
    }
   
   
     }
  }

  export default FormSearch;