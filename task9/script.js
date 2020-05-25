class PostsList {
    _posts = [];

    static validate(post) {
        if (typeof post.id !== 'string') {
            console.log("Sorry, you have problem with id.");
            return false
        }
        if (post.description.length >= 200 || typeof post.description !== 'string') {
            console.log("Sorry, you have problem with description.");
            return false
        }
        if (post.author.length === 0 || typeof post.author !== 'string') {
            console.log("Sorry, you have problem with username.");
            return false
        }
        if (post.photoLink !== undefined && typeof post.photoLink !== 'string') {
            console.log("Sorry, you have problem with your photo link.");
            return false
        }
        if (!Array.isArray(post.hashTags) && post.hashTags !== undefined) {
            console.log("Sorry, you have problem with your tags.");
            return false
        }
        if (!Array.isArray(post.likes) && post.likes !== undefined) {
            console.log("Sorry, you have problem with likes.");
            return false
        }
        if (Object.prototype.toString.call(post.createdAt) !== '[object Date]') {
            console.log("Sorry, you have problem with date");
            return false
        }
        return true
    }

    getPage(skip = 0, top = 10, filterConfig = []) {
        let postsFiltered = this._posts;
        this.filterConfig = filterConfig;
        if (this.filterConfig != null) {
            if (this.filterConfig.author != null)
                postsFiltered=postsFiltered.filter(p => p.author === this.filterConfig.author);
            if(this.filterConfig.tags != null)
                postsFiltered=postsFiltered.filter(p=>this.filterConfig.tags.filter(tag => p.hashTags.includes(tag)).length === this.filterConfig.tags.length)
            if(this.filterConfig.dateFrom != null)
                postsFiltered = postsFiltered.filter(post => post.createdAt >= new Date(this.filterConfig.dateFrom));
            if(this.filterConfig.dateTo != null)
                postsFiltered = postsFiltered.filter(post => post.createdAt <= new Date(this.filterConfig.dateTo));
        }
        return postsFiltered.slice(skip, skip + top).sort((a,b) => b.createdAt-a.createdAt);
    }

    get(id = 0) {
        return this._posts.find(value => value.id === id)
    }


    add(post) {
        const id = String(this._posts.length + 1);
        let newPost = {
            id,
            description: post.description,
            createdAt: new Date(),
            author: post.author,
            photoLink: post.photoLink,
            hashTags: post.hashTags, //split(' '),
            likes: ['']
        };
        if(PostsList.validate(newPost)){
            this._posts.push(newPost);
            return true;
        }
        return false;
    }

    edit(id, post) {
        let postToEdit = this.get(id);
        if (!postToEdit) {
            return false;
        }
        Object.keys(post).forEach(field => postToEdit[field] = post[field]);
        if (!PostsList.validate(this.get(id)))
            return false;
        return true;
    }

    remove(id) {
        let postIndex = this._posts.findIndex(post => post.id === id)
        if (postIndex !== -1) {
            this._posts.splice(postIndex, 1);
            return true;
        }
        return false;
    }

    addAll(posts = []) {
        let wrongItem = posts.filter(post => !this.add(post));
        return wrongItem;
    }

    clear() {
        this._posts = []
    }

    constructor(posts = []) {
        this._posts = posts;
    }
}

class View {
    name = 'Betty';
    template = document.getElementById('template');
    container = document.getElementById('container');
    addItem(data) {
        let newNote = document.importNode(this.template.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');
        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key === 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            } else {
                if (key === 'hashTags') {
                    phElement.textContent = String(data.hashTags.map(item => '#' + item).join(''));
                } else
                    phElement.textContent = String(data[key]);
            }

            if (key === 'author' && String(data[key]) !== this.name) {
                newNote.firstElementChild.querySelector('[class="buttonWidgets1"]').style.visibility="hidden"
                newNote.firstElementChild.querySelector('[class="buttonWidgets2"]').style.visibility="hidden"
                newNote.firstElementChild.querySelector('[class="buttonWidgets3"]').style.visibility="visible"
            }

        });
        newNote.firstElementChild.setAttribute('id', data.id)
        this.container.insertBefore(newNote, this.container.firstElementChild);
    }

    addAll(posts = []) {
        posts.forEach((post) => this.addItem(post))
    }
    delete(id = '') {
        document.getElementById(id)?.remove();
    }

    edit(id = '', data = {}) {
        let newNote = document.importNode(this.template.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key === 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            } else {
                if (key === 'hashTags') {
                    phElement.textContent = String(data.hashTags.map(item => '#' + item).join(''));
                } else
                    phElement.textContent = String(data[key]);
            }

            if (key === 'author' && String(data[key]) !== this.name) {
                newNote.firstElementChild.querySelector('[class="buttonWidgets1"]').style.visibility="hidden"
                newNote.firstElementChild.querySelector('[class="buttonWidgets2"]').style.visibility="hidden"
                newNote.firstElementChild.querySelector('[class="buttonWidgets3"]').style.visibility="visible"
            }
        });
        newNote.firstElementChild.setAttribute('id', data.id)
        document.getElementById(id).replaceWith(newNote);
    }
}

let view;
let model;
window.onload = () => {
    view = new View();
    model = new PostsList(posts);
    addPosts(posts);
    deletePost(2);
};

let posts = [
    {
        id: '1',
        description: 'Chapter One: The River\'s Edge',
        createdAt: new Date('2020-05-01T12:00:00'),
        author: 'Archie',
        photoLink: 'https://st.depositphotos.com/1004221/1633/i/450/depositphotos_16333199-stock-photo-mountain-river-in-the-wood.jpg',
        hashTags: [
            'river', 'forest'
        ],
        likes: [
            'Betty', 'Veronica'
        ]
    },
    {
        id: '2',
        description: 'Chapter Two: A Touch of Evil',
        createdAt: new Date('2020-05-01T16:00:00'),
        author: 'Betty',
        photoLink: 'https://st.depositphotos.com/1079320/1362/i/450/depositphotos_13621747-stock-photo-autumn-park.jpg',
        hashTags: [
            'night', 'dark'
        ],
        likes: [
            'Archie'
        ]
    },
    {
        id: '3',
        description: 'Chapter Three: Body Double',
        createdAt: new Date('2020-05-01T20:00:00'),
        author: 'Veronica',
        photoLink: 'https://st4.depositphotos.com/1072187/24204/i/450/depositphotos_242045744-stock-photo-beautiful-landscape-image-golitha-falls.jpg',
        hashTags: [
            'relax'
        ],
        likes: [
            'Archie', 'Betty'
        ]
    },
    {
        id: '4',
        description: 'Chapter Four: The Last Picture Show',
        createdAt: new Date('2020-05-02T10:00:00'),
        author: 'Jughead',
        photoLink: 'https://cs8.pikabu.ru/post_img/big/2016/04/11/8/1460376299171319676.jpg',
        hashTags: [
            'shine', 'dark'
        ],
        likes: [
            'Betty'
        ]
    },
    {
        id: '5',
        description: 'Chapter Five: Heart of Darkness',
        createdAt: new Date('2020-05-02T14:00:00'),
        author: 'Betty',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: [
            'dark', 'night'
        ],
        likes: [
            'Veronica'
        ]
    },
];

function addPost(post) {
    if (model.add(post))
        view.addItem(post)
}
function addPosts(posts) {
    //if (model.addAll(posts))
        view.addAll(posts)
}

function deletePost(id) {
    view.delete(id)
    model.remove(id)
}
function editPost(id, post) {
    if (model.edit(id, post))
        view.edit(id, module.get(id))
}