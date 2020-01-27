package org.serendipity.restapi.hateoas;

// import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;

import org.serendipity.restapi.model.Individual;
import org.serendipity.restapi.controller.IndividualController;;

@Component
public class IndividualRepresentationModelAssembler extends SimpleIdentifiableRepresentationModelAssembler<Individual> {

  IndividualRepresentationModelAssembler() {
    super(IndividualController.class);
  }
  
  @Override
  public void addLinks(EntityModel<Individual> resource) {
    
    super.addLinks(resource);
  }
  
  @Override
  public void addLinks(CollectionModel<EntityModel<Individual>> resources) {
    
    super.addLinks(resources);
  }

}

// https://github.com/spring-projects/spring-hateoas-examples/blob/master/hypermedia/src/main/java/org/springframework/hateoas/examples/EmployeeRepresentationModelAssembler.java
