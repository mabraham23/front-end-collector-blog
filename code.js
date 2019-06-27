var app = new Vue ( {
    el: "#app",

    data: {
        page: "blog",
        drawer: false,
        categories: [
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc."
        ],
        selected_category: "all",
        posts: [ ],
        new_title: "",
        new_author: "",
        new_category: "all",
        new_image: "",
        new_text: "",
    },

    created: function() {
        this.getPosts();
    },

    methods: {
        getPosts: function() {
            fetch("http://localhost:3000/posts").then(function(res) {
                res.json().then(function(data) {
                    app.posts = data.posts;
                });
            });
        },
        addPost: function() {
            var new_post = {
                title: this.new_title,
                author: this.new_author,
                category: this.new_category,
                date: new Date(),
                image: this.new_image,
                text: this.new_text,
            };
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(new_post)
            }).then(function() {
                app.new_title = "";
                app.new_author = "";
                app.category = "all";
                app.new_image = "";
                app.new_text = "";
                app.page = "blog";
                app.getPosts();
            });
        },
        formatDate: function(post) {
            var date = new Date(post.date);
            return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        },
        selectCategory: function(category) {
            this.selected_category = category;
            this.drawer = false;
        }
    },

    computed: {
        sorted_posts: function() {
            if (this.selected_category == "all") {
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter(function(post) {
                    return post.category == app.selected_category;
                });
                return sorted_posts;
            }
        }
    }
} )