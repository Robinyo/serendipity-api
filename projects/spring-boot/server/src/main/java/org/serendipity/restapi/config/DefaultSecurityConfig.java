package org.serendipity.restapi.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@EnableWebSecurity
@Profile({"dev", "test", "prod"})
@Slf4j
public class DefaultSecurityConfig extends WebSecurityConfigurerAdapter {

  // spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:10001/auth/realms/development/protocol/openid-connect/certs
  // SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI=http://keycloak:8080/auth/realms/development/protocol/openid-connect/certs

  @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
  private String jwkSetUri;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    log.info("DefaultSecurityConfig: configure()");

    http.cors().and()
      .authorizeRequests()
      .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
      .antMatchers("/h2-console/**").permitAll()
      .antMatchers("/docs/**").permitAll()
      .anyRequest().authenticated();

    http.csrf().ignoringAntMatchers("/h2-console/**");
    http.headers().frameOptions().sameOrigin();

    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
  }

  @Bean
  JwtDecoder jwtDecoder() {

    log.info("DefaultSecurityConfig: jwtDecoder()");

    return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {

    log.info("DefaultSecurityConfig: corsConfigurationSource()");

    CorsConfiguration configuration = new CorsConfiguration();

    configuration.applyPermitDefaultValues();
    configuration.setAllowedOrigins(Collections.singletonList("*"));
    configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PATCH", "DELETE"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }

}

// Spring Boot will, by default, permit access to /css/**, /js/**, /images/**, and /**/favicon.ico
