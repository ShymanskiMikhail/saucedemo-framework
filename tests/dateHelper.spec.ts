import { test, expect } from '@playwright/test';
import { getFormattedDate } from '../utils/dateHelper';

test('getFormattedDate возвращает строку в формате DD-MM-YYYY', () => {
  const date = getFormattedDate();
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  expect(date).toMatch(regex);
});
