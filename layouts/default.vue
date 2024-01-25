<template>
  <div>
    <header class="header">
      <nav class="header__nav">
        <ul class="header__nav__list">
          <li class="header__nav__list__item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="header__nav__list__item"><NuxtLink to="/doggies">Doggies</NuxtLink></li>
        </ul>
      </nav>

      <ConnectionStatus />
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  padding: 16px 24px;
  border-bottom: 1px solid #ccc;
  box-shadow: 1px 1px 4px rgba(2, 2, 2, 0.2);
  .header__nav {
    padding: 0 1rem;
    .header__nav__list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .header__nav__list__item {
        margin: 0 0.5rem;
        padding: 0.25rem;
        font-size: 1.2rem;
        .router-link-exact-active {
          color: $link-active;
        }
      }
    }
  }
}
</style>
