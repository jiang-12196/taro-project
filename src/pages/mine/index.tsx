import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getOpenId } from '../../actions/counter';

import './index.less';
const db = wx.cloud.database();
const userData = db.collection('user');

type PageStateProps = {
  counter: {
    openId: string;
  };
};

type PageDispatchProps = {
  getOpenId: (id) => void;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
  openId: String;
}

const stateToProps = state => ({
  counter: state.counter
});

const actionToProps = dispatch => ({
  getOpenId: getOpenId(dispatch)
});

@connect(
  stateToProps,
  actionToProps
)
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  };

  constructor(props) {
    super(props);
    this.openId = '';
    this.state = {
      auth: false
    };
  }

  componentDidMount() {
    const { getOpenId } = this.props;
    wx.login({
      success: res => {
        getOpenId(res.code);
        this.openId = res.code;
        userData
          .where({
            _openid: 'oegyL5TjsAdA3i0bFIvJ916mL-Oo'
          })
          .get({
            success: res => {
              if (res.data.length) {
                this.setState({
                  auth: true
                });
              }
            }
          });
      }
    });
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { auth } = this.state;
    if (!auth) {
      return (
        <View className="index">
          <Button
            openType="getUserInfo"
            onGetUserInfo={this._callBack}
            className="auth-phone"
          >
            授权
          </Button>
        </View>
      );
    }
    return (
      <View className="index">
        <View>已授权</View>
      </View>
    );
  }

  _callBack = e => {
    const { counter } = this.props;
    const { userInfo } = e.detail;
    userData.add({
      data: {
        ...userInfo,
        openId: counter.openId
      },
      success(res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
      }
    });
  };
}

export default Index as ComponentClass<PageOwnProps, PageState>;
