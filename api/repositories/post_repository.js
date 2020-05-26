'use strict';

const insert_sql = 'INSERT INTO Posts (id, title, content, post_image, added_date) VALUES(?,?,?,?,?)';
const getone_sql = 'SELECT * from posts p where p.id = ?';
const getall_sql = 'SELECT * from posts p';
const delete_all_sql = 'delete from posts';
const allimages_sql = 'select p.post_image from posts p';

class PostRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    addPost(post) {
        let { id, title, content, post_image, added_date } = post;
        
        return this.dao.run(
            insert_sql, 
            [id, title, content, post_image, added_date]
        );
    }

    getOnePost(postId) {
        return this.dao.get(getone_sql, postId);
    }

    getAllPosts() {
        return this.dao.all(getall_sql);
    }

    deleteAllPosts() {
        let allImages = this.getAllImages();
        this.dao.run(delete_all_sql);
        return allImages;
    }

    getAllImages() {
        return this.dao.all(allimages_sql);
    }
  }
  
  module.exports = PostRepository;