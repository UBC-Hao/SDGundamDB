import {React,useEffect,Component} from 'react';
import Header from './ui/Header';
import Navigator from './ui/Navigator';
import UnitsList from './ui/UnitsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null,   // Unit info
      skills: null,
      weapons: null,
      showunits: null,
      results: "",
      infos: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  
  handleSearchChange(ranks, rarities, searchText) {
    let results = this.state.units;
    if (ranks.length > 0) {
      results = results.filter((unit) => ranks.includes(unit.mecha_level));
    }
    if (rarities.length > 0) {
      results = results.filter((unit) => rarities.includes(unit.mecha_quality));
    }
    if(searchText.length > 0) {
      let extraNames = this.state.infos["extra"].filter((extra) => extra.name.includes(searchText));
      let extraIds = extraNames.map((extra) => extra.id);
      results = results.filter((unit) => (unit.name.replace("敢达","钢达").toLowerCase().includes(searchText.replace("敢达","钢达").toLowerCase())||unit.mecha_name_en.includes(searchText)||extraIds.includes(unit.mecha_id) ));
    }
    //Only display units before R
    if (results !== null) results = results.filter((unit) => (unit.r_mecha_id===0)||(unit.r_mecha_id>unit.mecha_id));
    this.setState({
      results: results,
    });
  }

  componentDidMount() {

    fetch('./units.json')
      .then(response => response.json())
      .then(data =>{
        this.setState({
          units: data,
        }, () => {
          this.handleSearchChange([],[],"");
        });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

      fetch('./prints.json')
      .then(response => response.json())
      .then(data =>{
        let infosnew = this.state.infos;
        infosnew["prints"] = data;
        this.setState({
          infos: infosnew,
        }, () => {
        });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });


      fetch('./weapon_effect.json')
      .then(response => response.json())
      .then(data =>{
        let infosnew = this.state.infos;
        infosnew["weapon_effects"] = data;
        this.setState({
          infos: infosnew,
        }, () => {
        });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });


      fetch('./extra.json')
      .then(response => response.json())
      .then(data =>{
        let infosnew = this.state.infos;
        infosnew["extra"] = data;
        this.setState({
          infos: infosnew,
        }, () => {
        });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

      fetch('./effects.json')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const decoder = new TextDecoder('utf-16le');  // Change this to match the encoding of your file.
        const text = decoder.decode(arrayBuffer);
        return JSON.parse(text);
      })
      .then(data =>{
        let infosnew = this.state.infos;
        infosnew["effects"] = data;
        this.setState({
          infos: infosnew,
        }, () => {
        });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

      fetch('./skills.json')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const decoder = new TextDecoder('utf-16le');  // Change this to match the encoding of your file.
        const text = decoder.decode(arrayBuffer);
        return JSON.parse(text);
      })
      .then(data => {
        this.setState({
          skills: data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      

      

      fetch('./weapons.json')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const decoder = new TextDecoder('utf-16le');  // Change this to match the encoding of your file.
        const text = decoder.decode(arrayBuffer);
        return JSON.parse(text);
      })
      .then(data => {
        this.setState({
          weapons: data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  render() {
    
    return (
      <div>
        <Header />
        <Navigator onSearch={this.handleSearchChange}/>
        <UnitsList results={this.state.results} skills={this.state.skills} units={this.state.units} weapons={this.state.weapons} infos={this.state.infos}/>
      </div>
    );
  }
}

export default App;