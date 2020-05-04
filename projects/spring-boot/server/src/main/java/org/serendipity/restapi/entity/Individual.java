package org.serendipity.restapi.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(indexes = { @Index(name = "FAMILY_NAME_INDEX", columnList = "familyName", unique = false) })
public class Individual {

  @Id
  private Long id;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "partyId")
  @MapsId
  private Party party;

  private String title;

  private String givenName;

  private String middleName; // otherNames

  @Column(name = "familyName", nullable = false)
  private String familyName;

  private String honorific;

  private String salutation; // formalSalutation

  private String preferredName; // informalSalutation

  private String initials;

  @Temporal(TemporalType.DATE)
  private Date dateOfBirth;

  private String placeOfBirth;

  private String gender;

  private String email;

  private String phoneNumber;

  private String photoUrl;
  
  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;

    if (!(o instanceof Individual))
      return false;

    Individual other = (Individual) o;

    // return id != 0L && id == other.getId();
    return id != 0L && id.equals(other.getId());
  }

  @Override
  public int hashCode() {
    return 31;
  }

}
