package org.serendipity.restapi.assembler;

import org.serendipity.restapi.controller.IndividualController;
import org.serendipity.restapi.entity.Address;
import org.serendipity.restapi.entity.Individual;
import org.serendipity.restapi.entity.Party;
import org.serendipity.restapi.model.AddressModel;
import org.serendipity.restapi.model.IndividualModel;
import org.serendipity.restapi.model.PartyModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class IndividualModelAssembler extends RepresentationModelAssemblerSupport<Individual, IndividualModel> {

  public IndividualModelAssembler() {
    super(IndividualController.class, IndividualModel.class);
  }

  @Override
  public IndividualModel toModel(Individual entity) {

    IndividualModel model = instantiateModel(entity);

    model.setId(entity.getId());

    model.setParty(toPartyModel(entity.getParty()));

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

  private PartyModel toPartyModel(Party party) {

    return PartyModel.builder()
        .id(party.getId())
        .type(party.getType())
        .displayName(party.getDisplayName())
        .addresses(toAddressModel(party.getAddresses()))
        .build();
  }

  private Set<AddressModel> toAddressModel(Set<Address> addresses) {

    if (addresses.isEmpty()) {
      return Collections.emptySet();
    }

    return addresses.stream()
        .map(address -> AddressModel.builder()
            .id(address.getId())
            // .location(toLocationModel(address.getLocation()))
            .name(address.getName())
            .line1(address.getLine1())
            .line2(address.getLine2())
            .city(address.getCity())
            .state(address.getState())
            .postalCode(address.getPostalCode())
            .country(address.getCountry())
            .addressType(address.getAddressType())
            .build())
        .collect(Collectors.toSet());
  }

}
