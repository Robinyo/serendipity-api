package org.serendipity.restapi.model;

import java.util.Date;

import javax.persistence.Column;
// import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import static javax.persistence.TemporalType.TIMESTAMP;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Location {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  @Builder.Default
  private String type = "Location"; 

  @Builder.Default
  private String displayName = "";
  
  @Temporal(TIMESTAMP)
  private Date fromDate;
  
  @Temporal(TIMESTAMP)
  private Date toDate;
  
  // @Embedded
  // private Auditable audit;
  
  @CreatedBy
  private String createdBy;

  @CreatedDate
  @Temporal(TIMESTAMP)
  private Date createdAt;

  @LastModifiedBy
  private String updatedBy;
  
  @LastModifiedDate
  @Temporal(TIMESTAMP)
  private Date updatedAt;

}

// type = "Address" | "Natural Area" | "Management Zone"

/*

  @Embedded
  private SurrogateKey surrogateKey;
  
  public Location(String type) {
    this.type = type != null ? type : "Location" ;
  }

*/