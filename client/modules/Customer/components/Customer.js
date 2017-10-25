import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Customer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <section>
                 <input type="text" placeholder="Email Id" />
                 <br/>
                 <br/>
                 <button>Search</button>
               </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps(state) {
    return {
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);