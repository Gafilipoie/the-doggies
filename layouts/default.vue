<template>
  <div>
    <header class="header">
      <nav class="header__nav">
        <ul class="header__nav__list">
          <li class="header__nav__list__item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="header__nav__list__item"><NuxtLink to="/doggies">Doggies</NuxtLink></li>
        </ul>
      </nav>

      <div class="connection-status-wrapper">
        <ConnectionStatus />
      </div>
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  .header__nav {
    padding: 0 1rem;
    .header__nav__list {
      list-style-type: none;
      padding: 0;
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

  .connection-status-wrapper {
    position: absolute;
    top: 2px;
    right: 16px;
  }
}
</style>
