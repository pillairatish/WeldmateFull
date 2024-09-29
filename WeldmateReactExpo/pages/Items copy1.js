import { FlatList, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React, { Component,useState,useEffect} from 'react';
import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { RootContext } from './providers/RootProvider';
import {httpurl,darkGreen, green} from './logincontrols/Constants';
import RowItem from './controls/RowItem';


const data = [
  { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }
];

const minCols = 1;

const calcNumColumns = (width) => {
  const cols = width / styles.item.width;
  const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  const colsMinusMargin = cols - (2 * colsFloor * styles.item.margin);
  if (colsMinusMargin < colsFloor && colsFloor > minCols) {
    return colsFloor - 1;
  } else return colsFloor;
};

const formatData = (data, numColumns) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
    data.push({key: `empty-${amountItemsLastRow}`, empty: true});
    amountItemsLastRow++;
  }
  return data;
};

const renderItem = ({ item, index }) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemTransparent]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

const Items = () => {
    const {width} = useWindowDimensions();
    const [numColumns, setNumColumns] = useState(calcNumColumns(width));

    useEffect(() => { 
      setNumColumns(calcNumColumns(width));
      }, [width]);

    return (
      <FlatList
        key={numColumns}
        data={formatData(data, numColumns)}
        style={styles.container}
        numColumns={numColumns}
        renderItem={renderItem}
      />
    );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#A1A1A1',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 120,
    width: 90
  },
  itemTransparent: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});

export default Items;