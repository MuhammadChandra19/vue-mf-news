import { reactive, watchEffect } from "vue"

export interface INews {
  title: string
  description: string
  publishedAt: string
  source: string
  url: string
  urlToImage: string
}

export interface IStore {
  news: Array<INews>
  isLoading: boolean
  page: number
  category: string
}

const store = reactive<IStore>({
  news: [],
  category: 'general',
  isLoading: false,
  page: 1
})

export const loadNews = (): void => {
  store.isLoading = true
  fetch(`https://newsapi.org/v2/top-headlines?country=id&category=${store.category}&pageSize=10&page=${store.page}&apiKey=acc1524bd91c4767a8ac14bb0cd8bb8f`) 
    .then(resp => resp.json())
    .then((news: any) => {
      const newsList: Array<INews> = news.articles.map((data: any) => ({
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        source: data.source.name,
        url: data.url,
        urlToImage: data.urlToImage
      }))
      store.news = [ ...store.news, ...newsList]
    })
    .finally(() => {
      store.isLoading = false
    })
}

export const nextPage = (): void => {
  store.page += 1
  loadNews()
}

export const changeCategory = (category: string): void => {
  store.category = category
  store.news = []
  loadNews()
}

type Callback = (store: IStore) => void;

const subscribers: Callback[] = [];

export const subscribe = (callback: Callback) => {
  callback(store);
  subscribers.push(callback);
};

watchEffect(() => {
  const payload = {
    ...store,
  };
  subscribers.forEach((fn) => fn(payload));
});

export default store;
