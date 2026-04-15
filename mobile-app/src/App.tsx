/**
 * FinTrack AI — Mobile App Root Component
 *
 * Wraps the entire application in a Redux Provider for global state management.
 * The AppNavigator handles auth-gated navigation (login vs main tabs).
 *
 * Architecture: React Native + Redux Toolkit + RTK Query + React Navigation
 */
import React from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { AppNavigator } from "./navigation/AppNavigator";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
