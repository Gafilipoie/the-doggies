<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/doggies">Doggies</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
nav {
  padding: 0 1rem;
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      margin: 0 0.5rem;
      padding: 0.25rem;
      font-size: 1.2rem;
      .router-link-exact-active {
        color: $link-active;
      }
    }
  }
}
</style>
