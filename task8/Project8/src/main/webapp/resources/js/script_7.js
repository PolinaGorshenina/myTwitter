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

    getPage(skip = 0, top = 10, filterConfig = {}) {
        let postsFiltered = this._posts;
        this.filterConfig = filterConfig;
        if (this.filterConfig != null) {
            if (this.filterConfig.author != null)
                postsFiltered=postsFiltered.filter(p => p.author === this.filterConfig.author)
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
            hashTags: post.hashTags.split(' '),
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

    addAll(posts) {
        let wrong = posts.filter(post => !this.add(post));
        return wrong;
    }

    clear() {
        this._posts = []
    }

    constructor(posts) {
        this._posts = posts;
    }
}

const myPosts = new PostsList([
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
        author: 'Cheryl',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: [
            'dark', 'night'
        ],
        likes: [
            'Veronica'
        ]
    },
    {
        id: '6',
        description: 'Chapter Seven: In a Lonely Place',
        createdAt: new Date('2020-05-02T18:00:00'),
        author: 'Kevin',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg',
        hashTags: [
            'relax', 'forest'
        ],
        likes: [
            'Jughead'
        ]
    },
    {
        id: '7',
        description: 'Chapter Eight: The Outsiders',
        createdAt: new Date('2020-05-03T11:00:00'),
        author: 'Hermione',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lake_mapourika_NZ.jpeg/1280px-Lake_mapourika_NZ.jpeg',
        hashTags: [
            'loner'
        ],
        likes: [
            'Cheryl', 'Kevin'
        ]
    },
    {
        id: '8',
        description: 'Chapter Nine: La Grande Illusion',
        createdAt: new Date('2020-05-03T13:00:00'),
        author: 'Hiram',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/View_of_loch_lomond.JPG/1280px-View_of_loch_lomond.JPG',
        hashTags: [
            'wood', 'death'
        ],
        likes: [
            'Veronica', 'Kevin'
        ]
    },
    {
        id: '9',
        description: 'Chapter Ten: The Lost Weekend',
        createdAt: new Date('2020-05-03T19:00:00'),
        author: 'Archie',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Thai_rain_forest.jpg/1280px-Thai_rain_forest.jpg',
        hashTags: [
            'forest', 'rain'
        ],
        likes: [
            'Betty'
        ]
    },
    {
        id: '10',
        description: 'Chapter Eleven: To Riverdale and Back Again',
        createdAt: new Date('2020-05-04T09:00:00'),
        author: 'Betty',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/3/31/ROSWO_Huerquehue1.jpg',
        hashTags: [
            'shine', 'love'
        ],
        likes: [
            'Archie'
        ]
    },
    {
        id: '11',
        description: 'Chapter Twelve: Anatomy of a Murder',
        createdAt: new Date('2020-05-04T14:30:00'),
        author: 'Veronica',
        photoLink: 'https://cs8.pikabu.ru/post_img/big/2016/04/11/8/1460376299171319676.jpg',
        hashTags: [
            'death', 'dark'
        ],
        likes: [
            'Archie', 'Betty'
        ]
    },

    {
        id: '12',
        description: 'Chapter Thirteen: The Sweet Hereafter',
        createdAt: new Date('2020-05-04T15:00:00'),
        author: 'Cheryl',
        photoLink: 'https://st.depositphotos.com/1718692/4777/i/450/depositphotos_47773835-stock-photo-forest-river-with-stones-and.jpg\',',
        hashTags: [
            'love', 'meadow'
        ],
        likes: [
            'Kevin', 'Jughead'
        ]
    },
    {
        id: '13',
        description: 'Chapter Fifteen: Nighthawks',
        createdAt: new Date('2020-05-04T21:00:00'),
        author: 'Kevin',
        photoLink: 'https://million-wallpapers.ru/wallpapers/4/29/13706178945558006619.jpg',
        hashTags: [
            'night'
        ],
        likes: [
            'Cheryl'
        ]
    },
    {
        id: '14',
        description: 'Chapter Sixteen: The Watcher in the Woods',
        createdAt: new Date('2020-05-05T05:00:00'),
        author: 'Hermione',
        photoLink: 'https://www.decorel.by/wp-content/uploads/2015/03/thumb_00674.jpg',
        hashTags: [
            'wood', 'night'
        ],
        likes: [
            'Kevin'
        ]
    },
    {
        id: '15',
        description: 'Chapter Eighteen: When a Stranger Calls',
        createdAt: new Date('2020-05-05T09:00:00'),
        author: 'Hiram',
        photoLink: 'https://million-wallpapers.ru/wallpapers/4/29/13706178945558006619.jpg',
        hashTags: [
            'loner'
        ],
        likes: [
            'Hermione'
        ]
    },
    {
        id: '16',
        description: 'Chapter Nineteen: Death Proof',
        createdAt: new Date('2020-05-05T16:00:00'),
        author: 'Cheryl',
        photoLink: 'https://www.decorel.by/wp-content/uploads/2015/03/thumb_00674.jpg',
        hashTags: [
            'death', 'river'
        ],
        likes: [
            'Cheryl'
        ]
    },
    {
        id: '17',
        description: 'Chapter Twenty: Tales from the Darkside',
        createdAt: new Date('2020-05-05T23:00:00'),
        author: 'Archie',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg',
        hashTags: [
            'night', 'wood'
        ],
        likes: [
            'Betty', 'Hiram'
        ]
    },
    {
        id: '18',
        description: 'Chapter Twenty-One: House of the Devil',
        createdAt: new Date('2020-05-06T10:00:00'),
        author: 'Betty',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: [
            'dark', 'night'
        ],
        likes: [
            'Archie', 'Hiram'
        ]
    },
    {
        id: '19',
        description: 'Chapter Twenty-Two: Silent Night, Deadly Night',
        createdAt: new Date('2020-05-06T14:00:00'),
        author: 'Veronica',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/3/31/ROSWO_Huerquehue1.jpg',
        hashTags: [
            'loner'
        ],
        likes: [
            'Archie', 'Betty'
        ]
    },
    {
        id: '20',
        description: 'Chapter Twenty-Three: The Blackboard Jungle',
        createdAt: new Date('2020-05-06T20:00:00'),
        author: 'Jughead',
        photoLink: 'https://cs8.pikabu.ru/post_img/big/2016/04/11/8/1460376299171319676.jpg',
        hashTags: [
            'relax'
        ],
        likes: [
            'Archie', 'Veronica'
        ]
    },
]);

