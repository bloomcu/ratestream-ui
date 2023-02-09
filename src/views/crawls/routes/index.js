import Crawls from '@/views/crawls/Crawls.vue'
import CrawlsShow from '@/views/crawls/CrawlsShow.vue'

export default [
  {
    path: "/:organization/crawls",
    name: "crawls",
    component: Crawls,
  },
  {
    path: "/:organization/crawls/:crawl",
    name: "crawlsShow",
    component: CrawlsShow,
  },
]
