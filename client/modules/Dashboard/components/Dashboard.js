import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Dashboard</h1>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);