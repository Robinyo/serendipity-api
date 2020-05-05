package org.serendipity.restapi.entity;

import lombok.*;
import org.serendipity.restapi.type.PartyType;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Party {

  // @GeneratedValue(strategy = GenerationType.AUTO)

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Builder.Default
  @Enumerated(EnumType.STRING)
  private PartyType type = PartyType.PARTY;

  @Builder.Default
  private String displayName= "";

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "PartyAddress",
    joinColumns = @JoinColumn(name = "partyId"),
    inverseJoinColumns = @JoinColumn(name = "locationId")
  )
  // private Set<Address> addresses = new HashSet<Address>();
  private Set<Address> addresses;

  //
  // @Embedded
  // private Auditable audit;
  //
  
  @CreatedBy
  private String createdBy;

  @CreatedDate
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @LastModifiedBy
  private String updatedBy;
  
  @LastModifiedDate
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedAt;
  
  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;

    if (!(o instanceof Party))
      return false;

    Party other = (Party) o;

    // return id != 0L && id == other.getId();
    return id != 0L && id.equals(other.getId());
  }

  @Override
  public int hashCode() {
    return 31;
  }

}

// https://google.github.io/styleguide/javaguide.html

// https://stackoverflow.com/questions/34241718/lombok-builder-and-jpa-default-constructor/35602246#35602246

/* 

IMPORTANT: Override toString, equals, and hashCode as described in these  documents.
- https://vladmihalcea.com/the-best-way-to-implement-equals-hashcode-and-tostring-with-jpa-and-hibernate/
- https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
- https://vladmihalcea.com/hibernate-facts-equals-and-hashcode/

*/

// @Builder.Default
// private String type = "Party";

// @GeneratedValue(strategy = GenerationType.AUTO)
// @Table(name = "Party")

// @Version
// private Long version;
