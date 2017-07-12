import React from 'react';
import Editor from 'react-medium-editor';
import {
  Row,
  Col,
} from 'antd';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import '../App.css';
import {
  defaultCardStateType,
  defaultAddedToList,
} from '../static/defaultType';
import CardRow from './cardRow';

const styles = {
  titleStyle: {
    outline: 'none',
    cursor: 'text',
    fontSize: '42px',
    lineHeight: '42px',
    background: 'none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)',
    textRendering: 'geometricPrecision',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  descriptionStyle: {
    outline: 'none',
    cursor: 'text',
    minHeight: '100px',
    fontSize: '16px',
    lineHeight: '16px',
    background: 'none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)',
    textRendering: 'geometricPrecision',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

export default class ArticulateIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cards: [{
        name: 'Section 1',
        rowType: 'section',
        stateType: defaultAddedToList,
      }, {
        name: 'Hello',
        rowType: 'card',
        stateType: defaultAddedToList,
      }, {
        name: '',
        rowType: 'card',
        stateType: defaultCardStateType,
      }],
    };
  }

  defaultOptions = (key, placeholder) => {
    if (key === 'title') {
      return {
        toolbar: false,
        placeholder: {
          text: placeholder,
          hideOnClick: false,
        }
      };
    } else if (key === 'description') {
      return {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'quote']
        },
        placeholder: {
          text: placeholder,
          hideOnClick: false,
        }
      }
    }
  };

  handleChange = (text, medium, key, index) => {
    const { cards } = this.state;
    if (key === 'card' && index >= 0) {
      cards[index].name = medium.elements[0].innerText;
    } else {
      this.setState({
        [key]: text,
      });
    }
  }

  onBlur = (e) => {

  }

  onFocus = (event) => {

  }

  handleKeyPress = (event, index, type, stateType) => {
    const nameElement = event.target.children[0];
    if (event.key === 'Enter' && event.shiftKey && event.target.children[0]) {
      event.preventDefault();
      const name = nameElement.innerHTML;
      if (
        type !== 'section' &&
        (event.key === 'Enter' && event.shiftKey) &&
        stateType !== defaultCardStateType
      ) return;
      this.addSection(name, index, type, stateType);
    } else if (event.key === 'Enter' && event.target.children[0]) {
      event.preventDefault();
      const name = nameElement.innerHTML;
      if (
        type !== 'card' &&
        event.key === 'Enter' &&
        stateType !== defaultCardStateType
      ) return;
      this.addCard(name, index, type, stateType);
    } else if (event.key === 'Enter' || (event.key === 'Enter' && event.shiftKey)) {
      event.preventDefault();
    }
  }

  addSection = (name, index, type, stateType) => {
    const { cards } = this.state;
    if (type === 'section' && stateType === defaultAddedToList) return;
    cards.splice(index, 0, {
      name,
      rowType: 'section',
      stateType: defaultAddedToList,
    });
    this.setState({
      cards,
    });
  }

  addCard = (name, index, type, stateType) => {
    const { cards } = this.state;
    if (type === 'card' && stateType !== defaultCardStateType) return;
    cards.splice(index, 0, {
      name,
      rowType: 'card',
      stateType: defaultAddedToList,
    });
    this.setState({
      cards,
    });
  }

  deleteCard = (index) => {
    const { cards } = this.state;
    if (index > -1) {
      cards.splice(index, 1);
    }
    this.forceUpdate();
  }

  updateCard = () => {
    this.forceUpdate();
  }

  updateSection = () => {
    this.forceUpdate();
  }

  handleSort(data) {
    console.log(data);
    this.setState({
      result: data,
    });
  }

  renderAllSection = () => {
    const { cards } = this.state;
    return cards.map((item, index) => {
      return (
        <DemoHOCItem className="vertical" sortData={item} key={index}>
          <CardRow
            number={index}
            name={item.name}
            type={item.rowType}
            stateType={item.stateType}
            key={`${item.name}${index}`}
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            deleteCard={this.deleteCard}
          />
        </DemoHOCItem>
      );
    });
  }

  render() {
    const { title, description } = this.state;

    return (
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <Row>
          <Col span={24}>
            <div style={{ padding: '0 80px' }}>
              <div style={{ padding: '72px 0 32px', marginBottom: '10px' }}>
                <Editor
                  text={title}
                  onChange={(text, medium) => this.handleChange(text, medium, 'title')}
                  options={this.defaultOptions('title', 'Course title')}
                  style={styles.titleStyle}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                />
              </div>
              <div>
                <Editor
                  text={description}
                  onChange={(text, medium) => this.handleChange(text, medium, 'description')}
                  options={this.defaultOptions('description', 'Describe your course')}
                  style={styles.descriptionStyle}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                />
              </div>
              <Sortable onSort={this.handleSort} className="vertical-container" direction="vertical">
                {
                  this.renderAllSection()
                }
              </Sortable>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
