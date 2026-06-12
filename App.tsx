// Dileepa Peiris - https://github.com/dileepapeiris
// Expo PR - https://github.com/expo/expo/pull/46874

import { FieldGroup, Host, Picker, Row, Switch, Text } from "@expo/ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function App() {
  const [filterType, setFilterType] = useState("always");
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Host style={styles.host}>
      <FieldGroup>
        {/* Section 1: Simple Dropdown */}
        <FieldGroup.Section title="Filter Dropdown">
          <Picker selectedValue={filterType} onValueChange={setFilterType}>
            <Picker.Item label="Always shown" value="always" />
            <Picker.Item
              label="Show Conditional Content Section"
              value="custom"
            />
          </Picker>
        </FieldGroup.Section>

        {/* Section 2: Conditional Content */}
        {filterType === "custom" && (
          <FieldGroup.Section title="Conditional Content Section">
            <Row spacing={10} alignment="center">
              <Text>
                Name : Dileepa Peiris - https://github.com/dileepapeiris
              </Text>
            </Row>
          </FieldGroup.Section>
        )}

        {/* Section 3: Switch Toggle */}
        <Row alignment="center" spacing={16}>
          <Text>Switch Toggle</Text>
          <Switch value={isEnabled} onValueChange={setIsEnabled} />
        </Row>
      </FieldGroup>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    marginTop: 50,
  },
});
