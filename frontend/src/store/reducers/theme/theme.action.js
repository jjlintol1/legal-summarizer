import { createAction } from '../../../utils/reducer/reducer.utils';

import { THEME_ACTION_TYPES } from './theme.types';

export const toggleThemeMode = (newTheme) => createAction(THEME_ACTION_TYPES.TOGGLE_THEME_MODE, newTheme);