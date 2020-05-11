package org.serendipity.restapi.model;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class OrganisationModel extends RepresentationModel<OrganisationModel> {

  private Long id;
  private PartyModel party;
  private String name;
  private String email;
  private String phoneNumber;

}
