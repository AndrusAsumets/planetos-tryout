import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Crawl, API } from '../actions/actions';
import Dashboard from '../containers/Dashboard';
require('../styles/App.scss');

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        const pvpoutput = { url: 'http://pvoutput.org/intraday.jsp?id=6577&sid=7367', selector: '#tb > tbody > tr:nth-child(3) > td' };
        const solar = { type: 'solar' };
        const cloud = { type: 'cloud'};

        dispatch(Crawl(pvpoutput));
        dispatch(API(solar));
        dispatch(API(cloud));

        setInterval(function(){
            dispatch(Crawl(pvpoutput));
        }, 10 * 1000);

        setInterval(function(){
            dispatch(API(solar));
            dispatch(API(cloud));
        }, 5 * 60 * 1000);
    }

    render() {
        const { energy, solar, cloud } = this.props;

        return (
            <Dashboard energy={ energy } solar={ solar } cloud={ cloud }/>
        )
    }
}

App.propTypes = {
    energy: React.PropTypes.array,
    solar: React.PropTypes.array,
    cloud: React.PropTypes.array
};

function mapStateToProps(state) {
    const { energy, solar, cloud } = state;
    return {
        energy, solar, cloud
    };
}

export default connect(mapStateToProps)(App);
