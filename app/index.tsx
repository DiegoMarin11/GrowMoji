import { Pressable, StyleSheet,Text, View } from "react-native";

export default function Index() {
  return (
    <View style = {styles.container}>
      <Text style ={{
        fontSize: 24,
        color:'#fff',
      }}>
        Lorem ipssum .....
        </Text>
      <Pressable style ={styles.button}>

        <Text style ={{
          textAlign:'center',  
          fontSize:16,
        }}>
          Click para iniciar
        </Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: '#015428',
  justifyContent: "center",
  alignItems:'center',

  },
  button:{
    width: 300,
    height:30,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: "center",
    color:'#015428'
  }
});