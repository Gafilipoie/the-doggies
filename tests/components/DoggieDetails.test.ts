import axios from 'axios';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import DoggieDetails from '../../components/DoggieDetails.vue';
import doggiMock from '../__mocks__/doggie.json';
import { retry } from '../setupTests';

vi.mock('axios');

describe('Component - DoggieDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('component imports as expected', async () => {
    const wrapper = mount(DoggieDetails);
    expect(wrapper).toBeDefined();
  });

  test('should render Doggie details', async () => {
    (axios.get as any).mockResolvedValue({ data: doggiMock });

    const props = {
      tokenUri: 'https://contracts.sandbox.game/snoopdogg/7527',
      tokenOwner: '0x77FE98302a956eff`00C74f094ED5E9E6B8235853',
    };

    const wrapper = mount(DoggieDetails, { props });

    await retry(() => {
      expect(wrapper.find('.details')).toBeDefined();
      expect(wrapper.find('.details__bio__avatar')).toBeDefined();
      expect(wrapper.find('nuxtlink').attributes('to')).toEqual(doggiMock.animation_url);
      expect(wrapper.find('img').attributes('src')).toEqual(doggiMock.image_url);

      expect(wrapper.find('.details__bio__info__name').text()).toEqual(`${doggiMock.name} Owner: ${props.tokenOwner}`);
      expect(wrapper.find('.details__bio__info__description').text()).toEqual(doggiMock.description);

      expect(wrapper.find('.details__traits')).toBeDefined();
      expect(wrapper.find('.details__traits').find('tbody').findAll('tr').length).toEqual(doggiMock.attributes.length);
    });
  });
});
