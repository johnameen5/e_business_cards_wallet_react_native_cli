import {Card} from '@rneui/base';
import {TouchableOpacity} from 'react-native';
import React from 'react';

const CardListItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card containerStyle={{...props.style}} />
    </TouchableOpacity>
  );
};

export default CardListItem;
