package org.serendipity.restapi.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.assembler.OrganisationModelAssembler;
import org.serendipity.restapi.entity.Organisation;
import org.serendipity.restapi.model.OrganisationModel;
import org.serendipity.restapi.repository.OrganisationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

@BasePathAwareController
@Slf4j
public class OrganisationController {

  private final OrganisationRepository repository;
  private final OrganisationModelAssembler assembler;
  private final PagedResourcesAssembler<Organisation> pagedResourcesAssembler;

  // Suppress IntelliJ IDEA Error: Could not autowire. No beans of 'PagedResourcesAssembler<Individual>' type found.
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  public OrganisationController(OrganisationRepository repository,
                                OrganisationModelAssembler assembler,
                                PagedResourcesAssembler<Organisation> pagedResourcesAssembler) {

    this.repository = repository;
    this.assembler = assembler;
    this.pagedResourcesAssembler = pagedResourcesAssembler;
  }

  @GetMapping("/organisations")
  public ResponseEntity<PagedModel<OrganisationModel>> findAll(Pageable pageable) {

    log.info("OrganisationController /organisations");

    Page<Organisation> organisations = repository.findAll(pageable);
    PagedModel<OrganisationModel> organisationModels = pagedResourcesAssembler.toModel(organisations, assembler);

    return ResponseEntity.ok(organisationModels);
  }

  @GetMapping("/organisations/{id}")
  @Transactional
  public ResponseEntity<OrganisationModel> findById(
    @PathVariable("id") final Long id) throws ResponseStatusException {

    log.info("OrganisationController /organisations/{id}");

    Organisation entity = repository.findById(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND));

    OrganisationModel model = assembler.toModel(entity);

    try {

      ObjectMapper mapper = new ObjectMapper();

      mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
      mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);

      mapper.enable(SerializationFeature.INDENT_OUTPUT);

      log.info("entity: ");
      log.info("{}", "\n" + mapper.writeValueAsString(entity));
      log.info("model: ");
      log.info("{}", "\n" + mapper.writeValueAsString(model));

    } catch (JsonProcessingException jpe) {

      log.error("OrganisationController - JSON Processing Exception");
    }

    return ResponseEntity.ok(model);
  }

}
