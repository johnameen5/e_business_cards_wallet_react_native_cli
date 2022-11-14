import {FlatList} from 'react-native';
import {BUSINESS_CARDS_KEY} from '../../Values/Strings';
import {connect} from 'react-redux';
import {Component} from 'react';
import {getFromStorage} from '../../Services/AsnycStorageService';
import CardListItem from './Card';
import {cardsListStyle, cardsStyle} from '../../Values/styles';
import React from 'react';

class CardsList extends Component {
  async componentDidMount() {
    this.props.setBusinessCards(
      JSON.parse(await getFromStorage(BUSINESS_CARDS_KEY)),
    );
  }

  render() {
    return (
      <FlatList
        scrollEnabled={true}
        style={cardsListStyle}
        data={this.props.businessCards}
        renderItem={({item}) => {
          return (
            <CardListItem
              style={cardsStyle}
              onPress={() => {
                this.props.navigation.navigate('Card', {businessCard: item});
              }}
            />
          );
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    businessCards: state.businessCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addBusinessCard: businessCard =>
      dispatch({type: 'ADD_BUSINESS_CARD', businessCard: businessCard}),
    removeBusinessCard: uuid =>
      dispatch({type: 'REMOVE_BUSINESS_CARD', uuid: uuid}),
    setBusinessCards: businessCards =>
      dispatch({type: 'SET_BUSINESS_CARDS', businessCards: businessCards}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
