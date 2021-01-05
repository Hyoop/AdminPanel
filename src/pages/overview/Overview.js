import React, { Component } from 'react'; 
import "./Overview.css";
import MainHeader from '../../shared/components/Navigation/MainHeader';

import Card from './components/Card/Card';
import WeeksVegetables from './components/WeeksVegetables/WeeksVegetables';

class Overview extends Component {
    state = {
        NbSubscriptions: 0,
        NbVegetables: 0,
        NbRecipes: 0,
        Nbmembers: 0,
        Vegetablesoftheweek:[],
        overviewLoading: true,
    }
    render(){
        return (
        <div className="overview">
            <section className="overview__header">
                <MainHeader>
                    <h1>Overview</h1>
                </MainHeader>
            </section>
            <section className="overviewcard">
                <Card title="Subscriptions" content={this.state.NbSubscriptions}/>
                <Card title="Members" content={this.state.Nbmembers}/>
                <Card title="Vegetables" content={this.state.NbVegetables}/>
                <Card title="Recipes" content={this.state.NbRecipes}/>
            </section>
            <section className="overview-weeks_vegetables">
                <WeeksVegetables />
            </section>
            <section className="overview-task">
                <div>2.</div>
            </section>

            
        </div>)
        }
}

export default Overview;
