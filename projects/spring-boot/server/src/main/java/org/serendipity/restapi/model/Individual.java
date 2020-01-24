package org.serendipity.restapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.FetchType;

import org.serendipity.restapi.model.Party;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Individual")
public class Individual {
  
  @Id
  private long id;
  
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "partyId")
  @MapsId
  private Party party;

  private String title;
  
  private String givenName;
  
  private String middleName;    // otherNames
  
  private String familyName;
  
  public Optional<Long> getId() {
    return Optional.ofNullable(this.id);
  }

}

/*

@Entity
@Table(name = "Individual")
public class Individual extends Party {

  private String title;
  
  private String givenName;
  
  private String middleName;    // otherNames
  
  private String familyName;

}

// import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

  // @Id
  @OneToOne
  @MapsId
  private Party party;


*/