import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import Doggies from '../../pages/doggies.vue';

describe('Pages Component - Doggies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('component imports as expected', async () => {
    const wrapper = mount(Doggies);
    expect(wrapper).toBeDefined();
  });

  test('should render title', async () => {
    const wrapper = mount(Doggies);
    expect(wrapper.find('.container__title')).toBeDefined();
    expect(wrapper.find('.container__title').text()).toEqual('The Doggies Explorer');
  });

  test('should render Searchform component', async () => {
    const wrapper = mount(Doggies);
    expect(wrapper.find('searchform')).toBeDefined();
    expect(wrapper.find('searchform').attributes('is-loading')).toEqual('false');
  });
});
