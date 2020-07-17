import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
// Custom UI
import ScreamSkeleton from "../util/ScreamSkeleton";
// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
