import React,{Component} from 'react';
class AlbumDetails extends Component {
    constructor(props){
        super(props)
        this.state={album:null};

    }
    render() { 
        return ( 
            <div className="container">
                <div className="row">
                    {this.state.album && (
                        <>
                        <div className="col-md-8">
                            <img src={this.state.album.cover_big} className="img-fluid">

                            </img>
                            </div>
                            <div className="col-md-4">
                                <ul>
                                    <li>{this.state.album.title}</li>
                                </ul>
                            </div>
                            </>
                    )}
                </div>
            </div>
         );
    }



    componentDidMount = async() => {
        var response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/album/"+this.props.id ,{
                headers: new Headers({
                  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                  "x-rapidapi-key": "081fe7ac1dmshc01ed6deec8fd84p1c4339jsn69b9e391bb08"
                })
            })
        var album = await response.json();
        this.setState({album:album});

     };
    componentDidUpdate = async prevProps => {
        if (prevProps.id !== this.props.id) {
            var response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/album/"+this.props.id ,{
                headers: new Headers({
                  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                  "x-rapidapi-key": "081fe7ac1dmshc01ed6deec8fd84p1c4339jsn69b9e391bb08"
                })
            })
            var album = await response.json();

            this.setState({ album: album});

         

        }
    };
}






 
export default AlbumDetails;