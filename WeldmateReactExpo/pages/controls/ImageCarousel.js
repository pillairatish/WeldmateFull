import React, {Component,useContext} from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { RootContext } from '../providers/RootProvider';
import { useNavigation } from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
 
export class ImageCarousel extends Component {
 
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { imageUrl:props.imageUrl}
  }

  componentDidMount()
  {
    var imageUrl = this.state.imageUrl;
    var images = imageUrl.split(';');
    this.setState({images:images});
  }

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.container}>
                {/* <Image alt='...'
         style={{width: 300, height: 300}}
         //resizeMode={'cover'}
        source={{
          uri: item,
        }}
      /> */}
      
       {/* <FastImage style={styles.image} 
       source={{uri:item, priority:FastImage.priority.normal,}} resizeMode={FastImage.resizeMode.contain}/> */}
            </View>
        );
    }
 
    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.images}
              renderItem={this._renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
        );
    }
}

const styles = StyleSheet.create({
  image:{
    width: 300, height: 300
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom :30
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 66,
    height: 58,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0250a3',
    padding: 10
  },
  imageCircleStyle:{
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: '#0250a3',   
    marginBottom: 30
  },
  buttonStyle:{
    marginHorizontal: 15,
    borderRadius:5,
    borderWidth:1,
    borderColor: '#0250a3',
   
  }
});