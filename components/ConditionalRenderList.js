import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

const ConditionalRenderList = ({
  states,
  state,
  toggle,
  setIndexOfState,
  setToggle,
  setState,
}) => {
  // const [state, setState] = React.useState("");
  // const [indexOfState, setIndexOfState] = React.useState();
  const getStateId = (stateName) => {
    for (let i = 0; i < states.length; i++) {
      if (states[i].name === stateName) {
        setIndexOfState(states[i].id);
      }
    }
  };

  if (state) {
    const filteredList = states.filter((item) =>
      item.name.toString().toLowerCase().startsWith(state.toLowerCase())
    );
    if (filteredList.length) {
      return (
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropDownItems}
              onPress={() => {
                getStateId(item.name);
                setState(item.name);
                setToggle(!toggle);
              }}
            >
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      );
    }

    return <Text>state</Text>;
  }
  return (
    <FlatList
      data={states}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.dropDownItems}
          onPress={() => {
            setState(item.name);
            getStateId(item.name);
            setToggle(!toggle);
          }}
        >
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropDownItems: {
    padding: 4,
    fontSize: 15,
    // height: 24,
  },
});
export default ConditionalRenderList;
