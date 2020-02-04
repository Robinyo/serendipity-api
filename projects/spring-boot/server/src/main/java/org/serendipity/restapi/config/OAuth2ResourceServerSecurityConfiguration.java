package org.serendipity.restapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@EnableWebSecurity
public class OAuth2ResourceServerSecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}") String jwkSetUri;

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
    
    // H2 console configuration
    
    httpSecurity.authorizeRequests().antMatchers("/h2-console/**").permitAll();
    httpSecurity.csrf().disable();
    httpSecurity.headers().frameOptions().disable();
    
    // OAuth2 Resource Server configuration

    httpSecurity.authorizeRequests().anyRequest().authenticated();
    
    httpSecurity.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
  }

  @Bean
  JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
  }

}
