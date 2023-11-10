import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import {Button, StyleSheet, Text, View} from "react-native";

const createDDL = "create table if not exists items (id integer primary key not null, prompt text, value text);"

const openDatabase = () => {
  return SQLite.openDatabase("db.db");
}

///hook om het id te verhogen
const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const SQLData = () => {

  const [text, setText] = useState(null)
  const [forceUpdate, forceUpdateId] = useForceUpdate()
  const [data, setData] = useState([])
  const db = openDatabase()

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(createDDL)
      tx.executeSql("select * from items", [], (_, { rows }) =>
        setData(rows?._array)
      )
    })

  }, [])

  const deleteData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from items")
        tx.executeSql("select * from items", [], (_, { rows }) =>
          setData(rows?._array)
        )
      }
    )
  }

  const add = (prompt, value) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (prompt, value) values (?, ?)", [prompt, value])
        tx.executeSql("select * from items", [], (_, { rows }) =>
          setData(rows?._array)
        )
      },
      null,
      forceUpdate
    );
  }

  return(
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Database:</Text>
        <Text>{ data ? JSON.stringify(data, null, 2): '' }</Text>
      </View>
      <View style={styles.button}>
        <Button title={'Save Record'} onPress={ () => add('Item', 'Value') }/>
        <Button title={'Truncate'} onPress={ () => deleteData() }/>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    width: 300,
    backgroundColor: '#fcfcfc',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding:20
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding:20,
    margin:10,
    width: 300,

  }
})


export default SQLData