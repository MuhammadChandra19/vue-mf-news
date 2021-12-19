<template>
  <div style="position: relative;">
    <div 
      v-if="isLoading" 
      class="loading-container" 
    >
      <div class="loading"></div>
    </div>
    <div
      v-else
      v-for="(news, idx) in newsList"
      :key="idx"
      class="news-container"
    >
      <img :src="news.urlToImage" style="width: 100'" alt="img" />
      <div class="news-list-head">
        <p>{{ news.source }}</p>
        <p>{{ news.publishedAt.replace("T", " ").replace("Z", " ") }}</p>
      </div>
      <div className="news-list">
        <h3>{{ news.title }}</h3>
        <p>{{ news.description }}</p>
        <a :href="news.url" target="_blank">Read more ..</a>
      </div>
    </div>
    <button
      v-if="!newsList.length < 10 || !isLoading"
      class="load-more"
      @click="loadMore"
    >
      load more
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import store , { nextPage, loadNews } from './store'
export default defineComponent({
  computed: {
    isLoading: {
      get() {
        return store.isLoading
      },
      set() {}
    },
    newsList: {
      get() {
        return store.news
      },
      set() {}
    }
  },
  methods: {
    loadMore() {
      nextPage()
    }
  },
  mounted() {
    loadNews()
    console.log('loaded')
  }
})
</script>
<style lang="scss">
.news-container{
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  height: 15vw;
  width:95%;
  /* background-color: grey; */
  display: grid;
  grid-template-columns: 30% 70% ;
  grid-template-rows: auto;
  grid-template-areas: 
    "picture content";
  /* border-radius: 5px; */
  z-index: 4px;
  -webkit-box-shadow: 4px 10px 16px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 10px 16px -5px rgba(0,0,0,0.75);
  box-shadow: 4px 10px 16px -5px rgba(0,0,0,0.75);
  
}
.news-container  img{
  margin-right: 0;
  height: 15vw;
  max-width: 100%;
  grid-area: picture;
}
.news-container .news-list{

  padding-left: 10px;
  grid-area: content;
  overflow: scroll;
  
}
.news-container .news-list h3{
  padding-top: 10px;
  color: grey;
  font-size: 15px;
}
.news-container .news-list p{
  color: black;
  font-size: 12px;
  margin-bottom: 50px;
}
.news-container .news-list a{
  /* color: black; */
 
  padding-top: 10%;
  font-size: 12px;
}
.news-container .news-list-head{
  padding-top: 2px;
  grid-area: content;
}
.news-container .news-list-head p:nth-child(1){
  padding-left: 10px;
  color: #1b387b;
  font-size: 10px;
  float: left;
}
.news-container  .news-list-head p:nth-child(2){
  padding-right: 10px;
  color: #1b387b;
  font-size: 10px;
  float: right;
}
.loading-container{
  position: absolute;
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  /* left: 0; */
  top: 0;
  width: 100%;
  height: 100vh;
  margin-right: auto;
  margin-left:auto;
  /* height: 100%;  */
  /* overflow: auto; Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.loading-container .loading {
  margin-top: 50%;
	margin-right: auto;
    margin-left:auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
.load-more{
  background-color: grey; 
  border-radius: 10px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin-right: auto;
    margin-left:auto;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
</style>
