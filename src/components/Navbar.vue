<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      Hacker News
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">

    <div class="navbar-end">

      <router-link :to="{ name: 'TopStories' }" class="navbar-item">
        Top Stories
      </router-link>

      <router-link :to="{ name: 'NewStories' }" class="navbar-item">
        New Stories
      </router-link>

      <router-link :to="{ name: 'BestStories' }" class="navbar-item" href="">
        Best Stories
      </router-link>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
