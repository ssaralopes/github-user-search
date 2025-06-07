// Código desenvolvido em Aula pelo Professor da Disciplina de Desenvolvimento Mobile
// A resolução do que foi proposto para esta Atividade está no App.js deste Projeto :)

import React from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";


class UsuarioGitHub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: {},
            usuario: 'dioneferrari'
        }
        this.carregaDados = this.carregaDados.bind(this);
    }

    carregaDados() {
        fetch(`https://api.github.com/users/${this.state.usuario}`)
            .then( response => response.json())
                .then( json => this.setState({dados: json}))
        .catch(err => this.setState({dados: {err}}))
    }

    componentDidMount() {
        this.carregaDados();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{ JSON.stringify(this.state.dados) }</Text>
                <View>
                    <TextInput style={styles.input}
                        onChangeText={ usuario => {this.setState({usuario})} }
                        value={this.state.usuario}>
                    </TextInput>
                </View>
                <View>
                    <Button
                        title="Buscar dados"
                        onPress={this.carregaDados}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 300,
        fontSize: 30,
        borderWidth: 1,
        borderColor: 'black',
    },

});

export default UsuarioGitHub;