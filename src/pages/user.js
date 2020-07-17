import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Redux stuff
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
// Custom UI
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };
  componentDidMount() {
    const { handle, screamId } = this.props.match.params;

    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => console.error(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (screamIdParam !== scream.screamId)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getUserData })(user);
