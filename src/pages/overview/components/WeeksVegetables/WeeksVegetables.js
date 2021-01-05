import React, { Component} from 'react';
import './WeeksVegetables.css';
import CardVegetables from'../Card_Vege/CardVegetables';
import CardAdd from'../Card_Vege/CardAdd';

class WeeksVegetables extends Component {
    state = {
        vegetables:[],
        vegetablesLoading: true,
    };

    componentDidMount() {
        this.loadingVegetables();
    };
    
    loadingVegetables() {
        fetch('http://localhost:8080/panier/week')
        .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch status');
            }
            return res.json();
          })
        .then(resData => {

            this.setState({
                vegetables: resData.vegetables.map(vegetable => {
                    return {
                      ...vegetable,
                    }
                  }),
                vegetablesLoading: false,
            }
            
        )})
        .catch(err => {
            console.log(err);
            this.setState({
              error: err
            });
          });
    }
    render(){
        return(
            <div className="weeks">
                <div className="">
                    <h1 className="weeks__header__title">Week's vegetables</h1>
                    <h3 className="weeks__header__date">as of 25 May 2019, 09:41 PM</h3>
                </div>
                <div className="weeks__vegetables">
                {this.state.vegetables.length <= 0 && !this.state.vegetablesLoading ? (
                    <p >No vegetables found.</p>) : null}
                {!this.state.vegetablesLoading && this.state.vegetables.map(vegetable =>
                    <CardVegetables key={vegetable._id} name={vegetable.name} image={vegetable.imageUrl}/>
                )}
                </div>
                    <CardAdd/>

            </div>
        )
    }

}

export default WeeksVegetables;
