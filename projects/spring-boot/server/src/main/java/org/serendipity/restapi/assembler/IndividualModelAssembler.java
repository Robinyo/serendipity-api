package org.serendipity.restapi.assembler;

import org.serendipity.restapi.controller.IndividualController;
import org.serendipity.restapi.entity.Individual;
import org.serendipity.restapi.model.IndividualModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class IndividualModelAssembler extends RepresentationModelAssemblerSupport<Individual, IndividualModel> {

  @Autowired
  private PartyModelAssembler partyModelAssembler;

  public IndividualModelAssembler() {
    super(IndividualController.class, IndividualModel.class);
  }

  @Override
  public IndividualModel toModel(Individual entity) {

    IndividualModel model = instantiateModel(entity);

    model.setId(entity.getId());

    model.setParty(partyModelAssembler.toModel(entity.getParty()));

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
    model.setSex(entity.getSex());
    model.setEmail(entity.getEmail());
    model.setPhoneNumber(entity.getPhoneNumber());
    model.setPhotoUrl(entity.getPhotoUrl());

    return model;
  }

}
