import React, {Component} from "react";
import {
  AppBar,
  Grid,
  withStyles,
  Tab, IconButton, Tabs, MenuItem, Divider, Menu,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {colorToRgb} from "../utils";
import {Add as AddIcon, ArrowDropDown} from "@material-ui/icons";
import tinycolor from 'tinycolor2';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    minHeight: '30px',
    textTransform: 'initial',
    fontFamily: 'inherit',
    fontSize: '0.8125rem',
    minWidth: 72,
    padding: '6px 24px',
    whiteSpace: 'pre',
    // background: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(24, 24, 24, 0.15)',
      opacity: 1,
    },
    '&:focus': {
      // color: '#40a9ff',
    },
  },
  tabSelected: {
    // background: '#1890ff1f',
    color: '#1890ff',
  },
  tabWrapper: {
    // padding: '6px 12px',
    flexDirection: 'row',
  },
  tabsRoot: {
    minHeight: '30px',
    width: 'calc(100% - 34px)'
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    height: 40,
    backgroundColor: 'rgba(24, 144, 255, 0.15)',
    pointerEvents: 'none',
  },
  scrollButtons: {
    width: 25,
    '&:hover': {
      backgroundColor: 'rgba(24, 24, 24, 0.15)',
    },
  },
  addSheetButton: {
    padding: 7,
  },
  sheetToggle: {
    marginLeft: 5,
    marginRight: -8,
    '&:hover': {
      backgroundColor: '#b3b3b5',
      opacity: 1,
    },
  }
});

class ExcelBottomBar extends Component {

  constructor(props) {
    super(props);
    this.excel = props.context;
    this.state = {sheetToggleMenu: null};
    this.history = {
      sheetNames: props.context.sheetNames,
      currentSheetIdx: props.context.currentSheetIdx,
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {currentSheetIdx, sheetNames} = this.history;
    return this.state !== nextState
      || currentSheetIdx !== nextProps.context.currentSheetIdx
      || sheetNames.length !== nextProps.context.sheetNames.length
      || sheetNames[currentSheetIdx] !== nextProps.context.sheetNames[currentSheetIdx];
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.history.currentSheetIdx = this.props.context.currentSheetIdx;
  }

  handleChange = (event, value) => {
    if (this.excel.currentSheetIdx !== value) {
      console.log('switch to ', value);
      this.excel.switchSheet(value);
    }
  };

  handleClick = what => event => {
    if (what === 'sheetToggleMenu') {
      // i don't want to trigger the parent's onCLick event
      event.stopPropagation();
      this.setState({sheetToggleMenu: event.currentTarget});
    }
  };

  handleClose = what => () => {
    if (what === 'sheetToggleMenu') {
      this.setState({sheetToggleMenu: null});
    }
  };

  workbookTabs() {
    const {classes} = this.props;
    const {excel} = this;
    const {sheetNames} = excel;
    const tabs = [];
    for (let i = 0; i < sheetNames.length; i++) {
      const rgb = tinycolor(colorToRgb(excel.workbook.sheet(i).tabColor()) || 'f5f5f5');

      tabs.push(
        <Tab
          classes={{root: classes.tabRoot, selected: classes.tabSelected, wrapper: classes.tabWrapper}}
          style={{borderBottom: '3px solid ' + rgb}}
          // className={this.props.classes.tab}
          key={sheetNames[i]}
          label={
            [sheetNames[i],
              <span key={'sheet button'} className={classes.sheetToggle}
                 onClick={this.handleClick('sheetToggleMenu')}>
                <ArrowDropDown fontSize="small"/>
              </span>
            ]
          }
        />
      )
    }
    return tabs;
  }


  render() {
    const {classes} = this.props;
    const {sheetToggleMenu} = this.state;
    const {currentSheetIdx} = this.excel.state;
    const {addSheet} = this.excel;
    return (
      <>
        <AppBar position="static" color="default">
          <Grid container className={classes.root}>
            <Grid item xs={"auto"} id="addSheetButton">
              <IconButton aria-label="Add Sheet" className={classes.addSheetButton}
                          onClick={addSheet}>
                <AddIcon fontSize="small"/>
              </IconButton>
            </Grid>
            <Tabs
              classes={{
                root: classes.tabsRoot,
                indicator: classes.indicator,
                scrollButtons: classes.scrollButtons
              }}
              value={currentSheetIdx}
              onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="auto">

              {this.workbookTabs()}
            </Tabs>

          </Grid>
        </AppBar>
        <Menu
          id="simple-menu"
          disableAutoFocusItem
          anchorEl={sheetToggleMenu}
          open={Boolean(sheetToggleMenu)}
          onClose={this.handleClose('sheetToggleMenu')}
        >
          <MenuItem onClick={this.handleClose}>Change Color</MenuItem>
          <MenuItem onClick={this.handleClose}>Hide</MenuItem>
          <MenuItem onClick={this.handleClose}>Delete </MenuItem>
          <MenuItem onClick={this.handleClose}>Rename</MenuItem>
          <Divider/>
          <MenuItem onClick={this.handleClose}>Move Left</MenuItem>
          <MenuItem onClick={this.handleClose}>Move Right</MenuItem>
        </Menu>
      </>
    )
  }
}

ExcelBottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExcelBottomBar);
