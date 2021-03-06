import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { backgroundColor: '#003399',
    margin: '0px',
    borderRadius: '0px',
    border: 'none',
    paddingLeft: '5em',
    paddingRight: '5em',
    marginBottom: '0px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>FitYonder</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item key='feed'><Dropdown text="Feed" pointing="top right" icon={'dropdown'}>
                  <Dropdown.Menu>
                    <Dropdown.Item text="Workout" as={NavLink} exact to="/list_workouts"/>
                    <Dropdown.Item text="Event" as={NavLink} exact to="/list_events"/>
                  </Dropdown.Menu>
                </Dropdown></Menu.Item>,
                <Menu.Item key='add'><Dropdown text="Add" pointing="top right" icon={'dropdown'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="add" text="Workout" as={NavLink} exact to="/add_workout"/>
                    <Dropdown.Item icon="add" text="Event" as={NavLink} exact to="/add_event"/>
                  </Dropdown.Menu>
                </Dropdown></Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='profile'>Profile</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item key='admin'><Dropdown text="Admin" pointing="top right" icon={'dropdown'}>
            <Dropdown.Menu>
            <Dropdown.Item text="Workout" as={NavLink} exact to="/admin_workout"/>
            <Dropdown.Item text="Event" as={NavLink} exact to="/admin_event"/>
            </Dropdown.Menu>
            </Dropdown></Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    {/* <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/> */}
                    <Dropdown.Item icon="remove user" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
