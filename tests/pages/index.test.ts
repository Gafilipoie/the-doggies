describe('Pages Component - Index', () => {
  it('component imports as expected', async () => {
    const cmp = await import('../../pages/index.vue');
    expect(cmp).toBeDefined();
  });
});
