import {FlatList, ListViewBase, Text, View} from 'react-native';
import {getFromStorage} from '../../Services/AsnycStorageService';
import {BUSINESS_CARDS_KEY} from '../../Values/Strings';

function CardsList() {
  return (
    <FlatList
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
      }}
      data={async () => {
        let data = JSON.parse(await getFromStorage(BUSINESS_CARDS_KEY));
        console.log(data);
        return data;
      }}
      renderItem={item => <Text style={{color: 'black'}}>{'HERE'}</Text>}
    />
  );
}

export default CardsList;
