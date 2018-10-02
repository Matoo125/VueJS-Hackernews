<template>
    <div class="container">
        <section class="hero">
          <div class="hero-body">
            <h1 class="title">{{ title }}</h1>
          </div>
        </section>
        <div class="column is-9">
          <div class="box content">
            <div v-for="story in stories" :key="story.id">
                <article class="post">
                  <h4>{{ story.title }}</h4>
                  <div class="columns">
                    <div class="column">
                      <a :href="story.url" target="_blank">Link</a>
                    </div>
                    <div class="column">
                      <a :href="url.internal + story.id" target="_blank">Comments</a>
                    </div>
                    <div class="column">
                      <span>{{ story.time|formatTime }}</span>
                    </div>
                  </div>
                  <hr>
                </article>
            </div>
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
              <a class="pagination-previous" v-if="isTherePreviousPage" @click="previousPage">Previous</a>
              <a class="pagination-next" v-if="isThereNextPage" @click="nextPage">Next page</a>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
            </nav>
          </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Homepage',
  data: function () {
    return {
      title: '',
      url: {
        base: 'https://hacker-news.firebaseio.com/v0/',
        topStories: 'topstories.json',
        bestStories: 'beststories.json',
        newStories: 'newstories.json',
        singleStory: '/item/{id}.json',
        internal: 'https://news.ycombinator.com/item?id='
      },
      stories: [],
      allStories: [],
      currentPage: 1,
      perPage: 10
    }
  },
  created: function () {
    this.load(this.$route)
  },
  methods: {
    http: function (url, callbackSuccess) {
      axios.get(url).then(response => {
        // console.log(response)
        callbackSuccess(response)
      }).catch(error => { console.log(error) })
    },
    generateUrl: function (key, id = '') {
      return this.url.base + this.url[key].replace('{id}', id)
    },
    load: function (route) {
      this.currentPage = 1
      this.title = route.meta.title
      let urlKey = this.strFirstLetterLowercase(route.name)
      let url = this.generateUrl(urlKey)
      this.http(url, response => {
        this.allStories = response.data
        this.loadStories()
      })
    },
    loadStories: function () {
      this.stories = []
      let stories = this.paginate(this.allStories, this.perPage, this.currentPage)
      stories.forEach(id => {
        this.http(this.generateUrl('singleStory', id), this.handleResponseSingle)
      })
    },
    handleResponseSingle: function (response) {
      this.stories.push(response.data)
    },
    paginate: function (data, perPage, currentPage) {
      return data.slice(currentPage * perPage, (currentPage + 1) * perPage)
    },
    nextPage: function () {
      this.currentPage++
      this.loadStories()
    },
    previousPage: function () {
      this.currentPage--
      this.loadStories()
    },
    strFirstLetterLowercase: function (str) {
      return str.charAt(0).toLowerCase() + str.slice(1)
    }
  },
  computed: {
    totalPages: function () {
      return Math.floor(this.allStories.length / this.perPage)
    },
    isThereNextPage: function () {
      return this.currentPage < this.totalPages
    },
    isTherePreviousPage: function () {
      return this.currentPage > 1
    }
  },
  filters: {
    formatTime: function (timestamp) {
      return moment.unix(timestamp).fromNow()
      // moment.unix(timestamp).format('LLL') // different format
    }
  },
  watch: {
    $route (to, from) {
      this.load(to)
    }
  }
}
</script>
