package org.serendipity.restapi.model;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RoleModel extends RepresentationModel<RoleModel> {

  private Long id;
  private String role;
  private String partyId;
  private String partyType;
  private String partyName;
  private String partyEmail;
  private String partyPhoneNumber;
  private String relationship;
  private String reciprocalRole;
  private String reciprocalPartyId;
  private String reciprocalPartyType;
  private String reciprocalPartyName;
  private String reciprocalPartyEmail;
  private String reciprocalPartyPhoneNumber;

}
