import { HttpContextToken } from '@angular/common/http';

// Mark requests that should NOT have auth headers or refresh behavior
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

// Prevent infinite refresh loops: only retry once
export const AUTH_RETRY_COUNT = new HttpContextToken<number>(() => 0);
