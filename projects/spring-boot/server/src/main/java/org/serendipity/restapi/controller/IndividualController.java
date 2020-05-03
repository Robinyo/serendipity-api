package org.serendipity.restapi.controller;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.assembler.IndividualModelAssembler;
import org.serendipity.restapi.entity.Individual;
import org.serendipity.restapi.model.IndividualModel;
import org.serendipity.restapi.repository.IndividualRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

@BasePathAwareController
@Slf4j
public class IndividualController {

  private final IndividualRepository repository;
  private final IndividualModelAssembler assembler;
  private final PagedResourcesAssembler<Individual> pagedResourcesAssembler;

  // Suppress IntelliJ IDEA Error: Could not autowire. No beans of 'PagedResourcesAssembler<Individual>' type found.
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  public IndividualController(IndividualRepository repository,
                              IndividualModelAssembler assembler,
                              PagedResourcesAssembler<Individual> pagedResourcesAssembler) {

    this.repository = repository;
    this.assembler = assembler;
    this.pagedResourcesAssembler = pagedResourcesAssembler;
  }

  @GetMapping("/individuals")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<PagedModel<IndividualModel>> findAll(Pageable pageable) {

    Page<Individual> individuals = repository.findAll(pageable);

    PagedModel<IndividualModel> individualModels = pagedResourcesAssembler.toModel(individuals, assembler);

    // log.info("IndividualController /individuals individuals: " + individuals);
    // log.info("IndividualController /individuals individualModels: " + individualModels);

    return ResponseEntity.ok(individualModels);
  }

  @GetMapping("/individuals/{id}")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<IndividualModel> findById(
      @PathVariable("id") final Long id) throws ResponseStatusException {

    Individual entity = repository.findById(id).orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND));

    return ResponseEntity.ok(assembler.toModel(entity));
  }

}







// https://github.com/spring-projects/spring-hateoas-examples

// https://docs.spring.io/spring-data/data-commons/docs/current/reference/html/#core.web.pageables

/*

  @GetMapping("/individuals")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<Page<Individual>> findAll(Pageable pageable) {

    Page<Individual> individuals = repository.findAll(pageable);

    log.info("IndividualController /individuals pagedResult: " + individuals);

    return ResponseEntity.ok(individuals);
  }

*/

/*

  @GetMapping("/individuals")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<Page<Individual>> findAll(@RequestParam(name="page", defaultValue="0") int page,
                                                  @RequestParam(name="size", defaultValue="100") int size) {

    log.info("IndividualController /individuals page: " + page);
    log.info("IndividualController /individuals size: " + size);

    Pageable pageable = PageRequest.of(page, size, Sort.by("familyName").ascending());

    Page<Individual> pagedResult = repository.findAll(pageable);

    log.info("IndividualController /individuals pagedResult: " + pagedResult);

    return ResponseEntity.ok(pagedResult);
  }

*/

/*

  @GetMapping("/individuals")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<PagedModel<Individual>> findAll(@RequestParam(name="page", defaultValue="0") int page,
                                                        @RequestParam(name="limit", defaultValue="100") int limit) {

    // const queryParams = '?page=' + 0 + '&limit=' + 10 + '&sort=familyName&familyName.dir=asc';

    log.info("IndividualController /individuals page: " + page);
    log.info("IndividualController /individuals limit: " + limit);

    Pageable pageable = PageRequest.of(page, limit, Sort.by("familyName"));



    Page<Individual> individuals = repository.findAll(pageable);

    log.info("IndividualController /individuals: page: " + repository.findAll(pageable));

    return ResponseEntity.ok(assembler.toModel(individuals));
  }

*/

// @RestController
// @RequestMapping("/api")

// @Autowired

/*

@BasePathAwareController
@Slf4j
public class IndividualController {

  private final IndividualRepresentationModelAssembler assembler;
  private final IndividualService entityService;

  public IndividualController(IndividualService entityService,
                              IndividualRepresentationModelAssembler assembler) {

    this.entityService = entityService;
    this.assembler = assembler;
  }

  @GetMapping("/whoami")
  public String whoami(@AuthenticationPrincipal Jwt jwt) {
    return String.format("Hello, %s!", jwt.getSubject());
  }

  @GetMapping("/individuals")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<CollectionModel<EntityModel<Individual>>> findAll(@RequestParam(defaultValue = "0") String page) {

    log.info("IndividualController /individuals page: " + page);

    // CollectionModel<EntityModel<Individual>> model = assembler.toCollectionModel(entityService.findAll());
    // log.info("IndividualController /individuals: " + model);
    // return ResponseEntity.ok(model);

    return ResponseEntity.ok(assembler.toCollectionModel(entityService.findAll()));
  }

  @GetMapping("/individuals/{id}")
  @PreAuthorize("hasAuthority('SCOPE_individual:read')")
  public ResponseEntity<EntityModel<Individual>> findById(
      @PathVariable("id") final Long id) throws ResponseStatusException {

    Individual entity = entityService.findById(id).orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND));

    return ResponseEntity.ok(assembler.toModel(entity));
  }

}

*/