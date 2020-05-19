import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

public class Tweets extends HttpServlet {

    private PostsList tweets = new PostsList(5);
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String id = request.getParameter("id");
        response.setContentType("application/json");
        response.getOutputStream().println(gson.toJson(tweets.getPost(id)));
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String id = request.getParameter("id");
        response.setContentType("application/json");
        response.getOutputStream().println(gson.toJson(tweets.removePost(id)));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        response.setContentType("application/json");
        String[] requestURI = request.getRequestURI().split("/");
        if (requestURI.length == 3 && requestURI[2].equals("search")) {
            response.getOutputStream().println(tweets.getListOfPosts().stream().map(gson::toJson).
                    collect(Collectors.joining("\n")));
        }
        else {
            Posts newTweet = gson.fromJson(request.getReader().readLine(), Posts.class);
            response.getOutputStream().println(tweets.addPost(newTweet));
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        response.setContentType("application/json");
        String id = request.getParameter("id");
        Posts newTweet = gson.fromJson(request.getReader().readLine(), Posts.class);
        response.getOutputStream().println(tweets.editPost(id, newTweet));
    }
}