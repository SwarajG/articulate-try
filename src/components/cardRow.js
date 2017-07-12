import React, { Component } from 'react';
import Editor from 'react-medium-editor';


import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import '../App.css';
import {
  defaultCardStateType,
  defaultAddedToList,
} from '../static/defaultType';
import {
  noOptions as defaultSectionOptions
} from '../static/MediumOptions';

const styles = {
  editorStyle: {
    outline: 'none',
    display: 'inline-block',
    cursor: 'text',
    width: '50%',
  },
  instructionStyle: {
    position: 'absolute',
    bottom: '5px',
    right: '20px',
    color: '#757575',
    fontSize: '10px',
  },
  bullet: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#D6D7D7',
    display: 'inline-block',
    lineHeight: '24px',
    position: 'absolute',
    top: '2.5rem',
    left: '9px',
  },
  deleteIcon: {
    top: '5px',
    right: '20px',
    position: 'absolute',
    fontSize: '22px',
    lineHeight: '24px',
    cursor: 'pointer',
  },
  deleteIconForCard: {
    top: '30px',
    right: '20px',
    position: 'absolute',
    fontSize: '22px',
    lineHeight: '24px',
    cursor: 'pointer',
  },
};

export default class CardRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  renderCardWithState = () => {
    const { name, type, stateType, number } = this.props;
    const { hover } = this.state;
    const hidden = hover ? '' : 'hidden';
    if (type === 'section') {
      return (
        <div className="sectionStyle">
          <Editor
            text={name.toUpperCase()}
            onChange={(text, medium) => this.props.handleChange(text, medium, 'card')}
            onKeyPress={(event) => this.props.handleKeyPress(event, number, type, stateType)}
            options={defaultSectionOptions}
            style={styles.editorStyle}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <span
            className={`ion-ios-trash-outline ${hidden}`}
            style={styles.deleteIcon}
            onClick={() => this.props.deleteCard(number)}
          />
        </div>
      );
    } else if (type === 'card' && stateType === defaultAddedToList && name !== '') {
      return (
        <div className="cardStyle">
          <span style={styles.bullet} />
          <Editor
            text={name}
            onChange={(text, medium) => this.props.handleChange(text, medium, 'card')}
            onKeyPress={(event) => this.props.handleKeyPress(event, number, type, stateType)}
            options={defaultSectionOptions}
            style={styles.editorStyle}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <button
            className="primary fill-dark"
            style={{ marginLeft: '10px', marginRight: '50px', float: 'right' }}
          >
            ADD CONTENT
          </button>
          <span
            className={`ion-ios-trash-outline ${hidden}`}
            style={styles.deleteIconForCard}
            onClick={() => this.props.deleteCard(number)}
          />
        </div>
      );
    } else if (type === 'card' && stateType === defaultCardStateType && name === '') {
      return (
        <div className="cardStyle" style={{ cursor: 'default' }}>
          <span style={styles.bullet} />
          <Editor
            text={name}
            onChange={(text, medium) => this.props.handleChange(text, medium, 'card')}
            onKeyPress={(event) => this.props.handleKeyPress(event, number, type, stateType)}
            options={defaultSectionOptions}
            style={{
              outline: 'none',
              display: 'inline-block',
              cursor: 'text',
              width: '100%',
            }}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <div style={styles.instructionStyle}>Shift + Enter to add as a section</div>
        </div>
      );
    }
  }

  setHover = () => {
    this.setState({
      hover: !this.state.hover,
    });
  }

  render() {
    return (
      <div
        style={{ position: 'relative' }}
        onMouseOver={this.setHover}
        onMouseOut={this.setHover}
      >
        {
          this.renderCardWithState()
        }
      </div>
    );
  }
}
