import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'red' | 'blue' | 'green';

const STORAGE_KEY = 'ui.theme';

type ThemeState = {
  mode: ThemeMode;
  color: ThemeColor;
};

const DEFAULT_THEME: ThemeState = {
  mode: 'light',
  color: 'red',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  private state = signal<ThemeState>(this.load());

  mode = computed(() => this.state().mode);
  color = computed(() => this.state().color);
  isDark = computed(() => this.mode() === 'dark');

  themeClass = computed(() => `theme-${this.color()}-${this.mode()}`);

  /** Keep this list in sync with styles.scss */
  private allThemeClasses: string[] = [
    'theme-red-light', 'theme-red-dark',
    'theme-blue-light', 'theme-blue-dark',
    'theme-green-light', 'theme-green-dark',
  ];

  constructor() {
    // Apply once immediately on startup
    this.applyThemeClass(this.themeClass());

    // Persist + apply whenever it changes
    effect(() => {
      const current = this.state();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      this.applyThemeClass(this.themeClass());
    });
  }

  setMode(mode: ThemeMode): void {
    this.state.update(s => ({ ...s, mode }));
  }

  toggleDark(isDark: boolean): void {
    this.setMode(isDark ? 'dark' : 'light');
  }

  setColor(color: ThemeColor): void {
    this.state.update(s => ({ ...s, color }));
  }

  private applyThemeClass(themeClass: string): void {
    const html = this.document.documentElement;

    // Remove all known theme classes
    html.classList.remove(...this.allThemeClasses);

    // Add current class
    html.classList.add(themeClass);
  }

  private load(): ThemeState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_THEME;

      const parsed = JSON.parse(raw) as Partial<ThemeState>;
      const mode: ThemeMode = parsed.mode === 'dark' ? 'dark' : 'light';

      const color: ThemeColor =
        parsed.color === 'blue' ? 'blue' :
          parsed.color === 'green' ? 'green' :
            'red';

      return { mode, color };
    } catch {
      return DEFAULT_THEME;
    }
  }
}