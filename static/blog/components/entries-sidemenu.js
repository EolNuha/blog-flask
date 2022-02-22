Vue.component('sidemenu', {
    data() {
        return {
            entries: [],
            searchResults: [],
            searchInput: ""
        };
    },
    created(){
        axios.get('/rest/s1/entries', {params: {per_page: 5}}).then(
            res => {
                this.entries = res.data.data;
            }
        )
    },
    methods: {
        searchEntries(){
            // implement search
        }
    },
    watch: {
        searchInput: {
          handler: function () {
              this.searchEntries();
          },
        },
    },
    template: `
    <div class="sidebar">
        <div class="row">
        <div class="col-lg-12 p-0">
            <div class="sidebar-item search">
                <form @submit.prevent="location.href = 'search.html?q=' + searchInput;">
                    <input type="text" class="searchText" placeholder="Search Blog Entries..." autocomplete="off" v-model="searchInput" @change="searchEntries">
                </form>
                <div class="position-absolute bg-light w-100 p-3" style="z-index: 1000; border: 1px solid rgba(0,0,0,.1)" v-if="searchResults.length > 0">
                    <div v-for="result in searchResults.slice(0, 5)">
                        <a :href="result.url" class="text-dark">
                            <h5>{{result.title}}</h5>
                        </a>
                        <hr>
                    </div>
                    <a :href="'search.html?q=' + searchInput"><button class="btn btn-sm btn-primary w-100">View All</button></a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sidebar-item recent-posts">
            <div class="sidebar-heading">
                <h2>Blog Entries</h2>
            </div>
            <div class="content">
                <ul>
                <li v-for="entry in entries"><a :href="'/blog/entries/' + entry.slug">
                    <div class="row">
                        <div class="col-12">
                            <h5>{{entry.title}}</h5>
                        </div>
                    </div>
                </a></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </div>
    `
})
new Vue({el: "#sidemenu"});