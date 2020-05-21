package org.serendipity.restapi.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Name {

  @Column(name = "type", nullable = false)
  private String type;

  private String title;         // name prefix

  private String givenName;

  private String middleName;    // otherNames

  @Column(name = "familyName", nullable = false)
  private String familyName;

  private String honorific;

  private String salutation;    // formalSalutation

  private String preferredName; // informalSalutation

  private String initials;

}
