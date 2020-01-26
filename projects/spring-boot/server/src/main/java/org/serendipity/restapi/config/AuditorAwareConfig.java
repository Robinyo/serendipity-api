package org.serendipity.restapi.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareConfig implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    
    return Optional.of("rob.ferguson");
  }

}
