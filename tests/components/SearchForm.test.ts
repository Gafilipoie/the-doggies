import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import SearchForm from '../../components/SearchForm.vue';

describe('Component - SearchForm', () => {
  const props = {
    isLoading: false,
    handleOnSearch: vi.fn(),
    handleOnRandom: vi.fn(),
    error: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('component imports as expected', async () => {
    const wrapper = mount(SearchForm, { props });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.search')).toBeDefined();
  });

  test('should render label', async () => {
    const wrapper = mount(SearchForm, { props });
    expect(wrapper.find('label')).toBeDefined();
    expect(wrapper.find('label').text()).toEqual('Token ID');
  });

  test('should render input', async () => {
    const wrapper = mount(SearchForm, { props });
    expect(wrapper.find('input')).toBeDefined();
    expect(wrapper.find('input').attributes('type')).toEqual('search');
    expect(wrapper.find('input').attributes('name')).toEqual('search');
    expect(wrapper.find('input').classes()).not.toContain('--disabled');
    expect(wrapper.find('input').attributes('disabled')).not.toBeDefined();
    expect(wrapper.find('input').attributes('required')).toBeDefined();
  });

  test('should render buttons', async () => {
    const wrapper = mount(SearchForm, { props });

    const ctaContainer = wrapper.find('.search__cta');
    expect(ctaContainer).toBeDefined();
    expect(ctaContainer.findAll('button').length).toEqual(2);

    const randomButton = ctaContainer.findAll('button')[0];
    expect(randomButton.text()).toEqual('Random Search');
    expect(randomButton.classes()).toContain('--outlined');
    expect(randomButton.attributes('disabled')).not.toBeDefined();

    const searchButton = ctaContainer.findAll('button')[1];
    expect(searchButton.text()).toEqual('Search');
    expect(searchButton.attributes('disabled')).toBeDefined(); // input has no value
  });

  test('should handle Random Search click', async () => {
    const wrapper = mount(SearchForm, { props });
    const ctaContainer = wrapper.find('.search__cta');
    const randomButton = ctaContainer.findAll('button')[0];

    randomButton.trigger('click');

    expect(props.handleOnRandom).toHaveBeenCalled();
  });

  test('should handle Input Change & Search click', async () => {
    const wrapper = mount(SearchForm, { props });

    await wrapper.find('input').setValue('6314');

    const ctaContainer = wrapper.find('.search__cta');
    const searchButton = ctaContainer.findAll('button')[1];
    expect(searchButton.attributes('disabled')).not.toBeDefined(); // input has value

    searchButton.trigger('click');

    expect(props.handleOnSearch).toHaveBeenCalled();
  });

  test('should render in loading state', async () => {
    const wrapper = mount(SearchForm, {
      props: {
        ...props,
        isLoading: true,
      },
    });

    expect(wrapper.find('input').classes()).toContain('--disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();

    const ctaContainer = wrapper.find('.search__cta');

    const randomButton = ctaContainer.findAll('button')[0];
    expect(randomButton.classes()).toContain('--disabled');
    expect(randomButton.attributes('disabled')).toBeDefined();

    const searchButton = ctaContainer.findAll('button')[1];
    expect(searchButton.classes()).toContain('--disabled');
    expect(searchButton.attributes('disabled')).toBeDefined();

    expect(wrapper.find('.search__loading')).toBeDefined();
    expect(wrapper.find('.search__loading').text()).toEqual('Loading...');
  });

  test('should render in error state', async () => {
    const wrapper = mount(SearchForm, {
      props: {
        ...props,
        error: 'Test Error!',
      },
    });

    expect(wrapper.find('.search__error')).toBeDefined();
    expect(wrapper.find('.search__error').text()).toEqual('Test Error!');
  });
});
