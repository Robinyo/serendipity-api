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

  @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
  String jwkSetUri;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    configureDevelopment(http);
    // configureProduction(http);

    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
  }

  protected void configureDevelopment(HttpSecurity http) throws Exception {

    // SPRING_MVC_STATIC_PATH_PATTERN=/docs/**

    http.cors().and()
      .authorizeRequests()
      .antMatchers("/h2-console/**").permitAll()
      .antMatchers("/**").permitAll()
      .anyRequest().authenticated();

    http.csrf().ignoringAntMatchers("/h2-console/**");
    http.headers().frameOptions().sameOrigin();
  }

  protected void configureProduction(HttpSecurity http) throws Exception {
    http.cors().and().authorizeRequests().anyRequest().authenticated();
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

// http.cors().and().csrf().disable().authorizeRequests().anyRequest().authenticated();

// https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/

// https://github.com/spring-projects/spring-security/blob/master/samples/boot/oauth2resourceserver/src/main/java/sample/OAuth2ResourceServerSecurityConfiguration.java

// .antMatchers("/docs/**").permitAll()
