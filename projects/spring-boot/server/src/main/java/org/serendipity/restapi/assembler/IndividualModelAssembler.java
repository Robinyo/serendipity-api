package org.serendipity.restapi.assembler;

import org.serendipity.restapi.controller.IndividualController;
import org.serendipity.restapi.entity.Individual;
import org.serendipity.restapi.model.IndividualModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class IndividualModelAssembler extends RepresentationModelAssemblerSupport<Individual, IndividualModel> {

  public IndividualModelAssembler() {
    super(IndividualController.class, IndividualModel.class);
  }

  @Override
  public IndividualModel toModel(Individual entity) {

    IndividualModel model = instantiateModel(entity);

    model.setId(entity.getId());
    model.setParty(entity.getParty());
    model.setTitle(entity.getTitle());
    model.setGivenName(entity.getGivenName());
    model.setMiddleName(entity.getMiddleName());
    model.setFamilyName(entity.getFamilyName());
    model.setHonorific(entity.getHonorific());
    model.setSalutation(entity.getSalutation());
    model.setPreferredName(entity.getPreferredName());
    model.setInitials(entity.getInitials());
    model.setDateOfBirth(entity.getDateOfBirth());
    model.setPlaceOfBirth(entity.getPlaceOfBirth());
    model.setGender(entity.getGender());
    model.setEmail(entity.getEmail());
    model.setPhoneNumber(entity.getPhoneNumber());
    model.setPhotoUrl(entity.getPhotoUrl());

    return model;
  }

}
