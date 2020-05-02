package org.serendipity.restapi.model;

import lombok.*;
import org.serendipity.restapi.entity.Party;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class IndividualModel extends RepresentationModel<IndividualModel> {

  private Long id;
  private Party party;
  private String title;
  private String givenName;
  private String middleName;
  private String familyName;
  private String honorific;
  private String salutation;
  private String preferredName;
  private String initials;
  private Date dateOfBirth;
  private String placeOfBirth;
  private String gender;
  private String email;
  private String phoneNumber;
  private String photoUrl;

}

// https://docs.spring.io/spring-hateoas/docs/current/reference/html/#fundamentals.representation-models
