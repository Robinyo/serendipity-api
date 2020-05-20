package org.serendipity.restapi.model;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class IndividualModel extends RepresentationModel<IndividualModel> {

  private Long id;
  private PartyModel party;
  private Set<IndividualNameModel> names;
  private Date dateOfBirth;
  private String placeOfBirth;
  private String sex;
  private String email;
  private String phoneNumber;
  private String photoUrl;
  private String electorate;

}

// https://docs.spring.io/spring-hateoas/docs/current/reference/html/#fundamentals.representation-models
