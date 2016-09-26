'use strict';

import React, { Component } from 'react';
import { Content, Spinner, Button, Container, Card, CardItem, Thumbnail } from 'native-base';
import * as actions from './../../actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';

import {
  Text,
  View,
  ListView
} from 'react-native';

var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.app.result.data),
    };

    this._renderRow = this._renderRow.bind(this);
    this.props.actions.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.app.result.data)
    });
  }

  _renderRow(jobads) {
    let end_date = moment(jobads.end_at).format('DD/MM/YYYY');
    let company_logo = jobads.company.logo_path ? {uri: jobads.company.logo_path} : require('./../../images/company_icon_home.png');

    return (
      <View style={styles.list_ads}>
        <Card>
          <CardItem header>
            <Thumbnail source={company_logo} />
            <Text>{jobads.title}</Text>
            <Text>{jobads.company.name}</Text>
          </CardItem>

          <CardItem cardBody>
            <Text>
                {jobads.description.replace(/(<([^>]+)>)/ig,'').trim()}
            </Text>
            <Text style={styles.end_date}>
              close date: {end_date}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text style={styles.title}>List Available Job Ads</Text>
          </View>
          {
            this.props.app.result.data &&
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              style={styles.news}
              renderRow={this._renderRow}
            />
          }
          {
            this.props.app.proccessing &&
            <View style={styles.loader_container}>
              <Spinner color="#006BFF" />
              <Text>Please wait, data is being loaded.</Text>
            </View>
          }
          
        </Content>
      </Container>      
    );
  }
}

export default connect(
  (state) => {
    return {
      app: state.get('app')
    };
  }, (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
  })
)(App);
