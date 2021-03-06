Vue.component('view-blogs', {
    data() {
        return {
            blogs: [],
            page: 1,
            pageSize: 20
        };
    },
    created(){
        this.getBlogs(this.page, this.pageSize);
    },
    methods: {
        getBlogs(page, pageSize){
            ApiService.getBlogs({params:{page: page, per_page: pageSize}})
                .then(res => {
                    this.blogs = res.data;
                    this.pageSize = pageSize;
                })
        },
        deleteBlog(slug){
            var isConfirmed = confirm(`Are you sure you want to delete ${slug}?`)
            if (isConfirmed) {
                ApiService.deleteBlog(slug)
                    .then(res => {
                        this.getBlogs(this.page);
                        toastr.success("Blog deleted successfully!", "Success!")
                    })
                    .catch(err => {
                        toastr.error(err, "Error!")
                    })
            }
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
        <h1 class="text-center">Blogs</h1>
        </div>
        <div class="container">
            <table class="table container">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Entry</th>
                    <th scope="col">Author</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="blog in blogs.data">
                    <th scope="row">{{blog.id}}</th>
                    <td><a :href="'/' + blog.entry.slug + '/' + blog.slug">{{blog.title}}</a></td>
                    <td><a :href="'/' + blog.entry.slug + '/category/' + blog.category">{{blog.category}}</td>
                    <td><a :href="'/admin/entries/' + blog.entry.slug">{{blog.entry.title}}</a></td>
                    <td><a :href="'/admin/authors/' + blog.author.slug">{{blog.author.firstName}} {{blog.author.lastName}}</a></td>
                    <td>
                        <a :href="'/admin/blogs/' + blog.slug">
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </a>
                    </td>
                    <td><button class="btn btn-sm btn-danger" @click="deleteBlog(blog.slug)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="d-flex flex-row">
                <div style="cursor: pointer;" @click="getBlogs(page, 10)" class="p-2" :class="{'text-primary': pageSize===10}"><u>10</u></div>
                <div style="cursor: pointer;" @click="getBlogs(page, 20)" class="p-2" :class="{'text-primary': pageSize===20}"><u>20</u></div>
                <div style="cursor: pointer;" @click="getBlogs(page, 50)" class="p-2" :class="{'text-primary': pageSize===50}"><u>50</u></div>
                <div style="cursor: pointer;" @click="getBlogs(page, 100)" class="p-2" :class="{'text-primary': pageSize===100}"><u>100</u></div>
                <div style="cursor: pointer;" @click="getBlogs(page, 500)" class="p-2" :class="{'text-primary': pageSize===500}"><u>500</u></div>
            </div>
            <nav>
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-if="blogs.has_prev">
                        <a class="page-link" @click="getBlogs(blogs.prev_num, pageSize)" href="#" onclick="return false;">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li v-for="page in blogs.pages" class="page-item" :class="{'active': page === blogs.page}">
                        <a @click="getBlogs(page, pageSize)" href="#" onclick="return false;" class="page-link">{{page}}</a>
                    </li>
                    <li class="page-item" v-if="blogs.has_next">
                        <a class="page-link" @click="getBlogs(blogs.next_num, pageSize)" href="#" onclick="return false;">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    `
})
new Vue({el: "#view-blogs"});