console.log('***   getPage   ***');
console.log(myPosts.getPage());
console.log('***   getPage, next posts   ***');
console.log(myPosts.getPage(10, 5));
console.log('***   getPage with tag "dark"   ***');
console.log(myPosts.getPage(0, 10, {tags: ['dark']}));
console.log('***   getPage with tag "river"   ***');
console.log(myPosts.getPage(0, 10, {tags: ['river']}));
console.log('***   getPage with tag "river" and "forest"   ***');
console.log(myPosts.getPage(0, 10, {tags: ['river', 'forest']}));
console.log('***   getPage written by Betty   ***');
console.log(myPosts.getPage(0, 10, {author: 'Betty'}));
console.log('***   get, id = 3   ***');
console.log(myPosts.get('3'));
console.log('***   get, id = 15   ***');
console.log(myPosts.get('15'));
console.log('***   validate with wrong username   ***');
console.log(PostsList.validate({id: '30',
    description: 'some text', createdAt: new Date(), author: '', photoLink: 'link', hashTags: ['river'], likes: ['Betty']}));
console.log('***   add post   ***');
console.log(myPosts.add({
    description: "some text some text",
    author: 'Kevin',
    photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
    hashTags: 'dark'
}));
console.log(myPosts.get('21'));
console.log('***   edit post   ***');
console.log(myPosts.edit('5', {description: 'new text'}));
console.log('***   this post:   ***');
console.log(myPosts.get('5'));
console.log('***   remove post:   ***');
console.log(myPosts.remove('5'));
console.log('***   posts without 5:   ***');
console.log(myPosts.getPage());
console.log('***   add all:   ***');
let myNewPosts = [
    {
        description: 123456789,
        author: 'Kevin',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: 'dark',
        likes: 'Betty'
    },

    {
        description: "some text some text",
        author: '',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: 'dark',
        likes: 'Betty'
    },

    {
        description: "some text some text",
        author: 'Kevin',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: 'dark',
        likes: 'Betty'
    },

    {
        description: "some text some text",
        createdAt: new Date(),
        author: 'Kevin',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg',
        hashTags: 'dark',
        likes: 'Betty'
    }
];
console.log(myPosts.addAll(myNewPosts));
console.log('***   clear:   ***');
console.log(myPosts.clear());
console.log('***   posts:   ***');
console.log(myPosts.getPage());