package org.serendipity.restapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}") String jwkSetUri;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    // Enable CORS, disable CSRF, every request must be authenticated

    http.cors().and().csrf().disable().authorizeRequests().anyRequest().authenticated();

    // OAuth2 Resource Server configuration

    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);

  }

  @Bean
  JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {

    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());

    return source;
  }

}

// https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/

// https://github.com/spring-projects/spring-security/blob/master/samples/boot/oauth2resourceserver/src/main/java/sample/OAuth2ResourceServerSecurityConfiguration.java

/*

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}") String jwkSetUri;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    // Every Request Must be Authenticated

    http.authorizeRequests().anyRequest().authenticated();

    // OAuth2 Resource Server configuration

    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
  }

  @Bean
  JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
  }

}

*/
