package org.serendipity.restapi.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Individual {

  // An Individual is a person.
  // The Individual concept represents people about which an Enterprise wishes to maintain information.

  @Id
  private Long id;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "partyId")
  @MapsId
  private Party party;

  @OneToMany(mappedBy = "individual", fetch = FetchType.EAGER)
  private Set<IndividualName> names;

  private String sex;

  private String gender;

  private String email;

  private String phoneNumber;

  private String photoUrl;

  private String electorate;

  @Temporal(TemporalType.DATE)
  private Date dateOfBirth;

  private String placeOfBirth;

  @Temporal(TemporalType.DATE)
  private Date dateOfDeath;
  
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
