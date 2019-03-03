import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getOpenId } from '../../actions/counter';

import './index.less';
const db = wx.cloud.database();
const aaa = db.collection('user');

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

  componentDidMount() {
    const { getOpenId } = this.props;
    wx.login({
      success: res => {
        getOpenId(res.code);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
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

  _callBack = e => {
    const { counter } = this.props;
    const { userInfo } = e.detail;
    console.log(e.detail.userInfo, counter.openId);
    aaa.add({
      data: {
        ...userInfo,
        openId: counter.openId
      },
      success(res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
        console.log(res);
      }
    });
  };
}

export default Index as ComponentClass<PageOwnProps, PageState>;
