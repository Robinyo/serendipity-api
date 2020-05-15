package org.serendipity.restapi.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(indexes = { @Index(name = "NAME_INDEX", columnList = "name", unique = false) })
public class Organisation {

  // An Organisation usually consists of a number of individuals or groups bound by a common purpose.

  @Id
  private Long id;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "partyId")
  @MapsId
  private Party party;

  private String name;

  private String email;

  private String phoneNumber;

  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;

    if (!(o instanceof Organisation))
      return false;

    Organisation other = (Organisation) o;

    return id != 0L && id.equals(other.getId());
  }

  @Override
  public int hashCode() {
    return 31;
  }

}
