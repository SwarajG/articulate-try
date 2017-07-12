import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <RaisedButton
          label="Open Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem
            rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z"/></svg>}
            menuItems={[
              <MenuItem>
                Part 1
              </MenuItem>,
              <MenuItem>
                Part 2
              </MenuItem>,
              <MenuItem>
                Part 3
              </MenuItem>
            ]}
          >
            Menu Item
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            Menu Item 2
            <MenuItem onTouchTap={this.handleClose}>
              Part 1
            </MenuItem>
            <MenuItem onTouchTap={this.handleClose}>
              Part 2
            </MenuItem>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
