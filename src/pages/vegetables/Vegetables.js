import React, { Component, Fragment } from 'react'; 

import Legume from './components/Legume'
import Paginator from './components/Paginator';
import Loader from '../../shared/components/Loader/Loader';
import MainHeader from '../../shared/components/Navigation/MainHeader';
import "./Vegetables.css";

class Vegetables extends Component {
    state = {
        isEditing: false,
        vegetables: [],
        totalPosts: 0,
        vegePage: 1,
        status: '',
        vegeLoading: true,
    }
    
    componentDidMount() {
        this.loadLegumes();
    }
    

    loadLegumes = direction => {
        if(direction){
            this.setState({ vegeLoading: true, vegetables: [] });
        }

        fetch('http://localhost:8080/panier/')
        .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch vegetables.');
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
                vegeLoading: false
            });
            console.log(this.state.vegetables)
        })
        .catch(this.catchError);
    };

    render() {
        return (
            <Fragment className="vegetables">

            <section className="vegetables__header">
                <MainHeader>
                    <h1>Vegetables</h1>
                </MainHeader>
            </section>
            <section className="feed">
            {this.state.vegeLoading && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Loader />
                </div>
            )}
            {this.state.vegetables.length <= 0 && !this.state.vegeLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
            ) : null}
            {!this.state.vegeLoading && (
                <Paginator>
                  {this.state.vegetables.map(legume => (
                    <Legume
                      key={legume._id}
                      id={legume._id}
                      name={legume.name}
                     />
                  ))}
                </Paginator>
              )}
            </section>
        </Fragment>
        );
    }

}
export default Vegetables;

