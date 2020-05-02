package org.serendipity.restapi.model;

import org.serendipity.restapi.type.PartyType;
import org.springframework.hateoas.RepresentationModel;

public class PartyModel extends RepresentationModel<PartyModel> {

  private Long id;

  private PartyType type;
  private String displayName;

}
