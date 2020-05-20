package org.serendipity.restapi.assembler;

import org.serendipity.restapi.controller.OrganisationController;
import org.serendipity.restapi.entity.Organisation;
import org.serendipity.restapi.model.OrganisationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class OrganisationModelAssembler extends RepresentationModelAssemblerSupport<Organisation, OrganisationModel> {

  @Autowired
  private PartyModelAssembler partyModelAssembler;

  public OrganisationModelAssembler() {
    super(OrganisationController.class, OrganisationModel.class);
  }

  @Override
  public OrganisationModel toModel(Organisation entity) {

    OrganisationModel model = instantiateModel(entity);

    model.setId(entity.getId());
    model.setParty(partyModelAssembler.toModel(entity.getParty()));

    model.setName(entity.getName());
    model.setEmail(entity.getEmail());
    model.setPhoneNumber(entity.getPhoneNumber());

    return model;

  }


}
