package hu.unideb.inf.redditclone;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

import jakarta.servlet.Servlet;
import jakarta.faces.webapp.FacesServlet;
import jakarta.servlet.DispatcherType;
import java.util.EnumSet;

@SpringBootApplication
public class RedditcloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedditcloneApplication.class, args);
	}


	/*
	@Bean
	public ServletRegistrationBean<Servlet> facesServletRegistration() {
		//I MODIFIED THIS, IT MIGHT NOT WORK eg. new faceservlet
		ServletRegistrationBean<Servlet> registration = new ServletRegistrationBean<Servlet>(new FacesServlet(), "*.jsf");
		return registration;
	}

	 */

	/*
	@Bean
	public FilterRegistrationBean<RewriteFilter> rewriteFilter() {
		//MIGHT WANT TO USE OLD REWRITE
		FilterRegistrationBean<RewriteFilter> rwFilter = new FilterRegistrationBean<RewriteFilter>(new RewriteFilter());
		rwFilter.setDispatcherTypes(EnumSet.of(DispatcherType.FORWARD, DispatcherType.REQUEST,
				DispatcherType.ASYNC, DispatcherType.ERROR));
		rwFilter.addUrlPatterns("/*");
		return rwFilter;
	}
	 */

}
