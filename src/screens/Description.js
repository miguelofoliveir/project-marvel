import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, Text } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width


export default class Description extends Component {
    static navigationOptions = {
        title: 'Description'
    }

    render() {
        const { serie } = this.props.navigation.state.params;
        
        return (
           <ScrollView>
           <Image
                style={{width:SCREEN_WIDTH,height:SCREEN_WIDTH}}
                source={{uri: `${serie.thumbnail.path}.${serie.thumbnail.extension}` }} />

                <Text style={{padding:10, fontSize:20}}>Titulo: {serie.title}</Text>
                <Text style={{padding:10}}>Descrição: {serie.description}</Text>
                <Text style={{padding:10}}>Ano: {serie.endYear}</Text>
                <Text style={{padding:10}}>Avaliação: {serie.rating}</Text>
                <Text style={{padding:10}}>Tipo: {serie.type}</Text>
           </ScrollView>
        )
    }
}
