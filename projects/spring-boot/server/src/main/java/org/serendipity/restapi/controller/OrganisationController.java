package org.serendipity.restapi.controller;

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
public class OrganisationController extends Controller<Organisation, OrganisationRepository, OrganisationModelAssembler>{

  // Suppress IntelliJ IDEA Error: Could not autowire. No beans of 'PagedResourcesAssembler<Individual>' type found.
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  public OrganisationController(OrganisationRepository repository,
                                OrganisationModelAssembler assembler,
                                PagedResourcesAssembler<Organisation> pagedResourcesAssembler) {

    super(repository, assembler, pagedResourcesAssembler);
  }

  @GetMapping("/organisations")
  public ResponseEntity<PagedModel<OrganisationModel>> findAll(
    Pageable pageable) throws ResponseStatusException {

    log.info("OrganisationController GET /organisations");

    try {

      Page<Organisation> entities = repository.findAll(pageable);
      PagedModel<OrganisationModel> models = pagedResourcesAssembler.toModel(entities, assembler);

      // logInfo(entities, models);

      return ResponseEntity.ok(models);

    } catch (Exception e) {

      log.error("{}", e.getLocalizedMessage());

      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

  }

  @GetMapping("/organisations/{id}")
  @Transactional
  public ResponseEntity<OrganisationModel> findById(
    @PathVariable("id") final Long id) throws ResponseStatusException {

    log.info("OrganisationController GET /organisations/{id}");

    try {

      Organisation entity = repository.findById(id).orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND));

      OrganisationModel model = assembler.toModel(entity);

      logInfo(entity, model);

      return ResponseEntity.ok(model);

    } catch (Exception e) {

      log.error("{}", e.getLocalizedMessage());

      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

  }

}
