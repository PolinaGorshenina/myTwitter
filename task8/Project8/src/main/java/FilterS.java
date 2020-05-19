import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


public class FilterS implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        chain.doFilter(request, response);
        long end = System.currentTimeMillis();

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String method = httpRequest.getMethod();
        StringBuffer path = httpRequest.getRequestURL();

        System.out.println(String.format("%s - %s - %d ms", method, path, end - start));
    }

    @Override
    public void destroy() {
    }
}