new Vue({
    el: "#app",
    data: {
        url: "http://127.0.0.1:3000/api/book",
        books: [],
        users: [],
        title: "",
        body: "",
        authorId: null,
        isNotUpdate:true,
        updateId : null,
    },

    methods: {
        getBooks() {
            axios.get(this.url).then(res => {
                let Alldata = res.data.data;
                for(let item of Alldata){
                    this.books.push(item);
                }
                console.log(this.books);
                console.log(Alldata);
            })
        },
        // Create the book 
        createBook(){

            let book = {
                title:this.title,
                body: this.body,
                author_id: Number(this.authorId)
            }
            console.log(book);
            axios.post(this.url,book).then(res => {
                console.log("Created");
            });
            this.title =""
            this.body = ""
            this.authorId = null
        
        },
        // delete post
        deleteBook(book){
            console.log(book.id)
            axios.delete(this.url+"/"+book.id).then(res => {
                console.log("Deleted");
            });
        },

        // Show data on form 
        toUpdate(book){
            this.isNotUpdate = false
            this.updateId = book.id;
            this.title = book.title
            this.body = book.body
            this.authorId = Number(book.author_id)
        },
        // update new data
        updateBook(){
            let book = {
                title:this.title,
                body: this.body,
                author_id: Number(this.authorId)
            }
            console.log(book);
            axios.put(this.url+"/"+this.updateId,book).then(res => {
                console.log("updated");
                console.log(res.data);
            });
            this.isNotUpdate = true
            this.title =""
            this.body = ""
            this.authorId = null
        }
    },
    mounted() {
        this.getBooks();
    },
})