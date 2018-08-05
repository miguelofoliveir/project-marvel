import React from 'react'
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native'
import md5 from 'js-md5'

const PUBLIC_KEY = '0ca4f3278ee8f9f87d8a1f24edea2de5'
const PRIVATE_KEY = 'e03e2a8d8cef60bb3323c0821f0907f5ea6ca58d'

export default class Home extends React.PureComponent {
    static navigationOptions = {
        title: 'Seriados'
    }

    state = {
        data: []
    }

    async componentDidMount() {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)
        const response = await fetch(`https://gateway.marvel.com/v1/public/series?ts=${timestamp}&limit=100&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        const responseJson = await response.json()
        this.setState({data: responseJson.data.results})
    }

    _renderItem = ({item}) => {
    return  (
        <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
            <Image style={{height: 50, width: 50, borderRadius: 25}} source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
            <Text style={{marginLeft: 10}}>{item.title}</Text>
        </TouchableOpacity>
    )
}

    _onItemPress = (item) => {
        this.props.navigation.navigate('Description', {serie: item})
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={()=>
                    <View style={{height:1, backgroundColor: '#f7f7f7'}}
                />}
            />
        )
    }
}
