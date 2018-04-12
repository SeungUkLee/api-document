'use strict;'
//Include crypto to generate the post id
var crypto = require('crypto');

module.exports = function() {
    return {
        postList : [],
        /*
         * Save the post inside the "db".
         */
        save(post) {
            post.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.postList.push(post);
            return 1;           
        },
        /*
         * Retrieve a post with a given id or return all the posts if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.postList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.postList;
            }
        },
        /*
         * Delete a post with the given id.
         */
        remove(id) {
            var found = 0;
            this.postList = this.postList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Update a post with the given id
         */
        update(id, post) {
            var postIndex = this.postList.findIndex(element => {
                return element.id === id;
            });
            if(postIndex !== -1) {
                this.postList[postIndex].title = post.title;
                this.postList[postIndex].content = post.content;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  