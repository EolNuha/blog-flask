Vue.component('search-blogs', {
    data() {
        return {
            currentPage: 1,
            pageSize: 6,
            query: "",
            searchedBlogs: [],
            recentBlogs: blogs.slice(Math.max(blogs.length - 4, 0)).reverse(),
            blogs: [],
        };
    },
    created(){
        var url = new URL(window.location.href);
        const query = url.searchParams.get("q");
        this.query = query; 
        if (!query){
          window.location.replace('/404.shtml')
        }
        this.searchedBlogs = blogs.filter( e => e['title'].toLowerCase().includes(query.toLowerCase()));
        this.paginateBlogs(this.currentPage, this.pageSize);
    },
    methods: {
        paginateBlogs(currentPage, pageSize){
            this.blogs = paginator(this.searchedBlogs.reverse(), currentPage, pageSize);
            this.currentPage = this.blogs.page;
        }
    },
    template: `
    <div>
    <div class="heading-page header-text">
      <section class="page-heading">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-content">
                <h4>Blog Entries by query</h4>
                <h2>{{query}}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    

    <div id="banner">
      <banner></banner>
    </div>


    <section class="blog-posts grid-system">
      <div class="container">
        <div class="row">
        <div class="col-lg-8" id="blog-entries">
            <div class="all-blog-posts">
                <div class="row">
                    <div v-if="searchedBlogs.length === 0" class="col-lg-12">
                        <h3>No blogs have been found with the query: <i class="text-primary">{{query}}</i></h3>
                        <hr>
                        <p>These are some of our most recent blogs:</p>
                    </div>
                    <div class="col-lg-6" v-for="blog in searchedBlogs.length != 0 ? blogs.data : recentBlogs">
                        <a :href="blog.url">
                        <div class="blog-post">
                            <div class="blog-thumb">
                            <img :src="blog.img" alt="">
                            </div>
                            <div class="down-content">
                            <h4>{{blog.title}}</h4>
                            <ul class="post-info">
                                <li>{{blog.fromDate}}</li>
                            </ul>
                            <div v-html="markdown(blog.body)"></div>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div class="col-lg-12">
                    <ul class="page-numbers">
                        <li v-if="blogs.pre_page">
                            <a @click="paginateBlogs(currentPage - 1, blogs.per_page)" href="#" onclick="return false;">
                                <i class="fa fa-angle-double-left"></i>
                            </a>
                        </li>
                        <li v-for="page in blogs.total_pages" :class="{'active': page === blogs.page}">
                            <a @click="paginateBlogs(page, blogs.per_page)" href="#" onclick="return false;">{{page}}</a>
                        </li>
                        <li v-if="blogs.next_page">
                            <a @click="paginateBlogs(currentPage + 1, blogs.per_page)" href="#" onclick="return false;">
                                <i class="fa fa-angle-double-right"></i>
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
          <div class="col-lg-4" id="sidebar">
            <side-bar></side-bar>
          </div>
        </div>
      </div>
    </section>
    </div>
    `
})
new Vue({el: "#search-blogs"});