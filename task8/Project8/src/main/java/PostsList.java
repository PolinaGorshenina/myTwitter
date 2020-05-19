import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PostsList {
    private List<Posts> ListOfPosts;
    private int yourId;

    PostsList(List<Posts> ListOfPosts){
        this.ListOfPosts = new ArrayList<>();
        this.ListOfPosts.addAll(ListOfPosts);
        this.yourId = this.ListOfPosts.size();
    }

    PostsList(int twNum){
        List<String> newHashTags = new ArrayList<>();
        newHashTags.add("dark");
        newHashTags.add("night");

        List<String> newLikes = new ArrayList<>();
        newLikes.add("Betty");
        newLikes.add("Kevin");

        this.ListOfPosts = new ArrayList<>();

        for (int i = 0; i < twNum; i++) {
            Posts oneTweet = new Posts(Integer.toString(i), "Some text " + i,new Date(),
                    "Betty","link", newHashTags, newLikes);
            this.ListOfPosts.add(oneTweet);
        }
        this.yourId = this.ListOfPosts.size();
    }

    public List<Posts> getListOfPosts(){
        return this.ListOfPosts;
    }

    public Posts getPost(String id) {
        for (Posts curPost : ListOfPosts){
            if(curPost.getId().equals(id)){
                return curPost;
            }
        }
        return null;
    }

    public static boolean validate(Posts post) {
        return  post.getId() != null && post.getId().length() > 0 &&
                post.getDescription() != null && post.getDescription().length() < 200 &&
                post.getCreatedAt() != null &&
                post.getAuthor() != null && post.getAuthor().length() > 0;
    }

    public boolean addPost (Posts post) {
        Date date = new Date();
        int len = this.yourId;
        String id = Integer.toString(len);
        ArrayList<String> likes= new ArrayList<>();
        Posts newPost =new Posts(id, post.getDescription(), date, post.getAuthor(), post.getPhotoLink(), post.getHashTags(), likes);

        if(PostsList.validate(newPost)){
            this.ListOfPosts.add(newPost);
            this.yourId = this.yourId + 1;
            return true;
        }
        return false;
    }

    public boolean editPost(String id, Posts post) {
        Posts myPost = this.getPost(id);

        if (post == null || post.getId() != null ||post.getAuthor() != null ||
                post.getCreatedAt() != null) {
            return false;
        }

        if (post.getDescription() != null) {
            myPost.setDescription(post.getDescription());
        }

        if (post.getPhotoLink() != null) {
            post.setPhotoLink(post.getPhotoLink());
        }

        if (post.getHashTags() != null) {
            myPost.setHashTags(post.getHashTags());
        }

        if (post.getLikes() != null) {
            myPost.setLikes(post.getLikes());
        }

        return true;
    }

    public boolean removePost(String id) {
        for (Posts curPost : ListOfPosts){
            if(curPost.getId().equals(id)){
                this.ListOfPosts.remove(Integer.parseInt(id));
                return true;
            }
        }
        return false;
    }

}