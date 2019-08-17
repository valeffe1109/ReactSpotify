import React from 'react';
import MusicSearch from './MusicSearch'
import AlbumDetails from './AlbumDetails'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



class FormSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ' ' , artist:[], selectAlbum:null , searchWord:""};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
      this.setState({value:event.target.value});
    }
  
    handleClick = input =>  {
     this.setState({

     searchWord: input.currentTarget.value
     });
    };
  
    render() {
      return (
          <>
          <div className="container d-flex justify-content-center">
            <Form>
        <FormGroup>
          <Label for="Search">Search Music:</Label>
          <Input type="text" name="search" id="searchInput" placeholder=""  value={this.state.value} onChange={this.handleChange}/>
          <Button onClick={this.handleClick} >Search </Button>
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




    componentDidUpdate = async () => {
      
       var result = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+this.state.searchWord, {
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
   
    
   
   
     }
  }

  export default FormSearch;