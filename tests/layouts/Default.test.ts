import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import Default from '../../layouts/Default.vue';

describe('Layout Component - Default', () => {
  test('component imports as expected', async () => {
    const wrapper = mount(Default);
    expect(wrapper).toBeDefined();
  });

  test('should render header', async () => {
    const wrapper = mount(Default);
    expect(wrapper.find('.header')).toBeDefined();
    expect(wrapper.find('.header__nav')).toBeDefined();
    expect(wrapper.find('.header__nav__list')).toBeDefined();
    expect(wrapper.findAll('.header__nav__list__item').length).toEqual(2);
    expect(wrapper.findAll('.header__nav__list__item')[0].text()).toEqual('Home');
    expect(wrapper.findAll('.header__nav__list__item')[0].find('nuxtlink').attributes('to')).toEqual('/');
    expect(wrapper.findAll('.header__nav__list__item')[1].text()).toEqual('Doggies');
    expect(wrapper.findAll('.header__nav__list__item')[1].find('nuxtlink').attributes('to')).toEqual('/doggies');
  });
});
