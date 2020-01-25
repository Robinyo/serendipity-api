package org.serendipity.restapi.model;

import static javax.persistence.TemporalType.TIMESTAMP;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Entity
public class Location {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  private String type; // "Address" | "Natural Area" | "Management Zone"

  private String displayName;
  
  @Temporal(TIMESTAMP)
  private Date fromDate;
  
  @Temporal(TIMESTAMP)
  private Date toDate;
  
  @Embedded
  private Auditable auditable;

}

/*

  @Embedded
  private SurrogateKey surrogateKey;
  
  public Location(String type) {
    this.type = type != null ? type : "Location" ;
  }

*/