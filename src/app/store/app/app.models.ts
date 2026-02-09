export interface AppAuthState {
// placeholder fields (you can replace later)
isReady: boolean;
}

export interface AppFeatureState {
auth: AppAuthState;
}

export const initialAppAuthState: AppAuthState = {
isReady: false,
};

export const initialAppFeatureState: AppFeatureState = {
auth: initialAppAuthState,
};