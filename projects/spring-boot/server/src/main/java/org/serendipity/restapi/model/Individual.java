package org.serendipity.restapi.model;

import lombok.Builder;
import lombok.Data;

import static javax.persistence.TemporalType.DATE;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.FetchType;

import org.serendipity.restapi.model.Party;

@Builder
@Data
@Entity
public class Individual {
  
  @Id
  private long id;
  
  @OneToOne(fetch = FetchType.LAZY)
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
  
}

/*
 
import java.util.Optional;
 
public Optional<Long> getId() {
  return Optional.ofNullable(this.id);
} 
 
*/
