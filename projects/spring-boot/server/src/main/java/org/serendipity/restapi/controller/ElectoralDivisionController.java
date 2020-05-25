package org.serendipity.restapi.controller;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.assembler.ElectoralDivisionAssembler;
import org.serendipity.restapi.entity.ElectoralDivision;
import org.serendipity.restapi.model.ElectoralDivisionModel;
import org.serendipity.restapi.repository.ElectoralDivisionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

@BasePathAwareController
@Slf4j
public class ElectoralDivisionController extends Controller<ElectoralDivision, ElectoralDivisionRepository,
    ElectoralDivisionAssembler> {

  // Suppress IntelliJ IDEA Error: Could not autowire. No beans of 'PagedResourcesAssembler<ElectoralDivision>' type found.
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  public ElectoralDivisionController(ElectoralDivisionRepository repository,
                                     ElectoralDivisionAssembler assembler,
                                     PagedResourcesAssembler<ElectoralDivision> pagedResourcesAssembler) {

    super(repository, assembler, pagedResourcesAssembler);
  }

  @GetMapping("/electoral-divisions")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<PagedModel<ElectoralDivisionModel>> findAll(Pageable pageable) {

    log.info("ElectoralDivisionController /electoral-divisions");

    Page<ElectoralDivision> entities = repository.findAll(pageable);
    PagedModel<ElectoralDivisionModel> models = pagedResourcesAssembler.toModel(entities, assembler);

    logInfo(entities, models);

    return ResponseEntity.ok(models);
  }

  @GetMapping("/electoral-divisions/search/findByName")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<ElectoralDivisionModel> findByName(
    @RequestParam("name") final String name) throws ResponseStatusException {

    log.info("IndividualController /electoral-divisions/search/findByName");

    ElectoralDivision entity = repository.findByName(name).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND));

    ElectoralDivisionModel model = assembler.toModel(entity);

    logInfo(entity, model);

    return ResponseEntity.ok(model);
  }

}
