import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  locale: string;
  timezone: string;
  defaultCurrency: string;
}

interface UserState {
  profile: UserProfile | null;
  preferences: {
    budgetAlertEnabled: boolean;
    insightFrequency: "daily" | "weekly" | "monthly";
  };
}

const initialState: UserState = {
  profile: null,
  preferences: {
    budgetAlertEnabled: true,
    insightFrequency: "weekly",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserState["preferences"]>>,
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearUser: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, updatePreferences, clearUser } = userSlice.actions;
