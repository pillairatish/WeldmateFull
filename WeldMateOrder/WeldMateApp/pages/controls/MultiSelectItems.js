// import component
import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const items = [{
    id: 1,
    name: 'Car'
  }, {
    id: 2,
    name: 'CV'
  }, {
    id: 3,
    name: 'TwoWheeler'
  }, {
    id: 4,
    name: 'OHT'
  },
  {
    id: 5,
    name: 'Dura Tread'
  }
];

export class MultiSelectItem extends Component {

  state = {
    selectedItems : []
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1, margin:10 }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component;
            if (this.multiSelect) {
                this.multiSelect._submitSelection = () => {
                  this.multiSelect._toggleSelector();
                  // reset searchTerm
                  this.multiSelect._clearSearchTerm();
                  this.props.parentCallback(this.state.selectedItems);
                };
              }
        }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Filter Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
          {this.multiSelect?this.multiSelect.getSelectedItemsExt(selectedItems):null}
        </View>
      </View>
    );
  }
}