import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import ConnectionStatus from '../../components/ConnectionStatus.vue';
import { retry } from '../setupTests';

describe('Component - ConnectionStatus', () => {
  afterEach(() => {
    if (window.ethereum) {
      delete window.ethereum;
    }
  });

  test('component imports as expected', async () => {
    const wrapper = mount(ConnectionStatus);
    expect(wrapper).toBeDefined();
  });

  test('should render correct text and style if there is no connection', async () => {
    const wrapper = mount(ConnectionStatus);

    const ConnectButton = wrapper.find('[data-testid="connect-button"]');
    expect(ConnectButton.exists()).toBe(true);
    expect(ConnectButton.text()).toBe('Connect');

    const ConnectIcon = wrapper.find('[data-testid="connect-icon"]');
    expect(ConnectIcon.classes()).not.toContain('status__icon--connected');
  });

  test('should call callback when clicking on connect', async () => {
    window.ethereum = {
      request: vi.fn(() => Promise.resolve({})),
    };

    const wrapper = mount(ConnectionStatus);
    const ConnectButton = wrapper.find('[data-testid="connect-button"]');

    ConnectButton.trigger('click');

    expect(window.ethereum.request).toHaveBeenCalled();
  });

  test('should render correct text and style if there is a connection', async () => {
    window.ethereum = {
      request: vi.fn(() => Promise.resolve({})),
    };

    const wrapper = mount(ConnectionStatus);
    const ConnectButton = wrapper.find('[data-testid="connect-button"]');

    ConnectButton.trigger('click');

    await retry(() => {
      expect(expect(ConnectButton.text()).toEqual('Connected'));
      const ConnectIcon = wrapper.find('[data-testid="connect-icon"]');
      expect(ConnectIcon.classes()).toContain('status__icon--connected');
    });
  });
});
