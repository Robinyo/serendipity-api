package org.serendipity.restapi.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
// import javax.persistence.FetchType;

import static javax.persistence.TemporalType.DATE;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Individual {

  @Id
  private long id;

  // @OneToOne(fetch = FetchType.LAZY)
  @OneToOne
  @JoinColumn(name = "partyId")
  @MapsId
  private Party party;

  private String title;

  private String givenName;

  private String middleName; // otherNames

  private String familyName;

  private String honorific;

  private String salutation; // formalSalutation

  private String preferredName; // informalSalutation

  private String initials;

  @Temporal(DATE)
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

    return id != 0L && id == other.getId();
  }

  @Override
  public int hashCode() {
    return 31;
  }

}
